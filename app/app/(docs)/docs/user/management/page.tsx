"use client";

import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield, Globe, ArrowRight } from "lucide-react";

const settingsSections = [
  { title: "Informations personnelles", description: "Nom, email, téléphone", icon: User },
  { title: "Préférences", description: "Langue, devise, fuseau horaire", icon: Globe },
  { title: "Notifications", description: "Alertes et emails", icon: Bell },
  { title: "Confidentialité", description: "Données et cookies", icon: Shield },
];

export default function UserManagementPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Settings className="w-4 h-4" />
          User Management
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Paramètres du <span className="text-primary">compte</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos informations personnelles et vos préférences.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Paramètres</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <button
                key={index}
                className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Supprimer mon compte</h2>
            <p className="text-muted-foreground">
              Vous pouvez supprimer votre compte à tout moment.
            </p>
          </div>
          <Button variant="destructive">Supprimer le compte</Button>
        </div>
      </section>
    </div>
  );
}
