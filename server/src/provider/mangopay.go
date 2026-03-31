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

type MangoPayClient struct {
	baseURL    string
	clientID   string
	apiKey     string
	httpClient *http.Client
	sandbox    bool
}

type MangoPayConfig struct {
	ClientID string `json:"client_id"`
	APIKey   string `json:"api_key"`
	Sandbox  bool   `json:"sandbox"`
}

func NewMangoPayClient(config MangoPayConfig) *MangoPayClient {
	baseURL := "https://api.mangopay.com"
	if config.Sandbox {
		baseURL = "https://api.sandbox.mangopay.com"
	}

	return &MangoPayClient{
		baseURL:  baseURL,
		clientID: config.ClientID,
		apiKey:   config.APIKey,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		sandbox: config.Sandbox,
	}
}

func (c *MangoPayClient) doRequest(ctx context.Context, method, path string, body map[string]any) ([]byte, error) {
	url := c.baseURL + "/v2.01/" + c.clientID + path

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
	req.SetBasicAuth(c.clientID, c.apiKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		var errResp map[string]any
		json.NewDecoder(resp.Body).Decode(&errResp)
		return nil, fmt.Errorf("mangopay error: %v", errResp)
	}

	return io.ReadAll(resp.Body)
}

type MangoPayWallet struct {
	ID          string `json:"Id"`
	IBAN        string `json:"Ibans"`
	BIC         string `json:"Bic"`
	Balance     int64  `json:"Balance"`
	Description string `json:"Description"`
	Currency    string `json:"Currency"`
	CreatedAt   string `json:"CreationDate"`
}

func (c *MangoPayClient) CreateWallet(ctx context.Context, userID, currency, description string) (*MangoPayWallet, error) {
	body := map[string]any{
		"Owners":      []string{userID},
		"Description": description,
		"Currency":    currency,
		"Type":        "CURRENT",
	}

	data, err := c.doRequest(ctx, "POST", "/wallets", body)
	if err != nil {
		return nil, err
	}

	var wallet MangoPayWallet
	if err := json.Unmarshal(data, &wallet); err != nil {
		return nil, fmt.Errorf("failed to parse wallet: %w", err)
	}

	return &wallet, nil
}

func (c *MangoPayClient) GetWallet(ctx context.Context, walletID string) (*MangoPayWallet, error) {
	data, err := c.doRequest(ctx, "GET", "/wallets/"+walletID, nil)
	if err != nil {
		return nil, err
	}

	var wallet MangoPayWallet
	if err := json.Unmarshal(data, &wallet); err != nil {
		return nil, fmt.Errorf("failed to parse wallet: %w", err)
	}

	return &wallet, nil
}

func (c *MangoPayClient) GetWalletTransactions(ctx context.Context, walletID string) ([]map[string]any, error) {
	data, err := c.doRequest(ctx, "GET", "/wallets/"+walletID+"/transactions", nil)
	if err != nil {
		return nil, err
	}

	var result map[string]json.RawMessage
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}

	var transactions []map[string]any
	if data, ok := result["data"]; ok {
		if err := json.Unmarshal(data, &transactions); err != nil {
			return nil, err
		}
	}

	return transactions, nil
}

type MangoPayTransfer struct {
	ID                  string `json:"Id"`
	Amount              int64  `json:"Amount"`
	Currency            string `json:"Currency"`
	Status              string `json:"Status"`
	ExecutionDate       string `json:"ExecutionDate"`
	BeneficiaryIBAN     string `json:"BeneficiaryIbans"`
	BeneficiaryName     string `json:"BeneficiaryName"`
	SenderAccountNumber string `json:"SenderAccountNumber"`
	Reference           string `json:"Reference"`
}

func (c *MangoPayClient) CreateTransfer(ctx context.Context, senderWalletID, beneficiaryIBAN, beneficiaryName string, amount int64, currency, reference string) (*MangoPayTransfer, error) {
	body := map[string]any{
		"AuthorId":         senderWalletID,
		"DebitedWalletId":  senderWalletID,
		"Amount":           amount,
		"Currency":         currency,
		"BeneficiaryIbans": beneficiaryIBAN,
		"BeneficiaryName":  beneficiaryName,
		"Reference":        reference,
		"ExecutionDate":    time.Now().Format("2006-01-02"),
	}

	data, err := c.doRequest(ctx, "POST", "/transfers", body)
	if err != nil {
		return nil, err
	}

	var transfer MangoPayTransfer
	if err := json.Unmarshal(data, &transfer); err != nil {
		return nil, fmt.Errorf("failed to parse transfer: %w", err)
	}

	return &transfer, nil
}

