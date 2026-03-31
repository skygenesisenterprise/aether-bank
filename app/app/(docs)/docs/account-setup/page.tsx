"use client";

import Link from "next/link";
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
  FileText,
  Users,
  Clock,
  Globe,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kycSteps = [
  {
    title: "Informations personnelles",
    description:
      "Remplissez vos informations personnelles : nom, prénom, adresse email et numéro de téléphone français.",
    icon: User,
    details: "Email vérifié + numéro手机验证",
  },
  {
    title: "Vérification d'identité",
    description:
      "Téléchargez une pièce d'identité valide (passeport, carte nationale d'identité ou permis de conduire).",
    icon: Shield,
    details: "Upload + selfie vidéo automatisé",
  },
  {
    title: "Justificatif de domicile",
    description:
      "Fournissez un justificatif de domicile de moins de 3 mois (facture eau, électricité,互联网 ou opérateur mobile).",
    icon: FileText,
    details: "Facture ou avis d'imposition",
  },
  {
    title: "Validation finale",
    description: "Notre équipe vérifie vos documents sous 24h et valide votre compte.",
    icon: CheckCircle,
    details: "Activation immédiate après validation",
  },
];

const accountTypes = [
  {
    title: "Compte Courant",
    description: "Pour les dépenses quotidiennes avec carte débit immédiat.",
    icon: Wallet,
    details: "IBAN FR, virements SEPA instantanés",
    popular: true,
  },
  {
    title: "Compte Épargne",
    description: "Pour constituer votre épargne avec taux compétitifs.",
    icon: CreditCard,
    details: "Versement libre, retrait illimité",
  },
  {
    title: "Compte Joint",
    description: "Pour gérer un compte à plusieurs avec permissions configurables.",
    icon: Users,
    details: "Jusqu'à 4 titulaires",
  },
  {
    title: "Compte Entreprise",
    description: "Pour les professionnels et entreprises avec gestion d'équipe.",
    icon: Building2,
    details: "Multi-utilisateurs, API complète",
  },
];

const securityOptions = [
  {
    title: "Authentification à deux facteurs (2FA)",
    description:
      "Sécurisez votre compte avec une authentification à deux facteurs par SMS ou application authenticator (TOTP).",
    icon: Shield,
  },
  {
    title: "Limites de transaction",
    description:
      "Définissez des limites quotidiennes et mensuelles pour vos cartes et virements depuis votre dashboard.",
    icon: Settings,
  },
  {
    title: "Alertes en temps réel",
    description:
      "Recevez des notifications push, email ou SMS pour chaque transaction et événement.",
    icon: Bell,
  },
  {
    title: "Sessions sécurisées",
    description: "Gérez vos sessions actives, déconnexion à distance et historique des connexions.",
    icon: Lock,
  },
];

const requiredDocuments = [
  {
    title: "Pièce d'identité",
    items: [
      "Passeport français ou étranger",
      "Carte nationale d'identité (CNI)",
      "Permis de conduire français",
    ],
    icon: User,
  },
  {
    title: "Justificatif de domicile",
    items: [
      "Facture de moins de 3 mois (eau, électricité, gaz)",
      "Avis d'imposition",
      "Contrat de location",
    ],
    icon: FileText,
  },
  {
    title: "Informations additionnelles",
    items: ["Numéro de téléphone français vérifié", "Adresse email vérifiée"],
    icon: Mail,
  },
];

const timeline = [
  { stage: "Soumission documents", duration: "~5 min", status: "completed" },
  { stage: "Vérification automatique", duration: "~2 min", status: "completed" },
  { stage: "Revue manuelle (si nécessaire)", duration: "≤24h", status: "pending" },
  { stage: "Activation du compte", duration: "Immédiat", status: "pending" },
];

export default function AccountSetupPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Settings className="w-4 h-4" />
          Configuration de compte
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Configurez votre <span className="text-primary">compte Aether Bank</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Suivez ce guide étape par étape pour configurer votre compte et commencer à utiliser nos
          services bancaires. Processus entièrement numérique.
        </p>
      </section>

      {/* Timeline Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Délai de création</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                item.status === "completed"
                  ? "bg-green-50 border-green-200 dark:bg-green-950"
                  : "bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {item.status === "completed" ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs font-medium">{item.duration}</span>
              </div>
              <p className="text-sm font-medium">{item.stage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KYC Process */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Processus KYC (Know Your Customer)</h2>
        </div>
        <p className="text-muted-foreground">
          Pour respecter les réglementations bancaires européennes (directive AML/KYC), nous devons
          vérifier votre identité. Voici les étapes à suivre :
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {kycSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <span className="text-xs text-muted-foreground">Étape {index + 1}/4</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <span className="text-xs bg-muted px-2 py-1 rounded">{step.details}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Account Types */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Types de comptes disponibles</h2>
        </div>
        <p className="text-muted-foreground">
          Selon votre profil, vous pouvez ouvrir différents types de comptes :
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {accountTypes.map((account, index) => {
            const Icon = account.icon;
            return (
              <Card
                key={index}
                className={account.popular ? "border-primary ring-1 ring-primary" : ""}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{account.title}</h3>
                        {account.popular && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Populaire
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{account.description}</p>
                      <span className="text-xs text-muted-foreground">{account.details}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Security Settings */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Paramètres de sécurité</h2>
        </div>
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

      {/* Required Documents */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Documents requis</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {requiredDocuments.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {doc.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* API Access */}
      <section className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Accès API</h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  Une fois votre compte validé, générez vos clés API depuis votre dashboard
                  développeur pour intégrer nos services bancaires.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs/quick-start">
                  Guide API
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Conformité réglementaire</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Aether Bank est une institution financière agréée par l'ACPR (Autorité de Contrôle
              Prudentiel et de Résolution). Nous respectons les directives européennes :
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>PSD2</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>RGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>AML/KYC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>DSA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
