"use client";

import Link from "next/link";
import { useLocale } from "@/context/locale-context";
import { useState } from "react";
import { Mail, Send, Star, ExternalLink } from "lucide-react";

export function Footer() {
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>'"&]/g, "")
      .trim()
      .substring(0, 100);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      if (url.startsWith("/")) return true;
      if (url.startsWith("http")) {
        const parsed = new URL(url);
        return (
          parsed.hostname === "aether-bank.com" || parsed.hostname.endsWith(".aether-bank.com")
        );
      }
      return false;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = sanitizeText(email);
    if (!isValidEmail(sanitizedEmail)) {
      console.error("Invalid email format");
      return;
    }
    setEmail("");
  };

  const footerLinks = {
    comptePro: [
      { name: "Compte pro en ligne", href: `/${locale}/compte-pro` },
      { name: "Compte pro SASU", href: `/${locale}/compte-sasu` },
      { name: "Compte pro SCI", href: `/${locale}/compte-sci` },
      { name: "Compte pro SAS", href: `/${locale}/compte-sas` },
      { name: "Compte pro auto-entrepreneur", href: `/${locale}/compte-micro` },
      { name: "Compte pro freelance", href: `/${locale}/compte-freelance` },
      { name: "Compte pro association", href: `/${locale}/compte-association` },
      { name: "Compte pro rémunéré", href: `/${locale}/compte-remote` },
      { name: "Cartes pro", href: `/${locale}/cartes-pro` },
      { name: "Cartes temporaires", href: `/${locale}/cartes-temp` },
      { name: "Cartes virtuelles", href: `/${locale}/cartes-virtuelles` },
      { name: "Moyens de paiement", href: `/${locale}/paiements` },
      { name: "TPE mobile", href: `/${locale}/tpe` },
      { name: "Dépôt de chèque", href: `/${locale}/depot-cheque` },
      { name: "Virements internationaux", href: `/${locale}/virements-internationaux` },
    ],
    gestion: [
      { name: "Logiciel de facturation", href: `/${locale}/facturation` },
      { name: "Logiciel facturation gratuit", href: `/${locale}/facturation-gratuit` },
      { name: "Pré-comptabilité en ligne", href: `/${locale}/precomptabilite` },
      { name: "Gestion de trésorerie", href: `/${locale}/tresorerie` },
      { name: "Gestion des notes de frais", href: `/${locale}/notes-frais` },
      { name: "Factures fournisseurs", href: `/${locale}/factures-fournisseurs` },
      { name: "Intégrations", href: `/${locale}/integrations` },
    ],
    credit: [
      { name: "Financement", href: `/${locale}/financement` },
      { name: "Pay Later", href: `/${locale}/paylater` },
      { name: "Crédit professionnel", href: `/${locale}/credit-pro` },
    ],
    creation: [
      { name: "Création d'entreprise", href: `/${locale}/creation-entreprise` },
      { name: "Création d'une SAS", href: `/${locale}/creation-sas` },
      { name: "Création d'une auto-entreprise", href: `/${locale}/creation-autoentreprise` },
      { name: "Dépôt de capital", href: `/${locale}/depot-capital` },
      { name: "Dépôt de capital SAS", href: `/${locale}/depot-capital-sas` },
      { name: "Dépôt de capital SARL", href: `/${locale}/depot-capital-sarl` },
    ],
    comparatifs: [
      { name: "Aether Bank vs Shine", href: `/${locale}/vs-shine` },
      { name: "Aether Bank vs Revolut", href: `/${locale}/vs-revolut` },
      { name: "Aether Bank vs Pennylane", href: `/${locale}/vs-pennylane` },
      { name: "Aether Bank vs Indy", href: `/${locale}/vs-indy` },
      { name: "Aether Bank vs Boursorama Pro", href: `/${locale}/vs-boursorama` },
      { name: "Aether Bank vs N26", href: `/${locale}/vs-n26` },
      { name: "Aether Bank vs Crédit Mutuel", href: `/${locale}/vs-credit-mutuel` },
      { name: "Comparatif de banques", href: `/${locale}/comparatif` },
    ],
    ressources: [
      { name: "FAQ & Support client", href: `/${locale}/faq` },
      { name: "Blog", href: `/${locale}/blog` },
      { name: "Glossaire", href: `/${locale}/glossaire` },
      { name: "Presse", href: `/${locale}/presse` },
      { name: "Toutes nos ressources", href: `/${locale}/ressources` },
    ],
    outils: [
      { name: "Calculateur TVA", href: `/${locale}/calculateur-tva` },
      { name: "Calculateur frais kilométriques", href: `/${locale}/calculateur-km` },
      { name: "Calculateur rémunération freelance", href: `/${locale}/calculateur-salaire` },
      { name: "Codes BIC/SWIFT", href: `/${locale}/bic-swift` },
    ],
    entreprise: [
      { name: "Demander une démo", href: `/${locale}/demo` },
      { name: "Product Tour", href: `/${locale}/product-tour` },
      { name: "Trouver mon forfait", href: `/${locale}/forfaits` },
      { name: "Pourquoi choisir Aether Bank?", href: `/${locale}/pourquoi` },
      { name: "Contact", href: `/${locale}/contact` },
      { name: "Jobs", href: `/${locale}/jobs` },
      { name: "Histoire et valeurs", href: `/${locale}/about` },
      { name: "Communauté", href: `/${locale}/communaute` },
      { name: "Développement durable", href: `/${locale}/durable` },
    ],
    partenaires: [
      { name: "Devenir expert-comptable partenaire", href: `/${locale}/partner-expert` },
      { name: "Devenir partenaire", href: `/${locale}/partenaires` },
      { name: "Devenir affilié", href: `/${locale}/affilie` },
      { name: "Recommander Aether Bank", href: `/${locale}/recommander` },
    ],
    developpeurs: [
      { name: "Aether Embed", href: `/${locale}/embed` },
      { name: "Connexion API Aether Bank", href: `/${locale}/api` },
    ],
  };

  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* App Store / Trustpilot Section */}
          <div className="py-10 border-b border-gray-800">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {/* App Store */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">App Store</div>
                  <div className="flex items-center gap-1 text-white font-medium">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    4.7
                  </div>
                </div>
              </a>

              {/* Play Store */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Play Store</div>
                  <div className="flex items-center gap-1 text-white font-medium">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    4.8
                  </div>
                </div>
              </a>

              {/* Trustpilot */}
              <a
                href="https://trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Trustpilot</div>
                  <div className="flex items-center gap-1 text-white font-medium">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    COMPTE PRO
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Main Footer Links */}
          <div className="py-12 border-b border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* COMPTE PRO */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  COMPTE PRO
                </h4>
                <ul className="space-y-2">
                  {[
                    "Compte pro en ligne",
                    "Compte pro SASU",
                    "Compte pro SCI",
                    "Compte pro SAS",
                    "Compte pro auto-entrepreneur",
                    "Compte pro freelance",
                    "Compte pro association",
                    "Compte pro rémunéré",
                  ].map((name) => (
                    <li key={name}>
                      <Link
                        href={
                          isValidUrl(`/${locale}/${name.toLowerCase().replace(/ /g, "-")}`)
                            ? `/${locale}/${name.toLowerCase().replace(/ /g, "-")}`
                            : "/"
                        }
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SERVICES PRO */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  SERVICES PRO
                </h4>
                <ul className="space-y-2">
                  {[
                    "Cartes pro",
                    "Cartes temporaires",
                    "Cartes virtuelles",
                    "Moyens de paiement",
                    "TPE mobile",
                    "Dépôt de chèque",
                    "Virements internationaux",
                  ].map((name) => (
                    <li key={name}>
                      <Link
                        href={
                          isValidUrl(`/${locale}/${name.toLowerCase().replace(/ /g, "-")}`)
                            ? `/${locale}/${name.toLowerCase().replace(/ /g, "-")}`
                            : "/"
                        }
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GESTION FINANCIÈRE */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  GESTION FINANCIÈRE
                </h4>
                <ul className="space-y-2">
                  {footerLinks.gestion.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CRÉDIT & FINANCEMENT */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  CRÉDIT & FINANCEMENT
                </h4>
                <ul className="space-y-2">
                  {footerLinks.credit.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CRÉATION D'ENTREPRISE */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  CRÉATION D'ENTREPRISE
                </h4>
                <ul className="space-y-2">
                  {footerLinks.creation.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COMPARATIFS */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  COMPARATIFS
                </h4>
                <ul className="space-y-2">
                  {footerLinks.comparatifs.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="py-12 border-b border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* RESSOURCES */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  RESSOURCES
                </h4>
                <ul className="space-y-2">
                  {footerLinks.ressources.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OUTILS & CALCULATEURS */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  OUTILS & CALCULATEURS
                </h4>
                <ul className="space-y-2">
                  {footerLinks.outils.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ENTREPRISE */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  ENTREPRISE
                </h4>
                <ul className="space-y-2">
                  {footerLinks.entreprise.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PARTENARIATS */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  PARTENARIATS
                </h4>
                <ul className="space-y-2">
                  {footerLinks.partenaires.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DÉVELOPPEURS */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  DÉVELOPPEURS
                </h4>
                <ul className="space-y-2">
                  {footerLinks.developpeurs.map((link) => (
                    <li key={sanitizeText(link.name)}>
                      <Link
                        href={isValidUrl(link.href) ? link.href : "/"}
                        className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {sanitizeText(link.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="py-12 border-b border-gray-800">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h4 className="text-lg font-semibold text-white">Restez informé</h4>
              <p className="text-sm text-gray-400">
                Recevez nos dernières offres et conseils financiers directement dans votre boîte
                mail
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(sanitizeText(e.target.value))}
                  placeholder="Votre adresse email"
                  required
                  maxLength={100}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-gray-700 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  S&apos;abonner
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Logo & Copyright */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <span className="text-white font-semibold">Aether Bank</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-gray-400">
                  <span>© {currentYear} Aether Bank. Tous droits réservés.</span>
                  <span className="hidden md:inline">|</span>
                  <span className="text-indigo-400">A Sky Genesis Enterprise Product</span>
                </div>
              </div>

              {/* PGP Link */}
              <Link
                href="/pgp"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Vérifier notre clé PGP publique
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
