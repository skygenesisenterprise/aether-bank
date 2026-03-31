"use client";

import { Button } from "@/components/ui/button";
import {
  User,
  Shield,
  CreditCard,
  Wallet,
  Building2,
  CheckCircle,
  ArrowRight,
  Lock,
  Eye,
  Bell,
  Key,
  Smartphone,
  Mail,
  Settings,
} from "lucide-react";

const steps = [
  {
    title: "Informations personnelles",
    description:
      "Remplissez vos informations personnelles : nom, prénom, adresse email et numéro de téléphone.",
    icon: User,
  },
  {
    title: "Vérification d'identité",
    description:
      "Téléchargez une pièce d'identité valide (passeport, carte nationale d'identité ou permis de conduire).",
    icon: Shield,
  },
  {
    title: "Justificatif de domicile",
    description:
      " Fournissez un justificatif de domicile de moins de 3 mois (facture d'électricité, eau,，互联网 provider).",
    icon: FileText,
  },
  {
    title: "Validation finale",
    description: "Notre équipe vérifie vos documents sous 24h et valide votre compte.",
    icon: CheckCircle,
  },
];

const features = [
  {
    title: "Comptes multiples",
    description: "Gérez plusieurs types de comptes : courant, épargne, joint ou entreprise.",
    icon: Wallet,
  },
  {
    title: "Cartes bancaires",
    description: "Commandez des cartes physiques et virtuelles avec des limites personnalisées.",
    icon: CreditCard,
  },
  {
    title: "Virements SEPA",
    description: "Effectuez des virements SEPA instantanés 24h/24 et 7j/7.",
    icon: ArrowRight,
  },
  {
    title: "Gestion d'équipe",
    description: "Invitez des collaborateurs et définissez des rôles et permissions.",
    icon: Users,
  },
];

const securityOptions = [
  {
    title: "Authentification à deux facteurs (2FA)",
    description:
      "Sécurisez votre compte avec une authentification à deux facteurs par SMS ou application authenticator.",
    icon: Shield,
  },
  {
    title: "Limites de transaction",
    description: "Définissez des limites quotidiennes et mensuelles pour vos cartes et virements.",
    icon: Settings,
  },
  {
    title: "Alertes en temps réel",
    description: "Recevez des notifications push ou par email pour chaque transaction.",
    icon: Bell,
  },
  {
    title: "Sessions sécurisées",
    description: "Gérez vos sessions actives et déconnexion à distance depuis votre dashboard.",
    icon: Lock,
  },
];

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
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function Users({ className }: { className?: string }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function AccountSetupPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Settings className="w-4 h-4" />
          Account Setup
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Configurez votre <span className="text-primary">compte</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Suivez ce guide étape par étape pour configurer votre compte Aether Bank et commencer à
          utiliser nos services.
        </p>
      </section>

      {/* KYC Process */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Processus KYC (Know Your Customer)</h2>
        <p className="text-muted-foreground">
          Pour respecter les réglementations bancaires européennes, nous devons vérifier votre
          identité. Voici les étapes à suivre :
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Account Types */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Types de comptes disponibles</h2>
        <p className="text-muted-foreground">
          Selon votre profil, vous pouvez ouvrir différents types de comptes :
        </p>
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

      {/* Security Settings */}
      <section className="space-y-6">
        <h2 className="text-2x1 font-bold">Paramètres de sécurité</h2>
        <p className="text-muted-foreground">
          Protégez votre compte avec nos options de sécurité avancées :
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {securityOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Requirements */}
      <section className="rounded-xl bg-muted/50 p-8">
        <h2 className="text-xl font-semibold mb-4">Documents requis</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Pièce d'identité valide (passeport, CNI, permis de conduire)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Justificatif de domicile de moins de 3 mois
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Numéro de téléphone mobile valide
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Adresse email valide
          </li>
        </ul>
      </section>
    </div>
  );
}
