"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  ArrowRight,
  Download,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle,
  Key,
  Webhook,
  Terminal,
  AlertCircle,
  Shield,
  Zap,
  Clock,
  PieChart,
  Target,
  Calendar,
  RefreshCw,
  Filter,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Données fictives, logs détaillés",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Données réelles, accès complet",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Métriques en temps réel",
    description: "Visualisez vos KPIs instantanément avec un rafraîchissement automatique.",
    icon: TrendingUp,
  },
  {
    title: "Rapports personnalisables",
    description: "Créez des tableaux de bord adaptés à vos besoins métier.",
    icon: PieChart,
  },
  {
    title: "Prévisions IA",
    description: "Anticipez vos revenus et dépenses avec des modèles prédictifs.",
    icon: Target,
  },
  {
    title: "Export multi-format",
    description: "Exportez vos données en PDF, Excel ou CSV.",
    icon: Download,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/analytics/overview",
    description: "Vue d'ensemble des métriques",
    parameters: ["period", "account_id"],
  },
  {
    method: "GET",
    path: "/analytics/revenues",
    description: "Revenus par période",
    parameters: ["from_date", "to_date", "group_by", "limit"],
  },
  {
    method: "GET",
    path: "/analytics/expenses",
    description: "Dépenses par catégorie",
    parameters: ["from_date", "to_date", "category", "limit"],
  },
  {
    method: "GET",
    path: "/analytics/transactions",
    description: "Statistiques transactions",
    parameters: ["period", "type", "status"],
  },
  {
    method: "GET",
    path: "/analytics/customers",
    description: "Métriques clients",
    parameters: ["period", "segment"],
  },
  {
    method: "GET",
    path: "/analytics/forecast",
    description: "Prévisions financières",
    parameters: ["metric", "months_ahead", "confidence"],
  },
  {
    method: "POST",
    path: "/analytics/reports",
    description: "Générer un rapport",
    parameters: ["type", "from_date", "to_date", "format"],
  },
  {
    method: "GET",
    path: "/analytics/reports/:id/download",
    description: "Télécharger un rapport",
    parameters: ["id", "format"],
  },
];

const webhookEvents = [
  {
    event: "analytics.report.ready",
    description: "Rapport généré et prêt",
    payload: "report_id, type, download_url",
  },
  {
    event: "analytics.forecast.updated",
    description: "Prévisions mises à jour",
    payload: "metric, forecast_data, confidence_score",
  },
  {
    event: "analytics.anomaly.detected",
    description: "Anomalie détectée",
    payload: "metric, expected, actual, deviation",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  overview: {
    title: "Vue d'ensemble",
    description: "Récupérez les métriques clés de votre plateforme.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/analytics/overview?period=month" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "period": "2026-03",
  "metrics": {
    "revenues": {
      "total": 12745000,
      "currency": "EUR",
      "change": 12.5
    },
    "expenses": {
      "total": 8932000,
      "currency": "EUR",
      "change": -5.2
    },
    "net": {
      "total": 3813000,
      "currency": "EUR",
      "change": 18.7
    },
    "transactions": {
      "count": 1247,
      "change": 8.3
    }
  },
  "generated_at": "2026-03-31T10:00:00Z"
}`,
  },
  revenues: {
    title: "Revenus détaillés",
    description: "Analysez vos revenus avec ventilation par période.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/analytics/revenues?from_date=2026-01-01&to_date=2026-03-31&group_by=month" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "period": "2026-01",
      "revenues": 4200000,
      "currency": "EUR",
      "breakdown": {
        "transfers": 1800000,
        "cards": 1200000,
        "credits": 800000,
        "other": 400000
      }
    },
    {
      "period": "2026-02",
      "revenues": 3800000,
      "currency": "EUR",
      "breakdown": {
        "transfers": 1500000,
        "cards": 1100000,
        "credits": 900000,
        "other": 300000
      }
    },
    {
      "period": "2026-03",
      "revenues": 5100000,
      "currency": "EUR",
      "breakdown": {
        "transfers": 2100000,
        "cards": 1500000,
        "credits": 1000000,
        "other": 500000
      }
    }
  ],
  "total": 13100000
}`,
  },
  forecast: {
    title: "Prévisions",
    description: "Obtenez des prévisions basées sur l'historique.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/analytics/forecast?metric=revenues&months_ahead=3&confidence=95" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "metric": "revenues",
  "forecast": [
    {
      "month": "2026-04",
      "predicted": 5500000,
      "min": 5000000,
      "max": 6000000,
      "confidence": 95
    },
    {
      "month": "2026-05",
      "predicted": 5800000,
      "min": 5200000,
      "max": 6400000,
      "confidence": 90
    },
    {
      "month": "2026-06",
      "predicted": 6100000,
      "min": 5300000,
      "max": 6900000,
      "confidence": 85
    }
  ],
  "model": "linear_regression",
  "trained_on": "12 months of data"
}`,
  },
  exportReport: {
    title: "Exporter un rapport",
    description: "Générez et téléchargez un rapport personnalisé.",
    code: `# Générer le rapport
curl -X POST "https://sandbox.bank.skygenesisenterprise.com/api/v1/analytics/reports" \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "monthly_summary",
    "from_date": "2026-01-01",
    "to_date": "2026-03-31",
    "format": "pdf",
    "include_charts": true,
    "sections": ["revenues", "expenses", "customers", "transactions"]
  }'

