"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Lock,
  Clock,
  Shield,
  MoreVertical,
  Smartphone,
  Copy,
  ChevronRight,
  Zap,
  Globe,
  Webhook,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

const cardTypes = [
  {
    title: "Carte Physique",
    type: "PHYSICAL",
    api: "/v1/cards (type: physical)",
    description:
      "Carte bancaire physique avec paiement sans contact, idéale pour les retraits et achats en magasin.",
    icon: CreditCard,
    delivery: "3-5 jours ouvrés",
    features: [
      "Paiement sans contact NFC",
      "Retraits DAB nationaux",
      "Paiement international",
      "Assurance voyage incluse",
    ],
  },
  {
    title: "Carte Virtuelle",
    type: "VIRTUAL",
    api: "/v1/cards (type: virtual)",
    description:
      "Carte numérique pour les paiements en ligne avec contrôle granulaire des dépenses.",
    icon: Smartphone,
    delivery: "Instantanée",
    features: [
      "Génération immédiate",
      "Limites configurables",
      "Désactivation rapide",
      "Multi-cartes par compte",
    ],
  },
  {
    title: "Carte Burnett",
    type: "BURN",
    api: "/v1/cards (type: burn)",
    description: "Carte à usage unique avec numéro régénéré après chaque transaction.",
    icon: RefreshCw,
    delivery: "Non applicable",
    features: [
      "Sécurité maximale",
      "Numéro à usage unique",
      "Limite par transaction",
      "Transaction unique",
    ],
  },
  {
    title: "Carte Business",
    type: "BUSINESS",
    api: "/v1/cards (type: business)",
    description: "Carte professionnelle avec gestion d'équipe et suivi des dépenses.",
    icon: Shield,
    delivery: "5-7 jours ouvrés",
    features: ["Multi-utilisateurs", "Alertes spending", "Catégorisation auto", "Export comptable"],
  },
];

const cardStatuses = [
  { status: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { status: "active", label: "Active", color: "bg-green-100 text-green-700" },
  { status: "frozen", label: "Gélée", color: "bg-blue-100 text-blue-700" },
  { status: "blocked", label: "Bloquée", color: "bg-red-100 text-red-700" },
  { status: "expired", label: "Expirée", color: "bg-gray-100 text-gray-700" },
];

const concepts = [
  {
    title: "Tokenisation",
    description:
      "Les numéros de carte sont tokenisés. Le numéro réel n'est jamais exposé dans les logs ou réponses API.",
    icon: Lock,
  },
  {
    title: "Limites de spending",
    description:
      "Configurez des limites quotidiennes, mensuelles ou par transaction. Dépassement automatique bloqué.",
    icon: Shield,
  },
  {
    title: "Gel temporaire",
    description: "Figez une carte en 1 clic sans l'annuler. Dégelez instantanément si nécessaire.",
    icon: Snowflake,
  },
  {
    title: "3D Secure",
    description:
      "Authentification obligatoire pour les paiements en ligne avec vérification par OTP.",
    icon: Globe,
  },
];

const codeExamples = {
  createPhysical: {
    title: "Créer une carte physique",
    description: "Commandez une carte physique pour un titulaire.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "type": "physical",
    "holder_name": "Jean Dupont",
    "spending_limits": {
      "daily": 100000,
      "monthly": 300000
    },
    "options": {
      "contactless": true,
      "international": true,
      "withdrawal": true
    }
  }'`,
    response: `{
  "id": "crd_abc123",
  "type": "physical",
  "status": "pending",
  "holder_name": "Jean Dupont",
  "last4": "4532",
  "expiry_month": 12,
  "expiry_year": 2027,
  "brand": "VISA",
  "spending_limits": {
    "daily": 100000,
    "monthly": 300000
  },
  "created_at": "2024-01-15T10:00:00Z",
  "estimated_delivery": "2024-01-20T10:00:00Z"
}`,
  },
  createVirtual: {
    title: "Créer une carte virtuelle",
    description: "Générez instantanément une carte virtuelle pour les paiements en ligne.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "type": "virtual",
    "holder_name": "Jean Dupont",
    "spending_limits": {
      "per_transaction": 50000,
      "daily": 200000
    },
    "valid_until": "2025-12-31"
  }'`,
    response: `{
  "id": "crd_def456",
  "type": "virtual",
  "status": "active",
  "holder_name": "Jean Dupont",
  "last4": "8901",
  "expiry_month": 12,
  "expiry_year": 2025,
  "pan": "4111111111114532",
  "cvv": "123",
  "spending_limits": {
    "per_transaction": 50000,
    "daily": 200000
  },
  "created_at": "2024-01-15T10:30:00Z"
}`,
  },
  getCardDetails: {
    title: "Récupérer les détails",
    description: "Obtenez les détails complets d'une carte (numéro masqué).",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/cards/crd_abc123 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "crd_abc123",
  "type": "physical",
  "status": "active",
  "holder_name": "Jean Dupont",
  "last4": "4532",
  "expiry_month": 12,
  "expiry_year": 2027,
  "brand": "VISA",
  "spending_limits": {
    "daily": 100000,
    "monthly": 300000,
    "current_day_spent": 25000,
    "current_month_spent": 75000
  },
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  freezeCard: {
    title: "Geler une carte",
    description: "Figez temporairement une carte (aucune transaction possible).",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards/crd_abc123/freeze \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{"reason": "suspicious_activity"}'`,
    response: `{
  "id": "crd_abc123",
  "status": "frozen",
  "frozen_at": "2024-01-15T14:30:00Z",
  "frozen_reason": "suspicious_activity"
}`,
  },
  unfreezeCard: {
    title: "Dégeler une carte",
    description: "Réactivez une carte préalablement gelée.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards/crd_abc123/unfreeze \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "crd_abc123",
  "status": "active",
  "unfrozen_at": "2024-01-15T15:00:00Z"
}`,
  },
  listCards: {
    title: "Lister les cartes",
    description: "Récupérez toutes les cartes d'un compte avec filtres.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/cards?account_id=acc_xyz789&status=active&type=virtual" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "crd_def456",
      "type": "virtual",
      "status": "active",
      "holder_name": "Jean Dupont",
      "last4": "8901",
      "brand": "VISA"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}`,
  },
};

