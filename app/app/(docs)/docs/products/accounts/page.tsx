"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  CreditCard,
  PiggyBank,
  Building2,
  Users,
  ArrowRight,
  CheckCircle,
  Euro,
  Clock,
  Shield,
  Zap,
  Globe,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const accountTypes = [
  {
    title: "Compte Courant",
    description:
      "Compte基础账户用于日常交易和支付。 Idéal pour gérer vos dépenses quotidiennes avec un IBAN français et des virements illimités.",
    icon: Wallet,
    features: [
      "IBAN français valide",
      "Virements SEPA illimités",
      "Prélvements automatique (SEPA DD)",
      "Carte débit immédiate",
    ],
    api: "/v1/accounts (type: current)",
  },
  {
    title: "Compte Épargne",
    description:
      "高利率储蓄账户，让您的资金增值。 Faire grandir votre épargne avec des taux préférentiels.",
    icon: PiggyBank,
    features: [
      "Taux jusqu'à 4,00% TAEG",
      "Versements libres",
      "Retraits flexibles",
      "Intérêts calculés daily",
    ],
    api: "/v1/accounts (type: savings)",
  },
  {
    title: "Compte Joint",
    description:
      "与合作伙伴共享的联名账户。 Partager un compte avec votre conjoint, partenaire ou famille.",
    icon: Users,
    features: [
      "2 à 4 titulaires",
      "Accès multi-utilisateurs",
      "Historique partagé",
      "Permissions configurables",
    ],
    api: "/v1/accounts (type: joint)",
  },
  {
    title: "Compte Entreprise",
    description:
      "专为企业和自由职业者设计的专业账户。 Solution complète pour les professionnels et entreprises.",
    icon: Building2,
    features: [
      "Gestion d'équipe (multi-utilisateurs)",
      "Facturation intégrée",
      "Export comptable (CSV, PDF)",
      "API complète",
    ],
    api: "/v1/accounts (type: business)",
  },
];

const features = [
  {
    title: "IBAN Européen",
    description:
      "Obtenez un IBAN français valide (FR76...) pour recevoir des virements depuis toute l'Europe et internationalement.",
    icon: Globe,
  },
  {
    title: "Virements SEPA Instant",
    description:
      "Effectuez des virements SEPA instantanés 24h/24 et 7j/7 vers plus de 3 000 banques européennes.",
    icon: Zap,
  },
  {
    title: "Sécurité Renforcée",
    description:
      "Protection par authentification forte (2FA), surveillance des opérations et alertes en temps réel.",
    icon: Shield,
  },
  {
    title: "Multi-devises",
    description:
      "Gérez des comptes en EUR, USD, GBP et autres devises avec conversion au taux du marché.",
    icon: DollarSign,
  },
  {
    title: "Historique Complet",
    description:
      "Historique des transactions illimité, exportable en CSV ou PDF pour votre comptabilité.",
    icon: FileText,
  },
  {
    title: "Intérêts Quotidiens",
    description:
      "Les intérêts de votre épargne sont calculés quotidiennement et CAPITALISÉS chaque mois.",
    icon: TrendingUp,
  },
];

const usageExamples = [
  {
    title: "Créer un compte courant",
    description: "Créez un compte pour un nouveau client particulier.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "current",
    "currency": "EUR",
    "holder_name": "Jean Dupont",
    "holder_type": "individual"
  }'`,
    response: `{
  "id": "acc_xyz789",
  "type": "current",
  "iban": "FR7630006000011234567890189",
  "bic": "NPSYFRPPXXX",
  "status": "active",
  "balance": { "available": 0, "current": 0 }
}`,
  },
  {
    title: "Obtenir le solde",
    description: "Récupérez le solde actuel d'un compte.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_xyz789/balance \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "account_id": "acc_xyz789",
  "available": 5234.50,
  "current": 5234.50,
  "currency": "EUR"
}`,
  },
  {
    title: "Lister les comptes",
    description: "Récupérez tous vos comptes.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    { "id": "acc_001", "type": "current", "balance": 5234.50 },
    { "id": "acc_002", "type": "savings", "balance": 15000.00 }
  ],
  "total": 2
}`,
  },
];

export default function AccountsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Wallet className="w-4 h-4" />
          Produits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Comptes <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos comptes bancaires adaptés à tous vos besoins : particulier, professionnel ou
          entreprise. IBAN français, virements SEPA instantanés, épargne rémunérée.
        </p>
      </section>

      {/* Account Types */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de comptes</h2>
        <p className="text-muted-foreground">
          Choisissez le type de compte qui correspond à votre profil et vos besoins.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {accountTypes.map((account, index) => {
            const Icon = account.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.title}</CardTitle>
                      <span className="text-xs text-muted-foreground font-mono">{account.api}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{account.description}</p>
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

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
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

      {/* API Examples */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Intégration API</h2>
        </div>
        <p className="text-muted-foreground">
          Gérez vos comptes programmatiquement via notre API REST. Voici quelques exemples courants
          :
        </p>

        <div className="space-y-6">
          {usageExamples.map((example, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{example.code}</pre>
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

      {/* Limits & Pricing */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Limites et Tarifs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Limites par compte</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Virement SEPA standard</span>
                  <span className="font-medium">Illimité</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Virement SEPA Instant</span>
                  <span className="font-medium">100 000€/jour</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Dépôt espèces</span>
                  <span className="font-medium">3 000€/mois</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Retrait DAB</span>
                  <span className="font-medium">500€/jour</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tarifs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Ouverture compte</span>
                  <span className="font-medium">Gratuit</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Gestion compte</span>
                  <span className="font-medium">Gratuit</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Virements entrants</span>
                  <span className="font-medium">Gratuit</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Virements sortants</span>
                  <span className="font-medium">Gratuit (SEPA)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ouvrir un compte</h2>
            <p className="text-muted-foreground">
              Créez votre compte en quelques minutes et commencez à gérer vos finances.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/register">
                Ouvrir un compte <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/quick-start">Guide API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
