"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  BarChart3,
  Activity,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  Percent,
  PiggyBank,
  ShieldCheck,
  Target,
  Coins,
  CreditCard,
  Users,
  Globe,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthlyRevenueData = [
  { month: "Jan", revenue: 185000, expenses: 45000, profit: 140000 },
  { month: "Fév", revenue: 210000, expenses: 52000, profit: 158000 },
  { month: "Mar", revenue: 195000, expenses: 48000, profit: 147000 },
  { month: "Avr", revenue: 245000, expenses: 55000, profit: 190000 },
  { month: "Mai", revenue: 278000, expenses: 62000, profit: 216000 },
  { month: "Juin", revenue: 265000, expenses: 58000, profit: 207000 },
];

const transactionTypeData = [
  { name: "Virements SEPA", value: 42, color: "#6366f1" },
  { name: "Paiements Carte", value: 28, color: "#8b5cf6" },
  { name: "Prélèvements", value: 15, color: "#06b6d4" },
  { name: "Espèces", value: 10, color: "#10b981" },
  { name: "Chèques", value: 5, color: "#f59e0b" },
];

const dailyActivityData = [
  { hour: "00h", transactions: 120, volume: 15000 },
  { hour: "04h", transactions: 85, volume: 12000 },
  { hour: "08h", transactions: 450, volume: 85000 },
  { hour: "12h", transactions: 780, volume: 145000 },
  { hour: "16h", transactions: 920, volume: 168000 },
  { hour: "20h", transactions: 520, volume: 95000 },
  { hour: "24h", transactions: 180, volume: 28000 },
];

const accountGrowthData = [
  { month: "Jan", pro: 4200, particulier: 3100, epargne: 850 },
  { month: "Fév", pro: 4550, particulier: 3350, epargne: 920 },
  { month: "Mar", pro: 4900, particulier: 3600, epargne: 1050 },
  { month: "Avr", pro: 5350, particulier: 3950, epargne: 1180 },
  { month: "Mai", pro: 5800, particulier: 4300, epargne: 1320 },
  { month: "Juin", pro: 6250, particulier: 4650, epargne: 1450 },
];

const liquidityData = [
  { month: "Jan", liquidites: 2500000, reserves: 1800000 },
  { month: "Fév", liquidites: 2650000, reserves: 1920000 },
  { month: "Mar", liquidites: 2480000, reserves: 1850000 },
  { month: "Avr", liquidites: 2850000, reserves: 2100000 },
  { month: "Mai", liquidites: 3100000, reserves: 2250000 },
  { month: "Juin", liquidites: 2950000, reserves: 2180000 },
];

const creditPortfolioData = [
  { name: "Crédits Immobiliers", value: 45, color: "#6366f1" },
  { name: "Crédits Consommation", value: 25, color: "#8b5cf6" },
  { name: "Crédits Entreprises", value: 20, color: "#06b6d4" },
  { name: "Découverts", value: 10, color: "#f59e0b" },
];

const prudentialRatios = [
  { name: "Ratio CET1", value: 14.2, target: 10.5, unit: "%", status: "success" },
  { name: "Ratio de Liquidité (LCR)", value: 125, target: 100, unit: "%", status: "success" },
  { name: "Ratio de Leverage", value: 5.8, target: 3, unit: "%", status: "success" },
  { name: "NSFR", value: 112, target: 100, unit: "%", status: "success" },
  {
    name: "Taux de Créances Doubteuses",
    value: 2.1,
    target: 3,
    unit: "%",
    status: "success",
    invert: true,
  },
];

