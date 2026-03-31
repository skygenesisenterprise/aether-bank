"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  ShieldCheck,
  Settings,
  LogOut,
  Receipt,
  TrendingUp,
  PiggyBank,
  FileText,
  BarChart3,
  Bell,
  Globe,
  Shield,
  Lock,
  Database,
  Server,
  Cloud,
  Code2,
  HelpCircle,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Gestion",
    items: [
      { name: "Clients", href: "/dashboard/clients", icon: Users },
      { name: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
      { name: "Comptes", href: "/dashboard/accounts", icon: Wallet },
      { name: "Cartes", href: "/dashboard/cards", icon: CreditCard },
      { name: "Facturation", href: "/dashboard/invoices", icon: FileText },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "Épargne", href: "/dashboard/savings", icon: PiggyBank },
      { name: "Crédit", href: "/dashboard/credits", icon: TrendingUp },
      { name: "Prélèvements", href: "/dashboard/direct-debits", icon: Receipt },
    ],
  },
  {
    title: "Services",
    items: [
      { name: "IBAN & SWIFT", href: "/dashboard/iban", icon: Globe },
      { name: "API & Intégrations", href: "/dashboard/api", icon: Code2 },
      { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ],
  },
];

const secondaryNavigation = [
  {
    title: "Sécurité",
    items: [
      { name: "Sécurité", href: "/dashboard/security", icon: Shield },
      { name: "Conformité", href: "/dashboard/compliance", icon: ShieldCheck },
      { name: "Chiffrement", href: "/dashboard/encryption", icon: Lock },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "Ledger", href: "/dashboard/ledger", icon: Database },
      { name: "Providers", href: "/dashboard/providers", icon: Server },
      { name: "Cloud", href: "/dashboard/cloud", icon: Cloud },
    ],
  },
];

const bottomNavigation = [
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
  { name: "Aide", href: "/dashboard/help", icon: HelpCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-purple-600">
          <span className="text-lg font-bold text-white">A</span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-sidebar-foreground">Aether Bank</span>
          <span className="text-xs text-muted-foreground">Platform</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((section, idx) => (
          <div key={section.title} className={idx === 0 ? "" : "mt-6"}>
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive
                          ? "text-sidebar-primary"
                          : "text-muted-foreground group-hover:text-sidebar-foreground"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Security Section */}
        {secondaryNavigation.map((section) => (
          <div key={section.title} className="mt-6">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive
                          ? "text-sidebar-primary"
                          : "text-muted-foreground group-hover:text-sidebar-foreground"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Bottom Navigation */}
        <div className="mt-6 pt-6 border-t border-sidebar-border">
          <div className="space-y-1">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive
                        ? "text-sidebar-primary"
                        : "text-muted-foreground group-hover:text-sidebar-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-500">
            <span className="text-sm font-medium text-white">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@skygenesisenterprise.com</p>
          </div>
          <button className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors">
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}
