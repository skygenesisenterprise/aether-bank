"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Smartphone,
  Wifi,
  Lock,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  RefreshCw,
  Building,
  Terminal,
  Code,
  ExternalLink,
  Plus,
  Eye,
  Power,
  ChevronRight,
  Copy,
  Key,
  Globe,
  Zap,
  Webhook,
} from "lucide-react";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
      {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}

const tableOfContents = [
  { title: "Introduction", href: "#introduction" },
  { title: "Types de cartes", href: "#types" },
  { title: "Fonctionnalités", href: "#features" },
  { title: "Authentification", href: "#authentication" },
  { title: "Endpoints", href: "#endpoints" },
  { title: "Webhooks", href: "#webhooks" },
  { title: "Environnements", href: "#environments" },
  { title: "Exemples", href: "#examples" },
];

const cardTypes = [
  {
    title: "Carte physique",
    description:
      "Carte bancaire physique avec paiement sans contact. Idéale pour les retraits aux DAB et paiements en magasin.",
    icon: CreditCard,
    features: [
      "Paiement en ligne et en magasin",
      "Retraits aux DAB",
      "Assurance voyage incluse",
      "Plafond personnalisable",
    ],
    api: "/v1/cards (type: physical)",
  },
  {
    title: "Carte virtuelle",
    description:
      "Carte numérique pour vos achats en ligne en toute sécurité. Générez-en autant que nécessaire.",
    icon: Smartphone,
    features: [
      "Génération instantanée",
      "Limites personnalisables",
      "Désactivation immédiate",
      "Masquage du numéro",
    ],
    api: "/v1/cards (type: virtual)",
  },
  {
    title: "Carte temporaire",
    description:
      "Carte à usage unique pour les paiements ponctuels. Parfaite pour les freelancers et indépendants.",
    icon: Clock,
    features: [
      "Validité limitée (24h-30 jours)",
      "Montant fixe ou plafond",
      "Auto-expiration",
      "Sans engagement",
    ],
    api: "/v1/cards (type: temporary)",
  },
  {
    title: "Carte Business",
    description: "Carte professionnelle avec gestion d'équipe et suivi des dépenses en temps réel.",
    icon: Building,
    features: [
      "Limites personnalisées par utilisateur",
      "Historique partagé",
      "Export comptable (CSV/JSON)",
      "Cartes virtuelles illimitées",
    ],
    api: "/v1/cards (type: business)",
  },
];

const features = [
  {
    title: "Paiement sans contact",
    description:
      "Payez rapidement avec la technologie NFC sur tous les terminaux compatibles. Limite: 50€ par transaction.",
    icon: Wifi,
  },
  {
    title: "Contrôle des dépenses",
    description:
      "Définissez des limites quotidiennes, hebdomadaires ou mensuelles par carte ou par utilisateur.",
    icon: DollarSign,
  },
  {
    title: "Alertes en temps réel",
    description:
      "Recevez une notification push et email à chaque transaction. Configurable par montant et type d'opération.",
    icon: Shield,
  },
  {
    title: "Cartes virtuelles illimitées",
    description:
      "Créez autant de cartes virtuelles que nécessaire. Idéal pour isoler les abonnements et paiements récurrents.",
    icon: RefreshCw,
  },
];

