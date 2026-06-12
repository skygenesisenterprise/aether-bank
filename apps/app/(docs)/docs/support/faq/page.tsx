"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HelpCircle,
  Search,
  ChevronRight,
  ChevronDown,
  Copy,
  CheckCircle,
  Globe,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  CreditCard,
  Shield,
  Zap,
  Code,
  FileText,
  Settings,
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
  { title: "Catégories", href: "#categories" },
  { title: "Questions fréquentes", href: "#questions" },
  { title: "API", href: "#api" },
];

const faqCategories = [
  { title: "Compte", questions: 12, icon: Settings, color: "blue" },
  { title: "Cartes", questions: 8, icon: CreditCard, color: "green" },
  { title: "Virements", questions: 10, icon: Zap, color: "purple" },
  { title: "Sécurité", questions: 6, icon: Shield, color: "red" },
  { title: "API", questions: 15, icon: Code, color: "orange" },
];

const faqs = [
  {
    category: "Compte",
    question: "Comment ouvrir un compte ?",
    answer:
      "Cliquez sur 'Ouvrir un compte' sur notre page d'accueil et suivez les étapes de vérification d'identité (KYC). Le processus prend environ 10 minutes. Vous aurez besoin d'une pièce d'identité valide (passeport, CNI ou permis) et d'un justificatif de domicile de moins de 3 mois.",
  },
  {
    category: "Compte",
    question: "Quels documents sont nécessaires pour ouvrir un compte ?",
    answer:
      "Pour les particuliers: une pièce d'identité valide (passeport, carte nationale d'identité ou permis de conduire) et un justificatif de domicile de moins de 3 mois. Pour les entreprises: KBIS de moins de 3 mois, statuts, pièce d'identité du dirigeant, et preuve d'adresse professionnelle.",
  },
  {
    category: "Compte",
    question: "Combien de temps prend l'approbation d'un compte ?",
    answer:
      "La plupart des comptes sont approuvés instantanément grâce à notre processus de vérification automatisé. Dans certains cas, une vérification manuelle peut être nécessaire, ce qui peut prendre jusqu'à 24-48 heures.",
  },
  {
    category: "Cartes",
    question: "Comment commander une carte ?",
    answer:
      "Rendez-vous dans la section 'Mes cartes' de votre application et cliquez sur 'Commander une carte'. Choisissez entre carte physique (livraison en 5-7 jours ouvrés) ou carte virtuelle (disponible instantanément).",
  },
  {
    category: "Cartes",
    question: "Quels sont les délais de livraison des cartes ?",
    answer:
      "Les cartes physiques sont livrées sous 5-7 jours ouvrés en France métropolitaine. La livraison express (24-48h) est disponible moyennant des frais supplémentaires. Les cartes virtuelles sont disponibles immédiatement.",
  },
  {
    category: "Cartes",
    question: "Comment activer ma carte ?",
    answer:
      "Une fois votre carte reçue, vous pouvez l'activer via l'application mobile ou le dashboard web. L'activation nécessite de définir votre code PIN et d'effectuer une première transaction de validation.",
  },
  {
    category: "Virements",
    question: "Combien de temps prend un virement SEPA ?",
    answer:
      "Les virements SEPA standard sont crédités en 1 à 2 jours ouvrés. Les virements SEPA instantanés sont traités en quelques secondes, 24h/24 et 7j/7, vers plus de 3 000 banques européennes.",
  },
  {
    category: "Virements",
    question: "Quels sont les limites de virement ?",
    answer:
      "Pour les comptes standards: virements SEPA instantanés jusqu'à 100 000€/jour. Pour les comptes Business vérifiés: limites personnalisées selon votre profil de risque. Contactez le support pour ajuster vos limites.",
  },
  {
    category: "Sécurité",
    question: "Comment activer la double authentification (2FA) ?",
    answer:
      "Allez dans 'Paramètres' > 'Sécurité' > 'Authentification à deux facteurs'. Nous recommendons d'utiliser une application authenticator (Google Authenticator, Authy) pour une sécurité maximale.",
  },
  {
    category: "Sécurité",
    question: "Que faire si je suspecte une fraude sur mon compte ?",
    answer:
      "Contactez immédiatement notre équipe via le chat en direct ou le +33 1 23 45 67 89. Vous pouvez également bloquer votre carte instantanément depuis l'application. Nous vous recommandons de changer votre mot de passe et de vérifier vos transactions récentes.",
  },
  {
    category: "API",
    question: "Comment obtenir mes clés API ?",
    answer:
      "Connectez-vous à votre dashboard développeur. Allez dans 'Paramètres' > 'Clés API' et cliquez sur 'Générer une nouvelle clé'. Choisissez les scopes appropriés pour votre application.",
  },
  {
    category: "API",
    question: "Quel est le rate limit de l'API ?",
    answer:
      "Le rate limit par défaut est de 1000 requêtes par minute. Les endpoints de production ont des limites spécifiques. Contactez le support pour augmenter vos limites si nécessaire.",
  },
];

