package models

import "time"

type TransferType string
type TransferStatus string

const (
	TransferTypeSEPA          TransferType = "sepa"
	TransferTypeInstant       TransferType = "instant"
	TransferTypeInternational TransferType = "international"
)

const (
	TransferStatusPending    TransferStatus = "pending"
	TransferStatusProcessing TransferStatus = "processing"
	TransferStatusCompleted  TransferStatus = "completed"
	TransferStatusFailed     TransferStatus = "failed"
	TransferStatusCancelled  TransferStatus = "cancelled"
)

type Transfer struct {
	ID            string         `json:"id"`
	AccountID     string         `json:"account_id"`
	Type          TransferType   `json:"type"`
	Status        TransferStatus `json:"status"`
	Amount        int64          `json:"amount"`
	Currency      string         `json:"currency"`
	Description   string         `json:"description"`
	Reference     string         `json:"reference,omitempty"`
	Counterparty  *Counterparty  `json:"counterparty,omitempty"`
	ScheduledDate *time.Time     `json:"scheduled_date,omitempty"`
	CompletedAt   *time.Time     `json:"completed_at,omitempty"`
	FailureReason string         `json:"failure_reason,omitempty"`
	CreatedAt     time.Time      `json:"created_at"`
}

type Counterparty struct {
	Name string `json:"name"`
	IBAN string `json:"iban"`
	BIC  string `json:"bic,omitempty"`
}

type TransferList struct {
	Transfers []Transfer `json:"data"`
	Total     int        `json:"total"`
	Limit     int        `json:"limit"`
	Offset    int        `json:"offset"`
}

type CreateTransferRequest struct {
	AccountID     string        `json:"account_id"`
	Type          TransferType  `json:"type"`
	Amount        int64         `json:"amount"`
	Currency      string        `json:"currency"`
	Description   string        `json:"description"`
	Reference     string        `json:"reference,omitempty"`
	Counterparty  *Counterparty `json:"counterparty"`
	ScheduledDate string        `json:"scheduled_date,omitempty"`
}

type TransferResponse struct {
	Success bool      `json:"success"`
	Data    *Transfer `json:"data,omitempty"`
	Error   string    `json:"error,omitempty"`
}

type TransferListResponse struct {
	Success bool          `json:"success"`
	Data    *TransferList `json:"data,omitempty"`
	Error   string        `json:"error,omitempty"`
}
