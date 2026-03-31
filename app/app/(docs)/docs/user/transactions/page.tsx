"use client";

import { Button } from "@/components/ui/button";
import { Send, Search, Filter, ArrowRight, Download } from "lucide-react";

const transactions = [
  {
    id: "TX-001",
    date: "31/03/2026",
    description: "Virement reçu - Facture #4829",
    amount: 4500.0,
    type: "credit",
  },
  {
    id: "TX-002",
    date: "31/03/2026",
    description: "Paiement carte - Amazon",
    amount: -89.99,
    type: "debit",
  },
  {
    id: "TX-003",
    date: "30/03/2026",
    description: "Virement émis - Salaires Mars",
    amount: -12500.0,
    type: "debit",
  },
  {
    id: "TX-004",
    date: "30/03/2026",
    description: "Prélèvement - EDF",
    amount: -145.0,
    type: "debit",
  },
  {
    id: "TX-005",
    date: "29/03/2026",
    description: "Virement reçu - Client ABC",
    amount: 2500.0,
    type: "credit",
  },
];

const filters = ["Tous", "Entrants", "Sortants", "Par carte", "Prélèvements"];

export default function UserTransactionsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Send className="w-4 h-4" />
          User Transactions
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mes <span className="text-primary">transactions</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Consultez l'historique complet de vos opérations bancaires.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter, index) => (
              <Button key={index} variant={index === 0 ? "default" : "outline"} size="sm">
                {filter}
              </Button>
            ))}
          </div>
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
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{tx.description}</td>
                  <td
                    className={`px-4 py-3 text-sm text-right font-medium ${tx.amount > 0 ? "text-green-600" : ""}`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Exporter mes relevés</h2>
            <p className="text-muted-foreground">
              Téléchargez vos relevés de compte en PDF ou CSV.
            </p>
          </div>
          <Button>
            Exporter <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
