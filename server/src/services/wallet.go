package services

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/big"
	"time"
)

type WalletPassService struct {
	appleCert  *x509.Certificate
	appleKey   *rsa.PrivateKey
	merchantID string
	teamID     string
	passTypeID string
}

type ApplePayPass struct {
	FormatVersion       int          `json:"formatVersion"`
	PassTypeID          string       `json:"passTypeIdentifier"`
	SerialNumber        string       `json:"serialNumber"`
	TeamIdentifier      string       `json:"teamIdentifier"`
	OrganizationName    string       `json:"organizationName"`
	Description         string       `json:"description"`
	LogoText            string       `json:"logoText"`
	ForegroundColor     string       `json:"foregroundColor"`
	BackgroundColor     string       `json:"backgroundColor"`
	LabelColor          string       `json:"labelColor"`
	EventTicket         *EventTicket `json:"eventTicket,omitempty"`
	StoreCard           *StoreCard   `json:"storeCard,omitempty"`
	GenericPass         *GenericPass `json:"generic,omitempty"`
	AuthenticationToken string       `json:"authenticationToken"`
	WebServiceURL       string       `json:"webServiceURL"`
}

type EventTicket struct {
	PrimaryFields   []Field `json:"primaryFields"`
	SecondaryFields []Field `json:"secondaryFields"`
	auxiliaryFields []Field `json:"auxiliaryFields"`
	BackFields      []Field `json:"backFields"`
	Barcode         Barcode `json:"barcode"`
}

type StoreCard struct {
	PrimaryFields   []Field `json:"primaryFields"`
	SecondaryFields []Field `json:"secondaryFields"`
	auxiliaryFields []Field `json:"auxiliaryFields"`
	BackFields      []Field `json:"backFields"`
	Barcode         Barcode `json:"barcode"`
}

type GenericPass struct {
	PrimaryFields   []Field `json:"primaryFields"`
	SecondaryFields []Field `json:"secondaryFields"`
	auxiliaryFields []Field `json:"auxiliaryFields"`
	BackFields      []Field `json:"backFields"`
	Barcode         Barcode `json:"barcode"`
}

type Field struct {
	Key       string `json:"key"`
	Label     string `json:"label"`
	Value     string `json:"value"`
	TextAlign string `json:"textAlignment,omitempty"`
}

type Barcode struct {
	Format   string `json:"format"`
	Message  string `json:"message"`
	ShowText bool   `json:"showText"`
	AltText  string `json:"altText,omitempty"`
}

func NewWalletPassService(merchantID, teamID, passTypeID string) *WalletPassService {
	return &WalletPassService{
		merchantID: merchantID,
		teamID:     teamID,
		passTypeID: passTypeID,
	}
}

func (s *WalletPassService) GenerateApplePayPass(cardID, cardNumber, holderName, expiryMonth, expiryYear string) ([]byte, error) {
	serialNumber := s.generateSerialNumber()
	authToken := s.generateAuthToken()

	pass := ApplePayPass{
		FormatVersion:       1,
		PassTypeID:          s.passTypeID,
		SerialNumber:        serialNumber,
		TeamIdentifier:      s.teamID,
		OrganizationName:    "Aether Bank",
		Description:         "Aether Bank Card",
		LogoText:            "Aether Bank",
		ForegroundColor:     "rgb(255, 255, 255)",
		BackgroundColor:     "rgb(0, 51, 102)",
		LabelColor:          "rgb(255, 255, 255)",
		StoreCard:           s.createStoreCard(cardNumber, holderName, expiryMonth, expiryYear),
		AuthenticationToken: authToken,
		WebServiceURL:       fmt.Sprintf("https://wallet.aetherbank.com/api/v1/wallet/apple/%s", cardID),
	}

	passJSON, err := json.Marshal(pass)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal pass: %w", err)
	}

	return passJSON, nil
}

func (s *WalletPassService) createStoreCard(cardNumber, holderName, expiryMonth, expiryYear string) *StoreCard {
	return &StoreCard{
		PrimaryFields: []Field{
			{
				Key:   "cardName",
				Label: "CARD",
				Value: "Aether Bank Virtual",
			},
		},
		SecondaryFields: []Field{
			{
				Key:   "holderName",
				Label: "HOLDER",
				Value: holderName,
			},
			{
				Key:   "cardNumber",
				Label: "NUMBER",
				Value: formatCardNumber(cardNumber),
			},
		},
		auxiliaryFields: []Field{
			{
				Key:       "expiry",
				Label:     "EXPIRES",
				Value:     fmt.Sprintf("%s/%s", expiryMonth, expiryYear),
				TextAlign: "right",
			},
		},
		BackFields: []Field{
			{
				Key:   "terms",
				Label: "Terms & Conditions",
				Value: "This card is issued by Aether Bank. Use subject to terms and conditions.",
			},
			{
				Key:   "support",
				Label: "Support",
				Value: "Contact: support@aetherbank.com",
			},
		},
		Barcode: Barcode{
			Format:   "PKBarcodeFormatQR",
			Message:  cardNumber,
			ShowText: false,
		},
	}
}

func (s *WalletPassService) generateSerialNumber() string {
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	result := ""
	for i := 0; i < 16; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		result += string(chars[n.Int64()])
	}
	return result
}

