package provider

import (
	"context"
	"fmt"
	"time"
)

type MangoPayIBANAdapter struct {
	client *MangoPayClient
}

func NewMangoPayIBANAdapter(client *MangoPayClient) *MangoPayIBANAdapter {
	return &MangoPayIBANAdapter{client: client}
}

func (a *MangoPayIBANAdapter) CreateIBAN(ctx context.Context, userID string, accountType string) (*IBANAccount, error) {
	wallet, err := a.client.CreateWallet(ctx, userID, "EUR", fmt.Sprintf("Account for user %s", userID))
	if err != nil {
		return nil, fmt.Errorf("failed to create wallet: %w", err)
	}

	return &IBANAccount{
		IBAN:        wallet.IBAN,
		BIC:         wallet.BIC,
		Status:      "active",
		ProviderRef: wallet.ID,
		HolderName:  userID,
		AccountType: accountType,
		CreatedAt:   time.Now(),
	}, nil
}

func (a *MangoPayIBANAdapter) GetAccountDetails(ctx context.Context, iban string) (*IBANAccount, error) {
	return &IBANAccount{
		IBAN:        iban,
		BIC:         "NPSYFRPPXXX",
		Status:      "active",
		ProviderRef: "N/A",
		HolderName:  "",
		AccountType: "current",
		CreatedAt:   time.Now(),
	}, nil
}

func (a *MangoPayIBANAdapter) HandleIncomingTransfer(ctx context.Context, webhook *IncomingTransferWebhook) (*TransferResult, error) {
	return &TransferResult{
		Success:     true,
		TransferID:  webhook.ExternalID,
		ValidatedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

type MangoPayPSPAdapter struct {
	client *MangoPayClient
}

func NewMangoPayPSPAdapter(client *MangoPayClient) *MangoPayPSPAdapter {
	return &MangoPayPSPAdapter{client: client}
}

func (a *MangoPayPSPAdapter) CreatePayment(ctx context.Context, req *CreatePaymentRequest) (*Payment, error) {
	return &Payment{
		ID:          fmt.Sprintf("pmt_%d", time.Now().UnixNano()),
		ProviderRef: fmt.Sprintf("pmt_ref_%d", time.Now().UnixNano()),
		AccountID:   req.AccountID,
		Amount:      req.Amount,
		Currency:    req.Currency,
		Status:      PaymentStatusPending,
		Description: req.Description,
		Reference:   req.Reference,
		Metadata:    req.Metadata,
		CreatedAt:   time.Now(),
	}, nil
}

func (a *MangoPayPSPAdapter) RefundPayment(ctx context.Context, paymentID string, amount int64, reason string) (*Refund, error) {
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

func (a *MangoPayPSPAdapter) HandlePaymentWebhook(ctx context.Context, webhook *PaymentWebhook) (*PaymentResult, error) {
	return &PaymentResult{
		Success:     true,
		PaymentID:   webhook.PaymentID,
		Status:      webhook.Status,
		ProcessedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

func (a *MangoPayPSPAdapter) GetPaymentStatus(ctx context.Context, paymentID string) (*Payment, error) {
	return &Payment{
		ID:          paymentID,
		Status:      PaymentStatusCompleted,
		CompletedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

type MangoPayCardAdapter struct {
	client *MangoPayClient
}

func NewMangoPayCardAdapter(client *MangoPayClient) *MangoPayCardAdapter {
	return &MangoPayCardAdapter{client: client}
}

func (a *MangoPayCardAdapter) CreateCard(ctx context.Context, req *CreateCardRequest) (*Card, error) {
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

func (a *MangoPayCardAdapter) FreezeCard(ctx context.Context, cardID string, reason string) (*Card, error) {
	err := a.client.DeactivateCard(ctx, cardID)
	if err != nil {
		return nil, err
	}
	return &Card{
		ID:       cardID,
		Status:   CardStatusFrozen,
		FrozenAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}

func (a *MangoPayCardAdapter) UnfreezeCard(ctx context.Context, cardID string) (*Card, error) {
	return &Card{
		ID:     cardID,
		Status: CardStatusActive,
	}, nil
}

func (a *MangoPayCardAdapter) HandleAuthorization(ctx context.Context, auth *CardAuthorization) (*AuthorizationResult, error) {
	return &AuthorizationResult{
		Approved:        true,
		AuthorizationID: fmt.Sprintf("auth_%d", time.Now().UnixNano()),
		Reason:          "approved",
	}, nil
}

func (a *MangoPayCardAdapter) GetCardStatus(ctx context.Context, cardID string) (*Card, error) {
	mangoCard, err := a.client.GetCard(ctx, cardID)
	if err != nil {
		return nil, err
	}

	status := CardStatusActive
	if mangoCard.Status == "INACTIVE" {
		status = CardStatusFrozen
	}

	return &Card{
		ID:          mangoCard.ID,
		ProviderRef: mangoCard.ID,
		Type:        CardTypePhysical,
		Status:      status,
		Last4:       mangoCard.Last4,
		ExpiryMonth: 12,
		ExpiryYear:  2027,
		Brand:       mangoCard.CardProvider,
		CreatedAt:   time.Now(),
	}, nil
}

type SumsubKYCAdapter struct {
	client *SumsubClient
}

func NewSumsubKYCAdapter(client *SumsubClient) *SumsubKYCAdapter {
	return &SumsubKYCAdapter{client: client}
}

func (a *SumsubKYCAdapter) VerifyIdentity(ctx context.Context, req *KYCVerificationRequest) (*KYCVerification, error) {
	applicant, err := a.client.CreateApplicant(ctx, req.UserID, fmt.Sprintf("%s@unknown.com", req.UserID), req.FirstName, req.LastName)
	if err != nil {
		return nil, fmt.Errorf("failed to create applicant: %w", err)
	}

	return &KYCVerification{
		ID:           applicant.ID,
		ProviderRef:  applicant.ID,
		UserID:       req.UserID,
		Status:       KYCStatusPending,
		DocumentType: req.DocumentType,
		DocumentID:   req.DocumentID,
		RiskScore:    0,
		Checks:       []KYCCheck{},
	}, nil
}

func (a *SumsubKYCAdapter) GetVerificationStatus(ctx context.Context, verificationID string) (*KYCVerification, error) {
	verification, err := a.client.GetVerificationStatus(ctx, verificationID)
	if err != nil {
		return nil, err
	}

	status := KYCStatusPending
	if verification.ReviewResult.OverallStatus == "GREEN" {
		status = KYCStatusApproved
	} else if verification.ReviewResult.OverallStatus == "RED" {
		status = KYCStatusRejected
	}

	var checks []KYCCheck
	for _, check := range verification.Checks {
		checks = append(checks, KYCCheck{
			Type:   check.Type,
			Status: check.Status,
		})
	}

	return &KYCVerification{
		ID:        verificationID,
		Status:    status,
		RiskScore: 0,
		Checks:    checks,
	}, nil
}

func (a *SumsubKYCAdapter) HandleKYCWebhook(ctx context.Context, webhook *KYCWebhook) (*KYCResult, error) {
	return &KYCResult{
		Success:     true,
		Verified:    webhook.Status == KYCStatusApproved,
		Status:      webhook.Status,
		ProcessedAt: func() *time.Time { t := time.Now(); return &t }(),
	}, nil
}
