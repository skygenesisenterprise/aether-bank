package usecase

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/skygenesisenterprise/aether-bank/server/src/domain"
	"github.com/skygenesisenterprise/aether-bank/server/src/provider"
)

type LedgerService struct {
	accounts     map[string]*domain.Account
	ledgers      map[string]*domain.Ledger
	ibanProvider provider.IBANProvider
	pspProvider  provider.PSPProvider
	logger       *slog.Logger
}

func NewLedgerService(iban provider.IBANProvider, psp provider.PSPProvider) *LedgerService {
	return &LedgerService{
		accounts:     make(map[string]*domain.Account),
		ledgers:      make(map[string]*domain.Ledger),
		ibanProvider: iban,
		pspProvider:  psp,
		logger:       slog.Default(),
	}
}

type CreateAccountInput struct {
	UserID      string
	AccountType string
	Currency    string
	HolderName  string
}

func (s *LedgerService) CreateAccount(ctx context.Context, input CreateAccountInput) (*domain.Account, error) {
	s.logger.Info("creating account", "user_id", input.UserID, "type", input.AccountType)

	ibanAccount, err := s.ibanProvider.CreateIBAN(ctx, input.UserID, input.AccountType)
	if err != nil {
		s.logger.Error("failed to create IBAN", "error", err)
		return nil, fmt.Errorf("failed to create IBAN: %w", err)
	}

	account := domain.NewAccount(ibanAccount.IBAN, ibanAccount.BIC, domain.AccountType(input.AccountType), input.Currency)
	account.ProviderRef = ibanAccount.ProviderRef
	s.accounts[account.ID] = account

	s.logger.Info("account created", "account_id", account.ID, "iban", account.IBAN)
	return account, nil
}

func (s *LedgerService) GetAccount(ctx context.Context, accountID string) (*domain.Account, error) {
	account, ok := s.accounts[accountID]
	if !ok {
		return nil, provider.ErrAccountNotFound
	}
	return account, nil
}

func (s *LedgerService) GetBalance(ctx context.Context, accountID string) (int64, error) {
	account, err := s.GetAccount(ctx, accountID)
	if err != nil {
		return 0, err
	}
	return account.Balance, nil
}

func (s *LedgerService) HandleIncomingTransfer(ctx context.Context, webhook *provider.IncomingTransferWebhook) error {
	s.logger.Info("handling incoming transfer", "amount", webhook.Amount, "iban", webhook.IBAN)

	account := s.findAccountByIBAN(webhook.IBAN)
	if account == nil {
		s.logger.Warn("account not found for IBAN", "iban", webhook.IBAN)
		return provider.ErrAccountNotFound
	}

	if err := s.validateWebhook(webhook); err != nil {
		s.logger.Error("webhook validation failed", "error", err)
		return err
	}

	transferResult, err := s.ibanProvider.HandleIncomingTransfer(ctx, webhook)
	if err != nil {
		s.logger.Error("provider transfer handling failed", "error", err)
		return err
	}

	if !transferResult.Success {
		return fmt.Errorf("transfer validation failed: %s", transferResult.Error)
	}

	ledger := domain.NewLedger(
		account.ID,
		webhook.Amount,
		webhook.Currency,
		webhook.Remittance,
		webhook.Reference,
		domain.LedgerDirectionCredit,
	)
	ledger.ExternalRef = webhook.ExternalID
	ledger.Credit()

	s.ledgers[ledger.ID] = ledger
	account.Credit(webhook.Amount)

	s.logger.Info("incoming transfer processed", "ledger_id", ledger.ID, "new_balance", account.Balance)
	return nil
}

func (s *LedgerService) CreateOutgoingPayment(ctx context.Context, accountID string, amount int64, currency, description string) (*domain.Ledger, error) {
	s.logger.Info("creating outgoing payment", "account_id", accountID, "amount", amount)

	account, err := s.GetAccount(ctx, accountID)
	if err != nil {
		return nil, err
	}

	if account.Balance < amount {
		s.logger.Warn("insufficient funds", "balance", account.Balance, "requested", amount)
		return nil, provider.ErrInsufficientFunds
	}

	ledger := domain.NewLedger(
		accountID,
		amount,
		currency,
		description,
		fmt.Sprintf("PAY-%d", time.Now().Unix()),
		domain.LedgerDirectionDebit,
	)
	s.ledgers[ledger.ID] = ledger
	account.Debit(amount)

	s.logger.Info("outgoing payment created", "ledger_id", ledger.ID, "new_balance", account.Balance)
	return ledger, nil
}

func (s *LedgerService) CreatePSPPayment(ctx context.Context, accountID string, amount int64, currency, description, reference string) (*provider.Payment, error) {
	s.logger.Info("creating PSP payment", "account_id", accountID, "amount", amount)

	account, err := s.GetAccount(ctx, accountID)
	if err != nil {
		return nil, err
	}

	if account.Balance < amount {
		return nil, provider.ErrInsufficientFunds
	}

	ledger := domain.NewLedger(
		accountID,
		amount,
		currency,
		description,
		reference,
		domain.LedgerDirectionDebit,
	)
	ledger.Status = domain.LedgerStatusPending
	s.ledgers[ledger.ID] = ledger
	account.Debit(amount)

	payment, err := s.pspProvider.CreatePayment(ctx, &provider.CreatePaymentRequest{
		AccountID:   accountID,
		Amount:      amount,
		Currency:    currency,
		Description: description,
		Reference:   reference,
	})
	if err != nil {
		ledger.Fail()
		account.Credit(amount)
		s.logger.Error("PSP payment creation failed", "error", err)
		return nil, err
	}

	s.logger.Info("PSP payment created", "payment_id", payment.ID, "ledger_id", ledger.ID)
	return payment, nil
}

