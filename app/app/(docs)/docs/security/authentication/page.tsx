"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock,
  Shield,
  Key,
  Fingerprint,
  User,
  ChevronRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  Globe,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Smartphone,
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
  { title: "Méthodes d'authentification", href: "#methods" },
  { title: "Authentification API", href: "#authentication" },
  { title: "Endpoints", href: "#endpoints" },
  { title: "Webhooks", href: "#webhooks" },
  { title: "Exemples d'utilisation", href: "#examples" },
];

const authMethods = [
  {
    title: "Identifiant + Mot de passe",
    description:
      "Connexion traditionnelle avec identifiant et mot de passe. Le mot de passe doit contenir au minimum 12 caractères avec majuscules, minuscules, chiffres et symboles.",
    icon: User,
    features: ["Facile à utiliser", "Bcrypt hashing", "Protection brute force"],
  },
  {
    title: "Authentification à deux facteurs (2FA)",
    description:
      "Couche de sécurité supplémentaire avec code SMS ou application authenticator (TOTP). Recommandé pour tous les comptes.",
    icon: Fingerprint,
    features: ["TOTP (Google Authenticator)", "SMS fallback", "Codes de secours"],
  },
  {
    title: "Clés de sécurité physiques",
    description:
      "Utilisation d'une clé USB de sécurité WebAuthn/FIDO2. La méthode la plus sécurisée contre le phishing.",
    icon: Shield,
    features: ["Résistant au phishing", "Aucun code à saisir", "Certification FIDO2"],
  },
];

const endpoints = [
  {
    method: "POST",
    path: "/v1/auth/login",
    description: "Authentifie un utilisateur et retourne un token de session",
  },
  {
    method: "POST",
    path: "/v1/auth/logout",
    description: "Déconnecte l'utilisateur et invalide le token",
  },
  {
    method: "POST",
    path: "/v1/auth/refresh",
    description: "Rafraîchit le token d'accès expiré",
  },
  {
    method: "POST",
    path: "/v1/auth/password/reset",
    description: "Demande la réinitialisation du mot de passe",
  },
  {
    method: "POST",
    path: "/v1/auth/password/change",
    description: "Change le mot de passe (authentifié)",
  },
  {
    method: "GET",
    path: "/v1/auth/sessions",
    description: "Liste toutes les sessions actives",
  },
  {
    method: "DELETE",
    path: "/v1/auth/sessions/:id",
    description: "Révoque une session spécifique",
  },
];

const webhookEvents = [
  {
    event: "auth.login_success",
    description: "Connexion réussie",
  },
  {
    event: "auth.login_failed",
    description: "Échec de connexion",
  },
  {
    event: "auth.logout",
    description: "Déconnexion",
  },
  {
    event: "auth.password_changed",
    description: "Mot de passe modifié",
  },
  {
    event: "auth.password_reset_requested",
    description: "Réinitialisation demandée",
  },
  {
    event: "auth.suspicious_activity",
    description: "Activité suspecte détectée",
  },
];

const securityFeatures = [
  {
    title: "Chiffrement TLS 1.3",
    description:
      "Toutes les communications sont chiffrées avec le protocole le plus récent et sécurisé.",
    icon: Lock,
  },
  {
    title: "Hachage bcrypt",
    description:
      "Utilisation de bcrypt avec salt unique pour le stockage sécurisé des mots de passe.",
    icon: Shield,
  },
  {
    title: "Sessions sécurisées",
    description: "Cookies HttpOnly et Secure avec rotation automatique des tokens.",
    icon: Key,
  },
  {
    title: "Rate limiting",
    description: "Verrouillage automatique après 5 tentatives de connexion échouées.",
    icon: Clock,
  },
];

export default function SecurityAuthenticationPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lock className="w-4 h-4" />
          Sécurité
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-primary">Authentification</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprenez comment nous protégeons l'accès à votre compte avec des méthodes
          d'authentification modernes et sécurisées.
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
              L'API Authentification d'Aether Bank offre un système de sécurité multicouche pour
              protéger vos comptes et données. Nous utilisons les standards industriels les plus
              récents, incluant OAuth 2.0, TOTP pour l'authentification à deux facteurs, et WebAuthn
              pour les clés de sécurité physiques.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Notre système est conçu selon le principe de "defense in depth", avec plusieurs
              couches de protection : chiffrement TLS 1.3, stockage sécurisé des credentials, et
              surveillance continue des activités suspectes.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Fonctionnalités de sécurité</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => {
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

      <section id="methods" className="space-y-6">
        <div className="flex items-center gap-3">
          <Key className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Méthodes d'authentification</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {authMethods.map((method, index) => {
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
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Authentification API</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">En-têtes d'authentification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toutes les requêtes vers l'API doivent inclure un token Bearer valide.
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
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Clés API</p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Utilisez le préfixe{" "}
                  <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">sk_test_</code>{" "}
                  pour les tests et{" "}
                  <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">sk_live_</code>{" "}
                  pour la production.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Environnements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-semibold">Sandbox</span>
                </div>
                <code className="text-sm font-mono text-green-600 dark:text-green-400">
                  https://sandbox.bank.skygenesisenterprise.com/api/v1
                </code>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="font-semibold">Production</span>
                </div>
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  https://bank.skygenesisenterprise.com/api/v1
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
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
          <Shield className="w-6 h-6 text-primary" />
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
            <CardTitle className="text-lg">Connexion utilisateur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Authentifiez un utilisateur avec email et mot de passe.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "jean.dupont@example.com",
    "password": "votre_mot_de_passe"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "jean.dupont@example.com",
    "password": "votre_mot_de_passe"
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "usr_xyz789",
    "email": "jean.dupont@example.com",
    "name": "Jean Dupont"
  }
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connexion avec 2FA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Si la 2FA est activée, une étape supplémentaire est requise.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/auth/2fa/verify \\
  -H "Content-Type: application/json" \\
  -d '{
    "temp_token": "tmp_abc123xyz",
    "code": "123456"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/auth/2fa/verify \\
  -H "Content-Type: application/json" \\
  -d '{
    "temp_token": "tmp_abc123xyz",
    "code": "123456"
  }'`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rafraîchir un token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Utilisez le refresh token pour obtenir un nouveau token d'accès.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4..."
  }'`}</pre>
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
              <Link href="/docs/security/2fa">
                Authentification 2FA <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/security/api-keys">Clés API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
