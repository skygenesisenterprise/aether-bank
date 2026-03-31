"use client";

import { Button } from "@/components/ui/button";
import { Home, Wallet, CreditCard, ArrowRight, TrendingUp, TrendingDown, Bell } from "lucide-react";

const metrics = [
  {
    title: "Solde total",
    value: "24 850,00 €",
    change: "+2.4%",
    positive: true,
  },
  {
    title: "Revenus ce mois",
    value: "18 420,00 €",
    change: "+12.5%",
    positive: true,
  },
  {
    title: "Dépenses ce mois",
    value: "8 230,00 €",
    change: "-5.2%",
    positive: true,
  },
  {
    title: "En attente",
    value: "3 transactions",
    change: "2 150,00 €",
    positive: false,
  },
];

const quickActions = [
  { title: "Nouveau virement", icon: ArrowRight, href: "/user/transferts" },
  { title: "Voir mes cartes", icon: CreditCard, href: "/user/cards" },
  { title: "Historique", icon: Home, href: "/user/transactions" },
  { title: "Épargne", icon: Wallet, href: "/user/savings" },
];

export default function UserHomePage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Home className="w-4 h-4" />
          User Dashboard
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bienvenue sur votre <span className="text-primary">espace client</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos comptes, cartes et transactions en toute simplicité.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Aperçu de vos finances</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <span className="text-sm text-muted-foreground mb-2">{metric.title}</span>
              <span className="text-2xl font-bold mb-1">{metric.value}</span>
              <span
                className={`text-sm ${metric.positive ? "text-green-600" : "text-muted-foreground"}`}
              >
                {metric.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Actions rapides</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button key={index} variant="outline" className="h-20 flex flex-col gap-2" asChild>
                <a href={action.href}>
                  <Icon className="w-5 h-5" />
                  <span>{action.title}</span>
                </a>
              </Button>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex items-start gap-4">
          <Bell className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Notifications récentes</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Virement reçu de 4 500,00 € - Aujourd'hui
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                Facture EDF en attente de paiement - Hier
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Nouvelle carte Livret A active - 29 Mars
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
