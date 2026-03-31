"use client";

import { Button } from "@/components/ui/button";
import { Lock, Key, Shield, Server, ArrowRight, CheckCircle, Eye } from "lucide-react";

const encryptionTypes = [
  {
    title: "Chiffrement au repos",
    description: "Toutes les données sont chiffrées lorsqu'elles sont stockées sur nos serveurs.",
    icon: Server,
  },
  {
    title: "Chiffrement en transit",
    description: "Les données sont chiffrées lors de leur transport entre les systèmes.",
    icon: Lock,
  },
  {
    title: "Gestion des clés",
    description: "Gestion centralisée des clés de chiffrement avec rotation automatique.",
    icon: Key,
  },
];

const features = [
  {
    title: "AES-256",
    description: "Chiffrement de niveau bancaire avec l'algorithme AES-256.",
    icon: Shield,
  },
  {
    title: "TLS 1.3",
    description: "Protocole de sécurité le plus récent pour les connexions.",
    icon: Lock,
  },
  {
    title: "HSM",
    description: "Stockage des clés dans des modules de sécurité matérielle.",
    icon: Key,
  },
  {
    title: "Audit",
    description: "Logs détaillés de tous les accès aux données chiffrées.",
    icon: Eye,
  },
];

export default function PlatformEncryptionPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lock className="w-4 h-4" />
          Platform Encryption
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Chiffrement et <span className="text-primary">sécurité des données</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment nous protégeons vos données avec un chiffrement de niveau bancaire.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de chiffrement</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {encryptionTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{type.title}</h3>
                </div>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Standards de sécurité</h2>
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
            <h2 className="text-xl font-semibold mb-2">Conformité réglementaire</h2>
            <p className="text-muted-foreground">
              Notre infrastructure de chiffrement est conforme aux normes PCI DSS, RGPD et DSP2. Vos
              données sont protégées selon les standards les plus stricts de l'industrie bancaire.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
