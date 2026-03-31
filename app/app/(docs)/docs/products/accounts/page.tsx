"use client";

import { Button } from "@/components/ui/button";
import {
  Wallet,
  CreditCard,
  PiggyBank,
  Building2,
  Users,
  ArrowRight,
  CheckCircle,
  Euro,
  Clock,
  Shield,
} from "lucide-react";

const accountTypes = [
  {
    title: "Compte courant",
    description: "Compte基础账户用于日常交易和支付。",
    icon: Wallet,
    features: ["IBAN européen", "Virements SEPA illimités", "Prélèvements automatiques"],
  },
  {
    title: "Compte épargne",
    description: "高利率储蓄账户，让您的资金增值。",
    icon: PiggyBank,
    features: ["Taux jusqu'à 4% TAEG", "Versements libres", "Retraits flexibles"],
  },
  {
    title: "Compte joint",
    description: "与合作伙伴共享的联名账户。",
    icon: Users,
    features: ["2 à 4 titulaires", "Accès multilogin", "Historique partagé"],
  },
  {
    title: "Compte entreprise",
    description: "专为企业和自由职业者设计的专业账户。",
    icon: Building2,
    features: ["Gestion d'équipe", "Facturation intégrée", "Export comptable"],
  },
];

const features = [
  {
    title: "IBAN européen",
    description:
      "Obtenez un IBAN français valide pour recevoir des virements depuis toute l'Europe.",
    icon: Euro,
  },
  {
    title: "Virements instantanés",
    description: "Effectuez des virements SEPA instantanés 24h/24 et 7j/7.",
    icon: Clock,
  },
  {
    title: "Sécurité renforcée",
    description: "Protection par authentification forte et surveillance des opérations.",
    icon: Shield,
  },
];

export default function AccountsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Wallet className="w-4 h-4" />
          Accounts
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Comptes <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos comptes bancaires adaptés à tous vos besoins : particulier, professionnel ou
          entreprise.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de comptes</h2>
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
        <h2 className="text-2xl font-bold">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-3 gap-6">
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
            <h2 className="text-xl font-semibold mb-2">Ouvrir un compte</h2>
            <p className="text-muted-foreground">
              Créez votre compte en quelques minutes et commencez à gérer vos finances.
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
