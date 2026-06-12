"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scale,
  Shield,
  CheckCircle,
  FileText,
  Globe,
  Lock,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle as CheckCircleIcon,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Zap,
  Clock,
  RefreshCw,
  UserCheck,
  AlertTriangle,
  Eye,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Tests de conformité fictifs",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Conformité réelle",
    color: "green",
    icon: Shield,
  },
];

const regulations = [
  {
    title: "RGPD",
    description: "Protection des données personnelles avec droit à l'effacement et portabilité.",
    icon: Shield,
    details: ["Droit à l'effacement", "Portabilité", "Consentement explicite"],
  },
  {
    title: "PSD2",
    description: "Directive européenne pour l'Open Banking et l'authentification forte.",
    icon: Globe,
    details: ["SCA obligatoire", "Open Banking API", "AISP/PISP"],
  },
  {
    title: "AML/KYC",
    description: "Lutte contre le blanchiment d'argent et vérification d'identité.",
    icon: Lock,
    details: ["Vérification KYC", "Sanctions screening", "EBF reporting"],
  },
  {
    title: "PCI DSS",
    description: "Standard de sécurité pour les données de cartes de paiement.",
    icon: Scale,
    details: ["Niveau 1", "Chiffrement AES-256", "Audit annuel"],
  },
];

const concepts = [
  {
    title: "KYC automatisé",
    description: "Vérification d'identité en temps réel avec documents officiels.",
    icon: UserCheck,
  },
  {
    title: "Surveillance AML",
    description: "Détection des transactions suspectes avec scoring de risque.",
    icon: AlertTriangle,
  },
  {
    title: "Audit trail",
    description: "Historique complet et immuable de toutes les opérations.",
    icon: Eye,
  },
  {
    title: "Rapports automatiques",
    description: "Génération des déclarations pour les autorités compétentes.",
    icon: FileText,
  },
];

const endpoints = [
  {
    method: "POST",
    path: "/compliance/kyc/verify",
    description: "Lancer une vérification KYC",
    parameters: ["user_id", "document_type", "document_number", "date_of_birth"],
  },
  {
    method: "GET",
    path: "/compliance/kyc/:user_id",
    description: "Statut KYC d'un utilisateur",
    parameters: ["user_id"],
  },
  {
    method: "POST",
    path: "/compliance/screening/sanctions",
    description: "Vérifier les sanctions",
    parameters: ["name", "date_of_birth", "country"],
  },
  {
    method: "POST",
    path: "/compliance/screening/peps",
    description: "Vérifier les PEPs",
    parameters: ["name", "date_of_birth"],
  },
  {
    method: "POST",
    path: "/compliance/report/suspicious",
    description: "Signaler une activité suspecte",
    parameters: ["user_id", "transaction_id", "reason", "evidence"],
  },
  {
    method: "GET",
    path: "/compliance/audit/:user_id",
    description: "Historique d'audit",
    parameters: ["user_id", "from_date", "to_date"],
  },
  {
    method: "GET",
    path: "/compliance/reports",
    description: "Liste des rapports réglementaires",
    parameters: ["type", "from_date", "to_date"],
  },
];

