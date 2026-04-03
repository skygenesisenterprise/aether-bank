"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Wallet,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  Plus,
  Bell,
  BarChart3,
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  Download,
  RefreshCw,
  Award,
  AlertTriangle,
  Info,
  CheckCircle,
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
} from "recharts";

import { accountsApi, cardsApi } from "@/lib/api/client";
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

interface Transaction {
  id: string;
  account_id: string;
  type: string;
  status: string;
  amount: number;
  currency: string;
  description: string;
  reference?: string;
  counterparty_name?: string;
  merchant_name?: string;
  created_at: string;
}

interface DashboardStats {
  totalAccounts: number;
  activeAccounts: number;
  totalBalance: number;
  totalCards: number;
  activeCards: number;
  pendingCards: number;
  blockedCards: number;
  transactionsToday: number;
  volumeToday: number;
  transactionsPending: number;
}

function formatCurrency(amount: number, currency: string = "EUR") {
  return (amount / 100).toLocaleString("fr-FR", { style: "currency", currency });
}

function formatAmount(amount: number) {
  return (amount / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes}min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-3">
        <p className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatAmount(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PlatformDashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalAccounts: 0,
    activeAccounts: 0,
    totalBalance: 0,
    totalCards: 0,
    activeCards: 0,
    pendingCards: 0,
    blockedCards: 0,
    transactionsToday: 0,
    volumeToday: 0,
    transactionsPending: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [volumeData, setVolumeData] = useState<
    { date: string; volume: number; transactions: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [accountsRes, cardsRes, transactionsRes] = await Promise.allSettled([
        accountsApi.list(),
        cardsApi.list(),
        fetch("/api/v1/transactions?limit=10").then((r) => r.json()),
      ]);

      const accounts =
        accountsRes.status === "fulfilled" && accountsRes.value?.success
          ? Array.isArray(accountsRes.value.data)
            ? accountsRes.value.data
            : (accountsRes.value.data as any)?.data || []
          : [];

      const cards =
        cardsRes.status === "fulfilled" && cardsRes.value?.success
          ? Array.isArray(cardsRes.value.data)
            ? cardsRes.value.data
            : (cardsRes.value.data as any)?.data || []
          : [];

      const transactions =
        transactionsRes.status === "fulfilled" && transactionsRes.value?.success
          ? (transactionsRes.value.data as any)?.data?.transactions || []
          : [];

      const activeAccounts = accounts.filter((a: any) => a.status === "active").length;
      const totalBalance = accounts.reduce((sum: number, a: any) => {
        const bal = typeof a.balance === "number" ? a.balance : (a.balance as any)?.current || 0;
        return sum + bal;
      }, 0);

      const activeCards = cards.filter((c: any) => c.status === "active").length;
      const pendingCards = cards.filter((c: any) => c.status === "pending").length;
      const blockedCards = cards.filter(
        (c: any) => c.status === "blocked" || c.status === "frozen"
      ).length;

      const today = new Date().toISOString().split("T")[0];
      const todayTransactions = transactions.filter(
        (t: Transaction) => t.created_at && t.created_at.startsWith(today)
      );
      const volumeToday = todayTransactions.reduce(
        (sum: number, t: Transaction) => sum + Math.abs(t.amount),
        0
      );

      setStats({
        totalAccounts: accounts.length,
        activeAccounts,
        totalBalance,
        totalCards: cards.length,
        activeCards,
        pendingCards,
        blockedCards,
        transactionsToday: todayTransactions.length,
        volumeToday,
        transactionsPending: transactions.filter((t: Transaction) => t.status === "pending").length,
      });

      setRecentTransactions(transactions.slice(0, 8));

      const mockVolumeData = [
        {
          date: "Lun",
          volume: 12400000 + Math.random() * 2000000,
          transactions: 1240 + Math.floor(Math.random() * 200),
        },
        {
          date: "Mar",
          volume: 14200000 + Math.random() * 2000000,
          transactions: 1420 + Math.floor(Math.random() * 200),
        },
        {
          date: "Mer",
          volume: 18900000 + Math.random() * 2000000,
          transactions: 1890 + Math.floor(Math.random() * 200),
        },
        {
          date: "Jeu",
          volume: 16100000 + Math.random() * 2000000,
          transactions: 1610 + Math.floor(Math.random() * 200),
        },
        {
          date: "Ven",
          volume: 21500000 + Math.random() * 2000000,
          transactions: 2150 + Math.floor(Math.random() * 200),
        },
        {
          date: "Sam",
          volume: 19300000 + Math.random() * 2000000,
          transactions: 1930 + Math.floor(Math.random() * 200),
        },
        {
          date: "Dim",
          volume: 15600000 + Math.random() * 2000000,
          transactions: 1560 + Math.floor(Math.random() * 200),
        },
      ];
      setVolumeData(mockVolumeData);
    } catch (err) {
      console.error("[ERROR] Failed to fetch dashboard data:", err);
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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

  const alerts = [
    {
      type: "warning",
      message: `${stats.pendingCards} cartes en attente d'activation`,
      time: "Il y a 10min",
    },
    {
      type: "info",
      message: `${stats.transactionsPending} transactions en attente de validation`,
      time: "Il y a 2h",
    },
    { type: "success", message: "Tous les systèmes opérationnels", time: "Il y a 4h" },
  ];

  const complianceData = [
    {
      name: "Comptes Actifs",
      value: Math.round((stats.activeAccounts / Math.max(stats.totalAccounts, 1)) * 100),
      target: 95,
      status:
        stats.activeAccounts / Math.max(stats.totalAccounts, 1) >= 0.95 ? "success" : "warning",
    },
    {
      name: "Cartes Valides",
      value: Math.round((stats.activeCards / Math.max(stats.totalCards, 1)) * 100),
      target: 90,
      status: stats.activeCards / Math.max(stats.totalCards, 1) >= 0.9 ? "success" : "warning",
    },
    { name: "Transactions OK", value: 99, target: 98, status: "success" },
    { name: "Audits Réussis", value: 100, target: 95, status: "success" },
  ];

  const accountTypeData = [
    { name: "Comptes Pro", value: 45, color: "#6366f1" },
    { name: "Particuliers", value: 30, color: "#8b5cf6" },
    { name: "Épargne", value: 15, color: "#06b6d4" },
    { name: "Joints", value: 10, color: "#10b981" },
  ];

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
          <Button variant="outline" onClick={fetchDashboardData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
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
              <div className={`p-3 rounded-xl bg-linear-to-br ${action.color} shadow-lg`}>
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

      {/* Error Banner */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchDashboardData} className="ml-auto">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards Principaux */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium">
                Total Comptes
              </CardDescription>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                <Wallet className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : formatNumber(stats.totalAccounts)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+{stats.activeAccounts}</span>
              <span className="text-gray-500 dark:text-gray-400">actifs</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">
                Volume Total
              </CardDescription>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : formatCurrency(stats.totalBalance)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">Solde global</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : formatNumber(stats.transactionsToday)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">{formatCurrency(stats.volumeToday)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
                Cartes Actives
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.activeCards}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">{stats.pendingCards}</span>
              <span className="text-gray-500 dark:text-gray-400">en attente</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards Secondaires */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>En Attente</CardDescription>
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.transactionsPending}
            </div>
            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
              <AlertTriangle className="h-3 w-3" />À valider
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Cartes Bloquées</CardDescription>
              <CreditCard className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.blockedCards}
            </div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <AlertTriangle className="h-3 w-3" />
              Action requise
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Taux d&apos;Activité</CardDescription>
              <Activity className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLoading
                ? "..."
                : `${Math.round((stats.activeAccounts / Math.max(stats.totalAccounts, 1)) * 100)}%`}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              Comptes actifs
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Cartes</CardDescription>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.totalCards}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <TrendingUp className="h-3 w-3" />
              Émises
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
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
              <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
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

        <Card className="lg:col-span-3 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Répartition des Comptes</CardTitle>
              <CardDescription>Par type de compte</CardDescription>
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

        <Card className="border-0 shadow-sm bg-linear-to-br from-indigo-600 to-purple-700 text-white">
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
              <div className="text-5xl font-bold">
                {Math.round((stats.activeAccounts / Math.max(stats.totalAccounts, 1)) * 100)}
              </div>
              <div className="text-sm text-indigo-200 mt-1">/ 100 points</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Comptes Actifs</span>
                <span className="font-semibold">
                  {Math.round((stats.activeAccounts / Math.max(stats.totalAccounts, 1)) * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Cartes Valides</span>
                <span className="font-semibold">
                  {Math.round((stats.activeCards / Math.max(stats.totalCards, 1)) * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Transactions OK</span>
                <span className="font-semibold">99%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Alertes</CardTitle>
                <CardDescription>Notifications importantes</CardDescription>
              </div>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                {alerts.length} nouvelles
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
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-7 border-0 shadow-sm">
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
              {recentTransactions.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <ArrowLeftRight className="h-8 w-8 mb-2" />
                  <p>Aucune transaction récente</p>
                </div>
              ) : recentTransactions.length === 0 && isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                ))
              ) : (
                recentTransactions.map((transaction) => (
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
                          {transaction.description ||
                            transaction.counterparty_name ||
                            transaction.merchant_name ||
                            "Transaction"}
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
                        {transaction.counterparty_name ||
                          transaction.merchant_name ||
                          transaction.reference ||
                          ""}{" "}
                        • {formatTimeAgo(transaction.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-sm ${transaction.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatAmount(Math.abs(transaction.amount))}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {transaction.status === "completed" ? "Validé" : transaction.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
