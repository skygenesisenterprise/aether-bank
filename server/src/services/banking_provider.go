package services

import (
	"context"
	"crypto/rand"
	"fmt"
	"math/big"
	"time"

	"github.com/skygenesisenterprise/aether-bank/server/src/provider"
)

type BankingProviderService struct {
	ibanProvider provider.IBANProvider
	pspProvider  provider.PSPProvider
	cardProvider provider.CardProvider
	kycProvider  provider.KYCProvider

	treezorClient  *provider.TreezorClient
	mangoPayClient *provider.MangoPayClient

	ibanService *IBANService
	sepaService *SEPAService

	sandboxMode bool
}

type BankingProviderConfig struct {
	Provider         string
	Sandbox          bool
	TreezorAPIKey    string
	MangoPayClientID string
	MangoPayAPIKey   string
}

func NewBankingProviderService(config BankingProviderConfig) *BankingProviderService {
	svc := &BankingProviderService{
		sandboxMode: config.Sandbox,
		ibanService: NewIBANService(),
		sepaService: NewSEPAService(),
	}

	if config.Provider == "treezor" || config.Provider == "auto" {
		svc.treezorClient = provider.NewTreezorClient(provider.TreezorConfig{
			APIKey:  config.TreezorAPIKey,
			Sandbox: config.Sandbox,
		})
	}

	if config.Provider == "mangopay" || config.Provider == "auto" {
		svc.mangoPayClient = provider.NewMangoPayClient(provider.MangoPayConfig{
			ClientID: config.MangoPayClientID,
			APIKey:   config.MangoPayAPIKey,
			Sandbox:  config.Sandbox,
		})
	}

	return svc
}

type SEPAAccount struct {
	ID                string                 `json:"id"`
	IBAN              string                 `json:"iban"`
	BIC               string                 `json:"bic"`
	IBANFormatted     string                 `json:"iban_formatted"`
	BICFormatted      string                 `json:"bic_formatted"`
	Provider          string                 `json:"provider"`
	ProviderRef       string                 `json:"provider_ref"`
	Status            string                 `json:"status"`
	AccountType       string                 `json:"account_type"`
	HolderName        string                 `json:"holder_name"`
	HolderType        string                 `json:"holder_type"`
	Balance           int64                  `json:"balance"`
	Currency          string                 `json:"currency"`
	IsValid           bool                   `json:"is_valid"`
	CanReceiveSEPA    bool                   `json:"can_receive_sepa"`
	CanSendSEPA       bool                   `json:"can_send_sepa"`
	CanReceiveSCTInst bool                   `json:"can_receive_sct_inst"`
	CanSendSCTInst    bool                   `json:"can_send_sct_inst"`
	CanReceiveSDD     bool                   `json:"can_receive_sdd"`
	CanSendSDD        bool                   `json:"can_send_sdd"`
	CreatedAt         time.Time              `json:"created_at"`
	UpdatedAt         time.Time              `json:"updated_at"`
	Metadata          map[string]interface{} `json:"metadata,omitempty"`
}

type CreateSEPAAccountRequest struct {
	AccountType    string                 `json:"account_type" binding:"required"`
	Currency       string                 `json:"currency"`
	HolderName     string                 `json:"holder_name" binding:"required"`
	HolderType     string                 `json:"holder_type"`
	CountryCode    string                 `json:"country_code"`
	UserID         string                 `json:"user_id"`
	InitialBalance int64                  `json:"initial_balance"`
	Label          string                 `json:"label"`
	Metadata       map[string]interface{} `json:"metadata,omitempty"`
}

type SEPATransferRequest struct {
	FromAccountID string `json:"from_account_id"`
	FromIBAN      string `json:"from_iban"`
	ToIBAN        string `json:"to_iban" binding:"required"`
	ToBIC         string `json:"to_bic"`
	ToName        string `json:"to_name" binding:"required"`
	Amount        int64  `json:"amount" binding:"required,gt=0"`
	Currency      string `json:"currency"`
	Reference     string `json:"reference"`
	Description   string `json:"description"`
	EndToEndID    string `json:"end_to_end_id"`
	InstructionID string `json:"instruction_id"`
}

