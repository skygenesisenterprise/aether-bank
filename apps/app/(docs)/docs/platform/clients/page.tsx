"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Mail,
  Shield,
  MoreVertical,
  Copy,
  ChevronRight,
  Zap,
  Key,
  Clock,
  AlertCircle,
  UserCheck,
  UserX,
  Bell,
} from "lucide-react";

const roles = [
  {
    title: "Administrateur",
    type: "ADMIN",
    api: "role: admin",
    description:
      "Accès complet à toutes les fonctionnalités de la plateforme. Peut gérer les utilisateurs et la configuration.",
    permissions: [
      "Gestion utilisateurs",
      "Configuration système",
      "Audit logs",
      "Accès API complet",
    ],
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Gestionnaire",
    type: "MANAGER",
    api: "role: manager",
    description: "Gestion des opérations quotidiennes sans accès à la configuration système.",
    permissions: ["Transactions", "Cartes", "Rapports", "Gestion clients"],
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Consultant",
    type: "USER",
    api: "role: user",
    description: "Accès en lecture seule aux données pour consultation et export.",
    permissions: ["Visualisation", "Export données", "Rapports", "Aucun mouvement"],
    color: "bg-gray-100 text-gray-700",
  },
  {
    title: "API",
    type: "API_KEY",
    api: "Authentication: API Key",
    description: "Accès programatique via clé API pour intégration backend.",
    permissions: ["Accès REST API", "Webhooks", "Pas d'interface", "Scope limité"],
    color: "bg-green-100 text-green-700",
  },
];

const userStatuses = [
  { status: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  { status: "active", label: "Actif", color: "bg-green-100 text-green-700" },
  { status: "suspended", label: "Suspendu", color: "bg-orange-100 text-orange-700" },
  { status: "inactive", label: "Inactif", color: "bg-gray-100 text-gray-700" },
];

const concepts = [
  {
    title: "RBAC",
    description:
      "Contrôle d'accès basé sur les rôles. Chaque utilisateur a un rôle qui définit ses permissions.",
    icon: Shield,
  },
  {
    title: "Invitation email",
    description: "Les utilisateurs reçoivent un email d'invitation pour créer leur mot de passe.",
    icon: Mail,
  },
  {
    title: "Sessions",
    description: "Suivi des connexions avec expiration automatique après 24h d'inactivité.",
    icon: Clock,
  },
  {
    title: "Audit logs",
    description: "Toutes les actions sont journalisées avec horodatage et IP source.",
    icon: UserCheck,
  },
];

const codeExamples = {
  listUsers: {
    title: "Lister les utilisateurs",
    description: "Récupérez la liste des utilisateurs de votre organisation.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users?role=admin&status=active&limit=20" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "usr_xyz789",
      "email": "jean.dupont@example.com",
      "name": "Jean Dupont",
      "role": "admin",
      "status": "active",
      "last_login_at": "2024-01-15T14:32:00Z",
      "created_at": "2024-01-01T10:00:00Z"
    },
    {
      "id": "usr_abc123",
      "email": "marie.martin@example.com",
      "name": "Marie Martin",
      "role": "manager",
      "status": "active",
      "last_login_at": "2024-01-15T09:15:00Z",
      "created_at": "2024-01-05T10:00:00Z"
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0
}`,
  },
  inviteUser: {
    title: "Inviter un utilisateur",
    description: "Envoyez une invitation par email à un nouvel utilisateur.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/invitations \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "pierre.durant@example.com",
    "name": "Pierre Durant",
    "role": "user",
    "send_email": true,
    "expires_in_hours": 72
  }'`,
    response: `{
  "id": "inv_def456",
  "email": "pierre.durant@example.com",
  "name": "Pierre Durant",
  "role": "user",
  "status": "pending",
  "invitation_token": "inv_abc123xyz",
  "expires_at": "2024-01-18T10:00:00Z",
  "created_at": "2024-01-15T10:00:00Z"
}`,
  },
  updateUser: {
    title: "Modifier un utilisateur",
    description: "Mettez à jour le rôle ou le statut d'un utilisateur.",
    code: `curl -X PATCH https://sandbox.bank.skygenesisenterprise.com/api/v1/users/usr_abc123 \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "role": "manager",
    "status": "active"
  }'`,
    response: `{
  "id": "usr_abc123",
  "email": "marie.martin@example.com",
  "name": "Marie Martin",
  "role": "manager",
  "status": "active",
  "updated_at": "2024-01-15T12:00:00Z"
}`,
  },
  suspendUser: {
    title: "Suspendre un utilisateur",
    description: "Suspendez l'accès d'un utilisateur sans le supprimer.",
    code: `curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/users/usr_abc123/suspend \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{"reason": "security_concern"}'`,
    response: `{
  "id": "usr_abc123",
  "status": "suspended",
  "suspended_at": "2024-01-15T14:00:00Z",
  "suspended_reason": "security_concern"
}`,
  },
  getAuditLogs: {
    title: "Consulter les logs d'audit",
    description: "Récupérez l'historique des actions d'un utilisateur.",
    code: `curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/users/usr_abc123/audit?from=2024-01-01&to=2024-01-31" \\
  -H "Authorization: Bearer sk_test_abc123"`,
    response: `{
  "data": [
    {
      "id": "log_001",
      "user_id": "usr_abc123",
      "action": "transaction.created",
      "resource_id": "txn_xyz789",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "timestamp": "2024-01-15T14:32:00Z"
    }
  ],
  "total": 15
}`,
  },
};

