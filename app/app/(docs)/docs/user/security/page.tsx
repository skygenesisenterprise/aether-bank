"use client";

import { Button } from "@/components/ui/button";
import { Lock, Shield, ArrowRight, Key, Eye, Smartphone } from "lucide-react";

const securityOptions = [
  {
    title: "Mot de passe",
    description: "Modifiez votre mot de passe",
    icon: Key,
    enabled: true,
  },
  {
    title: "Authentification à deux facteurs",
    description: "Securisez votre compte avec 2FA",
    icon: Shield,
    enabled: true,
  },
  {
    title: "Notifications de sécurité",
    description: "Alertes pour les connexions suspectes",
    icon: Eye,
    enabled: true,
  },
  {
    title: "Sessions actives",
    description: "Gérez vos sessions de connexion",
    icon: Smartphone,
    enabled: false,
  },
];

const recentActivity = [
  { device: "MacBook Pro", location: "Paris, FR", date: "31/03/2026 14:32", status: "current" },
  { device: "iPhone 14", location: "Paris, FR", date: "30/03/2026 09:15", status: "active" },
  { device: "Windows PC", location: "Lyon, FR", date: "28/03/2026 18:45", status: "inactive" },
];

export default function UserSecurityPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lock className="w-4 h-4" />
          User Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Sécurité du <span className="text-primary">compte</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Protégez votre compte avec nos options de sécurité avancées.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Paramètres de sécurité</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {securityOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Appareils connectés</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Appareil</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Localisation</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Dernière connexion</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-medium">{activity.device}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{activity.location}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{activity.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        activity.status === "current"
                          ? "bg-green-100 text-green-700"
                          : activity.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {activity.status === "current" && "Actuel"}
                      {activity.status === "active" && "Active"}
                      {activity.status === "inactive" && "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Renforcer la sécurité</h2>
            <p className="text-muted-foreground">
              Activez l'authentification à deux facteurs pour protéger votre compte.
            </p>
          </div>
          <Button>
            Activer 2FA <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
