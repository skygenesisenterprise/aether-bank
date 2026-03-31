package models

import "time"

type CardType string
type CardStatus string

const (
	CardTypePhysical CardType = "physical"
	CardTypeVirtual  CardType = "virtual"
	CardTypeBurn     CardType = "burn"
	CardTypeBusiness CardType = "business"
)

const (
	CardStatusPending CardStatus = "pending"
	CardStatusActive  CardStatus = "active"
	CardStatusFrozen  CardStatus = "frozen"
	CardStatusBlocked CardStatus = "blocked"
	CardStatusExpired CardStatus = "expired"
)

type BankingCard struct {
	ID                string          `json:"id"`
	AccountID         string          `json:"account_id"`
	Type              CardType        `json:"type"`
	Status            CardStatus      `json:"status"`
	HolderName        string          `json:"holder_name"`
	Last4             string          `json:"last4"`
	ExpiryMonth       int             `json:"expiry_month"`
	ExpiryYear        int             `json:"expiry_year"`
	Brand             string          `json:"brand"`
	PAN               string          `json:"pan,omitempty"`
	CVV               string          `json:"cvv,omitempty"`
	SpendingLimits    *SpendingLimits `json:"spending_limits"`
	FrozenAt          *time.Time      `json:"frozen_at,omitempty"`
	FrozenReason      string          `json:"frozen_reason,omitempty"`
	EstimatedDelivery *time.Time      `json:"estimated_delivery,omitempty"`
	CreatedAt         time.Time       `json:"created_at"`
}

type SpendingLimits struct {
	Daily             int64 `json:"daily"`
	Monthly           int64 `json:"monthly"`
	PerTransaction    int64 `json:"per_transaction,omitempty"`
	CurrentDaySpent   int64 `json:"current_day_spent,omitempty"`
	CurrentMonthSpent int64 `json:"current_month_spent,omitempty"`
}

type CardList struct {
	Cards  []BankingCard `json:"data"`
	Total  int           `json:"total"`
	Limit  int           `json:"limit"`
	Offset int           `json:"offset"`
}

type CreateCardRequest struct {
	AccountID      string          `json:"account_id"`
	Type           CardType        `json:"type"`
	HolderName     string          `json:"holder_name"`
	SpendingLimits *SpendingLimits `json:"spending_limits"`
	ValidUntil     string          `json:"valid_until,omitempty"`
	Options        *CardOptions    `json:"options,omitempty"`
}

type CardOptions struct {
	Contactless   bool `json:"contactless"`
	International bool `json:"international"`
	Withdrawal    bool `json:"withdrawal"`
}

type FreezeCardRequest struct {
	Reason string `json:"reason"`
}

type CardResponse struct {
	Success bool         `json:"success"`
	Data    *BankingCard `json:"data,omitempty"`
	Error   string       `json:"error,omitempty"`
}

type CardListResponse struct {
	Success bool      `json:"success"`
	Data    *CardList `json:"data,omitempty"`
	Error   string    `json:"error,omitempty"`
}
