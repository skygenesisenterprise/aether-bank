"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Plus,
  ChevronRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  Globe,
  Shield,
  Mail,
  UserPlus,
  Settings,
  Trash2,
  Edit,
  ArrowRight,
  Clock,
  Zap,
  Key,
  Eye,
  CreditCard,
  BarChart3,
  FileText,
  Bell,
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
  { title: "Rôles et Permissions", href: "#roles" },
  { title: "Authentification", href: "#authentication" },
  { title: "Endpoints", href: "#endpoints" },
  { title: "Webhooks", href: "#webhooks" },
  { title: "Exemples", href: "#examples" },
];

const roles = [
  {
    title: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités du compte",
    icon: Shield,
    color: "red",
    permissions: [
      "Gestion des membres de l'équipe",
      "Configuration des rôles",
      "Accès aux factures et paiements",
      "Gestion des API keys",
      "Configuration des webhooks",
    ],
  },
  {
    title: "Gestionnaire",
    description: "Gestion des transactions et des cartes",
    icon: CreditCard,
    color: "blue",
    permissions: [
      "Création de transactions",
      "Gestion des cartes",
      "Consultation des soldes",
      "Création de rapports",
      "Gestion des limites",
    ],
  },
  {
    title: "Consultant",
    description: "Accès en lecture seule",
    icon: Eye,
    color: "green",
    permissions: [
      "Consultation des transactions",
      "Visualisation des rapports",
      "Accès aux documents",
      "Consultation des cartes",
    ],
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/team/members",
    description: "Liste tous les membres de l'équipe",
  },
  {
    method: "POST",
    path: "/v1/team/members",
    description: "Invite un nouveau membre",
  },
  {
    method: "GET",
    path: "/v1/team/members/:id",
    description: "Détails d'un membre",
  },
  {
    method: "PUT",
    path: "/v1/team/members/:id",
    description: "Modifie le rôle d'un membre",
  },
  {
    method: "DELETE",
    path: "/v1/team/members/:id",
    description: "Supprime un membre de l'équipe",
  },
  {
    method: "GET",
    path: "/v1/team/roles",
    description: "Liste tous les rôles disponibles",
  },
  {
    method: "POST",
    path: "/v1/team/invitations",
    description: "Crée une invitation par email",
  },
  {
    method: "DELETE",
    path: "/v1/team/invitations/:id",
    description: "Annule une invitation en attente",
  },
];

const webhookEvents = [
  {
    event: "team.member_added",
    description: "Nouveau membre ajouté à l'équipe",
  },
  {
    event: "team.member_removed",
    description: "Membre supprimé de l'équipe",
  },
  {
    event: "team.role_changed",
    description: "Rôle d'un membre modifié",
  },
  {
    event: "team.invitation_sent",
    description: "Invitation envoyée",
  },
  {
    event: "team.invitation_accepted",
    description: "Invitation acceptée",
  },
];

export default function UserTeamPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Users className="w-4 h-4" />
          Utilisateur
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mon <span className="text-primary">équipe</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les accès de votre équipe à votre compte professionnel. Invitez des collaborateurs,
          définissez leurs rôles et contrôlez leurs permissions.
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
              L'API Équipe permet de gérer les accès collaboratifs à votre compte Aether Bank. Créez
              des équipes, assignez des rôles avec des permissions spécifiques, et invitez des
              collaborateurs via email.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Le système de contrôle d'accès basé sur les rôles (RBAC) vous permet de définir
              précisément ce que chaque membre peut faire, garantissant la sécurité tout en
              facilitant la collaboration.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="concepts" className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Concepts Clés</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Équipe</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Un compte professionnel peut avoir plusieurs équipes. Chaque équipe a ses propres
                membres et configurations.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Membres</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les membres sont les utilisateurs ayant accès à l'équipe. Chaque membre a un rôle
                qui définit ses permissions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-base">Rôles</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Un rôle est un ensemble de permissions. Vous pouvez assigner plusieurs rôles à un
                même membre.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="roles" className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Rôles et Permissions</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Permissions:</p>
                    {role.permissions.map((perm, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{perm}</span>
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
          <h2 className="text-2xl font-bold">Authentification</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format d'authentification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Toutes les requêtes vers l'API Équipe doivent être authentifiées avec un token Bearer.
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
                  Permissions requises
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Seuls les utilisateurs avec le rôle Administrateur peuvent gérer les membres de
                  l'équipe.
                </p>
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

      <section id="webhooks" className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
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
            <CardTitle className="text-lg">Lister les membres</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Récupérez la liste de tous les membres de votre équipe.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/team/members \\
  -H "Authorization: Bearer sk_test_abc123"`}
              />
              <pre className="text-sm font-mono">{`curl -X GET https://sandbox.bank.skygenesisenterprise.com/api/v1/team/members \\
  -H "Authorization: Bearer sk_test_abc123"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "data": [
    {
      "id": "usr_xyz789",
      "name": "Jean Dupont",
      "email": "jean.dupont@example.com",
      "role": "administrator",
      "status": "active",
      "joined_at": "2025-01-15T10:00:00Z"
    },
    {
      "id": "usr_abc123",
      "name": "Marie Martin",
      "email": "marie.martin@example.com",
      "role": "manager",
      "status": "active",
      "joined_at": "2025-02-20T14:30:00Z"
    }
  ],
  "total": 2
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inviter un membre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Envoyez une invitation par email à un nouveau membre.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/team/members \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "pierre.durant@example.com",
    "role": "consultant",
    "send_email": true
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/team/members \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "pierre.durant@example.com",
    "role": "consultant",
    "send_email": true
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "usr_new456",
  "email": "pierre.durant@example.com",
  "role": "consultant",
  "status": "pending",
  "invitation_sent_at": "2026-03-31T10:00:00Z",
  "invitation_expires_at": "2026-04-07T10:00:00Z"
}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modifier le rôle d'un membre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Changez le rôle d'un membre existant.</p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/team/members/usr_abc123 \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "role": "administrator"
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X PUT https://sandbox.bank.skygenesisenterprise.com/api/v1/team/members/usr_abc123 \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "role": "administrator"
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "usr_abc123",
  "name": "Marie Martin",
  "email": "marie.martin@example.com",
  "role": "administrator",
  "status": "active",
  "updated_at": "2026-03-31T11:00:00Z"
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Inviter un membre</h2>
            <p className="text-muted-foreground">
              Ajoutez un nouveau membre à votre équipe et définissez son rôle.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/quick-start">
                Guide de démarrage <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/user/management">Paramètres</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
