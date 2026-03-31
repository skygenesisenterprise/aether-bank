"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Send,
  Landmark,
  Receipt,
  TrendingUp,
  Users,
  Settings,
  HelpCircle,
  PiggyBank,
  Shield,
  Wallet,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Tableau de bord",
    href: "/user/home",
    icon: LayoutDashboard,
  },
  {
    title: "Comptes",
    href: "/user/account",
    icon: Landmark,
  },
  {
    title: "Cartes",
    href: "/user/cards",
    icon: CreditCard,
  },
  {
    title: "Virements",
    href: "/user/transfers",
    icon: Send,
  },
  {
    title: "Transactions",
    href: "/user/transactions",
    icon: Receipt,
  },
  {
    title: "Épargne",
    href: "/user/savings",
    icon: PiggyBank,
  },
  {
    title: "Crédit",
    href: "/user/credit",
    icon: Wallet,
  },
  {
    title: "Gestion",
    href: "/user/management",
    icon: TrendingUp,
  },
  {
    title: "Équipe",
    href: "/user/team",
    icon: Users,
  },
];

const bottomItems = [
  {
    title: "Sécurité",
    href: "/user/security",
    icon: Shield,
  },
  {
    title: "Paramètres",
    href: "/user/settings",
    icon: Settings,
  },
  {
    title: "Aide",
    href: "/user/help",
    icon: HelpCircle,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Link href="/user/home" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-gray-900">Aether Bank</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-gray-400")}
                />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-gray-400")}
                  />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
            <div className="text-xs text-gray-500 truncate">john@example.com</div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
