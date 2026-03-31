package services

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"time"

	"github.com/skygenesisenterprise/aether-bank/server/src/models"
)

var (
	bankingAccounts = make(map[string]*models.BankingAccount)
	bankingCards    = make(map[string]*models.BankingCard)
	transfers       = make(map[string]*models.Transfer)
	transactions    = make(map[string]*models.Transaction)
	mandates        = make(map[string]*models.Mandate)
	directDebits    = make(map[string]*models.DirectDebit)
	ledgerEntries   = make(map[string]*models.LedgerEntry)
	clients         = make(map[string]*models.Client)
	credits         = make(map[string]*models.Credit)
	savingsAccounts = make(map[string]*models.SavingsAccount)
)

func init() {
	seedBankingData()
}

func seedBankingData() {
	account := &models.BankingAccount{
		ID:       generateBankingID("acc"),
		Type:     models.BankingAccountTypeCurrent,
		Currency: "EUR",
		Status:   models.BankingAccountStatusActive,
		IBAN:     generateIBAN(),
		BIC:      "NPSYFRPPXXX",
		Holder: &models.AccountHolder{
			Name: "Demo Account",
			Type: models.HolderTypeIndividual,
		},
		Balance: &models.AccountBalance{
			Available: 5000000,
			Current:   5000000,
			Pending:   0,
			Overdraft: 0,
		},
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	bankingAccounts[account.ID] = account

	card := &models.BankingCard{
		ID:             generateBankingID("crd"),
		AccountID:      account.ID,
		Type:           models.CardTypePhysical,
		Status:         models.CardStatusActive,
		HolderName:     "Demo User",
		Last4:          generateLast4(),
		ExpiryMonth:    12,
		ExpiryYear:     2027,
		Brand:          "VISA",
		SpendingLimits: &models.SpendingLimits{Daily: 100000, Monthly: 300000},
		CreatedAt:      time.Now(),
	}
	bankingCards[card.ID] = card
}

func generateBankingID(prefix string) string {
	const digits = "0123456789"
	const charset = "abcdefghijklmnopqrstuvwxyz"
	result := prefix + "_"
	for i := 0; i < 6; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		result += string(charset[n.Int64()])
	}
	return result
}

func generateIBAN() string {
	const chars = "0123456789"
	fr := "FR76"
	for i := 0; i < 23; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		fr += string(chars[n.Int64()])
	}
	return fr
}

func generateLast4() string {
	const chars = "0123456789"
	result := ""
	for i := 0; i < 4; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		result += string(chars[n.Int64()])
	}
	return result
}

func generateRUM() string {
	return fmt.Sprintf("FR29ZZZ%d", time.Now().UnixNano()%1000000000)
}

type BankingService struct{}

func NewBankingService() *BankingService {
	return &BankingService{}
}

