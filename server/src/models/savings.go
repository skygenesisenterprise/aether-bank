package models

import "time"

type SavingsStatus string

const (
	SavingsStatusActive SavingsStatus = "active"
	SavingsStatusClosed SavingsStatus = "closed"
	SavingsStatusFrozen SavingsStatus = "frozen"
)

type SavingsAccount struct {
	ID              string        `json:"id"`
	AccountID       string        `json:"account_id"`
	Currency        string        `json:"currency"`
	Status          SavingsStatus `json:"status"`
	InterestRate    float64       `json:"interest_rate"`
	Balance         int64         `json:"balance"`
	AccruedInterest int64         `json:"accrued_interest"`
	TotalCredits    int64         `json:"total_credits"`
	TotalDebits     int64         `json:"total_debits"`
	CreatedAt       time.Time     `json:"created_at"`
	UpdatedAt       time.Time     `json:"updated_at"`
}

type SavingsList struct {
	Accounts []SavingsAccount `json:"data"`
	Total    int              `json:"total"`
	Limit    int              `json:"limit"`
	Offset   int              `json:"offset"`
}

type CreateSavingsRequest struct {
	AccountID    string                 `json:"account_id"`
	Currency     string                 `json:"currency"`
	InterestRate float64                `json:"interest_rate"`
	Metadata     map[string]interface{} `json:"metadata,omitempty"`
}

type SavingsResponse struct {
	Success bool            `json:"success"`
	Data    *SavingsAccount `json:"data,omitempty"`
	Error   string          `json:"error,omitempty"`
}

type SavingsListResponse struct {
	Success bool         `json:"success"`
	Data    *SavingsList `json:"data,omitempty"`
	Error   string       `json:"error,omitempty"`
}
