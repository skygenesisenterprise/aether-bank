"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Send,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Shield,
  RefreshCw,
  Building2,
  Zap,
  Lock,
  Webhook,
  Copy,
  ChevronRight,
  FileText,
  CreditCard,
  Bell,
  Server,
} from "lucide-react";
import { useState } from "react";

const transferTypes = [
  {
    title: "Virement SEPA",
    description: "Virements bancaires européens rapides et sécurisés via le réseau SEPA.",
    icon: Send,
    features: ["Instantané ou différé (J+1)", "Aucun frais", "Suivi en temps réel"],
    api: "/v1/transfers (type: sepa)",
    executionTime: "< 1 min (instant) / J+1 (standard)",
    limits: "Illimité",
  },
  {
    title: "Virement SEPA Instant",
    description: "Virements immédiats disponibles 24h/24, 7j/7 vers 3 000+ banques européennes.",
    icon: Zap,
    features: ["Crédit en quelques secondes", "Disponible 24/7", "Confimation instantanée"],
    api: "/v1/transfers (type: sepa_instant)",
    executionTime: "< 20 secondes",
    limits: "100 000€ / virement",
  },
  {
    title: "Virement international",
    description: "Envoyez de l'argent à l'international avec des taux de change compétitifs.",
    icon: Globe,
    features: ["140+ pays couverts", "Taux de change du marché", "Suivi complet"],
    api: "/v1/transfers (type: international)",
    executionTime: "1 à 5 jours ouvrés",
    limits: "500 000€ / virement",
  },
  {
    title: "Prélèvement SEPA",
    description: "Configurez des paiements récurrents avec mandate de prélèvment autorisé.",
    icon: RefreshCw,
    features: ["Créer des mandats", "Historique complet", "Annulation facile"],
    api: "/v1/mandates",
    executionTime: "J+1 à J+2",
    limits: "Selon mandat",
  },
];

const concepts = [
  {
    title: "Compte source",
    description: "Le compte bancaire Aether Bank depuis lequel les fonds sont débités.",
    icon: Building2,
  },
  {
    title: "Bénéficiaire",
    description: "Destinataire du virement identifié par IBAN et BIC/SWIFT.",
    icon: CreditCard,
  },
  {
    title: "Montant & Devise",
    description: "Montant en centimes (integer) avec code devise ISO 4217 (EUR, USD, GBP).",
    icon: DollarSign,
  },
  {
    title: "Référence",
    description: "Motif du virement visible par le bénéficiaire (max 140 caractères).",
    icon: FileText,
  },
];

const securityFeatures = [
  {
    title: "Authentification forte (2FA)",
    description: "Validation obligatoire par OTP pour les virements supérieurs à 1 000€.",
    icon: Lock,
  },
  {
    title: "Détection fraude",
    description: "ML-powered monitoring pour identifier les transactions suspectes.",
    icon: Shield,
  },
  {
    title: "Notifications temps réel",
    description: "Alertes email/SMS pour chaque virement initiated.",
    icon: Bell,
  },
  {
    title: "IP Whitelisting",
    description: "Restreignez l'accès API à vos serveurs spécifiques.",
    icon: Server,
  },
];

const webhookEvents = [
  { event: "transfer.created", description: "Virement créé (statut: pending)" },
  { event: "transfer.pending", description: "Virement en cours de traitement" },
  { event: "transfer.completed", description: "Virement terminé avec succès" },
  { event: "transfer.failed", description: "Virement échoué (cause détaillée)" },
  { event: "transfer.cancelled", description: "Virement annulé par l'émetteur" },
];

