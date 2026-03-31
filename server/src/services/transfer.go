package services

import (
	"context"
	"crypto/rand"
	"fmt"
	"log/slog"
	"math/big"
	"sync"
	"time"

	"github.com/skygenesisenterprise/aether-bank/server/src/domain"
)

var transferService *TransferService
var transferOnce sync.Once

func initTransferService() *TransferService {
	transferOnce.Do(func() {
		transferService = NewTransferService(nil, nil)
		seedDemoAccount()
	})
	return transferService
}

func seedDemoAccount() {
	account := domain.NewAccount(
		"FR7630004000031234567890143",
		"BNPAFRPPXXX",
		domain.AccountTypeCurrent,
		"EUR",
	)
	account.Balance = 5000000
	account.Available = 5000000
	account.Status = domain.AccountStatusActive
	account.Metadata = map[string]any{
		"holder_name": "Demo Account",
	}
	transferService.accounts[account.ID] = account
}

type TransferService struct {
	mu           sync.RWMutex
	accounts     map[string]*domain.Account
	ledgers      map[string]*domain.Ledger
	transfers    map[string]*domain.Transfer
	idempotency  map[string]string
	ibanProvider IBANProvider
	pspProvider  PSPProvider
	logger       *slog.Logger
}

type IBANProvider interface {
	CreateIBAN(ctx context.Context, userID string, accountType string) (*IBANAccount, error)
	HandleIncomingTransfer(ctx context.Context, req *domain.IncomingTransferRequest) (*TransferResult, error)
}

type PSPProvider interface {
	CreateTransfer(ctx context.Context, req *domain.TransferRequest) (*TransferResponse, error)
	GetTransferStatus(ctx context.Context, transferID string) (*domain.Transfer, error)
}

type IBANAccount struct {
	IBAN        string `json:"iban"`
	BIC         string `json:"bic"`
	Status      string `json:"status"`
	ProviderRef string `json:"provider_ref"`
}

type TransferResult struct {
	Success     bool       `json:"success"`
	TransferID  string     `json:"transfer_id,omitempty"`
	Error       string     `json:"error,omitempty"`
	ValidatedAt *time.Time `json:"validated_at,omitempty"`
}

type TransferResponse struct {
	Success     bool   `json:"success"`
	TransferID  string `json:"transfer_id,omitempty"`
	ProviderRef string `json:"provider_ref,omitempty"`
	Status      string `json:"status,omitempty"`
	Error       string `json:"error,omitempty"`
}

func NewTransferService(ibanProvider IBANProvider, pspProvider PSPProvider) *TransferService {
	return &TransferService{
		accounts:     make(map[string]*domain.Account),
		ledgers:      make(map[string]*domain.Ledger),
		transfers:    make(map[string]*domain.Transfer),
		idempotency:  make(map[string]string),
		ibanProvider: ibanProvider,
		pspProvider:  pspProvider,
		logger:       slog.Default(),
	}
}

func (s *TransferService) CreateAccount(ctx context.Context, userID, accountType, currency, holderName string) (*domain.Account, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.logger.Info("creating account with IBAN", "user_id", userID)

	var iban, bic string
	if s.ibanProvider != nil {
		ibanAccount, err := s.ibanProvider.CreateIBAN(ctx, userID, accountType)
		if err != nil {
			s.logger.Error("failed to create IBAN via provider", "error", err)
			iban = GenerateIBAN("FR", "30002", "00005", generateAccountNumber())
			bic = GenerateBIC("30002", "FR", "00005")
		} else {
			iban = ibanAccount.IBAN
			bic = ibanAccount.BIC
		}
	} else {
		iban = GenerateIBAN("FR", "30002", "00005", generateAccountNumber())
		bic = GenerateBIC("30002", "FR", "00005")
	}

	account := domain.NewAccount(iban, bic, domain.AccountType(accountType), currency)
	account.Metadata = map[string]any{
		"user_id":     userID,
		"holder_name": holderName,
	}

	s.accounts[account.ID] = account
	s.logger.Info("account created", "account_id", account.ID, "iban", account.IBAN, "bic", account.BIC)

	return account, nil
}

func (s *TransferService) GetAccount(ctx context.Context, accountID string) (*domain.Account, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	account, ok := s.accounts[accountID]
	if !ok {
		return nil, fmt.Errorf("account not found")
	}
	return account, nil
}

