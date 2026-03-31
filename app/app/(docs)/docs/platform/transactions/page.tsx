"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Send,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Copy,
  ChevronRight,
  Zap,
  Webhook,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  FileText,
} from "lucide-react";

const transactionTypes = [
  {
    title: "Virement entrant",
    type: "CREDIT",
    api: "transaction.type = credit",
    description: "Fonds reçus sur le compte suite à un virement ou dépôt.",
    icon: ArrowDownLeft,
    color: "text-green-500 bg-green-100",
  },
  {
    title: "Virement sortant",
    type: "DEBIT",
    api: "transaction.type = debit",
    description: "Fonds envoyés vers un autre compte ou bénéficiaire.",
    icon: ArrowUpRight,
    color: "text-red-500 bg-red-100",
  },
  {
    title: "Paiement carte",
    type: "CARD",
    api: "transaction.type = card",
    description: "Paiement effectué avec une carte bancaire physique ou virtuelle.",
    icon: CreditCard,
    color: "text-blue-500 bg-blue-100",
  },
  {
    title: "Prélèvement SEPA",
    type: "DIRECT_DEBIT",
    api: "transaction.type = direct_debit",
    description: "Débit automatique autorisé via mandat SEPA.",
    icon: RefreshCw,
    color: "text-orange-500 bg-orange-100",
  },
  {
    title: "Frais",
    type: "FEE",
    api: "transaction.type = fee",
    description: "Frais de gestion, tenue de compte ou transaction internationale.",
    icon: FileText,
    color: "text-gray-500 bg-gray-100",
  },
  {
    title: "Reversement",
    type: "REFUND",
    api: "transaction.type = refund",
    description: "Remboursement suite à une contestation ou annulation.",
    icon: RefreshCw,
    color: "text-purple-500 bg-purple-100",
  },
];

const transactionStatuses = [
  { status: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { status: "processing", label: "En cours", color: "bg-blue-100 text-blue-700" },
  { status: "completed", label: "Complété", color: "bg-green-100 text-green-700" },
  { status: "failed", label: "Échoué", color: "bg-red-100 text-red-700" },
  { status: "cancelled", label: "Annulé", color: "bg-gray-100 text-gray-700" },
  { status: "reversed", label: "Inversé", color: "bg-purple-100 text-purple-700" },
];

const concepts = [
  {
    title: "Double entrée",
    description:
      "Chaque transaction affecte deux comptes : émetteur et récepteur. Le grand livre reste toujours équilibré.",
    icon: ArrowRight,
  },
  {
    title: "Montants signés",
    description:
      "Les montants positifs indiquent un crédit (entrant), les négatifs un débit (sortant).",
    icon: Send,
  },
  {
    title: "Reconciliation",
    description: "Marquez les transactions comme rapprochées pour votre comptabilité.",
    icon: CheckCircle,
  },
  {
    title: "Recherche full-text",
    description: "Recherchez par description, référence, IBAN ou identifiant de transaction.",
    icon: Search,
  },
];

const codeExamples = {
  listTransactions: {
    title: "Lister les transactions",
    description: "Récupérez l'historique des transactions d'un compte avec filtres.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/transactions?account_id=acc_xyz789&status=completed&limit=50&offset=0" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "txn_abc123",
      "account_id": "acc_xyz789",
      "type": "credit",
      "status": "completed",
      "amount": 450000,
      "currency": "EUR",
      "description": "Virement reçu - Facture #4829",
      "reference": "FACT-2024-4829",
      "counterparty": {
        "name": "Société ABC",
        "iban": "FR7630006000011234567890189"
      },
      "created_at": "2024-01-15T14:32:00Z",
      "completed_at": "2024-01-15T14:32:05Z"
    },
    {
      "id": "txn_def456",
      "account_id": "acc_xyz789",
      "type": "card",
      "status": "completed",
      "amount": -8999,
      "currency": "EUR",
      "description": "Paiement carte - Amazon",
      "merchant": {
        "name": "Amazon EU",
        "category": "ecommerce"
      },
      "created_at": "2024-01-15T09:15:00Z"
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0,
  "has_more": true
}`,
  },
  getTransaction: {
    title: "Détails d'une transaction",
    description: "Obtenez les détails complets d'une transaction.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/transactions/txn_abc123 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "txn_abc123",
  "account_id": "acc_xyz789",
  "type": "credit",
  "status": "completed",
  "amount": 450000,
  "currency": "EUR",
  "balance_after": 5234500,
  "description": "Virement reçu - Facture #4829",
  "reference": "FACT-2024-4829",
  "counterparty": {
    "name": "Société ABC",
    "iban": "FR7630006000011234567890189",
    "bic": "BNPAFRPP"
  },
  "metadata": {
    "invoice_number": "4829",
    "customer_id": "CUST-001"
  },
  "created_at": "2024-01-15T14:32:00Z",
  "completed_at": "2024-01-15T14:32:05Z",
  "reconciled": false
}`,
  },
  searchTransactions: {
    title: "Rechercher des transactions",
    description: "Recherche full-text sur les descriptions et références.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/transactions/search?q=facture&account_id=acc_xyz789" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "txn_abc123",
      "description": "Virement reçu - Facture #4829",
      "reference": "FACT-2024-4829",
      "amount": 450000,
      "status": "completed"
    }
  ],
  "total": 1,
  "query": "facture"
}`,
  },
  exportTransactions: {
    title: "Exporter les transactions",
    description: "Générez un export CSV ou JSON pour la comptabilité.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/transactions/export?account_id=acc_xyz789&format=csv&from=2024-01-01&to=2024-01-31" \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -o transactions.csv`,
    response: `# Fichier CSV généré
# Account: acc_xyz789 | Période: 2024-01-01 au 2024-01-31
id,date,description,amount,currency,status
txn_abc123,2024-01-15T14:32:00Z,"Virement reçu - Facture #4829",450.00,EUR,completed
txn_def456,2024-01-15T09:15:00Z,"Paiement carte - Amazon",-89.99,EUR,completed`,
  },
};

