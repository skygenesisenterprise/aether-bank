package provider

import (
	"context"
	"errors"
	"time"
)

type IBANProvider interface {
	CreateIBAN(ctx context.Context, userID string, accountType string) (*IBANAccount, error)
	GetAccountDetails(ctx context.Context, iban string) (*IBANAccount, error)
	HandleIncomingTransfer(ctx context.Context, webhook *IncomingTransferWebhook) (*TransferResult, error)
}

type IBANAccount struct {
	IBAN        string         `json:"iban"`
	BIC         string         `json:"bic"`
	Status      string         `json:"status"`
	ProviderRef string         `json:"provider_ref"`
	HolderName  string         `json:"holder_name"`
	AccountType string         `json:"account_type"`
	CreatedAt   time.Time      `json:"created_at"`
	Metadata    map[string]any `json:"metadata,omitempty"`
}

type IncomingTransferWebhook struct {
	ExternalID string    `json:"external_id"`
	IBAN       string    `json:"iban"`
	Amount     int64     `json:"amount"`
	Currency   string    `json:"currency"`
	SenderName string    `json:"sender_name"`
	SenderIBAN string    `json:"sender_iban"`
	SenderBIC  string    `json:"sender_bic"`
	Reference  string    `json:"reference"`
	Remittance string    `json:"remittance"`
	ReceivedAt time.Time `json:"received_at"`
	Signature  string    `json:"signature"`
}

type TransferResult struct {
	Success     bool       `json:"success"`
	TransferID  string     `json:"transfer_id,omitempty"`
	Error       string     `json:"error,omitempty"`
	ValidatedAt *time.Time `json:"validated_at,omitempty"`
}

type PSPProvider interface {
	CreatePayment(ctx context.Context, req *CreatePaymentRequest) (*Payment, error)
	RefundPayment(ctx context.Context, paymentID string, amount int64, reason string) (*Refund, error)
	HandlePaymentWebhook(ctx context.Context, webhook *PaymentWebhook) (*PaymentResult, error)
	GetPaymentStatus(ctx context.Context, paymentID string) (*Payment, error)
}

type CreatePaymentRequest struct {
	AccountID   string         `json:"account_id"`
	Amount      int64          `json:"amount"`
	Currency    string         `json:"currency"`
	Description string         `json:"description"`
	Reference   string         `json:"reference"`
	CallbackURL string         `json:"callback_url"`
	Metadata    map[string]any `json:"metadata,omitempty"`
}

type Payment struct {
	ID          string         `json:"id"`
	ProviderRef string         `json:"provider_ref"`
	AccountID   string         `json:"account_id"`
	Amount      int64          `json:"amount"`
	Currency    string         `json:"currency"`
	Status      PaymentStatus  `json:"status"`
	Description string         `json:"description"`
	Reference   string         `json:"reference"`
	RedirectURL string         `json:"redirect_url,omitempty"`
	Metadata    map[string]any `json:"metadata,omitempty"`
	CreatedAt   time.Time      `json:"created_at"`
	CompletedAt *time.Time     `json:"completed_at,omitempty"`
}

type PaymentStatus string

const (
	PaymentStatusPending    PaymentStatus = "pending"
	PaymentStatusProcessing PaymentStatus = "processing"
	PaymentStatusCompleted  PaymentStatus = "completed"
	PaymentStatusFailed     PaymentStatus = "failed"
	PaymentStatusCancelled  PaymentStatus = "cancelled"
	PaymentStatusRefunded   PaymentStatus = "refunded"
)

type PaymentWebhook struct {
	EventType   string         `json:"event_type"`
	PaymentID   string         `json:"payment_id"`
	ProviderRef string         `json:"provider_ref"`
	Status      PaymentStatus  `json:"status"`
	Amount      int64          `json:"amount"`
	Currency    string         `json:"currency"`
	Metadata    map[string]any `json:"metadata,omitempty"`
	Signature   string         `json:"signature"`
	Timestamp   time.Time      `json:"timestamp"`
}

type PaymentResult struct {
	Success     bool          `json:"success"`
	PaymentID   string        `json:"payment_id,omitempty"`
	Status      PaymentStatus `json:"status,omitempty"`
	Error       string        `json:"error,omitempty"`
	ProcessedAt *time.Time    `json:"processed_at,omitempty"`
}

