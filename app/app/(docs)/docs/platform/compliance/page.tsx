"use client";

import { Button } from "@/components/ui/button";
import { Scale, Shield, CheckCircle, ArrowRight, FileText, Globe, Lock } from "lucide-react";

const regulations = [
  {
    title: "RGPD",
    description: "Conformité au Règlement Général sur la Protection des Données.",
    icon: Shield,
  },
  {
    title: "DSP2",
    description: "Directive sur les Services de Paiement pour l'Open Banking.",
    icon: Globe,
  },
  {
    title: "PSD2",
    description: "Directive européenne pour les services de paiement.",
    icon: Scale,
  },
  {
    title: "AML/KYC",
    description: "Lutte contre le blanchiment d'argent et connaissance client.",
    icon: Lock,
  },
];

const features = [
  {
    title: "Vérification d'identité",
    description: "Processus KYC automatisé avec vérification de pièces d'identité.",
    icon: Shield,
  },
  {
    title: "Surveillance des transactions",
    description: "Détection automatique des opérations suspectes.",
    icon: FileText,
  },
  {
    title: "Rapports réglementaires",
    description: "Génération automatique des rapports pour les autorités.",
    icon: Scale,
  },
  {
    title: "Audit trail",
    description: "Historique complet de toutes les opérations pour traçabilité.",
    icon: CheckCircle,
  },
];

export default function PlatformCompliancePage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Scale className="w-4 h-4" />
          Platform Compliance
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Conformité <span className="text-primary">réglementaire</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nous respectons toutes les réglementations bancaires européennes en vigueur.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Réglementations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regulations.map((reg, index) => {
            const Icon = reg.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{reg.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{reg.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Outils de conformité</h2>
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
              Aether Bank est agréé par l'ACPR (Autorité de Contrôle Prudentiel et de Résolution) et
              adhere aux normes les plus strictes de l'industrie bancaire européenne.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
