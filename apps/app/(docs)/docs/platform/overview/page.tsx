"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Users,
  BarChart3,
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Clock,
  Key,
  Code,
  BookOpen,
  Terminal,
  Copy,
  CheckCircle,
  ChevronRight,
  Lock,
  Layers,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const architecture = [
  {
    title: "API RESTful",
    description: "Interface HTTP/JSON standard avec verbs REST. Compatible avec tous les langages.",
    icon: Globe,
  },
  {
    title: "Webhook Events",
    description:
      "Notifications temps réel pour tous les événements. Reprenons automatique des échecs.",
    icon: RefreshCw,
  },
  {
    title: "SDK officiels",
    description: "Bibliothèques pour Node.js, Python, Go, Ruby. Maintenues par notre équipe.",
    icon: Code,
  },
  {
    title: "Dashboard Admin",
    description: "Interface web pour la gestion visuelle. Accès multi-utilisateurs avec RBAC.",
    icon: LayoutDashboard,
  },
];

const features = [
  {
    title: "Tableau de bord centralisé",
    description: "Visualisez l'ensemble de vos opérations bancaires depuis une interface unique.",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion des comptes",
    description: "Créez et gérez plusieurs comptes bancaires avec IBAN européen.",
    icon: Wallet,
  },
  {
    title: "Gestion des cartes",
    description: "Commandez des cartes physiques et virtuelles pour votre équipe.",
    icon: CreditCard,
  },
  {
    title: "Gestion des clients",
    description: "Ajoutez et gérez les accès de vos clients ou collaborateurs.",
    icon: Users,
  },
  {
    title: "Analytique avancée",
    description: "Suivez vos performances financières avec des tableaux de bord détaillés.",
    icon: BarChart3,
  },
  {
    title: "Sécurité renforcée",
    description: "Protégez vos opérations avec l'authentification forte et le chiffrement.",
    icon: Shield,
  },
];

