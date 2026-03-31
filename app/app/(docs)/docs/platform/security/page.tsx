"use client";

import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, CheckCircle, Key } from "lucide-react";

const securityFeatures = [
  {
    title: "Authentification forte (2FA)",
    description: "Exigez une vérification en deux étapes pour toutes les connexions.",
    icon: Shield,
  },
  {
    title: "Chiffrement de bout en bout",
    description: "Toutes les données sont chiffrées avec AES-256.",
    icon: Lock,
  },
  {
    title: "Surveillance 24/7",
    description: "Détection automatique des activités suspectes.",
    icon: Eye,
  },
  {
    title: "Gestion des clés API",
    description: "Générez et gérez vos clés API avec des permissions granulaires.",
    icon: Key,
  },
];

const protections = [
  {
    title: "Protection contre la fraude",
    description: "Systèmes de détection des transactions inhabituelles.",
  },
  {
    title: "Limites de transaction",
    description: "Configurez des limites quotidiennes et mensuelles.",
  },
  {
    title: "Alertes en temps réel",
    description: "Notifications push et email pour chaque opération.",
  },
  {
    title: "Session management",
    description: "Gestion des sessions actives avec déconnexion à distance.",
  },
];

export default function PlatformSecurityPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" />
          Platform Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Sécurité de la <span className="text-primary">plateforme</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Protégez votre plateforme avec nos outils de sécurité avancés.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités de sécurité</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => {
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

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Protections disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {protections.map((protection, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{protection.title}</h3>
                <p className="text-sm text-muted-foreground">{protection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-green-500 shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Sécurité de niveau bancaire</h2>
            <p className="text-muted-foreground">
              Notre plateforme utilise les mêmes standards de sécurité que les grandes banques. Nous
              sommes certifiés PCI DSS et conformes au RGPD.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
