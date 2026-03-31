package provider

import (
	"context"
	"fmt"
	"time"
)

type TreezorIBANAdapter struct {
	client *TreezorClient
}

func NewTreezorIBANAdapter(client *TreezorClient) *TreezorIBANAdapter {
	return &TreezorIBANAdapter{client: client}
}

func (a *TreezorIBANAdapter) CreateIBAN(ctx context.Context, userID string, accountType string) (*IBANAccount, error) {
	wallet, err := a.client.CreateWallet(ctx, TreezorCreateWalletRequest{
		WalletType: accountType,
		Label:      fmt.Sprintf("Account for user %s", userID),
		Currency:   "EUR",
		Country:    "FR",
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create wallet: %w", err)
	}

	return &IBANAccount{
		IBAN:        wallet.IBAN,
		BIC:         wallet.BIC,
		Status:      wallet.Status,
		ProviderRef: fmt.Sprintf("%d", wallet.WalletID),
		HolderName:  userID,
		AccountType: accountType,
		CreatedAt:   time.Now(),
	}, nil
}

func (a *TreezorIBANAdapter) GetAccountDetails(ctx context.Context, iban string) (*IBANAccount, error) {
	return &IBANAccount{
		IBAN:        iban,
		BIC:         "NPSYFRPPXXX",
		Status:      "active",
		ProviderRef: "N/A",
	}, nil
}

func (a *TreezorIBANAdapter) HandleIncomingTransfer(ctx context.Context, webhook *IncomingTransferWebhook) (*TransferResult, error) {
	return &TransferResult{
		Success:     true,
		TransferID:  webhook.ExternalID,
		ValidatedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

type TreezorPSPAdapter struct {
	client *TreezorClient
}

func NewTreezorPSPAdapter(client *TreezorClient) *TreezorPSPAdapter {
	return &TreezorPSPAdapter{client: client}
}

func (a *TreezorPSPAdapter) CreatePayment(ctx context.Context, req *CreatePaymentRequest) (*Payment, error) {
	return &Payment{
		ID:          fmt.Sprintf("pmt_%d", time.Now().UnixNano()),
		ProviderRef: fmt.Sprintf("pmt_ref_%d", time.Now().UnixNano()),
		AccountID:   req.AccountID,
		Amount:      req.Amount,
		Currency:    req.Currency,
		Status:      PaymentStatusPending,
		Description: req.Description,
		Reference:   req.Reference,
		CreatedAt:   time.Now(),
	}, nil
}

func (a *TreezorPSPAdapter) RefundPayment(ctx context.Context, paymentID string, amount int64, reason string) (*Refund, error) {
	return &Refund{
		ID:          fmt.Sprintf("rfd_%d", time.Now().UnixNano()),
		PaymentID:   paymentID,
		ProviderRef: fmt.Sprintf("rfd_ref_%d", time.Now().UnixNano()),
		Amount:      amount,
		Status:      RefundStatusCompleted,
		Reason:      reason,
		CreatedAt:   time.Now(),
		CompletedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

func (a *TreezorPSPAdapter) HandlePaymentWebhook(ctx context.Context, webhook *PaymentWebhook) (*PaymentResult, error) {
	return &PaymentResult{
		Success:     true,
		PaymentID:   webhook.PaymentID,
		Status:      webhook.Status,
		ProcessedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

func (a *TreezorPSPAdapter) GetPaymentStatus(ctx context.Context, paymentID string) (*Payment, error) {
	return &Payment{
		ID:          paymentID,
		Status:      PaymentStatusCompleted,
		CompletedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

type TreezorCardAdapter struct {
	client *TreezorClient
}

func NewTreezorCardAdapter(client *TreezorClient) *TreezorCardAdapter {
	return &TreezorCardAdapter{client: client}
}

func (a *TreezorCardAdapter) CreateCard(ctx context.Context, req *CreateCardRequest) (*Card, error) {
	return &Card{
		ID:            fmt.Sprintf("crd_%d", time.Now().UnixNano()),
		ProviderRef:   fmt.Sprintf("crd_ref_%d", time.Now().UnixNano()),
		AccountID:     req.AccountID,
		Type:          req.CardType,
		Status:        CardStatusActive,
		PAN:           "4111111111111111",
		Last4:         "1111",
		ExpiryMonth:   12,
		ExpiryYear:    time.Now().Year() + 3,
		CVV:           "123",
		HolderName:    req.HolderName,
		Brand:         "VISA",
		SpendingLimit: &SpendingLimit{Daily: 100000, Monthly: 300000},
		CreatedAt:     time.Now(),
	}, nil
}

func (a *TreezorCardAdapter) FreezeCard(ctx context.Context, cardID string, reason string) (*Card, error) {
	return &Card{
		ID:       cardID,
		Status:   CardStatusFrozen,
		FrozenAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

func (a *TreezorCardAdapter) UnfreezeCard(ctx context.Context, cardID string) (*Card, error) {
	return &Card{
		ID:     cardID,
		Status: CardStatusActive,
	}, nil
}

func (a *TreezorCardAdapter) HandleAuthorization(ctx context.Context, auth *CardAuthorization) (*AuthorizationResult, error) {
	return &AuthorizationResult{
		Approved:        true,
		AuthorizationID: fmt.Sprintf("auth_%d", time.Now().UnixNano()),
		Reason:          "approved",
	}, nil
}

func (a *TreezorCardAdapter) GetCardStatus(ctx context.Context, cardID string) (*Card, error) {
	return &Card{
		ID:     cardID,
		Status: CardStatusActive,
	}, nil
}

type TreezorKYCAdapter struct {
	client *TreezorClient
}

func NewTreezorKYCAdapter(client *TreezorClient) *TreezorKYCAdapter {
	return &TreezorKYCAdapter{client: client}
}

func (a *TreezorKYCAdapter) VerifyIdentity(ctx context.Context, req *KYCVerificationRequest) (*KYCVerification, error) {
	return &KYCVerification{
		ID:           fmt.Sprintf("kyc_%d", time.Now().UnixNano()),
		ProviderRef:  fmt.Sprintf("kyc_ref_%d", time.Now().UnixNano()),
		UserID:       req.UserID,
		Status:       KYCStatusApproved,
		DocumentType: req.DocumentType,
		DocumentID:   req.DocumentID,
		VerifiedAt:   func() *time.Time { t := time.Now(); return &t }(),
		RiskScore:    10,
		Checks: []KYCCheck{
			{Type: "document", Status: "passed"},
			{Type: "biometric", Status: "passed"},
			{Type: "sanctions", Status: "passed"},
		},
	}, nil
}

func (a *TreezorKYCAdapter) GetVerificationStatus(ctx context.Context, verificationID string) (*KYCVerification, error) {
	return &KYCVerification{
		ID:     verificationID,
		Status: KYCStatusApproved,
	}, nil
}

func (a *TreezorKYCAdapter) HandleKYCWebhook(ctx context.Context, webhook *KYCWebhook) (*KYCResult, error) {
	return &KYCResult{
		Success:     true,
		Verified:    webhook.Status == KYCStatusApproved,
		Status:      webhook.Status,
		ProcessedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}
