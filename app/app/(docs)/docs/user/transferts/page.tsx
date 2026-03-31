"use client";

import { Button } from "@/components/ui/button";
import { Send, ArrowRight, Clock, CheckCircle } from "lucide-react";

const transferTypes = [
  { title: "Virement SEPA", description: "Virement bancaire européen", delay: "1-2 jours ouvrés" },
  { title: "Virement instantané", description: "Virement immédiat 24/7", delay: "Instantané" },
  { title: "Virement international", description: "Vers l'étranger", delay: "2-5 jours ouvrés" },
];

const recentTransfers = [
  { date: "31/03/2026", recipient: "Jean Dupont", amount: "4 500,00 €", status: "completed" },
  { date: "30/03/2026", recipient: "Marie Martin", amount: "1 250,00 €", status: "completed" },
  { date: "29/03/2026", recipient: "Pierre Durant", amount: "890,00 €", status: "pending" },
];

export default function UserTransfertsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Send className="w-4 h-4" />
          User Transferts
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mes <span className="text-primary">virements</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Effectuez des virements en toute simplicité vers n'importe quel compte bancaire européen.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de virements</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {transferTypes.map((type, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
              <p className="text-muted-foreground mb-4">{type.description}</p>
              <div className="flex items-center gap-2 text-sm text-primary mt-auto">
                <Clock className="w-4 h-4" />
                <span>{type.delay}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Virements récents</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Bénéficiaire</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentTransfers.map((transfer, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{transfer.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{transfer.recipient}</td>
                  <td className="px-4 py-3 text-sm text-right">{transfer.amount}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        transfer.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {transfer.status === "completed" ? "Terminé" : "En attente"}
                    </span>
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
            <h2 className="text-xl font-semibold mb-2">Effectuer un virement</h2>
            <p className="text-muted-foreground">
              Envoyez de l'argent vers n'importe quel compte bancaire européen.
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
