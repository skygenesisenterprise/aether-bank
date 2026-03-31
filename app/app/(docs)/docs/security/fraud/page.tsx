"use client";

import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, ArrowRight, CheckCircle, Bell, Lock } from "lucide-react";

const fraudProtections = [
  {
    title: "Surveillance en temps réel",
    description: "Nos systèmes analysent chaque transaction pour détecter les activités suspectes.",
    icon: Shield,
  },
  {
    title: "Alertes automatiques",
    description: "Recevez des notifications instantanées en cas de transaction inhabituelle.",
    icon: Bell,
  },
  {
    title: "Limites de spending",
    description: "Configurez des limites quotidiennes et mensuelles pour vos cartes.",
    icon: Lock,
  },
  {
    title: "Blocage immédiat",
    description: "Bloquez instantanément vos cartes depuis l'application en cas de suspicion.",
    icon: AlertTriangle,
  },
];

const suspiciousActivities = [
  "Transaction d'un montant inhabituel",
  "Connexion depuis un nouvel appareil",
  "Plusieurs tentatives de paiement échouées",
  "Transaction dans un pays inhabituel",
];

export default function SecurityFraudPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Protection contre la <span className="text-primary">fraude</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment nous protégeons vos finances contre la fraude.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Nos protections</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {fraudProtections.map((protection, index) => {
            const Icon = protection.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{protection.title}</h3>
                  <p className="text-sm text-muted-foreground">{protection.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Signaux d'alerte</h2>
        <p className="text-muted-foreground">
          Voici les activités qui peuvent indiquer une tentative de fraude :
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {suspiciousActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
              <span className="text-sm">{activity}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Signaler une fraude</h2>
            <p className="text-muted-foreground">
              Si vous constatez une activité suspecte, contactez-nous immédiatement.
            </p>
          </div>
          <Button>
            Contacter le support <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
