"use client";

import { Button } from "@/components/ui/button";
import {
  PiggyBank,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle,
  Percent,
  Clock,
  Shield,
  Lock,
} from "lucide-react";

const savingsTypes = [
  {
    title: "Livret A",
    description: "Livre d'épargne réglementé avec intérêts défiscalisés.",
    icon: PiggyBank,
    features: ["Taux 3% brut", "Aucun frais", "Retraits libres"],
  },
  {
    title: "Compte à terme",
    description: "Épargne à terme fixe avec taux boosté.",
    icon: Calendar,
    features: ["Taux jusqu'à 4.5%", "Durée flexible", "Sécurité totale"],
  },
  {
    title: "Assurance vie",
    description: "Placement long terme avec avantages fiscaux.",
    icon: TrendingUp,
    features: ["Gestion pilotée", "Fiscalité avantageuse", "Transmission facilitée"],
  },
  {
    title: " PEL",
    description: "Plan d'épargne logement pour votre projet immobilier.",
    icon: Lock,
    features: ["Prime d'état", "Taux réglementé", "Épargne longue durée"],
  },
];

const features = [
  {
    title: "Taux attractifs",
    description: "Jusqu'à 4% TAEG pour maximiser vos gains.",
    icon: Percent,
  },
  {
    title: "Aucun frais",
    description: "Ouverture et gestion gratuites sur tous nos produits.",
    icon: Shield,
  },
  {
    title: "Liquidité",
    description: "Retraits possibles à tout moment selon le produit.",
    icon: Clock,
  },
  {
    title: "Sécurité",
    description: "Déposés garantis par le FGDR jusqu'à 100 000€.",
    icon: Lock,
  },
];

export default function SavingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <PiggyBank className="w-4 h-4" />
          Savings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Épargne <span className="text-primary">bancaire</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Faites travailler votre argent avec nos solutions d'épargne sécurisées et avantageuses.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types d'épargne</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {savingsTypes.map((saving, index) => {
            const Icon = saving.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{saving.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{saving.description}</p>
                <ul className="space-y-2 mt-auto">
                  {saving.features.map((feature, i) => (
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
            <h2 className="text-xl font-semibold mb-2">Ouvrir un compte épargne</h2>
            <p className="text-muted-foreground">
              Profitez de nos meilleurs taux et commencez à épargner dès aujourd'hui.
            </p>
          </div>
          <Button>
            Épargner <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