const webhookEvents = [
  { event: "user.invited", description: "Invitation envoyée" },
  { event: "user.activated", description: "Compte activé" },
  { event: "user.role_changed", description: "Rôle modifié" },
  { event: "user.suspended", description: "Utilisateur suspendu" },
  { event: "user.login", description: "Connexion réussie" },
  { event: "user.login_failed", description: "Échec de connexion" },
];

const mockClients = [
  {
    id: "usr_xyz789",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "ADMIN",
    status: "active",
    lastLogin: "2026-03-31 14:32",
  },
  {
    id: "usr_abc123",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "MANAGER",
    status: "active",
    lastLogin: "2026-03-30 09:15",
  },
  {
    id: "usr_def456",
    name: "Pierre Durant",
    email: "pierre.durant@example.com",
    role: "USER",
    status: "pending",
    lastLogin: "-",
  },
];

export default function PlatformClientsPage() {
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
          <Users className="w-4 h-4" />
          API Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">utilisateurs</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          API complète pour gérer les utilisateurs, les rôles et les permissions. Invitations par
          email, suspension et audit complet des actions.
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
              Authentification <ChevronRight className="w-4 h-4 ml-2" />
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
              href="#introduction"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Introduction
            </a>
            <a
              href="#roles"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Rôles & Permissions
            </a>
            <a
              href="#concepts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Concepts clés
            </a>
            <a
              href="#statuts"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Statuts des utilisateurs
            </a>
            <a
              href="#endpoints"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Endpoints API
            </a>
            <a
              href="#exemples"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Exemples de code
            </a>
            <a
              href="#dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Dashboard
            </a>
            <a
              href="#webhooks"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="w-4 h-4" /> Webhooks
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section id="introduction" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed">
          L'API Utilisateurs permet de gérer les accès à votre plateforme bancaire. Créez des
          utilisateurs, assignez-leur des rôles avec des permissions granulaires, et suivez toutes
          leurs actions via les logs d'audit. Le système RBAC (Role-Based Access Control) garantit
          une sécurité maximale.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Base URL Sandbox</h3>
            <code className="text-sm text-primary break-all">
              sandbox.bank.skygenesisenterprise.com/api/v1
            </code>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Base URL Production</h3>
            <code className="text-sm text-primary break-all">
              bank.skygenesisenterprise.com/api/v1
            </code>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Authentification</h3>
            <code className="text-sm text-primary">Bearer Token</code>
          </div>
        </div>
      </section>

      {/* Rôles */}
      <section id="roles" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Rôles & Permissions</h2>
        <p className="text-muted-foreground">
          Chaque utilisateur a un rôle qui définit ses permissions d'accès. Le principe du moindre
          privilège est appliqué.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.color}`}
                  >
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <code className="text-xs text-muted-foreground">{role.api}</code>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <ul className="space-y-2">
                  {role.permissions.map((perm, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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

      {/* Statuts */}
      <section id="statuts" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Statuts des utilisateurs</h2>
        <div className="flex flex-wrap gap-3">
          {userStatuses.map((s) => (
            <span
              key={s.status}
              className={`px-4 py-2 rounded-full text-sm font-medium ${s.color}`}
            >
              {s.label} ({s.status})
            </span>
          ))}
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Endpoints API</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/users</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Lister les utilisateurs
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">role</code> - Filtrer par rôle
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - pending | active
                    | suspended
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">limit/offset</code> - Pagination
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">search</code> - Recherche
                    nom/email
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/users/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Détails d'un utilisateur
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/users/invitations</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Inviter un utilisateur
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">email</code> - Email de l'invité
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">name</code> - Nom complet
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">role</code> - Rôle à assigner
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">send_email</code> - Envoyer
                    l'email
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">
                  PATCH
                </span>
                <code className="text-sm font-mono">/v1/users/{"{id}"}</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Modifier un utilisateur
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">role</code> - Nouveau rôle
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">name</code> - Nouveau nom
                  </span>
                  <span>
                    <code className="text-xs bg-muted px-1 rounded">status</code> - Nouveau statut
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">
                  POST
                </span>
                <code className="text-sm font-mono">/v1/users/{"{id}"}/suspend</code>
                <span className="text-xs text-muted-foreground ml-auto">
                  Suspendre un utilisateur
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm font-mono">/v1/users/{"{id}"}/audit</code>
                <span className="text-xs text-muted-foreground ml-auto">Logs d'audit</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Exemples */}
      <section id="exemples" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Exemples de code</h2>
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
              <CardContent className="space-y-4">
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
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">
                    {example.response}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="space-y-6 scroll-mt-8">
        <h2 className="text-2xl font-bold">Dashboard Administrateur</h2>
        <p className="text-muted-foreground">
          Gérez visuellement vos utilisateurs depuis le dashboard.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
            <h3 className="font-semibold">Utilisateurs existants</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Inviter
              </Button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Rôle</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Dernière connexion</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client) => (
                <tr key={client.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-mono">{client.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{client.name}</td>
                  <td className="px-4 py-3 text-sm">{client.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        client.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : client.role === "MANAGER"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {client.role === "ADMIN"
                        ? "Admin"
                        : client.role === "MANAGER"
                          ? "Gestionnaire"
                          : "Utilisateur"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        client.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {client.status === "active" ? "Actif" : "En attente"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{client.lastLogin}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Webhooks */}
      <section id="webhooks" className="space-y-6 scroll-mt-8">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold">Webhooks</h2>
        </div>
        <p className="text-muted-foreground">
          Configurez des webhooks pour être notifié des événements utilisateur.
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Événements disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {webhookEvents.map((event) => (
                <div
                  key={event.event}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <code className="text-sm font-mono">{event.event}</code>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à gérer vos utilisateurs ?</h2>
            <p className="text-muted-foreground">
              Invitez votre équipe ou consultez la documentation sécurité.
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
                Sécurité <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