type Refund struct {
	ID          string       `json:"id"`
	PaymentID   string       `json:"payment_id"`
	ProviderRef string       `json:"provider_ref"`
	Amount      int64        `json:"amount"`
	Status      RefundStatus `json:"status"`
	Reason      string       `json:"reason"`
	CreatedAt   time.Time    `json:"created_at"`
	CompletedAt *time.Time   `json:"completed_at,omitempty"`
}

type RefundStatus string

const (
	RefundStatusPending   RefundStatus = "pending"
	RefundStatusCompleted RefundStatus = "completed"
	RefundStatusFailed    RefundStatus = "failed"
)

type CardProvider interface {
	CreateCard(ctx context.Context, req *CreateCardRequest) (*Card, error)
	FreezeCard(ctx context.Context, cardID string, reason string) (*Card, error)
	UnfreezeCard(ctx context.Context, cardID string) (*Card, error)
	HandleAuthorization(ctx context.Context, auth *CardAuthorization) (*AuthorizationResult, error)
	GetCardStatus(ctx context.Context, cardID string) (*Card, error)
}

type CreateCardRequest struct {
	AccountID  string         `json:"account_id"`
	HolderName string         `json:"holder_name"`
	CardType   CardType       `json:"card_type"`
	Metadata   map[string]any `json:"metadata,omitempty"`
}

type CardType string

const (
	CardTypePhysical CardType = "physical"
	CardTypeVirtual  CardType = "virtual"
)

type Card struct {
	ID            string         `json:"id"`
	ProviderRef   string         `json:"provider_ref"`
	AccountID     string         `json:"account_id"`
	Type          CardType       `json:"type"`
	Status        CardStatus     `json:"status"`
	PAN           string         `json:"pan,omitempty"`
	Last4         string         `json:"last4"`
	ExpiryMonth   int            `json:"expiry_month"`
	ExpiryYear    int            `json:"expiry_year"`
	CVV           string         `json:"cvv,omitempty"`
	HolderName    string         `json:"holder_name"`
	Brand         string         `json:"brand"`
	SpendingLimit *SpendingLimit `json:"spending_limit,omitempty"`
	CreatedAt     time.Time      `json:"created_at"`
	FrozenAt      *time.Time     `json:"frozen_at,omitempty"`
}

type CardStatus string

const (
	CardStatusPending   CardStatus = "pending"
	CardStatusActive    CardStatus = "active"
	CardStatusFrozen    CardStatus = "frozen"
	CardStatusBlocked   CardStatus = "blocked"
	CardStatusExpired   CardStatus = "expired"
	CardStatusCancelled CardStatus = "cancelled"
)

type SpendingLimit struct {
	Daily   int64 `json:"daily"`
	Monthly int64 `json:"monthly"`
}

type CardAuthorization struct {
	CardID       string         `json:"card_id"`
	Amount       int64          `json:"amount"`
	Currency     string         `json:"currency"`
	MerchantID   string         `json:"merchant_id"`
	MerchantName string         `json:"merchant_name"`
	MCC          string         `json:"mcc"`
	Reference    string         `json:"reference"`
	Metadata     map[string]any `json:"metadata,omitempty"`
}

type AuthorizationResult struct {
	Approved        bool   `json:"approved"`
	AuthorizationID string `json:"authorization_id,omitempty"`
	Reason          string `json:"reason,omitempty"`
	NewBalance      int64  `json:"new_balance,omitempty"`
}

type KYCProvider interface {
	VerifyIdentity(ctx context.Context, req *KYCVerificationRequest) (*KYCVerification, error)
	GetVerificationStatus(ctx context.Context, verificationID string) (*KYCVerification, error)
	HandleKYCWebhook(ctx context.Context, webhook *KYCWebhook) (*KYCResult, error)
}

type KYCVerificationRequest struct {
	UserID       string         `json:"user_id"`
	DocumentType string         `json:"document_type"`
	DocumentID   string         `json:"document_id"`
	FirstName    string         `json:"first_name"`
	LastName     string         `json:"last_name"`
	DateOfBirth  string         `json:"date_of_birth"`
	Nationality  string         `json:"nationality"`
	Address      *KYCAddress    `json:"address,omitempty"`
	Metadata     map[string]any `json:"metadata,omitempty"`
}

type KYCAddress struct {
	Street     string `json:"street"`
	City       string `json:"city"`
	PostalCode string `json:"postal_code"`
	Country    string `json:"country"`
}

