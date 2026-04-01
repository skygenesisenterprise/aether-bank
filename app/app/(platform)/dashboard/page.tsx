"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
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
  Clock,
  ShieldCheck,
  Zap,
  Eye,
  MoreHorizontal,
  Download,
  RefreshCw,
  Target,
  Award,
  AlertTriangle,
  Info,
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
  Tooltip,
  Bar,
  BarChart,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  {
    label: "Nouveau client",
    href: "/dashboard/clients",
    icon: Plus,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    label: "Nouveau virement",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    color: "from-purple-500 to-purple-600",
  },
  {
    label: "Alertes",
    href: "/dashboard/notifications",
    icon: Bell,
    color: "from-amber-500 to-amber-600",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    color: "from-cyan-500 to-cyan-600",
  },
];

const cardActivityData = [
  { month: "Jan", issued: 420, active: 380 },
  { month: "Fév", issued: 480, active: 430 },
  { month: "Mar", issued: 510, active: 470 },
  { month: "Avr", issued: 550, active: 510 },
  { month: "Mai", issued: 620, active: 580 },
  { month: "Juin", issued: 680, active: 640 },
];

const complianceData = [
  { name: "KYC Vérifiés", value: 94, target: 95, status: "warning" },
  { name: "AML Conformité", value: 98, target: 95, status: "success" },
  { name: "Documents Validés", value: 87, target: 90, status: "warning" },
  { name: "Audits Réussis", value: 100, target: 95, status: "success" },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-3">
        <p className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            {entry.name.includes("Volume") || entry.name.includes("volume")
              ? formatCurrency(entry.value)
              : entry.value.toLocaleString("fr-FR")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PlatformDashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
              <Zap className="h-3 w-3 mr-1" />
              En direct
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vue d&apos;ensemble complète de l&apos;activité Aether Bank
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-44 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  {action.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Accès rapide</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* KPI Cards Principaux */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium">
                Total Clients
              </CardDescription>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">24,847</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+12%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">
                Comptes Actifs
              </CardDescription>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">18,293</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+8.5%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-cyan-700 dark:text-cyan-300 font-medium">
                Transactions Jour
              </CardDescription>
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                <ArrowLeftRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">124,847</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+15%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
                Volume Total
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">€4.2M</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+22%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards Secondaires */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Cartes Émises</CardDescription>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">8,420</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Virements SEPA</CardDescription>
              <Globe className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€2.8M</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taux de Réussite</CardDescription>
              <Activity className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">99.7%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +0.2% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Épargne Totale</CardDescription>
              <PiggyBank className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€1.8M</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +3.8% ce mois
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Transaction Volume Chart */}
        <Card className="lg:col-span-4 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Volume des Transactions</CardTitle>
                <CardDescription>Évolution cette semaine</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span className="text-gray-600 dark:text-gray-400">Volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                  <span className="text-gray-600 dark:text-gray-400">Transactions</span>
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
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  name="Volume (€)"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#fillVolume)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Account Distribution */}
        <Card className="lg:col-span-3 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Répartition des Comptes</CardTitle>
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
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {accountTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {accountTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Compliance Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Card Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Activité Cartes</CardTitle>
                <CardDescription>Émissions vs actives</CardDescription>
              </div>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cardActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                <Tooltip />
                <Bar dataKey="issued" name="Émises" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active" name="Actives" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Conformité</CardTitle>
                <CardDescription>Indicateurs réglementaires</CardDescription>
              </div>
              <ShieldCheck className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                  <span
                    className={`text-sm font-semibold ${item.value >= item.target ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Score */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-white">
                  Score Performance
                </CardTitle>
                <CardDescription className="text-indigo-200">Global ce mois</CardDescription>
              </div>
              <Award className="h-5 w-5 text-indigo-200" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold">94</div>
              <div className="text-sm text-indigo-200 mt-1">/ 100 points</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Uptime</span>
                <span className="font-semibold">99.9%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Satisfaction</span>
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Temps réponse</span>
                <span className="font-semibold">120ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions & Alerts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Transactions */}
        <Card className="lg:col-span-4 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Transactions Récentes</CardTitle>
                <CardDescription>Dernières opérations</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/transactions" className="gap-1">
                  Voir tout
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === "credit"
                        ? "bg-emerald-100 dark:bg-emerald-900/30"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowLeftRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {transaction.name}
                      </p>
                      {transaction.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-amber-50 text-amber-700 border-amber-200"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          En attente
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.account} • {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${transaction.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                    >
                      {transaction.type === "credit" ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
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
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Alertes</CardTitle>
                  <CardDescription>Notifications importantes</CardDescription>
                </div>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                  3 nouvelles
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className={`mt-0.5 p-1.5 rounded-lg ${
                        alert.type === "warning"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          : alert.type === "success"
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : alert.type === "success" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Clients */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Nouveaux Clients</CardTitle>
                  <CardDescription>Inscriptions récentes</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/clients" className="gap-1">
                    Voir tout
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentClients.map((client, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {client.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {client.type} • {client.date}
                      </p>
                    </div>
                    <Badge
                      className={
                        client.status === "verified"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0"
                      }
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
