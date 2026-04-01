package services

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"strings"
	"time"
)

type SEPAService struct {
	ibanService *IBANService
}

func NewSEPAService() *SEPAService {
	return &SEPAService{
		ibanService: NewIBANService(),
	}
}

type SEPAAccountDetails struct {
	IBAN              string `json:"iban"`
	BIC               string `json:"bic"`
	IBANFormatted     string `json:"iban_formatted"`
	BICFormatted      string `json:"bic_formatted"`
	BankCode          string `json:"bank_code"`
	BranchCode        string `json:"branch_code"`
	AccountNumber     string `json:"account_number"`
	CountryCode       string `json:"country_code"`
	CheckDigits       string `json:"check_digits"`
	IsValid           bool   `json:"is_valid"`
	BankName          string `json:"bank_name,omitempty"`
	RUM               string `json:"rum,omitempty"`
	MandateReference  string `json:"mandate_reference,omitempty"`
	CreditorReference string `json:"creditor_reference,omitempty"`
	SepaMessageId     string `json:"sepa_message_id,omitempty"`
}

func (s *SEPAService) GenerateRandomIBAN(countryCode string) string {
	if countryCode == "" {
		countryCode = "FR"
	}

	bankCode := generateRandomNumericString(5)
	branchCode := generateRandomNumericString(5)
	accountNumber := generateRandomAlphanumericString(11)

	return s.ibanService.GenerateIBAN(countryCode, bankCode, branchCode, accountNumber)
}

func (s *SEPAService) GenerateRandomBIC(bankCode string) string {
	if bankCode == "" {
		bankCode = "AETB"
	}
	return s.ibanService.GenerateBIC(bankCode, "FR", "")
}

func (s *SEPAService) ValidateSEPAData(iban, bic string) (bool, string) {
	if iban == "" {
		return false, "IBAN is required"
	}

	if !s.ValidateIBAN(iban) {
		return false, "Invalid IBAN checksum"
	}

	if bic != "" && !s.ValidateBIC(bic) {
		return false, "Invalid BIC format"
	}

	return true, ""
}

func (s *SEPAService) ValidateIBAN(iban string) bool {
	return s.ibanService.ValidateIBAN(iban)
}

