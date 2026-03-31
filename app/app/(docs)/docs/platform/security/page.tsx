"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  Key,
  BookOpen,
  ChevronRight,
  Copy,
  CheckCircle as CheckCircleIcon,
  Key as KeyIcon,
  Webhook,
  Terminal,
  AlertCircle,
  Zap,
  Clock,
  RefreshCw,
  UserCheck,
  AlertTriangle,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Tests de sécurité fictifs",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Sécurité réelle active",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Authentification multi-facteurs",
    description: "SCA (Strong Customer Authentication) conforme PSD2 avec 2FA obligatoire.",
    icon: Fingerprint,
  },
  {
    title: "Chiffrement AES-256",
    description: "Données chiffrées au repos et en transit avec AES-256-GCM.",
    icon: Lock,
  },
  {
    title: "Gestion des clés API",
    description: "Clés avec permissions granulaires et rotation automatique.",
    icon: Key,
  },
  {
    title: "Détection de fraude",
    description: "Machine learning pour détecter les transactions suspectes.",
    icon: AlertTriangle,
  },
];

const securityFeatures = [
  {
    title: "2FA obligatoire",
    description: "Authentification forte pour toutes les connexions sensibles",
    icon: Shield,
    status: "enabled",
  },
  {
    title: "Chiffrement E2E",
    description: "AES-256 pour toutes les données",
    icon: Lock,
    status: "enabled",
  },
  {
    title: "Monitoring 24/7",
    description: "Surveillance permanente avec alertes",
    icon: Eye,
    status: "enabled",
  },
  {
    title: "Audit complet",
    description: "Logs immuables de toutes les actions",
    icon: ShieldCheck,
    status: "enabled",
  },
];

const protections = [
  {
    title: "Protection fraude",
    description: "Détection ML des transactions suspectes en temps réel",
    icon: AlertTriangle,
  },
  {
    title: "Limites configurables",
    description: "Plafonds quotidiens et mensuels par utilisateur",
    icon: Clock,
  },
  {
    title: "Alertes temps réel",
    description: "Notifications push et email pour chaque opération",
    icon: Eye,
  },
  {
    title: "Gestion des sessions",
    description: "Sessions actives avec déconnexion à distance",
    icon: UserCheck,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/security/api-keys",
    description: "Liste des clés API",
    parameters: ["limit", "offset"],
  },
  {
    method: "POST",
    path: "/security/api-keys",
    description: "Créer une clé API",
    parameters: ["name", "permissions", "expires_at", "ip_whitelist"],
  },
  {
    method: "DELETE",
    path: "/security/api-keys/:id",
    description: "Révoquer une clé",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/security/2fa/enable",
    description: "Activer le 2FA",
    parameters: ["user_id", "method (totp | sms | email)"],
  },
  {
    method: "POST",
    path: "/security/2fa/verify",
    description: "Vérifier le code 2FA",
    parameters: ["user_id", "code"],
  },
  {
    method: "GET",
    path: "/security/sessions",
    description: "Sessions actives",
    parameters: ["user_id"],
  },
  {
    method: "DELETE",
    path: "/security/sessions/:id",
    description: "Révoquer une session",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/security/limits",
    description: "Définir les limites",
    parameters: ["user_id", "daily_limit", "monthly_limit"],
  },
];

