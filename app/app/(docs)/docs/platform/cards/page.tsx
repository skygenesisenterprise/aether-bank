"use client";

import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Lock,
  Clock,
  Shield,
  MoreVertical,
  Smartphone,
} from "lucide-react";

const cardTypes = [
  {
    title: "Carte physique",
    type: "PHYSICAL",
    description: "Carte bancaire physique avec paiement sans contact.",
    icon: CreditCard,
    features: ["Paiement en magasin et en ligne", "Retraits aux DAB", "Assurance voyage"],
  },
  {
    title: "Carte virtuelle",
    type: "VIRTUAL",
    description: "Carte numérique pour les paiements en ligne sécurisés.",
    icon: Smartphone,
    features: ["Génération instantanée", "Limit configurables", "Désactivation immédiate"],
  },
];

const features = [
  {
    title: "Émission en masse",
    description: "Créez plusieurs cartes simultanément pour votre équipe.",
    icon: Plus,
  },
  {
    title: "Contrôle des dépenses",
    description: "Définissez des limites quotidiennes et mensuelles par carte.",
    icon: Lock,
  },
  {
    title: "Gel temporaire",
    description: "Bloquez instantanément une carte suspecte ou non utilisée.",
    icon: Shield,
  },
  {
    title: "Historique complet",
    description: "Suivez toutes les transactions effectuées avec chaque carte.",
    icon: Clock,
  },
];

const mockCards = [
  {
    id: "CARD-001",
    holder: "Jean Dupont",
    type: "PHYSICAL",
    last4: "4532",
    expiry: "12/27",
    status: "active",
    limit: 5000,
    spent: 1234.5,
  },
  {
    id: "CARD-002",
    holder: "Marie Martin",
    type: "VIRTUAL",
    last4: "8901",
    expiry: "06/26",
    status: "active",
    limit: 2000,
    spent: 450.0,
  },
  {
    id: "CARD-003",
    holder: "Pierre Durant",
    type: "PHYSICAL",
    last4: "3456",
    expiry: "03/28",
    status: "blocked",
    limit: 3000,
    spent: 0,
  },
];

export default function PlatformCardsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <CreditCard className="w-4 h-4" />
          Platform Cards
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">cartes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Émettez et gérez les cartes bancaires de vos utilisateurs depuis le dashboard
          administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Cartes existantes</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle carte
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Titulaire</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Numéro</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Limite</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockCards.map((card) => (
                <tr key={card.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{card.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{card.holder}</td>
                  <td className="px-4 py-3 text-sm">
                    {card.type === "PHYSICAL" ? "Physique" : "Virtuelle"}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">•••• •••• •••• {card.last4}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        card.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {card.status === "active" ? "Active" : "Bloquée"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {card.limit.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de cartes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cardTypes.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <ul className="space-y-2 mt-auto">
                  {card.features.map((feature, i) => (
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
            <h2 className="text-xl font-semibold mb-2">Émettre une carte</h2>
            <p className="text-muted-foreground">
              Créez une nouvelle carte pour l'un de vos utilisateurs.
            </p>
          </div>
          <Button>
            Nouvelle carte <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
