"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wallet,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Euro,
  Clock,
  Shield,
  MoreVertical,
  Copy,
  ChevronRight,
  Building2,
  Users,
  PiggyBank,
  Zap,
  Globe,
  Webhook,
  AlertCircle,
} from "lucide-react";

const accountTypes = [
  {
    title: "Compte Courant",
    type: "CURRENT",
    api: "/v1/accounts (type: current)",
    description:
      "Compte principal pour les opérations quotidiennes. Idéal pour les transactions courantes.",
    icon: Wallet,
    features: [
      "IBAN français FR76...",
      "Virements SEPA instantanés",
      "Prélèvements SEPA",
      "Carte débit",
    ],
  },
  {
    title: "Compte Business",
    type: "BUSINESS",
    api: "/v1/accounts (type: business)",
    description: "Compte dédié aux professionnels et entreprises avec fonctionnalités avancées.",
    icon: Building2,
    features: ["Multi-utilisateurs", "Facturation intégrée", "Export comptable", "API complète"],
  },
  {
    title: "Compte Joint",
    type: "JOINT",
    api: "/v1/accounts (type: joint)",
    description: "Compte partagé entre plusieurs titulaires avec permissions configurables.",
    icon: Users,
    features: [
      "2 à 4 titulaires",
      "Seuils de validation",
      "Historique partagé",
      "Gestion des accès",
    ],
  },
  {
    title: "Compte Épargne",
    type: "SAVINGS",
    api: "/v1/savings/accounts",
    description: "Compte dédié à l'épargne avec intérêts capitalisés.",
    icon: PiggyBank,
    features: ["Taux attractifs", "Intérêts capitalisés", "Retraits flexibles", "Garantie FGDR"],
  },
];

const concepts = [
  {
    title: "IBAN & BIC",
    description:
      "Chaque compte dispose d'un IBAN français valide et d'un code BIC pour les virements internationaux.",
    icon: Globe,
  },
  {
    title: "Solde disponible",
    description:
      "Fonds immédiatement utilisables pour les virements et paiements. Diffère du solde courant.",
    icon: Euro,
  },
  {
    title: "Multi-devises",
    description:
      "Support des principales devises (EUR, USD, GBP) avec conversion au taux du marché.",
    icon: Building2,
  },
  {
    title: "Sous-comptes",
    description:
      "Organisez vos finances avec des sous-comptes virtuels rattachés à un compte principal.",
    icon: Wallet,
  },
];

const accountStatuses = [
  { status: "pending_kyc", label: "En attente KYC", color: "bg-yellow-100 text-yellow-700" },
  { status: "active", label: "Actif", color: "bg-green-100 text-green-700" },
  { status: "restricted", label: "Restreint", color: "bg-orange-100 text-orange-700" },
  { status: "closed", label: "Fermé", color: "bg-gray-100 text-gray-700" },
  { status: "blocked", label: "Bloqué", color: "bg-red-100 text-red-700" },
];

const codeExamples = {
  createAccount: {
    title: "Créer un compte",
    description: "Créez un nouveau compte courant pour un client.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "current",
    "currency": "EUR",
    "holder_name": "Jean Dupont",
    "holder_type": "individual",
    "metadata": {
      "internal_ref": "CLIENT-2024-001"
    }
  }'`,
    response: `{
  "id": "acc_xyz789",
  "type": "current",
  "currency": "EUR",
  "status": "pending_kyc",
  "iban": "FR7630006000011234567890189",
  "bic": "NPSYFRPPXXX",
  "balance": {
    "available": 0,
    "current": 0
  },
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  getAccount: {
    title: "Récupérer un compte",
    description: "Obtenez les détails complets d'un compte existant.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "acc_xyz789",
  "type": "current",
  "currency": "EUR",
  "status": "active",
  "iban": "FR7630006000011234567890189",
  "bic": "NPSYFRPPXXX",
  "holder": {
    "name": "Jean Dupont",
    "type": "individual"
  },
  "balance": {
    "available": 5234500,
    "current": 5234500
  },
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T12:00:00Z"
}`,
  },
  getBalance: {
    title: "Consulter le solde",
    description: "Récupérez le solde actuel d'un compte en temps réel.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_xyz789/balance \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "account_id": "acc_xyz789",
  "currency": "EUR",
  "available": 5234500,
  "current": 5234500,
  "pending": 150000,
  "overdraft": 0,
  "updated_at": "2024-01-15T14:30:00Z"
}`,
  },
  listAccounts: {
    title: "Lister les comptes",
    description: "Récupérez tous vos comptes avec filtres optionnels.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts?status=active&type=current&limit=20" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "acc_xyz789",
      "type": "current",
      "status": "active",
      "iban": "FR7630006000011234567890189",
      "balance": { "available": 5234500, "current": 5234500 }
    },
    {
      "id": "acc_abc123",
      "type": "savings",
      "status": "active",
      "iban": "FR7630006000011234567890190",
      "balance": { "available": 15000000, "current": 15000000 }
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0
}`,
  },
};

