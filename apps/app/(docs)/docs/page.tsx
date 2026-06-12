"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  Wallet,
  Shield,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  Zap,
  Layers,
  Send,
  Key,
  BookOpen,
  Terminal,
  Code,
  Database,
  Clock,
  Lock,
  Copy,
  ExternalLink,
  Eye,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "philosophy", label: "Philosophie" },
  { id: "concepts", label: "Concepts Clés" },
  { id: "architecture", label: "Architecture" },
  { id: "quickstart", label: "Quick Start" },
  { id: "tools", label: "Outils & SDKs" },
  { id: "api", label: "API & Endpoints" },
  { id: "authentication", label: "Authentification" },
  { id: "webhooks", label: "Webhooks" },
  { id: "environments", label: "Environnements" },
  { id: "examples", label: "Exemples" },
  { id: "limits", label: "Limites & quotas" },
  { id: "support", label: "Support" },
];

const philosophy = [
  {
    title: "Souveraineté Numérique",
    description:
      "Vous gardez le contrôle total de vos données. Aucun lock-in, aucune dépendance à des services tiers.",
    icon: Lock,
  },
  {
    title: "Transparence Totale",
    description: "Code open-source, auditables et vérifiables. La confiance par la transparence.",
    icon: Eye,
  },
  {
    title: "Conformité Native",
    description: "RGPD, PSD2, SOC 2 - la conformité est intégrée, pas ajoutée a posteriori.",
    icon: Shield,
  },
  {
    title: "Interopérabilité",
    description:
      "Standards ouverts (SEPA, Swift, Open Banking) pour une intégration sans friction.",
    icon: Network,
  },
];

const concepts = [
  {
    title: "Ledger Distribué",
    description:
      "Technologie blockchain permissionnée pour une traçabilité totale et immuable des transactions. Chaque opération est horodatée et，不可篡改 (non-modifiable).",
    icon: Database,
  },
  {
    title: "Compte Multi-devises",
    description:
      "Gestion de comptes en EUR, USD, GBP et autres devises avec conversion instantanée et taux transparents.",
    icon: Wallet,
  },
  {
    title: "Cartes Virtuelles",
    description:
      "Création de cartes jetables ou permanentes avec contrôles de spend personnalisés, limites par transaction et par période.",
    icon: CreditCard,
  },
  {
    title: "Virements SEPA Instant",
    description:
      "Transferts instantanés 24/7 vers n'importe quelle banque européenne via le réseau SEPA Instant.",
    icon: Send,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/accounts",
    description: "Lister tous les comptes",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/accounts",
    description: "Créer un nouveau compte",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/accounts/{id}",
    description: "Récupérer un compte par ID",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "PATCH",
    path: "/v1/accounts/{id}",
    description: "Mettre à jour un compte",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "DELETE",
    path: "/v1/accounts/{id}",
    description: "Fermer un compte",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/accounts/{id}/balance",
    description: "Obtenir le solde d'un compte",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/accounts/{id}/statements",
    description: "Télécharger les relevés",
    category: "Accounts",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/cards",
    description: "Lister toutes les cartes",
    category: "Cards",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/cards",
    description: "Créer une nouvelle carte",
    category: "Cards",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/cards/{id}",
    description: "Récupérer une carte",
    category: "Cards",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/cards/{id}/activate",
    description: "Activer une carte",
    category: "Cards",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/cards/{id}/block",
    description: "Bloquer une carte",
    category: "Cards",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/cards/{id}/unblock",
    description: "Débloquer une carte",
    category: "Cards",
    status: "stable",
  },
  {
    method: "PATCH",
    path: "/v1/cards/{id}/limits",
    description: "Modifier les limites",
    category: "Cards",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/transactions",
    description: "Historique des transactions",
    category: "Transactions",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/transactions/{id}",
    description: "Détails d'une transaction",
    category: "Transactions",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/transfers",
    description: "Effectuer un virement SEPA",
    category: "Transfers",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/transfers/instant",
    description: "Virement SEPA Instant",
    category: "Transfers",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/transfers/{id}",
    description: "Statut d'un virement",
    category: "Transfers",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/webhooks",
    description: "Lister les webhooks",
    category: "Webhooks",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    description: "Créer un webhook",
    category: "Webhooks",
    status: "stable",
  },
  {
    method: "DELETE",
    path: "/v1/webhooks/{id}",
    description: "Supprimer un webhook",
    category: "Webhooks",
    status: "stable",
  },
  {
    method: "POST",
    path: "/v1/webhooks/{id}/test",
    description: "Tester un webhook",
    category: "Webhooks",
    status: "stable",
  },
  {
    method: "GET",
    path: "/v1/ibans",
    description: "Liste des IBANs",
    category: "Accounts",
    status: "beta",
  },
  {
    method: "POST",
    path: "/v1/direct-debits",
    description: "Créer un mandat SDD",
    category: "Payments",
    status: "beta",
  },
  {
    method: "GET",
    path: "/v1/organization",
    description: "Info organisation",
    category: "Organization",
    status: "stable",
  },
];

