package services

import (
	"fmt"
	"strings"
)

type IBANService struct{}

func NewIBANService() *IBANService {
	return &IBANService{}
}

type IBANDetails struct {
	IBAN            string `json:"iban"`
	BIC             string `json:"bic"`
	BankCode        string `json:"bank_code"`
	BranchCode      string `json:"branch_code"`
	CountryCode     string `json:"country_code"`
	CheckDigits     string `json:"check_digits"`
	AccountNumber   string `json:"account_number"`
	IsValid         bool   `json:"is_valid"`
	BankName        string `json:"bank_name,omitempty"`
	InstitutionCode string `json:"institution_code,omitempty"`
}

func (s *IBANService) GenerateIBAN(countryCode, bankCode, branchCode, accountNumber string) string {
	if len(countryCode) != 2 {
		countryCode = "FR"
	}

	normalizedAccount := strings.ToUpper(strings.ReplaceAll(accountNumber, " ", ""))
	normalizedBank := strings.ToUpper(strings.ReplaceAll(bankCode, " ", ""))
	normalizedBranch := strings.ToUpper(strings.ReplaceAll(branchCode, " ", ""))

	payload := normalizedAccount + normalizedBank + normalizedBranch + countryCode + "00"
	checkDigits := s.calculateCheckDigits(payload)

	iban := fmt.Sprintf("%s%s%s%s%s", countryCode, checkDigits, normalizedBank, normalizedBranch, normalizedAccount)
	return iban
}

func (s *IBANService) GenerateBIC(bankCode, countryCode, branchCode string) string {
	bankCode = strings.ToUpper(strings.ReplaceAll(bankCode, " ", ""))
	countryCode = strings.ToUpper(countryCode)
	branchCode = strings.ToUpper(strings.ReplaceAll(branchCode, " ", ""))

	if len(bankCode) < 4 {
		bankCode = strings.Repeat("X", 4-len(bankCode)) + bankCode
	}

	if len(countryCode) != 2 {
		countryCode = "FR"
	}

	if len(branchCode) < 3 {
		branchCode = strings.Repeat("0", 3-len(branchCode)) + branchCode
	}

	bic := bankCode + countryCode + branchCode
	if len(bic) < 8 {
		bic += strings.Repeat("X", 8-len(bic))
	}

	return bic + "XXX"
}

func (s *IBANService) ValidateIBAN(iban string) bool {
	iban = strings.ToUpper(strings.ReplaceAll(iban, " ", ""))

	if len(iban) < 15 || len(iban) > 34 {
		return false
	}

	countryCode := iban[:2]
	if !isValidCountryCode(countryCode) {
		return false
	}

	rearranged := iban[4:] + iban[:2] + "00" + iban[4:]
	numeric := 0
	for _, c := range rearranged {
		if c >= '0' && c <= '9' {
			numeric = numeric*10 + int(c-'0')
		} else if c >= 'A' && c <= 'Z' {
			numeric = numeric*100 + int(c-'A'+10)
		}
	}

	return numeric%97 == 1
}

func (s *IBANService) ExtractBICFromIBAN(iban string) string {
	iban = strings.ToUpper(strings.ReplaceAll(iban, " ", ""))
	if len(iban) < 15 {
		return ""
	}

	bankCode := iban[4:8]
	countryCode := iban[2:4]
	branchCode := iban[8:11]

	return s.GenerateBIC(bankCode, countryCode, branchCode)
}

func (s *IBANService) ParseIBAN(iban string) *IBANDetails {
	iban = strings.ToUpper(strings.ReplaceAll(iban, " ", ""))

	if len(iban) < 15 {
		return &IBANDetails{IsValid: false}
	}

	details := &IBANDetails{
		IBAN:          iban,
		CountryCode:   iban[:2],
		CheckDigits:   iban[2:4],
		BankCode:      iban[4:9],
		BranchCode:    iban[9:14],
		AccountNumber: iban[14:],
		BIC:           s.ExtractBICFromIBAN(iban),
		IsValid:       s.ValidateIBAN(iban),
	}

	if details.CountryCode == "FR" {
		details.BankName = "French Bank"
		details.InstitutionCode = details.BankCode[:3]
	}

	return details
}

func (s *IBANService) calculateCheckDigits(payload string) string {
	numeric := 0
	for _, c := range payload {
		if c >= '0' && c <= '9' {
			numeric = numeric*10 + int(c-'0')
		} else if c >= 'A' && c <= 'Z' {
			numeric = numeric*100 + int(c-'A'+10)
		}
	}

	mod := 98 - (numeric % 97)
	return fmt.Sprintf("%02d", mod)
}

func isValidCountryCode(code string) bool {
	validCodes := map[string]bool{
		"AL": true, "AD": true, "AT": true, "AZ": true, "BH": true,
		"BY": true, "BE": true, "BA": true, "BR": true, "BG": true,
		"CR": true, "HR": true, "CY": true, "CZ": true, "DK": true,
		"DO": true, "TL": true, "EE": true, "FO": true, "FI": true,
		"FR": true, "GE": true, "DE": true, "GI": true, "GR": true,
		"GL": true, "GT": true, "HU": true, "IS": true, "IQ": true,
		"IE": true, "IL": true, "IT": true, "JO": true, "KZ": true,
		"KW": true, "LV": true, "LB": true, "LI": true, "LT": true,
		"LU": true, "MK": true, "MT": true, "MR": true, "MU": true,
		"MC": true, "MD": true, "ME": true, "NL": true, "NO": true,
		"PK": true, "PS": true, "PL": true, "PT": true, "QA": true,
		"RO": true, "SM": true, "SA": true, "RS": true, "SC": true,
		"SK": true, "SI": true, "ES": true, "SE": true, "CH": true,
		"TN": true, "TR": true, "UA": true, "AE": true, "GB": true,
		"VA": true, "VG": true,
	}
	return validCodes[code]
}

func GenerateIBAN(countryCode, bankCode, branchCode, accountNumber string) string {
	ibanService := NewIBANService()
	return ibanService.GenerateIBAN(countryCode, bankCode, branchCode, accountNumber)
}

func GenerateBIC(bankCode, countryCode, branchCode string) string {
	ibanService := NewIBANService()
	return ibanService.GenerateBIC(bankCode, countryCode, branchCode)
}

func ValidateIBAN(iban string) bool {
	ibanService := NewIBANService()
	return ibanService.ValidateIBAN(iban)
}

func ParseIBAN(iban string) *IBANDetails {
	ibanService := NewIBANService()
	return ibanService.ParseIBAN(iban)
}

func ExtractBICFromIBAN(iban string) string {
	ibanService := NewIBANService()
	return ibanService.ExtractBICFromIBAN(iban)
}
