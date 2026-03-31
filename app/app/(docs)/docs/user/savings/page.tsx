"use client";

import { Button } from "@/components/ui/button";
import { PiggyBank, ArrowRight, TrendingUp } from "lucide-react";

const savings = [
  { type: "Livret A", balance: "15 000,00 €", rate: "3.0%", interest: "450,00 €" },
  { type: "Compte à terme", balance: "9 000,00 €", rate: "4.5%", interest: "405,00 €" },
];

const features = [
  { title: "Livret A", rate: "3.0%", description: "Livre d'épargne réglementé" },
  { type: "Compte à terme", rate: "4.5%", description: "Épargne à taux boosté" },
  { title: "PEL", rate: "2.5%", description: "Plan d'épargne logement" },
];

export default function UserSavingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <PiggyBank className="w-4 h-4" />
          User Savings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mon <span className="text-primary">épargne</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos comptes épargne et faites travailler votre argent.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Mes livrets</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {savings.map((saving, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{saving.type}</h3>
                <span className="text-sm text-green-600 font-semibold">{saving.rate} TAEG</span>
              </div>
              <div className="text-3xl font-bold mb-4">{saving.balance}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Intérêts : {saving.interest}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Versement
                </Button>
                <Button variant="outline" size="sm">
                  Retrait
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ouvrir un livret</h2>
            <p className="text-muted-foreground">
              Profitez de nos taux attractifs pour mettre votre épargne en sécurité.
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
