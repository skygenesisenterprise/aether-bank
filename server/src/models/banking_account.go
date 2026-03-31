package models

import "time"

type BankingAccountType string
type BankingAccountStatus string
type HolderType string

const (
	BankingAccountTypeCurrent  BankingAccountType = "current"
	BankingAccountTypeBusiness BankingAccountType = "business"
	BankingAccountTypeJoint    BankingAccountType = "joint"
	BankingAccountTypeSavings  BankingAccountType = "savings"
)

const (
	BankingAccountStatusPendingKYC BankingAccountStatus = "pending_kyc"
	BankingAccountStatusActive     BankingAccountStatus = "active"
	BankingAccountStatusRestricted BankingAccountStatus = "restricted"
	BankingAccountStatusClosed     BankingAccountStatus = "closed"
	BankingAccountStatusBlocked    BankingAccountStatus = "blocked"
)

const (
	HolderTypeIndividual HolderType = "individual"
	HolderTypeBusiness   HolderType = "business"
)

type BankingAccount struct {
	ID        string                 `json:"id"`
	Type      BankingAccountType     `json:"type"`
	Currency  string                 `json:"currency"`
	Status    BankingAccountStatus   `json:"status"`
	IBAN      string                 `json:"iban"`
	BIC       string                 `json:"bic"`
	Holder    *AccountHolder         `json:"holder,omitempty"`
	Balance   *AccountBalance        `json:"balance"`
	Metadata  map[string]interface{} `json:"metadata,omitempty"`
	CreatedAt time.Time              `json:"created_at"`
	UpdatedAt time.Time              `json:"updated_at"`
}

type AccountHolder struct {
	Name string     `json:"name"`
	Type HolderType `json:"type"`
}

type AccountBalance struct {
	Available int64 `json:"available"`
	Current   int64 `json:"current"`
	Pending   int64 `json:"pending"`
	Overdraft int64 `json:"overdraft"`
}

type BankingAccountList struct {
	Accounts []BankingAccount `json:"data"`
	Total    int              `json:"total"`
	Limit    int              `json:"limit"`
	Offset   int              `json:"offset"`
}

type CreateBankingAccountRequest struct {
	Type       BankingAccountType     `json:"type"`
	Currency   string                 `json:"currency"`
	HolderName string                 `json:"holder_name"`
	HolderType HolderType             `json:"holder_type"`
	Metadata   map[string]interface{} `json:"metadata,omitempty"`
}

type BankingAccountResponse struct {
	Success bool            `json:"success"`
	Data    *BankingAccount `json:"data,omitempty"`
	Error   string          `json:"error,omitempty"`
}

type BankingAccountListResponse struct {
	Success bool                `json:"success"`
	Data    *BankingAccountList `json:"data,omitempty"`
	Error   string              `json:"error,omitempty"`
}

type BalanceResponse struct {
	Success bool            `json:"success"`
	Data    *AccountBalance `json:"data,omitempty"`
	Error   string          `json:"error,omitempty"`
}
