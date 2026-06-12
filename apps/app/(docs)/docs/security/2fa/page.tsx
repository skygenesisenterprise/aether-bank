"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Smartphone,
  ChevronRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  Globe,
  Key,
  ArrowRight,
  Clock,
  Mail,
  Fingerprint,
  CheckCircle2,
  Settings,
  Zap,
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
  { title: "Méthodes disponibles", href: "#methods" },
  { title: "Endpoints API", href: "#endpoints" },
  { title: "Environnements", href: "#environments" },
  { title: "Exemples", href: "#examples" },
  { title: "Codes de secours", href: "#backup-codes" },
];

const twoFactorMethods = [
  {
    title: "Application Authenticator",
    description: "Utilisez Google Authenticator, Authy, ou toute application TOTP compatible.",
    icon: Smartphone,
    recommended: true,
    features: ["Plus sécurisé que SMS", "Fonctionne hors ligne", "Codes temporaires 30s"],
  },
  {
    title: "SMS",
    description: "Recevez le code par message texte sur votre téléphone.",
    icon: Mail,
    recommended: false,
    features: ["Facile à configurer", "Accessible à tous", "Dépendance réseau"],
  },
  {
    title: "Clé de sécurité",
    description: "Utilisez une clé USB WebAuthn/FIDO2 pour une sécurité maximale.",
    icon: Fingerprint,
    recommended: false,
    features: ["Résistant au phishing", "Aucun code à saisir", "Idéal pour entreprises"],
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/2fa/status",
    description: "Vérifie si la 2FA est activée pour l'utilisateur",
  },
  {
    method: "POST",
    path: "/v1/2fa/setup",
    description: "Initialise la configuration 2FA",
  },
  {
    method: "POST",
    path: "/v1/2fa/verify",
    description: "Vérifie le code 2FA et active la protection",
  },
  {
    method: "DELETE",
    path: "/v1/2fa",
    description: "Désactive la 2FA (authentifié requis)",
  },
  {
    method: "GET",
    path: "/v1/2fa/backup-codes",
    description: "Génère de nouveaux codes de secours",
  },
];

export default function Security2faPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" />
          Sécurité
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Authentification à <span className="text-primary">deux facteurs</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ajoutez une couche de sécurité supplémentaire à votre compte. Protégez-vous contre le vol
          d'identifiants et les accès non autorisés.
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
              L'authentification à deux facteurs (2FA) ajoute une couche de sécurité supplémentaire
              à votre compte. Même si quelqu'un découvre votre mot de passe, il ne pourra pas se
              connecter sans le code de vérification.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nous recommendons fortement d'utiliser une application authenticator plutôt que SMS,
              car les messages texte peuvent être interceptés via SIM swapping.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="methods" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Méthodes disponibles</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {twoFactorMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    {method.recommended && (
                      <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Recommandé
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <div className="space-y-2">
                    {method.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="authentication" className="space-y-6">
        <div className="flex items-center gap-3">
          <Key className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Authentification API</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format d'authentification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toutes les requêtes vers l'API 2FA doivent être authentifiées.
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
                Testez la configuration 2FA sans risquer votre compte principal.
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
                Activez la 2FA sur votre vrai compte pour une sécurité maximale.
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
            <CardTitle className="text-lg">Initialiser la configuration 2FA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Démarrez la configuration avec une application TOTP.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/2fa/setup \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "totp",
    "issuer": "Aether Bank"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/2fa/setup \\
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
  ],
  "temp_token": "tmp_2fa_setup_abc123"
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vérifier et activer la 2FA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Entrez le code de votre application authenticator pour confirmer.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/2fa/verify \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "temp_token": "tmp_2fa_setup_abc123",
    "code": "123456"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/2fa/verify \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "temp_token": "tmp_2fa_setup_abc123",
    "code": "123456"
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "status": "enabled",
  "enabled_at": "2026-03-31T10:00:00Z",
  "method": "totp",
  "recovery_enabled": true
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="backup-codes" className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Codes de secours</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              Les codes de secours sont des codes à usage unique que vous pouvez utiliser si vous
              perdez accès à votre méthode 2FA principale. Nous vous recommandons d'en imprimer une
              copie et de la conserver en lieu sûr.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">Important</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Chaque code de secours ne peut être utilisé qu'une seule fois. Une fois tous les
                    codes utilisés, vous pouvez en générer de nouveaux via l'API.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Activer la 2FA</h2>
            <p className="text-muted-foreground">
              Sécurisez votre compte dès maintenant avec l'authentification à deux facteurs.
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