func (s *TransferService) GetAccountByIBAN(ctx context.Context, iban string) (*domain.Account, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	for _, account := range s.accounts {
		if account.IBAN == iban {
			return account, nil
		}
	}
	return nil, fmt.Errorf("account not found for IBAN: %s", iban)
}

func (s *TransferService) GetBalance(ctx context.Context, accountID string) (int64, error) {
	account, err := s.GetAccount(ctx, accountID)
	if err != nil {
		return 0, err
	}
	return account.Balance, nil
}

func (s *TransferService) CreateOutgoingTransfer(ctx context.Context, req *domain.TransferRequest) (*domain.Transfer, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.logger.Info("creating outgoing transfer", "account_id", req.AccountID, "amount", req.Amount)

	if req.IdempotencyKey != "" {
		if existingID, ok := s.idempotency[req.IdempotencyKey]; ok {
			if existing, ok := s.transfers[existingID]; ok {
				s.logger.Info("duplicate transfer request", "idempotency_key", req.IdempotencyKey, "transfer_id", existing.ID)
				return existing, nil
			}
		}
	}

	account, ok := s.accounts[req.AccountID]
	if !ok {
		return nil, fmt.Errorf("account not found")
	}

	if account.Balance < req.Amount {
		return nil, fmt.Errorf("insufficient funds: balance=%d, requested=%d", account.Balance, req.Amount)
	}

	currency := req.Currency
	if currency == "" {
		currency = "EUR"
	}

	counterparty := req.Counterparty
	if counterparty == nil {
		counterparty = &domain.Counterparty{
			Name: "",
			IBAN: req.IBAN,
			BIC:  req.BIC,
		}
	}

	transfer := domain.NewTransfer(
		req.AccountID,
		req.Amount,
		currency,
		req.Description,
		req.Reference,
		domain.TransferDirectionDebit,
		counterparty,
	)
	transfer.IBAN = req.IBAN
	transfer.BIC = req.BIC
	transfer.Metadata = req.Metadata
	transfer.IdempotencyKey = req.IdempotencyKey

	ledger := domain.NewLedger(
		req.AccountID,
		req.Amount,
		currency,
		req.Description,
		req.Reference,
		domain.LedgerDirectionDebit,
	)
	ledger.Status = domain.LedgerStatusPending

	s.ledgers[ledger.ID] = ledger
	transfer.LedgerID = ledger.ID

	account.Debit(req.Amount)
	transfer.Process()

	if s.pspProvider != nil && req.ExecuteDate == "" {
		resp, err := s.pspProvider.CreateTransfer(ctx, req)
		if err != nil {
			s.logger.Error("PSP transfer creation failed", "error", err)
			transfer.Fail(err.Error())
			return transfer, err
		}
		transfer.ProviderRef = resp.ProviderRef
	}

	transfer.Complete()
	ledger.Credit()

	s.transfers[transfer.ID] = transfer

	if req.IdempotencyKey != "" {
		s.idempotency[req.IdempotencyKey] = transfer.ID
	}

	s.logger.Info("outgoing transfer completed", "transfer_id", transfer.ID, "ledger_id", ledger.ID, "new_balance", account.Balance)

	return transfer, nil
}

func (s *TransferService) HandleIncomingTransfer(ctx context.Context, req *domain.IncomingTransferRequest) (*domain.Transfer, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.logger.Info("handling incoming transfer", "iban", req.IBAN, "amount", req.Amount)

	if req.ExternalRef != "" {
		for _, t := range s.transfers {
			if t.ExternalRef == req.ExternalRef {
				s.logger.Info("duplicate incoming transfer", "external_ref", req.ExternalRef)
				return t, nil
			}
		}
	}

	account, ok := s.accounts[req.IBAN]
	if !ok {
		return nil, fmt.Errorf("account not found for IBAN: %s", req.IBAN)
	}

	if s.ibanProvider != nil {
		_, err := s.ibanProvider.HandleIncomingTransfer(ctx, req)
		if err != nil {
			s.logger.Error("provider incoming transfer failed", "error", err)
			return nil, err
		}
	}

	currency := req.Currency
	if currency == "" {
		currency = "EUR"
	}

	counterparty := &domain.Counterparty{
		Name: req.SenderName,
		IBAN: req.SenderIBAN,
		BIC:  req.SenderBIC,
	}

	transfer := domain.NewTransfer(
		account.ID,
		req.Amount,
		currency,
		req.Remittance,
		req.Reference,
		domain.TransferDirectionCredit,
		counterparty,
	)
	transfer.ExternalRef = req.ExternalRef

	ledger := domain.NewLedger(
		account.ID,
		req.Amount,
		currency,
		req.Remittance,
		req.Reference,
		domain.LedgerDirectionCredit,
	)

	s.ledgers[ledger.ID] = ledger
	transfer.LedgerID = ledger.ID

	account.Credit(req.Amount)
	transfer.Process()
	transfer.Complete()
	ledger.Credit()

	s.transfers[transfer.ID] = transfer

	s.logger.Info("incoming transfer completed", "transfer_id", transfer.ID, "ledger_id", ledger.ID, "new_balance", account.Balance)

	return transfer, nil
}

