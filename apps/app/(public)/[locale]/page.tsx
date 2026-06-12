"use client";

import { Header } from "@/components/bank/Header";
import { Footer } from "@/components/bank/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Receipt,
  Wallet,
  TrendingUp,
  Users,
  Building2,
  Sparkles,
  Globe,
  Shield,
  Star,
  HeadphonesIcon,
  FileText,
  PiggyBank,
  Smartphone,
  Calculator,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: PiggyBank,
    title: "Compte rémunéré",
    description: "Votre argent travaille pour vous avec jusqu'à 4% TAEG pendant 2 mois",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    icon: FileText,
    title: "Facturation simplifiée",
    description: "Créez et envoyez vos factures en quelques clics. Paiement intégré.",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: CreditCard,
    title: "Cartes professionnelles",
    description: "Cartes physiques et virtuelles. Paiement sans contact everywhere.",
    bg: "bg-gradient-to-br from-purple-50 to-pink-50",
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    icon: Receipt,
    title: "Gestion des notes de frais",
    description: "Centralisez et contrôlez les dépenses de votre équipe en temps réel.",
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconBg: "bg-green-100 text-green-600",
  },
];

const solutions = [
  {
    icon: Sparkles,
    title: "Créateurs d'entreprise",
    description: "Ouvrez un compte en quelques minutes et obtenez vos documents sous 24h.",
    href: "/creation-entreprise",
  },
  {
    icon: Users,
    title: "Indépendants",
    description: "Gérez votre activité pro avec un compte qui vous fait gagner du temps.",
    href: "/independants",
  },
  {
    icon: Building2,
    title: "TPE / PME",
    description: "Vision complète sur vos finances et celles de votre équipe.",
    href: "/tpe-pme",
  },
  {
    icon: Handshake,
    title: "Associations",
    description: "Gérez dons, cotisations et dépenses, tout en un seul endroit.",
    href: "/associations",
  },
];

const testimonials = [
  {
    quote:
      "Aether Bank simplifie notre quotidien. Les réponses sont rapides, quasi instantanées via le chat.",
    author: "Mohammed El Bojaddaini",
    role: "Co-fondateur de Curecall",
    logo: "Curecall",
  },
  {
    quote: "Aether Bank nous aide à grow sustainably. Nous gagnons chaque jour du temps précieux.",
    author: "Charlotte Piller",
    role: "Co-fondatrice de Lotta Ludwigson",
    logo: "Lotta Ludwigson",
  },
  {
    quote:
      "Nous pouvons créer des comptes pour chaque équipe et leur assigner un budget. Nous gardons le contrôle.",
    author: "Álvaro Patón",
    role: "CFO de Morrison Shoes",
    logo: "Morrison Shoes",
  },
];

const paymentMethods = [
  {
    title: "Cartes professionnelles",
    description:
      "Payez en ligne, en magasin et à l'étranger avec des cartes physiques et virtuelles.",
    href: "/cartes",
  },
  {
    title: "TPE mobile",
    description: "Acceptez les paiements par carte et recevez l'argent sous 24h.",
    href: "/tpe",
  },
  {
    title: "Tap to Pay",
    description: "Acceptez les paiements sans contact sur votre smartphone iPhone ou Android.",
    href: "/tap-to-pay",
  },
  {
    title: "Liens de paiement",
    description: "Accélérez vos règlements clients avec des factures intégrant le paiement.",
    href: "/liens-paiement",
  },
];

