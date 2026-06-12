"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cloud,
  Server,
  Database,
  ArrowRight,
  CheckCircle,
  Shield,
  Globe,
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
  HardDrive,
  Activity,
  Users,
  AlertTriangle,
  Globe2,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Infrastructure de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Infrastructure de production",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Hébergement français",
    description: "Data centers situés en France, conformité RGPD garantie.",
    icon: Globe2,
  },
  {
    title: "Architecture distribuée",
    description: "Multi-zones avec failover automatique et redondance complète.",
    icon: Database,
  },
  {
    title: "CDN global",
    description: "Distribution de contenu depuis des points de présence mondiaux.",
    icon: Globe,
  },
  {
    title: "Haute disponibilité",
    description: "99.99% de disponibilité avec SLA garanti.",
    icon: Server,
  },
];

const infrastructure = [
  {
    title: "Compute",
    description: "Instances redondantes avec auto-scaling",
    icon: Server,
    specs: ["Kubernetes", "Auto-scaling", "Load balancing"],
  },
  {
    title: "Storage",
    description: "Stockage objet et bloc géo-répliqué",
    icon: HardDrive,
    specs: ["S3 Compatible", "Geo-replication", "Encryption"],
  },
  {
    title: "Network",
    description: "Réseau privé virtuel avec DDoS protection",
    icon: Globe,
    specs: ["VPC", "DDoS Protection", "WAF"],
  },
  {
    title: "Database",
    description: "Bases de données gérées avec réplica",
    icon: Database,
    specs: ["PostgreSQL", "Redis", "Multi-AZ"],
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/cloud/status",
    description: "Statut de l'infrastructure",
    parameters: [],
  },
  {
    method: "GET",
    path: "/cloud/metrics",
    description: "Métriques d'utilisation",
    parameters: ["from", "to", "period"],
  },
  {
    method: "GET",
    path: "/cloud/regions",
    description: "Régions disponibles",
    parameters: [],
  },
  {
    method: "POST",
    path: "/cloud/deployments",
    description: "Créer un déploiement",
    parameters: ["region", "config", "scale"],
  },
  {
    method: "GET",
    path: "/cloud/deployments/:id",
    description: "Détails d'un déploiement",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/cloud/deployments/:id/scale",
    description: "Scaler un déploiement",
    parameters: ["id", "instances", "auto_scale"],
  },
];

