"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Key,
  Plus,
  ChevronRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  Globe,
  Shield,
  Eye,
  Trash2,
  RotateCcw,
  ArrowRight,
  Clock,
  Zap,
  Activity,
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
  { title: "Concepts Clés", href: "#concepts" },
  { title: "Authentification", href: "#authentication" },
  { title: "Endpoints", href: "#endpoints" },
  { title: "Environnements", href: "#environments" },
  { title: "Exemples d'utilisation", href: "#examples" },
  { title: "Bonnes pratiques", href: "#best-practices" },
];

const features = [
  {
    title: "Génération simple",
    description: "Créez vos clés API en un clic depuis votre dashboard ou via l'API.",
    icon: Plus,
  },
  {
    title: "Permissions granulaires",
    description: "Définissez exactement ce que chaque clé peut faire avec des scopes précis.",
    icon: Shield,
  },
  {
    title: "Rotation des clés",
    description: "Remplacez vos clés régulièrement pour plus de sécurité avec downtime minimal.",
    icon: RotateCcw,
  },
  {
    title: "Journal d'activité",
    description: "Suivez l'utilisation de chaque clé API en temps réel.",
    icon: Activity,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/api-keys",
    description: "Liste toutes vos clés API",
  },
  {
    method: "POST",
    path: "/v1/api-keys",
    description: "Crée une nouvelle clé API",
  },
  {
    method: "GET",
    path: "/v1/api-keys/:id",
    description: "Récupère les détails d'une clé",
  },
  {
    method: "DELETE",
    path: "/v1/api-keys/:id",
    description: "Révoque une clé API",
  },
  {
    method: "GET",
    path: "/v1/api-keys/:id/usage",
    description: "Historique d'utilisation d'une clé",
  },
];

const scopes = [
  { name: "accounts:read", description: "Lecture des comptes" },
  { name: "accounts:write", description: "Création et modification des comptes" },
  { name: "transactions:read", description: "Lecture des transactions" },
  { name: "transactions:write", description: "Création de transactions" },
  { name: "cards:read", description: "Lecture des cartes" },
  { name: "cards:write", description: "Gestion des cartes" },
  { name: "webhooks:manage", description: "Gestion des webhooks" },
  { name: "admin", description: "Accès administratif complet" },
];

export default function SecurityApiKeysPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Key className="w-4 h-4" />
          Sécurité
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Clés <span className="text-primary">API</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos clés API pour sécuriser l'accès à nos services. Créez, révopez et surveillez
          l'utilisation de vos clés.
        </p>
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
              Les clés API vous permettent d'authentifier vos requêtes auprès de l'API Aether Bank.
              Chaque clé est associée à des scopes qui définissent les permissions accordées.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nous vous recommandons de créer des clés séparées pour chaque application ou usage
              différent. Cela vous permet de révoquer une clé compromise sans affecter vos autres
              services.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Fonctionnalités</h2>
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
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Authentification</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format des clés API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Les clés API utilisent le format <code className="bg-muted px-1 rounded">sk_</code>{" "}
              suivi d'un préfixe identifiant le type et une clé secrète.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton code="Authorization: Bearer sk_live_xxxxxxxxxxxxxxxxxxxx" />
              <pre className="text-sm font-mono">
                Authorization: Bearer sk_live_xxxxxxxxxxxxxxxxxxxx
              </pre>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Sécurité</p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Ne partagez jamais vos clés API en clair. Utilisez toujours des variables
                  d'environnement ou un gestionnaire de secrets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scopes disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Scope</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {scopes.map((scope, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{scope.name}</code>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {scope.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                Utilisez le préfixe <code className="bg-muted px-1 rounded">sk_test_</code>
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
                Utilisez le préfixe <code className="bg-muted px-1 rounded">sk_live_</code>
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

      <section id="examples" className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Exemples d'utilisation</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Créer une clé API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Créez une nouvelle clé API avec des scopes spécifiques.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/api-keys \\
  -H "Authorization: Bearer sk_test_admin123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API Key",
    "scopes": ["accounts:read", "transactions:read", "transactions:write"],
    "expires_at": "2027-01-01T00:00:00Z"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/api-keys \\
  -H "Authorization: Bearer sk_test_admin123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API Key",
    "scopes": ["accounts:read", "transactions:read", "transactions:write"],
    "expires_at": "2027-01-01T00:00:00Z"
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "key_xyz789",
  "name": "Production API Key",
  "key": "sk_live_xxxxxxxxxxxxxxxxxxxx",
  "key_prefix": "sk_live_xxxx",
  "scopes": ["accounts:read", "transactions:read", "transactions:write"],
  "created_at": "2026-03-31T10:00:00Z",
  "expires_at": "2027-01-01T00:00:00Z",
  "last_used_at": null
}`}</p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800 dark:text-red-200">Important</p>
                <p className="text-red-700 dark:text-red-300">
                  La clé secrète complète n'est affichée qu'une seule fois lors de la création.
                  Conservez-la en lieu sûr.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lister les clés API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Récupérez la liste de toutes vos clés API (sans la clé secrète).
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/api-keys \\
  -H "Authorization: Bearer sk_test_admin123"`}
              />
              <pre className="text-sm font-mono">{`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/api-keys \\
  -H "Authorization: Bearer sk_test_admin123"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "data": [
    {
      "id": "key_xyz789",
      "name": "Production API Key",
      "key_prefix": "sk_live_xxxx",
      "scopes": ["accounts:read", "transactions:read"],
      "status": "active",
      "created_at": "2026-03-31T10:00:00Z",
      "last_used_at": "2026-03-31T14:30:00Z"
    },
    {
      "id": "key_abc123",
      "name": "Test API Key",
      "key_prefix": "sk_test_xxxx",
      "scopes": ["accounts:read"],
      "status": "active",
      "created_at": "2026-03-15T09:00:00Z",
      "last_used_at": "2026-03-30T16:45:00Z"
    }
  ],
  "total": 2
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="best-practices" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Bonnes pratiques</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Utilisez le principe du moindre privilège</p>
                  <p className="text-sm text-muted-foreground">
                    N'accordez que les scopes strictement nécessaires à chaque clé.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Rotation régulière</p>
                  <p className="text-sm text-muted-foreground">
                    Renouvelez vos clés tous les 90 jours ou immédiatement en cas de compromission.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Séparez les environnements</p>
                  <p className="text-sm text-muted-foreground">
                    Utilisez des clés distinctes pour le développement, les tests et la production.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Stockage sécurisé</p>
                  <p className="text-sm text-muted-foreground">
                    Utilisez un gestionnaire de secrets (HashiCorp Vault, AWS Secrets Manager)
                    plutôt que des fichiers en clair.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Créer une nouvelle clé</h2>
            <p className="text-muted-foreground">
              Générez une nouvelle clé API pour votre application.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/quick-start">
                Guide de démarrage <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/security/authentication">Authentification</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
