"use client";

import { Button } from "@/components/ui/button";
import { Cloud, Server, Database, ArrowRight, CheckCircle, Shield, Globe } from "lucide-react";

const infrastructure = [
  {
    title: "Hébergement",
    description: "Nos serveurs sont hébergés dans des data centers français sécurisés.",
    icon: Server,
  },
  {
    title: "Redondance",
    description: "Architecture distribuée avec failover automatique.",
    icon: Database,
  },
  {
    title: " CDN",
    description: "Distribution de contenu géographiquement proche de vos utilisateurs.",
    icon: Globe,
  },
];

const features = [
  {
    title: "Scalabilité",
    description: "Ajustez automatiquement les ressources selon la demande.",
    icon: Cloud,
  },
  {
    title: "Sauvegardes",
    description: "Sauvegardes automatiques journalières et hebdomadaires.",
    icon: Server,
  },
  {
    title: "Disaster Recovery",
    description: "Plan de reprise d'activité avec RTO inférieur à 4 heures.",
    icon: Shield,
  },
  {
    title: "Monitoring 24/7",
    description: "Surveillance permanente avec alertes automatiques.",
    icon: Globe,
  },
];

export default function PlatformCloudPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Cloud className="w-4 h-4" />
          Platform Cloud
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Infrastructure <span className="text-primary">cloud</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Une infrastructure cloud sécurisée et performante pour vos applications bancaires.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Architecture</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {infrastructure.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
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
        <div className="flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Certifications</h2>
            <p className="text-muted-foreground">
              Notre infrastructure est certifiée ISO 27001, SOC 2 Type II et conforme au RGPD. Vos
              données sont hébergées en France avec une disponibilité de 99.99%.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
