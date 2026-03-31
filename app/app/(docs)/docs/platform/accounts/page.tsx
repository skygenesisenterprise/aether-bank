"use client";

import { Button } from "@/components/ui/button";
import {
  Wallet,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Euro,
  Clock,
  Shield,
  MoreVertical,
} from "lucide-react";

const accountTypes = [
  {
    title: "Compte courant",
    type: "CURRENT",
    description: "Compte principal pour les opérations quotidiennes.",
    icon: Wallet,
    features: ["IBAN français", "Virements SEPA", "Prélèvements"],
  },
  {
    title: "Compte professionnel",
    type: "BUSINESS",
    description: "Compte dédié aux professionals et entreprises.",
    icon: Wallet,
    features: ["Gestion d'équipe", "Facturation intégrée", "Export comptable"],
  },
];

const features = [
  {
    title: "Création simplifiée",
    description: "Créez un compte en quelques clics depuis le dashboard.",
    icon: Plus,
  },
  {
    title: "IBAN européen",
    description: "Chaque compte dispose d'un IBAN français valide.",
    icon: Euro,
  },
  {
    title: "Suivi en temps réel",
    description: "Visualisez le solde et les opérations en temps réel.",
    icon: Clock,
  },
  {
    title: "Sécurité renforcée",
    description: "Authentification forte pour chaque opération sensible.",
    icon: Shield,
  },
];

const mockAccounts = [
  {
    id: "ACC-001",
    name: "Compte principal",
    type: "COURANT",
    iban: "FR76 3000 4000 1234 5678 9012",
    balance: 45_250.0,
    status: "active",
  },
  {
    id: "ACC-002",
    name: "Compte épargne",
    type: "EPARGNE",
    iban: "FR76 3000 4000 1234 5678 9013",
    balance: 12_500.0,
    status: "active",
  },
  {
    id: "ACC-003",
    name: "Compte pro",
    type: "BUSINESS",
    iban: "FR76 3000 4000 1234 5678 9014",
    balance: 8_750.0,
    status: "pending",
  },
];

export default function PlatformAccountsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Wallet className="w-4 h-4" />
          Platform Accounts
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">comptes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Créez et gérez les comptes bancaires de vos utilisateurs depuis le dashboard
          administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Comptes existants</h2>
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
              Nouveau compte
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">IBAN</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Solde</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockAccounts.map((account) => (
                <tr key={account.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{account.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{account.name}</td>
                  <td className="px-4 py-3 text-sm">{account.type}</td>
                  <td className="px-4 py-3 text-sm font-mono text-xs">{account.iban}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    {account.balance.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        account.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {account.status === "active" ? "Actif" : "En attente"}
                    </span>
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
        <h2 className="text-2xl font-bold">Types de comptes disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {accountTypes.map((account, index) => {
            const Icon = account.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{account.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{account.description}</p>
                <ul className="space-y-2 mt-auto">
                  {account.features.map((feature, i) => (
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
            <h2 className="text-xl font-semibold mb-2">Créer un compte</h2>
            <p className="text-muted-foreground">
              Ajoutez un nouveau compte bancaire pour l'un de vos utilisateurs.
            </p>
          </div>
          <Button>
            Créer un compte <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
