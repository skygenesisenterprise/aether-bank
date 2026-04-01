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
	Type        BankingAccountType     `json:"type"`
	Currency    string                 `json:"currency"`
	HolderName  string                 `json:"holder_name"`
	HolderType  HolderType             `json:"holder_type"`
	Metadata    map[string]interface{} `json:"metadata,omitempty"`
	CountryCode string                 `json:"country_code,omitempty"`
	BankCode    string                 `json:"bank_code,omitempty"`
	IsInternal  bool                   `json:"is_internal,omitempty"`
}

type CreateBankAccountRequest struct {
	AccountType    string                 `json:"account_type"`
	Currency       string                 `json:"currency"`
	HolderName     string                 `json:"holder_name"`
	HolderType     string                 `json:"holder_type"`
	CountryCode    string                 `json:"country_code"`
	InitialBalance int64                  `json:"initial_balance"`
	OverdraftLimit int64                  `json:"overdraft_limit"`
	Metadata       map[string]interface{} `json:"metadata,omitempty"`
}

type CreateInternalAccountRequest struct {
	AccountName string                 `json:"account_name"`
	AccountType string                 `json:"account_type"`
	Currency    string                 `json:"currency"`
	Purpose     string                 `json:"purpose"`
	Metadata    map[string]interface{} `json:"metadata,omitempty"`
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

type BankAccountResponse struct {
	Success bool             `json:"success"`
	Data    *BankAccountData `json:"data,omitempty"`
	Error   string           `json:"error,omitempty"`
}

type BankAccountData struct {
	ID               string `json:"id"`
	AccountNumber    string `json:"account_number"`
	Name             string `json:"name"`
	Type             string `json:"type"`
	AccountType      string `json:"account_type"`
	Owner            string `json:"owner"`
	OwnerType        string `json:"owner_type"`
	OwnerCategory    string `json:"owner_category"`
	Balance          int64  `json:"balance"`
	AvailableBalance int64  `json:"available_balance"`
	Status           string `json:"status"`
	Currency         string `json:"currency"`
	IBAN             string `json:"iban"`
	IBANFormatted    string `json:"iban_formatted"`
	BIC              string `json:"bic"`
	BICFormatted     string `json:"bic_formatted"`
	IsValid          bool   `json:"is_valid"`
	BankName         string `json:"bank_name,omitempty"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
}

type BankAccountListResponse struct {
	Success bool              `json:"success"`
	Data    []BankAccountData `json:"data,omitempty"`
	Total   int               `json:"total"`
	Error   string            `json:"error,omitempty"`
}
