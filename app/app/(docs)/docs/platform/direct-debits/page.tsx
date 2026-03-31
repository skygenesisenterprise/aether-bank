"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileCheck,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Copy,
  ChevronRight,
  Zap,
  Shield,
  Webhook,
} from "lucide-react";

const mandateTypes = [
  {
    title: "SEPA Core",
    description:
      "Prélèvement SEPA standard pour paiements récurrents. Le créancier peutInitiier le prélèvement à tout moment.",
    api: "mandate_type: sepa_core",
    features: ["Récurrent", " Flexible", "Large adoption"],
  },
  {
    title: "SEPA B2B",
    description:
      "Prélèvement SEPA inter-entreprises avec vérification obligatoire du mandat. Plus sécurisé.",
    api: "mandate_type: sepa_b2b",
    features: ["Professionnel", "Vérification obligatoire", "Remboursement limité"],
  },
];

const directDebitStatuses = [
  { status: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { status: "validated", label: "Validé", color: "bg-blue-100 text-blue-700" },
  { status: "executed", label: "Exécuté", color: "bg-green-100 text-green-700" },
  { status: "rejected", label: "Rejeté", color: "bg-red-100 text-red-700" },
  { status: "cancelled", label: "Annulé", color: "bg-gray-100 text-gray-700" },
  { status: "refunded", label: "Remboursé", color: "bg-purple-100 text-purple-700" },
];

const concepts = [
  {
    title: "Mandat de prélèvement",
    description: "Autorisation écrite du débiteur permettant au créancier de prélever des fonds.",
    icon: FileCheck,
  },
  {
    title: "Créancier",
    description:
      "L'entreprise ou organisation qui initie le prélèvement (ex: EDF, opérateur télécom).",
    icon: Shield,
  },
  {
    title: "Débiteur",
    description: "Le client qui autorise le prélèvement et dont le compte est débité.",
    icon: RefreshCw,
  },
  {
    title: "RUM",
    description:
      "Référence Unique de Mandat. Identifiant du mandat dans le système bancaire européen.",
    icon: FileCheck,
  },
];

const codeExamples = {
  createMandate: {
    title: "Créer un mandat",
    description: "Créez un nouveau mandat de prélèvement SEPA.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/direct-debits/mandates \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "sepa_core",
    "creditor_name": "EDF France",
    "creditor_iban": "FR7630006000011234567890189",
    "creditor_bic": "NPSYFRPPXXX",
    "debtor_iban": "FR7630006000011234567890190",
    "reference": "EDF-MANDAT-001"
  }'`,
    response: `{
  "id": "mand_xyz789",
  "type": "sepa_core",
  "rum": "FR29ZZZ123456789",
  "status": "pending",
  "creditor": {
    "name": "EDF France",
    "iban": "FR7630006000011234567890189"
  },
  "debtor_iban": "FR7630006000011234567890190",
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  createDirectDebit: {
    title: "Créer un prélèvement",
    description: "Initiez un prélèvement sur un compte avec mandat valide.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/direct-debits \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "mandate_id": "mand_xyz789",
    "amount": 14500,
    "currency": "EUR",
    "description": "Facture EDF Mars 2024",
    "scheduled_date": "2024-01-20"
  }'`,
    response: `{
  "id": "dd_abc123",
  "mandate_id": "mand_xyz789",
  "amount": 14500,
  "currency": "EUR",
  "status": "pending",
  "description": "Facture EDF Mars 2024",
  "scheduled_date": "2024-01-20",
  "created_at": "2024-01-15T10:30:00Z"
}`,
  },
  getDirectDebit: {
    title: "Détails d'un prélèvement",
    description: "Récupérez les détails d'un prélèvement.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/direct-debits/dd_abc123 \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "dd_abc123",
  "mandate_id": "mand_xyz789",
  "amount": 14500,
  "currency": "EUR",
  "status": "executed",
  "description": "Facture EDF Mars 2024",
  "scheduled_date": "2024-01-20",
  "executed_at": "2024-01-20T08:00:00Z",
  "creditor": {
    "name": "EDF France"
  }
}`,
  },
  cancelMandate: {
    title: "Annuler un mandat",
    description: "Annulez un mandat de prélèvement.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/direct-debits/mandates/mand_xyz789/cancel \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "id": "mand_xyz789",
  "status": "cancelled",
  "cancelled_at": "2024-01-15T14:00:00Z"
}`,
  },
};

