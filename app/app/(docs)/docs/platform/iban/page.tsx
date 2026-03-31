"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Banknote,
  Copy,
  CheckCircle,
  ArrowRight,
  Globe,
  Search,
  BookOpen,
  ChevronRight,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Shield,
  Zap,
  Clock,
  RefreshCw,
  Wallet,
  CheckCheck,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "IBANs de test, données fictives",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "IBANs réels, conformité totale",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "IBAN européen",
    description:
      "Chaque compte dispose d'un IBAN français valide accepté dans toute la zone SEPA (34 pays).",
    icon: Globe,
  },
  {
    title: "Génération automatique",
    description: "Les IBAN sont générés automatiquement lors de la création d'un compte.",
    icon: Banknote,
  },
  {
    title: "Validation IBAN",
    description: "Validez le format et la somme de contrôle des IBAN avant utilisation.",
    icon: CheckCheck,
  },
  {
    title: "Recherche multicritère",
    description: "Recherchez un IBAN par compte, identifiant ou numéro.",
    icon: Search,
  },
];

const ibanStructure = [
  { part: "FR", length: 2, name: "Code pays (ISO 3166-1)" },
  { part: "76", length: 2, name: "Somme de contrôle" },
  { part: "3000", length: 4, name: "Code banque" },
  { part: "4000", length: 4, name: "Code guichet" },
  { part: "1234567890", length: 10, name: "Numéro de compte" },
  { part: "12", length: 2, name: "Clé RIB" },
];

const endpoints = [
  {
    method: "GET",
    path: "/accounts/:id/iban",
    description: "Récupérer l'IBAN d'un compte",
    parameters: ["id"],
  },
  {
    method: "GET",
    path: "/iban/validate",
    description: "Valider un IBAN",
    parameters: ["iban"],
  },
  {
    method: "GET",
    path: "/iban/lookup",
    description: "Obtenir les infos bancaires",
    parameters: ["iban"],
  },
  {
    method: "GET",
    path: "/iban/format",
    description: "Formater un IBAN",
    parameters: ["iban", "format ( iban | formatted | compact )"],
  },
];

const webhookEvents = [
  {
    event: "iban.assigned",
    description: "Nouvel IBAN assigné à un compte",
    payload: "account_id, iban, bic, currency",
  },
  {
    event: "iban.activated",
    description: "IBAN activé pour les opérations",
    payload: "iban, activated_at",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  getIban: {
    title: "Récupérer l'IBAN d'un compte",
    description: "Obtenez l'IBAN et le BIC d'un compte existant.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_xyz789/iban \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "iban": "FR7630004000123456789012891",
  "bic": "BNORFRPP",
  "bank_code": "30004",
  "branch_code": "00123",
  "account_number": "45678901289",
  "check_digits": "76",
  "country_code": "FR",
  "currency": "EUR",
  "status": "active",
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  validateIban: {
    title: "Valider un IBAN",
    description: "Vérifiez la validité d'un IBAN (format et somme de contrôle).",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/iban/validate?iban=FR7630004000123456789012891" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "valid": true,
  "iban": "FR7630004000123456789012891",
  "country_code": "FR",
  "checksum_valid": true,
  "length_valid": true,
  "format_valid": true,
  "bank_code": "30004",
  "branch_code": "00123"
}

# Exemple IBAN invalide:
# {
#   "valid": false,
#   "iban": "FR7640003000987654321098765",
#   "checksum_valid": false,
#   "error": "Invalid checksum"
# }`,
  },
  lookupIban: {
    title: "Lookup IBAN",
    description: "Obtenez les informations bancaires associées à un IBAN.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/iban/lookup?iban=FR7630004000123456789012891" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "iban": "FR7630004000123456789012891",
  "bank": {
    "name": "BNP Paribas",
    "bic": "BNORFRPP",
    "code": "30004",
    "address": "16 Boulevard des Italiennes, 75009 Paris"
  },
  "branch": {
    "code": "00123",
    "name": "Agence Paris Opéra"
  },
  "account": {
    "number": "45678901289",
    "type": "current"
  }
}`,
  },
  formatIban: {
    title: "Formater un IBAN",
    description: "Convertissez un IBAN entre différents formats.",
    code: `# Format standard avec espaces
curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/iban/format?iban=FR7630004000123456789012891&format=formatted" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
# "FR76 3000 4000 1234 5678 9012 891"

# Format compact (sans espaces)
curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/iban/format?iban=FR7630004000123456789012891&format=compact" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
# "FR7630004000123456789012891"`,
  },
};

export default function PlatformIbanPage() {
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
          <Banknote className="w-4 h-4" />
          Platform IBAN
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">IBAN</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les IBAN et BIC de vos comptes. Validation, formatage et informations bancaires pour
          la zone SEPA.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/accounts">
              <Wallet className="w-4 h-4 mr-2" />
              Comptes
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
              href="#concepts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Concepts
            </a>
            <a
              href="#structure"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Structure IBAN
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
          </div>
        </CardContent>
      </Card>

      {/* Concepts */}
      <section id="concepts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Concepts clés</h2>
        <p className="text-muted-foreground">
          L&apos;API IBAN permet de gérer les identifiants bancaires internationaux de vos comptes.
          Un IBAN (International Bank Account Number) est un standard international pour identifier
          les comptes bancaires.
        </p>
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

      {/* Structure IBAN */}
      <section id="structure" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Structure d&apos;un IBAN français</h2>
        <p className="text-muted-foreground">
          Un IBAN français contient 27 caractères organisés en 5 parties.
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 font-mono text-lg">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold">FR</span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold">
                  76
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold">
                  3000
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-bold">
                  4000
                </span>
                <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-bold">
                  1234567890
                </span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-bold">
                  12
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {ibanStructure.map((part, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="font-mono font-bold text-sm">{part.part}</span>
                    <div>
                      <span className="text-xs text-muted-foreground">
                        {part.length} caractères
                      </span>
                      <p className="text-sm">{part.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEPA Countries */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Zone SEPA (34 pays)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "FR",
                "DE",
                "IT",
                "ES",
                "NL",
                "BE",
                "AT",
                "PT",
                "IE",
                "FI",
                "GR",
                "LU",
                "SK",
                "SI",
                "EE",
                "LV",
                "LT",
                "CY",
                "MT",
                "EE",
                "HR",
                "BG",
                "RO",
                "CZ",
                "DK",
                "SE",
                "PL",
                "HU",
                "GB",
                "IS",
                "LI",
                "NO",
                "CH",
              ].map((country, i) => (
                <span key={i} className="px-2 py-1 rounded bg-card border text-xs font-mono">
                  {country}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_xyz789/iban \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Endpoints pour récupérer, valider et formater les IBAN.
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
          Recevez des notifications pour les événements liés aux IBAN.
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
                      <CheckCircle className="w-4 h-4 text-green-500" />
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

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à gérer vos IBAN ?</h2>
            <p className="text-muted-foreground">
              Créez un compte pour obtenir un IBAN français ou explorez la documentation des
              comptes.
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
              <Link href="/docs/platform/accounts">
                <Wallet className="w-4 h-4 mr-2" />
                Comptes
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
