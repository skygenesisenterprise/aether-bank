"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  Mail,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Settings,
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
  MessageSquare,
  Send,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Notifications de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Notifications réelles",
    color: "green",
    icon: Bell,
  },
];

const concepts = [
  {
    title: "Multi-canal",
    description: "Email, push, SMS et webhooks pour une couverture complète.",
    icon: Send,
  },
  {
    title: "Temps réel",
    description: "Notifications instantanées pour tous les événements critiques.",
    icon: Zap,
  },
  {
    title: "Personnalisable",
    description: "Templates et préférences par utilisateur configurable.",
    icon: Settings,
  },
  {
    title: "Webhooks",
    description: "Intégrez les notifications dans vos systèmes via webhooks.",
    icon: Webhook,
  },
];

const notificationChannels = [
  {
    title: "Email",
    description: "Notifications par email pour les événements importants",
    icon: Mail,
    status: "active",
  },
  {
    title: "Push",
    description: "Notifications push sur mobile et navigateur",
    icon: Smartphone,
    status: "active",
  },
  {
    title: "SMS",
    description: "Alertes SMS pour les transactions critiques",
    icon: Bell,
    status: "active",
  },
  {
    title: "Webhook",
    description: "Intégration dans vos systèmes internes",
    icon: MessageSquare,
    status: "active",
  },
];

const notificationTypes = [
  {
    category: "Transactions",
    events: ["transfer.completed", "transfer.failed", "direct_debit.created"],
  },
  {
    category: "Sécurité",
    events: ["login.success", "login.failed", "2fa.enabled", "password.changed"],
  },
  { category: "Comptes", events: ["balance.low", "balance.critical", "account.created"] },
  { category: "Cartes", events: ["card.used", "card.blocked", "card.limit_reached"] },
];

const endpoints = [
  {
    method: "GET",
    path: "/notifications",
    description: "Liste des notifications",
    parameters: ["user_id", "type", "read", "limit", "offset"],
  },
  {
    method: "POST",
    path: "/notifications",
    description: "Envoyer une notification",
    parameters: ["user_id", "type", "channel", "content", "data"],
  },
  {
    method: "GET",
    path: "/notifications/:id",
    description: "Détails d'une notification",
    parameters: ["id"],
  },
  {
    method: "PUT",
    path: "/notifications/:id/read",
    description: "Marquer comme lu",
    parameters: ["id"],
  },
  {
    method: "PUT",
    path: "/notifications/preferences",
    description: "Mettre à jour les préférences",
    parameters: ["user_id", "channels", "types", "quiet_hours"],
  },
  {
    method: "GET",
    path: "/notifications/templates",
    description: "Liste des templates",
    parameters: ["type", "language"],
  },
  {
    method: "POST",
    path: "/notifications/webhooks",
    description: "Configurer un webhook",
    parameters: ["url", "events", "secret"],
  },
];

