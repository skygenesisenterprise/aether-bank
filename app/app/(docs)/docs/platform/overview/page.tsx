"use client";

import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Shield,
  Settings,
  Globe,
  Clock,
} from "lucide-react";

const features = [
  {
    title: "Tableau de bord centralisé",
    description: "Visualisez l'ensemble de vos opérations bancaires depuis une interface unique.",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion des comptes",
    description: "Créez et gérez plusieurs comptes bancaires avec IBAN européen.",
    icon: Wallet,
  },
  {
    title: "Gestion des cartes",
    description: "Commandez des cartes physiques et virtuelles pour votre équipe.",
    icon: CreditCard,
  },
  {
    title: "Gestion des clients",
    description: "Ajoutez et gérez les accès de vos clients ou collaborateurs.",
    icon: Users,
  },
  {
    title: "Analytique avancée",
    description: "Suivez vos performances financières avec des tableaux de bord détaillés.",
    icon: BarChart3,
  },
  {
    title: "Sécurité renforcée",
    description: "Protégez vos opérations avec l'authentification forte et le chiffrement.",
    icon: Shield,
  },
];

const sections = [
  {
    title: "Gestion des comptes",
    description:
      "Créez des comptes courants, professionnels ou entreprise. Chaque compte dispose d'un IBAN français valide pour les virements SEPA.",
    links: [
      { title: "Gestion des comptes", href: "/docs/platform/accounts" },
      { title: "IBAN & BIC", href: "/docs/platform/iban" },
    ],
  },
  {
    title: "Moyen de paiement",
    description:
      "Emittez des cartes physiques et virtuelles pour vos équipes. Définissez des limites et контролируйте les dépenses.",
    links: [
      { title: "Cartes bancaires", href: "/docs/platform/cards" },
      { title: "Virements", href: "/docs/platform/transactions" },
      { title: "Prélèvements", href: "/docs/platform/direct-debits" },
    ],
  },
  {
    title: "Gestion financière",
    description:
      "Suivez vos opérations, gérez votre comptabilité et générez des rapports pour votre expert-comptable.",
    links: [
      { title: "Transactions", href: "/docs/platform/transactions" },
      { title: "Grand livre", href: "/docs/platform/ledger" },
      { title: "Facturation", href: "/docs/platform/invoices" },
      { title: "Analytique", href: "/docs/platform/analytics" },
    ],
  },
  {
    title: "Sécurité & Conformité",
    description:
      "Assurez la sécurité de vos opérations et respectez les réglementations bancaires européennes.",
    links: [
      { title: "Sécurité", href: "/docs/platform/security" },
      { title: "Chiffrement", href: "/docs/platform/encryption" },
      { title: "Conformité", href: "/docs/platform/compliance" },
    ],
  },
];

export default function PlatformOverviewPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <LayoutDashboard className="w-4 h-4" />
          Platform Dashboard
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Tableau de bord <span className="text-primary">Administrateur</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Le panneau d'administration complet pour gérer votre plateforme bancaire. Créez des
          comptes, émettez des cartes, et pilotez vos opérations.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Sections du dashboard</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <p className="text-muted-foreground mb-4">{section.description}</p>
              <ul className="space-y-2 mt-auto">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ArrowRight className="w-3 h-3" />
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Accéder au dashboard</h2>
            <p className="text-muted-foreground">
              Connectez-vous à votre espace administrateur pour commencer à gérer votre plateforme.
            </p>
          </div>
          <Button>
            Se connecter <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
