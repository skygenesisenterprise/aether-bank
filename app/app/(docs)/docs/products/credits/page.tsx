"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard as CreditIcon,
  Home,
  Car,
  CheckCircle,
  Clock,
  Shield,
  TrendingUp,
  Calculator,
  FileText,
  Lock,
  Code,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Zap,
  AlertCircle,
  Globe,
  User,
  Building2,
  Webhook,
  Copy,
} from "lucide-react";

const creditTypes = [
  {
    title: "Crédit Consommation",
    description:
      "Financement pour vos projets personnels : voyage, mariage, travaux ou équipement. Réponse rapide et sans frais de dossier.",
    icon: CreditIcon,
    api: "/v1/credits/applications (type: consumer)",
    amount: "1 000€ - 50 000€",
    duration: "6 - 84 mois",
    rate: "3,9% - 9,9% TAEG",
    features: [
      "Réponse en quelques minutes",
      "Sans frais de dossier",
      "TAEG fixe garanti",
      "Remboursement anticipé gratuit",
    ],
  },
  {
    title: "Crédit Immobilier",
    description:
      "Financez l'achat de votre résidence principale ou secondaire avec des taux compétitifs et une assurance emprunteur incluse.",
    icon: Home,
    api: "/v1/credits/applications (type: mortgage)",
    amount: "Jusqu'à 100% du projet",
    duration: "60 - 360 mois",
    rate: "À partir de 2,5% TAEG",
    features: [
      "Taux négociés",
      "Assurance incluse",
      "Aide au montage de dossier",
      "Flexibilité des mensualités",
    ],
  },
  {
    title: "Crédit Professionnel",
    description:
      "Développez votre activité avec un financement adapté aux besoins des entreprises et auto-entrepreneurs.",
    icon: Building2,
    api: "/v1/credits/applications (type: business)",
    amount: "10 000€ - 300 000€",
    duration: "12 - 84 mois",
    rate: "4,5% - 8% TAEG",
    features: [
      "Sans apport obligatoire",
      "Gestion en ligne 24/7",
      "Décision sous 48h",
      "Décaissement rapide",
    ],
  },
  {
    title: "Crédit Auto",
    description:
      "Financez l'achat de votre véhicule neuf ou d'occasion avec des conditions préférentielles et un processus simplifié.",
    icon: Car,
    api: "/v1/credits/applications (type: auto)",
    amount: "2 000€ - 100 000€",
    duration: "12 - 84 mois",
    rate: "À partir de 2,9% TAEG",
    features: [
      "Véhicule neuf ou occasion",
      "Sans frais de dossier",
      "Remise partenaire",
      "Couverture assurance optionnelle",
    ],
  },
];

const concepts = [
  {
    title: "Demande de crédit",
    description:
      "Requête initiale contenant le montant, durée et motif. Analyse automatisée du risque.",
    icon: FileText,
  },
  {
    title: "Scoring credit",
    description: "Évaluation algorithmique basée sur l'historique financier et les données KYC.",
    icon: User,
  },
  {
    title: "Contrat de prêt",
    description: "Document légal stipulant les conditions : taux, mensualités, durée, garanties.",
    icon: Shield,
  },
  {
    title: "Amortissement",
    description: "Remboursement progressif du capital + intérêts selon un échéancier défini.",
    icon: TrendingUp,
  },
];

const applicationFlow = [
  { step: 1, status: "submitted", label: "Soumis", description: "Demande reçue" },
  { step: 2, status: "under_review", label: "En revue", description: "Analyse en cours" },
  { step: 3, status: "documents", label: "Documents", description: "Pièces justificatives" },
  { step: 4, status: "approved", label: "Approuvé", description: "Décision positive" },
  { step: 5, status: "contracted", label: "Signé", description: "Contrat validé" },
];

