"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PiggyBank,
  ArrowRight,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle as CheckCircleIcon,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Zap,
  RefreshCw,
  DollarSign,
  Building,
  Calculator,
  TrendingDown,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Épargne de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Épargne réelle",
    color: "green",
    icon: Building,
  },
];

const concepts = [
  {
    title: "Livrets réglementés",
    description: "Livret A, LDDS, LEP avec garanties撒政府.",
    icon: PiggyBank,
  },
  {
    title: "Taux attractifs",
    description: "Compte à terme avec des taux compétitifs.",
    icon: TrendingUp,
  },
  {
    title: "Versements flexibles",
    description: "Effectuez des versements et retraits à tout moment.",
    icon: RefreshCw,
  },
  {
    title: "Intérêts composés",
    description: "Vos intérêts génèrent eux-mêmes des intérêts.",
    icon: Calculator,
  },
];

const savingsTypes = [
  {
    type: "LIVRET_A",
    name: "Livret A",
    description: "Livre d'épargne réglementé",
    rate: "3.0%",
    limit: "22 950 €",
  },
  {
    type: "LDDS",
    name: "LDDS",
    description: "Livret de développement durable",
    rate: "3.0%",
    limit: "12 000 €",
  },
  {
    type: "TERM",
    name: "Compte à terme",
    description: "Épargne à taux boosté",
    rate: "4.5%",
    limit: "Illimité",
  },
  {
    type: "PEL",
    name: "PEL",
    description: "Plan d'épargne logement",
    rate: "2.5%",
    limit: "61 200 €",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/users/me/savings",
    description: "Liste des livrets",
    parameters: ["status", "type", "limit"],
  },
  {
    method: "GET",
    path: "/users/me/savings/:id",
    description: "Détails d'un livret",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/users/me/savings",
    description: "Ouvrir un livret",
    parameters: ["type", "name", "initial_deposit"],
  },
  {
    method: "POST",
    path: "/users/me/savings/:id/deposit",
    description: "Effectuer un versement",
    parameters: ["id", "amount"],
  },
  {
    method: "POST",
    path: "/users/me/savings/:id/withdraw",
    description: "Effectuer un retrait",
    parameters: ["id", "amount"],
  },
  {
    method: "GET",
    path: "/users/me/savings/:id/interest",
    description: "Historique des intérêts",
    parameters: ["id", "from_date", "to_date"],
  },
];

const webhookEvents = [
  {
    event: "savings.deposit",
    description: "Versement effectué",
    payload: "savings_id, amount, new_balance",
  },
  {
    event: "savings.withdraw",
    description: "Retrait effectué",
    payload: "savings_id, amount, new_balance",
  },
  {
    event: "savings.interest_paid",
    description: "Intérêts versés",
    payload: "savings_id, amount, interest_rate",
  },
];

const codeExamples = {
  listSavings: {
    title: "Lister mes livrets",
    description: "Récupérez la liste de vos livrets d'épargne.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/savings \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "sav_xyz789",
      "type": "LIVRET_A",
      "name": "Livret A principal",
      "balance": 1500000,
      "available_balance": 1500000,
      "currency": "EUR",
      "interest_rate": 3.0,
      "total_interest": 45000,
      "status": "active",
      "created_at": "2024-01-15T10:00:00Z"
    },
    {
      "id": "sav_abc123",
      "type": "TERM",
      "name": "Compte à terme 12 mois",
      "balance": 900000,
      "available_balance": 0,
      "currency": "EUR",
      "interest_rate": 4.5,
      "total_interest": 40500,
      "maturity_date": "2026-12-31",
      "status": "active",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "total_balance": 2400000,
  "total_interest": 85500
}`,
  },
  savingsDetails: {
    title: "Détails d'un livret",
    description: "Obtenez les détails complets d'un livret.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/savings/sav_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "id": "sav_xyz789",
  "type": "LIVRET_A",
  "name": "Livret A principal",
  "balance": 1500000,
  "available_balance": 1500000,
  "currency": "EUR",
  "interest_rate": 3.0,
  "total_interest": 45000,
  "year_interest": 45000,
  "status": "active",
  "limit": 2295000,
  "limit_remaining": 795000,
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  deposit: {
    title: "Effectuer un versement",
    description: "Versez des fonds sur votre livret.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/savings/sav_xyz789/deposit \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 50000
  }'

# Réponse:
{
  "id": "sav_xyz789",
  "previous_balance": 1500000,
  "amount": 50000,
  "new_balance": 1550000,
  "transaction_id": "trf_deposit_123",
  "deposited_at": "2026-03-31T10:00:00Z"
}`,
  },
  withdraw: {
    title: "Effectuer un retrait",
    description: "Retirez des fonds de votre livret.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/savings/sav_xyz789/withdraw \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100000
  }'

# Réponse:
{
  "id": "sav_xyz789",
  "previous_balance": 1550000,
  "amount": 100000,
  "new_balance": 1450000,
  "transaction_id": "trf_withdraw_456",
  "withdrawn_at": "2026-03-31T10:05:00Z"
}`,
  },
};

export default function UserSavingsPage() {
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
          <PiggyBank className="w-4 h-4" />
          User Savings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Épargne</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API pour la gestion de votre épargne. Livrets réglementés, comptes à terme et suivi des
          intérêts.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/products/savings">
              <DollarSign className="w-4 h-4 mr-2" />
              Épargne
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
              <ChevronRight className="w-4 h-4" /> Types d'épargne
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
        <h2 className="text-2xl font-bold">Types d&apos;épargne</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {savingsTypes.map((type, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{type.name}</h3>
                  <span className="px-2 py-1 rounded bg-muted text-xs">{type.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-semibold">{type.rate} TAEG</span>
                  <span className="text-xs text-muted-foreground">Plafond: {type.limit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/savings \\
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
            <h2 className="text-xl font-semibold mb-2">Prêt à gérer votre épargne ?</h2>
            <p className="text-muted-foreground">
              Ouvrez un livret ou consultez vos livrets existants.
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
              <Link href="/docs/products/savings">
                <DollarSign className="w-4 h-4 mr-2" />
                Épargne
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