const comparison = [
  {
    feature: "Paiement en magasin",
    physique: true,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
  {
    feature: "Paiement en ligne",
    physique: true,
    virtuelle: true,
    temporaire: true,
    business: true,
  },
  { feature: "Retraits DAB", physique: true, virtuelle: false, temporaire: false, business: true },
  {
    feature: "Génération instantanée",
    physique: false,
    virtuelle: true,
    temporaire: true,
    business: true,
  },
  {
    feature: "Limites personnalisables",
    physique: true,
    virtuelle: true,
    temporaire: true,
    business: true,
  },
  {
    feature: "Assurance voyage",
    physique: true,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
  {
    feature: "Gestion d'équipe",
    physique: false,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
  {
    feature: "Export comptable",
    physique: false,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
];

const endpoints = [
  { method: "GET", path: "/v1/cards", description: "Liste toutes les cartes" },
  { method: "POST", path: "/v1/cards", description: "Crée une nouvelle carte" },
  { method: "GET", path: "/v1/cards/:id", description: "Détails d'une carte" },
  { method: "PUT", path: "/v1/cards/:id", description: "Modifie une carte" },
  { method: "DELETE", path: "/v1/cards/:id", description: "Annule une carte" },
  { method: "POST", path: "/v1/cards/:id/block", description: "Bloque une carte" },
  { method: "POST", path: "/v1/cards/:id/unblock", description: "Débloque une carte" },
  { method: "GET", path: "/v1/cards/:id/transactions", description: "Transactions d'une carte" },
];

const webhookEvents = [
  { event: "card.created", description: "Carte créée" },
  { event: "card.activated", description: "Carte activée" },
  { event: "card.blocked", description: "Carte bloquée" },
  { event: "card.transaction", description: "Nouvelle transaction" },
  { event: "card.limit_reached", description: "Limite atteinte" },
];

export default function CardsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <CreditCard className="w-4 h-4" />
          API & Produits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Cartes <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Solution de paiement moderne et flexible. Cartes physiques, virtuelles ou temporaires -
          contrôlez vos dépenses en temps réel avec notre API open-source.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/docs/quick-start">
              <Terminal className="w-4 h-4 mr-2" />
              Tester l'API
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/docs/platform/cards">
              <Code className="w-4 h-4 mr-2" />
              Documentation API
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Table des matières</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tableOfContents.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {index + 1}
              </span>
              <span className="font-medium">{item.title}</span>
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      <section id="introduction" className="space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Introduction</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              L'API Cartes d'Aether Bank permet de gérer l'ensemble du cycle de vie de vos cartes
              bancaires. Créez des cartes physiques ou virtuelles, définissez des limites de
              spending, et recevez des notifications en temps réel pour chaque transaction.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Notre API est conforme aux standards PCI DSS et utilise les dernières technologies de
              sécurité pour protéger vos données et celles de vos clients.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="types" className="space-y-6">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Types de cartes</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cardTypes.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <span className="text-xs text-muted-foreground font-mono">{card.api}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{card.description}</p>
                  <ul className="space-y-2">
                    {card.features.map((feature, i) => (
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

      <section id="features" className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Fonctionnalités avancées</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="authentication" className="space-y-6">
        <div className="flex items-center gap-3">
          <Key className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Authentification</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format d'authentification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toutes les requêtes vers l'API Cartes doivent être authentifiées.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton code="Authorization: Bearer sk_test_xxxxxxxxxxxxxxxxxxxx" />
              <pre className="text-sm font-mono">
                Authorization: Bearer sk_test_xxxxxxxxxxxxxxxxxxxx
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="environments" className="space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Environnements</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <CardTitle className="text-lg">Sandbox</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <code className="text-sm font-mono text-green-600 dark:text-green-400">
                https://sandbox.bank.skygenesisenterprise.com/api/v1
              </code>
              <p className="text-sm text-muted-foreground mt-2">
                Environment de test avec données fictives.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <CardTitle className="text-lg">Production</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                https://bank.skygenesisenterprise.com/api/v1
              </code>
              <p className="text-sm text-muted-foreground mt-2">
                Environment de production avec données réelles.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="endpoints" className="space-y-6">
        <div className="flex items-center gap-3">
          <ChevronRight className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Endpoints</h2>
        </div>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="hover:shadow-sm transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      endpoint.method === "GET"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : endpoint.method === "POST"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : endpoint.method === "PUT"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {endpoint.path}
                  </code>
                  <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="webhooks" className="space-y-6">
        <div className="flex items-center gap-3">
          <Webhook className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Webhooks</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Événements disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Événement</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {webhookEvents.map((event, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{event.event}</code>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {event.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="examples" className="space-y-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Exemples d'utilisation</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Créer une carte virtuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "virtual",
    "currency": "EUR",
    "limits": {
      "daily": 100000,
      "monthly": 500000
    },
    "metadata": {
      "purpose": "subscription_management"
    }
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "virtual",
    "currency": "EUR",
    "limits": {
      "daily": 100000,
      "monthly": 500000
    },
    "metadata": {
      "purpose": "subscription_management"
    }
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "crd_xyz789",
  "type": "virtual",
  "last4": "4242",
  "expiry_month": 12,
  "expiry_year": 2028,
  "status": "active",
  "limits": {
    "daily": 100000,
    "monthly": 500000
  },
  "spending": {
    "daily": 0,
    "monthly": 0
  },
  "created_at": "2026-03-31T10:00:00Z"
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bloquer une carte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards/crd_xyz789/block \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "lost"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cards/crd_xyz789/block \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "lost"
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "crd_xyz789",
  "status": "blocked",
  "blocked_at": "2026-03-31T10:05:00Z",
  "reason": "lost"
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à commencer ?</h2>
            <p className="text-muted-foreground">
              Créez votre premier compte développeur et recevez vos clés API.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/quick-start">
                Guide de démarrage <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/platform/cards">Documentation API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
