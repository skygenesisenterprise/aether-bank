"use client";

import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Shield, Scale } from "lucide-react";

const legalDocuments = [
  {
    title: "Conditions générales d'utilisation",
    description: "Les conditions d'utilisation de nos services.",
    icon: FileText,
  },
  {
    title: "Politique de confidentialité",
    description: "Comment nous protégeons vos données personnelles.",
    icon: Shield,
  },
  {
    title: "Mentions légales",
    description: "Informations légales sur Aether Bank.",
    icon: Scale,
  },
  {
    title: "Tarification",
    description: "Nos tarifs et frais bancaires.",
    icon: FileText,
  },
];

const regulations = [
  {
    title: "ACPR",
    description: "Aether Bank est agréé par l'Autorité de Contrôle Prudentiel et de Résolution.",
  },
  {
    title: "FGDR",
    description:
      "Vos dépôts sont garantis jusqu'à 100 000€ par le Fonds de Garantie des Dépôts et de Résolution.",
  },
  {
    title: "RGPD",
    description: "Nous respectons le Règlement Général sur la Protection des Données.",
  },
  {
    title: "PSD2",
    description: "Nous complyons à la directive européenne sur les services de paiement.",
  },
];

export default function SupportLegalPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <FileText className="w-4 h-4" />
          Support
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Mentions <span className="text-primary">légales</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tous les documents légaux relatifs à nos services.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Documents légaux</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <button
                key={index}
                className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Réglementation</h2>
        <p className="text-muted-foreground">
          Aether Bank est une institution de paiement agréée et réglementée :
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {regulations.map((reg, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card"
            >
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{reg.title}</h3>
                <p className="text-sm text-muted-foreground">{reg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Établissement</h2>
            <p className="text-muted-foreground">
              Aether Bank - SAS au capital de 1 000 000 € - 123 Rue de la Banque, 75002 Paris
            </p>
          </div>
          <Button>
            Télécharger tous les documents <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
