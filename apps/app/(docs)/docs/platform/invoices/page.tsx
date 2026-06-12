"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Send,
  Clock,
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
  Download,
  Edit,
  Mail,
  DollarSign,
  RefreshCw,
  CreditCard,
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
    title: "Factures clients",
    description: "Créez des factures avec lignes détaillées, TVA et mentions légales françaises.",
    icon: FileText,
  },
  {
    title: "Automatisation",
    description: "Relances automatiques par email et rappels d'échéance.",
    icon: RefreshCw,
  },
  {
    title: "Intégration comptable",
    description: "Export FEC et synchronisation avec le grand livre.",
    icon: BookOpen,
  },
  {
    title: "Paiements intégrés",
    description: "Acceptez les règlements par carte, virement ou prélèvements.",
    icon: CreditCard,
  },
];

const invoiceStatuses = [
  {
    status: "draft",
    title: "Brouillon",
    color: "bg-gray-100 text-gray-700",
    description: "Facture en cours de création",
  },
  {
    status: "sent",
    title: "Envoyée",
    color: "bg-blue-100 text-blue-700",
    description: "Facture envoyée au client",
  },
  {
    status: "paid",
    title: "Payée",
    color: "bg-green-100 text-green-700",
    description: "Paiement reçu",
  },
  {
    status: "overdue",
    title: "En retard",
    color: "bg-red-100 text-red-700",
    description: "Échéance dépassée",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/invoices",
    description: "Liste des factures",
    parameters: ["status", "client_id", "from_date", "to_date", "limit", "offset"],
  },
  {
    method: "POST",
    path: "/invoices",
    description: "Créer une facture",
    parameters: ["client_id", "lines", "due_date", "payment_terms"],
  },
  {
    method: "GET",
    path: "/invoices/:id",
    description: "Détails d'une facture",
    parameters: ["id"],
  },
  {
    method: "PUT",
    path: "/invoices/:id",
    description: "Modifier une facture",
    parameters: ["id", "lines", "due_date"],
  },
  {
    method: "POST",
    path: "/invoices/:id/send",
    description: "Envoyer la facture",
    parameters: ["id", "email", "cc"],
  },
  {
    method: "POST",
    path: "/invoices/:id/remind",
    description: "Envoyer une relance",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/invoices/:id/pdf",
    description: "Télécharger le PDF",
    parameters: ["id"],
  },
];

const webhookEvents = [
  {
    event: "invoice.created",
    description: "Nouvelle facture créée",
    payload: "invoice_id, client_id, amount, status",
  },
  {
    event: "invoice.sent",
    description: "Facture envoyée au client",
    payload: "invoice_id, email, sent_at",
  },
  {
    event: "invoice.paid",
    description: "Paiement reçu",
    payload: "invoice_id, payment_id, amount, method",
  },
  {
    event: "invoice.overdue",
    description: "Facture arrivée à échéance",
    payload: "invoice_id, due_date, days_overdue",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  createInvoice: {
    title: "Créer une facture",
    description: "Créez une facture avec lignes de prestations et TVA.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/invoices \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "cli_xyz789",
    "due_date": "2026-04-15",
    "payment_terms": "net_30",
    "lines": [
      {
        "description": "Développement web - Phase 1",
        "quantity": 10,
        "unit_price": 15000,
        "vat_rate": 20
      },
      {
        "description": "Hébergement annuel",
        "quantity": 1,
        "unit_price": 36000,
        "vat_rate": 20
      }
    ],
    "notes": "Merci pour votre confiance."
  }'

# Réponse:
{
  "id": "fac_abc123",
  "number": "FAC-4832",
  "status": "draft",
  "client": {
    "id": "cli_xyz789",
    "name": "Client ABC",
    "email": "comptabilite@clientabc.fr"
  },
  "lines": [
    {
      "description": "Développement web - Phase 1",
      "quantity": 10,
      "unit_price": 15000,
      "vat_rate": 20,
      "subtotal": 150000,
      "vat_amount": 30000,
      "total": 180000
    }
  ],
  "subtotal": 186000,
  "vat_total": 37200,
  "total": 223200,
  "currency": "EUR",
  "due_date": "2026-04-15",
  "created_at": "2026-03-31T10:00:00Z"
}`,
  },
  listInvoices: {
    title: "Lister les factures",
    description: "Récupérez les factures avec filtres et pagination.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/invoices?status=pending&limit=50&offset=0" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "fac_abc123",
      "number": "FAC-4832",
      "status": "draft",
      "client": {
        "id": "cli_xyz789",
        "name": "Client ABC"
      },
      "total": 223200,
      "currency": "EUR",
      "due_date": "2026-04-15",
      "created_at": "2026-03-31T10:00:00Z"
    },
    {
      "id": "fac_def456",
      "number": "FAC-4831",
      "status": "sent",
      "client": {
        "id": "cli_aaa111",
        "name": "Entreprise DEF"
      },
      "total": 89000,
      "currency": "EUR",
      "due_date": "2026-04-13",
      "created_at": "2026-03-29T14:30:00Z"
    }
  ],
  "total": 47,
  "limit": 50,
  "offset": 0,
  "has_more": false
}`,
  },
  sendInvoice: {
    title: "Envoyer une facture",
    description: "Envoyez la facture par email au client.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/invoices/fac_abc123/send \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "comptabilite@clientabc.fr",
    "cc": ["direction@clientabc.fr"],
    "subject": "Facture FAC-4832 - Client ABC",
    "message": "Veuillez trouver ci-joint notre facture pour les prestations realizadas."
  }'

# Réponse:
{
  "id": "fac_abc123",
  "status": "sent",
  "sent_at": "2026-03-31T10:05:00Z",
  "sent_to": "comptabilite@clientabc.fr",
  "tracking_id": "trk_xyz789"
}`,
  },
  downloadPdf: {
    title: "Télécharger le PDF",
    description: "Récupérez le PDF de la facture prêt à imprimer.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/invoices/fac_abc123/pdf \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -o facture.pdf

# Réponse: Binary PDF file
# Content-Type: application/pdf
# Content-Disposition: attachment; filename="FAC-4832.pdf"`,
  },
};