func (s *SEPAService) ValidateBIC(bic string) bool {
	bic = strings.ToUpper(strings.ReplaceAll(bic, " ", ""))

	if len(bic) != 8 && len(bic) != 11 {
		return false
	}

	for _, c := range bic {
		if !((c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
			return false
		}
	}

	return true
}

func (s *SEPAService) FormatIBAN(iban string) string {
	iban = strings.ToUpper(strings.ReplaceAll(iban, " ", ""))

	var result strings.Builder
	for i, c := range iban {
		if i > 0 && i%4 == 0 {
			result.WriteString(" ")
		}
		result.WriteRune(c)
	}
	return result.String()
}

func (s *SEPAService) FormatBIC(bic string) string {
	bic = strings.ToUpper(strings.ReplaceAll(bic, " ", ""))

	if len(bic) == 8 {
		return fmt.Sprintf("%s %s %s XXX", bic[0:4], bic[4:6], bic[6:8])
	} else if len(bic) == 11 {
		return fmt.Sprintf("%s %s %s %s", bic[0:4], bic[4:6], bic[6:8], bic[8:11])
	}
	return bic
}

func (s *SEPAService) GenerateRUM() string {
	return fmt.Sprintf("FR29ZZZ%d", time.Now().UnixNano()%1000000000)
}

func (s *SEPAService) GenerateMandateReference() string {
	timestamp := time.Now().UnixNano() % 10000000000
	return fmt.Sprintf("MDT%d", timestamp)
}

func (s *SEPAService) GenerateCreditorReference() string {
	timestamp := time.Now().UnixNano() % 10000000000
	return fmt.Sprintf("REC%d", timestamp)
}

func (s *SEPAService) GenerateSEPAReference() string {
	timestamp := time.Now().Unix()
	random := generateRandomNumericString(4)
	return fmt.Sprintf("FR%d%s", timestamp, random)
}

func (s *SEPAService) GenerateSepaMessageId() string {
	timestamp := time.Now().Format("20060102150405")
	random := generateRandomNumericString(6)
	return fmt.Sprintf("MSG%s%s", timestamp, random)
}

func (s *SEPAService) GenerateEndToEndId() string {
	timestamp := time.Now().UnixNano() % 100000000000000
	return fmt.Sprintf("E2E%d", timestamp)
}

func (s *SEPAService) GenerateInstructionId() string {
	timestamp := time.Now().UnixNano() % 100000000000000
	return fmt.Sprintf("INS%d", timestamp)
}

func (s *SEPAService) GetBankName(bankCode string) string {
	knownBanks := map[string]string{
		"30002": "BNP Paribas",
		"30006": "Société Générale",
		"30003": "Crédit Agricole",
		"30007": "LCL",
		"10061": "La Banque Postale",
		"10278": "Dexia Crédit Local",
		"30027": "HSBC France",
		"30088": "Caisse d'Epargne",
		"30089": "Banque Populaire",
		"18206": "CIC",
		"10071": "Groupe BPCE",
		"10707": "Caisse d'Epargne",
		"11315": "La Banque Postale",
		"30020": "Crédit Mutuel",
		"30022": "BNP Paribas Personal Finance",
		"14312": "Cofidis",
		"14724": "Cetelem",
		"16676": "Compagnie Financière de la Côte d'Azur",
		"AETB":  "Aether Bank",
	}

	if name, ok := knownBanks[bankCode]; ok {
		return name
	}
	return "French Bank"
}

func (s *SEPAService) ParseIBAN(iban string) *SEPAAccountDetails {
	details := s.ibanService.ParseIBAN(iban)

	sepaDetails := &SEPAAccountDetails{
		IBAN:          details.IBAN,
		BIC:           details.BIC,
		IBANFormatted: s.FormatIBAN(details.IBAN),
		BICFormatted:  s.FormatBIC(details.BIC),
		CountryCode:   details.CountryCode,
		BankCode:      details.BankCode,
		BranchCode:    details.BranchCode,
		AccountNumber: details.AccountNumber,
		CheckDigits:   details.CheckDigits,
		IsValid:       details.IsValid,
		BankName:      s.GetBankName(details.BankCode),
	}

	return sepaDetails
}

func (s *SEPAService) GetSupportedCountries() []map[string]string {
	return []map[string]string{
		{"code": "FR", "name": "France", "currency": "EUR", "domestic": "true"},
		{"code": "DE", "name": "Germany", "currency": "EUR", "domestic": "false"},
		{"code": "ES", "name": "Spain", "currency": "EUR", "domestic": "false"},
		{"code": "IT", "name": "Italy", "currency": "EUR", "domestic": "false"},
		{"code": "NL", "name": "Netherlands", "currency": "EUR", "domestic": "false"},
		{"code": "BE", "name": "Belgium", "currency": "EUR", "domestic": "false"},
		{"code": "AT", "name": "Austria", "currency": "EUR", "domestic": "false"},
		{"code": "PT", "name": "Portugal", "currency": "EUR", "domestic": "false"},
		{"code": "IE", "name": "Ireland", "currency": "EUR", "domestic": "false"},
		{"code": "FI", "name": "Finland", "currency": "EUR", "domestic": "false"},
		{"code": "GR", "name": "Greece", "currency": "EUR", "domestic": "false"},
		{"code": "LU", "name": "Luxembourg", "currency": "EUR", "domestic": "false"},
		{"code": "SK", "name": "Slovakia", "currency": "EUR", "domestic": "false"},
		{"code": "SI", "name": "Slovenia", "currency": "EUR", "domestic": "false"},
		{"code": "EE", "name": "Estonia", "currency": "EUR", "domestic": "false"},
		{"code": "LV", "name": "Latvia", "currency": "EUR", "domestic": "false"},
		{"code": "LT", "name": "Lithuania", "currency": "EUR", "domestic": "false"},
		{"code": "MT", "name": "Malta", "currency": "EUR", "domestic": "false"},
		{"code": "CY", "name": "Cyprus", "currency": "EUR", "domestic": "false"},
		{"code": "CH", "name": "Switzerland", "currency": "CHF", "domestic": "false"},
		{"code": "GB", "name": "United Kingdom", "currency": "GBP", "domestic": "false"},
		{"code": "NO", "name": "Norway", "currency": "NOK", "domestic": "false"},
		{"code": "SE", "name": "Sweden", "currency": "SEK", "domestic": "false"},
		{"code": "DK", "name": "Denmark", "currency": "DKK", "domestic": "false"},
		{"code": "PL", "name": "Poland", "currency": "PLN", "domestic": "false"},
		{"code": "CZ", "name": "Czech Republic", "currency": "CZK", "domestic": "false"},
		{"code": "HU", "name": "Hungary", "currency": "HUF", "domestic": "false"},
	}
}

func generateRandomNumericString(length int) string {
	const digits = "0123456789"
	result := make([]byte, length)
	for i := range result {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(digits))))
		result[i] = digits[n.Int64()]
	}
	return string(result)
}

func generateRandomAlphanumericString(length int) string {
	const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	result := make([]byte, length)
	for i := range result {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		result[i] = chars[n.Int64()]
	}
	return string(result)
}

func GenerateRandomIBAN(countryCode string) string {
	service := NewSEPAService()
	return service.GenerateRandomIBAN(countryCode)
}

func GenerateRandomBIC(bankCode string) string {
	service := NewSEPAService()
	return service.GenerateRandomBIC(bankCode)
}

func ValidateSEPAData(iban, bic string) (bool, string) {
	service := NewSEPAService()
	return service.ValidateSEPAData(iban, bic)
}

func ParseSEPAIBAN(iban string) *SEPAAccountDetails {
	service := NewSEPAService()
	return service.ParseIBAN(iban)
}
