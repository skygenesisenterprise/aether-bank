package domain

import "time"

type TransferType string
type TransferDirection string
type TransferStatus string

const (
	TransferTypeInternal TransferType = "internal"
	TransferTypeOutgoing TransferType = "outgoing"
	TransferTypeIncoming TransferType = "incoming"
	TransferTypeSEPA     TransferType = "sepa"
)

const (
	TransferDirectionDebit  TransferDirection = "debit"
	TransferDirectionCredit TransferDirection = "credit"
)

const (
	TransferStatusPending    TransferStatus = "pending"
	TransferStatusProcessing TransferStatus = "processing"
	TransferStatusCompleted  TransferStatus = "completed"
	TransferStatusFailed     TransferStatus = "failed"
	TransferStatusCancelled  TransferStatus = "cancelled"
	TransferStatusReversed   TransferStatus = "reversed"
)

type Transfer struct {
	ID             string            `json:"id"`
	LedgerID       string            `json:"ledger_id"`
	AccountID      string            `json:"account_id"`
	Type           TransferType      `json:"type"`
	Direction      TransferDirection `json:"direction"`
	Amount         int64             `json:"amount"`
	Currency       string            `json:"currency"`
	Status         TransferStatus    `json:"status"`
	Description    string            `json:"description"`
	Reference      string            `json:"reference"`
	Counterparty   *Counterparty     `json:"counterparty,omitempty"`
	IBAN           string            `json:"iban,omitempty"`
	BIC            string            `json:"bic,omitempty"`
	ExternalRef    string            `json:"external_ref,omitempty"`
	ProviderRef    string            `json:"provider_ref,omitempty"`
	Metadata       map[string]any    `json:"metadata,omitempty"`
	IdempotencyKey string            `json:"idempotency_key,omitempty"`
	Fees           int64             `json:"fees,omitempty"`
	SettlementDate *time.Time        `json:"settlement_date,omitempty"`
	CreatedAt      time.Time         `json:"created_at"`
	UpdatedAt      time.Time         `json:"updated_at"`
	CompletedAt    *time.Time        `json:"completed_at,omitempty"`
}

type Counterparty struct {
	Name  string `json:"name"`
	IBAN  string `json:"iban"`
	BIC   string `json:"bic,omitempty"`
	Email string `json:"email,omitempty"`
}

type TransferRequest struct {
	AccountID      string         `json:"account_id" binding:"required"`
	Amount         int64          `json:"amount" binding:"required,gt=0"`
	Currency       string         `json:"currency"`
	Description    string         `json:"description"`
	Reference      string         `json:"reference"`
	Counterparty   *Counterparty  `json:"counterparty"`
	IBAN           string         `json:"iban"`
	BIC            string         `json:"bic"`
	IdempotencyKey string         `json:"idempotency_key"`
	ExecuteDate    string         `json:"execute_date"`
	Metadata       map[string]any `json:"metadata"`
}

type IncomingTransferRequest struct {
	IBAN        string `json:"iban" binding:"required"`
	BIC         string `json:"bic"`
	Amount      int64  `json:"amount" binding:"required,gt=0"`
	Currency    string `json:"currency"`
	SenderName  string `json:"sender_name"`
	SenderIBAN  string `json:"sender_iban"`
	SenderBIC   string `json:"sender_bic"`
	Reference   string `json:"reference"`
	Remittance  string `json:"remittance"`
	ExternalRef string `json:"external_ref"`
}

func NewTransfer(accountID string, amount int64, currency, description, reference string, direction TransferDirection, counterparty *Counterparty) *Transfer {
	now := time.Now()
	transfer := &Transfer{
		ID:           generateID("trf"),
		AccountID:    accountID,
		Type:         TransferTypeSEPA,
		Direction:    direction,
		Amount:       amount,
		Currency:     currency,
		Status:       TransferStatusPending,
		Description:  description,
		Reference:    reference,
		Counterparty: counterparty,
		CreatedAt:    now,
		UpdatedAt:    now,
	}

	if direction == TransferDirectionDebit {
		transfer.IBAN = counterparty.IBAN
		transfer.BIC = counterparty.BIC
	}

	return transfer
}

func (t *Transfer) Process() {
	t.Status = TransferStatusProcessing
	t.UpdatedAt = time.Now()
}

func (t *Transfer) Complete() {
	t.Status = TransferStatusCompleted
	now := time.Now()
	t.CompletedAt = &now
	t.UpdatedAt = now
}

func (t *Transfer) Fail(reason string) {
	t.Status = TransferStatusFailed
	if t.Metadata == nil {
		t.Metadata = make(map[string]any)
	}
	t.Metadata["failure_reason"] = reason
	t.UpdatedAt = time.Now()
}

func (t *Transfer) Cancel() {
	t.Status = TransferStatusCancelled
	t.UpdatedAt = time.Now()
}

func (t *Transfer) Reverse(reason string) {
	t.Status = TransferStatusReversed
	if t.Metadata == nil {
		t.Metadata = make(map[string]any)
	}
	t.Metadata["reversal_reason"] = reason
	t.UpdatedAt = time.Now()
}
