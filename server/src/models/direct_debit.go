package models

import "time"

type MandateType string
type DirectDebitStatus string

const (
	MandateTypeSEPACore MandateType = "sepa_core"
	MandateTypeSEPAB2B  MandateType = "sepa_b2b"
)

const (
	DirectDebitStatusPending   DirectDebitStatus = "pending"
	DirectDebitStatusValidated DirectDebitStatus = "validated"
	DirectDebitStatusExecuted  DirectDebitStatus = "executed"
	DirectDebitStatusRejected  DirectDebitStatus = "rejected"
	DirectDebitStatusCancelled DirectDebitStatus = "cancelled"
	DirectDebitStatusRefunded  DirectDebitStatus = "refunded"
)

type Mandate struct {
	ID         string            `json:"id"`
	Type       MandateType       `json:"type"`
	RUM        string            `json:"rum"`
	Status     DirectDebitStatus `json:"status"`
	Creditor   *Creditor         `json:"creditor"`
	DebtorIBAN string            `json:"debtor_iban"`
	Reference  string            `json:"reference"`
	CreatedAt  time.Time         `json:"created_at"`
}

type Creditor struct {
	Name string `json:"name"`
	IBAN string `json:"iban"`
	BIC  string `json:"bic,omitempty"`
}

type DirectDebit struct {
	ID            string            `json:"id"`
	MandateID     string            `json:"mandate_id"`
	Amount        int64             `json:"amount"`
	Currency      string            `json:"currency"`
	Status        DirectDebitStatus `json:"status"`
	Description   string            `json:"description"`
	ScheduledDate *time.Time        `json:"scheduled_date"`
	ExecutedAt    *time.Time        `json:"executed_at,omitempty"`
	Creditor      *Creditor         `json:"creditor,omitempty"`
	CreatedAt     time.Time         `json:"created_at"`
}

type MandateList struct {
	Mandates []Mandate `json:"data"`
	Total    int       `json:"total"`
	Limit    int       `json:"limit"`
	Offset   int       `json:"offset"`
}

type DirectDebitList struct {
	DirectDebits []DirectDebit `json:"data"`
	Total        int           `json:"total"`
	Limit        int           `json:"limit"`
	Offset       int           `json:"offset"`
}

type CreateMandateRequest struct {
	Type         MandateType `json:"type"`
	CreditorName string      `json:"creditor_name"`
	CreditorIBAN string      `json:"creditor_iban"`
	CreditorBIC  string      `json:"creditor_bic"`
	DebtorIBAN   string      `json:"debtor_iban"`
	Reference    string      `json:"reference"`
}

type CreateDirectDebitRequest struct {
	MandateID     string `json:"mandate_id"`
	Amount        int64  `json:"amount"`
	Currency      string `json:"currency"`
	Description   string `json:"description"`
	ScheduledDate string `json:"scheduled_date"`
}

type MandateResponse struct {
	Success bool     `json:"success"`
	Data    *Mandate `json:"data,omitempty"`
	Error   string   `json:"error,omitempty"`
}

type DirectDebitResponse struct {
	Success bool         `json:"success"`
	Data    *DirectDebit `json:"data,omitempty"`
	Error   string       `json:"error,omitempty"`
}

type MandateListResponse struct {
	Success bool         `json:"success"`
	Data    *MandateList `json:"data,omitempty"`
	Error   string       `json:"error,omitempty"`
}

type DirectDebitListResponse struct {
	Success bool             `json:"success"`
	Data    *DirectDebitList `json:"data,omitempty"`
	Error   string           `json:"error,omitempty"`
}