const codeExamples = {
  createApplication: {
    title: "Créer une demande de crédit",
    description: "Initiez une nouvelle demande de crédit consommation.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/applications \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "consumer",
    "amount": 1500000,
    "currency": "EUR",
    "duration_months": 48,
    "purpose": "home_improvement",
    "income": 320000,
    "employment_status": "employed",
    "housing_status": "owner",
    "metadata": {
      "source": "website",
      "campaign": "spring_2024"
    }
  }'`,
    response: `{
  "id": "cra_xyz789",
  "type": "consumer",
  "status": "under_review",
  "amount": 1500000,
  "currency": "EUR",
  "duration_months": 48,
  "purpose": "home_improvement",
  "estimated_rate": 5.9,
  "estimated_monthly": 34482,
  "created_at": "2024-01-15T10:00:00Z",
  "next_steps": [
    "identity_verification",
    "income_proof_required"
  ]
}`,
  },
  simulate: {
    title: "Simuler les mensualités",
    description: "Calculez les mensualités et le coût total sans créer de demande.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/simulate \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2500000,
    "duration_months": 60,
    "rate": 4.5,
    "insurance": true,
    "insurance_rate": 0.3
  }'`,
    response: `{
  "amount": 2500000,
  "duration_months": 60,
  "rate": 4.5,
  "monthly_payment": 46667,
  "total_interest": 3000200,
  "total_cost": 28000200,
  "insurance_cost_per_month": 7500,
  "annual_rate": 4.5,
  "apr": 5.2,
  "breakdown": {
    "capital": 2500000,
    "total_interests": 3000200,
    "total_insurance": 450000
  }
}`,
  },
  getApplication: {
    title: "Suivre une demande",
    description: "Récupérez le statut et les détails d'une demande existante.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/applications/cra_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "cra_xyz789",
  "type": "consumer",
  "status": "documents",
  "stage": "income_verification",
  "progress": 60,
  "amount": 1500000,
  "currency": "EUR",
  "duration_months": 48,
  "estimated_rate": 5.9,
  "estimated_monthly": 34482,
  "documents_required": [
    {
      "type": "identity_proof",
      "status": "approved",
      "uploaded_at": "2024-01-15T10:05:00Z"
    },
    {
      "type": "income_proof",
      "status": "pending",
      "required_by": "2024-01-17T23:59:59Z"
    }
  ],
  "estimated_decision": "2024-01-18T10:00:00Z",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T12:30:00Z"
}`,
  },
  listApplications: {
    title: "Lister les demandes",
    description: "Récupérez l'historique paginé de vos demandes de crédit.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/credits/applications?status=approved&limit=10" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "cra_xyz789",
      "type": "consumer",
      "status": "approved",
      "amount": 1500000,
      "duration_months": 48,
      "estimated_rate": 5.9,
      "created_at": "2024-01-15T10:00:00Z"
    },
    {
      "id": "cra_abc123",
      "type": "auto",
      "status": "contracted",
      "amount": 2500000,
      "duration_months": 36,
      "actual_rate": 3.9,
      "contract_signed_at": "2024-01-10T14:00:00Z"
    }
  ],
  "total": 2,
  "limit": 10,
  "offset": 0
}`,
  },
};

const webhookEvents = [
  { event: "credit.application.created", description: "Nouvelle demande soumise" },
  { event: "credit.application.status_changed", description: "Changement de statut" },
  { event: "credit.application.approved", description: "Crédit approuvé" },
  { event: "credit.application.rejected", description: "Crédit refusé" },
  { event: "credit.contract.signed", description: "Contrat signé" },
  { event: "credit.payment.due", description: "Échéance de paiement" },
  { event: "credit.payment.received", description: "Paiement reçu" },
];