func (s *TransferService) GetTransfer(ctx context.Context, transferID string) (*domain.Transfer, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	transfer, ok := s.transfers[transferID]
	if !ok {
		return nil, fmt.Errorf("transfer not found")
	}
	return transfer, nil
}

func (s *TransferService) ListTransfers(ctx context.Context, accountID string, limit, offset int) []*domain.Transfer {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []*domain.Transfer
	for _, t := range s.transfers {
		if accountID == "" || t.AccountID == accountID {
			result = append(result, t)
		}
	}

	if offset > len(result) {
		offset = len(result)
	}
	if limit == 0 || limit > len(result) {
		limit = len(result)
	}

	end := offset + limit
	if end > len(result) {
		end = len(result)
	}

	return result[offset:end]
}

func (s *TransferService) GetLedgerEntries(ctx context.Context, accountID string) []*domain.Ledger {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []*domain.Ledger
	for _, l := range s.ledgers {
		if accountID == "" || l.AccountID == accountID {
			result = append(result, l)
		}
	}
	return result
}

func (s *TransferService) ReverseTransfer(ctx context.Context, transferID, reason string) (*domain.Transfer, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.logger.Info("reversing transfer", "transfer_id", transferID, "reason", reason)

	transfer, ok := s.transfers[transferID]
	if !ok {
		return nil, fmt.Errorf("transfer not found")
	}

	if transfer.Status != domain.TransferStatusCompleted {
		return nil, fmt.Errorf("can only reverse completed transfers")
	}

	account, ok := s.accounts[transfer.AccountID]
	if !ok {
		return nil, fmt.Errorf("account not found")
	}

	reverseAmount := transfer.Amount
	if transfer.Direction == domain.TransferDirectionDebit {
		account.Credit(reverseAmount)

		reverseLedger := domain.NewLedger(
			transfer.AccountID,
			reverseAmount,
			transfer.Currency,
			"Reversal: "+transfer.Description,
			"RVS-"+transfer.Reference,
			domain.LedgerDirectionCredit,
		)
		s.ledgers[reverseLedger.ID] = reverseLedger
		reverseLedger.Credit()
	} else {
		account.Debit(reverseAmount)

		reverseLedger := domain.NewLedger(
			transfer.AccountID,
			reverseAmount,
			transfer.Currency,
			"Reversal: "+transfer.Description,
			"RVS-"+transfer.Reference,
			domain.LedgerDirectionDebit,
		)
		s.ledgers[reverseLedger.ID] = reverseLedger
		reverseLedger.Credit()
	}

	transfer.Reverse(reason)

	s.logger.Info("transfer reversed", "original_id", transfer.ID, "new_balance", account.Balance)

	return transfer, nil
}

type TransferCounterparty struct {
	Name string `json:"name"`
	IBAN string `json:"iban"`
	BIC  string `json:"bic"`
}

type TransferRequestInput struct {
	AccountID      string                `json:"account_id" binding:"required"`
	Amount         int64                 `json:"amount" binding:"required,gt=0"`
	Currency       string                `json:"currency"`
	Description    string                `json:"description"`
	Reference      string                `json:"reference"`
	Counterparty   *TransferCounterparty `json:"counterparty"`
	IBAN           string                `json:"iban"`
	BIC            string                `json:"bic"`
	IdempotencyKey string                `json:"idempotency_key"`
	ExecuteDate    string                `json:"execute_date"`
	Metadata       map[string]any        `json:"metadata"`
}

func GetTransferService() *TransferService {
	return initTransferService()
}

func generateAccountNumber() string {
	const chars = "0123456789"
	result := ""
	for i := 0; i < 11; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		result += string(chars[n.Int64()])
	}
	return result
}