func (s *WalletPassService) generateAuthToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}

func formatCardNumber(number string) string {
	if len(number) < 4 {
		return number
	}
	return "**** **** **** " + number[len(number)-4:]
}

type GoogleWalletService struct {
	issuerID       string
	serviceAccount string
	privateKey     *rsa.PrivateKey
}

type GooglePassPayload struct {
	Iss                  string      `json:"iss"`
	Aud                  string      `json:"aud"`
	Typ                  string      `json:"typ"`
	Iat                  int64       `json:"iat"`
	IssuedID             string      `json:"issureId"`
	ClassID              string      `json:"classId"`
	InstanceID           string      `json:"instanceId"`
	ObjectID             string      `json:"objectId"`
	State                string      `json:"state"`
	CardNumber           string      `json:"cardNumber"`
	PinCode              string      `json:"pinCode"`
	CardHolderHeader     string      `json:"cardHolderHeader"`
	Header               string      `json:"header"`
	Subheader            string      `json:"subheader"`
	HexBarcode           *BarcodeHex `json:"hexBarcode"`
	BarcodeValue         string      `json:"barcodeValue"`
	BarcodeAlternateText string      `json:"barcodeAlternateText"`
}

type BarcodeHex struct {
	AlternativeText string `json:"alternativeText"`
}

type GooglePassClass struct {
	IssuerID                    string `json:"issuerId"`
	ClassID                     string `json:"classId"`
	CardTitle                   string `json:"cardTitle"`
	CardSubtitle                string `json:"cardSubtitle"`
	ProgramName                 string `json:"programName"`
	Logo                        *Image `json:"logo"`
	HeroImage                   *Image `json:"heroImage"`
	HexBarcodeColor             string `json:"hexBarcodeColor"`
	BarcodeType                 string `json:"barcodeType"`
	AllowMultipleUsersPerDevice bool   `json:"allowMultipleUsersPerDevice"`
}

type Image struct {
	SourceURI string `json:"sourceUri"`
}

func NewGoogleWalletService(issuerID, serviceAccount string, privateKey *rsa.PrivateKey) *GoogleWalletService {
	return &GoogleWalletService{
		issuerID:       issuerID,
		serviceAccount: serviceAccount,
		privateKey:     privateKey,
	}
}

func (s *GoogleWalletService) CreatePassClass(programName string) *GooglePassClass {
	classID := fmt.Sprintf("%s.loyalty.class.%s", s.issuerID, programName)
	return &GooglePassClass{
		IssuerID:        s.issuerID,
		ClassID:         classID,
		CardTitle:       "Aether Bank",
		CardSubtitle:    "Virtual Card",
		ProgramName:     programName,
		HexBarcodeColor: "FFFFFFFF",
		BarcodeType:     "QR_CODE",
	}
}

func (s *GoogleWalletService) CreatePassObject(classID, instanceID, cardNumber, holderName string) *GooglePassPayload {
	objectID := fmt.Sprintf("%s.objects.%s", s.issuerID, instanceID)
	return &GooglePassPayload{
		Iss:              "https://wallet.google.com/oauth2/token",
		Aud:              "google",
		Typ:              "savetoandroidpay",
		Iat:              time.Now().Unix(),
		IssuedID:         s.issuerID,
		ClassID:          classID,
		InstanceID:       instanceID,
		ObjectID:         objectID,
		State:            "active",
		CardNumber:       cardNumber,
		PinCode:          "",
		CardHolderHeader: "AETHER BANK",
		Header:           "Virtual Card",
		Subheader:        holderName,
		HexBarcode:       &BarcodeHex{AlternativeText: cardNumber},
		BarcodeValue:     cardNumber,
	}
}

func (s *GoogleWalletService) GenerateJWT(pass *GooglePassPayload) (string, error) {
	header := map[string]string{"alg": "RS256", "typ": "JWT"}
	headerJSON, _ := json.Marshal(header)
	headerEncoded := base64.RawURLEncoding.EncodeToString(headerJSON)

	payloadJSON, _ := json.Marshal(pass)
	payloadEncoded := base64.RawURLEncoding.EncodeToString(payloadJSON)

	message := headerEncoded + "." + payloadEncoded
	hash := sha256.Sum256([]byte(message))

	signature, err := rsa.SignPKCS1v15(rand.Reader, s.privateKey, crypto.SHA256, hash[:])
	if err != nil {
		return "", err
	}

	signatureEncoded := base64.RawURLEncoding.EncodeToString(signature)
	return message + "." + signatureEncoded, nil
}

func (s *GoogleWalletService) CreateAddToWalletLink(pass *GooglePassPayload) (string, error) {
	jwt, err := s.GenerateJWT(pass)
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("https://pay.google.com/gp/v/save/%s", jwt), nil
}

func (s *GoogleWalletService) CreateSaveToGooglePayload(card *GooglePassPayload) (map[string]any, error) {
	jsonData, err := json.Marshal(card)
	if err != nil {
		return nil, err
	}

	var data map[string]any
	json.Unmarshal(jsonData, &data)

	return map[string]any{
		"client_id":       s.serviceAccount,
		"issuer_id":       s.issuerID,
		"credential":      data,
		"credential_type": "OFFER",
	}, nil
}
