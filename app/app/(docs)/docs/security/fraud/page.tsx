"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  ChevronRight,
  Copy,
  CheckCircle,
  Globe,
  Bell,
  Lock,
  ArrowRight,
  Clock,
  Zap,
  AlertCircle,
  Eye,
  CheckCircle2,
  RefreshCw,
  DollarSign,
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
  { title: "Signaux d'alerte", href: "#signals" },
  { title: "Endpoints", href: "#endpoints" },
  { title: "Webhooks", href: "#webhooks" },
  { title: "Exemples", href: "#examples" },
];

const fraudProtections = [
  {
    title: "Surveillance en temps réel",
    description:
      "Nos systèmes analysent chaque transaction en moins de 100ms pour détecter les activités suspectes.",
    icon: Eye,
  },
  {
    title: "Alertes automatiques",
    description:
      "Recevez des notifications push et email instantanées en cas de transaction inhabituelle.",
    icon: Bell,
  },
  {
    title: "Limites de spending",
    description: "Configurez des limites quotidiennes et mensuelles par carte ou par utilisateur.",
    icon: DollarSign,
  },
  {
    title: "Blocage immédiat",
    description:
      "Bloquez instantanément vos cartes depuis l'application ou l'API en cas de suspicion.",
    icon: Lock,
  },
  {
    title: "Machine Learning",
    description:
      "Notre modèle IA apprend vos habitudes de consommation pour détecter les anomalies.",
    icon: Zap,
  },
  {
    title: "Verification 3D Secure",
    description: "Authentification renforcée pour les paiements en ligne avec validation par OTP.",
    icon: Shield,
  },
];

const suspiciousActivities = [
  {
    title: "Transaction d'un montant inhabituel",
    description: "Une transaction dépassant vos habitudes de spending",
    severity: "high",
  },
  {
    title: "Connexion depuis un nouvel appareil",
    description: "Première connexion depuis un appareil ou localisation inconnue",
    severity: "medium",
  },
  {
    title: "Plusieurs tentatives de paiement échouées",
    description: "Tentatives multiples de paiement sur une courte période",
    severity: "high",
  },
  {
    title: "Transaction dans un pays inhabituel",
    description: "Paiement effectué depuis un pays où vous n'avez jamais transacté",
    severity: "medium",
  },
  {
    title: "Forte augmentation du volume de transactions",
    description: "Nombre de transactions inhabituellement élevé",
    severity: "low",
  },
  {
    title: "Transaction vers un nouveau destinataire",
    description: "Premier virement vers un compte non enregistré",
    severity: "low",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/fraud/alerts",
    description: "Liste les alertes de fraude actives",
  },
  {
    method: "GET",
    path: "/v1/fraud/alerts/:id",
    description: "Détails d'une alerte spécifique",
  },
  {
    method: "POST",
    path: "/v1/fraud/alerts/:id/verify",
    description: "Confirme ou rejette une alerte",
  },
  {
    method: "POST",
    path: "/v1/fraud/card/:id/block",
    description: "Bloque immédiatement une carte",
  },
  {
    method: "GET",
    path: "/v1/fraud/settings",
    description: "Récupère les paramètres de protection",
  },
  {
    method: "PUT",
    path: "/v1/fraud/settings",
    description: "Met à jour les paramètres de protection",
  },
];

const webhookEvents = [
  {
    event: "fraud.alert",
    description: "Nouvelle alerte de fraude détectée",
  },
  {
    event: "fraud.transaction_blocked",
    description: "Transaction bloquée par notre système",
  },
  {
    event: "fraud.card_blocked",
    description: "Carte bloquée suite à une suspicion",
  },
  {
    event: "fraud.login_blocked",
    description: "Connexion bloquée pour cause suspecte",
  },
];

export default function SecurityFraudPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" />
          Sécurité
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Protection contre la <span className="text-primary">fraude</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment nous protégeons vos finances contre la fraude avec notre système de
          surveillance intelligent et en temps réel.
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
              Notre système de protection contre la fraude utilise une combinaison de règles
              paramétrables et de machine learning pour détecter les activités suspectes en temps
              réel. Chaque transaction est analysée en moins de 100ms sans impacter votre expérience
              utilisateur.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              En cas de détection d'anomalie, vous êtes immédiatement notifié par push et email, et
              des actions automatiques peuvent être prises pour protéger vos fonds.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Nos protections</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {fraudProtections.map((protection, index) => {
            const Icon = protection.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{protection.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{protection.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="signals" className="space-y-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Signaux d'alerte</h2>
        </div>
        <p className="text-muted-foreground">
          Voici les activités qui peuvent indiquer une tentative de fraude :
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {suspiciousActivities.map((activity, index) => (
            <div key={index} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                    activity.severity === "high"
                      ? "bg-red-500"
                      : activity.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <div>
                  <h3 className="font-semibold mb-1">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
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

      <section id="webhooks" className="space-y-6">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-primary" />
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
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Exemples d'utilisation</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bloquer une carte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Bloquez immédiatement une carte suspecte.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/fraud/card/crd_xyz789/block \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "suspicious_activity",
    "notify_holder": true
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/fraud/card/crd_xyz789/block \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "suspicious_activity",
    "notify_holder": true
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "card_id": "crd_xyz789",
  "status": "blocked",
  "blocked_at": "2026-03-31T10:00:00Z",
  "reason": "suspicious_activity",
  "notification_sent": true
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lister les alertes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Récupérez la liste des alertes de fraude actives.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/fraud/alerts \\
  -H "Authorization: Bearer sk_test_abc123"`}
              />
              <pre className="text-sm font-mono">{`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/fraud/alerts \\
  -H "Authorization: Bearer sk_test_abc123"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "data": [
    {
      "id": "frm_alert_123",
      "type": "unusual_transaction_amount",
      "severity": "high",
      "status": "pending",
      "transaction_id": "trf_xyz789",
      "amount": 500000,
      "created_at": "2026-03-31T09:45:00Z"
    }
  ],
  "total": 1
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Signaler une fraude</h2>
            <p className="text-muted-foreground">
              Si vous constatez une activité suspecte, contactez-nous immédiatement.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/support/contact">
                Contacter le support <ArrowRight className="w-4 h-4 ml-2" />
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
