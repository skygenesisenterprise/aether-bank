"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Send,
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
  Globe,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Virements de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Virements réels",
    color: "green",
    icon: Building,
  },
];

const concepts = [
  {
    title: "Virements SEPA",
    description: "Effectuez des virements vers toute la zone SEPA (34 pays).",
    icon: Globe,
  },
  {
    title: "Instantané 24/7",
    description: "Virements instantanés disponibles 24h/24, 7j/7.",
    icon: Zap,
  },
  {
    title: "Suivi en temps réel",
    description: "Suivez le statut de vos virements en temps réel.",
    icon: RefreshCw,
  },
  {
    title: "Historique complet",
    description: "Accédez à l'historique de tous vos virements.",
    icon: Clock,
  },
];

const transferTypes = [
  {
    type: "SEPA",
    name: "Virement SEPA",
    description: "Virement bancaire européen standard",
    delay: "1-2 jours ouvrés",
  },
  {
    type: "INSTANT",
    name: "Virement instantané",
    description: "Virement immédiat 24/7",
    delay: "Instantané",
  },
  {
    type: "INTERNATIONAL",
    name: "Virement international",
    description: "Vers l'étranger (SWIFT)",
    delay: "2-5 jours ouvrés",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/users/me/transfers",
    description: "Liste des virements",
    parameters: ["status", "from_date", "to_date", "type", "limit", "offset"],
  },
  {
    method: "POST",
    path: "/users/me/transfers",
    description: "Créer un virement",
    parameters: ["account_id", "recipient_iban", "amount", "reference", "type"],
  },
  {
    method: "GET",
    path: "/users/me/transfers/:id",
    description: "Détails d'un virement",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/users/me/transfers/:id/cancel",
    description: "Annuler un virement",
    parameters: ["id"],
  },
];

const webhookEvents = [
  {
    event: "transfer.pending",
    description: "Virement en attente",
    payload: "transfer_id, amount, recipient",
  },
  {
    event: "transfer.completed",
    description: "Virement terminé",
    payload: "transfer_id, amount, recipient, completed_at",
  },
  {
    event: "transfer.failed",
    description: "Virement échoué",
    payload: "transfer_id, reason, error_code",
  },
  {
    event: "transfer.cancelled",
    description: "Virement annulé",
    payload: "transfer_id, cancelled_at",
  },
];

const codeExamples = {
  createTransfer: {
    title: "Créer un virement",
    description: "Effectuez un virement SEPA vers un bénéficiaire.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "recipient_iban": "FR7630004000987654321098765",
    "recipient_name": "Jean Dupont",
    "amount": 450000,
    "currency": "EUR",
    "reference": "Facture #4829",
    "type": "SEPA"
  }'

# Réponse:
{
  "id": "trf_xyz789",
  "type": "SEPA",
  "status": "pending",
  "amount": 450000,
  "currency": "EUR",
  "recipient": {
    "name": "Jean Dupont",
    "iban": "FR7630004000987654321098765"
  },
  "reference": "Facture #4829",
  "created_at": "2026-03-31T10:00:00Z",
  "estimated_arrival": "2026-04-01T00:00:00Z"
}`,
  },
  instantTransfer: {
    title: "Virement instantané",
    description: "Effectuez un virement instantané 24/7.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "recipient_iban": "FR7630004000987654321098765",
    "recipient_name": "Jean Dupont",
    "amount": 10000,
    "currency": "EUR",
    "reference": "Remboursement",
    "type": "INSTANT"
  }'

# Réponse:
{
  "id": "trf_instant123",
  "type": "INSTANT",
  "status": "completed",
  "amount": 10000,
  "currency": "EUR",
  "recipient": {
    "name": "Jean Dupont",
    "iban": "FR7630004000987654321098765"
  },
  "created_at": "2026-03-31T10:00:00Z",
  "completed_at": "2026-03-31T10:00:05Z"
}`,
  },
  listTransfers: {
    title: "Lister mes virements",
    description: "Récupérez l'historique de vos virements.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transfers?status=completed&limit=20" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "trf_xyz789",
      "type": "SEPA",
      "status": "completed",
      "amount": 450000,
      "currency": "EUR",
      "recipient": {
        "name": "Jean Dupont",
        "iban": "FR7630004000987654321098765"
      },
      "reference": "Facture #4829",
      "created_at": "2026-03-31T10:00:00Z",
      "completed_at": "2026-04-01T08:00:00Z"
    },
    {
      "id": "trf_abc123",
      "type": "INSTANT",
      "status": "completed",
      "amount": 125000,
      "currency": "EUR",
      "recipient": {
        "name": "Marie Martin",
        "iban": "FR7630004000112233445566778"
      },
      "reference": "Remboursement",
      "created_at": "2026-03-30T14:30:00Z",
      "completed_at": "2026-03-30T14:30:05Z"
    }
  ],
  "total": 47,
  "limit": 20,
  "offset": 0
}`,
  },
  transferDetails: {
    title: "Détails d'un virement",
    description: "Obtenez les détails complets d'un virement.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transfers/trf_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "id": "trf_xyz789",
  "type": "SEPA",
  "status": "completed",
  "amount": 450000,
  "currency": "EUR",
  "account_id": "acc_xyz789",
  "recipient": {
    "name": "Jean Dupont",
    "iban": "FR7630004000987654321098765",
    "bic": "BNORFRPP"
  },
  "reference": "Facture #4829",
  "fees": 0,
  "created_at": "2026-03-31T10:00:00Z",
  "completed_at": "2026-04-01T08:00:00Z",
  "tracking_id": "TRK123456"
}`,
  },
};

export default function UserTransfertsPage() {
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
          User Transferts
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Virements</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API pour effectuer et suivre vos virements. SEPA standard, instantanés et internationaux.
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
              <DollarSign className="w-4 h-4 mr-2" />
              Transferts
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
              <ChevronRight className="w-4 h-4" /> Types de virements
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
        <h2 className="text-2xl font-bold">Types de virements</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {transferTypes.map((type, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{type.name}</h3>
                  <span className="px-2 py-1 rounded bg-muted text-xs">{type.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Clock className="w-4 h-4" />
                  <span>{type.delay}</span>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/transfers \\
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
            <h2 className="text-xl font-semibold mb-2">Prêt à effectuer un virement ?</h2>
            <p className="text-muted-foreground">
              Créez un virement SEPA ou instantané en quelques clics.
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
                <DollarSign className="w-4 h-4 mr-2" />
                Transferts
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