const authFeatures = [
  { title: "API Key", description: "Clés API avec permissions granulaires" },
  { title: "OAuth 2.0", description: "Support pour flux d'autorisation tiers" },
  { title: "2FA", description: "Authentification à deux facteurs obligatoire" },
  { title: "TLS 1.3", description: "Chiffrement de toutes les communications" },
];

const environments = [
  {
    name: "Sandbox",
    url: "https://sandbox.bank.skygenesisenterprise.com",
    description: "Environnement de test sans frais réels",
    color: "bg-orange-500",
  },
  {
    name: "Production",
    url: "https://bank.skygenesisenterprise.com",
    description: "Environnement de production réel",
    color: "bg-green-500",
  },
];

const webhookEvents = [
  { event: "account.created", description: "Nouveau compte créé" },
  { event: "account.balance.updated", description: "Solde mis à jour" },
  { event: "card.created", description: "Nouvelle carte émise" },
  { event: "card.transaction", description: "Transaction carte" },
  { event: "transfer.completed", description: "Virement terminé" },
  { event: "transfer.failed", description: "Virement échoué" },
  { event: "webhook.test", description: "Test de webhook" },
];

const quickLinks = [
  {
    title: "Getting Started",
    href: "/docs/quick-start",
    description: "Set up your account and first integration",
  },
  { title: "API Reference", href: "/docs/platform/api", description: "Complete API documentation" },
  {
    title: "Webhooks",
    href: "/docs/platform/notifications",
    description: "Real-time event notifications",
  },
  {
    title: "Authentication",
    href: "/docs/security/authentication",
    description: "Secure your API requests",
  },
];

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "POST":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "PUT":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      case "DELETE":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <BookOpen className="w-4 h-4" />
          Documentation API
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Build with <span className="text-primary">Aether Bank</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Une API bancaire open-source, souveraine et conforme RGPD. Intégrez des services
          financiers sécurisés dans vos applications avec une totale maîtrise de vos données.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" asChild>
            <Link href="/docs/quick-start">
              Commencer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs/platform/api">
              Référence API
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-4 z-50 bg-background/80 backdrop-blur-md border rounded-lg p-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-4 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Introduction</h2>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-muted-foreground">
              L'API Aether Bank vous permet d'intégrer des services bancaires complets dans vos
              applications. Conçue pour la souveraineté numérique, notre API offre une alternative
              open-source aux services bancaires traditionnels.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">Conforme RGPD</h3>
                  <p className="text-xs text-muted-foreground">Données hébergées en France</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">Sécurité de niveau bancaire</h3>
                  <p className="text-xs text-muted-foreground">TLS 1.3, 2FA, chiffrement</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Code className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">Open Source</h3>
                  <p className="text-xs text-muted-foreground">Code transparent et auditable</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Concepts Clés */}
      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Concepts Clés</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <Card key={concept.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{concept.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{concept.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* API & Endpoints */}
      <section id="api" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Code className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">API & Endpoints</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-6">
              L'API REST Aether Bank utilise des réponses JSON standardisées. Tous les endpoints
              commencent par <code className="bg-muted px-2 py-1 rounded">/api/v1</code>.
            </p>
            <div className="rounded-xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Méthode</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Endpoint</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Catégorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((endpoint, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getMethodColor(
                              endpoint.method
                            )}`}
                          >
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono">{endpoint.path}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {endpoint.description}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {endpoint.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Authentification */}
      <section id="authentication" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Authentification</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                L'authentification s'effectue via des clés API envoyées dans le header
                Authorization.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <p className="mb-2 text-gray-400">// Format de la requête</p>
                <p>Authorization: Bearer sk_live_abc123</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>
                    Préfixe <code className="bg-muted px-1">sk_</code> pour production
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>
                    Préfixe <code className="bg-muted px-1">sk_</code> pour test
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Permissions granulaires par clé</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {authFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section id="webhooks" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Webhooks</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Événements disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {webhookEvents.map((event) => (
                  <div
                    key={event.event}
                    className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
                  >
                    <code className="text-sm font-mono">{event.event}</code>
                    <span className="text-xs text-muted-foreground">{event.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exemple de payload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{`{
  "event": "transaction.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "txn_xyz789",
    "account_id": "acc_abc123",
    "amount": 5000,
    "currency": "EUR",
    "type": "credit",
    "status": "completed"
  }
}`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() =>
                    copyCode(
                      `{
  "event": "transaction.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "txn_xyz789",
    "account_id": "acc_abc123",
    "amount": 5000,
    "currency": "EUR",
    "type": "credit",
    "status": "completed"
  }
}`,
                      "webhook"
                    )
                  }
                >
                  {copiedSection === "webhook" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environnements */}
      <section id="environments" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Environnements de Test</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {environments.map((env) => {
            const Icon = env.color === "bg-orange-500" ? Clock : CheckCircle;
            return (
              <Card key={env.name}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${env.color} flex items-center justify-center text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{env.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{env.description}</p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{env.url}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Exemples d'utilisation */}
      <section id="examples" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Exemples d'utilisation</h2>
        </div>

        {/* Exemple 1: Créer un compte */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                1
              </span>
              Créer un compte bancaire
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Créez un nouveau compte courant pour un client ou votre entreprise.
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "current",
    "currency": "EUR",
    "holder_name": "Entreprise ABC",
    "holder_type": "business",
    "metadata": {
      "reference": "REF-2024-001"
    }
  }'`}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() =>
                  copyCode(
                    `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \
  -H "Authorization: Bearer sk_test_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "current",
    "currency": "EUR",
    "holder_name": "Entreprise ABC",
    "holder_type": "business",
    "metadata": {
      "reference": "REF-2024-001"
    }
  }'`,
                    "createAccount"
                  )
                }
              >
                {copiedSection === "createAccount" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Réponse:</strong> Le compte est créé avec un IBAN unique (ex: FR76 3000 6000
                0012 3456 7890 189)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Exemple 2: Lire le solde */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                2
              </span>
              Obtenir le solde d'un compte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Récupérez le solde actuel d'un compte en temps réel.
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_abc123/balance \\
  -H "Authorization: Bearer sk_test_abc123"`}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() =>
                  copyCode(
                    `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_abc123/balance \
  -H "Authorization: Bearer sk_test_abc123"`,
                    "getBalance"
                  )
                }
              >
                {copiedSection === "getBalance" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Réponse:</strong>{" "}
                {'{ "available": 50000, "current": 50000, "currency": "EUR" }'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Exemple 3: Exécuter un virement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                3
              </span>
              Effectuer un virement SEPA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Initiez un virement vers un autre compte bancaire européen.
            </p>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_abc123",
    "amount": 5000,
    "currency": "EUR",
    "recipient": {
      "iban": "FR7630006000011234567890189",
      "name": "Société XYZ"
    },
    "reference": "FACTURE-2024-001"
  }'`}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() =>
                  copyCode(
                    `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers \
  -H "Authorization: Bearer sk_test_abc123" \
  -H "Content-Type: application/json" \
  -d '{
    "account_id": "acc_abc123",
    "amount": 5000,
    "currency": "EUR",
    "recipient": {
      "iban": "FR7630006000011234567890189",
      "name": "Société XYZ"
    },
    "reference": "FACTURE-2024-001"
  }'`,
                    "transfer"
                  )
                }
              >
                {copiedSection === "transfer" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Réponse:</strong> Le virement est programmé. Utilisez les webhooks pour
                suivre le statut.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Liens Rapides</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Besoin d'aide ?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Support Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contacter notre équipe pour assistance technique
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="mailto:support@aether.bank">Nous écrire</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Chat en Direct</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discutez avec notre équipe en temps réel
              </p>
              <Button variant="outline" size="sm">
                Démarrer le chat
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Support Téléphonique</h3>
              <p className="text-sm text-muted-foreground mb-4">Disponible Lun-Ven 9h-18h CET</p>
              <Button variant="outline" size="sm">
                +33 1 23 45 67 89
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="space-y-6">
        <div className="rounded-xl bg-muted/50 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Sécurité de Niveau Bancaire</h2>
              <p className="text-muted-foreground mb-4">
                Aether Bank est une institution financière agréée régie par l'autorité française
                (ACPR). Toutes les transactions sont protégées par un chiffrement standard industry
                et des systèmes de détection de fraude.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Conforme PSD2</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Conforme RGPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>2FA Activé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Certifié SOC 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AB</span>
              </div>
              <span className="text-foreground font-semibold">Aether Bank</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
              <span>© 2026 Aether Bank. Tous droits réservés.</span>
              <span className="hidden md:inline">|</span>
              <span className="text-primary">Un produit Sky Genesis Enterprise</span>
            </div>
          </div>
          <Link
            href="/pgp"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Key className="w-4 h-4" />
            Vérifier notre clé PGP publique
          </Link>
        </div>
      </footer>
    </div>
  );
}