func (c *MangoPayClient) CreatePayout(ctx context.Context, walletID, IBAN, BIC, ownerName string, amount int64, currency, reference string) (*MangoPayTransfer, error) {
	body := map[string]any{
		"AuthorId":        walletID,
		"DebitedWalletId": walletID,
		"Amount":          amount,
		"Currency":        currency,
		"Iban":            IBAN,
		"Bic":             BIC,
		"OwnerName":       ownerName,
		"Reference":       reference,
		"ExecutionDate":   time.Now().Format("2006-01-02"),
	}

	data, err := c.doRequest(ctx, "POST", "/payouts/bankwire", body)
	if err != nil {
		return nil, err
	}

	var payout MangoPayTransfer
	if err := json.Unmarshal(data, &payout); err != nil {
		return nil, fmt.Errorf("failed to parse payout: %w", err)
	}

	return &payout, nil
}

type MangoPayCard struct {
	ID             string `json:"Id"`
	CardType       string `json:"CardType"`
	CardProvider   string `json:"CardProvider"`
	ExpirationDate string `json:"ExpirationDate"`
	Last4          string `json:"Last4"`
	Status         string `json:"Status"`
}

func (c *MangoPayClient) RegisterCard(ctx context.Context, userID, cardID string) (*MangoPayCard, error) {
	body := map[string]any{
		"UserId":   userID,
		"CardId":   cardID,
		"CardType": "CB_VISA_MASTERCARD",
	}

	data, err := c.doRequest(ctx, "POST", "/cardregistrations", body)
	if err != nil {
		return nil, err
	}

	var card MangoPayCard
	if err := json.Unmarshal(data, &card); err != nil {
		return nil, fmt.Errorf("failed to parse card: %w", err)
	}

	return &card, nil
}

func (c *MangoPayClient) GetCard(ctx context.Context, cardID string) (*MangoPayCard, error) {
	data, err := c.doRequest(ctx, "GET", "/cards/"+cardID, nil)
	if err != nil {
		return nil, err
	}

	var card MangoPayCard
	if err := json.Unmarshal(data, &card); err != nil {
		return nil, fmt.Errorf("failed to parse card: %w", err)
	}

	return &card, nil
}

func (c *MangoPayClient) DeactivateCard(ctx context.Context, cardID string) error {
	_, err := c.doRequest(ctx, "PUT", "/cards/"+cardID, map[string]any{"Status": "INACTIVE"})
	return err
}

type MangoPayUser struct {
	ID           string `json:"Id"`
	Email        string `json:"Email"`
	FirstName    string `json:"FirstName"`
	LastName     string `json:"LastName"`
	Type         string `json:"Type"`
	KYCLevel     string `json:"KycLevel"`
	CreationDate string `json:"CreationDate"`
}

func (c *MangoPayClient) CreateUser(ctx context.Context, email, firstName, lastName string) (*MangoPayUser, error) {
	body := map[string]any{
		"Email":     email,
		"FirstName": firstName,
		"LastName":  lastName,
		"Type":      "NATURAL",
	}

	data, err := c.doRequest(ctx, "POST", "/users/natural", body)
	if err != nil {
		return nil, err
	}

	var user MangoPayUser
	if err := json.Unmarshal(data, &user); err != nil {
		return nil, fmt.Errorf("failed to parse user: %w", err)
	}

	return &user, nil
}

func (c *MangoPayClient) GetUser(ctx context.Context, userID string) (*MangoPayUser, error) {
	data, err := c.doRequest(ctx, "GET", "/users/natural/"+userID, nil)
	if err != nil {
		return nil, err
	}

	var user MangoPayUser
	if err := json.Unmarshal(data, &user); err != nil {
		return nil, fmt.Errorf("failed to parse user: %w", err)
	}

	return &user, nil
}

func (c *MangoPayClient) UploadKYCDocument(ctx context.Context, userID, documentType, filePath string) (string, error) {
	body := map[string]any{
		"UserId": userID,
		"Type":   documentType,
		"File":   filePath,
	}

	data, err := c.doRequest(ctx, "POST", "/users/"+userID+"/KYCDocuments", body)
	if err != nil {
		return "", err
	}

	var doc map[string]any
	if err := json.Unmarshal(data, &doc); err != nil {
		return "", err
	}

	return fmt.Sprintf("%v", doc["Id"]), nil
}
