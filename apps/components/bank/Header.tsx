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
  Wallet,
  Receipt,
  FileText,
  Calculator,
  Sparkles,
  Landmark,
  Contact,
  FileCheck,
  Percent,
  SmartphoneIcon,
  CircleDollarSign,
} from "lucide-react";

interface MenuSection {
  title: string;
  items: {
    label: string;
    href?: string;
    description?: string;
    badge?: string;
  }[];
}

interface MenuCategory {
  title: string;
  sections?: MenuSection[];
  items?: {
    label: string;
    href?: string;
    description?: string;
    badge?: string;
  }[];
  highlight?: {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  };
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
    comptePro: {
      title: "Compte pro",
      sections: [
        {
          title: "Compte et cartes",
          items: [
            {
              label: "Compte pro 100% en ligne",
              href: `/${locale}/compte-pro`,
              badge: "Populaire",
            },
            { label: "Cartes de débit et crédit", href: `/${locale}/cartes` },
            { label: "Rémunération de comptes", href: `/${locale}/remuneration` },
            { label: "Agrégation de comptes", href: `/${locale}/aggregation` },
          ],
        },
        {
          title: "Outils",
          items: [
            { label: "Pré-comptabilité", href: `/${locale}/precomptabilite` },
            { label: "Facturation électronique", href: `/${locale}/facturation-electronique` },
          ],
        },
        {
          title: "Recevoir de l'argent",
          items: [
            { label: "Tap to Pay", href: `/${locale}/tap-to-pay` },
            { label: "Terminaux de paiement", href: `/${locale}/tpe` },
            { label: "Liens de paiement", href: `/${locale}/liens-paiement` },
          ],
        },
        {
          title: "Effectuer des paiements",
          items: [
            { label: "Virements et prélèvements", href: `/${locale}/virements` },
            { label: "Virements SWIFT", href: `/${locale}/swift` },
          ],
        },
      ],
    },
    ressources: {
      title: "Ressources",
      sections: [
        {
          title: "Nos outils et guides",
          items: [
            { label: "Comparateur de comptes pro", href: `/${locale}/comparateur` },
            { label: "Blog", href: `/${locale}/blog` },
            { label: "Glossaire financier", href: `/${locale}/glossaire` },
          ],
        },
        {
          title: "Facturation électronique",
          items: [
            {
              label: "Facturation électronique",
              href: `/${locale}/facturation-electronique`,
              description: "Plateforme Agréée Aether Bank",
            },
          ],
        },
      ],
      highlight: {
        title: "Création d'entreprise",
        description: "Ouvrez votre entreprise en ligne",
        href: `/${locale}/creation-entreprise`,
        icon: <Landmark className="w-5 h-5" />,
      },
    },
    financements: {
      title: "Financements",
      items: [
        { label: "Crédit professionnel", href: `/${locale}/credit-professionnel` },
        { label: "Financement participatif", href: `/${locale}/financement` },
        { label: "Affacturage", href: `/${locale}/affacturage` },
      ],
    },
    tarifs: {
      title: "Tarifs",
      items: [
        { label: "Tarifs indépendants", href: `/${locale}/tarifs-independants` },
        { label: "Tarifs TPE/PME", href: `/${locale}/tarifs-tpe-pme` },
        { label: "Tarifs associations", href: `/${locale}/tarifs-associations` },
        { label: "Tous les tarifs", href: `/${locale}/tarifs` },
      ],
    },
    pourquoi: {
      title: "Pourquoi Aether Bank",
      items: [
        { label: "Sécurité", href: `/${locale}/securite` },
        { label: "Support client", href: `/${locale}/support` },
        { label: "Notre histoire", href: `/${locale}/a-propos` },
        { label: "Carrières", href: `/${locale}/jobs` },
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

          {/* Desktop Navigation with Mega Menu */}
          <div className="hidden xl:flex items-center justify-center flex-1 px-4">
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

                  {/* Mega Menu */}
                  {openDropdown === key && category.sections && (
                    <div className="absolute top-full left-0 mt-2 w-max min-w-[800px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-4 gap-6 p-6">
                        {category.sections.map((section, idx) => (
                          <div key={idx}>
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                              {section.title}
                            </h4>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={item.href || "#"}
                                    className="flex items-center gap-2 group"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                                      {item.label}
                                    </span>
                                    {item.badge && (
                                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-600 rounded-full">
                                        {item.badge}
                                      </span>
                                    )}
                                    {item.description && (
                                      <span className="text-xs text-gray-400 block">
                                        {item.description}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {category.highlight && (
                        <div className="px-6 pb-6">
                          <Link
                            href={category.highlight.href}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 hover:border-indigo-200 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                              {category.highlight.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-sm">
                                {category.highlight.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {category.highlight.description}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-indigo-400" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Simple Dropdown for items without sections */}
                  {openDropdown === key && !category.sections && category.items && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        {category.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href || "#"}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="text-sm text-gray-700 group-hover:text-indigo-600">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-600 rounded-full">
                                {item.badge}
                              </span>
                            )}
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
              {/* Mobile Navigation - Simplified */}
              {Object.entries(menuCategories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                    {category.title}
                  </div>
                  {category.sections &&
                    category.sections.flatMap((section, sIdx) =>
                      section.items.map((item, iIdx) => (
                        <Link
                          key={`${sIdx}-${iIdx}`}
                          href={item.href || "#"}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-600 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))
                    )}
                  {category.items &&
                    category.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href || "#"}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-indigo-100 text-indigo-600 rounded-full">
                            {item.badge}
                          </span>
                        )}
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
