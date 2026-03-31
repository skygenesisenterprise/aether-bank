"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Database,
  Download,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Shield,
  Zap,
  Clock,
  FileText,
  RefreshCw,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Funds fictifs, logs détaillés, IBANs de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Fonds réels, KYC requis, support dédié",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Écritures comptables",
    description:
      "Chaque transaction génère des écritures en partie double : débit et crédit équivalents.",
    icon: FileText,
  },
  {
    title: "Plan comptable",
    description:
      "Classification normalisée des comptes (clients, fournisseurs, trésorerie, produits, charges).",
    icon: Database,
  },
  {
    title: "Grand livre",
    description: "Registre chronologique de toutes les écritures avec détails par compte.",
    icon: BookOpen,
  },
  {
    title: "Balance",
    description: "Synthèse des soldes de tous les comptes à une date donnée.",
    icon: DollarSign,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/ledger/entries",
    description: "Liste des écritures comptables",
    parameters: ["account_id", "from_date", "to_date", "category", "limit", "offset"],
  },
  {
    method: "GET",
    path: "/ledger/entries/:id",
    description: "Détails d'une écriture",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/ledger/accounts",
    description: "Plan comptable de la plateforme",
    parameters: ["type", "limit", "offset"],
  },
  {
    method: "GET",
    path: "/ledger/accounts/:code/entries",
    description: "Écritures d'un compte",
    parameters: ["from_date", "to_date", "limit"],
  },
  {
    method: "GET",
    path: "/ledger/balance",
    description: "Balance générale",
    parameters: ["date", "type"],
  },
  {
    method: "POST",
    path: "/ledger/export/fec",
    description: "Export FEC pour expert-comptable",
    parameters: ["from_date", "to_date", "format"],
  },
];

