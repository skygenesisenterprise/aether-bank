"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Plus,
  Search,
  ArrowRight,
  Shield,
  Globe,
  CreditCard,
  FileText,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Zap,
  Clock,
  RefreshCw,
  Users,
  Settings,
  Link as LinkIcon,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Fournisseurs fictifs, logs détaillés",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Fournisseurs réels, monitoring actif",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Réseau bancaire",
    description: "Connectez-vous aux principaux réseaux bancaires européens (Visa, Mastercard).",
    icon: Globe,
  },
  {
    title: "Processeurs de paiement",
    description: "Intégrez plusieurs processeurs pour maximiser les taux d'acceptation.",
    icon: CreditCard,
  },
  {
    title: "Services KYC",
    description: "Vérification d'identité et conformité réglementaire PSD2.",
    icon: Shield,
  },
  {
    title: "Monitoring temps réel",
    description: "Surveillez les performances et la disponibilité de vos partenaires.",
    icon: Settings,
  },
];

const providerTypes = [
  {
    type: "CARDS",
    name: "Réseau de cartes",
    description: "Visa, Mastercard, CB - Émission et acquisition",
    icon: CreditCard,
    color: "blue",
  },
  {
    type: "PROCESSOR",
    name: "Processeur de paiement",
    description: "Worldline, Stripe, Adyen - Traitement des transactions",
    icon: RefreshCw,
    color: "purple",
  },
  {
    type: "KYC",
    name: "Vérification d'identité",
    description: "Sumsub, Jumio, Onfido - KYC et AML",
    icon: Users,
    color: "green",
  },
  {
    type: "BANK",
    name: "Banque partenaire",
    description: "Correspondants bancaires pour virements SEPA/SWIFT",
    icon: Building2,
    color: "orange",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/providers",
    description: "Liste des fournisseurs",
    parameters: ["type", "status", "limit", "offset"],
  },
  {
    method: "GET",
    path: "/providers/:id",
    description: "Détails d'un fournisseur",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/providers",
    description: "Ajouter un fournisseur",
    parameters: ["name", "type", "credentials", "webhook_url"],
  },
  {
    method: "PUT",
    path: "/providers/:id",
    description: "Modifier un fournisseur",
    parameters: ["id", "credentials", "status", "webhook_url"],
  },
  {
    method: "DELETE",
    path: "/providers/:id",
    description: "Supprimer un fournisseur",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/providers/:id/stats",
    description: "Statistiques d'un fournisseur",
    parameters: ["id", "from_date", "to_date"],
  },
  {
    method: "POST",
    path: "/providers/:id/test",
    description: "Tester la connexion",
    parameters: ["id"],
  },
];