const webhookEvents = [
  {
    event: "notification.sent",
    description: "Notification envoyée",
    payload: "notification_id, user_id, channel, sent_at",
  },
  {
    event: "notification.delivered",
    description: "Notification livrée",
    payload: "notification_id, delivered_at",
  },
  {
    event: "notification.failed",
    description: "Échec d'envoi",
    payload: "notification_id, error, retry_count",
  },
  {
    event: "notification.clicked",
    description: "Notification cliquée",
    payload: "notification_id, user_id, action",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  sendNotification: {
    title: "Envoyer une notification",
    description: "Envoyez une notification à un utilisateur via un canal spécifique.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/notifications \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "type": "transfer_completed",
    "channel": "email",
    "content": {
      "subject": "Virement reçu",
      "body": "Vous avez reçu un virement de 500,00 €"
    },
    "data": {
      "transfer_id": "trf_abc123",
      "amount": 50000,
      "currency": "EUR",
      "sender": "Client ABC"
    }
  }'

# Réponse:
{
  "id": "notif_xyz789",
  "user_id": "usr_xyz789",
  "type": "transfer_completed",
  "channel": "email",
  "status": "sent",
  "sent_at": "2026-03-31T10:00:00Z",
  "delivered_at": "2026-03-31T10:00:02Z"
}`,
  },
  getNotifications: {
    title: "Lister les notifications",
    description: "Récupérez les notifications d'un utilisateur.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/notifications?user_id=usr_xyz789&limit=20&offset=0" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "notif_xyz789",
      "type": "transfer_completed",
      "channel": "email",
      "title": "Virement reçu",
      "body": "Vous avez reçu un virement de 500,00 €",
      "read": true,
      "read_at": "2026-03-31T10:05:00Z",
      "sent_at": "2026-03-31T10:00:00Z"
    },
    {
      "id": "notif_abc123",
      "type": "card_used",
      "channel": "push",
      "title": "Paiement par carte",
      "body": "Paiement de 45,99 € chez Amazon",
      "read": false,
      "sent_at": "2026-03-30T15:30:00Z"
    }
  ],
  "total": 47,
  "unread_count": 12,
  "limit": 20,
  "offset": 0
}`,
  },
  updatePreferences: {
    title: "Préférences de notification",
    description: "Configurez les préférences de notification d'un utilisateur.",
    code: `curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/notifications/preferences \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "usr_xyz789",
    "channels": {
      "email": true,
      "push": true,
      "sms": false
    },
    "types": {
      "transactions": true,
      "security": true,
      "marketing": false
    },
    "quiet_hours": {
      "enabled": true,
      "start": "22:00",
      "end": "08:00",
      "timezone": "Europe/Paris"
    }
  }'

# Réponse:
{
  "user_id": "usr_xyz789",
  "channels": {
    "email": true,
    "push": true,
    "sms": false
  },
  "types": {
    "transactions": true,
    "security": true,
    "marketing": false
  },
  "quiet_hours": {
    "enabled": true,
    "start": "22:00",
    "end": "08:00",
    "timezone": "Europe/Paris"
  },
  "updated_at": "2026-03-31T10:00:00Z"
}`,
  },
  configureWebhook: {
    title: "Configurer un webhook",
    description: "Recevez les notifications directement dans votre système.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/notifications/webhooks \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourapp.com/webhooks/notifications",
    "events": [
      "transfer.completed",
      "transfer.failed",
      "card.used",
      "security.login_failed"
    ],
    "secret": "whsec_your_webhook_secret"
  }'

# Réponse:
{
  "id": "whk_xyz789",
  "url": "https://yourapp.com/webhooks/notifications",
  "events": [
    "transfer.completed",
    "transfer.failed",
    "card.used",
    "security.login_failed"
  ],
  "status": "active",
  "created_at": "2026-03-31T10:00:00Z"
}

# Payload webhook reçu:
# {
#   "event": "transfer.completed",
#   "timestamp": "2026-03-31T10:00:00Z",
#   "data": {
#     "notification_id": "notif_xyz789",
#     "user_id": "usr_xyz789",
#     "type": "transfer_completed"
#   }
# }`,
  },
};

export default function PlatformNotificationsPage() {
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
          <Bell className="w-4 h-4" />
          Platform Notifications
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Notifications</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la gestion des notifications. Multi-canal (email, push, SMS, webhook)
          avec personnalisations avancées.
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
              <Bell className="w-4 h-4 mr-2" />
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
              href="#channels"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Canaux
            </a>
            <a
              href="#types"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Types
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

      {/* Canaux */}
      <section id="channels" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Canaux de notification</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {notificationChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{channel.title}</h3>
                      <span className="inline-flex px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">
                        ✓ Actif
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Types */}
      <section id="types" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Types de notifications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {notificationTypes.map((type, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold">{type.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {type.events.map((event, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/notifications \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
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
          Recevez les notifications directement dans vos systèmes.
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
            <h2 className="text-xl font-semibold mb-2">Prêt à configurer les notifications ?</h2>
            <p className="text-muted-foreground">
              Configurez les webhooks et personnalisez les notifications pour vos utilisateurs.
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
                <Bell className="w-4 h-4 mr-2" />
                Sécurité
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
