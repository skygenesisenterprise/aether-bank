"use client";

import { Button } from "@/components/ui/button";
import { Bell, Mail, Smartphone, ArrowRight, CheckCircle, Settings } from "lucide-react";

const notificationChannels = [
  {
    title: "Email",
    description: "Notifications par email pour les événements importants.",
    icon: Mail,
  },
  {
    title: "Push",
    description: "Notifications push sur mobile et navigateur.",
    icon: Smartphone,
  },
  {
    title: "SMS",
    description: "Alertes par SMS pour les transactions critiques.",
    icon: Bell,
  },
];

const notificationTypes = [
  { title: "Transactions", description: "Virements, paiements, prélèvements" },
  { title: "Sécurité", description: "Connexions, mot de passe, 2FA" },
  { title: "Comptes", description: "Solde, alertes, dépassements" },
  { title: "Cartes", description: "Utilisation, blocage, limites" },
];

const features = [
  {
    title: "Personnalisation",
    description: "Configurez les notifications selon vos besoins.",
    icon: Settings,
  },
  {
    title: "Préférences par utilisateur",
    description: "Chaque utilisateur peut gérer ses préférences.",
    icon: Bell,
  },
  {
    title: "Templates",
    description: "Modèles personnalisables pour les notifications.",
    icon: Mail,
  },
  {
    title: "Webhooks",
    description: "Intégrez nos notifications dans vos systèmes.",
    icon: Bell,
  },
];

export default function PlatformNotificationsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Bell className="w-4 h-4" />
          Platform Notifications
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">notifications</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Configurez et gérez les notifications pour votre plateforme et vos utilisateurs.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Canaux de notification</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {notificationChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{channel.title}</h3>
                </div>
                <p className="text-muted-foreground">{channel.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de notifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {notificationTypes.map((type, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          ))}
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
            <h2 className="text-xl font-semibold mb-2">Configurer les notifications</h2>
            <p className="text-muted-foreground">
              Personnalisez les notifications pour votre plateforme.
            </p>
          </div>
          <Button>
            Paramètres <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
