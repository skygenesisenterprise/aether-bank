"use client";

import { Button } from "@/components/ui/button";
import { Code, BookOpen, ArrowRight, CheckCircle, Globe, Shield, Zap } from "lucide-react";

const endpoints = [
  { method: "GET", path: "/v1/accounts", description: "Liste des comptes" },
  { method: "POST", path: "/v1/accounts", description: "Créer un compte" },
  { method: "GET", path: "/v1/cards", description: "Liste des cartes" },
  { method: "POST", path: "/v1/cards", description: "Créer une carte" },
  { method: "GET", path: "/v1/transactions", description: "Liste des transactions" },
  { method: "POST", path: "/v1/transfers", description: "Effectuer un virement" },
];

const features = [
  {
    title: "REST API",
    description: "API REST moderne avec réponses JSON standardisées.",
    icon: Code,
  },
  {
    title: "Documentation Swagger",
    description: "Documentation interactive avec Swagger UI.",
    icon: BookOpen,
  },
  {
    title: "Webhooks",
    description: "Notifications en temps réel pour tous vos événements.",
    icon: Zap,
  },
  {
    title: "Sécurité",
    description: "Authentification par clé API avec TLS 1.3.",
    icon: Shield,
  },
];

export default function PlatformApiPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Code className="w-4 h-4" />
          Platform API
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Documentation <span className="text-primary">API</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Intégrez nos services bancaires dans vos applications avec notre API REST.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Endpoints principaux</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Méthode</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Endpoint</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        endpoint.method === "GET"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">{endpoint.path}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {endpoint.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités API</h2>
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
            <h2 className="text-xl font-semibold mb-2">Accéder à l'API</h2>
            <p className="text-muted-foreground">
              Obtenez vos clés API et consultez la documentation complète.
            </p>
          </div>
          <Button>
            Documentation <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
