"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ArrowRight,
  BookOpen,
  ExternalLink,
  BookText,
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
  Headphones,
  FileQuestion,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Environnement de test",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Environnement de production",
    color: "green",
    icon: HelpCircle,
  },
];

const concepts = [
  {
    title: "Support multi-canal",
    description: "Email, chat, téléphone et tickets pour répondre à tous vos besoins.",
    icon: Headphones,
  },
  {
    title: "Documentation complète",
    description: "Guides, tutoriels et références API détaillées.",
    icon: BookText,
  },
  {
    title: "FAQ interactive",
    description: "Trouvez rapidement des réponses aux questions fréquentes.",
    icon: FileQuestion,
  },
  {
    title: "Tickets de support",
    description: "Suivez l'évolution de vos demandes en temps réel.",
    icon: MessageSquare,
  },
];

const supportChannels = [
  {
    title: "Email",
    description: "support@skygenesisenterprise.com",
    icon: Mail,
    availability: "Réponse sous 24h",
    responseTime: "< 24h",
  },
  {
    title: "Chat en direct",
    description: "Disponible 7j/7, 24h/24",
    icon: MessageCircle,
    availability: "Immédiat",
    responseTime: "0-5 min",
  },
  {
    title: "Téléphone",
    description: "+33 1 23 45 67 89",
    icon: Phone,
    availability: "Lun-Ven 9h-18h",
    responseTime: "Immédiat",
  },
  {
    title: "Tickets",
    description: "Système de tickets pour suivi",
    icon: MessageSquare,
    availability: "7j/7",
    responseTime: "< 4h (Enterprise)",
  },
];

const resources = [
  {
    title: "Documentation API",
    description: "Guides et références complètes de l'API",
    href: "/docs/quick-start",
    icon: BookOpen,
    popular: true,
  },
  {
    title: "Guides d'intégration",
    description: "Tutoriels pas-à-pas pour démarrer",
    href: "/docs/quick-start",
    icon: BookText,
    popular: false,
  },
  {
    title: "FAQ",
    description: "Questions fréquentes sur les fonctionnalités",
    href: "/docs/support/faq",
    icon: FileQuestion,
    popular: false,
  },
  {
    title: "Statut des services",
    description: "Vérifiez l'état de nos services",
    href: "/status",
    icon: ExternalLink,
    popular: true,
  },
];

const endpoints = [
  {
    method: "POST",
    path: "/support/tickets",
    description: "Créer un ticket de support",
    parameters: ["subject", "category", "priority", "description"],
  },
  {
    method: "GET",
    path: "/support/tickets",
    description: "Liste de vos tickets",
    parameters: ["status", "limit", "offset"],
  },
  {
    method: "GET",
    path: "/support/tickets/:id",
    description: "Détails d'un ticket",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/support/tickets/:id/messages",
    description: "Ajouter un message",
    parameters: ["id", "message"],
  },
  {
    method: "GET",
    path: "/support/faq",
    description: "FAQ catégories",
    parameters: ["category"],
  },
];

const webhookEvents = [
  {
    event: "support.ticket.created",
    description: "Nouveau ticket créé",
    payload: "ticket_id, subject, priority",
  },
  {
    event: "support.ticket.replied",
    description: "Réponse du support",
    payload: "ticket_id, message, replied_by",
  },
  {
    event: "support.ticket.resolved",
    description: "Ticket résolu",
    payload: "ticket_id, resolved_by, resolution",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  createTicket: {
    title: "Créer un ticket",
    description: "Ouvrez un ticket de support pour une demande spécifique.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Problème avec les webhooks",
    "category": "technical",
    "priority": "high",
    "description": "Les webhooks ne sont plus reçus depuis 2 heures. Merci de vérifier.",
    "attachments": ["screenshot.png"]
  }'

# Réponse:
{
  "id": "tkt_xyz789",
  "subject": "Problème avec les webhooks",
  "category": "technical",
  "priority": "high",
  "status": "open",
  "created_at": "2026-03-31T10:00:00Z",
  "estimated_response": "2026-03-31T14:00:00Z"
}`,
  },
  listTickets: {
    title: "Lister mes tickets",
    description: "Récupérez la liste de vos tickets de support.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets?status=open&limit=20" \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "data": [
    {
      "id": "tkt_xyz789",
      "subject": "Problème avec les webhooks",
      "category": "technical",
      "priority": "high",
      "status": "open",
      "created_at": "2026-03-31T10:00:00Z",
      "updated_at": "2026-03-31T10:00:00Z"
    },
    {
      "id": "tkt_abc123",
      "subject": "Question sur les limites de débit",
      "category": "billing",
      "priority": "normal",
      "status": "resolved",
      "created_at": "2026-03-28T14:30:00Z",
      "resolved_at": "2026-03-29T09:15:00Z"
    }
  ],
  "total": 5,
  "limit": 20,
  "offset": 0
}`,
  },
  addMessage: {
    title: "Ajouter un message",
    description: "Répondez à un ticket de support existant.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets/tkt_xyz789/messages \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "J'ai trouvé le problème. C'était une erreur de configuration de notre côté."
  }'

# Réponse:
{
  "id": "msg_xyz789",
  "ticket_id": "tkt_xyz789",
  "message": "J'ai trouvé le problème. C'était une erreur de configuration de notre côté.",
  "sent_by": "user",
  "sent_at": "2026-03-31T10:30:00Z"
}`,
  },
  getFaq: {
    title: "Consulter la FAQ",
    description: "Récupérez les questions fréquentes par catégorie.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/support/faq?category=technical \\
  -H "Authorization: Bearer sk_test_abc123"

# Réponse:
{
  "category": "technical",
  "questions": [
    {
      "id": "faq_001",
      "question": "Comment configurer les webhooks ?",
      "answer": "Pour configurer un webhook, rendez-vous dans Settings > Webhooks et ajoutez votre URL de callback...",
      "tags": ["webhooks", "api"]
    },
    {
      "id": "faq_002",
      "question": "Quelles sont les limites de l'API ?",
      "answer": "Les limites varient selon votre plan...",
      "tags": ["rate-limits", "api"]
    }
  ]
}`,
  },
};

export default function PlatformHelpPage() {
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
          <HelpCircle className="w-4 h-4" />
          Platform Help
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Support</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour la gestion du support. Tickets, FAQ et intégration avec vos systèmes de
          helpdesk.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/docs/quick-start">
              <Zap className="w-4 h-4 mr-2" />
              Démarrage rapide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/support/faq">
              <FileQuestion className="w-4 h-4 mr-2" />
              FAQ
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
              href="#support"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Support
            </a>
            <a
              href="#resources"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Ressources
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

      {/* Support */}
      <section id="support" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Canaux de support</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {supportChannels.map((channel, index) => {
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
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{channel.availability}</span>
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                      {channel.responseTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Ressources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Link key={index} href={resource.href}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{resource.title}</h3>
                          {resource.popular && (
                            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                              Populaire
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </Link>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets \\
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

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Besoin d&apos;aide ?</h2>
            <p className="text-muted-foreground">
              Notre équipe de support est disponible 7j/7 pour vous aider.
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
              <Link href="/docs/support/faq">
                <FileQuestion className="w-4 h-4 mr-2" />
                FAQ
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