const webhookEvents = [
  { event: "transaction.created", description: "Transaction créée" },
  { event: "transaction.pending", description: "Transaction en attente" },
  { event: "transaction.completed", description: "Transaction complétée" },
  { event: "transaction.failed", description: "Transaction échouée" },
  { event: "transaction.cancelled", description: "Transaction annulée" },
  { event: "transaction.reversed", description: "Transaction inversée" },
];

const mockTransactions = [
  {
    id: "txn_abc123",
    date: "2026-03-31 14:32",
    description: "Virement reçu - Facture #4829",
    amount: 4500.0,
    type: "CREDIT",
    status: "completed",
  },
  {
    id: "txn_def456",
    date: "2026-03-31 09:15",
    description: "Paiement carte - Amazon",
    amount: -89.99,
    type: "CARD",
    status: "completed",
  },
  {
    id: "txn_ghi789",
    date: "2026-03-30 16:45",
    description: "Virement émis - Salaires Mars",
    amount: -12500.0,
    type: "DEBIT",
    status: "completed",
  },
  {
    id: "txn_jkl012",
    date: "2026-03-30 11:20",
    description: "Prélèvement EDF",
    amount: -145.0,
    type: "DIRECT_DEBIT",
    status: "pending",
  },
  {
    id: "txn_mno345",
    date: "2026-03-29 08:00",
    description: "Virement reçu - Client ABC",
    amount: 2500.0,
    type: "CREDIT",
    status: "completed",
  },
];

