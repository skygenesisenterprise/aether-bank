"use client";

import { Button } from "@/components/ui/button";
import { Building2, Plus, Search, ArrowRight, CheckCircle, Shield, Globe } from "lucide-react";

const providerTypes = [
  {
    title: "Banque émettrice",
    description: "Émettrice des cartes et des comptes.",
    icon: Building2,
  },
  {
    title: "Processeur de paiement",
    description: "Traitement des transactions par carte.",
    icon: CreditCard,
  },
  {
    title: "Fournisseur d'authentification",
    description: "Services KYC et vérification d'identité.",
    icon: Shield,
  },
];

const features = [
  {
    title: "Gestion des partenaires",
    description: "Ajoutez et gérez vos partenaires bancaires.",
    icon: Building2,
  },
  {
    title: "Suivi des transactions",
    description: "Visualisez les transactions par partenaire.",
    icon: Search,
  },
  {
    title: "Intégration API",
    description: "Connectez vos partenaires via API.",
    icon: Globe,
  },
  {
    title: "Contrats",
    description: "Gérez les contrats et tarifications.",
    icon: FileText,
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

function FileText({ className }: { className?: string }) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
    </svg>
  );
}

const mockProviders = [
  { name: "Visa Europe", type: "CARDS", status: "active", transactions: 45230 },
  { name: "Mastercard", type: "CARDS", status: "active", transactions: 32100 },
  { name: "Worldline", type: "PROCESSOR", status: "active", transactions: 77330 },
  { name: "Sumsub", type: "KYC", status: "active", transactions: 1250 },
];

export default function PlatformProvidersPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Building2 className="w-4 h-4" />
          Platform Providers
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion des <span className="text-primary">partenaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez vos partenaires bancaires et fournisseurs de services.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Partenaires actifs</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Transactions</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockProviders.map((provider, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-medium">{provider.name}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {provider.type === "CARDS" && "Cartes"}
                      {provider.type === "PROCESSOR" && "Processeur"}
                      {provider.type === "KYC" && "KYC"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    {provider.transactions.toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Actif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de partenaires</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {providerTypes.map((type, index) => {
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
            <h2 className="text-xl font-semibold mb-2">Ajouter un partenaire</h2>
            <p className="text-muted-foreground">
              Intégrez un nouveau partenaire bancaire à votre plateforme.
            </p>
          </div>
          <Button>
            Nouveau partenaire <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
