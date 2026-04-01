package models

import "time"

type TransactionType string
type TransactionStatus string

const (
	TransactionTypeCredit      TransactionType = "credit"
	TransactionTypeDebit       TransactionType = "debit"
	TransactionTypeCard        TransactionType = "card"
	TransactionTypeDirectDebit TransactionType = "direct_debit"
	TransactionTypeFee         TransactionType = "fee"
	TransactionTypeRefund      TransactionType = "refund"
)

const (
	TransactionStatusPending    TransactionStatus = "pending"
	TransactionStatusProcessing TransactionStatus = "processing"
	TransactionStatusCompleted  TransactionStatus = "completed"
	TransactionStatusFailed     TransactionStatus = "failed"
	TransactionStatusCancelled  TransactionStatus = "cancelled"
	TransactionStatusReversed   TransactionStatus = "reversed"
)

type Transaction struct {
	ID               string                 `json:"id"`
	AccountID        string                 `json:"account_id"`
	Type             TransactionType        `json:"type"`
	Status           TransactionStatus      `json:"status"`
	Amount           int64                  `json:"amount"`
	Currency         string                 `json:"currency"`
	Description      string                 `json:"description"`
	Reference        string                 `json:"reference,omitempty"`
	BalanceAfter     int64                  `json:"balance_after,omitempty"`
	Counterparty     *Counterparty          `json:"counterparty,omitempty"`
	CounterpartyName string                 `json:"counterparty_name,omitempty"`
	CounterpartyIban string                 `json:"counterparty_iban,omitempty"`
	Merchant         *Merchant              `json:"merchant,omitempty"`
	MerchantName     string                 `json:"merchant_name,omitempty"`
	MerchantCategory string                 `json:"merchant_category,omitempty"`
	Metadata         map[string]interface{} `json:"metadata,omitempty"`
	Reconciled       bool                   `json:"reconciled"`
	CreatedAt        time.Time              `json:"created_at"`
	CompletedAt      *time.Time             `json:"completed_at,omitempty"`
}

type Merchant struct {
	Name     string `json:"name"`
	Category string `json:"category,omitempty"`
}

type TransactionList struct {
	Transactions []Transaction `json:"data"`
	Total        int           `json:"total"`
	Limit        int           `json:"limit"`
	Offset       int           `json:"offset"`
	HasMore      bool          `json:"has_more"`
}

type TransactionSearchRequest struct {
	AccountID string `json:"account_id"`
	Status    string `json:"status"`
	Type      string `json:"type"`
	From      string `json:"from"`
	To        string `json:"to"`
	MinAmount int64  `json:"min_amount"`
	MaxAmount int64  `json:"max_amount"`
	Query     string `json:"q"`
	Limit     int    `json:"limit"`
	Offset    int    `json:"offset"`
}

type ExportTransactionRequest struct {
	AccountID string `json:"account_id"`
	Format    string `json:"format"`
	From      string `json:"from"`
	To        string `json:"to"`
}

type TransactionResponse struct {
	Success bool         `json:"success"`
	Data    *Transaction `json:"data,omitempty"`
	Error   string       `json:"error,omitempty"`
}

type TransactionListResponse struct {
	Success bool             `json:"success"`
	Data    *TransactionList `json:"data,omitempty"`
	Error   string           `json:"error,omitempty"`
}
