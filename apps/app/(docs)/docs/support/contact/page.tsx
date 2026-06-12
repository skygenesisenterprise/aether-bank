"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Clock,
  ChevronRight,
  Copy,
  CheckCircle,
  Globe,
  Send,
  MessageSquare,
  Ticket,
  Users,
  HeadphonesIcon,
  Zap,
} from "lucide-react";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
      {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}

const tableOfContents = [
  { title: "Introduction", href: "#introduction" },
  { title: "Canaux de contact", href: "#channels" },
  { title: "Bureaux", href: "#offices" },
  { title: "Support API", href: "#api" },
  { title: "Temps de réponse", href: "#response" },
];

const contactMethods = [
  {
    title: "Email",
    description: "Pour les demandes détaillées, pièces jointes ou demandes officielles",
    icon: Mail,
    availability: "Réponse sous 24h",
    contact: "support@aether.bank",
    bestFor: "Questions techniques, réclamations",
  },
  {
    title: "Chat en direct",
    description: "Discutez en temps réel avec notre équipe de support",
    icon: MessageCircle,
    availability: "Disponible 7j/7, 24h/24",
    contact: "Via l'application mobile",
    bestFor: "Assistance rapide, questions simples",
  },
  {
    title: "Téléphone",
    description: "Pour les urgences et assistance personnalisée",
    icon: Phone,
    availability: "Lun-Ven 9h00-18h00",
    contact: "+33 1 23 45 67 89",
    bestFor: "Urgences, problèmes de compte",
  },
  {
    title: "API Support",
    description: "Pour les développeurs ayant besoin d'assistance technique",
    icon: Ticket,
    availability: "Ticket prioritaire",
    contact: "/v1/support/tickets",
    bestFor: "Intégration API, bugs techniques",
  },
];

const officeLocations = [
  {
    city: "Paris",
    address: "123 Rue de la Banque, 75002 Paris, France",
    phone: "+33 1 23 45 67 89",
    hours: "Lundi - Vendredi: 9h00 - 18h00",
    type: "Siège",
  },
  {
    city: "Lyon",
    address: "45 Avenue de la République, 69001 Lyon, France",
    phone: "+33 4 56 78 90 12",
    hours: "Lundi - Vendredi: 9h00 - 17h00",
    type: "Bureau régional",
  },
];

const responseTimes = [
  { priority: "Critique", email: "4 heures", chat: "Immédiat", phone: "Immédiat" },
  { priority: "Haute", email: "8 heures", chat: "Immédiat", phone: "Immédiat" },
  { priority: "Normale", email: "24 heures", chat: "15 minutes", phone: "5 minutes" },
  { priority: "Basse", email: "48 heures", chat: "1 heure", phone: "30 minutes" },
];

const endpoints = [
  {
    method: "POST",
    path: "/v1/support/tickets",
    description: "Crée un ticket de support",
  },
  {
    method: "GET",
    path: "/v1/support/tickets/:id",
    description: "Récupère le statut d'un ticket",
  },
  {
    method: "POST",
    path: "/v1/support/tickets/:id/messages",
    description: "Ajoute un message à un ticket",
  },
];

export default function SupportContactPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <MessageCircle className="w-4 h-4" />
          Support
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Nous <span className="text-primary">contacter</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Notre équipe de support est disponible pour vous aider 7 jours sur 7. Choisissez le canal
          qui vous convient le mieux.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Table des matières</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tableOfContents.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {index + 1}
              </span>
              <span className="font-medium">{item.title}</span>
              <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>

      <section id="introduction" className="space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Introduction</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              Nous offrons plusieurs canaux de support pour répondre à tous vos besoins. Que vous
              soyez un particulier ayant une question sur votre compte ou un développeur intégrant
              nos APIs, notre équipe est là pour vous accompagner.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Pour les questions techniques liées à l'intégration de nos APIs, nous proposons un
              support dédié avec des temps de réponse garantis et des ingénieurs spécialisés.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="channels" className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Canaux de contact</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium">{method.contact}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Disponibilité:</span>
                      <span className="text-primary">{method.availability}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Idéal pour:</span>
                      <span className="text-muted-foreground">{method.bestFor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="offices" className="space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Nos bureaux</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {officeLocations.map((office, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{office.city}</CardTitle>
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                    {office.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground">{office.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  <span className="text-sm">{office.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground">{office.hours}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="response" className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Temps de réponse</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Temps de réponse par priorité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Priorité</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Chat</th>
                    <th className="text-left py-3 px-4 font-semibold">Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                  {responseTimes.map((time, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-medium">{time.priority}</td>
                      <td className="py-3 px-4 text-muted-foreground">{time.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{time.chat}</td>
                      <td className="py-3 px-4 text-muted-foreground">{time.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="api" className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Support API</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Créer un ticket de support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Créez un ticket de support programmatiquement pour un suivi optimal de vos demandes
              techniques.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Problème d'intégration API",
    "category": "technical",
    "priority": "high",
    "message": "Décrivez votre problème en détail..."
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Problème d'intégration API",
    "category": "technical",
    "priority": "high",
    "message": "Décrivez votre problème en détail..."
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "tkt_xyz789",
  "subject": "Problème d'intégration API",
  "category": "technical",
  "priority": "high",
  "status": "open",
  "created_at": "2026-03-31T10:00:00Z",
  "ticket_number": "TKT-2026-00789",
  "estimated_response": "4 hours"
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Envoyez-nous un message</h2>
            <p className="text-muted-foreground">
              Remplissez le formulaire et nous vous répondrons sous 24h.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/quick-start">
                Documentation API <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/support/faq">FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