const regionalData = [
  { region: "Île-de-France", accounts: 8450, transactions: 245000, volume: 1250000 },
  { region: "Auvergne-Rhône-Alpes", accounts: 3250, transactions: 89000, volume: 420000 },
  { region: "Nouvelle-Aquitaine", accounts: 2180, transactions: 56000, volume: 280000 },
  { region: "Occitanie", accounts: 2050, transactions: 52000, volume: 255000 },
  { region: "PACA", accounts: 1980, transactions: 48000, volume: 235000 },
  { region: "Autres régions", accounts: 5380, transactions: 145000, volume: 680000 },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
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
            {entry.name.includes("Volume") ||
            entry.name.includes("revenue") ||
            entry.name.includes("profit") ||
            entry.name.includes("liquidites") ||
            entry.name.includes("reserves") ||
            entry.name.includes("expenses")
              ? formatCurrency(entry.value)
              : entry.value.toLocaleString("fr-FR")}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PlatformAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");
  const [region, setRegion] = useState("all");

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">
              <BarChart3 className="h-3 w-3 mr-1" />
              Analyse bancaire
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Analyse approfondie de la performance et de la santé financière d&apos;Aether Bank
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-44 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les régions</SelectItem>
              <SelectItem value="idf">Île-de-France</SelectItem>
              <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
              <SelectItem value="naq">Nouvelle-Aquitaine</SelectItem>
              <SelectItem value="occ">Occitanie</SelectItem>
              <SelectItem value="paca">PACA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-44 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="1m">1 mois</SelectItem>
              <SelectItem value="3m">3 derniers mois</SelectItem>
              <SelectItem value="6m">6 derniers mois</SelectItem>
              <SelectItem value="1y">Année complète</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards Financiers */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium">
                Revenus Mensuels
              </CardDescription>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                <DollarSign className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">€1.64M</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+18.2%</span>
              <span className="text-gray-500 dark:text-gray-400">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
                Marge Brute
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <Percent className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">78.4%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+2.1%</span>
              <span className="text-gray-500 dark:text-gray-400">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">
                Panier Moyen
              </CardDescription>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">€145.20</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
              <TrendingDown className="h-3 w-3" />
              <span className="font-semibold">-3.2%</span>
              <span className="text-gray-500 dark:text-gray-400">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-cyan-700 dark:text-cyan-300 font-medium">
                Taux de Conversion
              </CardDescription>
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                <Target className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">4.8%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+0.6%</span>
              <span className="text-gray-500 dark:text-gray-400">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Bancaires Secondaires */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Encours Crédits</CardDescription>
              <Landmark className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€12.8M</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +6.4% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Collecte Épargne</CardDescription>
              <PiggyBank className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€8.4M</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +3.8% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Produit Net Bancaire</CardDescription>
              <Coins className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€945K</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Coût du Risque</CardDescription>
              <ShieldCheck className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">0.18%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingDown className="h-3 w-3" />
              -0.05% ce mois
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 - Revenus & Types */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Revenus vs Profits</CardTitle>
                <CardDescription>Évolution mensuelle</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
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
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenus"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Profits"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Types */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Types de Transactions</CardTitle>
                <CardDescription>Répartition par opération</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={transactionTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {transactionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 flex-1">
                {transactionTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 - Activité & Croissance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Activité Horaire</CardTitle>
                <CardDescription>Transactions et volume par heure</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={dailyActivityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="transactions"
                  name="Transactions"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="volume"
                  name="Volume (€)"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Account Growth */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Croissance des Comptes</CardTitle>
                <CardDescription>Évolution par type</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={accountGrowthData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => formatNumber(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pro"
                  name="Comptes Pro"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="particulier"
                  name="Particuliers"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="epargne"
                  name="Épargne"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 - Liquidité & Ratios Prudentiels */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Liquidity */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Liquidité & Réserves</CardTitle>
                <CardDescription>Évolution des liquidités disponibles</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span className="text-gray-600 dark:text-gray-400">Liquidités</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-400">Réserves</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={liquidityData}>
                <defs>
                  <linearGradient id="fillLiq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="liquidites"
                  name="Liquidités"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#fillLiq)"
                />
                <Area
                  type="monotone"
                  dataKey="reserves"
                  name="Réserves"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#fillRes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Credit Portfolio */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Portefeuille Crédits</CardTitle>
                <CardDescription>Répartition par type</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={creditPortfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {creditPortfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {creditPortfolioData.map((item) => (
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

      {/* Prudential Ratios */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Ratios Prudentiels</CardTitle>
              <CardDescription>Indicateurs réglementaires Bâle III</CardDescription>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Tous conformes
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {prudentialRatios.map((ratio) => (
              <div
                key={ratio.name}
                className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {ratio.name}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ratio.value}
                  {ratio.unit}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      Objectif: {ratio.target}
                      {ratio.unit}
                    </span>
                    <span
                      className={
                        ratio.status === "success"
                          ? "text-emerald-600 font-semibold"
                          : "text-amber-600 font-semibold"
                      }
                    >
                      {ratio.invert
                        ? ratio.value <= ratio.target
                          ? "Conforme"
                          : "Alerte"
                        : ratio.value >= ratio.target
                          ? "Conforme"
                          : "Alerte"}
                    </span>
                  </div>
                  <Progress
                    value={
                      ratio.invert
                        ? Math.max(0, 100 - (ratio.value / ratio.target) * 100)
                        : Math.min(100, (ratio.value / ratio.target) * 100)
                    }
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Data */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Répartition Régionale</CardTitle>
              <CardDescription>Activité par région géographique</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={regionalData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => formatNumber(value)}
              />
              <YAxis
                type="category"
                dataKey="region"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="accounts" name="Comptes" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
