"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Globe,
  ArrowRight,
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
  Users,
  Database,
  Building,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Paramètres de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Paramètres réels",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Configuration centralisée",
    description: "Gérez tous les paramètres de votre plateforme depuis une API unifiée.",
    icon: SettingsIcon,
  },
  {
    title: "Multi-utilisateurs",
    description: "Définissez des rôles et permissions pour chaque membre de votre équipe.",
    icon: Users,
  },
  {
    title: "Préférences globales",
    description: "Configurez la langue, le fuseau horaire et les devises par défaut.",
    icon: Globe,
  },
  {
    title: "Audit complet",
    description: "Historique de toutes les modifications de paramètres.",
    icon: Database,
  },
];

const settingsSections = [
  {
    title: "Profil administrateur",
    description: "Gérez vos informations personnelles et vos accès",
    icon: User,
    endpoint: "/settings/profile",
  },
  {
    title: "Sécurité",
    description: "Mot de passe, 2FA, sessions actives",
    icon: Shield,
    endpoint: "/settings/security",
  },
  {
    title: "Notifications",
    description: "Préférences de notifications et alertes",
    icon: Bell,
    endpoint: "/settings/notifications",
  },
  {
    title: "International",
    description: "Langue, fuseau horaire, devises",
    icon: Globe,
    endpoint: "/settings/international",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/settings",
    description: "Récupérer tous les paramètres",
    parameters: [],
  },
  {
    method: "GET",
    path: "/settings/profile",
    description: "Profil administrateur",
    parameters: [],
  },
  {
    method: "PUT",
    path: "/settings/profile",
    description: "Modifier le profil",
    parameters: ["name", "email", "phone"],
  },
  {
    method: "GET",
    path: "/settings/security",
    description: "Paramètres de sécurité",
    parameters: [],
  },
  {
    method: "PUT",
    path: "/settings/security",
    description: "Modifier les paramètres de sécurité",
    parameters: ["two_factor_required", "session_timeout"],
  },
  {
    method: "GET",
    path: "/settings/notifications",
    description: "Préférences de notification",
    parameters: [],
  },
  {
    method: "PUT",
    path: "/settings/notifications",
    description: "Modifier les notifications",
    parameters: ["email_enabled", "push_enabled", "sms_enabled"],
  },
  {
    method: "GET",
    path: "/settings/international",
    description: "Paramètres internationaux",
    parameters: [],
  },
  {
    method: "PUT",
    path: "/settings/international",
    description: "Modifier les paramètres",
    parameters: ["language", "timezone", "default_currency"],
  },
  {
    method: "GET",
    path: "/settings/audit-log",
    description: "Journal d'audit",
    parameters: ["from_date", "to_date", "limit"],
  },
];

const webhookEvents = [
  {
    event: "settings.updated",
    description: "Paramètres modifiés",
    payload: "setting_key, old_value, new_value, updated_by",
  },
  {
    event: "settings.security_changed",
    description: "Sécurité modifiée",
    payload: "setting_key, changed_by, timestamp",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  getSettings: {
    title: "Récupérer les paramètres",
    description: "Obtenez tous les paramètres de votre plateforme.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/settings \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "profile": {
    "name": "Jean Dupont",
    "email": "jean.dupont@company.com",
    "phone": "+33612345678",
    "avatar_url": "https://api.aetherbank.com/avatars/usr_xyz789"
  },
  "security": {
    "two_factor_required": true,
    "session_timeout": 3600,
    "ip_whitelist_enabled": false
  },
  "notifications": {
    "email_enabled": true,
    "push_enabled": true,
    "sms_enabled": false
  },
  "international": {
    "language": "fr",
    "timezone": "Europe/Paris",
    "default_currency": "EUR"
  }
}`,
  },
  updateProfile: {
    title: "Modifier le profil",
    description: "Mettez à jour les informations de votre profil.",
    code: `curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/settings/profile \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jean Dupont",
    "email": "jean.dupont@newcompany.com",
    "phone": "+33687654321"
  }'

# Réponse:
{
  "profile": {
    "name": "Jean Dupont",
    "email": "jean.dupont@newcompany.com",
    "phone": "+33687654321",
    "updated_at": "2026-03-31T10:00:00Z"
  }
}`,
  },
  updateSecurity: {
    title: "Modifier la sécurité",
    description: "Configurez les paramètres de sécurité.",
    code: `curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/settings/security \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "two_factor_required": true,
    "session_timeout": 7200,
    "ip_whitelist_enabled": true,
    "allowed_ips": ["192.168.1.0/24"]
  }'

# Réponse:
{
  "security": {
    "two_factor_required": true,
    "session_timeout": 7200,
    "ip_whitelist_enabled": true,
    "allowed_ips": ["192.168.1.0/24"],
    "updated_at": "2026-03-31T10:00:00Z"
  }
}`,
  },
  auditLog: {
    title: "Journal d'audit",
    description: "Consultez l'historique des modifications.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/settings/audit-log?from_date=2026-01-01&to_date=2026-03-31&limit=50" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "aud_xyz789",
      "action": "settings.updated",
      "setting_key": "security.two_factor_required",
      "old_value": false,
      "new_value": true,
      "changed_by": "usr_xyz789",
      "ip_address": "192.168.1.1",
      "timestamp": "2026-03-31T10:00:00Z"
    },
    {
      "id": "aud_abc123",
      "action": "settings.updated",
      "setting_key": "profile.email",
      "old_value": "old@email.com",
      "new_value": "new@email.com",
      "changed_by": "usr_xyz789",
      "ip_address": "192.168.1.1",
      "timestamp": "2026-03-30T14:30:00Z"
    }
  ],
  "total": 127,
  "limit": 50,
  "offset": 0
}`,
  },
};

export default function PlatformSettingsPage() {
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
          <SettingsIcon className="w-4 h-4" />
          Platform Settings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Paramètres</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la gestion des paramètres de votre plateforme. Profils, sécurité,
          notifications et configuration internationale.
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
              href="#concepts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Concepts
            </a>
            <a
              href="#sections"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Sections
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

      {/* Sections */}
      <section id="sections" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Sections de paramètres</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                  <code className="text-xs px-2 py-1 rounded bg-muted">{section.endpoint}</code>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/settings \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Bonnes pratiques</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1 ml-4 list-disc">
              <li>Activer le 2FA pour tous les administrateurs</li>
              <li>Définir des sessions timeout courtes</li>
              <li>Activer le IP whitelisting en production</li>
              <li>Consulter régulièrement le journal d&apos;audit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <div className="space-y-3">
          {endpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded font-bold text-xs ${
                      endpoint.method === "GET"
                        ? "bg-green-100 text-green-700"
                        : endpoint.method === "PUT"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
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

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à configurer votre plateforme ?</h2>
            <p className="text-muted-foreground">
              Personnalisez les paramètres de votre plateforme via l&apos;API.
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
