"use client";

import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Smartphone,
  Wifi,
  Lock,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  RefreshCw,
  Building,
  Terminal,
  Code,
  ExternalLink,
  Plus,
  Eye,
  Power,
} from "lucide-react";

const cardTypes = [
  {
    title: "Carte physique",
    description:
      "Carte bancaire physique avec paiement sans contact. Idéale pour les retraits aux DAB et paiements en magasin.",
    icon: CreditCard,
    features: [
      "Paiement en ligne et en magasin",
      "Retraits aux DAB",
      "Assurance voyage incluse",
      "Plafond personnalisable",
    ],
  },
  {
    title: "Carte virtuelle",
    description:
      "Carte numérique pour vos achats en ligne en toute sécurité. Générez-en autant que nécessaire.",
    icon: Smartphone,
    features: [
      "Génération instantanée",
      "Limites personnalisables",
      "Désactivation immédiate",
      "Masquage du numéro",
    ],
  },
  {
    title: "Carte temporaire",
    description:
      "Carte à usage unique pour les paiements ponctuels. Parfaite pour les freelancers et indépendants.",
    icon: Clock,
    features: [
      "Validité limitée (24h-30 jours)",
      "Montant fixe ou plafond",
      "Auto-expiration",
      "Sans engagement",
    ],
  },
  {
    title: "Carte Business",
    description: "Carte professionnelle avec gestion d'équipe et suivi des dépenses en temps réel.",
    icon: Building,
    features: [
      "Limites personnalisées par utilisateur",
      "Historique partagé",
      "Export comptable (CSV/JSON)",
      "Cartes virtuelles illimitées",
    ],
  },
];

const features = [
  {
    title: "Paiement sans contact",
    description:
      "Payez rapidement avec la technologie NFC sur tous les terminaux compatibles. Limite: 50€ par transaction.",
    icon: Wifi,
  },
  {
    title: "Contrôle des dépenses",
    description:
      "Définissez des limites quotidiennes, hebdomadaires ou mensuelles par carte ou par utilisateur.",
    icon: DollarSign,
  },
  {
    title: "Alertes en temps réel",
    description:
      "Recevez une notification push et email à chaque transaction. Configurable par montant et type d'opération.",
    icon: Shield,
  },
  {
    title: "Cartes virtuelles illimitées",
    description:
      "Créez autant de cartes virtuelles que nécessaire. Idéal pour isoler les abonnements et paiements récurrents.",
    icon: RefreshCw,
  },
];

const comparison = [
  {
    feature: "Paiement en magasin",
    physique: true,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
  {
    feature: "Paiement en ligne",
    physique: true,
    virtuelle: true,
    temporaire: true,
    business: true,
  },
  { feature: "Retraits DAB", physique: true, virtuelle: false, temporaire: false, business: true },
  {
    feature: "Génération instantanée",
    physique: false,
    virtuelle: true,
    temporaire: true,
    business: true,
  },
  {
    feature: "Limites personnalisables",
    physique: true,
    virtuelle: true,
    temporaire: true,
    business: true,
  },
  {
    feature: "Assurance voyage",
    physique: true,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
  {
    feature: "Gestion d'équipe",
    physique: false,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
  {
    feature: "Export comptable",
    physique: false,
    virtuelle: false,
    temporaire: false,
    business: true,
  },
];

const apiExamples = [
  {
    title: "Créer une carte virtuelle",
    code: `POST /api/v1/cards
{
  "type": "virtual",
  "currency": "EUR",
  "limits": {
    "daily": 1000,
    "monthly": 5000
  },
  "metadata": {
    "purpose": "subscription_management"
  }
}`,
  },
  {
    title: "Consulter le solde d'une carte",
    code: `GET /api/v1/cards/:id/balance

Response:
{
  "card_id": "card_abc123",
  "available": 450.00,
  "blocked": 50.00,
  "currency": "EUR"
}`,
  },
  {
    title: "Bloquer une carte",
    code: `POST /api/v1/cards/:id/block
{
  "reason": "lost",
  "notify_holder": true
}`,
  },
];

export default function CardsPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <CreditCard className="w-4 h-4" />
          API & Produits
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Cartes <span className="text-primary">bancaires</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Solution de paiement moderne et flexible. Cartes physiques, virtuelles ou temporaires -
          contrôlez vos dépenses en temps réel avec notre API open-source.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg">
            <Terminal className="w-4 h-4 mr-2" />
            Tester l'API
          </Button>
          <Button variant="outline" size="lg">
            <Code className="w-4 h-4 mr-2" />
            Voir la documentation
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Types de cartes</h2>
          <span className="text-sm text-muted-foreground">4 options disponibles</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {cardTypes.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <ul className="space-y-2 mt-auto">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
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
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
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
        <h2 className="text-2xl font-bold">Comparatif des cartes</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Fonctionnalité</th>
                <th className="text-center p-4 font-semibold">Physique</th>
                <th className="text-center p-4 font-semibold">Virtuelle</th>
                <th className="text-center p-4 font-semibold">Temporaire</th>
                <th className="text-center p-4 font-semibold">Business</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-4">{row.feature}</td>
                  <td className="text-center p-4">
                    {row.physique ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="text-center p-4">
                    {row.virtuelle ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="text-center p-4">
                    {row.temporaire ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="text-center p-4">
                    {row.business ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Exemples d'utilisation API</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Authentification OAuth 2.0
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {apiExamples.map((example, index) => (
            <div key={index} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="font-medium text-sm">{example.title}</span>
                <Code className="w-4 h-4 text-muted-foreground" />
              </div>
              <pre className="p-4 text-xs overflow-x-auto bg-muted/20">
                <code className="text-muted-foreground">{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            Voir tous les endpoints
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Prêt à commencer ?</h2>
            <p className="text-muted-foreground max-w-md">
              Créez votre premier compte développeur et recevez vos clés API en moins de 5 minutes.
              Environnement de test gratuit disponible.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Créer un compte
            </Button>
            <Button variant="outline" size="lg">
              Voir les tarifs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
