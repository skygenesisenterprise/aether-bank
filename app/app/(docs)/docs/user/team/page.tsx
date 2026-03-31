"use client";

import { Button } from "@/components/ui/button";
import { Users, Plus, ArrowRight, Shield, Mail } from "lucide-react";

const teamMembers = [
  { name: "Jean Dupont", email: "jean@example.com", role: "Administrateur", status: "active" },
  { name: "Marie Martin", email: "marie@example.com", role: "Gestionnaire", status: "active" },
  { name: "Pierre Durant", email: "pierre@example.com", role: "Consultant", status: "pending" },
];

const roles = [
  { title: "Administrateur", description: "Accès complet à toutes les fonctionnalités" },
  { title: "Gestionnaire", description: "Gestion des transactions et des cartes" },
  { title: "Consultant", description: "Accès en lecture seule" },
];

export default function UserTeamPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Users className="w-4 h-4" />
          User Team
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mon <span className="text-primary">équipe</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les accès de votre équipe à votre compte professionnel.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Membres de l'équipe</h2>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Inviter un membre
          </Button>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Rôle</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-medium">{member.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{member.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        member.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {member.status === "active" ? "Actif" : "En attente"}
                    </span>
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
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">{role.title}</h3>
              </div>
              <p className="text-muted-foreground">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Inviter un membre</h2>
            <p className="text-muted-foreground">Ajoutez un nouveau membre à votre équipe.</p>
          </div>
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Envoyer une invitation
          </Button>
        </div>
      </section>
    </div>
  );
}