const sections = [
  {
    title: "Gestion des comptes",
    description:
      "Créez des comptes courants, professionnels ou entreprise. Chaque compte dispose d'un IBAN français valide pour les virements SEPA.",
    href: "/docs/products/accounts",
    icon: Wallet,
    docs: [
      { title: "Types de comptes", href: "/docs/products/accounts" },
      { title: "Soldes & opérations", href: "/docs/products/accounts" },
    ],
  },
  {
    title: "Moyens de paiement",
    description:
      "Émettez des cartes physiques et virtuelles. Configurez virements et prélèvements.",
    href: "/docs/products/cards",
    icon: CreditCard,
    docs: [
      { title: "Cartes bancaires", href: "/docs/products/cards" },
      { title: "Transferts", href: "/docs/products/transferts" },
    ],
  },
  {
    title: "Gestion financière",
    description: "Transactions, grand livre, facturation et analytique pour votre comptabilité.",
    href: "/docs/platform/transactions",
    icon: BarChart3,
    docs: [
      { title: "Transactions", href: "/docs/platform/transactions" },
      { title: "Grand livre", href: "/docs/platform/ledger" },
    ],
  },
  {
    title: "Sécurité & Conformité",
    description: "Authentification, chiffrement et conformité réglementaire PSD2/AML.",
    href: "/docs/security/authentication",
    icon: Shield,
    docs: [
      { title: "Authentification API", href: "/docs/security/authentication" },
      { title: "Webhooks", href: "/docs/platform/notifications" },
    ],
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min", concurrent: "10" },
  { plan: "Starter", requests: "1 000/min", concurrent: "50" },
  { plan: "Pro", requests: "5 000/min", concurrent: "200" },
  { plan: "Enterprise", requests: "Illimité", concurrent: "Personnalisé" },
];

const errorCodes = [
  { code: "400", message: "Bad Request", description: "Paramètres invalides ou manquants" },
  { code: "401", message: "Unauthorized", description: "Clé API invalide ou expirée" },
  { code: "403", message: "Forbidden", description: "Permissions insuffisantes" },
  { code: "404", message: "Not Found", description: "Ressource introuvable" },
  { code: "429", message: "Too Many Requests", description: "Limite de requêtes dépassée" },
  { code: "500", message: "Internal Error", description: "Erreur serveur interne" },
];

const codeExamples = {
  fullWorkflow: {
    title: "Workflow complet",
    description: "Exemple d'intégration typique : création de compte → transfert → vérification.",
    code: `# 1. Créer un compte
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{"type": "current", "currency": "EUR", "holder_name": "Acme Corp"}'

# Réponse: { "id": "acc_xyz789", "iban": "FR7630006...", "status": "active" }

# 2. Effectuer un transfert
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -d '{"account_id": "acc_xyz789", "amount": 50000, "recipient": {...}}'

# Réponse: { "id": "trf_abc123", "status": "pending" }

# 3. Vérifier le statut
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers/trf_abc123 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse: { "id": "trf_abc123", "status": "completed" }`,
  },
  pagination: {
    title: "Pagination",
    description: "Toutes les listes supportent les paramètres limit et offset.",
    code: `curl "https://sandbox.bank.skygenesisenterprise.com/api/v1/transactions?limit=50&offset=0" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse avec métadonnées de pagination:
{
  "data": [...],
  "total": 150,
  "limit": 50,
  "offset": 0,
  "has_more": true
}`,
  },
  errorHandling: {
    title: "Gestion des erreurs",
    description: "Toutes les erreurs retournent un format JSON standardisé.",
    code: `# Exemple d'erreur 401
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer invalid_key"

# Réponse:
{
  "error": {
    "code": "unauthorized",
    "message": "Clé API invalide ou expirée",
    "doc_url": "https://docs.aetherbank.com/errors#401"
  }
}`,
  },
};

export default function PlatformOverviewPage() {
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
          <Layers className="w-4 h-4" />
          Plateforme API
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API Banking <span className="text-primary">Aether Bank</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plateforme bancaire ouverte et souveraine. Intégrez des services financiers complets dans
          votre application avec notre API REST.
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
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
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
              href="#architecture"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Architecture API
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
              href="#features"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Fonctionnalités
            </a>
            <a
              href="#endpoints"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Structure des endpoints
            </a>
            <a
              href="#rate-limits"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Limites de débit
            </a>
            <a
              href="#errors"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Gestion des erreurs
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

      {/* Architecture */}
      <section id="architecture" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Architecture de l'API</h2>
        <p className="text-muted-foreground">
          L'API Aether Bank est conçue selon les standards modernes du banking-as-a-service. Elle
          offre une接口 complète pour intégrer des services bancaires dans votre application.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {architecture.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                Sandbox (Test)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm text-blue-700 dark:text-blue-300 break-all">
                https://sandbox.bank.skygenesisenterprise.com/api/v1
              </code>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Funds fictifs, IBANs de test, logs détaillés
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm text-green-700 dark:text-green-300 break-all">
                https://bank.skygenesisenterprise.com/api/v1
              </code>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                Fonds réels, KYC requis, support dédié
              </p>
            </CardContent>
          </Card>
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
          L'API utilise l'authentification par clé API via Bearer token. Incluez votre clé dans
          l'en-tête
          <code className="px-2 py-1 mx-1 rounded bg-muted text-sm">
            Authorization: Bearer sk_live_xxx
          </code>
          de chaque requête.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            {`# Exemple d'appel authentifié
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Bonnes pratiques</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1 ml-4 list-disc">
              <li>Ne jamais exposer vos clés en frontend</li>
              <li>Utiliser des variables d'environnement</li>
              <li>Générer des clés par environnement (test/prod)</li>
              <li>Activer le IP whitelisting en production</li>
            </ul>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href="/docs/security/authentication">
            <Lock className="w-4 h-4 mr-2" />
            Guide d'authentification détaillé
          </Link>
        </Button>
      </section>

      {/* Fonctionnalités */}
      <section id="features" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Structure endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Structure des endpoints</h2>
        <p className="text-muted-foreground">
          Tous les endpoints suivent la même structure URL et retournent des réponses JSON
          standardisées.
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-bold text-xs">
                  GET
                </span>
                <code className="font-mono">/accounts</code>
                <span className="text-muted-foreground">→ Liste des comptes</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-bold text-xs">
                  GET
                </span>
                <code className="font-mono">/accounts/:id</code>
                <span className="text-muted-foreground">→ Détails d'un compte</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-bold text-xs">
                  GET
                </span>
                <code className="font-mono">/accounts/:id/balance</code>
                <span className="text-muted-foreground">→ Solde d'un compte</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-bold text-xs">
                  POST
                </span>
                <code className="font-mono">/transfers</code>
                <span className="text-muted-foreground">→ Créer un virement</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold text-xs">
                  GET
                </span>
                <code className="font-mono">/transactions</code>
                <span className="text-muted-foreground">→ Liste des transactions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Format de réponse standard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">{`{
  "id": "acc_xyz789",
  "type": "current",
  "currency": "EUR",
  "iban": "FR7630006000011234567890189",
  "status": "active",
  "balance": {
    "available": 5000000,
    "current": 5000000
  },
  "created_at": "2024-01-15T10:00:00Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Rate Limits */}
      <section id="rate-limits" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Limites de débit (Rate Limits)</h2>
        </div>
        <p className="text-muted-foreground">
          Les limites varient selon votre plan d'abonnement. Elles sont transmises dans les en-têtes
          HTTP.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-center p-4 font-semibold">Requêtes/min</th>
                <th className="text-center p-4 font-semibold">Appels concurrents</th>
              </tr>
            </thead>
            <tbody>
              {rateLimits.map((plan, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4 font-medium">{plan.plan}</td>
                  <td className="text-center p-4">{plan.requests}</td>
                  <td className="text-center p-4">{plan.concurrent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">{`# En-têtes de réponse
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1705312800`}</pre>
        </div>
      </section>

      {/* Gestion des erreurs */}
      <section id="errors" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Gestion des erreurs</h2>
        </div>
        <p className="text-muted-foreground">
          Les erreurs sont retournées avec un code HTTP standard et un corps JSON descriptif.
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Code</th>
                <th className="text-left p-4 font-semibold">Message</th>
                <th className="text-left p-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {errorCodes.map((error, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4">
                    <code className="px-2 py-1 rounded bg-red-100 text-red-700 text-sm">
                      {error.code}
                    </code>
                  </td>
                  <td className="p-4 font-medium">{error.message}</td>
                  <td className="p-4 text-muted-foreground">{error.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections du dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Sections disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link key={index} href={section.href}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{section.description}</p>
                    <div className="space-y-2">
                      {section.docs.map((doc, i) => (
                        <a
                          key={i}
                          href={doc.href}
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <ArrowRight className="w-3 h-3" />
                          {doc.title}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Exemples */}
      <section id="exemples" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Exemples d'utilisation</h2>
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
            <h2 className="text-xl font-semibold mb-2">Prêt à développer ?</h2>
            <p className="text-muted-foreground">
              Consultez la documentation complète ou commencez directement avec le guide de
              démarrage.
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
              <Link href="/register">
                Créer un compte <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
