"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, ArrowRight, Clock, CheckCircle } from "lucide-react";

const credits = [
  {
    type: "Crédit consommation",
    amount: "15 000,00 €",
    remaining: "12 500,00 €",
    status: "active",
    nextPayment: "15/04/2026",
  },
];

const features = [
  { title: "Crédit consommation", description: "Pour vos projets personnels" },
  { title: "Crédit immobilier", description: "Pour votre projet immobilier" },
  { title: "Crédit professionnel", description: "Pour développer votre activité" },
];

export default function UserCreditPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <BarChart3 className="w-4 h-4" />
          User Credits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mes <span className="text-primary">crédits</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos crédits et suivez vos remboursements.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Mes crédits en cours</h2>
        {credits.map((credit, index) => (
          <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{credit.type}</h3>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                {credit.status === "active" ? "Actif" : "En attente"}
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm text-muted-foreground">Montant initial</span>
                <div className="text-xl font-bold">{credit.amount}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Restant dû</span>
                <div className="text-xl font-bold">{credit.remaining}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Prochain échéance</span>
                <div className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {credit.nextPayment}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Voir le détail
            </Button>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Simuler un crédit</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button variant="outline" size="sm" className="mt-auto">
                Simuler
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Demander un crédit</h2>
            <p className="text-muted-foreground">
              Obtenez une réponse de principe en quelques minutes.
            </p>
          </div>
          <Button>
            Faire une demande <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
