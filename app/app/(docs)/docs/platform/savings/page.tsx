"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PiggyBank,
  Plus,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Clock,
  Percent,
  Copy,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  Webhook,
  DollarSign,
  Calendar,
} from "lucide-react";

const savingsTypes = [
  {
    title: "Livret A",
    type: "LIVRET_A",
    api: "/v1/savings/accounts (type: livret_a)",
    description:
      "Livret d'épargne réglementé avec intérêts défiscalisés. Idéal pour constituer une épargne de précaution.",
    rate: "3.0% TAEA",
    ceiling: "22 950€",
    features: ["Intérêts défiscalisés", "Aucun frais", "Retraits libres", "Capital garanti"],
  },
  {
    title: "Compte à Terme",
    type: "CAT",
    api: "/v1/savings/accounts (type: term)",
    description:
      "Épargne à terme fixe avec taux bonifié. Idéale pour immobiliser vos fonds avec un rendement optimisé.",
    rate: "4.5% TAEG",
    ceiling: "Illimité",
    features: [
      "Taux boosté",
      "Durée flexible (3-60 mois)",
      "Sécurité totale",
      "Versements échelonnés",
    ],
  },
  {
    title: "PEL",
    type: "PEL",
    api: "/v1/savings/accounts (type: pel)",
    description:
      "Plan d'Épargne Logement pour préparer votre projet immobilier avec primes d'état.",
    rate: "2.5% TAEA",
    ceiling: "61 200€",
    features: [
      "Prime d'état (jusqu'à 1 525€)",
      "Épargne longue durée",
      "Crédit PEL possible",
      "Fiscalité adaptée",
    ],
  },
];

const savingsStatuses = [
  { status: "active", label: "Actif", color: "bg-green-100 text-green-700" },
  { status: "frozen", label: "Gelé", color: "bg-blue-100 text-blue-700" },
  { status: "closed", label: "Fermé", color: "bg-gray-100 text-gray-700" },
];

const concepts = [
  {
    title: "Intérêts capitalisés",
    description:
      "Les intérêts générés s'ajoutent au capital pour produire de nouveaux intérêts. Calcul quotidien.",
    icon: TrendingUp,
  },
  {
    title: "Taux annuel effectif",
    description: "Le TAEA (Livret A, PEL) ou TAEG (Compte à terme) inclut tous les frais.",
    icon: Percent,
  },
  {
    title: "Plafond réglementé",
    description: "Certains livrets ont un plafond de versements défini par la réglementation.",
    icon: Shield,
  },
  {
    title: "Garantie FGDR",
    description: "Dépôts garantis jusqu'à 100 000€ par le Fonds de Garantie des Dépôts.",
    icon: Globe,
  },
];

const codeExamples = {
  listSavingsAccounts: {
    title: "Lister les comptes épargne",
    description: "Récupérez la liste des comptes épargne avec filtres.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts?status=active&type=livret_a&limit=20" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "sav_xyz789",
      "type": "livret_a",
      "status": "active",
      "holder_id": "usr_abc123",
      "currency": "EUR",
      "current_balance": 1500000,
      "available_balance": 1500000,
      "interest_rate": 3.0,
      "rate_type": "TAEA",
      "last_interest_credited": 45000,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}`,
  },
  getSavingsAccount: {
    title: "Détails d'un compte",
    description: "Obtenez les détails complets d'un compte épargne.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts/sav_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "sav_xyz789",
  "type": "livret_a",
  "status": "active",
  "holder": {
    "id": "usr_abc123",
    "name": "Jean Dupont"
  },
  "currency": "EUR",
  "current_balance": 1500000,
  "available_balance": 1500000,
  "interest_rate": 3.0,
  "rate_type": "TAEA",
  "interest_accrued_ytd": 3750,
  "last_interest_credited": 45000,
  "last_interest_date": "2024-01-01",
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  getInterest: {
    title: "Historique des intérêts",
    description: "Récupérez le détail des intérêts générés.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts/sav_xyz789/interest?year=2024" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "account_id": "sav_xyz789",
  "year": 2024,
  "opening_balance": 1500000,
  "closing_balance": 1545000,
  "total_interest": 45000,
  "interest_rate": 3.0,
  "capitalization_date": "2024-12-31",
  "breakdown": [
    { "month": "january", "balance": 1503750, "interest": 3750 },
    { "month": "february", "balance": 1507500, "interest": 3750 }
  ]
}`,
  },
  deposit: {
    title: "Effectuer un versement",
    description: "Ajoutez des fonds sur un compte épargne.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts/sav_xyz789/deposits \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 500000,
    "currency": "EUR",
    "reference": "EPARGNE-MARS"
  }'`,
    response: `{
  "id": "dep_abc123",
  "account_id": "sav_xyz789",
  "type": "deposit",
  "amount": 500000,
  "currency": "EUR",
  "status": "completed",
  "balance_after": 2000000,
  "reference": "EPARGNE-MARS",
  "created_at": "2024-03-15T10:30:00Z"
}`,
  },
};

