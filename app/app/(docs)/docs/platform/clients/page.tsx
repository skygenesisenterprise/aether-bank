"use client";

import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const roles = [
  {
    title: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités.",
    permissions: ["Gestion utilisateurs", "Configuration", "Audit"],
  },
  {
    title: "Gestionnaire",
    description: "Gestion des opérations quotidiennes.",
    permissions: ["Transactions", "Cartes", "Rapports"],
  },
  {
    title: "Consultant",
    description: "Accès en lecture seule aux données.",
    permissions: ["Visualisation", "Export", "Rapports"],
  },
];

const features = [
  {
    title: "Ajout simplifié",
    description: "Ajoutez des utilisateurs en quelques clics.",
    icon: Plus,
  },
  {
    title: "Gestion des rôles",
    description: "Définissez des permissions granulaires.",
    icon: Shield,
  },
  {
    title: "Invitation par email",
    description: "Envoyez des invitations par email automatique.",
    icon: Mail,
  },
  {
    title: "Audit complet",
    description: "Suivez toutes les actions des utilisateurs.",
    icon: Search,
  },
];

const mockClients = [
  {
    id: "USR-001",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "ADMIN",
    status: "active",
    lastLogin: "2026-03-31 14:32",
  },
  {
    id: "USR-002",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "MANAGER",
    status: "active",
    lastLogin: "2026-03-30 09:15",
  },
  {
    id: "USR-003",
    name: "Pierre Durant",
    email: "pierre.durant@example.com",
    role: "USER",
    status: "pending",
    lastLogin: "-",
  },
];

export default function PlatformClientsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Users className="w-4 h-4" />
          Platform Clients
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">utilisateurs</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les utilisateurs et leurs accès au dashboard administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Utilisateurs existants</h2>
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
              Nouvel utilisateur
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
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
                  <td className="px-4 py-3 text-sm">{client.id}</td>
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
                      {client.role === "ADMIN" && "Administrateur"}
                      {client.role === "MANAGER" && "Gestionnaire"}
                      {client.role === "USER" && "Utilisateur"}
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

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Rôles disponibles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
              <p className="text-muted-foreground mb-4">{role.description}</p>
              <ul className="space-y-2 mt-auto">
                {role.permissions.map((perm, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités</h2>
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

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ajouter un utilisateur</h2>
            <p className="text-muted-foreground">
              Invitez un nouvel utilisateur à rejoindre votre plateforme.
            </p>
          </div>
          <Button>
            Ajouter <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
