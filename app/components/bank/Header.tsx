"use client";

import Link from "next/link";
import { useLocale } from "@/context/locale-context";
import { Button } from "@/components/ui/button";
import { locales } from "@/lib/locale";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  CreditCard,
  PiggyBank,
  Smartphone,
  Shield,
  Building2,
  Users,
  TrendingUp,
  HeadphonesIcon,
  Globe,
  Lock,
  Wallet,
  Receipt,
  FileText,
  Calculator,
  Sparkles,
} from "lucide-react";

interface MenuItem {
  label: string;
  href?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export function Header() {
  const { locale, setLocale } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuCategories: Record<string, MenuCategory> = {
    products: {
      title: "Produits",
      items: [
        {
          label: "Compte pro",
          description: "Compte bancaire pour professionnels",
          icon: <Building2 className="w-5 h-5" />,
          href: `/${locale}/compte-pro`,
          badge: "Populaire",
        },
        {
          label: "Compte personnel",
          description: "Gestion quotidienne de vos finances",
          icon: <Users className="w-5 h-5" />,
          href: `/${locale}/compte-particulier`,
        },
        {
          label: "Carte Mastercard",
          description: "Carte physique et virtuelle",
          icon: <CreditCard className="w-5 h-5" />,
          href: `/${locale}/cartes`,
        },
        {
          label: "Épargne",
          description: "Livret et placements",
          icon: <PiggyBank className="w-5 h-5" />,
          href: `/${locale}/epargne`,
        },
        {
          label: "Crédit pro",
          description: "Financement pour votre activité",
          icon: <Wallet className="w-5 h-5" />,
          href: `/${locale}/credit`,
        },
      ],
    },
    features: {
      title: "Fonctionnalités",
      items: [
        {
          label: "Application mobile",
          description: "Banque dans votre poche",
          icon: <Smartphone className="w-5 h-5" />,
          href: `/${locale}/application`,
        },
        {
          label: "Paiements",
          description: "Virements et prélèvements",
          icon: <TrendingUp className="w-5 h-5" />,
          href: `/${locale}/paiements`,
        },
        {
          label: "Facturation",
          description: "Créez et envoyez vos factures",
          icon: <FileText className="w-5 h-5" />,
          href: `/${locale}/facturation`,
        },
        {
          label: "Comptabilité",
          description: "Sync avec votre expert-comptable",
          icon: <Receipt className="w-5 h-5" />,
          href: `/${locale}/comptabilite`,
        },
        {
          label: "Outils pratiques",
          description: "Calculateurs et simulateurs",
          icon: <Calculator className="w-5 h-5" />,
          href: `/${locale}/outils`,
        },
        {
          label: "Sécurité",
          description: "Protection de vos fonds",
          icon: <Shield className="w-5 h-5" />,
          href: `/${locale}/securite`,
        },
      ],
    },
    pricing: {
      title: "Tarifs",
      items: [
        {
          label: "Indépendants",
          description: "Pour freelance et auto-entrepreneur",
          icon: <Users className="w-5 h-5" />,
          href: `/${locale}/tarifs-independants`,
        },
        {
          label: "TPE / PME",
          description: "Pour les petites et moyennes entreprises",
          icon: <Building2 className="w-5 h-5" />,
          href: `/${locale}/tarifs-tpe-pme`,
        },
        {
          label: "Associations",
          description: "Pour les associations loi 1901",
          icon: <Globe className="w-5 h-5" />,
          href: `/${locale}/tarifs-associations`,
        },
        {
          label: "Créateurs",
          description: "Pour créer votre entreprise",
          icon: <Sparkles className="w-5 h-5" />,
          href: `/${locale}/tarifs-creation`,
        },
        {
          label: "Tous les tarifs",
          description: "Voir l'ensemble des offres",
          icon: <FileText className="w-5 h-5" />,
          href: `/${locale}/tarifs`,
        },
      ],
    },
    resources: {
      title: "Ressources",
      items: [
        {
          label: "Centre d'aide",
          description: "FAQ et guides pratiques",
          icon: <HeadphonesIcon className="w-5 h-5" />,
          href: `/${locale}/aide`,
        },
        {
          label: "Blog",
          description: "Actualités et conseils",
          icon: <FileText className="w-5 h-5" />,
          href: `/${locale}/blog`,
        },
        {
          label: "Glossaire",
          description: "Définitions financières",
          icon: <BookOpen className="w-5 h-5" />,
          href: `/${locale}/glossaire`,
        },
        {
          label: "Presse",
          description: "Communiqués et médias",
          icon: <Newspaper className="w-5 h-5" />,
          href: `/${locale}/presse`,
        },
      ],
    },
    enterprise: {
      title: "Entreprise",
      items: [
        {
          label: "API & Développeurs",
          description: "Intégrez Aether Bank",
          icon: <Globe className="w-5 h-5" />,
          href: `/${locale}/api`,
        },
        {
          label: "Partenariats",
          description: "Devenir partenaire",
          icon: <Handshake className="w-5 h-5" />,
          href: `/${locale}/partenaires`,
        },
        {
          label: "À propos",
          description: "Notre histoire et valeurs",
          icon: <Building2 className="w-5 h-5" />,
          href: `/${locale}/a-propos`,
        },
        {
          label: "Carrières",
          description: "Rejoignez-nous",
          icon: <Users className="w-5 h-5" />,
          href: `/${locale}/jobs`,
        },
        {
          label: "Contact",
          description: "Nous écrire",
          icon: <Mail className="w-5 h-5" />,
          href: `/${locale}/contact`,
        },
      ],
    },
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-white"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-black font-bold text-lg tracking-tight">Aether Bank</span>
          </Link>

          {/* Desktop Navigation with Dropdowns - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center space-x-0.5">
              {Object.entries(menuCategories).map(([key, category]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      openDropdown === key
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
                  >
                    {category.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openDropdown === key ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === key && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        {category.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href || "#"}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 text-sm">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-600 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{item.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Locale Selector & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Locale Selector */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-200">
              {locales.slice(0, 2).map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => setLocale(loc.code)}
                  className={`text-xs px-2 py-1.5 rounded-md transition-colors ${
                    locale === loc.code
                      ? "bg-indigo-100 text-indigo-600 font-medium"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {loc.flag}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 px-3"
            >
              Connexion
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-5">
              Ouvrir un compte
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Items */}
              {Object.entries(menuCategories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                    {category.title}
                  </div>
                  {category.items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href || "#"}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-600 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}

              {/* Mobile Locale Selector */}
              <div className="flex gap-2 py-4 border-t border-gray-100">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      setLocale(loc.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 text-sm px-3 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      locale === loc.code
                        ? "bg-indigo-100 text-indigo-600 font-medium"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{loc.flag}</span>
                    <span>{loc.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Connexion
                </Button>
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Ouvrir un compte
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function BookOpen({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function Newspaper({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V6" />
      <path d="M10 6h8" />
      <path d="M10 10h8" />
      <path d="M10 14h4" />
    </svg>
  );
}

function Handshake({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function Mail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