const webhookEvents = [
  { event: "savings.account.created", description: "Compte créé" },
  { event: "savings.account.closed", description: "Compte fermé" },
  { event: "savings.deposit.completed", description: "Versement effectué" },
  { event: "savings.withdrawal.completed", description: "Retrait effectué" },
  { event: "savings.interest.credited", description: "Intérêts capitalisés" },
];

const mockSavings = [
  {
    id: "sav_xyz789",
    holder: "Jean Dupont",
    type: "LIVRET_A",
    balance: 15000,
    rate: "3.0%",
    lastInterest: 450,
    status: "active",
  },
  {
    id: "sav_abc123",
    holder: "Marie Martin",
    type: "CAT",
    balance: 25000,
    rate: "4.5%",
    lastInterest: 1125,
    status: "active",
  },
  {
    id: "sav_def456",
    holder: "Pierre Durant",
    type: "PEL",
    balance: 5000,
    rate: "2.5%",
    lastInterest: 125,
    status: "active",
  },
];

export default function PlatformSavingsPage() {
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
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion de l'<span className="text-primary">épargne</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour gérer les comptes d'épargne de vos utilisateurs. Livret A, Compte à
          terme, PEL avec intérêts capitalisés.
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
              Produits épargne <ChevronRight className="w-4 h-4 ml-2" />
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
              <ChevronRight className="w-4 h-4" /> Types de livrets
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
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Épargne permet de gérer programmatiquement les comptes d'épargne de vos
          utilisateurs. Créez des livrets, effectuez des versements, et consultez les intérêts
          générés. Le système intègre le calcul automatique des intérêts et la capitalisation
          annuelle.
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
            <h3 className="font-semibold mb-2">Garantie FGDR</h3>
            <code className="text-sm text-primary">100 000€</code>
          </div>
        </div>
      </section>

      {/* Types de livrets */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de livrets</h2>
        <p className="text-muted-foreground">
          Chaque type de livret possède ses propres caractéristiques : taux, plafond et conditions.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {savingsTypes.map((saving, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{saving.title}</CardTitle>
                    <code className="text-xs text-muted-foreground">{saving.type}</code>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{saving.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Taux</p>
                    <p className="text-xl font-bold text-primary">{saving.rate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Plafond</p>
                    <p className="font-medium">{saving.ceiling}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {saving.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
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
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Statuts des comptes</h2>
        <div className="flex flex-wrap gap-3">
          {savingsStatuses.map((s) => (
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
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/savings/accounts</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les comptes</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - livret_a | term |
                    pel
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - active | frozen
                    | closed
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">holder_id</code> - Filtrer par
                    titulaire
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
                <code className="text-sm font-mono">/v1/savings/accounts/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Détails du compte</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/savings/accounts/{"{id}"}/deposits</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Effectuer un versement
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">amount</code> - Montant en
                    centimes
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">reference</code> - Référence
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
                <code className="text-sm font-mono">/v1/savings/accounts/{"{id}"}/interest</code>
                <span className="text-xs text-muted-foreground ml-auto">Historique intérêts</span>
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
          Gérez visuellement les comptes épargne depuis le dashboard.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Comptes épargne</h3>
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
                <th className="px-4 py-3 text-left text-sm font-medium">Titulaire</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Solde</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Taux</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Dernier intérêt</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockSavings.map((saving) => (
                <tr key={saving.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{saving.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{saving.holder}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {saving.type === "LIVRET_A"
                        ? "Livret A"
                        : saving.type === "CAT"
                          ? "Compte à terme"
                          : "PEL"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {saving.balance.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">{saving.rate}</td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">
                    +
                    {saving.lastInterest.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Actif
                    </span>
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
          <Webhook className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold">Webhooks</h2>
        </div>
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
            <h2 className="text-xl font-semibold mb-2">Prêt à gérer l'épargne ?</h2>
            <p className="text-muted-foreground">
              Testez l'API dans le sandbox ou consultez les produits épargne.
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
                Produits épargne <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
