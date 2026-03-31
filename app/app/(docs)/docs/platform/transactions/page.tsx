"use client";

import { Button } from "@/components/ui/button";
import {
  Send,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
} from "lucide-react";

const transactionTypes = [
  {
    title: "Virement entrant",
    type: "CREDIT",
    description: "Argent reçu sur le compte.",
    icon: Send,
    color: "text-green-500",
  },
  {
    title: "Virement sortant",
    type: "DEBIT",
    description: "Argent envoyé depuis le compte.",
    icon: Send,
    color: "text-red-500",
  },
  {
    title: "Paiement carte",
    type: "CARD",
    description: "Paiement par carte bancaire.",
    icon: CreditCard,
    color: "text-blue-500",
  },
  {
    title: "Prélèvement",
    type: "DIRECT_DEBIT",
    description: "Prélèvement automatique.",
    icon: RefreshCw,
    color: "text-orange-500",
  },
];

const features = [
  {
    title: "Filtres avancés",
    description: "Filtrez par date, montant, type ou statut.",
    icon: Filter,
  },
  {
    title: "Export CSV/Excel",
    description: "Exportez vos transactions pour votre comptabilité.",
    icon: Download,
  },
  {
    title: "Suivi en temps réel",
    description: "Visualisez les transactions instantanément.",
    icon: Clock,
  },
  {
    title: "Rapprochement automatique",
    description: "Rapprochez automatiquement vos opérations.",
    icon: CheckCircle,
  },
];

const mockTransactions = [
  {
    id: "TX-001",
    date: "2026-03-31 14:32",
    description: "Virement reçu - Facture #4829",
    amount: 4500.0,
    type: "CREDIT",
    status: "completed",
  },
  {
    id: "TX-002",
    date: "2026-03-31 09:15",
    description: "Paiement carte - Amazon",
    amount: -89.99,
    type: "CARD",
    status: "completed",
  },
  {
    id: "TX-003",
    date: "2026-03-30 16:45",
    description: "Virement émis - Salaires Mars",
    amount: -12500.0,
    type: "DEBIT",
    status: "completed",
  },
  {
    id: "TX-004",
    date: "2026-03-30 11:20",
    description: "Prélencement - EDF",
    amount: -145.0,
    type: "DIRECT_DEBIT",
    status: "pending",
  },
  {
    id: "TX-005",
    date: "2026-03-29 08:00",
    description: "Virement reçu - Client ABC",
    amount: 2500.0,
    type: "CREDIT",
    status: "completed",
  },
];

function CreditCard({ className }: { className?: string }) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

export default function PlatformTransactionsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Send className="w-4 h-4" />
          Platform Transactions
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">transactions</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Suivez et gérez toutes les opérations bancaires depuis le dashboard administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Historique des transactions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{tx.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{tx.description}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        tx.type === "CREDIT"
                          ? "bg-green-100 text-green-700"
                          : tx.type === "DEBIT"
                            ? "bg-red-100 text-red-700"
                            : tx.type === "CARD"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {tx.type === "CREDIT" && "Entrant"}
                      {tx.type === "DEBIT" && "Sortant"}
                      {tx.type === "CARD" && "Carte"}
                      {tx.type === "DIRECT_DEBIT" && "Prélèvement"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className={tx.amount > 0 ? "text-green-600" : ""}>
                      {tx.amount.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        tx.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tx.status === "completed" ? "Complété" : "En attente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de transactions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transactionTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className={`w-5 h-5 ${type.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
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
            <h2 className="text-xl font-semibold mb-2">Effectuer un virement</h2>
            <p className="text-muted-foreground">
              Initiez un nouveau virement depuis le dashboard administrateur.
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
