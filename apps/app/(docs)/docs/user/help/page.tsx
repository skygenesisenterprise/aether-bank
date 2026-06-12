"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ChevronRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  Globe,
  BookOpen,
  Search,
  ArrowRight,
  Clock,
  Zap,
  ExternalLink,
  Ticket,
  MessageSquare,
  FileText,
  CreditCard,
  Shield,
  Code,
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
  { title: "Canaux de support", href: "#channels" },
  { title: "FAQ", href: "#faq" },
  { title: "API Support", href: "#api" },
  { title: "Ressources", href: "#resources" },
];

const supportChannels = [
  {
    title: "Email",
    description: "Pour les demandes détaillées ou les pièces jointes",
    icon: Mail,
    availability: "Réponse sous 24h",
    contact: "support@aether.bank",
    response: "24 heures",
  },
  {
    title: "Chat en direct",
    description: "Discutez en temps réel avec notre équipe",
    icon: MessageCircle,
    availability: "Disponible 7j/7",
    contact: "Via l'application",
    response: "Immédiat",
  },
  {
    title: "Téléphone",
    description: "Pour les urgences et assistance personnalisée",
    icon: Phone,
    availability: "Lun-Ven 9h-18h",
    contact: "+33 1 23 45 67 89",
    response: "Immédiat",
  },
];

const faqCategories = [
  { title: "Compte", questions: 12, icon: Globe },
  { title: "Cartes", questions: 8, icon: CreditCard },
  { title: "Virements", questions: 10, icon: Zap },
  { title: "Sécurité", questions: 6, icon: Shield },
  { title: "API", questions: 15, icon: Code },
];

const faqs = [
  {
    category: "Compte",
    question: "Comment ouvrir un compte ?",
    answer:
      "Cliquez sur 'Ouvrir un compte' et suivez les étapes de vérification d'identité. Le processus prend environ 10 minutes. Vous aurez besoin d'une pièce d'identité valide et d'un justificatif de domicile.",
  },
  {
    category: "Compte",
    question: "Quels documents sont nécessaires ?",
    answer:
      "Vous aurez besoin d'une pièce d'identité valide (passeport, carte nationale d'identité ou permis de conduire) et d'un justificatif de domicile de moins de 3 mois.",
  },
  {
    category: "Cartes",
    question: "Comment commander une carte ?",
    answer:
      "Rendez-vous dans la section 'Mes cartes' de votre application et cliquez sur 'Commander une carte'. Choisissez entre carte physique (livraison 5-7 jours) ou carte virtuelle (instantanée).",
  },
  {
    category: "Virements",
    question: "Combien de temps prend un virement ?",
    answer:
      "Les virements SEPA prennent généralement 1 à 2 jours ouvrés. Les virements SEPA instantanés sont crédités en quelques secondes, 24h/24 et 7j/7.",
  },
  {
    category: "Sécurité",
    question: "Comment activer la 2FA ?",
    answer:
      "Allez dans 'Paramètres' > 'Sécurité' > 'Authentification à deux facteurs'. Nous recommendons l'utilisation d'une application authenticator pour une sécurité maximale.",
  },
  {
    category: "API",
    question: "Comment obtenir mes clés API ?",
    answer:
      "Connectez-vous à votre dashboard développeur. Allez dans 'Paramètres' > 'Clés API' et cliquez sur 'Générer une nouvelle clé'. Choisissez les scopes appropriés pour votre usage.",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/support/tickets",
    description: "Liste tous les tickets de support",
  },
  {
    method: "POST",
    path: "/v1/support/tickets",
    description: "Crée un nouveau ticket de support",
  },
  {
    method: "GET",
    path: "/v1/support/tickets/:id",
    description: "Récupère les détails d'un ticket",
  },
  {
    method: "POST",
    path: "/v1/support/tickets/:id/messages",
    description: "Ajoute un message à un ticket",
  },
];

const resources = [
  {
    title: "Documentation API",
    description: "Guides détaillés et références pour les développeurs",
    icon: BookOpen,
    href: "/docs/quick-start",
  },
  {
    title: "Guides pratiques",
    description: "Tutoriels pas à pas pour configurer vos services",
    icon: FileText,
    href: "/docs/products",
  },
  {
    title: "FAQ développeur",
    description: "Questions fréquentes sur l'intégration API",
    icon: HelpCircle,
    href: "/docs/support/faq",
  },
  {
    title: "Statut des services",
    description: "Vérifiez la disponibilité de nos API en temps réel",
    icon: Zap,
    href: "/status",
  },
];

export default function UserHelpPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <HelpCircle className="w-4 h-4" />
          Support
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Centre d'aide <span className="text-primary">client</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trouvez des réponses à vos questions, contactez notre équipe de support, et accédez à nos
          ressources documentaires.
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
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Introduction</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              Notre équipe de support est disponible pour vous aider 7 jours sur 7. Que vous ayez
              une question sur votre compte, besoin d'assistance technique, ou souhaitiez signaler
              un problème, nous sommes là pour vous accompagner.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Pour les développeurs, nous offrons également un support technique dédié pour
              l'intégration de nos APIs, avec des temps de réponse garantis et une documentation
              complète.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="channels" className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Canaux de support</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{channel.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-medium">{channel.contact}</p>
                    <p className="text-xs text-primary">{channel.availability}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="faq" className="space-y-6">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {faqCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{category.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.questions} questions
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-semibold mt-3 mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="api" className="space-y-6">
        <div className="flex items-center gap-3">
          <Ticket className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">API Support</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Endpoints de support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Gérez vos tickets de support programmatiquement via notre API.
            </p>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 flex-wrap p-3 rounded-lg bg-muted/50"
                >
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      endpoint.method === "GET"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {endpoint.path}
                  </code>
                  <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Créer un ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Question sur l'API des transactions",
    "category": "technical",
    "priority": "high",
    "message": "Bonjour, j'ai une question concernant..."
  }'`}
              />
              <pre className="text-sm font-mono">{`curl -X POST https://sandbox.bank.skygenesisenterprise.com/api/v1/support/tickets \\
  -H "Authorization: Bearer sk_test_abc123" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Question sur l'API des transactions",
    "category": "technical",
    "priority": "high",
    "message": "Bonjour, j'ai une question concernant..."
  }'`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "id": "tkt_xyz789",
  "subject": "Question sur l'API des transactions",
  "category": "technical",
  "priority": "high",
  "status": "open",
  "created_at": "2026-03-31T10:00:00Z",
  "estimated_response": "2 hours"
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="resources" className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Ressources</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <Link href={resource.href} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Consulter la documentation</h2>
            <p className="text-muted-foreground">
              Trouvez des guides détaillés pour utiliser tous nos services.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/quick-start">
                Documentation API <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/support/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
