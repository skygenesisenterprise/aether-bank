"use client";

import { Button } from "@/components/ui/button";
import { Banknote, Copy, CheckCircle, ArrowRight, Globe, Search } from "lucide-react";

const features = [
  {
    title: "IBAN européen",
    description: "Chaque compte dispose d'un IBAN français valide accepté dans toute la zone SEPA.",
    icon: Globe,
  },
  {
    title: "Génération automatique",
    description: "Les IBAN sont générés automatiquement lors de la création d'un compte.",
    icon: Banknote,
  },
  {
    title: "Recherche rapide",
    description: "Recherchez un IBAN spécifique ou un compte par son identifiant.",
    icon: Search,
  },
  {
    title: "Copier-coller",
    description: "Copiez facilement l'IBAN d'un compte en un clic.",
    icon: Copy,
  },
];

const mockIbans = [
  {
    account: "Compte principal",
    iban: "FR76 3000 4000 1234 5678 9012",
    bic: "BNORFRPP",
    status: "active",
  },
  {
    account: "Compte épargne",
    iban: "FR76 3000 4000 1234 5678 9013",
    bic: "BNORFRPP",
    status: "active",
  },
  {
    account: "Compte pro",
    iban: "FR76 3000 4000 1234 5678 9014",
    bic: "BNORFRPP",
    status: "active",
  },
];

export default function PlatformIbanPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Banknote className="w-4 h-4" />
          Platform IBAN
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">IBAN</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les IBAN et BIC de vos comptes bancaires.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">IBAN disponibles</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Compte</th>
                <th className="px-4 py-3 text-left text-sm font-medium">IBAN</th>
                <th className="px-4 py-3 text-left text-sm font-medium">BIC</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockIbans.map((item, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-medium">{item.account}</td>
                  <td className="px-4 py-3 text-sm font-mono">{item.iban}</td>
                  <td className="px-4 py-3 text-sm font-mono">{item.bic}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Actif
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(item.iban)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <h2 className="text-xl font-semibold mb-2">Générer un IBAN</h2>
            <p className="text-muted-foreground">
              Créez un nouveau compte pour obtenir un nouvel IBAN.
            </p>
          </div>
          <Button>
            Nouveau compte <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