export default function PlatformTransactionsPage() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (code: string, exampleId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedExample(exampleId);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Send className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Transactions <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour suivre, rechercher et exporter les transactions. Historique complet,
          filtres avancés et webhooks temps réel.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/products/transferts">
              Transferts <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Table des matières */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Table des matières</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <a
              href="#introduction"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Introduction
            </a>
            <a
              href="#types"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Types de transactions
            </a>
            <a
              href="#concepts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Concepts clés
            </a>
            <a
              href="#statuts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Statuts
            </a>
            <a
              href="#endpoints"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Endpoints API
            </a>
            <a
              href="#exemples"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Exemples de code
            </a>
            <a
              href="#dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Dashboard
            </a>
            <a
              href="#webhooks"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Webhooks
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Transactions permet de consulter, rechercher et exporter l'historique complet des
          opérations bancaires. Chaque transaction est associée à un compte et dispose d'un
          identifiant unique, d'un type, d'un montant signé et d'un statut. Les transactions sont
          enregistrées en double entrée dans le grand livre pour garantir l'intégrité comptable.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Base URL Sandbox</h3>
            <code className="text-sm text-primary break-all">
              sandbox.bank.skygenesisenterprise.com/api/v1
            </code>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Base URL Production</h3>
            <code className="text-sm text-primary break-all">
              bank.skygenesisenterprise.com/api/v1
            </code>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Format</h3>
            <code className="text-sm text-primary">JSON / REST / CSV</code>
          </div>
        </div>
      </section>

      {/* Types de transactions */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de transactions</h2>
        <p className="text-muted-foreground">
          Chaque transaction possède un type qui définit sa nature et son impact sur le solde.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactionTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.title}</h3>
                      <code className="text-xs text-muted-foreground">{type.type}</code>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Concepts */}
      <section id="concepts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Concepts clés</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{concept.title}</h3>
                  <p className="text-sm text-muted-foreground">{concept.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statuts */}
      <section id="statuts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Statuts des transactions</h2>
        <div className="flex flex-wrap gap-3">
          {transactionStatuses.map((s) => (
            <span
              key={s.status}
              className={`px-4 py-2 rounded-full text-sm font-medium ${s.color}`}
            >
              {s.label} ({s.status})
            </span>
          ))}
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints API</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/transactions</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Lister les transactions
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">account_id</code> - ID du compte
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - pending |
                    completed | failed
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - credit | debit |
                    card | fee
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">from/to</code> - Filtrer par
                    date
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">min_amount/max_amount</code> -
                    Par montant
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">limit/offset</code> - Pagination
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/transactions/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Détails d'une transaction
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/transactions/search</code>
                <span className="text-xs text-muted-foreground ml-auto">Recherche full-text</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">q</code> - Requête de recherche
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">account_id</code> - Limiter au
                    compte
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/transactions/export</code>
                <span className="text-xs text-muted-foreground ml-auto">Exporter (CSV/JSON)</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">format</code> - csv | json | pdf
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">from/to</code> - Période
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Exemples */}
      <section id="exemples" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Exemples de code</h2>
        <div className="space-y-8">
          {Object.entries(codeExamples).map(([key, example]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {Object.keys(codeExamples).indexOf(key) + 1}
                  </span>
                  {example.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">{example.code}</pre>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(example.code, key)}
                  >
                    {copiedExample === key ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">
                    {example.response}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Dashboard Administrateur</h2>
        <p className="text-muted-foreground">
          Gérez visuellement vos transactions depuis le dashboard. Recherchez, filtrez et exportez.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Historique des transactions</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{tx.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{tx.description}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        tx.type === "CREDIT"
                          ? "bg-green-100 text-green-700"
                          : tx.type === "DEBIT"
                            ? "bg-red-100 text-red-700"
                            : tx.type === "CARD"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {tx.type === "CREDIT"
                        ? "Entrant"
                        : tx.type === "DEBIT"
                          ? "Sortant"
                          : tx.type === "CARD"
                            ? "Carte"
                            : "Prélèvement"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    <span className={tx.amount > 0 ? "text-green-600" : ""}>
                      {tx.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        tx.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tx.status === "completed" ? "Complété" : "En attente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Webhooks */}
      <section id="webhooks" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Webhook className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Webhooks</h2>
        </div>
        <p className="text-muted-foreground">
          Configurez des webhooks pour être notifié en temps réel des nouvelles transactions.
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Événements disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {webhookEvents.map((event) => (
                <div
                  key={event.event}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <code className="text-sm font-mono">{event.event}</code>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à intégrer ?</h2>
            <p className="text-muted-foreground">
              Testez l'API transactions dans le sandbox ou consultez la documentation des
              transferts.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/quick-start">
                <Zap className="w-4 h-4 mr-2" />
                Démarrage rapide
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/products/transferts">
                Transferts <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