type SEPATransfer struct {
	ID          string     `json:"id"`
	Status      string     `json:"status"`
	Amount      int64      `json:"amount"`
	Currency    string     `json:"currency"`
	FromIBAN    string     `json:"from_iban"`
	ToIBAN      string     `json:"to_iban"`
	ToBIC       string     `json:"to_bic"`
	ToName      string     `json:"to_name"`
	Reference   string     `json:"reference"`
	Description string     `json:"description"`
	EndToEndID  string     `json:"end_to_end_id"`
	ProviderRef string     `json:"provider_ref"`
	Provider    string     `json:"provider"`
	Fees        int64      `json:"fees"`
	CreatedAt   time.Time  `json:"created_at"`
	ExecutedAt  *time.Time `json:"executed_at,omitempty"`
}

func (s *BankingProviderService) CreateSEPAAccount(ctx context.Context, req *CreateSEPAAccountRequest) (*SEPAAccount, error) {
	currency := req.Currency
	if currency == "" {
		currency = "EUR"
	}

	accountType := req.AccountType
	if accountType == "" {
		accountType = "current"
	}

	holderType := req.HolderType
	if holderType == "" {
		holderType = "individual"
	}

	var iban, bic string
	var providerName string
	var providerRef string
	var status string

	if s.treezorClient != nil && !s.sandboxMode {
		wallet, err := s.treezorClient.CreateWallet(ctx, provider.TreezorCreateWalletRequest{
			UserID:     1,
			WalletType: accountType,
			Label:      req.Label,
			Currency:   currency,
			Country:    req.CountryCode,
		})
		if err == nil {
			iban = wallet.IBAN
			bic = wallet.BIC
			providerName = "treezor"
			providerRef = fmt.Sprintf("%d", wallet.WalletID)
			status = wallet.Status
		} else {
			return nil, fmt.Errorf("treezor error: %w", err)
		}
	} else if s.mangoPayClient != nil && !s.sandboxMode {
		wallet, err := s.mangoPayClient.CreateWallet(ctx, req.UserID, currency, req.Label)
		if err == nil {
			iban = wallet.IBAN
			bic = wallet.BIC
			providerName = "mangopay"
			providerRef = wallet.ID
			status = "CREATED"
		} else {
			return nil, fmt.Errorf("mangopay error: %w", err)
		}
	} else {
		iban = s.sepaService.GenerateRandomIBAN(req.CountryCode)
		bic = s.sepaService.GenerateRandomBIC("AETB")
		providerName = "internal"
		providerRef = s.generateAccountID()
		status = "active"
	}

	ibanFormatted := s.sepaService.FormatIBAN(iban)
	bicFormatted := s.sepaService.FormatBIC(bic)

	return &SEPAAccount{
		ID:                providerRef,
		IBAN:              iban,
		BIC:               bic,
		IBANFormatted:     ibanFormatted,
		BICFormatted:      bicFormatted,
		Provider:          providerName,
		ProviderRef:       providerRef,
		Status:            status,
		AccountType:       accountType,
		HolderName:        req.HolderName,
		HolderType:        holderType,
		Balance:           req.InitialBalance,
		Currency:          currency,
		IsValid:           s.ibanService.ValidateIBAN(iban),
		CanReceiveSEPA:    true,
		CanSendSEPA:       true,
		CanReceiveSCTInst: true,
		CanSendSCTInst:    true,
		CanReceiveSDD:     true,
		CanSendSDD:        false,
		CreatedAt:         time.Now(),
		UpdatedAt:         time.Now(),
		Metadata:          req.Metadata,
	}, nil
}

func (s *BankingProviderService) GetAccountDetails(ctx context.Context, ibanOrID string) (*SEPAAccount, error) {
	if s.treezorClient != nil && !s.sandboxMode {
		wallet, err := s.treezorClient.GetWallet(ctx, 1)
		if err == nil {
			return &SEPAAccount{
				ID:            fmt.Sprintf("%d", wallet.WalletID),
				IBAN:          wallet.IBAN,
				BIC:           wallet.BIC,
				Provider:      "treezor",
				ProviderRef:   wallet.ProviderRef,
				Status:        wallet.Status,
				IBANFormatted: s.sepaService.FormatIBAN(wallet.IBAN),
				BICFormatted:  s.sepaService.FormatBIC(wallet.BIC),
			}, nil
		}
	}

	return nil, fmt.Errorf("account not found")
}

