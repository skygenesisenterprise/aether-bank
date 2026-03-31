"use client";

import { Button } from "@/components/ui/button";
import {
  FileCheck,
  Plus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const statuses = [
  {
    title: "En attente",
    description: "Prélèvement en attente de validation.",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  {
    title: "Validé",
    description: "Prélèvement validé et programmé.",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  {
    title: "Exécuté",
    description: "Prélèvement effectuée avec succès.",
    color: "bg-green-100 text-green-700",
    icon: FileCheck,
  },
  {
    title: "Rejeté",
    description: "Prélèvement rejeté pour cause.",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
];

const features = [
  {
    title: "Gestion des mandats",
    description: "Créez et gérez les autorisations de prélèvement.",
    icon: FileCheck,
  },
  {
    title: "Programmation",
    description: "Planifiez des prélèvements ponctuels ou récurrents.",
    icon: Clock,
  },
  {
    title: "Suivi en temps réel",
    description: "Visualisez le statut de chaque prélèvement.",
    icon: RefreshCw,
  },
  {
    title: "Rejet automatique",
    description: "Gérez automatiquement les rejets et refus.",
    icon: AlertCircle,
  },
];

const mockDirectDebits = [
  {
    id: "DD-001",
    creditor: "EDF France",
    debtor: "Jean Dupont",
    amount: 145.0,
    mandate: "MAND-001",
    status: "executed",
    date: "2026-03-31",
  },
  {
    id: "DD-002",
    creditor: "Orange",
    debtor: "Marie Martin",
    amount: 49.99,
    mandate: "MAND-002",
    status: "pending",
    date: "2026-04-01",
  },
  {
    id: "DD-003",
    creditor: "AXA Assurance",
    debtor: "Pierre Durant",
    amount: 89.0,
    mandate: "MAND-003",
    status: "rejected",
    date: "2026-03-30",
  },
];

export default function PlatformDirectDebitsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <FileCheck className="w-4 h-4" />
          Platform Direct Debits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Prélvements <span className="text-primary">automatiques</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gérez les mandates de prélèvement et les opérations de débit automatique.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Prélvements récents</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau prélèvement
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Créancier</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Débiteur</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Mandat</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockDirectDebits.map((dd) => (
                <tr key={dd.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{dd.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{dd.creditor}</td>
                  <td className="px-4 py-3 text-sm">{dd.debtor}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    {dd.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-xs">{dd.mandate}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        dd.status === "executed"
                          ? "bg-green-100 text-green-700"
                          : dd.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dd.status === "executed" && "Exécuté"}
                      {dd.status === "pending" && "En attente"}
                      {dd.status === "rejected" && "Rejeté"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{dd.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Statuts des prélvements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statuses.map((status, index) => {
            const Icon = status.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{status.title}</h3>
                  <p className="text-sm text-muted-foreground">{status.description}</p>
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
            <h2 className="text-xl font-semibold mb-2">Créer un prélèvement</h2>
            <p className="text-muted-foreground">Initiez un nouveau prélèvement automatique.</p>
          </div>
          <Button>
            Nouveau prélèvement <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
