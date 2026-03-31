package models

import "time"

type CreditStatus string

const (
	CreditStatusPending   CreditStatus = "pending"
	CreditStatusActive    CreditStatus = "active"
	CreditStatusPaidOff   CreditStatus = "paid_off"
	CreditStatusDefaulted CreditStatus = "defaulted"
	CreditStatusCancelled CreditStatus = "cancelled"
)

type Credit struct {
	ID              string                 `json:"id"`
	AccountID       string                 `json:"account_id"`
	Amount          int64                  `json:"amount"`
	Currency        string                 `json:"currency"`
	Status          CreditStatus           `json:"status"`
	InterestRate    float64                `json:"interest_rate"`
	TermMonths      int                    `json:"term_months"`
	MonthlyPayment  int64                  `json:"monthly_payment"`
	RemainingAmount int64                  `json:"remaining_amount"`
	RemainingMonths int                    `json:"remaining_months"`
	StartDate       time.Time              `json:"start_date"`
	EndDate         time.Time              `json:"end_date"`
	Collateral      string                 `json:"collateral,omitempty"`
	Metadata        map[string]interface{} `json:"metadata,omitempty"`
	CreatedAt       time.Time              `json:"created_at"`
}

type CreditList struct {
	Credits []Credit `json:"data"`
	Total   int      `json:"total"`
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
}

type CreateCreditRequest struct {
	AccountID    string                 `json:"account_id"`
	Amount       int64                  `json:"amount"`
	Currency     string                 `json:"currency"`
	InterestRate float64                `json:"interest_rate"`
	TermMonths   int                    `json:"term_months"`
	Collateral   string                 `json:"collateral,omitempty"`
	Metadata     map[string]interface{} `json:"metadata,omitempty"`
}

type CreditResponse struct {
	Success bool    `json:"success"`
	Data    *Credit `json:"data,omitempty"`
	Error   string  `json:"error,omitempty"`
}

type CreditListResponse struct {
	Success bool        `json:"success"`
	Data    *CreditList `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
