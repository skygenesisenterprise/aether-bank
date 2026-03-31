package domain

import "time"

type AccountStatus string

const (
	AccountStatusPendingKYC AccountStatus = "pending_kyc"
	AccountStatusActive     AccountStatus = "active"
	AccountStatusRestricted AccountStatus = "restricted"
	AccountStatusClosed     AccountStatus = "closed"
	AccountStatusBlocked    AccountStatus = "blocked"
)

type AccountType string

const (
	AccountTypeCurrent  AccountType = "current"
	AccountTypeBusiness AccountType = "business"
	AccountTypeSavings  AccountType = "savings"
)

type Account struct {
	ID          string         `json:"id"`
	IBAN        string         `json:"iban"`
	BIC         string         `json:"bic"`
	Type        AccountType    `json:"type"`
	Status      AccountStatus  `json:"status"`
	Currency    string         `json:"currency"`
	Balance     int64          `json:"balance"`
	Available   int64          `json:"available"`
	ProviderRef string         `json:"provider_ref,omitempty"`
	Metadata    map[string]any `json:"metadata,omitempty"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}

type AccountBalance struct {
	Available int64 `json:"available"`
	Current   int64 `json:"current"`
	Pending   int64 `json:"pending"`
}

func NewAccount(iban, bic string, accountType AccountType, currency string) *Account {
	now := time.Now()
	return &Account{
		ID:        generateID("acc"),
		IBAN:      iban,
		BIC:       bic,
		Type:      accountType,
		Status:    AccountStatusPendingKYC,
		Currency:  currency,
		Balance:   0,
		Available: 0,
		CreatedAt: now,
		UpdatedAt: now,
	}
}

func (a *Account) Credit(amount int64) {
	a.Balance += amount
	a.Available += amount
	a.UpdatedAt = time.Now()
}

func (a *Account) Debit(amount int64) {
	a.Balance -= amount
	a.Available -= amount
	a.UpdatedAt = time.Now()
}

func (a *Account) Activate() {
	a.Status = AccountStatusActive
	a.UpdatedAt = time.Now()
}

func (a *Account) Block(reason string) {
	a.Status = AccountStatusBlocked
	if a.Metadata == nil {
		a.Metadata = make(map[string]any)
	}
	a.Metadata["block_reason"] = reason
	a.UpdatedAt = time.Now()
}