# Réponse:
{
  "report_id": "rpt_xyz789",
  "status": "processing",
  "estimated_time": 30
}

# Télécharger le rapport (après traitement)
curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/analytics/reports/rpt_xyz789/download?format=pdf" \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -o rapport_mensuel.pdf

# Réponse: Binary PDF file`,
  },
};

export default function PlatformAnalyticsPage() {
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
          Platform Analytics
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Analytique</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Visualisez et analysez les performances de votre plateforme. Métriques en temps réel,
          prévisions et rapports personnalisables.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/transactions">
              <CreditCard className="w-4 h-4 mr-2" />
              Transactions
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
              href="#rate-limits"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Limites
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Concepts */}
      <section id="concepts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Concepts clés</h2>
        <p className="text-muted-foreground">
          L&apos;API Analytique fournit des données financières agrégées et des outils de
          visualisation pour piloter votre plateforme.
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

        {/* Available metrics */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Métriques disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Revenus</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span>Dépenses</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Users className="w-4 h-4 text-primary" />
                <span>Clients</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Transactions</span>
              </div>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/analytics/overview \\
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
              <li>Mettre en cache les données analytiques</li>
              <li>Utiliser des clés différentes pour test et production</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Tous les montants sont en cents (EUR). Les métriques supportent plusieurs périodes.
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Format de métriques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">{`{
  "metric": "revenues",
  "value": 12745000,
  "currency": "EUR",
  "change": 12.5,
  "period": "2026-03",
  "breakdown": {
    "transfers": 5400000,
    "cards": 3800000,
    "credits": 2600000,
    "other": 945000
  }
}`}</pre>
            </div>
          </CardContent>
        </Card>
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
          Recevez des notifications pour les rapports prêts et les alertes d&apos;anomalies.
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

      {/* Rate Limits */}
      <section id="rate-limits" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Limites de débit</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-center p-4 font-semibold">Requêtes/min</th>
              </tr>
            </thead>
            <tbody>
              {rateLimits.map((plan, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4 font-medium">{plan.plan}</td>
                  <td className="text-center p-4">{plan.requests}</td>
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
            <h2 className="text-xl font-semibold mb-2">Prêt à analyser vos données ?</h2>
            <p className="text-muted-foreground">
              Commencez avec le guide de démarrage rapide ou explorez les transactions.
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
              <Link href="/docs/platform/transactions">
                <CreditCard className="w-4 h-4 mr-2" />
                Transactions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
