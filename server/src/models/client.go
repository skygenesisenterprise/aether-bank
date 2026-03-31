package models

import "time"

type ClientStatus string

const (
	ClientStatusPending  ClientStatus = "pending"
	ClientStatusActive   ClientStatus = "active"
	ClientStatusInactive ClientStatus = "inactive"
	ClientStatusBlocked  ClientStatus = "blocked"
)

type Client struct {
	ID          string                 `json:"id"`
	AccountIDs  []string               `json:"account_ids"`
	Email       string                 `json:"email"`
	Name        string                 `json:"name"`
	Company     string                 `json:"company,omitempty"`
	Status      ClientStatus           `json:"status"`
	KYCVerified bool                   `json:"kyc_verified"`
	Metadata    map[string]interface{} `json:"metadata,omitempty"`
	CreatedAt   time.Time              `json:"created_at"`
	UpdatedAt   time.Time              `json:"updated_at"`
}

type ClientList struct {
	Clients []Client `json:"data"`
	Total   int      `json:"total"`
	Limit   int      `json:"limit"`
	Offset  int      `json:"offset"`
}

type CreateClientRequest struct {
	Email    string                 `json:"email"`
	Name     string                 `json:"name"`
	Company  string                 `json:"company,omitempty"`
	Metadata map[string]interface{} `json:"metadata,omitempty"`
}

type ClientResponse struct {
	Success bool    `json:"success"`
	Data    *Client `json:"data,omitempty"`
	Error   string  `json:"error,omitempty"`
}

type ClientListResponse struct {
	Success bool        `json:"success"`
	Data    *ClientList `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
