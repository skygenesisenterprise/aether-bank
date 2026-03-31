"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Copy,
  ChevronRight,
  Zap,
  Home,
  Building2,
  CreditCard,
  Calculator,
  Bell,
  Webhook,
  TrendingUp,
} from "lucide-react";

const creditTypes = [
  {
    title: "Crédit Consommation",
    type: "CONSUMER",
    api: "/v1/credits (type: consumer)",
    description:
      "Financement pour les projets personnels : voyage, mariage, travaux ou équipement.",
    icon: CreditCard,
    amount: "1 000€ - 50 000€",
    duration: "6 - 84 mois",
    rate: "3,9% - 9,9% TAEG",
    features: ["Réponse en minutes", "Sans frais dossier", "TAEG fixe", "Remboursement anticipé"],
  },
  {
    title: "Crédit Professionnel",
    type: "BUSINESS",
    api: "/v1/credits (type: business)",
    description:
      "Financement pour développer votre activité : investissement, trésorerie, expansion.",
    icon: Building2,
    amount: "10 000€ - 300 000€",
    duration: "12 - 84 mois",
    rate: "4,5% - 8% TAEG",
    features: ["Sans apport", "Décision 48h", "Décaissement rapide", "Gestion en ligne"],
  },
  {
    title: "Crédit Immobilier",
    type: "MORTGAGE",
    api: "/v1/credits (type: mortgage)",
    description: "Financement pour l'achat de résidence principale ou investissement locatif.",
    icon: Home,
    amount: "Jusqu'à 100% projet",
    duration: "60 - 360 mois",
    rate: "À partir de 2,5% TAEG",
    features: ["Taux négociés", "Assurance incluse", "Aide montage", "Flexibilité"],
  },
  {
    title: "Crédit Auto",
    type: "AUTO",
    api: "/v1/credits (type: auto)",
    description:
      "Financement pour l'achat de véhicule neuf ou d'occasion avec conditions préférentielles.",
    icon: TrendingUp,
    amount: "2 000€ - 100 000€",
    duration: "12 - 84 mois",
    rate: "À partir de 2,9% TAEG",
    features: [
      "Véhicule neuf/occas",
      "Sans frais dossier",
      "Remise partenaire",
      "Assurance optionnelle",
    ],
  },
];