const webhookEvents = [
  {
    event: "compliance.kyc.completed",
    description: "Vérification KYC terminée",
    payload: "user_id, status, verified_at",
  },
  {
    event: "compliance.kyc.failed",
    description: "Échec de vérification KYC",
    payload: "user_id, reason, failed_at",
  },
  {
    event: "compliance.alert.created",
    description: "Alerte de conformité créée",
    payload: "alert_id, type, severity, user_id",
  },
  {
    event: "compliance.report.generated",
    description: "Rapport généré",
    payload: "report_id, type, period, download_url",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  kycVerify: {
    title: "Vérification KYC",
    description: "Lancez une vérification d'identité pour un utilisateur.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/compliance/kyc/verify \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "document_type": "passport",
    "document_number": "AB1234567",
    "date_of_birth": "1990-01-15",
    "nationality": "FR",
    "address": {
      "street": "1 Rue de la Paix",
      "city": "Paris",
      "postal_code": "75001",
      "country": "FR"
    }
  }'

# Réponse:
{
  "verification_id": "ver_abc123",
  "user_id": "usr_xyz789",
  "status": "pending",
  "document_type": "passport",
  "started_at": "2026-03-31T10:00:00Z",
  "estimated_completion": "2026-03-31T10:05:00Z"
}`,
  },
  kycStatus: {
    title: "Statut KYC",
    description: "Vérifiez le statut d'une vérification KYC.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/compliance/kyc/usr_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "user_id": "usr_xyz789",
  "status": "verified",
  "level": "full",
  "verification": {
    "id": "ver_abc123",
    "document_type": "passport",
    "verified_at": "2026-03-31T10:02:00Z",
    "expiry_date": "2031-03-31T00:00:00Z"
  },
  "address_verified": true,
  "pep": false,
  "sanctions": false,
  "risk_score": 15,
  "risk_level": "low"
}`,
  },
  sanctionsScreening: {
    title: "Sanctions screening",
    description: "Vérifiez un individu contre les listes de sanctions.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/compliance/screening/sanctions \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jean Dupont",
    "date_of_birth": "1990-01-15",
    "country": "FR"
  }'

# Réponse:
{
  "result": "clear",
  "name": "Jean Dupont",
  "matched_lists": [],
  "score": 0,
  "screened_at": "2026-03-31T10:00:00Z"
}

# En cas de match:
# {
#   "result": "potential_match",
#   "name": "Jean Dupont",
#   "matched_lists": ["EU Sanctions", "OFAC"],
#   "score": 85,
#   "details_url": "https://api.aetherbank.com/compliance/screening/abc123"
# }`,
  },
  suspiciousReport: {
    title: "Signaler une activité suspecte",
    description: "Créez un rapport d'activité suspecte (SAR).",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/compliance/report/suspicious \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "transaction_id": "trf_abc123",
    "reason": "structuring",
    "description": "Multiple small transactions just below reporting threshold",
    "amount": 950000,
    "currency": "EUR",
    "date": "2026-03-31",
    "evidence": [
      {"type": "transaction_history", "id": "ev_001"},
      {"type": "customer_statement", "id": "ev_002"}
    ]
  }'

# Réponse:
{
  "report_id": "sar_xyz789",
  "status": "submitted",
  "user_id": "usr_xyz789",
  "type": "SAR",
  "submitted_at": "2026-03-31T10:00:00Z",
  "reference": "SAR-2026-03-001"
}`,
  },
};

export default function PlatformCompliancePage() {
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
          <Scale className="w-4 h-4" />
          Platform Compliance
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Conformité</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la conformité réglementaire. KYC, AML, screening sanctions et rapports
          pour les autorités.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/security">
              <Shield className="w-4 h-4 mr-2" />
              Sécurité
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
              href="#regulations"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Réglementations
            </a>
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
              href="#exemples"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Exemples
            </a>
            <a
              href="#certifications"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Certifications
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Réglementations */}
      <section id="regulations" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Réglementations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {regulations.map((reg, index) => {
            const Icon = reg.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{reg.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{reg.description}</p>
                  <div className="flex flex-col gap-1">
                    {reg.details.map((detail, i) => (
                      <span
                        key={i}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        <CheckCircleIcon className="w-3 h-3 text-green-500" />
                        {detail}
                      </span>
                    ))}
                  </div>
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
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/compliance/kyc/verify \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          API complète pour la gestion de la conformité réglementaire.
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
          Recevez des notifications pour les événements de conformité.
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
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
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

      {/* Certifications */}
      <section id="certifications" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Certifications et agréments</h2>
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 dark:bg-green-950/50 dark:border-green-800">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Agréments et certifications
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">ACPR</span>
                  <p className="text-green-700 dark:text-green-300 text-xs">Agrément bancaire</p>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">PCI DSS</span>
                  <p className="text-green-700 dark:text-green-300 text-xs">Niveau 1</p>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">ISO 27001</span>
                  <p className="text-green-700 dark:text-green-300 text-xs">Sécurité</p>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">SOC 2</span>
                  <p className="text-green-700 dark:text-green-300 text-xs">Type II</p>
                </div>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Aether Bank est agréé par l&apos;ACPR (Autorité de Contrôle Prudentiel et de
                Résolution) et respecte les normes les plus strictes de l&apos;industrie bancaire
                européenne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à assurer la conformité ?</h2>
            <p className="text-muted-foreground">
              Commencez avec le guide de démarrage rapide ou consultez la documentation de sécurité.
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
              <Link href="/docs/platform/security">
                <Shield className="w-4 h-4 mr-2" />
                Sécurité
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
