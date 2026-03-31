package models

import "time"

type LedgerEntryStatus string

const (
	LedgerEntryStatusPending    LedgerEntryStatus = "pending"
	LedgerEntryStatusValidated  LedgerEntryStatus = "validated"
	LedgerEntryStatusReconciled LedgerEntryStatus = "reconciled"
)

type LedgerEntry struct {
	ID            string            `json:"id"`
	Date          string            `json:"date"`
	Piece         string            `json:"piece"`
	AccountCode   string            `json:"account_code"`
	AccountLabel  string            `json:"account_label"`
	Libelle       string            `json:"libelle"`
	Debit         int64             `json:"debit"`
	Credit        int64             `json:"credit"`
	Currency      string            `json:"currency"`
	Status        LedgerEntryStatus `json:"status"`
	TransactionID string            `json:"transaction_id,omitempty"`
	CreatedAt     time.Time         `json:"created_at"`
}

type LedgerAccount struct {
	Code  string `json:"code"`
	Label string `json:"label"`
	Type  string `json:"type"`
}

type LedgerBalance struct {
	Code   string `json:"code"`
	Label  string `json:"label"`
	Debit  int64  `json:"debit"`
	Credit int64  `json:"credit"`
	Solde  int64  `json:"solde"`
}

type LedgerBalanceResponse struct {
	Date     string          `json:"date"`
	Accounts []LedgerBalance `json:"accounts"`
	Totals   *LedgerTotals   `json:"totals"`
}

type LedgerTotals struct {
	TotalDebit  int64 `json:"total_debit"`
	TotalCredit int64 `json:"total_credit"`
	Balance     int64 `json:"balance"`
}

type LedgerEntryList struct {
	Entries []LedgerEntry `json:"data"`
	Total   int           `json:"total"`
	Limit   int           `json:"limit"`
	Offset  int           `json:"offset"`
	HasMore bool          `json:"has_more"`
}

type LedgerAccountList struct {
	Accounts []LedgerAccount `json:"data"`
	Total    int             `json:"total"`
	Limit    int             `json:"limit"`
	Offset   int             `json:"offset"`
}

type LedgerAccountResponse struct {
	Account *LedgerAccount `json:"account"`
	Entries []LedgerEntry  `json:"entries"`
	Totals  *LedgerTotals  `json:"totals"`
}

type ExportFECRequest struct {
	FromDate string `json:"from_date"`
	ToDate   string `json:"to_date"`
	Format   string `json:"format"`
}

type ExportFECResponse struct {
	ExportID    string    `json:"export_id"`
	Status      string    `json:"status"`
	DownloadURL string    `json:"download_url"`
	FileSize    int64     `json:"file_size"`
	Checksum    string    `json:"checksum"`
	ExpiresAt   time.Time `json:"expires_at"`
}

type LedgerResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