func (s *LedgerService) HandlePaymentWebhook(ctx context.Context, webhook *provider.PaymentWebhook) error {
	s.logger.Info("handling payment webhook", "payment_id", webhook.PaymentID, "status", webhook.Status)

	result, err := s.pspProvider.HandlePaymentWebhook(ctx, webhook)
	if err != nil {
		s.logger.Error("PSP webhook handling failed", "error", err)
		return err
	}

	for _, ledger := range s.ledgers {
		if ledger.Reference == webhook.PaymentID && ledger.Status == domain.LedgerStatusPending {
			switch webhook.Status {
			case provider.PaymentStatusCompleted:
				ledger.Credit()
			case provider.PaymentStatusFailed:
				ledger.Fail()
				account := s.accounts[ledger.AccountID]
				if account != nil {
					account.Credit(ledger.Amount)
				}
			}
			break
		}
	}

	s.logger.Info("payment webhook processed", "success", result.Success)
	return nil
}

func (s *LedgerService) GetLedgerEntries(ctx context.Context, accountID string) []*domain.Ledger {
	var entries []*domain.Ledger
	for _, ledger := range s.ledgers {
		if ledger.AccountID == accountID {
			entries = append(entries, ledger)
		}
	}
	return entries
}

func (s *LedgerService) findAccountByIBAN(iban string) *domain.Account {
	for _, account := range s.accounts {
		if account.IBAN == iban {
			return account
		}
	}
	return nil
}

func (s *LedgerService) validateWebhook(webhook *provider.IncomingTransferWebhook) error {
	if webhook.Amount <= 0 {
		return fmt.Errorf("invalid amount")
	}
	if webhook.IBAN == "" {
		return fmt.Errorf("missing IBAN")
	}
	if webhook.ExternalID == "" {
		return fmt.Errorf("missing external ID")
	}
	return nil
}

type CardService struct {
	cardProvider  provider.CardProvider
	ledgerService *LedgerService
	logger        *slog.Logger
}

func NewCardService(cardProvider provider.CardProvider, ledgerService *LedgerService) *CardService {
	return &CardService{
		cardProvider:  cardProvider,
		ledgerService: ledgerService,
		logger:        slog.Default(),
	}
}

func (s *CardService) CreateCard(ctx context.Context, accountID, holderName string, cardType provider.CardType) (*provider.Card, error) {
	s.logger.Info("creating card", "account_id", accountID, "holder", holderName)

	card, err := s.cardProvider.CreateCard(ctx, &provider.CreateCardRequest{
		AccountID:  accountID,
		HolderName: holderName,
		CardType:   cardType,
	})
	if err != nil {
		s.logger.Error("card creation failed", "error", err)
		return nil, err
	}

	s.logger.Info("card created", "card_id", card.ID)
	return card, nil
}

func (s *CardService) FreezeCard(ctx context.Context, cardID, reason string) (*provider.Card, error) {
	s.logger.Info("freezing card", "card_id", cardID, "reason", reason)
	return s.cardProvider.FreezeCard(ctx, cardID, reason)
}

func (s *CardService) UnfreezeCard(ctx context.Context, cardID string) (*provider.Card, error) {
	s.logger.Info("unfreezing card", "card_id", cardID)
	return s.cardProvider.UnfreezeCard(ctx, cardID)
}

func (s *CardService) HandleAuthorization(ctx context.Context, auth *provider.CardAuthorization) error {
	s.logger.Info("handling authorization", "card_id", auth.CardID, "amount", auth.Amount)

	result, err := s.cardProvider.HandleAuthorization(ctx, auth)
	if err != nil {
		s.logger.Error("authorization failed", "error", err)
		return err
	}

	if !result.Approved {
		s.logger.Warn("authorization declined", "reason", result.Reason)
		return fmt.Errorf("authorization declined: %s", result.Reason)
	}

	ledger := domain.NewLedger(
		auth.CardID,
		auth.Amount,
		"EUR",
		fmt.Sprintf("Card: %s", auth.MerchantName),
		auth.Reference,
		domain.LedgerDirectionDebit,
	)
	ledger.Credit()

	s.logger.Info("authorization approved", "auth_id", result.AuthorizationID)
	return nil
}

type KYCService struct {
	kycProvider provider.KYCProvider
	logger      *slog.Logger
}

func NewKYCService(kycProvider provider.KYCProvider) *KYCService {
	return &KYCService{
		kycProvider: kycProvider,
		logger:      slog.Default(),
	}
}

func (s *KYCService) VerifyIdentity(ctx context.Context, req *provider.KYCVerificationRequest) (*provider.KYCVerification, error) {
	s.logger.Info("verifying identity", "user_id", req.UserID)

	verification, err := s.kycProvider.VerifyIdentity(ctx, req)
	if err != nil {
		s.logger.Error("KYC verification failed", "error", err)
		return nil, err
	}

	s.logger.Info("KYC verification completed", "verification_id", verification.ID, "status", verification.Status)
	return verification, nil
}

func (s *KYCService) HandleKYCWebhook(ctx context.Context, webhook *provider.KYCWebhook) error {
	s.logger.Info("handling KYC webhook", "verification_id", webhook.VerificationID, "status", webhook.Status)

	_, err := s.kycProvider.HandleKYCWebhook(ctx, webhook)
	if err != nil {
		s.logger.Error("KYC webhook handling failed", "error", err)
		return err
	}

	s.logger.Info("KYC webhook processed")
	return nil
}
