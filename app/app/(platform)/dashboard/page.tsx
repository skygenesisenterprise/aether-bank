"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  Plus,
  Bell,
  Globe,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  PiggyBank,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const transactionVolumeData = [
  { date: "Lun", volume: 124000, transactions: 1240 },
  { date: "Mar", volume: 142000, transactions: 1420 },
  { date: "Mer", volume: 189000, transactions: 1890 },
  { date: "Jeu", volume: 161000, transactions: 1610 },
  { date: "Ven", volume: 215000, transactions: 2150 },
  { date: "Sam", volume: 193000, transactions: 1930 },
  { date: "Dim", volume: 156000, transactions: 1560 },
];

const accountTypeData = [
  { name: "Comptes Pro", value: 45, color: "#6366f1" },
  { name: "Comptes Particuliers", value: 30, color: "#8b5cf6" },
  { name: "Comptes Épargne", value: 15, color: "#06b6d4" },
  { name: "Comptes Joints", value: 10, color: "#10b981" },
];

const recentTransactions = [
  {
    id: 1,
    name: "Virement SEPA - TechCorp",
    amount: 24500.0,
    type: "credit",
    status: "completed",
    date: "Il y a 2min",
    account: "Compte Pro #1245",
  },
  {
    id: 2,
    name: "Paiement carte - AWS",
    amount: -189.99,
    type: "debit",
    status: "completed",
    date: "Il y a 15min",
    account: "Compte Pro #1245",
  },
  {
    id: 3,
    name: "Salaires Janvier",
    amount: -45000.0,
    type: "debit",
    status: "pending",
    date: "Il y a 1h",
    account: "Compte Pro #1245",
  },
  {
    id: 4,
    name: "Virement reçu - Client ABC",
    amount: 12500.0,
    type: "credit",
    status: "completed",
    date: "Il y a 2h",
    account: "Compte Pro #1245",
  },
  {
    id: 5,
    name: "Prélèvement EDF",
    amount: -245.0,
    type: "debit",
    status: "completed",
    date: "Il y a 4h",
    account: "Compte Particulier #7821",
  },
];

const recentClients = [
  { name: "SARL TechSolutions", type: "Entreprise", status: "verified", date: "Il y a 1h" },
  { name: "Marie Dupont", type: "Particulier", status: "verified", date: "Il y a 3h" },
  { name: "SAS InnovTech", type: "Entreprise", status: "pending", date: "Il y a 5h" },
  { name: "Jean Martin", type: "Particulier", status: "verified", date: "Il y a 6h" },
];

const alerts = [
  { type: "warning", message: "12 comptes nécessitent une vérification KYC", time: "Il y a 10min" },
  { type: "info", message: "Maintenance prévue ce soir à 23h00", time: "Il y a 2h" },
  { type: "success", message: "Reconciliation SEPA terminée", time: "Il y a 4h" },
];

const quickActions = [
  { label: "Nouveau client", href: "/platform/clients/new", icon: Plus, color: "bg-indigo-500" },
  {
    label: "Transactions",
    href: "/platform/transactions",
    icon: ArrowLeftRight,
    color: "bg-purple-500",
  },
  { label: "Alertes", href: "/platform/alerts", icon: Bell, color: "bg-orange-500" },
  { label: "Analytics", href: "/platform/analytics", icon: BarChart3, color: "bg-blue-500" },
];

const chartConfig = {
  volume: { label: "Volume (€)", color: "oklch(0.6 0.2 25)" },
  transactions: { label: "Transactions", color: "oklch(0.7 0.15 250)" },
};

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

export default function PlatformDashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Platform</h1>
          <p className="text-sm text-muted-foreground">
            Vue d&apos;ensemble de la plateforme Aether Bank
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="14d">14 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
            </SelectContent>
          </Select>
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

      {/* Stats Cards Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Clients</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,847</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% ce mois
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Comptes Actifs</CardDescription>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,293</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8.5% ce mois
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Transactions Jour</CardDescription>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124,847</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +15% ce mois
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Volume Total</CardDescription>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€4.2M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +22% ce mois
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards Row 2 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Cartes Émises</CardDescription>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,420</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% ce mois
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Virements SEPA</CardDescription>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2.8M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18% ce mois
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taux de Réussite</CardDescription>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.7%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +0.2% ce mois
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Épargne Totale</CardDescription>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€1.8M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +3.8% ce mois
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Transaction Volume Chart */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Volume des Transactions</CardTitle>
                <CardDescription>Volume et nombre de transactions cette semaine</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.15_250)]" />
                  <span className="text-muted-foreground">Transactions</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={transactionVolumeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-volume)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-volume)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="var(--color-volume)"
                  strokeWidth={2}
                  fill="url(#fillVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Account Distribution */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Répartition des Comptes</CardTitle>
                <CardDescription>Par type de compte</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={accountTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {accountTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {accountTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Transactions */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Transactions Récentes</CardTitle>
                <CardDescription>Dernières opérations sur la plateforme</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/platform/transactions" className="gap-1">
                  Voir tout
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 px-6 py-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600 rotate-45" />
                    ) : (
                      <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{transaction.name}</p>
                      {transaction.status === "pending" && (
                        <Badge variant="outline" className="text-[10px]">
                          En attente
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {transaction.account} • {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium text-sm ${transaction.type === "credit" ? "text-green-600" : ""}`}
                    >
                      {transaction.type === "credit" ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {transaction.status === "completed" ? "Validé" : "En attente"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Activity */}
        <div className="space-y-6 lg:col-span-3">
          {/* Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Alertes</CardTitle>
                  <CardDescription>Notifications importantes</CardDescription>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-600">
                  3 nouvelles
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 px-6 py-3">
                    <div
                      className={`mt-0.5 ${
                        alert.type === "warning"
                          ? "text-orange-500"
                          : alert.type === "success"
                            ? "text-green-500"
                            : "text-blue-500"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : alert.type === "success" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Activity className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Clients */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Nouveaux Clients</CardTitle>
                  <CardDescription>Inscriptions récentes</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/platform/clients" className="gap-1">
                    Voir tout
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center gap-3 px-6 py-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{client.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {client.type} • {client.date}
                      </p>
                    </div>
                    <Badge
                      variant={client.status === "verified" ? "default" : "secondary"}
                      className={client.status === "verified" ? "bg-green-100 text-green-700" : ""}
                    >
                      {client.status === "verified" ? "Vérifié" : "En attente"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
