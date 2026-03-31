"use client";

import { Button } from "@/components/ui/button";
import {
  Database,
  Download,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
} from "lucide-react";

const metrics = [
  {
    title: "Total des entrées",
    value: "127 450 €",
    change: "+12.5%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Total des sorties",
    value: "89 320 €",
    change: "-5.2%",
    positive: true,
    icon: TrendingDown,
  },
  {
    title: "Solde net",
    value: "38 130 €",
    change: "+18.7%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Transactions",
    value: "1 247",
    change: "+8.3%",
    positive: true,
    icon: CreditCard,
  },
];

const features = [
  {
    title: "Grand livre analytique",
    description: "Visualisez toutes les écritures comptables par compte.",
    icon: Database,
  },
  {
    title: "Export comptable",
    description: "Exportez les données au format FEC pour votre expert-comptable.",
    icon: Download,
  },
  {
    title: "Filtres avancés",
    description: "Filtrez par période, compte, montant ou catégorie.",
    icon: Filter,
  },
  {
    title: "Rapprochement",
    description: "Rapprochez automatiquement les écritures bancaires.",
    icon: Search,
  },
];

export default function PlatformLedgerPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Database className="w-4 h-4" />
          Platform Ledger
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Grand <span className="text-primary">livre</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Consultez le grand livre comptable et gérez les écritures de votre plateforme.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Indicateurs clés</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{metric.title}</span>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <span className={`text-sm ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Écritures comptables</h2>
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
              Exporter FEC
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Pièce</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Compte</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Libellé</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Débit</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Crédit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-sm">31/03/2026</td>
                <td className="px-4 py-3 text-sm">FAC-4829</td>
                <td className="px-4 py-3 text-sm">411000</td>
                <td className="px-4 py-3 text-sm">Client ABC - Facture</td>
                <td className="px-4 py-3 text-sm text-right">-</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">4 500,00 €</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-sm">31/03/2026</td>
                <td className="px-4 py-3 text-sm">ACH-001</td>
                <td className="px-4 py-3 text-sm">401000</td>
                <td className="px-4 py-3 text-sm">Fournisseur XYZ</td>
                <td className="px-4 py-3 text-sm text-right text-red-600">89,99 €</td>
                <td className="px-4 py-3 text-sm text-right">-</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3 text-sm">30/03/2026</td>
                <td className="px-4 py-3 text-sm">SAL-001</td>
                <td className="px-4 py-3 text-sm">421000</td>
                <td className="px-4 py-3 text-sm">Salaires Mars 2026</td>
                <td className="px-4 py-3 text-sm text-right text-red-600">12 500,00 €</td>
                <td className="px-4 py-3 text-sm text-right">-</td>
              </tr>
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
            <h2 className="text-xl font-semibold mb-2">Exporter le grand livre</h2>
            <p className="text-muted-foreground">
              Téléchargez les écritures au format FEC pour votre comptabilité.
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
