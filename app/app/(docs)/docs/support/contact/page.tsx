"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, MapPin, ArrowRight, Clock } from "lucide-react";

const contactMethods = [
  {
    title: "Email",
    description: "Envoyez-nous un email à support@aether.bank",
    icon: Mail,
    availability: "Réponse sous 24h",
  },
  {
    title: "Chat en direct",
    description: "Discutez avec notre équipe en temps réel",
    icon: MessageCircle,
    availability: "Disponible 7j/7",
  },
  {
    title: "Téléphone",
    description: "Appelez-nous au +33 1 23 45 67 89",
    icon: Phone,
    availability: "Lun-Ven 9h-18h",
  },
];

const officeInfo = {
  address: "123 Rue de la Banque, 75002 Paris, France",
  hours: "Lundi - Vendredi: 9h00 - 18h00",
  phone: "+33 1 23 45 67 89",
  email: "support@aether.bank",
};

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
          Notre équipe est disponible pour vous aider.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Nos canaux de contact</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                </div>
                <p className="text-muted-foreground mb-2">{method.description}</p>
                <p className="text-sm text-primary">{method.availability}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Nos bureaux</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Adresse</h3>
            </div>
            <p className="text-muted-foreground">{officeInfo.address}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Horaires</h3>
            </div>
            <p className="text-muted-foreground">{officeInfo.hours}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Envoyez-nous un message</h2>
            <p className="text-muted-foreground">
              Remplissez le formulaire et nous vous répondrons sous 24h.
            </p>
          </div>
          <Button>
            Envoyer un message <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
