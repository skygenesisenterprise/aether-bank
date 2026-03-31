"use client";

import { Button } from "@/components/ui/button";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const settingsSections = [
  {
    title: "Profil administrateur",
    description: "Gérez vos informations personnelles et vos accès.",
    icon: User,
  },
  {
    title: "Sécurité",
    description: "Mot de passe, 2FA, sessions actives.",
    icon: Shield,
  },
  {
    title: "Notifications",
    description: "Préférences de notifications et alertes.",
    icon: Bell,
  },
  {
    title: "International",
    description: "Langue, fuseau horaire, devises.",
    icon: Globe,
  },
];

const features = [
  {
    title: "Gestion des utilisateurs",
    description: "Ajoutez et gérez les accès de votre équipe.",
    icon: User,
  },
  {
    title: "Configuration globale",
    description: "Paramétrez les options par défaut de la plateforme.",
    icon: SettingsIcon,
  },
  {
    title: "Logs d'activité",
    description: "Consultation de l'historique des actions.",
    icon: Shield,
  },
  {
    title: "Intégrations",
    description: "Connectez des services tiers via API.",
    icon: Globe,
  },
];

export default function PlatformSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <SettingsIcon className="w-4 h-4" />
          Platform Settings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Paramètres de la <span className="text-primary">plateforme</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Configurez et personnalisez votre espace administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Sections de paramètres</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Accéder aux paramètres</h2>
            <p className="text-muted-foreground">
              Modifiez les paramètres de votre compte administrateur.
            </p>
          </div>
          <Button>
            Ouvrir les paramètres <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
