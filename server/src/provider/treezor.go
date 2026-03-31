package provider

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type TreezorClient struct {
	baseURL    string
	apiKey     string
	httpClient *http.Client
	sandbox    bool
}

type TreezorConfig struct {
	BaseURL string `json:"base_url"`
	APIKey  string `json:"api_key"`
	Sandbox bool   `json:"sandbox"`
}

func NewTreezorClient(config TreezorConfig) *TreezorClient {
	baseURL := "https://api.treezor.com"
	if config.Sandbox {
		baseURL = "https://sandbox-api.treezor.com"
	}
	if config.BaseURL != "" {
		baseURL = config.BaseURL
	}

	return &TreezorClient{
		baseURL: baseURL,
		apiKey:  config.APIKey,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		sandbox: config.Sandbox,
	}
}

type TreezorWallet struct {
	WalletID    int64  `json:"walletId"`
	WalletType  string `json:"walletType"`
	Status      string `json:"status"`
	IBAN        string `json:"iban"`
	BIC         string `json:"bic"`
	ProviderRef string `json:"providerRef"`
	CreatedAt   string `json:"createdAt"`
}

type TreezorCreateWalletRequest struct {
	UserID     int64  `json:"userId"`
	WalletType string `json:"walletType"`
	Label      string `json:"label"`
	Currency   string `json:"currency"`
	Country    string `json:"country"`
}

func (c *TreezorClient) CreateWallet(ctx context.Context, req TreezorCreateWalletRequest) (*TreezorWallet, error) {
	body := map[string]any{
		"userId":     req.UserID,
		"walletType": req.WalletType,
		"label":      req.Label,
		"currency":   req.Currency,
		"country":    req.Country,
		"providerId": c.apiKey,
	}

	resp, err := c.doRequest(ctx, "POST", "/v1/wallets", body)
	if err != nil {
		return nil, err
	}

	var result map[string]json.RawMessage
	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	var wallet TreezorWallet
	if data, ok := result["data"]; ok {
		if err := json.Unmarshal(data, &wallet); err != nil {
			return nil, fmt.Errorf("failed to parse wallet: %w", err)
		}
	}

	return &wallet, nil
}

func (c *TreezorClient) GetWallet(ctx context.Context, walletID int64) (*TreezorWallet, error) {
	resp, err := c.doRequest(ctx, "GET", fmt.Sprintf("/v1/wallets/%d", walletID), nil)
	if err != nil {
		return nil, err
	}

	var result map[string]json.RawMessage
	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, err
	}

	var wallet TreezorWallet
	if data, ok := result["data"]; ok {
		if err := json.Unmarshal(data, &wallet); err != nil {
			return nil, fmt.Errorf("failed to parse wallet: %w", err)
		}
	}

	return &wallet, nil
}

type TreezorTransfer struct {
	TransferID      int64  `json:"transferId"`
	Status          string `json:"status"`
	Amount          int64  `json:"amount"`
	Currency        string `json:"currency"`
	BeneficiaryIBAN string `json:"beneficiaryIban"`
	BeneficiaryName string `json:"beneficiaryName"`
	Reference       string `json:"reference"`
}

type TreezorTransferRequest struct {
	WalletID        int64  `json:"walletId"`
	Amount          int64  `json:"amount"`
	Currency        string `json:"currency"`
	BeneficiaryIBAN string `json:"beneficiaryIban"`
	BeneficiaryName string `json:"beneficiaryName"`
	BeneficiaryBIC  string `json:"beneficiaryBic"`
	Reference       string `json:"label"`
	ExecutionDate   string `json:"executionDate,omitempty"`
}

func (c *TreezorClient) CreateTransfer(ctx context.Context, req TreezorTransferRequest) (*TreezorTransfer, error) {
	body := map[string]any{
		"walletId":        req.WalletID,
		"amount":          req.Amount,
		"currency":        req.Currency,
		"beneficiaryIban": req.BeneficiaryIBAN,
		"beneficiaryName": req.BeneficiaryName,
		"beneficiaryBic":  req.BeneficiaryBIC,
		"label":           req.Reference,
		"providerId":      c.apiKey,
	}
	if req.ExecutionDate != "" {
		body["executionDate"] = req.ExecutionDate
	}

	resp, err := c.doRequest(ctx, "POST", "/v1/transfers", body)
	if err != nil {
		return nil, err
	}

	var result map[string]json.RawMessage
	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, err
	}

	var transfer TreezorTransfer
	if data, ok := result["data"]; ok {
		if err := json.Unmarshal(data, &transfer); err != nil {
			return nil, fmt.Errorf("failed to parse transfer: %w", err)
		}
	}

	return &transfer, nil
}

func (c *TreezorClient) GetTransfer(ctx context.Context, transferID int64) (*TreezorTransfer, error) {
	resp, err := c.doRequest(ctx, "GET", fmt.Sprintf("/v1/transfers/%d", transferID), nil)
	if err != nil {
		return nil, err
	}

	var result map[string]json.RawMessage
	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, err
	}

	var transfer TreezorTransfer
	if data, ok := result["data"]; ok {
		if err := json.Unmarshal(data, &transfer); err != nil {
			return nil, fmt.Errorf("failed to parse transfer: %w", err)
		}
	}

	return &transfer, nil
}

func (c *TreezorClient) doRequest(ctx context.Context, method, path string, body map[string]any) ([]byte, error) {
	url := c.baseURL + path

	var reqBody []byte
	var err error
	if body != nil {
		reqBody, err = json.Marshal(body)
		if err != nil {
			return nil, err
		}
	}

	req, err := http.NewRequestWithContext(ctx, method, url, bytes.NewReader(reqBody))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "AetherBank/1.0")
	req.Header.Set("Authorization", "Bearer "+c.apiKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		var errResp map[string]any
		json.NewDecoder(resp.Body).Decode(&errResp)
		return nil, fmt.Errorf("treezor error: %v", errResp)
	}

	return io.ReadAll(resp.Body)
}
