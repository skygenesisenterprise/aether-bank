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

type SumsubClient struct {
	baseURL    string
	appToken   string
	secretKey  string
	httpClient *http.Client
}

type SumsubConfig struct {
	AppToken    string `json:"app_token"`
	SecretKey   string `json:"secret_key"`
	Environment string `json:"environment"`
}

func NewSumsubClient(config SumsubConfig) *SumsubClient {
	baseURL := "https://api.sumsub.com"
	if config.Environment == "sandbox" {
		baseURL = "https://api-sandbox.sumsub.com"
	}

	return &SumsubClient{
		baseURL:   baseURL,
		appToken:  config.AppToken,
		secretKey: config.SecretKey,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (c *SumsubClient) doRequest(ctx context.Context, method, path string, body []byte) ([]byte, error) {
	url := c.baseURL + path

	req, err := http.NewRequestWithContext(ctx, method, url, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "AetherBank/1.0")
	req.Header.Set("X-App-Token", c.appToken)
	req.Header.Set("X-App-Secret", c.secretKey)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		var errResp map[string]any
		json.NewDecoder(resp.Body).Decode(&errResp)
		return nil, fmt.Errorf("sumsub error: %v", errResp)
	}

	return io.ReadAll(resp.Body)
}

type SumsubApplicant struct {
	ID         string            `json:"id"`
	ExternalID string            `json:"externalUserId"`
	Email      string            `json:"email"`
	FirstName  string            `json:"firstName"`
	LastName   string            `json:"lastName"`
	Status     string            `json:"status"`
	CreatedAt  time.Time         `json:"createdAt"`
	Metadata   map[string]string `json:"metadata"`
}

func (c *SumsubClient) CreateApplicant(ctx context.Context, externalUserID, email, firstName, lastName string) (*SumsubApplicant, error) {
	body := map[string]any{
		"externalUserId": externalUserID,
		"email":          email,
		"firstName":      firstName,
		"lastName":       lastName,
	}

	data, err := c.doRequest(ctx, "POST", "/resources/applicants", marshalBody(body))
	if err != nil {
		return nil, err
	}

	var applicant SumsubApplicant
	if err := json.Unmarshal(data, &applicant); err != nil {
		return nil, fmt.Errorf("failed to parse applicant: %w", err)
	}

	return &applicant, nil
}

func (c *SumsubClient) GetApplicant(ctx context.Context, applicantID string) (*SumsubApplicant, error) {
	data, err := c.doRequest(ctx, "GET", "/resources/applicants/"+applicantID, nil)
	if err != nil {
		return nil, err
	}

	var applicant SumsubApplicant
	if err := json.Unmarshal(data, &applicant); err != nil {
		return nil, fmt.Errorf("failed to parse applicant: %w", err)
	}

	return &applicant, nil
}

type SumsubVerification struct {
	ReviewResult ReviewResult `json:"reviewResult"`
	Checks       []Check      `json:"checks"`
}

type ReviewResult struct {
	OverallStatus string `json:"overallStatus"`
	RejectReason  string `json:"rejectReason"`
	SuspectReason string `json:"suspectReason"`
}

type Check struct {
	Type   string `json:"type"`
	Status string `json:"status"`
}

func (c *SumsubClient) GetVerificationStatus(ctx context.Context, applicantID string) (*SumsubVerification, error) {
	data, err := c.doRequest(ctx, "GET", "/resources/applicants/"+applicantID+"/status", nil)
	if err != nil {
		return nil, err
	}

	var verification SumsubVerification
	if err := json.Unmarshal(data, &verification); err != nil {
		return nil, fmt.Errorf("failed to parse verification: %w", err)
	}

	return &verification, nil
}

type SumsubDocument struct {
	ID        string `json:"id"`
	Type      string `json:"type"`
	Status    string `json:"status"`
	CreatedAt string `json:"createdAt"`
}

func (c *SumsubClient) UploadDocument(ctx context.Context, applicantID, docType, fileName string, fileContent []byte) (*SumsubDocument, error) {
	url := c.baseURL + "/resources/applicants/" + applicantID + "/info-doc"

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewReader(fileContent))
	if err != nil {
		return nil, err
	}

	req.Header.Set("User-Agent", "AetherBank/1.0")
	req.Header.Set("X-App-Token", c.appToken)
	req.Header.Set("X-App-Secret", c.secretKey)
	req.Header.Set("Content-Type", "multipart/form-data")
	req.Header.Set("X-File-Name", fileName)
	req.Header.Set("X-File-Content-Type", "application/pdf")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("sumsub document upload failed: status %d", resp.StatusCode)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var doc SumsubDocument
	if err := json.Unmarshal(data, &doc); err != nil {
		return nil, fmt.Errorf("failed to parse document: %w", err)
	}

	return &doc, nil
}

func (c *SumsubClient) CreateAccessToken(ctx context.Context, userID, externalUserID string) (string, error) {
	body := map[string]any{
		"userId":         userID,
		"externalUserId": externalUserID,
		"ttl":            600,
	}

	data, err := c.doRequest(ctx, "POST", "/resources/accessTokens", marshalBody(body))
	if err != nil {
		return "", err
	}

	var response map[string]json.RawMessage
	if err := json.Unmarshal(data, &response); err != nil {
		return "", err
	}

	var token string
	if tokenData, ok := response["token"]; ok {
		token = string(tokenData)
	}

	return token, nil
}

func (c *SumsubClient) GetSDKUrl(ctx context.Context, token string) (string, error) {
	return "https://sdk.sumsub.com/success.html?token=" + token, nil
}

func marshalBody(body map[string]any) []byte {
	data, _ := json.Marshal(body)
	return data
}
