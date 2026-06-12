"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Terminal,
  Key,
  Shield,
  Globe,
  Code,
  Copy,
  Zap,
  BookOpen,
  User,
  Settings,
  Bell,
  TestTube,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Créer un compte développeur",
    description:
      "Inscrivez-vous sur Aether Bank en quelques minutes. Vous n'avez besoin que d'une pièce d'identité valide et d'un numéro de téléphone français.",
    icon: UserIcon,
  },
  {
    title: "Vérifier votre identité",
    description:
      "Complétez le processus KYC (Know Your Customer) pour activer votre compte complètement. Upload de pièce d'identité + selfie vidéo.",
    icon: Shield,
  },
  {
    title: "Générer vos clés API",
    description:
      "Dans votre dashboard développeur, créez vos clés API. Vous avez une clé pour le sandbox (test) et une pour la production.",
    icon: Key,
  },
  {
    title: "Faire votre premier appel API",
    description:
      "Utilisez notre API REST pour intégrer les services bancaires dans votre application. Commencez par le sandbox pour les tests.",
    icon: Code,
  },
];

const features = [
  {
    title: "API REST moderne",
    description:
      "Interface de programmation complète avec réponses JSON standardisées. Documentation Swagger interactive.",
    icon: Globe,
  },
  {
    title: "Clés API sécurisées",
    description:
      "Générez et gérez vos clés API depuis votre dashboard. Permissions granulaires par clé.",
    icon: Key,
  },
  {
    title: "Webhooks en temps réel",
    description:
      "Recevez des notifications instantanées pour tous vos événements: transactions, virements, soldes.",
    icon: BellIcon,
  },
  {
    title: "Sandbox de test",
    description:
      "Testez vos intégrations dans un environnement isolé sans frais réels.IBANs de test disponibles.",
    icon: TestTubeIcon,
  },
];

const quickStartExamples = {
  createAccount: {
    title: "Créer un compte",
    description: "Créez un compte courant pour un client ou votre entreprise.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "current",
    "currency": "EUR",
    "holder_name": "Entreprise ABC",
    "holder_type": "business",
    "metadata": {
      "reference": "REF-2024-001"
    }
  }'`,
    response: `{
  "id": "acc_xyz789",
  "type": "current",
  "currency": "EUR",
  "iban": "FR7630006000011234567890189",
  "bic": "NPSYFRPPXXX",
  "status": "active",
  "balance": {
    "available": 0,
    "current": 0
  },
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  getBalance: {
    title: "Obtenir le solde",
    description: "Récupérez le solde actuel d'un compte en temps réel.",
    code: `curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/accounts/acc_xyz789/balance \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "account_id": "acc_xyz789",
  "available": 50000,
  "current": 50000,
  "currency": "EUR",
  "updated_at": "2024-01-15T10:30:00Z"
}`,
  },
  createTransfer: {
    title: "Effectuer un virement",
    description: "Initiez un virement SEPA vers un autre compte bancaire européen.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/transfers \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "account_id": "acc_xyz789",
    "amount": 5000,
    "currency": "EUR",
    "recipient": {
      "iban": "FR7630006000011234567890189",
      "name": "Société XYZ",
      "bic": "BNPAFRPP"
    },
    "reference": "FACTURE-2024-001",
    "schedule_date": "2024-01-20"
  }'`,
    response: `{
  "id": "trf_abc123",
  "account_id": "acc_xyz789",
  "amount": 5000,
  "currency": "EUR",
  "status": "pending",
  "recipient": {
    "iban": "FR7630006000011234567890189",
    "name": "Société XYZ"
  },
  "reference": "FACTURE-2024-001",
  "created_at": "2024-01-15T10:30:00Z"
}`,
  },
};

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function TestTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}

export default function QuickStartPage() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (code: string, exampleId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedExample(exampleId);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="w-4 h-4" />
          Guide de démarrage
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Commencez en <span className="text-primary">5 minutes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Suivez ce guide pour configurer votre compte développeur et effectuer votre première
          requête API en quelques minutes.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" asChild>
            <Link href="/register">
              Créer un compte
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs">
              Voir la doc
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Les étapes à suivre</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Exemples rapides</h2>
        <p className="text-muted-foreground">
          Voici quelques exemples d'appels API couramment utilisés pour démarrer.
        </p>

        <div className="space-y-8">
          {/* Create Account */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                {quickStartExamples.createAccount.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {quickStartExamples.createAccount.description}
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{quickStartExamples.createAccount.code}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() =>
                    copyToClipboard(quickStartExamples.createAccount.code, "createAccount")
                  }
                >
                  {copiedExample === "createAccount" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                  {quickStartExamples.createAccount.response}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Get Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                {quickStartExamples.getBalance.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {quickStartExamples.getBalance.description}
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{quickStartExamples.getBalance.code}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(quickStartExamples.getBalance.code, "getBalance")}
                >
                  {copiedExample === "getBalance" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                  {quickStartExamples.getBalance.response}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Create Transfer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                {quickStartExamples.createTransfer.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {quickStartExamples.createTransfer.description}
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{quickStartExamples.createTransfer.code}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() =>
                    copyToClipboard(quickStartExamples.createTransfer.code, "createTransfer")
                  }
                >
                  {copiedExample === "createTransfer" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-800 dark:text-green-200 font-mono">
                  {quickStartExamples.createTransfer.response}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Ce que vous offrent nos services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation Links */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Aller plus loin</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/docs/security/authentication">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Authentification
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sécurisez vos requêtes API avec clés et 2FA
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/platform/api">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <Code className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Référence API
                </h3>
                <p className="text-sm text-muted-foreground">
                  Liste complète des endpoints disponibles
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/platform/notifications">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <Bell className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Webhooks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configurez les notifications en temps réel
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à commencer ?</h2>
            <p className="text-muted-foreground">
              Créez votre compte développeur et lancez-vous dans l'intégration.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/register">
                Créer un compte
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs">Voir la documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