const webhookEvents = [
  { event: "direct_debit.mandate.created", description: "Mandat créé" },
  { event: "direct_debit.mandate.validated", description: "Mandat validé" },
  { event: "direct_debit.mandate.cancelled", description: "Mandat annulé" },
  { event: "direct_debit.created", description: "Prélèvement créé" },
  { event: "direct_debit.executed", description: "Prélèvement exécuté" },
  { event: "direct_debit.rejected", description: "Prélèvement rejeté" },
  { event: "direct_debit.refunded", description: "Prélèvement remboursé" },
];

const mockDirectDebits = [
  {
    id: "dd_abc123",
    creditor: "EDF France",
    debtor: "Jean Dupont",
    amount: 145.0,
    mandate: "MAND-001",
    status: "executed",
    date: "2026-03-31",
  },
  {
    id: "dd_def456",
    creditor: "Orange",
    debtor: "Marie Martin",
    amount: 49.99,
    mandate: "MAND-002",
    status: "pending",
    date: "2026-04-01",
  },
  {
    id: "dd_ghi789",
    creditor: "AXA Assurance",
    debtor: "Pierre Durant",
    amount: 89.0,
    mandate: "MAND-003",
    status: "rejected",
    date: "2026-03-30",
  },
];

export default function PlatformDirectDebitsPage() {
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
          <FileCheck className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Prélèvements <span className="text-primary">automatiques</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour gérer les mandats de prélèvement SEPA et les opérations de débit
          automatique. Créez, suivez et annulez les prélèvements programmatiquement.
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
              Transferts <ChevronRight className="w-4 h-4 ml-2" />
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
              <ChevronRight className="w-4 h-4" /> Types de mandats
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
          L'API Prélèvements permet de gérer les mandats SEPA et d'initier des prélèvements
          automatiques. Le système utilise le стандарт SEPA (Single Euro Payments Area) pour les
          paiements européens. Chaque mandat est identifié par un RUM (Référence Unique de Mandat)
          conforme à la norme européenne.
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
            <h3 className="font-semibold mb-2">Standard</h3>
            <code className="text-sm text-primary">SEPA Core / B2B</code>
          </div>
        </div>
      </section>

      {/* Types de mandats */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de mandats</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mandateTypes.map((mandate, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{mandate.title}</CardTitle>
                    <code className="text-xs text-muted-foreground">{mandate.api}</code>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mandate.description}</p>
                <ul className="space-y-2">
                  {mandate.features.map((feature, i) => (
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
      <section id="statuts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Statuts des prélèvements</h2>
        <div className="flex flex-wrap gap-3">
          {directDebitStatuses.map((s) => (
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
                <code className="text-sm font-mono">/v1/direct-debits/mandates</code>
                <span className="text-xs text-muted-foreground ml-auto">Créer un mandat</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">type</code> - sepa_core |
                    sepa_b2b
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">creditor_name</code> - Nom du
                    créancier
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">creditor_iban</code> - IBAN
                    créancier
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">debtor_iban</code> - IBAN
                    débiteur
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
                <code className="text-sm font-mono">/v1/direct-debits</code>
                <span className="text-xs text-muted-foreground ml-auto">Créer un prélèvement</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">mandate_id</code> - ID du mandat
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">amount</code> - Montant en
                    centimes
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">currency</code> - EUR uniquement
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">scheduled_date</code> - Date
                    d'exécution
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
                <code className="text-sm font-mono">/v1/direct-debits/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Détails d'un prélèvement
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
                <code className="text-sm font-mono">/v1/direct-debits/mandates</code>
                <span className="text-xs text-muted-foreground ml-auto">Lister les mandats</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">
                  /v1/direct-debits/mandates/{"{id}"}/cancel
                </code>
                <span className="text-xs text-muted-foreground ml-auto">Annuler un mandat</span>
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
          Gérez visuellement les mandats et prélèvements depuis le dashboard.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Prélèvements récents</h3>
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
                <th className="px-4 py-3 text-left text-sm font-medium">Créancier</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Débiteur</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockDirectDebits.map((dd) => (
                <tr key={dd.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{dd.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{dd.creditor}</td>
                  <td className="px-4 py-3 text-sm">{dd.debtor}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono">
                    {dd.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        dd.status === "executed"
                          ? "bg-green-100 text-green-700"
                          : dd.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dd.status === "executed"
                        ? "Exécuté"
                        : dd.status === "pending"
                          ? "En attente"
                          : "Rejeté"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{dd.date}</td>
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
            <h2 className="text-xl font-semibold mb-2">Prêt à intégrer ?</h2>
            <p className="text-muted-foreground">
              Testez l'API prélèvements dans le sandbox ou consultez les autres APIs.
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
