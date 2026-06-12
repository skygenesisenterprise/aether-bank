"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PiggyBank,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle,
  Percent,
  Shield,
  Lock,
  Zap,
  Globe,
  Copy,
  ChevronRight,
  Building2,
  Webhook,
  DollarSign,
} from "lucide-react";

const savingsTypes = [
  {
    title: "Livret A",
    description:
      "Livre d'épargne réglementé avec intérêts défiscalisés. Ideal pour constituer une épargne de précaution.",
    icon: PiggyBank,
    api: "/v1/savings/accounts (type: livret_a)",
    rate: "3% TAEB",
    ceiling: "22 950€",
    features: ["Intérêts défiscalisés", "Aucun frais", "Retraits libres", "Capital garanti"],
  },
  {
    title: "Compte à Terme",
    description:
      "Épargne à terme fixe avec taux bonifié. Idéale pour immobiliser vos fonds avec un rendement optimisé.",
    icon: Calendar,
    api: "/v1/savings/accounts (type: term)",
    rate: "Jusqu'à 4,5% TAEG",
    ceiling: "Illimité",
    features: [
      "Taux boosté",
      "Durée flexible (3-60 mois)",
      "Sécurité totale",
      "Versements échelonnés",
    ],
  },
  {
    title: "Assurance Vie",
    description:
      "Placement long terme avec avantages fiscaux et options de gestion pilotée ou autonome.",
    icon: TrendingUp,
    api: "/v1/savings/accounts (type: life_insurance)",
    rate: "Variable selon support",
    ceiling: "Illimité",
    features: [
      "Gestion pilotée disponible",
      "Fiscalité avantageuse",
      "Arbitrages gratuits",
      "Transmission du capital",
    ],
  },
  {
    title: "PEL",
    description:
      "Plan d'Épargne Logement pour préparer votre projet immobilier avec primes d'état.",
    icon: Lock,
    api: "/v1/savings/accounts (type: pel)",
    rate: "2,25% TAEA",
    ceiling: "61 200€",
    features: [
      "Prime d'état (jusqu'à 1 525€)",
      "Épargne longue durée",
      "Crédit PEL possible",
      "Fiscalité adaptée",
    ],
  },
];

const concepts = [
  {
    title: "Compte épargne",
    description: "Compte dédié à l'épargne avec IBAN propre. Permet les versements et retraits.",
    icon: Building2,
  },
  {
    title: "Taux annuel",
    description:
      "Taux d'intérêt annualisé (TAEA ou TAEG selon produit). Calculé sur le capital restant.",
    icon: Percent,
  },
  {
    title: "Intérêts capitalisés",
    description: "Les intérêts générés s'ajoutent au capital pour produire de nouveaux intérêts.",
    icon: TrendingUp,
  },
  {
    title: "Versements libres",
    description:
      "Possibilité d'effectuer des versements à tout moment selon les limites du produit.",
    icon: DollarSign,
  },
];

const securityFeatures = [
  {
    title: "Garantie FGDR",
    description:
      "Dépôts garantis par le Fonds de Garantie des Dépôts et de Résolution jusqu'à 100 000€.",
    icon: Shield,
  },
  {
    title: "Capital sécurisé",
    description: "Les fonds sont investis dans des actifs sans risque de perte en capital.",
    icon: Lock,
  },
  {
    title: "Taux réglementés",
    description: "Les taux du Livret A et PEL sont fixés par les pouvoirs publics.",
    icon: Globe,
  },
  {
    title: "Supervision",
    description: "Contrôlé par l'ACPR et conforme aux directives européennes PSD2.",
    icon: Shield,
  },
];

