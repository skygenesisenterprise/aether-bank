"use client";

import { Button } from "@/components/ui/button";
import {
  PiggyBank,
  Plus,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Clock,
  Percent,
} from "lucide-react";

const savingsTypes = [
  {
    title: "Livret A",
    description: "Livret d'épargne réglementé avec taux actuel de 3%.",
    rate: "3.0%",
  },
  {
    title: "Compte à terme",
    description: "Épargne à terme fixe avec taux progressif.",
    rate: "4.5%",
  },
  {
    title: " PEL",
    description: "Plan d'épargne logement pour projet immobilier.",
    rate: "2.5%",
  },
];

const features = [
  {
    title: "Gestion centralisée",
    description: "Gérez tous les livrets d'épargne depuis un seul dashboard.",
    icon: PiggyBank,
  },
  {
    title: "Intérêts automatic",
    description: "Calcul et versement automatique des intérêts.",
    icon: Percent,
  },
  {
    title: "Suivi des soldes",
    description: "Visualisez l'évolution de l'épargne en temps réel.",
    icon: TrendingUp,
  },
  {
    title: "Alertes",
    description: "Notifications pour les versements et retraits.",
    icon: Clock,
  },
];

const mockSavings = [
  {
    id: "SAV-001",
    holder: "Jean Dupont",
    type: "LIVRET_A",
    balance: 15000,
    rate: "3.0%",
    lastInterest: 450,
    status: "active",
  },
  {
    id: "SAV-002",
    holder: "Marie Martin",
    type: "CAT",
    balance: 25000,
    rate: "4.5%",
    lastInterest: 1125,
    status: "active",
  },
  {
    id: "SAV-003",
    holder: "Pierre Durant",
    type: "PEL",
    balance: 5000,
    rate: "2.5%",
    lastInterest: 125,
    status: "active",
  },
];

export default function PlatformSavingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <PiggyBank className="w-4 h-4" />
          Platform Savings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion de l'<span className="text-primary">épargne</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les comptes d'épargne de vos utilisateurs et suivez les intérêts générés.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Comptes épargne</h2>
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
              Nouveau livret
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
                <th className="px-4 py-3 text-right text-sm font-medium">Solde</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Taux</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Dernier intérêt</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockSavings.map((saving) => (
                <tr key={saving.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{saving.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{saving.holder}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {saving.type === "LIVRET_A" && "Livret A"}
                      {saving.type === "CAT" && "Compte à terme"}
                      {saving.type === "PEL" && "PEL"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {saving.balance.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">{saving.rate}</td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">
                    +
                    {saving.lastInterest.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Actif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de livrets</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {savingsTypes.map((type, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
              <p className="text-muted-foreground mb-4">{type.description}</p>
              <div className="mt-auto">
                <span className="text-2xl font-bold text-primary">{type.rate}</span>
                <span className="text-sm text-muted-foreground"> TAEG</span>
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
            <h2 className="text-xl font-semibold mb-2">Ouvrir un livret</h2>
            <p className="text-muted-foreground">
              Créez un nouveau compte épargne pour l'un de vos utilisateurs.
            </p>
          </div>
          <Button>
            Ouvrir un livret <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
