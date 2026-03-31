"use client";

import { Button } from "@/components/ui/button";
import { Key, Plus, ArrowRight, Copy, Trash2, Eye, Shield } from "lucide-react";

const apiKeys = [
  {
    name: "Clé production",
    key: "sk_live_...",
    created: "15/03/2026",
    lastUsed: "31/03/2026",
    status: "active",
  },
  {
    name: "Clé développement",
    key: "sk_test_...",
    created: "01/03/2026",
    lastUsed: "28/03/2026",
    status: "active",
  },
];

const features = [
  {
    title: "Génération simple",
    description: "Créez vos clés API en un clic depuis votre dashboard.",
    icon: Plus,
  },
  {
    title: "Permissions granulaires",
    description: "Définissez exactement ce que chaque clé peut faire.",
    icon: Shield,
  },
  {
    title: "Rotation des clés",
    description: "Remplacez vos clés régulièrement pour plus de sécurité.",
    icon: Key,
  },
  {
    title: "Journal d'activité",
    description: "Suivez l'utilisation de chaque clé API.",
    icon: Eye,
  },
];

export default function SecurityApiKeysPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Key className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Clés <span className="text-primary">API</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos clés API pour sécuriser l'accès à nos services.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mes clés API</h2>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle clé
          </Button>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Clé</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Créée</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Dernière utilisation</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-medium">{apiKey.name}</td>
                  <td className="px-4 py-3 text-sm font-mono">{apiKey.key}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{apiKey.created}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{apiKey.lastUsed}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {apiKey.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <h2 className="text-xl font-semibold mb-2">Créer une nouvelle clé</h2>
            <p className="text-muted-foreground">
              Générez une nouvelle clé API pour votre application.
            </p>
          </div>
          <Button>
            Générer une clé <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
