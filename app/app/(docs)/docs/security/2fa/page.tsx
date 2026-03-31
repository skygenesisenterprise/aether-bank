"use client";

import { Button } from "@/components/ui/button";
import { Shield, Smartphone, ArrowRight, CheckCircle, Mail } from "lucide-react";

const twoFactorMethods = [
  {
    title: "Application authenticator",
    description: "Utilisez Google Authenticator, Authy ou équivalent.",
    icon: Smartphone,
    recommended: true,
  },
  {
    title: "SMS",
    description: "Recevez le code par message texte sur votre téléphone.",
    icon: Mail,
    recommended: false,
  },
];

const features = [
  {
    title: "Configuration simple",
    description: "Activez la 2FA en quelques clics depuis votre dashboard.",
    icon: Shield,
  },
  {
    title: "Codes de sauvegarde",
    description: "Recevez des codes de secours en cas de perte de votre appareil.",
    icon: CheckCircle,
  },
  {
    title: "Compatibilité",
    description: "Fonctionne avec toutes les applications populars.",
    icon: Smartphone,
  },
];

export default function Security2faPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Authentification à <span className="text-primary">deux facteurs</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ajoutez une couche de sécurité supplémentaire à votre compte.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Méthodes disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {twoFactorMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                  {method.recommended && (
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Recommandé
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{method.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Avantages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Activer la 2FA</h2>
            <p className="text-muted-foreground">Sécurisez votre compte dès maintenant.</p>
          </div>
          <Button>
            Activer <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