const webhookEvents = [
  {
    event: "ledger.entry.created",
    description: "Nouvelle écriture comptable créée",
    payload: "entry_id, account_code, amount, type, date",
  },
  {
    event: "ledger.entry.reconciled",
    description: "Écriture rapprochée automatiquement",
    payload: "entry_id, reconciliation_id, matched_transactions",
  },
  {
    event: "ledger.export.completed",
    description: "Export FEC généré",
    payload: "export_id, file_url, period",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min", concurrent: "10" },
  { plan: "Starter", requests: "1 000/min", concurrent: "50" },
  { plan: "Pro", requests: "5 000/min", concurrent: "200" },
  { plan: "Enterprise", requests: "Illimité", concurrent: "Personnalisé" },
];

const codeExamples = {
  listEntries: {
    title: "Lister les écritures",
    description: "Récupérez les écritures comptables avec filtres optionnels.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/ledger/entries?limit=50&offset=0" \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"

# Réponse:
{
  "data": [
    {
      "id": "ent_xyz789",
      "date": "2026-03-31",
      "piece": "FAC-4829",
      "account_code": "411000",
      "account_label": "Clients - Ventes de prestations",
      "libelle": "Client ABC - Facture n°4829",
      "debit": 0,
      "credit": 450000,
      "currency": "EUR",
      "status": "validated"
    },
    {
      "id": "ent_abc123",
      "date": "2026-03-31",
      "piece": "ACH-001",
      "account_code": "401000",
      "account_label": "Fournisseurs",
      "libelle": "Fournisseur XYZ - Achat fournitures",
      "debit": 8999,
      "credit": 0,
      "currency": "EUR",
      "status": "validated"
    }
  ],
  "total": 127,
  "limit": 50,
  "offset": 0,
  "has_more": true
}`,
  },
  accountEntries: {
    title: "Écritures d'un compte",
    description: "Filtrez les écritures par compte comptable.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/ledger/accounts/411000/entries?from_date=2026-01-01&to_date=2026-03-31" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "account": {
    "code": "411000",
    "label": "Clients - Ventes de prestations",
    "type": "client"
  },
  "entries": [
    {
      "id": "ent_xyz789",
      "date": "2026-03-31",
      "piece": "FAC-4829",
      "debit": 0,
      "credit": 450000,
      "solde": 450000
    }
  ],
  "totals": {
    "total_debit": 0,
    "total_credit": 450000,
    "solde": 450000
  }
}`,
  },
  balance: {
    title: "Balance générale",
    description: "Obtenez la balance de tous les comptes à une date donnée.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/ledger/balance?date=2026-03-31" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "date": "2026-03-31",
  "accounts": [
    {
      "code": "411000",
      "label": "Clients",
      "debit": 0,
      "credit": 450000,
      "solde": 450000
    },
    {
      "code": "401000",
      "label": "Fournisseurs",
      "debit": 8999,
      "credit": 0,
      "solde": -8999
    },
    {
      "code": "512000",
      "label": "Banque",
      "debit": 5000000,
      "credit": 450000,
      "solde": 4550000
    }
  ],
  "totals": {
    "total_debit": 5098999,
    "total_credit": 899999,
    "balance": 4199000
  }
}`,
  },
  exportFEC: {
    title: "Export FEC",
    description: "Générez un fichier FEC pour votre expert-comptable.",
    code: `curl -X POST "https://sandbox.bank.skygenesisenterprise.com/api/v1/ledger/export/fec" \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from_date": "2026-01-01",
    "to_date": "2026-03-31",
    "format": "fec"
  }'

# Réponse:
{
  "export_id": "exp_fec_2026q1",
  "status": "completed",
  "download_url": "https://api.aetherbank.com/exports/exp_fec_2026q1.zip",
  "file_size": 245678,
  "checksum": "sha256:abc123...",
  "expires_at": "2026-04-30T23:59:59Z"
}`,
  },
};

export default function PlatformLedgerPage() {
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
          <Database className="w-4 h-4" />
          Platform Ledger
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Grand <span className="text-primary">livre</span> comptable
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la gestion comptable. Écritures en partie double, plan comptable,
          balance et export FEC pour votre expert-comptable.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/transactions">
              <FileText className="w-4 h-4 mr-2" />
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
              <ChevronRight className="w-4 h-4" /> Concepts comptables
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
              href="#rate-limits"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Limites de débit
            </a>
            <a
              href="#exemples"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Exemples
            </a>
            <a
              href="#export"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Export FEC
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Concepts */}
      <section id="concepts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Concepts comptables</h2>
        <p className="text-muted-foreground">
          Le grand livre Aether Bank implémente la comptabilité en partie double conforme aux normes
          françaises. Chaque transaction génère automatiquement des écritures équilibrées.
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

        {/* Flow diagram */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Flux comptable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Transaction</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <FileText className="w-4 h-4 text-primary" />
                <span>Écriture créée</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Database className="w-4 h-4 text-primary" />
                <span>Grand livre</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Search className="w-4 h-4 text-primary" />
                <span>Rapprochement</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Download className="w-4 h-4 text-primary" />
                <span>Export FEC</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
          L'API utilise l'authentification par clé API via Bearer token. Incluez votre clé dans
          l'en-tête
          <code className="px-2 py-1 mx-1 rounded bg-muted text-sm">
            Authorization: Bearer sk_live_xxx
          </code>
          de chaque requête.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`# Exemple d'appel authentifié
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/ledger/entries \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Bonnes pratiques</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1 ml-4 list-disc">
              <li>Ne jamais exposer vos clés en frontend</li>
              <li>Stocker les clés dans des variables d'environnement</li>
              <li>Utiliser des clés différentes pour test et production</li>
              <li>Activer le IP whitelisting en production</li>
            </ul>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href="/docs/security/authentication">
            <Shield className="w-4 h-4 mr-2" />
            Guide d'authentification détaillé
          </Link>
        </Button>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Tous les endpoints du grand livre utilisent la même URL de base. Les montants sont en
          cents (EUR).
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
                        : "bg-blue-100 text-blue-700"
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Format de réponse d&apos;une écriture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">{`{
  "id": "ent_xyz789",
  "date": "2026-03-31",
  "piece": "FAC-4829",
  "account_code": "411000",
  "account_label": "Clients - Ventes de prestations",
  "libelle": "Client ABC - Facture n°4829",
  "debit": 0,
  "credit": 450000,
  "currency": "EUR",
  "status": "validated",
  "transaction_id": "trf_abc123",
  "created_at": "2026-03-31T14:30:00Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>
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
          Recevez des notifications en temps réel pour tous les événements liés au grand livre.
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
        <Button variant="outline" asChild>
          <Link href="/docs/platform/notifications">
            <RefreshCw className="w-4 h-4 mr-2" />
            Configuration des webhooks
          </Link>
        </Button>
      </section>

      {/* Rate Limits */}
      <section id="rate-limits" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Limites de débit</h2>
        </div>
        <p className="text-muted-foreground">
          Les limites varient selon votre plan d&apos;abonnement.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-center p-4 font-semibold">Requêtes/min</th>
                <th className="text-center p-4 font-semibold">Appels concurrents</th>
              </tr>
            </thead>
            <tbody>
              {rateLimits.map((plan, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4 font-medium">{plan.plan}</td>
                  <td className="text-center p-4">{plan.requests}</td>
                  <td className="text-center p-4">{plan.concurrent}</td>
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

      {/* Export FEC */}
      <section id="export" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Export FEC</h2>
        <p className="text-muted-foreground">
          Le format FEC (Fichier des Écritures Comptables) est requis pour la déclaration fiscale
          française. Notre API génère automatiquement un fichier conforme aux spécifications de
          l&apos;administration française.
        </p>
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Fichier FEC conforme</h3>
                  <p className="text-sm text-muted-foreground">
                    Format officiel français pour la déclaration fiscale
                  </p>
                </div>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Générer un export
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à intégrer le grand livre ?</h2>
            <p className="text-muted-foreground">
              Consultez la documentation complète des transactions ou commencez avec le guide de
              démarrage.
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
              <Link href="/docs/platform/transactions">
                <FileText className="w-4 h-4 mr-2" />
                Transactions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