const endpoints = [
  {
    method: "GET",
    path: "/v1/faq",
    description: "Récupère la liste des FAQs",
  },
  {
    method: "GET",
    path: "/v1/faq/categories",
    description: "Liste les catégories de FAQ",
  },
  {
    method: "GET",
    path: "/v1/faq/search",
    description: "Recherche dans les FAQs",
  },
];

export default function SupportFaqPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <HelpCircle className="w-4 h-4" />
          Support
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Questions <span className="text-primary">fréquentes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trouvez rapidement des réponses à vos questions. Parcourez nos catégories ou recherchez un
          sujet spécifique.
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
              Notre base de connaissances rassemble les questions les plus fréquemment posées par
              nos utilisateurs. Que vous ayez une question sur votre compte, vos cartes, les
              virements ou l'intégration de nos APIs, vous trouverez très probablement votre réponse
              ici.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Si vous ne trouvez pas votre réponse, n'hésitez pas à contacter notre équipe de
              support qui se fera un plaisir de vous aider.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="categories" className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Catégories</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {faqCategories.map((category, index) => {
            const Icon = category.icon;
            const colorClasses: Record<string, string> = {
              blue: "hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/50",
              green: "hover:border-green-500/50 hover:bg-green-50/50 dark:hover:bg-green-950/50",
              purple:
                "hover:border-purple-500/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/50",
              red: "hover:border-red-500/50 hover:bg-red-50/50 dark:hover:bg-red-950/50",
              orange:
                "hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/50",
            };
            return (
              <a
                key={index}
                href={`#${category.title.toLowerCase()}`}
                className={`flex flex-col items-center gap-2 p-6 rounded-xl border border-border bg-card transition-all ${colorClasses[category.color]}`}
              >
                <Icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">{category.title}</span>
                <span className="text-xs text-muted-foreground">
                  {category.questions} questions
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section id="questions" className="space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-sm transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                    {faq.category}
                  </span>
                </div>
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="api" className="space-y-6">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">API FAQ</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Endpoints disponibles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Accédez programmatiquement à notre base de connaissances FAQ.
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
            <CardTitle className="text-lg">Rechercher dans les FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto relative">
              <CopyButton
                code={`curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/faq/search?q=carte&category=compte" \\
  -H "Authorization: Bearer sk_test_abc123"`}
              />
              <pre className="text-sm font-mono">{`curl -X GET "https://sandbox.bank.skygenesisenterprise.com/api/v1/faq/search?q=carte&category=compte" \\
  -H "Authorization: Bearer sk_test_abc123"`}</pre>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-200 font-mono whitespace-pre-wrap">{`{
  "data": [
    {
      "id": "faq_001",
      "question": "Comment commander une carte ?",
      "answer": "Rendez-vous dans la section 'Mes cartes'...",
      "category": "Cartes",
      "relevance": 0.95
    }
  ],
  "total": 1
}`}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Vous ne trouvez pas réponse ?</h2>
            <p className="text-muted-foreground">
              Notre équipe de support est disponible pour vous aider 7j/7.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/docs/support/contact">
                Nous contacter <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/quick-start">Documentation API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
