"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageCircle, Phone, ArrowRight, BookOpen } from "lucide-react";

const supportChannels = [
  {
    title: "Email",
    description: "support@aether.bank",
    icon: Mail,
    availability: "Réponse sous 24h",
  },
  { title: "Chat", description: "Disponible 7j/7", icon: MessageCircle, availability: "Immédiat" },
  {
    title: "Téléphone",
    description: "+33 1 23 45 67 89",
    icon: Phone,
    availability: "Lun-Ven 9h-18h",
  },
];

const faq = [
  {
    question: "Comment réinitialiser mon mot de passe ?",
    answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion.",
  },
  {
    question: "Comment contacter le support ?",
    answer: "Utilisez le chat en direct ou envoyez un email à support@aether.bank.",
  },
  {
    question: "Quels sont les horaires du support ?",
    answer: "Le support est disponible 7j/7 par chat et lundi-vendredi par téléphone.",
  },
];

export default function UserHelpPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <HelpCircle className="w-4 h-4" />
          User Help
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Centre d'aide <span className="text-primary">client</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trouvez des réponses à vos questions et contactez notre support.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Nous contacter</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{channel.title}</h3>
                </div>
                <p className="text-muted-foreground mb-2">{channel.description}</p>
                <p className="text-sm text-primary">{channel.availability}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Questions fréquentes</h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
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
          <Button>
            <BookOpen className="w-4 h-4 mr-2" />
            Voir la documentation
          </Button>
        </div>
      </section>
    </div>
  );
}
