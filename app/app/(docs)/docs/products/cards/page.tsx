"use client";

import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Smartphone,
  Globe,
  Lock,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  RefreshCw,
} from "lucide-react";

const cardTypes = [
  {
    title: "Carte physique",
    description: "Carte bancaire physique avec paiement sans contact.",
    icon: CreditCard,
    features: ["Paiement en ligne et en magasin", "Retraits aux DAB", "Assurance voyage incluse"],
  },
  {
    title: "Carte virtuelle",
    description: "Carte numérique pour vos achats en ligne en toute sécurité.",
    icon: Smartphone,
    features: ["Génération instantanée", "Limit personnalisables", "Désactivation immédiate"],
  },
  {
    title: "Carte temporaire",
    description: "Carte à usage unique pour les paiements ponctuels.",
    icon: Clock,
    features: ["Validité limitée", "Montant fixe", "Idéale pour les freelancers"],
  },
  {
    title: "Carte бизнес",
    description: "Carte professionnelle avec gestion d'équipe.",
    icon: Building,
    features: ["Limites personnalisées", "Historique partagé", "Export comptable"],
  },
];

const features = [
  {
    title: "Paiement sans contact",
    description: "Payez rapidement avec la technologie NFC sur tous les terminaux compatibles.",
    icon: Globe,
  },
  {
    title: "Contrôle des dépenses",
    description: "Définissez des limites quotidiennes, hebdomadaires ou mensuelles.",
    icon: DollarSign,
  },
  {
    title: "Alertes en temps réel",
    description: "Recevez une notification à chaque transaction sur votre mobile.",
    icon: Shield,
  },
  {
    title: "Cartes virtuelles illimitées",
    description: "Créez autant de cartes virtuelles que nécessaire pour vos paiements en ligne.",
    icon: RefreshCw,
  },
];

function Building({ className }: { className?: string }) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export default function CardsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <CreditCard className="w-4 h-4" />
          Cards
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Cartes <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos cartes bancaires adaptées à tous vos besoins : physiques, virtuelles ou
          temporaires.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de cartes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cardTypes.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <ul className="space-y-2 mt-auto">
                  {card.features.map((feature, i) => (
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
        <h2 className="text-2xl font-bold">Fonctionnalités avancées</h2>
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
            <h2 className="text-xl font-semibold mb-2">Commander une carte</h2>
            <p className="text-muted-foreground">
              Choisissez votre carte et recevez-la sous 3 à 5 jours ouvrés.
            </p>
          </div>
          <Button>
            Commander <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