export default function CreditsPage() {
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
          <CreditIcon className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Crédits <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour les demandes de crédit, simulation et gestion. Intégrez nos services de
          financement dans votre application.
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
              href="#flux"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Flux de demande
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
              href="#comparatif"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Comparatif
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Crédits d'Aether Bank permet de soumettre, simuler et suivre des demandes de crédit
          programmatiquement. Elle prend en charge les crédits consommation, immobilier,
          professionnel et auto. Le processus est entièrement digitalisé avec une décision
          automatisée basée sur le scoring credit et la vérification KYC.
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
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">Scoring automatisé</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Les demandes sont analysées automatiquement via notre moteur de scoring. Les clients
              reçoivent une réponse de principe en quelques minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Types de crédits */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de crédits</h2>
        <p className="text-muted-foreground">
          Choisissez le type de crédit adapté à votre cas d'usage. Chaque type possède ses propres
          endpoints et paramètres spécifiques.
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
      </section>

      {/* Flux de demande */}
      <section id="flux" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Flux de demande</h2>
        <p className="text-muted-foreground">
          Voici les étapes d'une demande de crédit, de la soumission à la signature du contrat.
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {applicationFlow.map((step, i) => (
                <div key={step.step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <span className="mt-2 text-xs font-medium text-center">{step.label}</span>
                    <span className="text-xs text-muted-foreground text-center">
                      {step.description}
                    </span>
                  </div>
                  {i < applicationFlow.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground mx-2 rotate-90 md:rotate-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Documents requis
                </h4>
              </div>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 ml-7">
                <li>Pièce d'identité en cours de validité</li>
                <li>Justificatif de domicile (-3 mois)</li>
                <li>3 derniers bulletins de salaire ou avis d'imposition</li>
                <li>RIB du compte de remboursement</li>
              </ul>
            </div>
          </CardContent>
        </Card>
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
                <code className="text-sm font-mono">/v1/credits/applications</code>
                <span className="text-xs text-muted-foreground ml-auto">Créer une demande</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-2">
                <p className="font-medium">Corps de la requête</p>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - consumer |
                    mortgage | business | auto
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">amount</code> - Montant en
                    centimes
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">duration_months</code> - 6 à 360
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">purpose</code> - Motif du crédit
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">income</code> - Revenu mensuel
                    (centimes)
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">currency</code> - EUR, USD...
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
                <code className="text-sm font-mono">/v1/credits/simulate</code>
                <span className="text-xs text-muted-foreground ml-auto">Simuler sans créer</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-2">
                <p className="font-medium">Paramètres</p>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">amount</code> - Montant souhaité
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">duration_months</code> - Durée
                    souhaitée
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">rate</code> - Taux annuel (%)
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">insurance</code> - Avec/sans
                    assurance
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
                <code className="text-sm font-mono">/v1/credits/applications/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">Détails d'une demande</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <span>
                  <code className="text-xs bg-muted px-1 rounded">id</code> - ID de la demande
                  (cra_xxx)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/credits/applications</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les demandes</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm space-y-2">
                <p className="font-medium">Filtres disponibles</p>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - submitted |
                    under_review | approved | rejected
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - consumer |
                    mortgage | business | auto
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">limit</code> - Pagination (max
                    100)
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">offset</code> - Offset de
                    pagination
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Exemples de code */}
      <section id="exemples" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Exemples de code</h2>
        <p className="text-muted-foreground">
          Exemples concrets d'utilisation de l'API Credits. Testez directement dans le sandbox.
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
          Configurez des webhooks pour suivre en temps réel l'évolution de vos demandes de crédit.
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

      {/* Comparatif */}
      <section id="comparatif" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Comparatif des crédits</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Critère</th>
                <th className="text-center p-4 font-semibold">Consommation</th>
                <th className="text-center p-4 font-semibold">Immobilier</th>
                <th className="text-center p-4 font-semibold">Professionnel</th>
                <th className="text-center p-4 font-semibold">Auto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-medium">Montant max</td>
                <td className="text-center p-4 text-sm">50 000€</td>
                <td className="text-center p-4 text-sm">Sans limite</td>
                <td className="text-center p-4 text-sm">300 000€</td>
                <td className="text-center p-4 text-sm">100 000€</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Durée max</td>
                <td className="text-center p-4 text-sm">84 mois</td>
                <td className="text-center p-4 text-sm">360 mois</td>
                <td className="text-center p-4 text-sm">84 mois</td>
                <td className="text-center p-4 text-sm">84 mois</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Taux dès</td>
                <td className="text-center p-4 text-sm">3,9% TAEG</td>
                <td className="text-center p-4 text-sm">2,5% TAEG</td>
                <td className="text-center p-4 text-sm">4,5% TAEG</td>
                <td className="text-center p-4 text-sm">2,9% TAEG</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Réponse instantanée</td>
                <td className="text-center p-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">—</span>
                </td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">—</span>
                </td>
                <td className="text-center p-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Sans apport</td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">—</span>
                </td>
                <td className="text-center p-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="text-center p-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">—</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Assurance incluse</td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">—</span>
                </td>
                <td className="text-center p-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">—</span>
                </td>
                <td className="text-center p-4">
                  <span className="text-muted-foreground">Option</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à intégrer ?</h2>
            <p className="text-muted-foreground">
              Créez votre compte développeur et commencez à tester l'API crédits dans le sandbox.
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
                Toutes les APIs <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