type KYCVerification struct {
	ID           string         `json:"id"`
	ProviderRef  string         `json:"provider_ref"`
	UserID       string         `json:"user_id"`
	Status       KYCStatus      `json:"status"`
	DocumentType string         `json:"document_type"`
	DocumentID   string         `json:"document_id"`
	VerifiedAt   *time.Time     `json:"verified_at,omitempty"`
	ExpiresAt    *time.Time     `json:"expires_at,omitempty"`
	RiskScore    int            `json:"risk_score"`
	Checks       []KYCCheck     `json:"checks"`
	Metadata     map[string]any `json:"metadata,omitempty"`
}

type KYCStatus string

const (
	KYCStatusPending  KYCStatus = "pending"
	KYCStatusReview   KYCStatus = "review"
	KYCStatusApproved KYCStatus = "approved"
	KYCStatusRejected KYCStatus = "rejected"
	KYCStatusExpired  KYCStatus = "expired"
)

type KYCCheck struct {
	Type      string     `json:"type"`
	Status    string     `json:"status"`
	Reason    string     `json:"reason,omitempty"`
	CheckedAt *time.Time `json:"checked_at,omitempty"`
}

type KYCWebhook struct {
	EventType      string         `json:"event_type"`
	VerificationID string         `json:"verification_id"`
	ProviderRef    string         `json:"provider_ref"`
	Status         KYCStatus      `json:"status"`
	RiskScore      int            `json:"risk_score"`
	Metadata       map[string]any `json:"metadata,omitempty"`
	Signature      string         `json:"signature"`
	Timestamp      time.Time      `json:"timestamp"`
}

type KYCResult struct {
	Success     bool       `json:"success"`
	Verified    bool       `json:"verified"`
	Status      KYCStatus  `json:"status,omitempty"`
	Error       string     `json:"error,omitempty"`
	ProcessedAt *time.Time `json:"processed_at,omitempty"`
}

type ProviderFactory func(config map[string]any) (any, error)

type ProviderRegistry struct {
	ibanProviders map[string]ProviderFactory
	pspProviders  map[string]ProviderFactory
	cardProviders map[string]ProviderFactory
	kycProviders  map[string]ProviderFactory
}

func NewProviderRegistry() *ProviderRegistry {
	return &ProviderRegistry{
		ibanProviders: make(map[string]ProviderFactory),
		pspProviders:  make(map[string]ProviderFactory),
		cardProviders: make(map[string]ProviderFactory),
		kycProviders:  make(map[string]ProviderFactory),
	}
}

func (r *ProviderRegistry) RegisterIBANProvider(name string, factory ProviderFactory) {
	r.ibanProviders[name] = factory
}

func (r *ProviderRegistry) RegisterPSPProvider(name string, factory ProviderFactory) {
	r.pspProviders[name] = factory
}

func (r *ProviderRegistry) RegisterCardProvider(name string, factory ProviderFactory) {
	r.cardProviders[name] = factory
}

func (r *ProviderRegistry) RegisterKYCProvider(name string, factory ProviderFactory) {
	r.kycProviders[name] = factory
}

func (r *ProviderRegistry) GetIBANProvider(name string) (IBANProvider, error) {
	factory, ok := r.ibanProviders[name]
	if !ok {
		return nil, ErrProviderNotFound
	}
	instance, err := factory(nil)
	if err != nil {
		return nil, err
	}
	return instance.(IBANProvider), nil
}

func (r *ProviderRegistry) GetPSPProvider(name string) (PSPProvider, error) {
	factory, ok := r.pspProviders[name]
	if !ok {
		return nil, ErrProviderNotFound
	}
	instance, err := factory(nil)
	if err != nil {
		return nil, err
	}
	return instance.(PSPProvider), nil
}

func (r *ProviderRegistry) GetCardProvider(name string) (CardProvider, error) {
	factory, ok := r.cardProviders[name]
	if !ok {
		return nil, ErrProviderNotFound
	}
	instance, err := factory(nil)
	if err != nil {
		return nil, err
	}
	return instance.(CardProvider), nil
}

func (r *ProviderRegistry) GetKYCProvider(name string) (KYCProvider, error) {
	factory, ok := r.kycProviders[name]
	if !ok {
		return nil, ErrProviderNotFound
	}
	instance, err := factory(nil)
	if err != nil {
		return nil, err
	}
	return instance.(KYCProvider), nil
}

var ErrProviderNotFound = errors.New("provider not found")
var ErrInvalidSignature = errors.New("invalid signature")
var ErrInsufficientFunds = errors.New("insufficient funds")
var ErrAccountNotFound = errors.New("account not found")
var ErrInvalidState = errors.New("invalid state transition")
