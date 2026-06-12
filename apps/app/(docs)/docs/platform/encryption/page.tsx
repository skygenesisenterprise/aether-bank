"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock,
  Key,
  Shield,
  Server,
  CheckCircle,
  Eye,
  BookOpen,
  ChevronRight,
  Copy,
  ArrowRight,
  CheckCircle as CheckCircleIcon,
  Key as KeyIcon,
  Webhook,
  Terminal,
  AlertCircle,
  Zap,
  Clock,
  RefreshCw,
  FileKey,
  Eye as EyeIcon,
  AlertTriangle,
} from "lucide-react";

const baseUrls = [
  {
    environment: "Sandbox (Test)",
    url: "https://sandbox.bank.skygenesisenterprise.com/api/v1",
    description: "Clés de test, logs détaillées",
    color: "blue",
    icon: Terminal,
  },
  {
    environment: "Production",
    url: "https://bank.skygenesisenterprise.com/api/v1",
    description: "Clés réelles, HSM sécurisé",
    color: "green",
    icon: Shield,
  },
];

const concepts = [
  {
    title: "Chiffrement au repos",
    description: "AES-256-GCM pour toutes les données stockées. Aucune donnée sensible en clair.",
    icon: Server,
  },
  {
    title: "Chiffrement en transit",
    description: "TLS 1.3 pour toutes les communications. Certificate pinning activé.",
    icon: Lock,
  },
  {
    title: "HSM (Hardware Security Module)",
    description:
      "Clés stockées dans des modules de sécurité matérielle certifiés FIPS 140-2 Level 3.",
    icon: FileKey,
  },
  {
    title: "Rotation automatique",
    description: "Les clés sont rotées automatiquement tous les 90 jours selon les best practices.",
    icon: RefreshCw,
  },
];

const standards = [
  {
    title: "AES-256-GCM",
    description: "Algorithme de chiffrement symétrique de niveau bancaire",
    icon: Shield,
    level: "256-bit",
  },
  {
    title: "TLS 1.3",
    description: "Protocole de sécurité pour les connexions réseau",
    icon: Lock,
    level: "Latest",
  },
  {
    title: "HSM FIPS 140-2",
    description: "Modules de sécurité matérielle certifiés",
    icon: Key,
    level: "Level 3",
  },
  {
    title: "Audit complet",
    description: "Logs immuables de tous les accès aux clés",
    icon: Eye,
    level: "Immutable",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/encryption/keys",
    description: "Liste des clés de chiffrement",
    parameters: ["status", "type", "limit", "offset"],
  },
  {
    method: "POST",
    path: "/encryption/keys",
    description: "Générer une nouvelle clé",
    parameters: ["type", "algorithm", "usage", "expires_at"],
  },
  {
    method: "GET",
    path: "/encryption/keys/:id",
    description: "Détails d'une clé",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/encryption/keys/:id/rotate",
    description: "Rotater une clé",
    parameters: ["id"],
  },
  {
    method: "POST",
    path: "/encryption/encrypt",
    description: "Chiffrer des données",
    parameters: ["plaintext", "key_id", "algorithm"],
  },
  {
    method: "POST",
    path: "/encryption/decrypt",
    description: "Déchiffrer des données",
    parameters: ["ciphertext", "key_id"],
  },
  {
    method: "POST",
    path: "/encryption/sign",
    description: "Signer des données",
    parameters: ["data", "key_id", "algorithm"],
  },
  {
    method: "POST",
    path: "/encryption/verify",
    description: "Vérifier une signature",
    parameters: ["data", "signature", "key_id"],
  },
];

const webhookEvents = [
  {
    event: "encryption.key.created",
    description: "Nouvelle clé créée",
    payload: "key_id, algorithm, created_at",
  },
  {
    event: "encryption.key.rotated",
    description: "Clé rotatée",
    payload: "key_id, previous_version, new_version",
  },
  {
    event: "encryption.key.expired",
    description: "Clé expirée",
    payload: "key_id, expired_at",
  },
  {
    event: "encryption.access",
    description: "Accès à une clé",
    payload: "key_id, operation, accessed_at, ip_address",
  },
];

const rateLimits = [
  { plan: "Sandbox", requests: "100/min" },
  { plan: "Starter", requests: "1 000/min" },
  { plan: "Pro", requests: "5 000/min" },
  { plan: "Enterprise", requests: "Illimité" },
];

const codeExamples = {
  generateKey: {
    title: "Générer une clé",
    description: "Créez une nouvelle clé de chiffrement pour votre application.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/encryption/keys \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "symmetric",
    "algorithm": "AES-256-GCM",
    "usage": "encrypt/decrypt",
    "expires_at": "2027-03-31T00:00:00Z"
  }'

# Réponse:
{
  "id": "key_xyz789",
  "type": "symmetric",
  "algorithm": "AES-256-GCM",
  "usage": "encrypt/decrypt",
  "status": "active",
  "version": 1,
  "key_hash": "sha256:abc123...",
  "created_at": "2026-03-31T10:00:00Z",
  "expires_at": "2027-03-31T00:00:00Z"
}`,
  },
  encrypt: {
    title: "Chiffrer des données",
    description: "Chiffrez des données sensibles avec une clé existante.",
    code: `# Chiffrement de données
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/encryption/encrypt \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "plaintext": "Données sensibles à chiffrer",
    "key_id": "key_xyz789",
    "algorithm": "AES-256-GCM"
  }'