const webhookEvents = [
  {
    event: "provider.connected",
    description: "Nouveau fournisseur connecté",
    payload: "provider_id, type, name, connected_at",
  },
  {
    event: "provider.disconnected",
    description: "Fournisseur déconnecté",
    payload: "provider_id, reason, disconnected_at",
  },
  {
    event: "provider.error",
    description: "Erreur détectée",
    payload: "provider_id, error_code, message",
  },
  {
    event: "provider.health_changed",
    description: "Changement de santé",
    payload: "provider_id, previous_status, new_status",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  listProviders: {
    title: "Lister les fournisseurs",
    description: "Récupérez tous les fournisseurs configurés.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/providers?type=CARDS&status=active" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "prv_visa",
      "name": "Visa Europe",
      "type": "CARDS",
      "status": "active",
      "health": "healthy",
      "transactions_count": 45230,
      "success_rate": 99.2,
      "avg_latency_ms": 45,
      "connected_at": "2024-01-15T10:00:00Z"
    },
    {
      "id": "prv_mc",
      "name": "Mastercard",
      "type": "CARDS",
      "status": "active",
      "health": "healthy",
      "transactions_count": 32100,
      "success_rate": 99.5,
      "avg_latency_ms": 38,
      "connected_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 4,
  "limit": 50,
  "offset": 0
}`,
  },
  addProvider: {
    title: "Ajouter un fournisseur",
    description: "Connectez un nouveau fournisseur à votre plateforme.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/providers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Adyen",
    "type": "PROCESSOR",
    "credentials": {
      "api_key": "AQE...",
      "merchant_account": "YourMerchantAccount"
    },
    "webhook_url": "https://yourapp.com/webhooks/adyen",
    "settings": {
      "timeout_ms": 30000,
      "retry_count": 3
    }
  }'

# Réponse:
{
  "id": "prv_adyen",
  "name": "Adyen",
  "type": "PROCESSOR",
  "status": "pending",
  "credentials_masked": {
    "api_key": "AQE***",
    "merchant_account": "YourMerchantAccount"
  },
  "webhook_url": "https://yourapp.com/webhooks/adyen",
  "created_at": "2026-03-31T10:00:00Z"
}`,
  },
  providerStats: {
    title: "Statistiques d'un fournisseur",
    description: "Obtenez les métriques de performance d'un fournisseur.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/providers/prv_visa/stats?from_date=2026-01-01&to_date=2026-03-31" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "provider_id": "prv_visa",
  "period": {
    "from": "2026-01-01",
    "to": "2026-03-31"
  },
  "transactions": {
    "total": 45230,
    "successful": 44868,
    "failed": 362,
    "success_rate": 99.2
  },
  "latency": {
    "avg_ms": 45,
    "p95_ms": 120,
    "p99_ms": 250
  },
  "volume": {
    "total": 1234567890,
    "currency": "EUR"
  },
  "errors": {
    "insufficient_funds": 45,
    "card_expired": 28,
    "network_error": 289
  }
}`,
  },
  testConnection: {
    title: "Tester la connexion",
    description: "Vérifiez que le fournisseur est accessible.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/providers/prv_adyen/test \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "provider_id": "prv_adyen",
  "test_type": "health_check",
  "status": "success",
  "latency_ms": 42,
  "response": {
    "resultCode": "Success",
    "merchantAccount": "YourMerchantAccount"
  },
  "tested_at": "2026-03-31T10:05:00Z"
}

# En cas d'erreur:
# {
#   "provider_id": "prv_adyen",
#   "status": "failed",
#   "error": {
#     "code": "authentication_failed",
#     "message": "Invalid API key"
#   },
#   "tested_at": "2026-03-31T10:05:00Z"
# }`,
  },
};

export default function PlatformProvidersPage() {
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
          <Building2 className="w-4 h-4" />
          Platform Providers
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Fournisseurs</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos partenaires bancaires et fournisseurs de services. Connectez-vous aux réseaux de
          cartes, processeurs et services KYC.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/cards">
              <CreditCard className="w-4 h-4 mr-2" />
              Cartes
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
              <ChevronRight className="w-4 h-4" /> Types de fournisseurs
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
        <p className="text-muted-foreground">
          L&apos;API Fournisseurs permet de connecter et gérer les partenaires qui interviennent
          dans le traitement de vos transactions bancaires.
        </p>
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

      {/* Types de fournisseurs */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de fournisseurs</h2>
        <p className="text-muted-foreground">
          Différents types de partenaires peuvent être connectés à votre plateforme.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {providerTypes.map((type, index) => {
            const Icon = type.icon;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-700",
              purple: "bg-purple-100 text-purple-700",
              green: "bg-green-100 text-green-700",
              orange: "bg-orange-100 text-orange-700",
            };
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{type.name}</h3>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs ${colorClasses[type.color as keyof typeof colorClasses]}`}
                      >
                        {type.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/providers \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Bonnes pratiques</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1 ml-4 list-disc">
              <li>Stocker les credentials en variables d&apos;environnement</li>
              <li>Utiliser HTTPS pour toutes les connexions</li>
              <li>Activer le monitoring des webhooks</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Gérez vos fournisseurs : ajout, modification, suppression et monitoring.
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
                          : endpoint.method === "PUT"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
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
        <p className="text-muted-foreground">
          Recevez des notifications pour les événements de vos fournisseurs.
        </p>
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

      {/* Rate Limits */}
      <section id="rate-limits" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Limites de débit</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-center p-4 font-semibold">Requêtes/min</th>
              </tr>
            </thead>
            <tbody>
              {rateLimits.map((plan, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4 font-medium">{plan.plan}</td>
                  <td className="text-center p-4">{plan.requests}</td>
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
                      <CheckCircle className="w-4 h-4 text-green-500" />
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
            <h2 className="text-xl font-semibold mb-2">Prêt à connecter vos partenaires ?</h2>
            <p className="text-muted-foreground">
              Ajoutez des fournisseurs à votre plateforme ou consultez la documentation des cartes.
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
              <Link href="/docs/platform/cards">
                <CreditCard className="w-4 h-4 mr-2" />
                Cartes
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
