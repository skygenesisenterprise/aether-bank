"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CreditCard,
  Wallet,
  Users,
  Settings,
  Shield,
  HelpCircle,
  FileText,
  BarChart3,
  Building2,
  Lock,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Home,
  Send,
  PiggyBank,
  Key,
  LayoutDashboard,
  User,
  Banknote,
  Scale,
  Cloud,
  Database,
  Bell,
  FileCheck,
  CreditCard as CardIcon,
  ShieldCheck,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Quick Start", href: "/docs/quick-start", icon: ExternalLink },
      { title: "Account Setup", href: "/docs/account-setup", icon: Settings },
    ],
  },
  {
    title: "Products",
    items: [
      { title: "Accounts", href: "/docs/products/accounts", icon: Wallet },
      { title: "Cards", href: "/docs/products/cards", icon: CreditCard },
      { title: "Transfers", href: "/docs/products/transferts", icon: Send },
      { title: "Credits", href: "/docs/products/credits", icon: BarChart3 },
      { title: "Savings", href: "/docs/products/savings", icon: PiggyBank },
    ],
  },
  {
    title: "Platform Dashboard",
    items: [
      { title: "Overview", href: "/docs/platform/overview", icon: LayoutDashboard },
      { title: "Accounts", href: "/docs/platform/accounts", icon: Wallet },
      { title: "Cards", href: "/docs/platform/cards", icon: CardIcon },
      { title: "Transactions", href: "/docs/platform/transactions", icon: Send },
      { title: "Clients", href: "/docs/platform/clients", icon: Users },
      { title: "Credits", href: "/docs/platform/credits", icon: BarChart3 },
      { title: "Savings", href: "/docs/platform/savings", icon: PiggyBank },
      { title: "Direct Debits", href: "/docs/platform/direct-debits", icon: FileCheck },
      { title: "Ledger", href: "/docs/platform/ledger", icon: Database },
      { title: "Invoices", href: "/docs/platform/invoices", icon: FileText },
      { title: "Analytics", href: "/docs/platform/analytics", icon: BarChart3 },
      { title: "IBAN", href: "/docs/platform/iban", icon: Banknote },
      { title: "Providers", href: "/docs/platform/providers", icon: Building2 },
      { title: "Encryption", href: "/docs/platform/encryption", icon: Lock },
      { title: "Cloud", href: "/docs/platform/cloud", icon: Cloud },
      { title: "API", href: "/docs/platform/api", icon: Code },
      { title: "Compliance", href: "/docs/platform/compliance", icon: Scale },
      { title: "Security", href: "/docs/platform/security", icon: ShieldCheck },
      { title: "Notifications", href: "/docs/platform/notifications", icon: Bell },
      { title: "Settings", href: "/docs/platform/settings", icon: Settings },
      { title: "Help", href: "/docs/platform/help", icon: HelpCircle },
    ],
  },
  {
    title: "User Dashboard",
    items: [
      { title: "Home", href: "/docs/user/home", icon: Home },
      { title: "Account", href: "/docs/user/account", icon: User },
      { title: "Cards", href: "/docs/user/cards", icon: CreditCard },
      { title: "Transactions", href: "/docs/user/transactions", icon: Send },
      { title: "Transfers", href: "/docs/user/transferts", icon: Send },
      { title: "Credits", href: "/docs/user/credit", icon: BarChart3 },
      { title: "Savings", href: "/docs/user/savings", icon: PiggyBank },
      { title: "Security", href: "/docs/user/security", icon: Lock },
      { title: "Team", href: "/docs/user/team", icon: Users },
      { title: "Management", href: "/docs/user/management", icon: Settings },
      { title: "Help", href: "/docs/user/help", icon: HelpCircle },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Authentication", href: "/docs/security/authentication", icon: Lock },
      { title: "2FA", href: "/docs/security/2fa", icon: Shield },
      { title: "Fraud Protection", href: "/docs/security/fraud", icon: Shield },
      { title: "API Keys", href: "/docs/security/api-keys", icon: Key },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "FAQ", href: "/docs/faq", icon: HelpCircle },
      { title: "Contact", href: "/docs/contact", icon: MessageCircle },
      { title: "Legal", href: "/docs/legal", icon: FileText },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r border-border flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AE</span>
          </div>
          <span className="font-semibold text-lg">Aether Bank</span>
        </Link>
      </div>

      {/* Documentation Label */}
      <div className="px-6 py-3 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Documentation
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </h3>
            <ul className="space-y-1 px-3">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                      {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Version */}
      <div className="px-6 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>
    </div>
  );
}
