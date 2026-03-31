"use client";

import { Button } from "@/components/ui/button";
import {
  CreditCard as CreditIcon,
  Home,
  Car,
  ArrowRight,
  CheckCircle,
  Percent,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";

const creditTypes = [
  {
    title: "Crédit consommation",
    description: "Financement pour vos projets personnels : voyage, mariage, travaux.",
    icon: CreditIcon,
    features: ["Montant jusqu'à 50 000€", "Durée jusqu'à 84 mois", "Réponse rapide"],
  },
  {
    title: "Crédit immobilier",
    description: "Financement pour l'achat de votre résidence principale ou secondaire.",
    icon: Home,
    features: ["Taux préférentiels", "Assurance emprunteur", "Simulation en ligne"],
  },
  {
    title: "Crédit professionnel",
    description: "Financement pour développer votre activité professionnelle.",
    icon: TrendingUp,
    features: ["Jusqu'à 300 000€", "Sans apport obligatoire", "Gestion en ligne"],
  },
  {
    title: "Crédit-auto",
    description: "Financement pour l'achat de votre nouveau véhicule.",
    icon: Car,
    features: ["Véhicule neuf ou ocasión", "Sans frais de dossier", "Remise	client"],
  },
];

const features = [
  {
    title: "Simulation en ligne",
    description: "Calculez votre mensualité et votre taux en temps réel.",
    icon: Percent,
  },
  {
    title: "Décision rapide",
    description: "Obtenez une réponse de principe en quelques minutes.",
    icon: Clock,
  },
  {
    title: "Taux compétitifs",
    description: "Profitez de nos meilleurs taux selon votre profil.",
    icon: TrendingUp,
  },
  {
    title: "Assurance optionnelle",
    description: "Souscrivez une assurance pour protéger vos remboursements.",
    icon: Shield,
  },
];

export default function CreditsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <CreditIcon className="w-4 h-4" />
          Credits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Credits <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Financez vos projets avec nos offres de crédit adaptées à vos besoins.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de crédits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {creditTypes.map((credit, index) => {
            const Icon = credit.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{credit.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{credit.description}</p>
                <ul className="space-y-2 mt-auto">
                  {credit.features.map((feature, i) => (
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
            <h2 className="text-xl font-semibold mb-2">Simuler votre crédit</h2>
            <p className="text-muted-foreground">
              Utilisez notre simulateur en ligne pour connaître votre capacité d'emprunt.
            </p>
          </div>
          <Button>
            Calculer <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
