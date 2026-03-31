"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Terminal,
  Key,
  Shield,
  Globe,
  Code,
  Copy,
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "Créer un compte",
    description:
      "Inscrivez-vous sur Aether Bank en quelques minutes. Vous n'avez besoin que d'une pièce d'identité valide.",
    icon: User,
  },
  {
    title: "Vérifier votre identité",
    description: "Complétez le processus KYC (Know Your Customer) pour activer votre compte fully.",
    icon: Shield,
  },
  {
    title: "Configurez votre compte",
    description: "Ajoutez vos informations bancaires et configurez vos préférences de sécurité.",
    icon: Settings,
  },
  {
    title: "Commencez à integrator",
    description:
      "Utilisez notre API REST pour intégrer les services bancaires dans votre application.",
    icon: Code,
  },
];

const features = [
  {
    title: "API REST moderne",
    description: "Interface de programmation complète avec documentation Swagger.",
    icon: Globe,
  },
  {
    title: "Clés API sécurisées",
    description: "Générez et gérez vos clés API depuis votre dashboard.",
    icon: Key,
  },
  {
    title: "Webhooks en temps réel",
    description: "Recevez des notifications instantanées pour tous vos événements.",
    icon: Bell,
  },
  {
    title: "Sandbox de test",
    description: "Testez vos intégrations dans un environnement isolé.",
    icon: TestTube,
  },
];

const codeExample = `curl -X POST https://bank.skygenesisenterprise.com/api/v1/accounts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "current",
    "currency": "EUR",
    "holder_name": "Entreprise ABC"
  }'`;

function User({ className }: { className?: string }) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function Settings({ className }: { className?: string }) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Bell({ className }: { className?: string }) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function TestTube({ className }: { className?: string }) {
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
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}

export default function QuickStartPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Terminal className="w-4 h-4" />
          Quick Start
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Commencez en <span className="text-primary">5 minutes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Suivez ce guide pour configurer votre compte et effectuer votre première requête API en
          quelques minutes.
        </p>
      </section>

      {/* Steps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Les étapes à suivre</h2>
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

      {/* API Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Premier appel API</h2>
        <p className="text-muted-foreground">
          Voici un exemple pour créer votre premier compte bancaire via l&apos;API :
        </p>
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={copyToClipboard}
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Ce que vous offrent nos services</h2>
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

      {/* CTA */}
      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Prêt à commencer ?</h2>
            <p className="text-muted-foreground">
              Créez votre compte développeur et obtenir vos clés API.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/register">
                Créer un compte
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/api">Voir la documentation API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
