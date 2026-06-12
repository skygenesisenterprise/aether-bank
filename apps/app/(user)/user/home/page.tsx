"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Send,
  Receipt,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const accounts = [
  {
    id: 1,
    name: "Compte professionnel",
    type: "Pro",
    balance: 24850.0,
    currency: "€",
    trend: "+2.4%",
    trendUp: true,
  },
  {
    id: 2,
    name: "Livret A",
    type: "Épargne",
    balance: 5200.0,
    currency: "€",
    trend: "+1.2%",
    trendUp: true,
  },
];

const recentTransactions = [
  {
    id: 1,
    name: "Facture #4829 - Client ABC",
    amount: 4500.0,
    type: "income",
    status: "completed",
    date: "Aujourd'hui",
    icon: ArrowDownLeft,
  },
  {
    id: 2,
    name: "Abonnement AWS",
    amount: -89.99,
    type: "expense",
    status: "completed",
    date: "Hier",
    icon: ArrowUpRight,
  },
  {
    id: 3,
    name: "Salaires - Janvier",
    amount: -12500.0,
    type: "expense",
    status: "completed",
    date: "28 Jan",
    icon: ArrowUpRight,
  },
  {
    id: 4,
    name: "Virement received - Pierre D.",
    amount: 2500.0,
    type: "income",
    status: "completed",
    date: "27 Jan",
    icon: ArrowDownLeft,
  },
  {
    id: 5,
    name: "Facture #4830 - Tech Corp",
    amount: 3200.0,
    type: "income",
    status: "pending",
    date: "26 Jan",
    icon: Clock,
  },
];

const upcomingBills = [
  { name: "Loyer bureau", amount: -2500.0, date: "01 Feb" },
  { name: "EDF", amount: -180.0, date: "05 Feb" },
  { name: "Abonnement Salesforce", amount: -120.0, date: "10 Feb" },
];

const quickActions = [
  { label: "Virement", href: "/user/transfers", icon: Send, color: "bg-indigo-500" },
  { label: "Nouvelle carte", href: "/user/cards", icon: CreditCard, color: "bg-purple-500" },
  { label: "Facture", href: "/user/invoices", icon: Receipt, color: "bg-blue-500" },
  { label: "Épargne", href: "/user/savings", icon: PiggyBank, color: "bg-green-500" },
];

const spendingCategories = [
  { category: "Fournisseurs", amount: 8450, color: "#6366f1", percent: 45 },
  { category: "Salaires", amount: 12500, color: "#8b5cf6", percent: 67 },
  { category: "Logiciels", amount: 2340, color: "#06b6d4", percent: 12 },
  { category: "Autres", amount: 450, color: "#9ca3af", percent: 2 },
];

export default function UserHomePage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-sm text-gray-500">Bienvenue sur votre espace Aether Bank</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            asChild
          >
            <Link href={action.href}>
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm">{action.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Accounts Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-gray-500">{account.name}</CardDescription>
                <Badge variant="secondary" className="text-xs">
                  {account.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    {account.balance.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
                  <div
                    className={`flex items-center text-sm ${account.trendUp ? "text-green-600" : "text-red-600"}`}
                  >
                    {account.trendUp ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {account.trend}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* Add Account Card */}
        <Card className="border-dashed hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-indigo-600">Ajouter un compte</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Transactions */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Transactions récentes</CardTitle>
                <CardDescription>Vos dernières opérations</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/user/transactions" className="gap-1">
                  Voir tout
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <transaction.icon
                      className={`w-5 h-5 ${transaction.type === "income" ? "text-green-600" : "text-gray-600"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {transaction.name}
                      </p>
                      {transaction.status === "pending" && (
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium text-sm ${
                        transaction.amount > 0 ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {transaction.status === "completed" ? "Validé" : "En attente"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-3">
          {/* Upcoming Bills */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">À payer bientôt</CardTitle>
                  <CardDescription>Échéances à venir</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingBills.map((bill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-900">{bill.name}</p>
                      <p className="text-xs text-gray-500">{bill.date}</p>
                    </div>
                    <span className="font-medium text-sm text-gray-900">
                      {bill.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spending Overview */}
          <Card>
            <CardHeader className="pb-3">
              <div>
                <CardTitle className="text-base">Répartition des dépenses</CardTitle>
                <CardDescription>Ce mois</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spendingCategories.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{cat.category}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {cat.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cards Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Mes cartes</CardTitle>
              <CardDescription>Vos cartes de paiement</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/user/cards" className="gap-1">
                Gérer mes cartes
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="relative group">
              <div className="aspect-[1.586/1] rounded-2xl bg-linear-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-8">
                  <div className="font-bold text-lg">Aether Bank</div>
                  <CreditCard className="w-6 h-6 opacity-80" />
                </div>
                <div className="space-y-4">
                  <div className="text-lg tracking-widest">•••• •••• •••• 4532</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] opacity-70">Titulaire</div>
                      <div className="text-sm font-medium">John Doe</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] opacity-70">Expire</div>
                      <div className="text-sm font-medium">12/28</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="gap-1">
                  Gérer
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Card 2 - Virtual */}
            <div className="relative group">
              <div className="aspect-[1.586/1] rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-8">
                  <div className="font-bold text-lg">Virtual</div>
                  <CreditCard className="w-6 h-6 opacity-80" />
                </div>
                <div className="space-y-4">
                  <div className="text-lg tracking-widest">•••• •••• •••• 7821</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] opacity-70">Titulaire</div>
                      <div className="text-sm font-medium">John Doe</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] opacity-70">Expire</div>
                      <div className="text-sm font-medium">06/26</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Card */}
            <Card className="aspect-[1.586/1] border-dashed hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-indigo-600">Commander une carte</span>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
