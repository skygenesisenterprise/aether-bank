"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle,
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
  TrendingUp,
  Calculator,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Crédits de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Crédits réels",
    color: "green",
    icon: Building,
  },
];

const concepts = [
  {
    title: "Suivi des crédits",
    description: "Visualisez l'état de vos crédits et échéances en temps réel.",
    icon: BarChart3,
  },
  {
    title: "Remboursements",
    description: "Historique complet des remboursements effectués.",
    icon: RefreshCw,
  },
  {
    title: "Simulations",
    description: "Calculez vos mensualités et intérêts avant de vous engager.",
    icon: Calculator,
  },
  {
    title: "Documents",
    description: "Accédez à vos contrats et tableaux d'amortissement.",
    icon: BookOpen,
  },
];

const creditTypes = [
  {
    type: "CONSUMER",
    name: "Crédit consommation",
    description: "Pour vos projets personnels",
    rate: "3.9% - 8.9%",
  },
  {
    type: "MORTGAGE",
    name: "Crédit immobilier",
    description: "Pour votre projet immobilier",
    rate: "2.5% - 4.5%",
  },
  {
    type: "BUSINESS",
    name: "Crédit professionnel",
    description: "Pour développer votre activité",
    rate: "4.5% - 7.5%",
  },
  {
    type: "AUTO",
    name: "Crédit auto",
    description: "Pour l'achat de votre véhicule",
    rate: "3.5% - 6.9%",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/users/me/credits",
    description: "Liste des crédits",
    parameters: ["status", "type", "limit"],
  },
  {
    method: "GET",
    path: "/users/me/credits/:id",
    description: "Détails d'un crédit",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/users/me/credits/:id/schedule",
    description: "Tableau d'amortissement",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/users/me/credits/:id/repayments",
    description: "Historique des remboursements",
    parameters: ["id", "from_date", "to_date"],
  },
  {
    method: "POST",
    path: "/users/me/credits/:id/early-repayment",
    description: "Remboursement anticipé",
    parameters: ["id", "amount"],
  },
  {
    method: "POST",
    path: "/users/me/credits/simulate",
    description: "Simuler un crédit",
    parameters: ["amount", "duration", "rate", "type"],
  },
];

const webhookEvents = [
  {
    event: "credit.payment_due",
    description: "Échéance à payer",
    payload: "credit_id, amount, due_date",
  },
  {
    event: "credit.payment_made",
    description: "Remboursement effectué",
    payload: "credit_id, amount, remaining_balance",
  },
  {
    event: "credit.completed",
    description: "Crédit remboursé",
    payload: "credit_id, total_paid",
  },
];

const codeExamples = {
  listCredits: {
    title: "Lister mes crédits",
    description: "Récupérez la liste de vos crédits en cours.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/credits \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "crd_xyz789",
      "type": "CONSUMER",
      "status": "active",
      "amount": 1500000,
      "currency": "EUR",
      "remaining_amount": 1250000,
      "interest_rate": 5.9,
      "monthly_payment": 28500,
      "next_payment_date": "2026-04-15",
      "remaining_payments": 48,
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "total": 1
}`,
  },
  creditDetails: {
    title: "Détails d'un crédit",
    description: "Obtenez les détails complets d'un crédit.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/credits/crd_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "id": "crd_xyz789",
  "type": "CONSUMER",
  "status": "active",
  "amount": 1500000,
  "currency": "EUR",
  "remaining_amount": 1250000,
  "interest_rate": 5.9,
  "monthly_payment": 28500,
  "total_interest": 368000,
  "total_cost": 1868000,
  "next_payment_date": "2026-04-15",
  "next_payment_amount": 28500,
  "remaining_payments": 48,
  "start_date": "2025-01-15",
  "end_date": "2029-01-15",
  "contract_url": "https://api.aetherbank.com/credits/crd_xyz789/contract"
}`,
  },
  schedule: {
    title: "Tableau d'amortissement",
    description: "Récupérez le tableau d'amortissement complet.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/credits/crd_xyz789/schedule \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "credit_id": "crd_xyz789",
  "schedule": [
    {
      "month": 1,
      "date": "2025-02-15",
      "payment": 28500,
      "principal": 21200,
      "interest": 7300,
      "remaining": 1478800
    },
    {
      "month": 2,
      "date": "2025-03-15",
      "payment": 28500,
      "principal": 21396,
      "interest": 7104,
      "remaining": 1457404
    }
  ],
  "total_payments": 60,
  "total_interest": 368000
}`,
  },
  simulate: {
    title: "Simuler un crédit",
    description: "Calculez les mensualités pour un crédit.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/credits/simulate \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000000,
    "duration": 60,
    "rate": 5.9,
    "type": "CONSUMER"
  }'

# Réponse:
{
  "amount": 2000000,
  "duration": 60,
  "rate": 5.9,
  "monthly_payment": 38600,
  "total_interest": 316000,
  "total_cost": 2316000,
  "total_insurance": 600000,
  "effective_rate": 6.45
}`,
  },
};

export default function UserCreditPage() {
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
          <BarChart3 className="w-4 h-4" />
          User Credits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Crédits</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API pour la gestion de vos crédits. Suivi des échéances, historique des remboursements et
          simulations.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/products/credits">
              <DollarSign className="w-4 h-4 mr-2" />
              Crédits
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
              <ChevronRight className="w-4 h-4" /> Types de crédits
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
        <h2 className="text-2xl font-bold">Types de crédits</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {creditTypes.map((type, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{type.name}</h3>
                  <span className="px-2 py-1 rounded bg-muted text-xs">{type.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                <span className="text-sm text-primary">TAEG: {type.rate}</span>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/credits \\
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
            <h2 className="text-xl font-semibold mb-2">Prêt à gérer vos crédits ?</h2>
            <p className="text-muted-foreground">
              Consultez vos échéances ou simulez un nouveau crédit.
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
              <Link href="/docs/products/credits">
                <DollarSign className="w-4 h-4 mr-2" />
                Crédits
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