const webhookEvents = [
  {
    event: "security.login.success",
    description: "Connexion réussie",
    payload: "user_id, ip, device, location",
  },
  {
    event: "security.login.failed",
    description: "Échec de connexion",
    payload: "user_id, reason, ip, attempts",
  },
  {
    event: "security.2fa.enabled",
    description: "2FA activé",
    payload: "user_id, method, enabled_at",
  },
  {
    event: "security.key.created",
    description: "Nouvelle clé créée",
    payload: "key_id, name, permissions, created_at",
  },
  {
    event: "security.fraud.alert",
    description: "Alerte de fraude",
    payload: "transaction_id, risk_score, action_taken",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  createApiKey: {
    title: "Créer une clé API",
    description: "Générez une nouvelle clé API avec permissions spécifiques.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/security/api-keys \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API Key",
    "permissions": ["accounts:read", "transfers:write", "webhooks:manage"],
    "expires_at": "2027-03-31T00:00:00Z",
    "ip_whitelist": ["192.168.1.0/24", "10.0.0.1"]
  }'

# Réponse:
{
  "id": "key_xyz789",
  "name": "Production API Key",
  "key": "sk_live_abc123def456ghi789...",
  "key_prefix": "sk_live_abc123",
  "permissions": ["accounts:read", "transfers:write", "webhooks:manage"],
  "status": "active",
  "created_at": "2026-03-31T10:00:00Z",
  "expires_at": "2027-03-31T00:00:00Z"
}

# ⚠️ Important: Sauvegardez la clé immédiatement, elle ne sera plus visible`,
  },
  enable2FA: {
    title: "Activer le 2FA",
    description: "Activez l'authentification à deux facteurs pour un utilisateur.",
    code: `# Activer le 2FA par TOTP
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/security/2fa/enable \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "method": "totp"
  }'

# Réponse:
{
  "user_id": "usr_xyz789",
  "method": "totp",
  "status": "pending_verification",
  "qr_code_url": "https://api.aetherbank.com/security/2fa/qr/key_abc123",
  "secret": "JBSWY3DPEHPK3PXP",
  "backup_codes": [
    "1234-5678",
    "9012-3456",
    "7890-1234"
  ]
}

# Vérifier le code
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/security/2fa/verify \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "code": "123456"
  }'

# Réponse:
# { "verified": true }`,
  },
  manageLimits: {
    title: "Définir les limites",
    description: "Configurez les limites de transaction pour un utilisateur.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/security/limits \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "daily_limit": 1000000,
    "monthly_limit": 5000000,
    "per_transaction_limit": 500000
  }'

# Réponse:
{
  "user_id": "usr_xyz789",
  "limits": {
    "daily": {
      "limit": 1000000,
      "used": 450000,
      "remaining": 550000,
      "resets_at": "2026-04-01T00:00:00Z"
    },
    "monthly": {
      "limit": 5000000,
      "used": 1250000,
      "remaining": 3750000,
      "resets_at": "2026-05-01T00:00:00Z"
    },
    "per_transaction": 500000
  },
  "updated_at": "2026-03-31T10:00:00Z"
}`,
  },
  revokeSession: {
    title: "Révoquer une session",
    description: "Déconnectez un utilisateur à distance.",
    code: `# Lister les sessions actives
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/security/sessions?user_id=usr_xyz789 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "sessions": [
    {
      "id": "ses_abc123",
      "user_id": "usr_xyz789",
      "device": "Chrome on macOS",
      "ip": "192.168.1.1",
      "location": "Paris, FR",
      "last_active": "2026-03-31T09:45:00Z",
      "created_at": "2026-03-30T14:00:00Z"
    },
    {
      "id": "ses_def456",
      "user_id": "usr_xyz789",
      "device": "Mobile App iOS",
      "ip": "10.0.0.1",
      "location": "Paris, FR",
      "last_active": "2026-03-31T10:00:00Z",
      "created_at": "2026-03-29T08:00:00Z"
    }
  ]
}

# Révoquer une session spécifique
curl -X DELETE https://sandbox.bank.skygenesisenterprise.com/api/v1/security/sessions/ses_abc123 \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
# { "revoked": true, "session_id": "ses_abc123" }`,
  },
};

export default function PlatformSecurityPage() {
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
          <Shield className="w-4 h-4" />
          Platform Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Sécurité</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la sécurité de votre plateforme. Gestion des clés API, 2FA, limites et
          détection de fraude.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/security/authentication">
              <Key className="w-4 h-4 mr-2" />
              Authentification
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
              href="#features"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Fonctionnalités
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
              href="#protections"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Protections
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

      {/* Fonctionnalités */}
      <section id="features" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Fonctionnalités de sécurité</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <span className="inline-flex px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">
                        ✓ Actif
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/security/api-keys \\
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
              <li>Stocker les clés en variables d&apos;environnement</li>
              <li>Activer le IP whitelisting en production</li>
              <li>Activer le 2FA pour tous les utilisateurs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          Gérez les clés API, l&apos;authentification et les limites de sécurité.
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
                          : "bg-red-100 text-red-700"
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
          Recevez des notifications pour les événements de sécurité.
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

      {/* Protections */}
      <section id="protections" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Protections disponibles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {protections.map((protection, index) => {
            const Icon = protection.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{protection.title}</h3>
                  <p className="text-sm text-muted-foreground">{protection.description}</p>
                </div>
              </div>
            );
          })}
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
            <h2 className="text-xl font-semibold mb-2">Prêt à sécuriser votre plateforme ?</h2>
            <p className="text-muted-foreground">
              Activez le 2FA, configurez les limites et gérez vos clés API.
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
              <Link href="/docs/security/authentication">
                <Key className="w-4 h-4 mr-2" />
                Authentification
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