const webhookEvents = [
  {
    event: "cloud.incident.created",
    description: "Nouvel incident détecté",
    payload: "incident_id, severity, region, created_at",
  },
  {
    event: "cloud.incident.resolved",
    description: "Incident résolu",
    payload: "incident_id, resolved_at, duration",
  },
  {
    event: "cloud.deployment.ready",
    description: "Déploiement prêt",
    payload: "deployment_id, region, endpoints",
  },
  {
    event: "cloud.metrics.threshold",
    description: "Seuil de métriques dépassé",
    payload: "metric, value, threshold, region",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  status: {
    title: "Statut de l'infrastructure",
    description: "Vérifiez le statut de santé de l'infrastructure.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/cloud/status \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "status": "operational",
  "version": "2.4.1",
  "regions": {
    "fr-par": {
      "status": "healthy",
      "latency_ms": 12,
      "last_check": "2026-03-31T10:00:00Z"
    },
    "fr-mrs": {
      "status": "healthy",
      "latency_ms": 18,
      "last_check": "2026-03-31T10:00:00Z"
    }
  },
  "incidents": [],
  "scheduled_maintenance": []
}`,
  },
  metrics: {
    title: "Métriques d'utilisation",
    description: "Récupérez les métriques d'utilisation de vos ressources.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/cloud/metrics?from=2026-03-01&to=2026-03-31&period=day" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "period": {
    "from": "2026-03-01",
    "to": "2026-03-31"
  },
  "metrics": {
    "requests": {
      "total": 15472340,
      "avg_per_day": 499108
    },
    "bandwidth": {
      "total_gb": 234.5,
      "avg_per_day_gb": 7.56
    },
    "storage": {
      "used_gb": 1024,
      "limit_gb": 5120
    },
    "compute": {
      "avg_instances": 8,
      "peak_instances": 24
    }
  }
}`,
  },
  deploy: {
    title: "Créer un déploiement",
    description: "Déployez une nouvelle instance dans une région.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cloud/deployments \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "production-api",
    "region": "fr-par",
    "config": {
      "instance_type": "standard-4",
      "storage_gb": 100,
      "ssl_enabled": true,
      "backup_enabled": true
    },
    "scale": {
      "min_instances": 2,
      "max_instances": 20,
      "auto_scale": true,
      "target_cpu": 70
    }
  }'

# Réponse:
{
  "id": "dep_xyz789",
  "name": "production-api",
  "region": "fr-par",
  "status": "deploying",
  "endpoints": [
    "https://api-prd-abc123.fr-par.bank.aetherbank.com"
  ],
  "config": {
    "instance_type": "standard-4",
    "storage_gb": 100
  },
  "created_at": "2026-03-31T10:00:00Z",
  "estimated_ready": "2026-03-31T10:05:00Z"
}`,
  },
  scale: {
    title: "Scaler un déploiement",
    description: "Ajustez la capacité de votre déploiement.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/cloud/deployments/dep_xyz789/scale \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "instances": 10,
    "auto_scale": true,
    "target_cpu": 60
  }'

# Réponse:
{
  "id": "dep_xyz789",
  "status": "scaling",
  "current_instances": 8,
  "target_instances": 10,
  "auto_scale": true,
  "target_cpu": 60,
  "started_at": "2026-03-31T10:00:00Z"
}`,
  },
};

export default function PlatformCloudPage() {
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
          <Cloud className="w-4 h-4" />
          Platform Cloud
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Cloud</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez votre infrastructure cloud. Déploiements, scaling, métriques et monitoring pour vos
          applications bancaires.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/platform/overview">
              <Server className="w-4 h-4 mr-2" />
              Platform
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
              href="#infrastructure"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Infrastructure
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
              href="#compliance"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Conformité
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Concepts */}
      <section id="concepts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Concepts clés</h2>
        <p className="text-muted-foreground">
          L&apos;API Cloud fournit une interface unifiée pour gérer votre infrastructure bancaire.
          Hébergée en France, notre infrastructure offre une haute disponibilité et une sécurité
          maximale.
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

        {/* Architecture flow */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Flux d&apos;architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Globe className="w-4 h-4 text-primary" />
                <span>CDN</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Shield className="w-4 h-4 text-primary" />
                <span>WAF/DDoS</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Server className="w-4 h-4 text-primary" />
                <span>Load Balancer</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Cloud className="w-4 h-4 text-primary" />
                <span>K8s Cluster</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Database className="w-4 h-4 text-primary" />
                <span>Database</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Infrastructure */}
      <section id="infrastructure" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Infrastructure</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {infrastructure.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.specs.map((spec, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-muted text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/cloud/status \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">Gérez vos déploiements, métriques et monitoring.</p>
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
                {endpoint.parameters.length > 0 && (
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
                )}
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
          Recevez des notifications pour les incidents et événements d&apos;infrastructure.
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

      {/* Conformité */}
      <section id="compliance" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Certifications et conformité</h2>
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 dark:bg-green-950/50 dark:border-green-800">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Certifications
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">ISO 27001</span>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">SOC 2</span>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">RGPD</span>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg text-center">
                  <span className="font-semibold">99.99% SLA</span>
                </div>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-4">
                Notre infrastructure est hébergée en France dans des data centers certifiés.
                Disponibilité garantie avec RTO &lt; 4h et RPO &lt; 1h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à déployer ?</h2>
            <p className="text-muted-foreground">
              Commencez avec le guide de démarrage rapide ou explorez la documentation de la
              plateforme.
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
              <Link href="/docs/platform/overview">
                <Server className="w-4 h-4 mr-2" />
                Platform
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