const codeExamples = {
  createSepa: {
    title: "Créer un virement SEPA",
    description: "Initiez un virement SEPA standard vers un compte européen.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "type": "sepa",
    "amount": 500000,
    "currency": "EUR",
    "recipient": {
      "iban": "DE89370400440532013000",
      "name": "Max Mustermann GmbH",
      "bic": "COBADEFFXXX"
    },
    "reference": "FACTURE-2024-001",
    "description": "Paiement facture janvier"
  }'`,
    response: `{
  "id": "trf_abc123",
  "type": "sepa",
  "status": "pending",
  "amount": 500000,
  "currency": "EUR",
  "account_id": "acc_xyz789",
  "recipient": {
    "iban": "DE89370400440532013000",
    "name": "Max Mustermann GmbH",
    "bic": "COBADEFFXXX"
  },
  "reference": "FACTURE-2024-001",
  "created_at": "2024-01-15T10:00:00Z",
  "estimated_arrival": "2024-01-16T00:00:00Z"
}`,
  },
  createSepaInstant: {
    title: "Créer un virement SEPA Instant",
    description: "Virement immédiat disponible 24h/24 avec crédit en quelques secondes.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "type": "sepa_instant",
    "amount": 5000000,
    "currency": "EUR",
    "recipient": {
      "iban": "FR7630006000011234567890189",
      "name": "Société ABC",
      "bic": "NPSYFRPPXXX"
    },
    "reference": "URGENT-PAIEMENT"
  }'`,
    response: `{
  "id": "trf_def456",
  "type": "sepa_instant",
  "status": "completed",
  "amount": 5000000,
  "currency": "EUR",
  "account_id": "acc_xyz789",
  "recipient": {
    "iban": "FR7630006000011234567890189",
    "name": "Société ABC"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:30:15Z",
  "execution_time_ms": 12500
}`,
  },
  getStatus: {
    title: "Vérifier le statut d'un virement",
    description: "Récupérez les détails et le statut actuel d'un virement.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers/trf_abc123 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "trf_abc123",
  "type": "sepa",
  "status": "completed",
  "amount": 500000,
  "currency": "EUR",
  "account_id": "acc_xyz789",
  "recipient": {
    "iban": "DE89370400440532013000",
    "name": "Max Mustermann GmbH"
  },
  "reference": "FACTURE-2024-001",
  "created_at": "2024-01-15T10:00:00Z",
  "completed_at": "2024-01-15T22:30:00Z",
  "tracking_id": "TRK-2024-001234"
}`,
  },
  listTransfers: {
    title: "Lister les virements",
    description: "Récupérez l'historique paginé de vos virements avec filtres.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers?account_id=acc_xyz789&status=completed&limit=20&offset=0" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "trf_abc123",
      "type": "sepa",
      "status": "completed",
      "amount": 500000,
      "currency": "EUR",
      "recipient": { "name": "Max Mustermann GmbH" },
      "reference": "FACTURE-2024-001",
      "created_at": "2024-01-15T10:00:00Z"
    },
    {
      "id": "trf_def456",
      "type": "sepa_instant",
      "status": "completed",
      "amount": 5000000,
      "currency": "EUR",
      "recipient": { "name": "Société ABC" },
      "reference": "URGENT-PAIEMENT",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0
}`,
  },
};