const codeExamples = {
  createSavingsAccount: {
    title: "Ouvrir un compte épargne",
    description: "Créez un compte épargne pour un type de produit donné.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "livret_a",
    "currency": "EUR",
    "holder_name": "Marie Dupont",
    "holder_type": "individual",
    "metadata": {
      "source": "website"
    }
  }'`,
    response: `{
  "id": "sav_xyz789",
  "type": "livret_a",
  "status": "active",
  "currency": "EUR",
  "iban": "FR7630006000011234567890189",
  "current_balance": 0,
  "available_balance": 0,
  "interest_rate": 3.0,
  "rate_type": "TAEA",
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  deposit: {
    title: "Effectuer un versement",
    description: "Ajoutez des fonds sur votre compte épargne.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts/sav_xyz789/deposits \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 500000,
    "currency": "EUR",
    "reference": "VERSEMENT-JANVIER"
  }'`,
    response: `{
  "id": "dep_abc123",
  "account_id": "sav_xyz789",
  "type": "deposit",
  "amount": 500000,
  "currency": "EUR",
  "status": "completed",
  "balance_after": 500000,
  "reference": "VERSEMENT-JANVIER",
  "created_at": "2024-01-15T10:30:00Z"
}`,
  },
  getInterest: {
    title: "Consulter les intérêts",
    description: "Récupérez le récapitulatif des intérêts générés sur une période.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts/sav_xyz789/interest?year=2024" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "account_id": "sav_xyz789",
  "year": 2024,
  "opening_balance": 500000,
  "closing_balance": 515000,
  "total_interest": 15000,
  "interest_rate": 3.0,
  "capitalization_date": "2024-12-31",
  "next_credit_date": "2025-01-01",
  "breakdown": [
    { "month": "january", "balance": 501250, "interest": 1250 },
    { "month": "february", "balance": 502500, "interest": 1250 }
  ]
}`,
  },
  withdraw: {
    title: "Effectuer un retrait",
    description: "Retirez des fonds de votre compte épargne (si autorisé par le produit).",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/savings/accounts/sav_xyz789/withdrawals \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100000,
    "currency": "EUR",
    "destination_iban": "FR7630006000011234567890189",
    "reference": "RETRAIT-JANVIER"
  }'`,
    response: `{
  "id": "wdr_def456",
  "account_id": "sav_xyz789",
  "type": "withdrawal",
  "amount": 100000,
  "currency": "EUR",
  "status": "completed",
  "balance_after": 400000,
  "reference": "RETRAIT-JANVIER",
  "created_at": "2024-01-15T14:00:00Z"
}`,
  },
};

const webhookEvents = [
  { event: "savings.account.created", description: "Compte épargne créé" },
  { event: "savings.deposit.completed", description: "Versement effectué" },
  { event: "savings.withdrawal.completed", description: "Retrait effectué" },
  { event: "savings.interest.credited", description: "Intérêts capitalisés" },
  { event: "savings.balance.updated", description: "Solde mis à jour" },
];

export default function SavingsPage() {
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
          Épargne <span className="text-primary">bancaire</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la gestion de l'épargne. Ouvrez des comptes, effectuez des versements et
          suivez vos intérêts programmatiquement.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              Guide de démarrage <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/products/accounts">
              Comptes courants <ChevronRight className="w-4 h-4 ml-2" />
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
              href="#produits"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Produits d'épargne
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
              href="#securite"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Sécurité
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Épargne d'Aether Bank permet de gérer programmatiquement vos produits d'épargne :
          ouverture de comptes, versements, retraits, et consultation des intérêts. L'API est
          conforme PSD2 et supervisée par l'ACPR, garantissant la sécurité de vos fonds.
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
            <h3 className="font-semibold mb-2">Garantie</h3>
            <code className="text-sm text-primary">FGDR 100 000€</code>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <Zap className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200">
              Intérêts capitalisés
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Les intérêts sont calculés quotidiennement et crédités annuellement. Les intérêts
              s'ajoutent au capital pour générer de nouveaux intérêts.
            </p>
          </div>
        </div>
      </section>

      {/* Produits d'épargne */}
      <section id="produits" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Produits d'épargne</h2>
        <p className="text-muted-foreground">
          Chaque produit d'épargne possède ses caractéristiques propres : taux, plafond, et
          conditions de retrait.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {savingsTypes.map((saving, index) => {
            const Icon = saving.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{saving.title}</CardTitle>
                      <code className="text-xs text-muted-foreground">{saving.api}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{saving.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">Taux</p>
                      <p className="text-sm font-medium">{saving.rate}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">Plafond</p>
                      <p className="text-sm font-medium">{saving.ceiling}</p>
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
                <code className="text-sm font-mono">/v1/savings/accounts</code>
                <span className="text-xs text-muted-foreground ml-auto">Ouvrir un compte</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - livret_a | term |
                    life_insurance | pel
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">currency</code> - EUR uniquement
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
                    <code className="text-xs bg-muted px-1 rounded">reference</code> - Référence du
                    versement
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/savings/accounts/{"{id}"}/withdrawals</code>
                <span className="text-xs text-muted-foreground ml-auto">Effectuer un retrait</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">amount</code> - Montant en
                    centimes
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">destination_iban</code> - IBAN
                    destinataire
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
                <span className="text-xs text-muted-foreground ml-auto">
                  Historique des intérêts
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">year</code> - Année (optionnel)
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">monthly</code> - true pour
                    détail mensuel
                  </span>
                </div>
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

      {/* Webhooks */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Webhook className="w-5 h-5 text-primary" />
          </div>
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

      {/* Sécurité */}
      <section id="securite" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Sécurité et réglementation</h2>
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

      {/* CTA */}
      <section className="rounded-xl bg-linear-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Commencez à épargner</h2>
            <p className="text-muted-foreground">
              Ouvrez votre compte épargne en quelques minutes et profitez de nos taux attractifs.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/register">
                Ouvrir un compte <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/platform/api">
                Toutes les APIs <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
