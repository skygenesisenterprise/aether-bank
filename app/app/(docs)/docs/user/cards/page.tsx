"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Plus, ArrowRight, Lock, Eye, Pause } from "lucide-react";

const cards = [
  {
    id: "CARD-001",
    type: "Physique",
    last4: "4532",
    expiry: "12/27",
    status: "active",
    limit: "5 000,00 €",
    spent: "1 234,50 €",
  },
  {
    id: "CARD-002",
    type: "Virtuelle",
    last4: "8901",
    expiry: "06/26",
    status: "active",
    limit: "2 000,00 €",
    spent: "450,00 €",
  },
];

const features = [
  { title: "Payer en ligne", description: "Paiement sécurisé sur tous les sites" },
  { title: "Sans contact", description: "Paiement rapide sans code" },
  { title: "Retrait DAB", description: "Retraits en euros sans frais" },
  { title: "Alertes", description: "Notifications pour chaque transaction" },
];

export default function UserCardsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <CreditCard className="w-4 h-4" />
          User Cards
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mes <span className="text-primary">cartes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos cartes bancaires et vos limites de dépenses.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mes cartes</h2>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Commander une carte
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{card.type}</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  {card.status === "active" ? "Active" : "Bloquée"}
                </span>
              </div>
              <div className="text-2xl font-bold mb-4">•••• •••• •••• {card.last4}</div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>Expire {card.expiry}</span>
                <span>
                  {card.spent} / {card.limit}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Détails
                </Button>
                <Button variant="outline" size="sm">
                  <Pause className="w-4 h-4 mr-1" />
                  Bloquer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card"
            >
              <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Commander une nouvelle carte</h2>
            <p className="text-muted-foreground">
              Obtenez une carte physique ou virtuelle en quelques clics.
            </p>
          </div>
          <Button>
            Commander <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