const transferStatuses = [
  { status: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { status: "processing", label: "En cours", color: "bg-blue-100 text-blue-700" },
  { status: "completed", label: "Terminé", color: "bg-green-100 text-green-700" },
  { status: "failed", label: "Échoué", color: "bg-red-100 text-red-700" },
  { status: "cancelled", label: "Annulé", color: "bg-gray-100 text-gray-700" },
];

export default function TransfertsPage() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (code: string, exampleId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedExample(exampleId);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Send className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Virements & <span className="text-primary">Transferts</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour effectuer des virements SEPA, instantanés et internationaux.
          Documentation technique pour développeurs.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              Guide de démarrage <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/security/authentication">
              Authentification <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Table des matières */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Table des matières</h2>
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
            <ChevronRight className="w-4 h-4" /> Types de virements
          </a>
          <a
            href="#concepts"
            className="flex items-center-gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-4 h-4" /> Concepts clés
          </a>
          <a
            href="#authentification"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-4 h-4" /> Authentification
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
            href="#webhooks"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-4 h-4" /> Webhooks
          </a>
          <a
            href="#environnements"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-4 h-4" /> Environnements
          </a>
        </div>
      </section>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Virements d'Aether Bank permet d'initier et gérer des transferts bancaires
          programmatiquement. Elle prend en charge les virements SEPA (standard et instantané), les
          virements internationaux (SWIFT), et les prélèvements SEPA. Conçue pour les entreprises,
          fintechs et développeurs, elle offre une intégration simple avec des réponses JSON
          standardisées.
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
            <code className="text-sm text-primary">JSON / REST</code>
          </div>
        </div>
      </section>

      {/* Types de virements */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de virements</h2>
        <p className="text-muted-foreground">
          Choisissez le type de transfert adapté à vos besoins en fonction de la destination, la
          rapidité et les frais.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {transferTypes.map((transfer, index) => {
            const Icon = transfer.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{transfer.title}</CardTitle>
                      <code className="text-xs text-muted-foreground">{transfer.api}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{transfer.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{transfer.executionTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{transfer.limits}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {transfer.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Concepts clés */}
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

        {/* Flux de virement */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary" />
              Flux d'un virement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="px-4 py-3 rounded-lg bg-blue-100 text-blue-700 font-medium">
                POST /transfers
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="px-4 py-3 rounded-lg bg-yellow-100 text-yellow-700 font-medium">
                pending
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="px-4 py-3 rounded-lg bg-blue-100 text-blue-700 font-medium">
                processing
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="px-4 py-3 rounded-lg bg-green-100 text-green-700 font-medium">
                completed
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3">Statuts possibles</h4>
              <div className="flex flex-wrap gap-3">
                {transferStatuses.map((s) => (
                  <span
                    key={s.status}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${s.color}`}
                  >
                    {s.label} ({s.status})
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Authentification */}
      <section id="authentification" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Authentification</h2>
        <p className="text-muted-foreground">
          L'API utilise l'authentification par clé API (Bearer token). Incluez votre clé dans
          l'en-tête
          <code className="px-2 py-1 mx-1 rounded bg-muted text-sm">
            Authorization: Bearer sk_live_xxx
          </code>
          de chaque requête.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`# Exemple d'en-tête d'authentification
Authorization: Bearer sk_test_abc123def456`}
          </pre>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <Lock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800 dark:text-orange-200">Important</h4>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              Ne partagez jamais vos clés API. Utilisez des variables d'environnement pour les
              stocker. Créez des clés séparées pour le sandbox (test) et la production.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Clés Sandbox</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-muted-foreground break-all">sk_test_...</code>
              <p className="text-xs text-muted-foreground mt-2">Pour les tests. Fonds fictifs.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Clés Production</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-xs text-muted-foreground break-all">sk_live_...</code>
              <p className="text-xs text-muted-foreground mt-2">Pour les transactions réelles.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Endpoints API */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints API</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/transfers</code>
                <span className="text-xs text-muted-foreground ml-auto">Créer un virement</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-2">Corps de la requête</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">account_id</code> - ID du compte
                    source
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - sepa |
                    sepa_instant | international
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">amount</code> - Montant en
                    centimes (integer)
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">currency</code> - Code devise
                    ISO (EUR, USD...)
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">recipient</code> - Objet avec
                    iban, name, bic
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">reference</code> - Motif du
                    virement
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/transfers/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Détails d'un virement</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-2">Paramètres</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">id</code> - ID du virement
                    (trf_xxx)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/transfers</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les virements</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-2">Paramètres de query</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">account_id</code> - Filtrer par
                    compte
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - pending |
                    completed | failed
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - sepa |
                    sepa_instant | international
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">limit</code> - Nombre de
                    résultats (max 100)
                  </li>
                  <li>
                    <code className="text-xs bg-muted px-1 rounded">offset</code> - Pagination
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold">
                  DELETE
                </span>
                <code className="text-sm font-mono">/v1/transfers/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Annuler un virement</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="text-muted-foreground">
                  Uniquement pour les virements en statut{" "}
                  <code className="text-xs bg-muted px-1 rounded">pending</code>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Exemples de code */}
      <section id="exemples" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Exemples de code</h2>
        <p className="text-muted-foreground">
          Exemples concrets d'utilisation de l'API Transfers. Copiez-collez et adaptez à votre cas.
        </p>
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

      {/* Webhooks */}
      <section id="webhooks" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Webhook className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Webhooks</h2>
        </div>
        <p className="text-muted-foreground">
          Configurez des webhooks pour recevoir des notifications temps réel sur l'état de vos
          virements. Chaque événement est envoyé via POST HTTP à votre endpoint avec un payload JSON
          signé.
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
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`// Exemple de payload webhook
{
  "event": "transfer.completed",
  "id": "evt_xyz789",
  "created_at": "2024-01-15T22:30:00Z",
  "data": {
    "id": "trf_abc123",
    "status": "completed",
    "amount": 500000,
    "currency": "EUR"
  }
}`}
          </pre>
        </div>
      </section>

      {/* Environnements */}
      <section id="environnements" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Environnements de test</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Sandbox
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Base URL</p>
                <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded break-all">
                  sandbox.bank.skygenesisenterprise.com/api/v1
                </code>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Fonds fictifs - aucun mouvement réel</li>
                <li>IBANs de test disponibles</li>
                <li>Toutes les fonctionnalités activées</li>
                <li>Logs détaillés pour le débogage</li>
              </ul>
              <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs font-medium mb-2">IBANs de test SEPA</p>
                <code className="text-xs text-muted-foreground break-all">
                  FR7630006000011234567890189
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Production
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Base URL</p>
                <code className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded break-all">
                  bank.skygenesisenterprise.com/api/v1
                </code>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Fonds réels - utilisez avec précaution</li>
                <li>Validation identité requise (KYC)</li>
                <li>Limites par compte applicatives</li>
                <li>Support technique dédié</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sécurité */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Sécurité</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Final */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à intégrer ?</h2>
            <p className="text-muted-foreground">
              Créez votre compte développeur et commencez à tester l'API dans le sandbox.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/register">
                Créer un compte <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/platform/api">
                Voir toutes les APIs <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