export default function PlatformInvoicesPage() {
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
          <FileText className="w-4 h-4" />
          Platform Invoices
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Facturation</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Créez, envoyez et suivez vos factures client. API complète avec gestion des lignes, TVA,
          relances et export PDF.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/ledger">
              <BookOpen className="w-4 h-4 mr-2" />
              Grand livre
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
              href="#statuts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Statuts
            </a>
            <a
              href="#exemples"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Exemples
            </a>
            <a
              href="#rate-limits"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Limites
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Concepts */}
      <section id="concepts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Concepts clés</h2>
        <p className="text-muted-foreground">
          L&apos;API Facturation permet de gérer l&apos;ensemble du cycle de vie de vos factures :
          création, envoi, suivi des paiements et intégration comptable.
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
            <CardTitle className="text-base">Cycle de vie d&apos;une facture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Plus className="w-4 h-4 text-primary" />
                <span>Création</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Edit className="w-4 h-4 text-primary" />
                <span>Brouillon</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Send className="w-4 h-4 text-primary" />
                <span>Envoi</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Clock className="w-4 h-4 text-primary" />
                <span>En attente</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Paiement</span>
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
          L&apos;API utilise l&apos;authentification par clé API via Bearer token.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`# Exemple d'appel authentifié
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/invoices \\
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
              <li>Stocker les clés dans des variables d&apos;environnement</li>
              <li>Utiliser des clés différentes pour test et production</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Tous les montants sont en cents (EUR). Les factures incluent la gestion de la TVA.
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
            <CardTitle className="text-base">Format d&apos;une ligne de facture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">{`{
  "description": "Développement web - Phase 1",
  "quantity": 10,
  "unit_price": 15000,
  "vat_rate": 20,
  "subtotal": 150000,
  "vat_amount": 30000,
  "total": 180000
}`}</pre>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Statuts */}
      <section id="statuts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Statuts des factures</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {invoiceStatuses.map((status, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{status.title}</h3>
              <div className={`w-3 h-3 rounded-full ${status.color} mb-2`} />
              <p className="text-sm text-muted-foreground">{status.description}</p>
            </div>
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
          Recevez des notifications en temps réel pour suivre l&apos;évolution de vos factures.
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
            <h2 className="text-xl font-semibold mb-2">Prêt à intégrer la facturation ?</h2>
            <p className="text-muted-foreground">
              Commencez avec le guide de démarrage rapide ou explorez les autres APIs.
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
              <Link href="/docs/platform/ledger">
                <BookOpen className="w-4 h-4 mr-2" />
                Grand livre
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
