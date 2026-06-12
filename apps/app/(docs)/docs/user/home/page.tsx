"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  Wallet,
  CreditCard,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Bell,
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
  BarChart3,
  PiggyBank,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Données fictives",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Données réelles",
    color: "green",
    icon: Home,
  },
];

const concepts = [
  {
    title: "Vue consolidée",
    description: "Visualisez le solde et l'activité de tous vos comptes en temps réel.",
    icon: BarChart3,
  },
  {
    title: "Actions rapides",
    description: "Accédez rapidement aux fonctionnalités les plus utilisées.",
    icon: Zap,
  },
  {
    title: "Notifications",
    description: "Restez informé des activités importantes sur vos comptes.",
    icon: Bell,
  },
  {
    title: "Multi-comptes",
    description: "Gérez comptes courants, épargne et crédits depuis une interface unique.",
    icon: Wallet,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/users/me",
    description: "Profil utilisateur connecté",
    parameters: [],
  },
  {
    method: "GET",
    path: "/users/me/accounts",
    description: "Liste des comptes",
    parameters: ["type", "status"],
  },
  {
    method: "GET",
    path: "/users/me/balance",
    description: "Solde consolidé",
    parameters: [],
  },
  {
    method: "GET",
    path: "/users/me/overview",
    description: "Vue d'ensemble (métriques, activité récente)",
    parameters: ["period"],
  },
  {
    method: "GET",
    path: "/users/me/notifications",
    description: "Notifications",
    parameters: ["unread_only", "limit"],
  },
];

const webhookEvents = [
  {
    event: "user.balance.updated",
    description: "Solde mis à jour",
    payload: "account_id, new_balance, change",
  },
  {
    event: "user.notification.created",
    description: "Nouvelle notification",
    payload: "notification_id, type, title",
  },
];

const codeExamples = {
  overview: {
    title: "Vue d'ensemble",
    description: "Récupérez les métriques et l'activité récente de l'utilisateur.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/overview?period=month" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "user": {
    "id": "usr_xyz789",
    "name": "Jean Dupont",
    "email": "jean.dupont@email.com"
  },
  "accounts": [
    {
      "id": "acc_current",
      "type": "current",
      "balance": 2485000,
      "currency": "EUR"
    },
    {
      "id": "acc_savings",
      "type": "savings",
      "balance": 5000000,
      "currency": "EUR"
    }
  ],
  "metrics": {
    "total_balance": 2485000,
    "total_balance_currency": "EUR",
    "income_this_month": 1842000,
    "expenses_this_month": 823000,
    "pending_transactions": 3,
    "pending_amount": 215000
  },
  "recent_activity": [
    {
      "id": "trf_abc123",
      "type": "transfer_received",
      "amount": 450000,
      "description": "Virement reçu",
      "date": "2026-03-31"
    }
  ]
}`,
  },
  balance: {
    title: "Solde consolidé",
    description: "Obtenez le solde total de tous vos comptes.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/balance \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "total_balance": 2485000,
  "available_balance": 2385000,
  "pending_balance": 100000,
  "currency": "EUR",
  "by_account": {
    "current": {
      "balance": 485000,
      "available": 485000,
      "currency": "EUR"
    },
    "savings": {
      "balance": 2000000,
      "available": 2000000,
      "currency": "EUR"
    }
  },
  "updated_at": "2026-03-31T10:00:00Z"
}`,
  },
  notifications: {
    title: "Notifications",
    description: "Récupérez les notifications de l'utilisateur.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/notifications?unread_only=true&limit=10" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "notif_xyz789",
      "type": "transfer_received",
      "title": "Virement reçu",
      "body": "Vous avez reçu 4 500,00 €",
      "read": false,
      "created_at": "2026-03-31T09:00:00Z"
    },
    {
      "id": "notif_abc123",
      "type": "payment_pending",
      "title": "Paiement en attente",
      "body": "Facture EDF en attente de validation",
      "read": false,
      "created_at": "2026-03-30T14:00:00Z"
    }
  ],
  "unread_count": 3,
  "total": 47
}`,
  },
};

export default function UserHomePage() {
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
          <Home className="w-4 h-4" />
          User Dashboard
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Espace Client</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API pour la gestion de l&apos;espace client. Solde consolidé, notifications et vue
          d&apos;ensemble de vos finances.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/user/transactions">
              <DollarSign className="w-4 h-4 mr-2" />
              Transactions
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
          L&apos;API utilise l&apos;authentification par clé API via Bearer token. Les endpoints
          utilisateur requièrent un token d&apos;accès utilisateur.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`# Exemple d'appel authentifié
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/overview \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Endpoints pour récupérer les informations de l&apos;espace client.
        </p>
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
                {endpoint.parameters.length > 0 && (
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
                )}
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
            <h2 className="text-xl font-semibold mb-2">Prêt à explorer l&apos;espace client ?</h2>
            <p className="text-muted-foreground">
              Découvrez les transactions, cartes et autres fonctionnalités.
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
              <Link href="/docs/user/transactions">
                <DollarSign className="w-4 h-4 mr-2" />
                Transactions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