const trustPoints = [
  {
    icon: HeadphonesIcon,
    title: "Support 7j/7",
    description: "Réponse rapide par chat, téléphone ou email",
  },
  {
    icon: Star,
    title: "4.8/5 sur Trustpilot",
    description: "Plus de 54 000 avis clients",
  },
  {
    icon: Shield,
    title: "Sécurisé et régulé",
    description: "Institution de paiement agréée par l'ACPR",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Nouveau: Compte rémunéré jusqu'à 4% TAEG
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight leading-[1.1]">
              Le compte pro qui vous fait{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                gagner du temps
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Gagnez jusqu'à 4% TAEG sur votre compte tout en simplifiant votre gestion financière
              au quotidien. Essayez gratuitement pendant 30 jours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg h-auto border-0 shadow-lg shadow-indigo-600/25">
                Ouvrir un compte gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg h-auto"
              >
                Voir les tarifs
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Compte sous 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5 text-indigo-500" />
                <span>Support 7j/7</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-2xl">
              <div className="bg-white p-8">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
                    <div className="text-indigo-100 text-sm mb-1">Solde total</div>
                    <div className="text-2xl font-bold mb-2">24 850,00 €</div>
                    <div className="text-xs text-indigo-200">+2.4% ce mois</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Revenus</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">18 420,00 €</div>
                    <div className="text-xs text-green-600">Ce mois</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Dépenses</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">8 230,00 €</div>
                    <div className="text-xs text-gray-400">Ce mois</div>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">En attente</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
                    <div className="text-xs text-amber-600">2 150,00 €</div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="mt-6 bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-gray-700">Transactions récentes</span>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                      Voir tout
                    </a>
                  </div>
                  {[
                    {
                      name: "Facture #4829 - Client ABC",
                      amount: "+4 500,00 €",
                      status: "Reçu",
                      date: "Aujourd'hui",
                    },
                    { name: "Abonnement AWS", amount: "-89,99 €", status: "Payé", date: "Hier" },
                    {
                      name: "Salaires - Janvier",
                      amount: "-12 500,00 €",
                      status: "Payé",
                      date: "28 Jan",
                    },
                  ].map((tx, i) => (
                    <div
                      key={i}
                      className="px-5 py-4 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{tx.name}</div>
                        <div className="text-xs text-gray-400">{tx.date}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${tx.amount.startsWith("+") ? "text-green-600" : "text-gray-900"}`}
                        >
                          {tx.amount}
                        </div>
                        <div className="text-xs text-gray-400">{tx.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-3">
                <point.icon className="w-6 h-6 text-indigo-600" />
                <div>
                  <div className="font-semibold text-gray-900">{point.title}</div>
                  <div className="text-sm text-gray-500">{point.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Tout ce dont vous avez besoin pour gérer votre activité
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour simplifier vos finances au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 ${feature.bg}`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for everyone */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Quelle que soit votre activité
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution adaptée à chaque type d'entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <a
                key={index}
                href={solution.href}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <solution.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-3">{solution.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{solution.description}</p>
                <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Acceptez et effectuez des paiements en toute simplicité
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-black mb-3 group-hover:text-indigo-600">
                  {method.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Card Promo */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
                <CreditCard className="w-4 h-4" />
                Nouveau
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Carte de crédit pro
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Accédez jusqu'à 15 000€ par mois, sans intérêts si soldé dans les temps, tout en
                protégeant votre trésorerie.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg h-auto font-semibold">
                Découvrir la carte de crédit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="w-80 h-52 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-start mb-16">
                  <div className="text-white font-bold text-lg">Aether Bank</div>
                  <CreditCard className="w-8 h-8 text-white/60" />
                </div>
                <div className="text-white/80 text-lg tracking-widest">•••• •••• •••• 4532</div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-white/60 text-sm">Titulaire</div>
                  <div className="text-white/60 text-sm">12/28</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Ils nous font confiance
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Plus de 600 000 entreprises nous font confiance
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold text-black">4.8</span>
              <span className="text-gray-500">sur Trustpilot (54 000+ avis)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-black">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              L'impact économique d'Aether Bank
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les petites entreprises voient de grands bénéfices avec Aether Bank
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-indigo-600 mb-2">51 000€</div>
              <div className="text-gray-600">d'économies sur 3 ans</div>
              <div className="text-sm text-gray-400 mt-2">
                Incluant opérationnelle, facturation et comptabilité
              </div>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-indigo-600 mb-2">+7h</div>
              <div className="text-gray-600">gagnées par mois</div>
              <div className="text-sm text-gray-400 mt-2">pour un responsable financier</div>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-indigo-600 mb-2">&lt;6</div>
              <div className="text-gray-600">mois pour rentabiliser</div>
              <div className="text-sm text-gray-400 mt-2">le retour sur investissement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Ouvrez un compte en 10 minutes
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Nous voulons protéger ce qui vous est précieux : votre temps, votre énergie et votre
              focus. Laissez Aether Bank accélérer votre gestion financière.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg h-auto font-semibold">
                Ouvrir un compte
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-6 text-lg h-auto"
              >
                Réserver une démo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">30 jours d'essai gratuit. Sans engagement.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
