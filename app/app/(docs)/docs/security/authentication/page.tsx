"use client";

import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, Shield, Key, User } from "lucide-react";

const authMethods = [
  {
    title: "Identifiant + Mot de passe",
    description: "Connexion traditionnelle avec identifiant et mot de passe.",
    icon: User,
  },
  {
    title: "Authentification à deux facteurs",
    description: "Couche de sécurité supplémentaire avec code SMS ou application.",
    icon: Shield,
  },
  {
    title: "Clés de sécurité physiques",
    description: "Utilisation d'une clé USB de sécurité (WebAuthn/FIDO2).",
    icon: Key,
  },
];

const features = [
  {
    title: "Chiffrement TLS 1.3",
    description: "Toutes les communications sont chiffrées avec le protocole le plus récent.",
    icon: Lock,
  },
  {
    title: "Hachage de mots de passe",
    description: "Utilisation de bcrypt pour le stockage sécurisé des mots de passe.",
    icon: Shield,
  },
  {
    title: "Sessions sécurisées",
    description: "Cookies sécurisés avec attributs HttpOnly et Secure.",
    icon: Key,
  },
  {
    title: "Limitation de connexion",
    description: "Verrouillage automatique après plusieurs tentatives échouées.",
    icon: Shield,
  },
];

export default function SecurityAuthenticationPage() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lock className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-primary">Authentification</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprenez comment nous protégeons l'accès à votre compte.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Méthodes d'authentification</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {authMethods.map((method, index) => {
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
                <p className="text-muted-foreground">{method.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Fonctionnalités de sécurité</h2>
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

      <section className="rounded-xl bg-muted/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Activer l'authentification forte</h2>
            <p className="text-muted-foreground">
              Protégez votre compte avec l'authentification à deux facteurs.
            </p>
          </div>
          <Button>
            Activer 2FA <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
