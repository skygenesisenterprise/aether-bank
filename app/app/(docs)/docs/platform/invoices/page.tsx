"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Send,
  Clock,
} from "lucide-react";

const invoiceStatuses = [
  { title: "Brouillon", color: "bg-gray-100 text-gray-700" },
  { title: "Envoyée", color: "bg-blue-100 text-blue-700" },
  { title: "Payée", color: "bg-green-100 text-green-700" },
  { title: "En retard", color: "bg-red-100 text-red-700" },
];

const features = [
  {
    title: "Création de factures",
    description: "Créez des factures professionnelles en quelques clics.",
    icon: Plus,
  },
  {
    title: "Modèles personalisables",
    description: "Utilisez vos propres modèles de-facturation.",
    icon: FileText,
  },
  {
    title: "Envoi automatique",
    description: "Envoyez automatiquement les factures par email.",
    icon: Send,
  },
  {
    title: "Suivi des paiements",
    description: "Visualisez le statut de chaque facture.",
    icon: Clock,
  },
];

const mockInvoices = [
  {
    id: "FAC-4829",
    client: "Client ABC",
    date: "2026-03-31",
    dueDate: "2026-04-15",
    amount: 4500.0,
    status: "paid",
  },
  {
    id: "FAC-4830",
    client: "Société XYZ",
    date: "2026-03-30",
    dueDate: "2026-04-14",
    amount: 1250.0,
    status: "sent",
  },
  {
    id: "FAC-4831",
    client: "Entreprise DEF",
    date: "2026-03-29",
    dueDate: "2026-04-13",
    amount: 890.0,
    status: "overdue",
  },
];

export default function PlatformInvoicesPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <FileText className="w-4 h-4" />
          Platform Invoices
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Gestion de la <span className="text-primary">facturation</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Créez, envoyez et suivez vos factures depuis le dashboard administrateur.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Factures récentes</h2>
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
              Nouvelle facture
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">N° Facture</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Client</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Échéance</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm font-medium">{invoice.id}</td>
                  <td className="px-4 py-3 text-sm">{invoice.client}</td>
                  <td className="px-4 py-3 text-sm">{invoice.date}</td>
                  <td className="px-4 py-3 text-sm">{invoice.dueDate}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    {invoice.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "sent"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {invoice.status === "paid" && "Payée"}
                      {invoice.status === "sent" && "Envoyée"}
                      {invoice.status === "overdue" && "En retard"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Statuts des factures</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {invoiceStatuses.map((status, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{status.title}</h3>
              <div className={`w-3 h-3 rounded-full ${status.color} mb-2`} />
              <p className="text-sm text-muted-foreground">
                {index === 0 && "Facture en cours de création"}
                {index === 1 && "Facture envoyée au client"}
                {index === 2 && "Paiement reçu"}
                {index === 3 && "Échéance dépassée"}
              </p>
            </div>
          ))}
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
            <h2 className="text-xl font-semibold mb-2">Créer une facture</h2>
            <p className="text-muted-foreground">
              Créez une nouvelle facture pour l'un de vos clients.
            </p>
          </div>
          <Button>
            Nouvelle facture <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
