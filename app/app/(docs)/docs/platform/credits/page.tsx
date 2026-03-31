"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
} from "lucide-react";

const creditTypes = [
  {
    title: "Crédit consommation",
    description: "Crédit pour les projets personnels des utilisateurs.",
    icon: DollarSign,
  },
  {
    title: "Crédit professionnel",
    description: "Financement pour les activités professionnelles.",
    icon: BarChart3,
  },
  {
    title: "Crédit immobilier",
    description: "Financement pour l'achat immobilier.",
    icon: Home,
  },
];

const features = [
  {
    title: "Approbation simplifiée",
    description: "Traitement rapide des demandes de crédit.",
    icon: Clock,
  },
  {
    title: "Gestion des taux",
    description: "Configurez les taux d'intérêt par type de crédit.",
    icon: DollarSign,
  },
  {
    title: "Suivi des remboursements",
    description: "Visualisez le statut de chaque crédit.",
    icon: CheckCircle,
  },
  {
    title: "Alertes automatiques",
    description: "Notifications pour les retards de paiement.",
    icon: AlertCircle,
  },
];

const mockCredits = [
  {
    id: "CRD-001",
    holder: "Jean Dupont",
    type: "CONSUMER",
    amount: 15000,
    remaining: 12500,
    status: "active",
    nextPayment: "2026-04-15",
  },
  {
    id: "CRD-002",
    holder: "Marie Martin",
    type: "BUSINESS",
    amount: 50000,
    remaining: 45000,
    status: "active",
    nextPayment: "2026-04-01",
  },
  {
    id: "CRD-003",
    holder: "Pierre Durant",
    type: "CONSUMER",
    amount: 8000,
    remaining: 8000,
    status: "pending",
    nextPayment: "-",
  },
];

function Home({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export default function PlatformCreditsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <BarChart3 className="w-4 h-4" />
          Platform Credits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">crédits</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les demandes de crédit et le suivi des remboursements depuis le dashboard
          administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Crédits en cours</h2>
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
              Nouveau crédit
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Bénéficiaire</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Restant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Prochain paiement</th>
              </tr>
            </thead>
            <tbody>
              {mockCredits.map((credit) => (
                <tr key={credit.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{credit.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{credit.holder}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {credit.type === "CONSUMER" && "Consommation"}
                      {credit.type === "BUSINESS" && "Professionnel"}
                      {credit.type === "REAL_ESTATE" && "Immobilier"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {credit.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {credit.remaining.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        credit.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {credit.status === "active" ? "Actif" : "En attente"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{credit.nextPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de crédits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {creditTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{type.title}</h3>
                </div>
                <p className="text-muted-foreground">{type.description}</p>
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
            <h2 className="text-xl font-semibold mb-2">Accorder un crédit</h2>
            <p className="text-muted-foreground">
              Initiez une nouvelle demande de crédit pour un utilisateur.
            </p>
          </div>
          <Button>
            Nouveau crédit <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
