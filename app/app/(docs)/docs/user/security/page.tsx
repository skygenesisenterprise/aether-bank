"use client";

import Link from "next/link";
import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock,
  Shield,
  Key,
  Smartphone,
  Eye,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Copy,
  Globe,
  Zap,
  Clock,
  Fingerprint,
  Monitor,
  Trash2,
  RefreshCw,
  ArrowRight,
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
  { title: "Environnements de Test", href: "#environments" },
  { title: "Exemples d'utilisation", href: "#examples" },
];

const securityMethods = [
  {
    title: "Mot de passe",
    description:
      "Utilisez un mot de passe fort et unique. Nous recommendons 12+ caractères avec majuscules, minuscules, chiffres et symboles.",
    icon: Key,
  },
  {
    title: "Authentification à deux facteurs (2FA)",
    description:
      "Ajoutez une couche de sécurité supplémentaire avec SMS, application authenticator ou clé de sécurité physique.",
    icon: Fingerprint,
  },
  {
    title: "Clés de sécurité WebAuthn/FIDO2",
    description:
      "Utilisez une clé USB physique pour une authentification encore plus sécurisée et resistente au phishing.",
    icon: Shield,
  },
  {
    title: "Sessions gérées",
    description:
      "Suivez et gérez toutes vos sessions actives. Révoquez instantanément celles qui vous semblent suspectes.",
    icon: Monitor,
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/security/sessions",
    description: "Liste toutes les sessions actives de l'utilisateur",
  },
  {
    method: "DELETE",
    path: "/v1/security/sessions/:id",
    description: "Révoque une session spécifique",
  },
  {
    method: "DELETE",
    path: "/v1/security/sessions",
    description: "Révoque toutes les sessions sauf la session actuelle",
  },
  {
    method: "POST",
    path: "/v1/security/2fa/setup",
    description: "Initialise la configuration 2FA",
  },
  {
    method: "POST",
    path: "/v1/security/2fa/verify",
    description: "Vérifie et active le code 2FA",
  },
  {
    method: "DELETE",
    path: "/v1/security/2fa",
    description: "Désactive la 2FA",
  },
  {
    method: "POST",
    path: "/v1/security/password/change",
    description: "Change le mot de passe de l'utilisateur",
  },
  {
    method: "POST",
    path: "/v1/security/password/reset",
    description: "Demande une réinitialisation du mot de passe",
  },
];

const webhookEvents = [
  {
    event: "security.login",
    description: "Nouvelle connexion détectée",
  },
  {
    event: "security.login_failed",
    description: "Échec de connexion",
  },
  {
    event: "security.password_changed",
    description: "Mot de passe modifié",
  },
  {
    event: "security.2fa_enabled",
    description: "2FA activée",
  },
  {
    event: "security.2fa_disabled",
    description: "2FA désactivée",
  },
  {
    event: "security.session_revoked",
    description: "Session révoquée",
  },
];

export default function UserSecurityPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lock className="w-4 h-4" />
          Sécurité Utilisateur
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Sécurité du <span className="text-primary">Compte</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Protégez votre compte avec nos options de sécurité avancées. Gérez vos sessions, activez
          l'authentification à deux facteurs et surveillez l'activité de votre compte.
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
              L'API Sécurité d'Aether Bank permet aux développeurs d'intégrer des fonctionnalités de
              sécurité robustes dans leurs applications. Gérez les sessions utilisateur,
              l'authentification à deux facteurs, et surveillez l'activité suspecte en temps réel.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Notre système de sécurité est conçu selon les principes de défense en profondeur, avec
              chiffrement TLS 1.3, protection contre les attaques par force brute, et surveillance
              continue des activités suspectes.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Concepts Clés</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {securityMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
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
            <CardTitle className="text-lg">En-têtes d'authentification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toutes les requêtes vers l'API Sécurité doivent inclure un token Bearer valide.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton code="Authorization: Bearer sk_test_xxxxxxxxxxxxxxxxxxxx" />
              <pre className="text-sm font-mono">
                Authorization: Bearer sk_test_xxxxxxxxxxxxxxxxxxxx
              </pre>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Environnement de test
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Utilisez le préfixe{" "}
                  <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">sk_test_</code>{" "}
                  pour l'environnement sandbox. Les clés de production utilisent le préfixe{" "}
                  <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">sk_live_</code>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="environments" className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
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
                Environment de test avec données fictives. Idéal pour le développement et les tests.
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
                Environment de production avec données réelles. Rate limits appliqués.
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
                          : endpoint.method === "DELETE"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
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
            <CardTitle className="text-lg">Lister les sessions actives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Récupérez toutes les sessions actives de l'utilisateur connecté.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/security/sessions \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"`}
              />
              <pre className="text-sm font-mono">{`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/security/sessions \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "data": [
    {
      "id": "ses_xyz789",
      "device": "MacBook Pro",
      "browser": "Chrome 122.0",
      "os": "macOS 14.3",
      "ip": "92.184.xx.xx",
      "location": "Paris, FR",
      "created_at": "2026-03-31T14:32:00Z",
      "last_active": "2026-03-31T16:45:00Z",
      "is_current": true
    },
    {
      "id": "ses_abc456",
      "device": "iPhone 14",
      "browser": "Safari Mobile",
      "os": "iOS 17.4",
      "ip": "92.184.xx.xx",
      "location": "Paris, FR",
      "created_at": "2026-03-30T09:15:00Z",
      "last_active": "2026-03-30T12:30:00Z",
      "is_current": false
    }
  ],
  "total": 2
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Révoquer une session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Révoquez une session spécifique pour déconnecter l'appareil.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X DELETE https://sandbox.bank.skygenesisenterprise.com/api/v1/security/sessions/ses_abc456 \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"`}
              />
              <pre className="text-sm font-mono">{`curl -X DELETE https://sandbox.bank.skygenesisenterprise.com/api/v1/security/sessions/ses_abc456 \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "ses_abc456",
  "status": "revoked",
  "revoked_at": "2026-03-31T17:00:00Z"
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activer la 2FA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Initialisez la configuration de l'authentification à deux facteurs.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/security/2fa/setup \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "totp",
    "issuer": "Aether Bank"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/security/2fa/setup \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "totp",
    "issuer": "Aether Bank"
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "secret": "JBSWY3DPEHPK3PXP",
  "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "backup_codes": [
    "a1b2c3d4",
    "e5f6g7h8",
    "i9j0k1l2",
    "m3n4o5p6",
    "q7r8s9t0"
  ]
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">En savoir plus</h2>
            <p className="text-muted-foreground">
              Consultez notre documentation complète sur la sécurité et les bonnes pratiques.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/security/authentication">
                Authentification <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/security/2fa">Guide 2FA</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