func (s *BankingService) CreateAccount(req *models.CreateBankingAccountRequest) *models.BankingAccount {
	account := &models.BankingAccount{
		ID:       generateBankingID("acc"),
		Type:     req.Type,
		Currency: req.Currency,
		Status:   models.BankingAccountStatusPendingKYC,
		IBAN:     generateIBAN(),
		BIC:      "NPSYFRPPXXX",
		Holder: &models.AccountHolder{
			Name: req.HolderName,
			Type: req.HolderType,
		},
		Balance: &models.AccountBalance{
			Available: 0,
			Current:   0,
			Pending:   0,
			Overdraft: 0,
		},
		Metadata:  req.Metadata,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	bankingAccounts[account.ID] = account
	return account
}

func (s *BankingService) GetAccount(id string) *models.BankingAccount {
	return bankingAccounts[id]
}

func (s *BankingService) ListAccounts(status, accountType string, limit, offset int) *models.BankingAccountList {
	var accounts []models.BankingAccount
	for _, acc := range bankingAccounts {
		if status != "" && string(acc.Status) != status {
			continue
		}
		if accountType != "" && string(acc.Type) != accountType {
			continue
		}
		accounts = append(accounts, *acc)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(accounts) {
		offset = len(accounts)
	}
	end := offset + limit
	if end > len(accounts) {
		end = len(accounts)
	}
	return &models.BankingAccountList{
		Accounts: accounts[offset:end],
		Total:    len(accounts),
		Limit:    limit,
		Offset:   offset,
	}
}

func (s *BankingService) GetBalance(accountID string) *models.AccountBalance {
	account := bankingAccounts[accountID]
	if account != nil {
		return account.Balance
	}
	return nil
}

func (s *BankingService) CreateCard(req *models.CreateCardRequest) *models.BankingCard {
	card := &models.BankingCard{
		ID:             generateBankingID("crd"),
		AccountID:      req.AccountID,
		Type:           req.Type,
		Status:         models.CardStatusPending,
		HolderName:     req.HolderName,
		Last4:          generateLast4(),
		ExpiryMonth:    12,
		ExpiryYear:     2027,
		Brand:          "VISA",
		SpendingLimits: req.SpendingLimits,
		CreatedAt:      time.Now(),
	}

	if req.Type == models.CardTypeVirtual {
		card.Status = models.CardStatusActive
		card.PAN = "411111111111" + card.Last4
		card.CVV = fmt.Sprintf("%03d", time.Now().UnixNano()%1000)
		if req.ValidUntil != "" {
			if t, err := time.Parse("2006-01-02", req.ValidUntil); err == nil {
				card.ExpiryMonth = int(t.Month())
				card.ExpiryYear = t.Year()
			}
		}
	} else if req.Type == models.CardTypePhysical {
		delivery := time.Now().Add(5 * 24 * time.Hour)
		card.EstimatedDelivery = &delivery
	}

	bankingCards[card.ID] = card
	return card
}

func (s *BankingService) GetCard(id string) *models.BankingCard {
	return bankingCards[id]
}

func (s *BankingService) ListCards(accountID, status, cardType string, limit, offset int) *models.CardList {
	var cards []models.BankingCard
	for _, card := range bankingCards {
		if accountID != "" && card.AccountID != accountID {
			continue
		}
		if status != "" && string(card.Status) != status {
			continue
		}
		if cardType != "" && string(card.Type) != cardType {
			continue
		}
		cards = append(cards, *card)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(cards) {
		offset = len(cards)
	}
	end := offset + limit
	if end > len(cards) {
		end = len(cards)
	}
	return &models.CardList{
		Cards:  cards[offset:end],
		Total:  len(cards),
		Limit:  limit,
		Offset: offset,
	}
}

func (s *BankingService) FreezeCard(id, reason string) *models.BankingCard {
	card := bankingCards[id]
	if card != nil {
		card.Status = models.CardStatusFrozen
		card.FrozenAt = new(time.Time)
		*card.FrozenAt = time.Now()
		card.FrozenReason = reason
	}
	return card
}

func (s *BankingService) UnfreezeCard(id string) *models.BankingCard {
	card := bankingCards[id]
	if card != nil {
		card.Status = models.CardStatusActive
		card.FrozenAt = nil
		card.FrozenReason = ""
	}
	return card
}

func (s *BankingService) CreateTransfer(req *models.CreateTransferRequest) *models.Transfer {
	transfer := &models.Transfer{
		ID:           generateBankingID("trf"),
		AccountID:    req.AccountID,
		Type:         req.Type,
		Status:       models.TransferStatusPending,
		Amount:       req.Amount,
		Currency:     req.Currency,
		Description:  req.Description,
		Reference:    req.Reference,
		Counterparty: req.Counterparty,
		CreatedAt:    time.Now(),
	}
	transfers[transfer.ID] = transfer

	transaction := &models.Transaction{
		ID:           generateBankingID("txn"),
		AccountID:    req.AccountID,
		Type:         models.TransactionTypeDebit,
		Status:       models.TransactionStatusPending,
		Amount:       -req.Amount,
		Currency:     req.Currency,
		Description:  req.Description,
		Counterparty: req.Counterparty,
		CreatedAt:    time.Now(),
	}
	transactions[transaction.ID] = transaction

	return transfer
}

func (s *BankingService) GetTransfer(id string) *models.Transfer {
	return transfers[id]
}

func (s *BankingService) ListTransfers(accountID string, limit, offset int) *models.TransferList {
	var tfrs []models.Transfer
	for _, t := range transfers {
		if accountID != "" && t.AccountID != accountID {
			continue
		}
		tfrs = append(tfrs, *t)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(tfrs) {
		offset = len(tfrs)
	}
	end := offset + limit
	if end > len(tfrs) {
		end = len(tfrs)
	}
	return &models.TransferList{
		Transfers: tfrs[offset:end],
		Total:     len(tfrs),
		Limit:     limit,
		Offset:    offset,
	}
}

func (s *BankingService) ListTransactions(req *models.TransactionSearchRequest) *models.TransactionList {
	var txns []models.Transaction
	for _, t := range transactions {
		if req.AccountID != "" && t.AccountID != req.AccountID {
			continue
		}
		if req.Status != "" && string(t.Status) != req.Status {
			continue
		}
		if req.Type != "" && string(t.Type) != req.Type {
			continue
		}
		if req.Query != "" {
			found := false
			if contains(t.Description, req.Query) {
				found = true
			}
			if contains(t.Reference, req.Query) {
				found = true
			}
			if !found {
				continue
			}
		}
		txns = append(txns, *t)
	}
	if req.Limit == 0 {
		req.Limit = 50
	}
	if req.Offset > len(txns) {
		req.Offset = len(txns)
	}
	end := req.Offset + req.Limit
	if end > len(txns) {
		end = len(txns)
	}
	hasMore := end < len(txns)
	return &models.TransactionList{
		Transactions: txns[req.Offset:end],
		Total:        len(txns),
		Limit:        req.Limit,
		Offset:       req.Offset,
		HasMore:      hasMore,
	}
}

func (s *BankingService) GetTransaction(id string) *models.Transaction {
	return transactions[id]
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > 0 && (s[:len(substr)] == substr || contains(s[1:], substr)))
}

func (s *BankingService) CreateMandate(req *models.CreateMandateRequest) *models.Mandate {
	mandate := &models.Mandate{
		ID:     generateBankingID("mand"),
		Type:   req.Type,
		RUM:    generateRUM(),
		Status: models.DirectDebitStatusPending,
		Creditor: &models.Creditor{
			Name: req.CreditorName,
			IBAN: req.CreditorIBAN,
			BIC:  req.CreditorBIC,
		},
		DebtorIBAN: req.DebtorIBAN,
		Reference:  req.Reference,
		CreatedAt:  time.Now(),
	}
	mandates[mandate.ID] = mandate
	return mandate
}

func (s *BankingService) GetMandate(id string) *models.Mandate {
	return mandates[id]
}

func (s *BankingService) ListMandates(limit, offset int) *models.MandateList {
	var list []models.Mandate
	for _, m := range mandates {
		list = append(list, *m)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(list) {
		offset = len(list)
	}
	end := offset + limit
	if end > len(list) {
		end = len(list)
	}
	return &models.MandateList{
		Mandates: list[offset:end],
		Total:    len(list),
		Limit:    limit,
		Offset:   offset,
	}
}

func (s *BankingService) CancelMandate(id string) *models.Mandate {
	mandate := mandates[id]
	if mandate != nil {
		mandate.Status = models.DirectDebitStatusCancelled
	}
	return mandate
}

func (s *BankingService) CreateDirectDebit(req *models.CreateDirectDebitRequest) *models.DirectDebit {
	mandate := mandates[req.MandateID]
	dd := &models.DirectDebit{
		ID:          generateBankingID("dd"),
		MandateID:   req.MandateID,
		Amount:      req.Amount,
		Currency:    req.Currency,
		Status:      models.DirectDebitStatusPending,
		Description: req.Description,
		ScheduledDate: func() *time.Time {
			if req.ScheduledDate != "" {
				if t, err := time.Parse("2006-01-02", req.ScheduledDate); err == nil {
					return &t
				}
			}
			return nil
		}(),
		CreatedAt: time.Now(),
	}
	if mandate != nil {
		dd.Creditor = mandate.Creditor
	}
	directDebits[dd.ID] = dd
	return dd
}

func (s *BankingService) GetDirectDebit(id string) *models.DirectDebit {
	return directDebits[id]
}

func (s *BankingService) ListDirectDebits(limit, offset int) *models.DirectDebitList {
	var list []models.DirectDebit
	for _, d := range directDebits {
		list = append(list, *d)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(list) {
		offset = len(list)
	}
	end := offset + limit
	if end > len(list) {
		end = len(list)
	}
	return &models.DirectDebitList{
		DirectDebits: list[offset:end],
		Total:        len(list),
		Limit:        limit,
		Offset:       offset,
	}
}

func (s *BankingService) GetLedgerEntries(accountID, fromDate, toDate, category string, limit, offset int) *models.LedgerEntryList {
	var entries []models.LedgerEntry
	for _, e := range ledgerEntries {
		entries = append(entries, *e)
	}
	if limit == 0 {
		limit = 50
	}
	if offset > len(entries) {
		offset = len(entries)
	}
	end := offset + limit
	if end > len(entries) {
		end = len(entries)
	}
	return &models.LedgerEntryList{
		Entries: entries[offset:end],
		Total:   len(entries),
		Limit:   limit,
		Offset:  offset,
		HasMore: end < len(entries),
	}
}

func (s *BankingService) GetLedgerAccounts(limit, offset int) *models.LedgerAccountList {
	accounts := []models.LedgerAccount{
		{Code: "411000", Label: "Clients - Ventes de prestations", Type: "client"},
		{Code: "401000", Label: "Fournisseurs", Type: "supplier"},
		{Code: "512000", Label: "Banque", Type: "bank"},
		{Code: "601000", Label: "Achats", Type: "expense"},
		{Code: "701000", Label: "Ventes", Type: "income"},
	}
	return &models.LedgerAccountList{
		Accounts: accounts,
		Total:    len(accounts),
		Limit:    limit,
		Offset:   offset,
	}
}

func (s *BankingService) GetLedgerBalance(date string) *models.LedgerBalanceResponse {
	return &models.LedgerBalanceResponse{
		Date: date,
		Accounts: []models.LedgerBalance{
			{Code: "411000", Label: "Clients", Debit: 0, Credit: 450000, Solde: 450000},
			{Code: "401000", Label: "Fournisseurs", Debit: 8999, Credit: 0, Solde: -8999},
			{Code: "512000", Label: "Banque", Debit: 5000000, Credit: 450000, Solde: 4550000},
		},
		Totals: &models.LedgerTotals{
			TotalDebit:  5098999,
			TotalCredit: 899999,
			Balance:     4199000,
		},
	}
}

func (s *BankingService) ExportFEC(req *models.ExportFECRequest) *models.ExportFECResponse {
	return &models.ExportFECResponse{
		ExportID:    generateBankingID("exp"),
		Status:      "completed",
		DownloadURL: "https://api.aetherbank.com/exports/" + generateBankingID("exp") + ".zip",
		FileSize:    245678,
		Checksum:    "sha256:abc123...",
		ExpiresAt:   time.Now().Add(30 * 24 * time.Hour),
	}
}

func (s *BankingService) CreateClient(req *models.CreateClientRequest) *models.Client {
	client := &models.Client{
		ID:          generateBankingID("cli"),
		AccountIDs:  []string{},
		Email:       req.Email,
		Name:        req.Name,
		Company:     req.Company,
		Status:      models.ClientStatusPending,
		KYCVerified: false,
		Metadata:    req.Metadata,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
	clients[client.ID] = client
	return client
}

func (s *BankingService) GetClient(id string) *models.Client {
	return clients[id]
}

func (s *BankingService) ListClients(limit, offset int) *models.ClientList {
	var list []models.Client
	for _, c := range clients {
		list = append(list, *c)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(list) {
		offset = len(list)
	}
	end := offset + limit
	if end > len(list) {
		end = len(list)
	}
	return &models.ClientList{
		Clients: list[offset:end],
		Total:   len(list),
		Limit:   limit,
		Offset:  offset,
	}
}

func (s *BankingService) CreateCredit(req *models.CreateCreditRequest) *models.Credit {
	monthlyPayment := (req.Amount * int64(float64(req.InterestRate)/12*100)) / 100000
	endDate := time.Now().AddDate(0, req.TermMonths, 0)
	credit := &models.Credit{
		ID:              generateBankingID("cred"),
		AccountID:       req.AccountID,
		Amount:          req.Amount,
		Currency:        req.Currency,
		Status:          models.CreditStatusPending,
		InterestRate:    req.InterestRate,
		TermMonths:      req.TermMonths,
		MonthlyPayment:  monthlyPayment,
		RemainingAmount: req.Amount,
		RemainingMonths: req.TermMonths,
		StartDate:       time.Now(),
		EndDate:         endDate,
		Collateral:      req.Collateral,
		Metadata:        req.Metadata,
		CreatedAt:       time.Now(),
	}
	credits[credit.ID] = credit
	return credit
}

func (s *BankingService) GetCredit(id string) *models.Credit {
	return credits[id]
}

func (s *BankingService) ListCredits(accountID string, limit, offset int) *models.CreditList {
	var list []models.Credit
	for _, c := range credits {
		if accountID != "" && c.AccountID != accountID {
			continue
		}
		list = append(list, *c)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(list) {
		offset = len(list)
	}
	end := offset + limit
	if end > len(list) {
		end = len(list)
	}
	return &models.CreditList{
		Credits: list[offset:end],
		Total:   len(list),
		Limit:   limit,
		Offset:  offset,
	}
}

func (s *BankingService) CreateSavingsAccount(req *models.CreateSavingsRequest) *models.SavingsAccount {
	account := &models.SavingsAccount{
		ID:              generateBankingID("sav"),
		AccountID:       req.AccountID,
		Currency:        req.Currency,
		Status:          models.SavingsStatusActive,
		InterestRate:    req.InterestRate,
		Balance:         0,
		AccruedInterest: 0,
		TotalCredits:    0,
		TotalDebits:     0,
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}
	savingsAccounts[account.ID] = account
	return account
}

func (s *BankingService) GetSavingsAccount(id string) *models.SavingsAccount {
	return savingsAccounts[id]
}

func (s *BankingService) ListSavingsAccounts(accountID string, limit, offset int) *models.SavingsList {
	var list []models.SavingsAccount
	for _, a := range savingsAccounts {
		if accountID != "" && a.AccountID != accountID {
			continue
		}
		list = append(list, *a)
	}
	if limit == 0 {
		limit = 20
	}
	if offset > len(list) {
		offset = len(list)
	}
	end := offset + limit
	if end > len(list) {
		end = len(list)
	}
	return &models.SavingsList{
		Accounts: list[offset:end],
		Total:    len(list),
		Limit:    limit,
		Offset:   offset,
	}
}
