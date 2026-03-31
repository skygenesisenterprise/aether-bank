"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  ArrowRight,
  Download,
} from "lucide-react";

const metrics = [
  {
    title: "Revenus totaux",
    value: "127 450 €",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Dépenses",
    value: "89 320 €",
    change: "-5.2%",
    positive: true,
    icon: TrendingDown,
  },
  {
    title: "Nouveaux clients",
    value: "156",
    change: "+8.3%",
    positive: true,
    icon: Users,
  },
  {
    title: "Transactions",
    value: "1 247",
    change: "+15.7%",
    positive: true,
    icon: CreditCard,
  },
];

const chartData = [
  { month: "Jan", revenues: 42000, expenses: 28000 },
  { month: "Fév", revenues: 38000, expenses: 25000 },
  { month: "Mar", revenues: 51000, expenses: 32000 },
  { month: "Avr", revenues: 47000, expenses: 29000 },
  { month: "Mai", revenues: 55000, expenses: 35000 },
  { month: "Juin", revenues: 62000, expenses: 38000 },
];

const features = [
  {
    title: "Tableaux de bord",
    description: "Visualisez vos performances avec des graphiques détaillés.",
    icon: BarChart3,
  },
  {
    title: "Rapports personnalisés",
    description: "Créez des rapports adaptés à vos besoins.",
    icon: Download,
  },
  {
    title: "Prévisions",
    description: "Anticipez vos revenus et dépenses avec l'IA.",
    icon: TrendingUp,
  },
  {
    title: "Comparaisons",
    description: "Comparez vos performances sur différentes périodes.",
    icon: TrendingDown,
  },
];

export default function PlatformAnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <BarChart3 className="w-4 h-4" />
          Platform Analytics
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Tableau de bord <span className="text-primary">analytique</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Analysez vos performances financières etSuivez l'évolution de votre plateforme.
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
                  {metric.change} ce mois
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Revenus vs Dépenses</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm text-muted-foreground">{data.month}</div>
                <div className="flex-1 flex gap-2">
                  <div
                    className="h-8 bg-green-500 rounded"
                    style={{ width: `${(data.revenues / 70000) * 100}%` }}
                  />
                </div>
                <div className="w-24 text-sm text-right">{data.revenues.toLocaleString()} €</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span className="text-sm text-muted-foreground">Revenus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-sm text-muted-foreground">Dépenses</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités analytiques</h2>
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
            <h2 className="text-xl font-semibold mb-2">Télécharger les rapports</h2>
            <p className="text-muted-foreground">
              Exportez vos données analytiques en PDF ou Excel.
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