func (s *BankingProviderService) CreateSEPATransfer(ctx context.Context, req *SEPATransferRequest) (*SEPATransfer, error) {
	currency := req.Currency
	if currency == "" {
		currency = "EUR"
	}

	endToEndID := req.EndToEndID
	if endToEndID == "" {
		endToEndID = s.sepaService.GenerateEndToEndId()
	}

	instructionID := req.InstructionID
	if instructionID == "" {
		instructionID = s.sepaService.GenerateInstructionId()
	}

	reference := req.Reference
	if reference == "" {
		reference = s.sepaService.GenerateSEPAReference()
	}

	var transferID string
	var status string
	var fees int64

	if s.treezorClient != nil && !s.sandboxMode && req.FromIBAN != "" {
		wallet, err := s.treezorClient.GetWallet(ctx, 1)
		if err == nil {
			transfer, err := s.treezorClient.CreateTransfer(ctx, provider.TreezorTransferRequest{
				WalletID:        wallet.WalletID,
				Amount:          req.Amount,
				Currency:        currency,
				BeneficiaryIBAN: req.ToIBAN,
				BeneficiaryName: req.ToName,
				BeneficiaryBIC:  req.ToBIC,
				Reference:       reference,
			})
			if err == nil {
				transferID = fmt.Sprintf("%d", transfer.TransferID)
				status = transfer.Status
			} else {
				return nil, fmt.Errorf("treezor transfer error: %w", err)
			}
		}
	} else {
		transferID = s.generateTransferID()
		status = "completed"
		fees = 0
	}

	return &SEPATransfer{
		ID:          transferID,
		Status:      status,
		Amount:      req.Amount,
		Currency:    currency,
		FromIBAN:    req.FromIBAN,
		ToIBAN:      req.ToIBAN,
		ToBIC:       req.ToBIC,
		ToName:      req.ToName,
		Reference:   reference,
		Description: req.Description,
		EndToEndID:  endToEndID,
		ProviderRef: transferID,
		Provider:    s.GetActiveProvider(),
		Fees:        fees,
		CreatedAt:   time.Now(),
	}, nil
}

func (s *BankingProviderService) ValidateSEPAAccount(iban string) (bool, string, *provider.IBANAccount) {
	if !s.ibanService.ValidateIBAN(iban) {
		return false, "Invalid IBAN checksum", nil
	}

	details := s.ibanService.ParseIBAN(iban)

	ibanAccount := &provider.IBANAccount{
		IBAN:        iban,
		BIC:         details.BIC,
		Status:      "active",
		ProviderRef: details.BankCode,
	}

	return true, "", ibanAccount
}

func (s *BankingProviderService) GenerateVirtualIBAN(countryCode string) (string, string) {
	iban := s.sepaService.GenerateRandomIBAN(countryCode)
	bic := s.sepaService.GenerateRandomBIC("AETB")
	return iban, bic
}

func (s *BankingProviderService) GetSupportedCountries() []map[string]string {
	return s.sepaService.GetSupportedCountries()
}

func (s *BankingProviderService) IsSandboxMode() bool {
	return s.sandboxMode
}

func (s *BankingProviderService) GetActiveProvider() string {
	if s.treezorClient != nil && !s.sandboxMode {
		return "treezor"
	}
	if s.mangoPayClient != nil && !s.sandboxMode {
		return "mangopay"
	}
	return "internal"
}

func (s *BankingProviderService) generateAccountID() string {
	chars := "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	result := make([]byte, 12)
	for i := range result {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		result[i] = chars[n.Int64()]
	}
	return string(result)
}

func (s *BankingProviderService) generateTransferID() string {
	timestamp := time.Now().UnixNano() % 100000000000000
	return fmt.Sprintf("TRF%d", timestamp)
}

func (s *BankingProviderService) CreateBankInternalAccount(req *CreateSEPAAccountRequest) *SEPAAccount {
	iban := s.sepaService.GenerateRandomIBAN("FR")
	bic := "AETBFRPPXXX"

	ibanFormatted := s.sepaService.FormatIBAN(iban)
	bicFormatted := s.sepaService.FormatBIC(bic)

	return &SEPAAccount{
		ID:                s.generateAccountID(),
		IBAN:              iban,
		BIC:               bic,
		IBANFormatted:     ibanFormatted,
		BICFormatted:      bicFormatted,
		Provider:          "internal",
		ProviderRef:       s.generateAccountID(),
		Status:            "active",
		AccountType:       req.AccountType,
		HolderName:        req.HolderName,
		HolderType:        "business",
		Balance:           req.InitialBalance,
		Currency:          "EUR",
		IsValid:           s.ibanService.ValidateIBAN(iban),
		CanReceiveSEPA:    true,
		CanSendSEPA:       true,
		CanReceiveSCTInst: true,
		CanSendSCTInst:    true,
		CanReceiveSDD:     true,
		CanSendSDD:        true,
		CreatedAt:         time.Now(),
		UpdatedAt:         time.Now(),
	}
}
