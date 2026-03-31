"use client";

import { Button } from "@/components/ui/button";
import { User, Wallet, ArrowRight, Copy, CheckCircle } from "lucide-react";

const accountTypes = [
  {
    title: "Compte courant",
    iban: "FR76 3000 4000 1234 5678 9012",
    balance: "15 850,00 €",
    type: "COURANT",
  },
  {
    title: "Compte épargne",
    iban: "FR76 3000 4000 1234 5678 9013",
    balance: "9 000,00 €",
    type: "EPARGNE",
  },
];

export default function UserAccountPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <User className="w-4 h-4" />
          User Account
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mes <span className="text-primary">comptes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Consultez et gérez vos comptes bancaires.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Mes comptes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {accountTypes.map((account, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{account.title}</h3>
                <span className="text-sm text-muted-foreground">{account.type}</span>
              </div>
              <div className="text-3xl font-bold mb-4">{account.balance}</div>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-muted px-2 py-1 rounded">{account.iban}</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(account.iban)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ouvrir un nouveau compte</h2>
            <p className="text-muted-foreground">
              Créez un compte supplémentaire pour mieux gérer vos finances.
            </p>
          </div>
          <Button>
            Ouvrir un compte <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