# Réponse:
{
  "ciphertext": "base64:uMMr0GH...",
  "algorithm": "AES-256-GCM",
  "key_id": "key_xyz789",
  "key_version": 1,
  "iv": "base64:randomInitializationVector",
  "auth_tag": "base64:authenticationTag",
  "encrypted_at": "2026-03-31T10:00:00Z"
}`,
  },
  decrypt: {
    title: "Déchiffrer des données",
    description: "Déchiffrez des données précédemment chiffrées.",
    code: `# Déchiffrement de données
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/encryption/decrypt \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "ciphertext": "base64:uMMr0GH...",
    "key_id": "key_xyz789",
    "iv": "base64:randomInitializationVector",
    "auth_tag": "base64:authenticationTag"
  }'

# Réponse:
{
  "plaintext": "Données sensibles à chiffrer",
  "algorithm": "AES-256-GCM",
  "key_id": "key_xyz789",
  "key_version": 1,
  "decrypted_at": "2026-03-31T10:00:00Z"
}`,
  },
  sign: {
    title: "Signer des données",
    description: "Créez une signature numérique pour vérifier l'intégrité.",
    code: `# Signature de données
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/encryption/sign \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "Message à signer",
    "key_id": "key_abc123",
    "algorithm": "RSA-PSS-256"
  }'

# Réponse:
{
  "signature": "base64:MEUCIQD...",
  "algorithm": "RSA-PSS-256",
  "key_id": "key_abc123",
  "key_version": 2,
  "signed_at": "2026-03-31T10:00:00Z"
}

# Vérification:
curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/encryption/verify \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "Message à signer",
    "signature": "base64:MEUCIQD...",
    "key_id": "key_abc123"
  }'

# Réponse:
# { "valid": true }`,
  },
};

export default function PlatformEncryptionPage() {
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
          <Lock className="w-4 h-4" />
          Platform Encryption
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          API <span className="text-primary">Chiffrement</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API de chiffrement de niveau bancaire. Générez des clés, chiffrez des données et gérez les
          signatures numériques.
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
              href="#standards"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Standards
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
          L&apos;API Chiffrement fournit des primitives cryptographiques pour protéger vos données.
          Toutes les clés sont stockées dans des HSM certifiés.
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

        {/* Flow diagram */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Flux de chiffrement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Lock className="w-4 h-4 text-primary" />
                <span>Générer clé</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <KeyIcon className="w-4 h-4 text-primary" />
                <span>HSM</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Shield className="w-4 h-4 text-primary" />
                <span>Chiffrer</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border">
                <Server className="w-4 h-4 text-primary" />
                <span>Stocker</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Standards */}
      <section id="standards" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Standards de sécurité</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {standards.map((standard, index) => {
            const Icon = standard.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{standard.title}</h3>
                      <span className="inline-flex px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">
                        {standard.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
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
curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/encryption/keys \\
  -H "Authorization: Bearer sk_test_abc123def456" \\
  -H "Content-Type: application/json"`}
          </pre>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Bonnes pratiques</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1 ml-4 list-disc">
              <li>Ne jamais exposer vos clés API en frontend</li>
              <li>Stocker les clés en variables d&apos;environnement</li>
              <li>Utiliser des clés différentes pour test et production</li>
              <li>Activer le IP whitelisting en production</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints</h2>
        <p className="text-muted-foreground">
          API complète pour la gestion des clés et les opérations cryptographiques.
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
          Recevez des notifications pour les événements de chiffrement.
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
        <h2 className="text-2xl font-bold">Conformité réglementaire</h2>
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 dark:bg-green-950/50 dark:border-green-800">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Certifications et normes
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg">
                  <span className="font-semibold">PCI DSS</span>
                  <p className="text-green-700 dark:text-green-300">Niveau 1</p>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg">
                  <span className="font-semibold">RGPD</span>
                  <p className="text-green-700 dark:text-green-300">Conforme</p>
                </div>
                <div className="bg-white/50 dark:bg-black/50 p-3 rounded-lg">
                  <span className="font-semibold">PSD2</span>
                  <p className="text-green-700 dark:text-green-300">SCA activé</p>
                </div>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-4">
                Notre infrastructure de chiffrement est auditée annuellement par des cabinets
                indépendants et certifiée conforme aux standards bancaires les plus stricts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à sécuriser vos données ?</h2>
            <p className="text-muted-foreground">
              Commencez avec le guide de démarrage rapide ou consultez la documentation de sécurité.
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
