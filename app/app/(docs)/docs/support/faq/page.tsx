"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Search, ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";

const faqCategories = [
  { title: "Compte", questions: 12 },
  { title: "Cartes", questions: 8 },
  { title: "Virements", questions: 10 },
  { title: "Sécurité", questions: 6 },
  { title: "Application", questions: 5 },
];

const faqs = [
  {
    category: "Compte",
    question: "Comment ouvrir un compte ?",
    answer:
      "Cliquez sur 'Ouvrir un compte' et suivez les étapes de vérification d'identité. Le processus prend environ 10 minutes.",
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
      "Rendez-vous dans la section 'Mes cartes' de votre application et cliquez sur 'Commander une carte'.",
  },
  {
    category: "Virements",
    question: "Combien de temps prend un virement ?",
    answer:
      "Les virements SEPA prennent généralement 1 à 2 jours ouvrés. Les virements instantanés sont crédités en quelques secondes.",
  },
  {
    category: "Sécurité",
    question: "Comment activer la 2FA ?",
    answer:
      "Allez dans 'Paramètres' > 'Sécurité' > 'Authentification à deux facteurs' et suivre les instructions.",
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
          Trouvez rapidement des réponses à vos questions.
        </p>
      </section>

      <section className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Catégories</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {faqCategories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors"
            >
              <span className="text-lg font-semibold">{category.title}</span>
              <span className="text-sm text-muted-foreground">{category.questions} questions</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Questions populaires</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Vous ne trouvez pas réponse ?</h2>
            <p className="text-muted-foreground">
              Notre équipe de support est disponible pour vous aider.
            </p>
          </div>
          <Button>
            Nous contacter <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
