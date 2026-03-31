"use client";

import { Button } from "@/components/ui/button";
import {
  Send,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Shield,
  RefreshCw,
  Building2,
} from "lucide-react";

const transferTypes = [
  {
    title: "Virement SEPA",
    description: "Virements bancaires européens rapides et sécurisés.",
    icon: Send,
    features: ["Instantané ou différé", "Aucun frais", "Suivi en temps réel"],
  },
  {
    title: "Virement instantané",
    description: "Virements immédiats disponibles 24h/24 et 7j/7.",
    icon: Clock,
    features: ["Crédit en quelques secondes", "Jusqu'à 100 000€", "Disponible 24/7"],
  },
  {
    title: "Virement international",
    description: "Envoyez de l'argent à l'international avec les meilleurs taux.",
    icon: Globe,
    features: ["140+ pays couverts", "Taux de change avantageux", "Suivi du transfert"],
  },
  {
    title: "Prélèvement automatique",
    description: "Configurez des paiements récurrents pour vos factures.",
    icon: RefreshCw,
    features: ["Créer des mandats", "Historique complet", "Annulation facile"],
  },
];

const features = [
  {
    title: "Frais réduits",
    description: "Virements SEPA gratuits. Commissions réduites à l'international.",
    icon: DollarSign,
  },
  {
    title: "Sécurité maximale",
    description: "Authentification forte et surveillance des opérations suspectes.",
    icon: Shield,
  },
  {
    title: "Suivi en temps réel",
    description: "Suivez l'état de vos virements depuis votre dashboard.",
    icon: Clock,
  },
  {
    title: "API dédiée",
    description: "Automatisez vos virements depuis votre système d'information.",
    icon: Building2,
  },
];

export default function TransfertsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Send className="w-4 h-4" />
          Transferts
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Virements et <span className="text-primary">transferts</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Effectuez tous vos virements en toute simplicité : SEPA, instantanés ou internationaux.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de virements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {transferTypes.map((transfer, index) => {
            const Icon = transfer.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{transfer.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{transfer.description}</p>
                <ul className="space-y-2 mt-auto">
                  {transfer.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Avantages</h2>
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
            <h2 className="text-xl font-semibold mb-2">Effectuer un virement</h2>
            <p className="text-muted-foreground">
              Envoyez de l'argent en quelques clics depuis votre dashboard.
            </p>
          </div>
          <Button>
            Nouveau virement <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
