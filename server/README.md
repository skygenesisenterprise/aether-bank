<div align="center">

# 🚀 Aether Bank API

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/aether-bank/blob/main/LICENSE) [![Go](https://img.shields.io/badge/Go-1.25+-blue?style=for-the-badge&logo=go)](https://golang.org/) [![Gin](https://img.shields.io/badge/Gin-1.12+-lightgrey?style=for-the-badge&logo=go)](https://gin-gonic.com/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/) [![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

**🔥 Enterprise-Grade Banking API - Full-Featured Financial Infrastructure**

A comprehensive banking API platform featuring **complete account management**, **SEPA transfers**, **card issuing**, **KYC integration**, **multi-provider support**, and **Apple Pay / Google Wallet** capabilities.

[🚀 Quick Start](#-quick-start) • [📋 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Architecture](#-architecture) • [🔌 Providers](#-providers) • [📦 Models](#-models)

</div>

---

## 🌟 What is Aether Bank API?

**Aether Bank API** is an enterprise-grade banking infrastructure built with Go, featuring a comprehensive set of financial services including account management, transfers, card operations, KYC verification, and digital wallet integration.

### 🎯 Our Vision

- **🏦 Complete Banking Platform** - Full ledger-first architecture with provider-agnostic design
- **💳 Card Management** - Physical and virtual card issuing with wallet integration
- **🔐 KYC Integration** - Identity verification with external provider support
- **💸 SEPA Transfers** - Incoming and outgoing payment handling with idempotency
- **🔌 Multi-Provider Support** - MangoPay, Treezor, Sumsub integrations
- **📱 Digital Wallets** - Apple Pay and Google Wallet pass generation
- **🗄️ PostgreSQL + Prisma** - Modern database layer with type-safe queries

---

## 📋 Features

### 🏦 Account Management

- ✅ Bank account creation with IBAN/BIC generation
- ✅ Account balance tracking and ledger integration
- ✅ Multi-currency support (EUR default)
- ✅ Account status management (Pending KYC, Active, Restricted, Closed, Blocked)

### 💳 Card Operations

- ✅ Physical and virtual card issuing
- ✅ Card freeze/unfreeze functionality
- ✅ Spending limits (daily/monthly)
- ✅ Card authorization handling
- ✅ Apple Pay pass generation
- ✅ Google Wallet pass generation

### 💸 Transfer System

- ✅ SEPA credit transfers (outgoing)
- ✅ Incoming transfer handling via webhooks
- ✅ Idempotency key support for duplicate prevention
- ✅ Transfer reversal capability
- ✅ Transaction history with reconciliation

### 🔐 KYC & Compliance

- ✅ Identity verification integration
- ✅ Document type support (passport, ID card)
- ✅ Verification status tracking
- ✅ Risk score evaluation

### 📱 Digital Wallet

- ✅ Apple Pay Web Service integration
- ✅ Google Wallet API integration
- ✅ Pass generation and status tracking

### 🔌 Provider Integration

- ✅ MangoPay adapter (IBAN, PSP, Card, KYC)
- ✅ Treezor adapter (IBAN, PSP)
- ✅ Sumsub adapter (KYC verification)
- ✅ Provider-agnostic architecture

---

## 🛠️ Tech Stack

### ⚙️ Backend Layer

```
Go 1.25+ + Gin Framework
├── 🗄️ Prisma + PostgreSQL (Database Layer)
├── 🔐 JWT Authentication (Complete Implementation)
├── 🛡️ Middleware (Security, CORS, Logging, Rate Limiting)
├── 🌐 HTTP Router (Gin Router)
├── 📦 JSON Serialization (Native Go)
└── 📊 Structured Logging (slog)
```

### 📦 Provider Integration Layer

```
Provider Adapters (Interface-based)
├── 💳 MangoPay (Cards, PSP, KYC)
├── 🏦 Treezor (IBAN, PSP)
├── 🔍 Sumsub (KYC Verification)
└── 📱 Digital Wallets (Apple Pay, Google Wallet)
```

### 🗄️ Data Layer

```
PostgreSQL 14+ + Prisma 5+
├── 🏗️ Schema Management (Auto-migration)
├── 🔍 Type-Safe Queries (Prisma Client)
├── 🔄 Connection Pooling
├── 📈 Banking Models (Accounts, Cards, Transfers, etc.)
└── 📋 Seed Scripts (Development Data)
```

### 🏗️ Architecture

```
server/
├── src/
│   ├── domain/          # Domain entities (Account, Ledger, Transfer)
│   ├── provider/        # Provider interfaces and adapters
│   ├── usecase/         # Business logic orchestration
│   ├── services/        # Core services (IBAN, Transfer, Wallet)
│   ├── routes/          # HTTP handlers and route definitions
│   ├── middleware/      # Auth, validation, security
│   ├── models/          # API models and DTOs
│   ├── config/          # Configuration
│   └── webhook/          # External webhook handlers
└── prisma/
    └── schema.prisma    # Database schema
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Go** 1.25.0 or higher
- **PostgreSQL** 14.0 or higher
- **Docker** (optional, for containerized deployment)
- **Make** (for command shortcuts)

### 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/skygenesisenterprise/aether-bank.git
   cd aether-bank
   ```

2. **Environment setup**

   ```bash
   # Copy environment file
   cp .env.example .env

   # Update DATABASE_URL in .env
   ```

3. **Database setup**

   ```bash
   cd server
   go mod download
   npx prisma generate
   npx prisma db push
   ```

4. **Start the server**

   ```bash
   cd server
   go run main.go
   ```

### 🌐 Access Points

Once running, you can access:

- **API Server**: [http://localhost:8080](http://localhost:8080)
- **Health Check**: [http://localhost:8080/health](http://localhost:8080/health)
- **API Documentation**: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)

---

## 📁 Architecture

### 🔄 Data Flow Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client App    │◄──►│   Gin API        │◄──►│   PostgreSQL    │
│   (Frontend)    │    │   (Backend)      │    │   (Database)    │
│  Port 3000      │    │  Port 8080       │    │  Port 5432      │
│  TypeScript     │    │  Go              │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                     │                       │
         ▼                     ▼                       ▼
   Web Requests          API Endpoints           Banking Data
   JWT Tokens            Business Logic          Prisma ORM
   React Context         Provider Adapters       Auto-migrations
         │                     │
         ▼                     ▼
   ┌─────────────────┐    ┌──────────────────┐
   │  Digital Wallet │    │  External Providers│
   │  Apple Pay      │    │  MangoPay         │
   │  Google Wallet  │    │  Treezor         │
   │                 │    │  Sumsub          │
   └─────────────────┘    └──────────────────┘
```

---

## 🔌 Providers

### Available Provider Adapters

| Provider     | Services             | Status     |
| ------------ | -------------------- | ---------- |
| **MangoPay** | IBAN, PSP, Card, KYC | ✅ Ready   |
| **Treezor**  | IBAN, PSP            | ✅ Ready   |
| **Sumsub**   | KYC Verification     | ✅ Ready   |
| **Mock**     | All Services         | ✅ Testing |

### Interface-Based Design

```go
type IBANProvider interface {
    CreateIBAN(ctx context.Context, userID string, accountType string) (*IBANAccount, error)
    GetAccountDetails(ctx context.Context, iban string) (*IBANAccount, error)
    HandleIncomingTransfer(ctx context.Context, webhook *IncomingTransferWebhook) (*TransferResult, error)
}

type PSPProvider interface {
    CreatePayment(ctx context.Context, req *CreatePaymentRequest) (*Payment, error)
    RefundPayment(ctx context.Context, paymentID string, amount int64, reason string) (*Refund, error)
    HandlePaymentWebhook(ctx context.Context, webhook *PaymentWebhook) (*PaymentResult, error)
}

type CardProvider interface {
    CreateCard(ctx context.Context, req *CreateCardRequest) (*Card, error)
    FreezeCard(ctx context.Context, cardID string, reason string) (*Card, error)
    UnfreezeCard(ctx context.Context, cardID string) (*Card, error)
    HandleAuthorization(ctx context.Context, auth *CardAuthorization) (*AuthorizationResult, error)
}

type KYCProvider interface {
    VerifyIdentity(ctx context.Context, req *KYCVerificationRequest) (*KYCVerification, error)
    GetVerificationStatus(ctx context.Context, verificationID string) (*KYCVerification, error)
}
```

---

## 📦 Database Models

### Banking Models (Prisma Schema)

| Model                   | Description                      |
| ----------------------- | -------------------------------- |
| **BankAccount**         | Main bank account with IBAN/BIC  |
| **BankingCard**         | Physical and virtual cards       |
| **Transfer**            | SEPA and international transfers |
| **Transaction**         | Account transactions             |
| **LedgerEntry**         | Double-entry ledger records      |
| **Credit**              | Loan and credit management       |
| **SavingsAccount**      | Savings account tracking         |
| **Mandate**             | SEPA direct debit mandates       |
| **DirectDebit**         | Direct debit transactions        |
| **KYCVerification**     | Identity verification records    |
| **CardAuthorization**   | Card payment authorizations      |
| **Client**              | Client/merchant management       |
| **WalletPass**          | Apple/Google wallet passes       |
| **ProviderIntegration** | External provider configs        |
| **WebhookEvent**        | Webhook event logging            |

---

## 📋 API Endpoints

### Core Banking API

| Method        | Endpoint                                 | Description               |
| ------------- | ---------------------------------------- | ------------------------- |
| **Accounts**  |                                          |                           |
| POST          | `/api/v1/ledger-v2/accounts`             | Create new account        |
| GET           | `/api/v1/ledger-v2/accounts/:id`         | Get account details       |
| GET           | `/api/v1/ledger-v2/accounts/:id/balance` | Get account balance       |
| **Transfers** |                                          |                           |
| POST          | `/api/v1/transfers-v2`                   | Create transfer           |
| GET           | `/api/v1/transfers-v2`                   | List transfers            |
| GET           | `/api/v1/transfers-v2/:id`               | Get transfer details      |
| POST          | `/api/v1/transfers-v2/:id/reverse`       | Reverse transfer          |
| **Cards**     |                                          |                           |
| POST          | `/api/v1/cards`                          | Create card               |
| POST          | `/api/v1/cards/:id/freeze`               | Freeze card               |
| POST          | `/api/v1/cards/:id/unfreeze`             | Unfreeze card             |
| **IBAN**      |                                          |                           |
| POST          | `/api/v1/iban/validate`                  | Validate IBAN             |
| POST          | `/api/v1/iban/parse`                     | Parse IBAN details        |
| POST          | `/api/v1/iban/generate`                  | Generate new IBAN         |
| **Wallet**    |                                          |                           |
| POST          | `/api/v1/wallet/apple/generate-pass`     | Generate Apple Pay pass   |
| POST          | `/api/v1/wallet/google/create-add-link`  | Create Google Wallet link |
| **Webhooks**  |                                          |                           |
| POST          | `/api/v1/webhooks/iban`                  | IBAN webhook handler      |
| POST          | `/api/v1/webhooks/payment`               | Payment webhook handler   |
| POST          | `/api/v1/webhooks/card`                  | Card webhook handler      |
| POST          | `/api/v1/webhooks/kyc`                   | KYC webhook handler       |

---

## 🛠️ Development

### Make Commands

```bash
# 🚀 Development
make dev                 # Start development server
make build               # Build production binary

# 🗄️ Database
make db-generate         # Generate Prisma client
make db-migrate          # Run migrations
make db-studio           # Open Prisma Studio

# 🔧 Code Quality
make lint                # Lint code
make format              # Format code

# 🐳 Docker
make docker-build        # Build Docker image
make docker-run          # Run container
```

---

## 🔐 Security Features

- ✅ JWT Authentication with refresh tokens
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Security headers (Helmet)
- ✅ Structured logging with correlation IDs
- ✅ Idempotency for critical operations

---

## 📊 Project Status

| Component               | Status     | Technology         | Notes               |
| ----------------------- | ---------- | ------------------ | ------------------- |
| **Go Backend API**      | ✅ Working | Gin + Go 1.25      | High-performance    |
| **Ledger System**       | ✅ Working | Domain-driven      | Double-entry        |
| **IBAN/BIC Generation** | ✅ Working | Custom service     | ISO 7064 compliant  |
| **Transfer System**     | ✅ Working | SEPA               | Idempotency support |
| **Card Management**     | ✅ Working | Virtual + Physical | Spending limits     |
| **KYC Integration**     | ✅ Working | Sumsub adapter     | Provider-agnostic   |
| **Apple Pay**           | ✅ Working | Pass generation    | PKPass format       |
| **Google Wallet**       | ✅ Working | JWT signing        | API integration     |
| **PostgreSQL Layer**    | ✅ Working | Prisma 5           | Type-safe           |
| **Webhook Handling**    | ✅ Working | Gin handlers       | All providers       |

---

## 📞 Support

- 📖 **[Documentation](docs/)** - Comprehensive guides
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/aether-bank/issues)** - Bug reports
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/aether-bank/discussions)** - General questions

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Sky Genesis Enterprise

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Sky Genesis Enterprise** - Project leadership
- **Go Community** - High-performance programming
- **Gin Framework** - Lightweight HTTP web framework
- **Prisma Team** - Modern database toolkit
- **PostgreSQL Community** - Database excellence

---

<div align="center">

### 🚀 Building the Future of Banking Infrastructure!

[⭐ Star This Repo](https://github.com/skygenesisenterprise/aether-bank) • [🐛 Report Issues](https://github.com/skygenesisenterprise/aether-bank/issues) • [💡 Start a Discussion](https://github.com/skygenesisenterprise/aether-bank/discussions)

---

**Made with ❤️ by [Sky Genesis Enterprise](https://skygenesisenterprise.com)**

_Enterprise-grade banking API with complete ledger-first architecture and multi-provider support_

</div>
