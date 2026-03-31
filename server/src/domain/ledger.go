package domain

import (
	"crypto/rand"
	"math/big"
	"time"
)

func generateID(prefix string) string {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
	result := prefix + "_"
	for i := 0; i < 12; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		result += string(chars[n.Int64()])
	}
	return result
}

type LedgerStatus string

const (
	LedgerStatusPending   LedgerStatus = "pending"
	LedgerStatusCompleted LedgerStatus = "completed"
	LedgerStatusFailed    LedgerStatus = "failed"
	LedgerStatusReverted  LedgerStatus = "reverted"
)

type LedgerDirection string

const (
	LedgerDirectionCredit LedgerDirection = "credit"
	LedgerDirectionDebit  LedgerDirection = "debit"
)

type Ledger struct {
	ID          string          `json:"id"`
	AccountID   string          `json:"account_id"`
	Amount      int64           `json:"amount"`
	Currency    string          `json:"currency"`
	Direction   LedgerDirection `json:"direction"`
	Description string          `json:"description"`
	Reference   string          `json:"reference"`
	ExternalRef string          `json:"external_ref,omitempty"`
	Status      LedgerStatus    `json:"status"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
	CompletedAt *time.Time      `json:"completed_at,omitempty"`
}

type LedgerEntry struct {
	ID          string          `json:"id"`
	LedgerID    string          `json:"ledger_id"`
	AccountID   string          `json:"account_id"`
	Amount      int64           `json:"amount"`
	Currency    string          `json:"currency"`
	Direction   LedgerDirection `json:"direction"`
	Description string          `json:"description"`
	Reference   string          `json:"reference"`
	CreatedAt   time.Time       `json:"created_at"`
}

func NewLedger(accountID string, amount int64, currency, description, reference string, direction LedgerDirection) *Ledger {
	now := time.Now()
	return &Ledger{
		ID:          generateID("ldg"),
		AccountID:   accountID,
		Amount:      amount,
		Currency:    currency,
		Direction:   direction,
		Description: description,
		Reference:   reference,
		Status:      LedgerStatusPending,
		CreatedAt:   now,
		UpdatedAt:   now,
	}
}

func (l *Ledger) Credit() {
	l.Status = LedgerStatusCompleted
	now := time.Now()
	l.CompletedAt = &now
	l.UpdatedAt = now
}

func (l *Ledger) Debit() {
	l.Status = LedgerStatusCompleted
	now := time.Now()
	l.CompletedAt = &now
	l.UpdatedAt = now
}

func (l *Ledger) Fail() {
	l.Status = LedgerStatusFailed
	l.UpdatedAt = time.Now()
}

func (l *Ledger) Revert() {
	l.Status = LedgerStatusReverted
	l.UpdatedAt = time.Now()
}