const webhookEvents = [
  { event: "card.created", description: "Carte créée" },
  { event: "card.activated", description: "Carte activée" },
  { event: "card.status_changed", description: "Changement de statut" },
  { event: "card.frozen", description: "Carte gelée" },
  { event: "card.unfrozen", description: "Carte dégelée" },
  { event: "card.transaction", description: "Transaction effectuée" },
  { event: "card.limit_exceeded", description: "Limite dépassée" },
];

const mockCards = [
  {
    id: "crd_abc123",
    holder: "Jean Dupont",
    type: "PHYSICAL",
    last4: "4532",
    expiry: "12/27",
    status: "active",
    limit: 5000,
    spent: 1234.5,
  },
  {
    id: "crd_def456",
    holder: "Marie Martin",
    type: "VIRTUAL",
    last4: "8901",
    expiry: "12/25",
    status: "active",
    limit: 2000,
    spent: 450.0,
  },
  {
    id: "crd_ghi789",
    holder: "Pierre Durant",
    type: "PHYSICAL",
    last4: "3456",
    expiry: "03/28",
    status: "frozen",
    limit: 3000,
    spent: 0,
  },
];

function Snowflake({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  );
}

export default function PlatformCardsPage() {
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
          <CreditCard className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Cartes <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour émettre et gérer des cartes bancaires. Physiques, virtuelles ou Burnett.
          Contrôlez les dépenses et sécurisez les transactions.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/products/accounts">
              Comptes <ChevronRight className="w-4 h-4 ml-2" />
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
              <ChevronRight className="w-4 h-4" /> Types de cartes
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
              <ChevronRight className="w-4 h-4" /> Statuts des cartes
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
          L'API Cartes permet d'émettre et gérer des cartes bancaires programmatiquement. Créez des
          cartes physiques avec livraison à domicile, des cartes virtuelles instantanément, ou des
          cartes Burnett pour les paiements ponctuels. Chaque carte dispose de limites configurables
          et d'un suivi en temps réel.
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
            <h3 className="font-semibold mb-2">Sécurité</h3>
            <code className="text-sm text-primary">Tokenisation + 3DS</code>
          </div>
        </div>
      </section>

      {/* Types de cartes */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de cartes</h2>
        <p className="text-muted-foreground">
          Choisissez le type de carte adapté à votre cas d'usage. Chaque type possède ses propres
          caractéristiques.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {cardTypes.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <code className="text-xs text-muted-foreground">{card.api}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Livraison:</span>
                    <span className="font-medium">{card.delivery}</span>
                  </div>
                  <ul className="space-y-2">
                    {card.features.map((feature, i) => (
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
        <h2 className="text-2xl font-bold">Statuts des cartes</h2>
        <p className="text-muted-foreground">
          Une carte passe par plusieurs statuts au cours de son cycle de vie.
        </p>
        <div className="flex flex-wrap gap-3">
          {cardStatuses.map((s) => (
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
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/cards</code>
                <span className="text-xs text-muted-foreground ml-auto">Créer une carte</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">account_id</code> - ID du compte
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - physical | virtual
                    | burn | business
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">holder_name</code> - Nom du
                    titulaire
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">spending_limits</code> - Limites
                    de spending
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
                <code className="text-sm font-mono">/v1/cards</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les cartes</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">account_id</code> - Filtrer par
                    compte
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - pending | active
                    | frozen | blocked
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - physical | virtual
                    | burn
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
                <code className="text-sm font-mono">/v1/cards/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Détails d'une carte</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/cards/{"{id}"}/freeze</code>
                <span className="text-xs text-muted-foreground ml-auto">Geler une carte</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/cards/{"{id}"}/unfreeze</code>
                <span className="text-xs text-muted-foreground ml-auto">Dégeler une carte</span>
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
          Gérez visuellement vos cartes depuis le dashboard. Recherchez, filtrez et contrôlez les
          dépenses.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Cartes existantes</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle
              </Button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Titulaire</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Numéro</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Limite</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockCards.map((card) => (
                <tr key={card.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{card.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{card.holder}</td>
                  <td className="px-4 py-3 text-sm">
                    {card.type === "PHYSICAL" ? "Physique" : "Virtuelle"}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">•••• •••• •••• {card.last4}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        card.status === "active"
                          ? "bg-green-100 text-green-700"
                          : card.status === "frozen"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {card.status === "active"
                        ? "Active"
                        : card.status === "frozen"
                          ? "Gélée"
                          : "Bloquée"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {card.limit.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
          Configurez des webhooks pour être notifié des événements sur vos cartes.
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
            <h2 className="text-xl font-semibold mb-2">Prêt à émettre vos cartes ?</h2>
            <p className="text-muted-foreground">
              Testez l'API dans le sandbox ou consultez la documentation des autres produits.
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