const creditStatuses = [
  { status: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { status: "under_review", label: "En revue", color: "bg-blue-100 text-blue-700" },
  { status: "approved", label: "Approuvé", color: "bg-green-100 text-green-700" },
  { status: "rejected", label: "Refusé", color: "bg-red-100 text-red-700" },
  { status: "active", label: "Actif", color: "bg-green-100 text-green-700" },
  { status: "completed", label: "Terminé", color: "bg-gray-100 text-gray-700" },
  { status: "defaulted", label: "Impayé", color: "bg-red-100 text-red-700" },
];

const concepts = [
  {
    title: "Scoring credit",
    description:
      "Évaluation algorithmique du risque basée sur l'historique financier et les données KYC.",
    icon: BarChart3,
  },
  {
    title: "Amortissement",
    description: "Remboursement progressif du capital + intérêts selon un échéancier défini.",
    icon: TrendingUp,
  },
  {
    title: "TAEG",
    description:
      "Taux Annuel Effectif Global incluant tous les frais. Indicateur normalisé pour comparer.",
    icon: Calculator,
  },
  {
    title: "Garanties",
    description: "Caution, hypothèque ou assurance可选 pour sécuriser le prêt.",
    icon: Shield,
  },
];

function Shield({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

const codeExamples = {
  listCredits: {
    title: "Lister les crédits",
    description: "Récupérez la liste des crédits avec filtres optionnels.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/credits?status=active&type=consumer&limit=20" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "crd_xyz789",
      "type": "consumer",
      "status": "active",
      "holder_id": "usr_abc123",
      "amount": 1500000,
      "currency": "EUR",
      "remaining_amount": 1250000,
      "monthly_payment": 34482,
      "interest_rate": 5.9,
      "duration_months": 48,
      "next_payment_date": "2024-02-15",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}`,
  },
  getCredit: {
    title: "Détails d'un crédit",
    description: "Obtenez les détails complets d'un crédit avec échéancier.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/crd_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "crd_xyz789",
  "type": "consumer",
  "status": "active",
  "holder": {
    "id": "usr_abc123",
    "name": "Jean Dupont"
  },
  "amount": 1500000,
  "currency": "EUR",
  "interest_rate": 5.9,
  "apr": 6.5,
  "duration_months": 48,
  "monthly_payment": 34482,
  "remaining_amount": 1250000,
  "remaining_payments": 40,
  "next_payment_date": "2024-02-15",
  "total_interest": 155000,
  "start_date": "2024-01-15",
  "end_date": "2027-12-15"
}`,
  },
  getSchedule: {
    title: "Échéancier de remboursement",
    description: "Récupérez le tableau d'amortissement complet.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/crd_xyz789/schedule \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "credit_id": "crd_xyz789",
  "schedule": [
    {
      "month": 1,
      "date": "2024-02-15",
      "payment": 34482,
      "principal": 27132,
      "interest": 7350,
      "remaining_balance": 1472868
    },
    {
      "month": 2,
      "date": "2024-03-15",
      "payment": 34482,
      "principal": 27265,
      "interest": 7217,
      "remaining_balance": 1445603
    }
  ],
  "total_payments": 48,
  "total_interest": 155000
}`,
  },
  getPayments: {
    title: "Historique des paiements",
    description: "Récupérez l'historique des remboursements effectués.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/crd_xyz789/payments?status=completed" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "pmt_001",
      "credit_id": "crd_xyz789",
      "amount": 34482,
      "currency": "EUR",
      "status": "completed",
      "payment_date": "2024-02-15",
      "principal": 27132,
      "interest": 7350
    }
  ],
  "total": 1
}`,
  },
};

const webhookEvents = [
  { event: "credit.application.created", description: "Nouvelle demande" },
  { event: "credit.application.status_changed", description: "Changement de statut" },
  { event: "credit.approved", description: "Crédit approuvé" },
  { event: "credit.rejected", description: "Crédit refusé" },
  { event: "credit.payment.due", description: "Échéance de paiement" },
  { event: "credit.payment.received", description: "Paiement reçu" },
  { event: "credit.payment.late", description: "Paiement en retard" },
];

const mockCredits = [
  {
    id: "crd_xyz789",
    holder: "Jean Dupont",
    type: "CONSUMER",
    amount: 15000,
    remaining: 12500,
    status: "active",
    nextPayment: "2026-04-15",
  },
  {
    id: "crd_abc123",
    holder: "Marie Martin",
    type: "BUSINESS",
    amount: 50000,
    remaining: 45000,
    status: "active",
    nextPayment: "2026-04-01",
  },
  {
    id: "crd_def456",
    holder: "Pierre Durant",
    type: "CONSUMER",
    amount: 8000,
    remaining: 8000,
    status: "pending",
    nextPayment: "-",
  },
];

export default function PlatformCreditsPage() {
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
          <BarChart3 className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">crédits</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour gérer les demandes de crédit, suivre les remboursements et automatiser
          les relances. Scoring intégré et tableau d'amortissement.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/products/credits">
              Produits crédits <ChevronRight className="w-4 h-4 ml-2" />
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
              <ChevronRight className="w-4 h-4" /> Types de crédits
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
              <ChevronRight className="w-4 h-4" /> Statuts
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
          L'API Crédits permet de gérer programmatiquement les demandes de financement, le suivi des
          remboursements et la consultation des échéanciers. Le système intègre un scoring credit
          automatisé pour les décisions rapides et offre des webhooks pour les alertes de paiement.
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

      {/* Types de crédits */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de crédits</h2>
        <p className="text-muted-foreground">
          Chaque type de crédit possède ses propres caractéristiques : montants, durées et taux.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {creditTypes.map((credit, index) => {
            const Icon = credit.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{credit.title}</CardTitle>
                      <code className="text-xs text-muted-foreground">{credit.api}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{credit.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">Montant</p>
                      <p className="text-sm font-medium">{credit.amount}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">Durée</p>
                      <p className="text-sm font-medium">{credit.duration}</p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">Taux</p>
                      <p className="text-sm font-medium">{credit.rate}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {credit.features.map((feature, i) => (
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
        <h2 className="text-2xl font-bold">Statuts des crédits</h2>
        <div className="flex flex-wrap gap-3">
          {creditStatuses.map((s) => (
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
                <code className="text-sm font-mono">/v1/credits</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les crédits</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - pending | active
                    | completed
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - consumer |
                    business | mortgage
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
                <code className="text-sm font-mono">/v1/credits/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Détails d'un crédit</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/credits/{"{id}"}/schedule</code>
                <span className="text-xs text-muted-foreground ml-auto">Échéancier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/credits/{"{id}"}/payments</code>
                <span className="text-xs text-muted-foreground ml-auto">Historique paiements</span>
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
        <p className="text-muted-foreground">Gérez visuellement vos crédits depuis le dashboard.</p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Crédits en cours</h3>
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
                <th className="px-4 py-3 text-left text-sm font-medium">Bénéficiaire</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Restant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Prochain</th>
              </tr>
            </thead>
            <tbody>
              {mockCredits.map((credit) => (
                <tr key={credit.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{credit.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{credit.holder}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {credit.type === "CONSUMER"
                        ? "Consommation"
                        : credit.type === "BUSINESS"
                          ? "Professionnel"
                          : "Immobilier"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {credit.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {credit.remaining.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        credit.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {credit.status === "active" ? "Actif" : "En attente"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{credit.nextPayment}</td>
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
        <p className="text-muted-foreground">
          Configurez des webhooks pour être notifié des événements liés aux crédits.
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
            <h2 className="text-xl font-semibold mb-2">Prêt à gérer vos crédits ?</h2>
            <p className="text-muted-foreground">
              Testez l'API dans le sandbox ou consultez la documentation produits.
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
              <Link href="/docs/products/credits">
                Produits crédits <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