const webhookEvents = [
  { event: "account.created", description: "Nouveau compte créé" },
  { event: "account.activated", description: "Compte activé après KYC" },
  { event: "account.status_changed", description: "Changement de statut" },
  { event: "account.balance_updated", description: "Solde mis à jour" },
  { event: "account.restricted", description: "Compte restreint" },
  { event: "account.closed", description: "Compte fermé" },
];

const mockAccounts = [
  {
    id: "acc_xyz789",
    name: "Compte principal",
    type: "COURANT",
    iban: "FR7630006000011234567890189",
    balance: 45_250.0,
    status: "active",
  },
  {
    id: "acc_abc123",
    name: "Compte épargne",
    type: "EPARGNE",
    iban: "FR7630006000011234567890190",
    balance: 12_500.0,
    status: "active",
  },
  {
    id: "acc_def456",
    name: "Compte pro",
    type: "BUSINESS",
    iban: "FR7630006000011234567890191",
    balance: 8_750.0,
    status: "pending_kyc",
  },
];

export default function PlatformAccountsPage() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (code: string, exampleId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedExample(exampleId);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const formatIban = (iban: string) => {
    return iban.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Wallet className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">comptes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour créer et gérer des comptes bancaires. IBAN français, soldes en temps
          réel, multi-devises et webhooks pour suivre les évolutions.
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
              Virements <ChevronRight className="w-4 h-4 ml-2" />
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
              <ChevronRight className="w-4 h-4" /> Types de comptes
            </a>
            <a
              href="#concepts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Concepts clés
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
            <a
              href="#statuts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Statuts des comptes
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Comptes permet de créer, consulter et gérer des comptes bancaires
          programmatiquement. Chaque compte dispose d'un IBAN français unique, d'un code BIC pour
          les virements internationaux, et d'un suivi des soldes en temps réel.
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
        <div className="flex items-start gap-4 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">IBAN instantané</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Un IBAN français est généré automatiquement à la création du compte. Le compte est
              opérationnel après validation KYC du titulaire.
            </p>
          </div>
        </div>
      </section>

      {/* Types de comptes */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de comptes</h2>
        <p className="text-muted-foreground">
          Choisissez le type de compte adapté au profil de votre client. Chaque type possède ses
          propres caractéristiques et limites.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {accountTypes.map((account, index) => {
            const Icon = account.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.title}</CardTitle>
                      <code className="text-xs text-muted-foreground">{account.api}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{account.description}</p>
                  <ul className="space-y-2">
                    {account.features.map((feature, i) => (
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
                <code className="text-sm font-mono">/v1/accounts</code>
                <span className="text-xs text-muted-foreground ml-auto">Créer un compte</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - current | business
                    | joint | savings
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">currency</code> - EUR, USD,
                    GBP...
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">holder_name</code> - Nom du
                    titulaire
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">holder_type</code> - individual
                    | business
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
                <code className="text-sm font-mono">/v1/accounts</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les comptes</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - Filtrer par
                    statut
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - Filtrer par type
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">limit</code> - Pagination (max
                    100)
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">offset</code> - Offset
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
                <code className="text-sm font-mono">/v1/accounts/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Détails d'un compte</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/accounts/{"{id}"}/balance</code>
                <span className="text-xs text-muted-foreground ml-auto">Solde d'un compte</span>
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
          Gérez visuellement vos comptes depuis le dashboard. Recherchez, filtrez et consultez les
          détails.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Comptes existants</h3>
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
                Nouveau
              </Button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">IBAN</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Solde</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockAccounts.map((account) => (
                <tr key={account.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{account.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{account.name}</td>
                  <td className="px-4 py-3 text-sm">{account.type}</td>
                  <td className="px-4 py-3 text-sm font-mono text-xs">
                    {formatIban(account.iban)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {account.balance.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        account.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {account.status === "active" ? "Actif" : "En attente"}
                    </span>
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
          Configurez des webhooks pour être notifié en temps réel des événements sur vos comptes.
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

      {/* Statuts */}
      <section id="statuts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Statuts des comptes</h2>
        <p className="text-muted-foreground">
          Un compte passe par plusieurs statuts au cours de son cycle de vie.
        </p>
        <div className="flex flex-wrap gap-3">
          {accountStatuses.map((s) => (
            <span
              key={s.status}
              className={`px-4 py-2 rounded-full text-sm font-medium ${s.color}`}
            >
              {s.label} ({s.status})
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à créer vos comptes ?</h2>
            <p className="text-muted-foreground">
              Commencez à tester l'API dans le sandbox ou consultez la documentation des produits.
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
                Épargne <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
