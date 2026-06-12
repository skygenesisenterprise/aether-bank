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
  Download,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle as CheckCircleIcon,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Zap,
  Clock,
  RefreshCw,
  DollarSign,
  Building,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Transactions de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Transactions réelles",
    color: "green",
    icon: Building,
  },
];

const concepts = [
  {
    title: "Historique complet",
    description: "Toutes vos transactions avec détails complets et pièces jointes.",
    icon: Clock,
  },
  {
    title: "Filtres avancés",
    description: "Filtrez par type, date, montant ou catégorie.",
    icon: Filter,
  },
  {
    title: "Export flexible",
    description: "Exportez en PDF, CSV ou OFX pour votre comptabilité.",
    icon: Download,
  },
  {
    title: "Catégorisation",
    description: "Transactions automatiquement catégorisées.",
    icon: TrendingUp,
  },
];

const transactionTypes = [
  { type: "transfer_received", name: "Virement reçu", icon: TrendingUp },
  { type: "transfer_sent", name: "Virement émis", icon: Send },
  { type: "card_payment", name: "Paiement carte", icon: DollarSign },
  { type: "direct_debit", name: "Prélèvement", icon: RefreshCw },
];

const endpoints = [
  {
    method: "GET",
    path: "/users/me/transactions",
    description: "Liste des transactions",
    parameters: ["account_id", "from_date", "to_date", "type", "category", "limit", "offset"],
  },
  {
    method: "GET",
    path: "/users/me/transactions/:id",
    description: "Détails d'une transaction",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/users/me/transactions/:id/receipt",
    description: "Télécharger le reçu",
    parameters: ["id", "format"],
  },
  {
    method: "GET",
    path: "/users/me/transactions/export",
    description: "Exporter les transactions",
    parameters: ["from_date", "to_date", "account_id", "format"],
  },
];

const webhookEvents = [
  {
    event: "transaction.created",
    description: "Nouvelle transaction",
    payload: "transaction_id, type, amount, account_id",
  },
  {
    event: "transaction.pending",
    description: "Transaction en attente",
    payload: "transaction_id, amount, merchant",
  },
  {
    event: "transaction.completed",
    description: "Transaction complétée",
    payload: "transaction_id, final_amount",
  },
  {
    event: "transaction.failed",
    description: "Transaction échouée",
    payload: "transaction_id, reason, error_code",
  },
];

const codeExamples = {
  listTransactions: {
    title: "Lister les transactions",
    description: "Récupérez l'historique de vos transactions avec filtres.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transactions?from_date=2026-03-01&to_date=2026-03-31&limit=50" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "trf_xyz789",
      "type": "transfer_received",
      "status": "completed",
      "amount": 450000,
      "currency": "EUR",
      "description": "Virement reçu - Facture #4829",
      "account_id": "acc_xyz789",
      "counterparty": {
        "name": "Client ABC",
        "iban": "FR7630004000987654321098765"
      },
      "category": "income",
      "date": "2026-03-31",
      "created_at": "2026-03-31T10:00:00Z"
    },
    {
      "id": "trf_abc123",
      "type": "card_payment",
      "status": "completed",
      "amount": -8999,
      "currency": "EUR",
      "description": "Paiement carte - Amazon",
      "account_id": "acc_xyz789",
      "merchant": {
        "name": "Amazon",
        "category": "ecommerce"
      },
      "category": "shopping",
      "date": "2026-03-31",
      "created_at": "2026-03-31T09:30:00Z"
    }
  ],
  "total": 127,
  "limit": 50,
  "offset": 0,
  "has_more": true
}`,
  },
  transactionDetails: {
    title: "Détails d'une transaction",
    description: "Obtenez les détails complets d'une transaction.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transactions/trf_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "id": "trf_xyz789",
  "type": "transfer_received",
  "status": "completed",
  "amount": 450000,
  "currency": "EUR",
  "description": "Virement reçu - Facture #4829",
  "account_id": "acc_xyz789",
  "counterparty": {
    "name": "Client ABC",
    "iban": "FR7630004000987654321098765",
    "bic": "BNORFRPP"
  },
  "reference": "FAC-4829",
  "category": "income",
  "labels": ["facture", "client"],
  "date": "2026-03-31",
  "value_date": "2026-03-31",
  "created_at": "2026-03-31T10:00:00Z",
  "receipt_url": "https://api.aetherbank.com/transactions/trf_xyz789/receipt"
}`,
  },
  exportTransactions: {
    title: "Exporter les transactions",
    description: "Téléchargez vos transactions en PDF, CSV ou OFX.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transactions/export?from_date=2026-01-01&to_date=2026-03-31&format=csv" \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -o transactions.csv

# Formats disponibles: csv, pdf, ofx, json

# Réponse: File download`,
  },
};

export default function UserTransactionsPage() {
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
          User Transactions
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Transactions</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API pour l&apos;historique de vos transactions. Filtrez, exportez et obtenez les détails
          complets de chaque opération.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/user/account">
              <Building className="w-4 h-4 mr-2" />
              Comptes
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
              href="#concepts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Concepts
            </a>
            <a
              href="#types"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Types
            </a>
            <a
              href="#base-urls"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> URLs de base
            </a>
            <a
              href="#auth"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Authentification
            </a>
            <a
              href="#endpoints"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Endpoints
            </a>
            <a
              href="#webhooks"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Webhooks
            </a>
            <a
              href="#exemples"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Exemples
            </a>
          </div>
        </CardContent>
      </Card>

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

      {/* Types */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de transactions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {transactionTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.name}</h3>
                      <code className="text-xs text-muted-foreground">{type.type}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Base URLs */}
      <section id="base-urls" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">URLs de base</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {baseUrls.map((env, index) => {
            const Icon = env.icon;
            const colorClasses = {
              blue: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50",
              green: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50",
            };
            const textClasses = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
            };
            return (
              <Card key={index} className={colorClasses[env.color as keyof typeof colorClasses]}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 ${textClasses[env.color as keyof typeof textClasses]}`}
                    />
                    {env.environment}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-sm break-all font-mono">{env.url}</code>
                  <p className="text-xs mt-2 opacity-70">{env.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Authentification */}
      <section id="auth" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Authentification</h2>
        </div>
        <p className="text-muted-foreground">
          L&apos;API utilise l&apos;authentification par clé API via Bearer token.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`# Exemple d'appel authentifié
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transactions \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <div className="space-y-3">
          {endpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded font-bold text-xs ${
                      endpoint.method === "GET"
                        ? "bg-green-100 text-green-700"
                        : endpoint.method === "POST"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-sm">{endpoint.path}</code>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                <div className="flex flex-wrap gap-1">
                  {endpoint.parameters.map((param, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground"
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Événement</th>
                <th className="text-left p-4 font-semibold">Description</th>
                <th className="text-left p-4 font-semibold">Payload</th>
              </tr>
            </thead>
            <tbody>
              {webhookEvents.map((event, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4">
                    <code className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                      {event.event}
                    </code>
                  </td>
                  <td className="p-4 text-sm">{event.description}</td>
                  <td className="p-4 text-xs text-muted-foreground">{event.payload}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Exemples */}
      <section id="exemples" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Exemples d&apos;utilisation</h2>
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
              <CardContent>
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
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à consulter vos transactions ?</h2>
            <p className="text-muted-foreground">
              Explorez l&apos;historique complet ou exportez vos relevés.
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
              <Link href="/docs/user/account">
                <Building className="w-4 h-4 mr-2" />
                Comptes
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
