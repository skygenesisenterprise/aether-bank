"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  ChevronRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Key,
  Eye,
  Clock,
  FileText,
  Users,
  CreditCard,
  Palette,
  BellRing,
  Lock,
  Trash2,
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
  { title: "Environnements", href: "#environments" },
  { title: "Exemples", href: "#examples" },
];

const settingsSections = [
  {
    title: "Informations personnelles",
    description: "Nom, email, téléphone et adresse",
    icon: User,
    api: "/v1/users/me/profile",
  },
  {
    title: "Préférences",
    description: "Langue, devise, fuseau horaire",
    icon: Globe,
    api: "/v1/users/me/preferences",
  },
  {
    title: "Notifications",
    description: "Alertes push, email et SMS",
    icon: Bell,
    api: "/v1/users/me/notifications",
  },
  {
    title: "Confidentialité",
    description: "Données personnelles et cookies",
    icon: Shield,
    api: "/v1/users/me/privacy",
  },
  {
    title: "Sécurité",
    description: "Mot de passe, 2FA et sessions",
    icon: Lock,
    api: "/v1/security",
  },
  {
    title: "Abonnements",
    description: "Gestion des cartes et services",
    icon: CreditCard,
    api: "/v1/users/me/subscriptions",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/users/me",
    description: "Récupère le profil de l'utilisateur connecté",
  },
  {
    method: "PUT",
    path: "/v1/users/me",
    description: "Met à jour le profil utilisateur",
  },
  {
    method: "GET",
    path: "/v1/users/me/preferences",
    description: "Récupère les préférences utilisateur",
  },
  {
    method: "PUT",
    path: "/v1/users/me/preferences",
    description: "Met à jour les préférences",
  },
  {
    method: "GET",
    path: "/v1/users/me/notifications",
    description: "Récupère les paramètres de notification",
  },
  {
    method: "PUT",
    path: "/v1/users/me/notifications",
    description: "Met à jour les notifications",
  },
  {
    method: "DELETE",
    path: "/v1/users/me",
    description: "Supprime le compte utilisateur",
  },
];

const notificationChannels = [
  { channel: "email", description: "Notifications par email", enabled: true },
  { channel: "push", description: "Notifications push mobile", enabled: true },
  { channel: "sms", description: "Alertes SMS pour transactions", enabled: false },
  { channel: "in_app", description: "Notifications dans l'application", enabled: true },
];

const languages = [
  { code: "fr", name: "Français", native: "Français" },
  { code: "en", name: "English", native: "English" },
  { code: "es", name: "Español", native: "Español" },
  { code: "de", name: "Deutsch", native: "Deutsch" },
];

const currencies = [
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
];

export default function UserManagementPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Settings className="w-4 h-4" />
          Utilisateur
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Paramètres du <span className="text-primary">compte</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos informations personnelles, préférences et options de confidentialité. Contrôlez
          comment et quand vous recevez des notifications.
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
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Introduction</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              L'API Paramètres Utilisateur vous permet de gérer toutes les aspects de votre compte :
              informations personnelles, préférences, notifications et confidentialité.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Toutes les modifications sont immédiatement appliquées et synchronisées sur tous vos
              appareils. Votre vie privée est notre priorité : nous ne partageons jamais vos données
              sans votre consentement explicite.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Concepts Clés</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <span className="text-xs text-muted-foreground font-mono">{section.api}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
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
            <CardTitle className="text-lg">Format d'authentification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toutes les requêtes vers l'API Paramètres doivent être authentifiées.
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
          <Globe className="w-6 h-6 text-primary" />
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
                Testez les modifications sans affecter vos vraies données.
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
                Modifications appliquées à votre vrai compte.
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
                        : endpoint.method === "PUT"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
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
            <CardTitle className="text-lg">Récupérer le profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Récupérez les informations du profil de l'utilisateur connecté.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me \\
  -H "Authorization: Bearer sk_test_abc123"`}
              />
              <pre className="text-sm font-mono">{`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me \\
  -H "Authorization: Bearer sk_test_abc123"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "usr_xyz789",
  "email": "jean.dupont@example.com",
  "name": "Jean Dupont",
  "phone": "+33612345678",
  "address": {
    "street": "123 Rue de la Banque",
    "city": "Paris",
    "postal_code": "75002",
    "country": "FR"
  },
  "preferences": {
    "language": "fr",
    "currency": "EUR",
    "timezone": "Europe/Paris"
  },
  "created_at": "2024-01-15T10:00:00Z"
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mettre à jour le profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Modifiez les informations personnelles de l'utilisateur.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jean Dupont-Modifié",
    "phone": "+33698765432"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jean Dupont-Modifié",
    "phone": "+33698765432"
  }'`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mettre à jour les préférences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Modifiez la langue, la devise et le fuseau horaire.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/preferences \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "language": "en",
    "currency": "USD",
    "timezone": "America/New_York"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/users/me/preferences \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "language": "en",
    "currency": "USD",
    "timezone": "America/New_York"
  }'`}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Langues disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Nom</th>
                    <th className="text-left py-3 px-4 font-semibold">Nom natif</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((lang, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{lang.code}</code>
                      </td>
                      <td className="py-3 px-4">{lang.name}</td>
                      <td className="py-3 px-4">{lang.native}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Devises disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Nom</th>
                    <th className="text-left py-3 px-4 font-semibold">Symbole</th>
                  </tr>
                </thead>
                <tbody>
                  {currencies.map((currency, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{currency.code}</code>
                      </td>
                      <td className="py-3 px-4">{currency.name}</td>
                      <td className="py-3 px-4">{currency.symbol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Gérer votre compte</h2>
            <p className="text-muted-foreground">
              Modifiez vos informations personnelles et préférences à tout moment.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/user/security">
                Sécurité <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/user/team">Équipe</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
