"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Wallet,
  Plus,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  User,
  CreditCard,
  PiggyBank,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowLeftRight,
  BarChart3,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Info,
  Zap,
  Eye,
  Download,
  RefreshCw,
  FileText,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { accountsApi, BankAccount, getBalance, getAvailableBalance } from "@/lib/api/client";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const clients = [
  { id: 1, name: "SARL TechSolutions", type: "Entreprise" },
  { id: 2, name: "Marie Dupont", type: "Particulier" },
  { id: 3, name: "SAS InnovTech", type: "Entreprise" },
  { id: 4, name: "Jean Martin", type: "Particulier" },
  { id: 5, name: "EURL Boulanger", type: "Entreprise" },
  { id: 6, name: "Sophie Bernard", type: "Particulier" },
];

const bankInternalAccounts = [
  { id: 101, name: "Réserve Obligatoire BCE", type: "Compte Réserve", category: "Banque" },
  { id: 102, name: "Fonds Propres Tier 1", type: "Compte Capital", category: "Banque" },
  { id: 103, name: "Réserve Liquidités", type: "Compte Réserve", category: "Banque" },
  { id: 104, name: "Compte Opérationnel EUR", type: "Compte Opérationnel", category: "Banque" },
  { id: 105, name: "Fonds Garants Dépôts", type: "Compte Garanti", category: "Banque" },
];

const bankAccountTypeOptions = [
  { value: "Compte Réserve", description: "Réserves réglementaires et liquidités" },
  { value: "Compte Capital", description: "Fonds propres et capital" },
  { value: "Compte Opérationnel", description: "Opérations quotidiennes" },
  { value: "Compte Garanti", description: "Fonds de garantie dépôts" },
  { value: "Compte Correspondant", description: "Relations interbancaires" },
];

const accountTypeData = [
  { name: "Comptes Courants", value: 40, color: "#6366f1" },
  { name: "Comptes Épargne", value: 20, color: "#06b6d4" },
  { name: "Comptes Pro", value: 12, color: "#8b5cf6" },
  { name: "Comptes Joints", value: 8, color: "#10b981" },
  { name: "Comptes Banque", value: 20, color: "#f59e0b" },
];

const accountVolumeData = [
  { month: "Jan", comptes: 145, volume: 2.8 },
  { month: "Fév", comptes: 158, volume: 3.1 },
  { month: "Mar", comptes: 172, volume: 3.4 },
  { month: "Avr", comptes: 185, volume: 3.6 },
  { month: "Mai", comptes: 198, volume: 3.9 },
  { month: "Juin", comptes: 210, volume: 4.2 },
];

const accountStatusData = [
  { name: "Actifs", value: 10, color: "#10b981" },
  { name: "En Attente", value: 1, color: "#f59e0b" },
  { name: "Bloqués", value: 1, color: "#ef4444" },
];

const recentAccounts = [
  { id: 1, name: "SARL TechSolutions", type: "Compte Pro", status: "active", date: "Il y a 1j" },
  { id: 2, name: "Marie Dupont", type: "Compte Particulier", status: "active", date: "Il y a 3j" },
  { id: 3, name: "SAS InnovTech", type: "Compte Pro", status: "pending", date: "Il y a 6h" },
  { id: 4, name: "EURL Boulanger", type: "Compte Pro", status: "active", date: "Il y a 2sem" },
];

const accountAlerts = [
  { type: "warning", message: "2 comptes en découverte non autorisé", time: "Il y a 15min" },
  { type: "info", message: "1 compte en attente d'activation depuis 48h", time: "Il y a 2h" },
  { type: "success", message: "5 nouveaux comptes ouverts ce matin", time: "Il y a 4h" },
];

const quickActions = [
  {
    label: "Nouveau compte",
    href: "#",
    icon: Plus,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    label: "Virements",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    color: "from-purple-500 to-purple-600",
  },
  {
    label: "Rapports",
    href: "/dashboard/analytics",
    icon: BarChart3,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    label: "Conformité",
    href: "/dashboard/compliance",
    icon: ShieldCheck,
    color: "from-emerald-500 to-emerald-600",
  },
];

const complianceData = [
  { name: "KYC Complets", value: 94, target: 95 },
  { name: "Documents Valides", value: 87, target: 90 },
  { name: "Comptes Vérifiés", value: 96, target: 95 },
  { name: "Audits Réussis", value: 100, target: 95 },
];

function formatCurrency(amount: number, currency: string = "EUR") {
  return amount.toLocaleString("fr-FR", { style: "currency", currency });
}

function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Compte Courant":
      return <CreditCard className="h-4 w-4" />;
    case "Livret Épargne":
      return <PiggyBank className="h-4 w-4" />;
    case "Compte Joint":
      return <Users className="h-4 w-4" />;
    case "Compte Réserve":
      return <ShieldCheck className="h-4 w-4" />;
    case "Compte Capital":
      return <DollarSign className="h-4 w-4" />;
    case "Compte Opérationnel":
      return <Activity className="h-4 w-4" />;
    default:
      return <Wallet className="h-4 w-4" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
          <CheckCircle className="w-3 h-3 mr-1" />
          Actif
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "blocked":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
          <XCircle className="w-3 h-3 mr-1" />
          Bloqué
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-3">
        <p className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            {entry.name.includes("Volume") ? formatCurrency(entry.value * 1000000) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AccountsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isOpenAccountOpen, setIsOpenAccountOpen] = useState(false);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newAccount, setNewAccount] = useState({
    category: "client",
    clientId: "",
    bankAccountType: "Compte Opérationnel",
    accountType: "Compte Courant",
    currency: "EUR",
    overdraft: false,
    overdraftLimit: 0,
    accountName: "",
    initialBalance: 0,
  });

  const filteredAccounts = accounts.filter((account) => {
    const name = account.name || account.holder?.name || "";
    const owner = account.owner || account.holder?.name || "";
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (account.iban || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    const matchesType = typeFilter === "all" || account.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || account.owner_category === categoryFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  });

  const stats = {
    total: accounts.length,
    totalClients: accounts.filter(
      (a) => (a.owner_category || a.holder?.type) === "client" || a.holder?.type === "individual"
    ).length,
    totalBank: accounts.filter((a) => a.owner_category === "bank").length,
    active: accounts.filter((a) => a.status === "active").length,
    pending: accounts.filter((a) => a.status === "pending").length,
    blocked: accounts.filter((a) => a.status === "blocked").length,
    totalBalance: accounts.reduce((sum, a) => sum + getBalance(a), 0),
    totalAvailable: accounts.reduce((sum, a) => sum + getAvailableBalance(a), 0),
    bankBalance: accounts
      .filter((a) => a.owner_category === "bank")
      .reduce((sum, a) => sum + getBalance(a), 0),
    clientBalance: accounts
      .filter(
        (a) =>
          a.owner_category === "client" ||
          a.holder?.type === "individual" ||
          a.holder?.type === "business"
      )
      .reduce((sum, a) => sum + getBalance(a), 0),
  };

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await accountsApi.list({
        status: statusFilter !== "all" ? statusFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        search: searchQuery || undefined,
      });
      console.log("[DEBUG] List accounts response:", response);
      if (response && response.success && response.data) {
        const accountsData = Array.isArray(response.data)
          ? response.data
          : (response.data as any).data || [];
        console.log("[DEBUG] Accounts data:", accountsData);
        console.log("[DEBUG] First account balance:", accountsData[0]?.balance);
        setAccounts(accountsData);
      } else {
        setError(response?.error || "Failed to fetch accounts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, typeFilter, categoryFilter, searchQuery]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gestion des Comptes
            </h1>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
              <Zap className="h-3 w-3 mr-1" />
              En direct
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vue d&apos;ensemble de tous les comptes bancaires Aether Bank
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
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
              <SelectItem value="1y">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAccounts} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+12%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
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
              €{formatNumber(stats.totalBalance / 1000)}K
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+8.5%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-cyan-700 dark:text-cyan-300 font-medium">
                Actifs
              </CardDescription>
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.active}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>{Math.round((stats.active / stats.total) * 100)}% du total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
                En Attente
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pending}</div>
            <div className="flex items-center gap-1 text-xs text-amber-600 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-semibold">Attention requise</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Solde Disponible</CardDescription>
              <ArrowDownLeft className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.totalAvailable)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Volume Clients</CardDescription>
              <Building className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.clientBalance)}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              {stats.totalClients} comptes clients
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-amber-700 dark:text-amber-300 font-medium">
                Volume Banque
              </CardDescription>
              <ShieldCheck className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {formatCurrency(stats.bankBalance)}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              {stats.totalBank} comptes internes
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Comptes Bloqués</CardDescription>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.blocked}</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <AlertTriangle className="h-3 w-3" />
              Action requise
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Évolution des Comptes</CardTitle>
                <CardDescription>Nouveaux comptes ouverts et volume par mois</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span className="text-gray-600 dark:text-gray-400">Comptes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-400">Volume (M€)</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={accountVolumeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillComptes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
                  tickFormatter={(value) => `${value}M€`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="comptes"
                  name="Comptes"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#fillComptes)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="volume"
                  name="Volume (M€)"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Répartition par Type</CardTitle>
                <CardDescription>Distribution des comptes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={accountTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
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
            <div className="space-y-2 mt-2">
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Statut des Comptes</CardTitle>
                <CardDescription>Répartition par statut</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={accountStatusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  width={80}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {accountStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                <CardTitle className="text-lg font-semibold text-white">Score Santé</CardTitle>
                <CardDescription className="text-indigo-200">Globale des comptes</CardDescription>
              </div>
              <ShieldCheck className="h-5 w-5 text-indigo-200" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold">96</div>
              <div className="text-sm text-indigo-200 mt-1">/ 100 points</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Taux d&apos;actifs</span>
                <span className="font-semibold">
                  {Math.round((stats.active / stats.total) * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Conformité KYC</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-200">Docs validés</span>
                <span className="font-semibold">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Liste des Comptes</CardTitle>
                <CardDescription>Tous les comptes bancaires et internes</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                    <SelectItem value="bank">Banque</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="blocked">Bloqué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Compte
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Titulaire
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Type
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Statut
                    </th>
                    <th className="text-right p-4 font-medium text-gray-600 dark:text-gray-400">
                      Solde
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                          <p className="text-sm text-gray-500">Chargement des comptes...</p>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <AlertCircle className="h-8 w-8 text-red-500" />
                          <p className="text-sm text-red-600">{error}</p>
                          <Button variant="outline" size="sm" onClick={fetchAccounts}>
                            Réessayer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Wallet className="h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-500">Aucun compte trouvé</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.slice(0, 8).map((account) => (
                      <tr
                        key={account.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                account.owner_category === "bank"
                                  ? "bg-amber-100 dark:bg-amber-900/30"
                                  : "bg-indigo-100 dark:bg-indigo-900/30"
                              }`}
                            >
                              {getTypeIcon(account.type || "default")}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-gray-900 dark:text-white">
                                {account.name || "Compte"}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(account.iban || "").slice(-8)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {account.owner_category === "bank" ? (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
                              >
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                {account.owner_type}
                              </Badge>
                            ) : account.owner_type === "Entreprise" ? (
                              <Building className="h-4 w-4 text-gray-400" />
                            ) : (
                              <User className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {account.owner}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">
                            {account.type || "Compte Courant"}
                          </Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(account.status)}</td>
                        <td className="p-4 text-right">
                          <p
                            className={`font-semibold text-sm ${getBalance(account) < 0 ? "text-red-600" : "text-gray-900 dark:text-white"}`}
                          >
                            {formatCurrency(getBalance(account), account.currency)}
                          </p>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/accounts/${account.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir détails
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Opérations
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Bloquer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/dashboard/accounts">
                  Voir tous les {filteredAccounts.length} comptes
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Alertes Comptes</CardTitle>
                  <CardDescription>Notifications importantes</CardDescription>
                </div>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                  {accountAlerts.length} nouvelles
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {accountAlerts.map((alert, index) => (
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

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Comptes Récents</CardTitle>
                  <CardDescription>Dernières ouvertures</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/accounts" className="gap-1">
                    Voir tout
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {account.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{account.type}</p>
                    </div>
                    <Badge
                      className={
                        account.status === "active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0"
                      }
                    >
                      {account.status === "active" ? "Actif" : "En attente"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isOpenAccountOpen} onOpenChange={setIsOpenAccountOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer un nouveau compte</DialogTitle>
            <DialogDescription>
              {newAccount.category === "client"
                ? "Ouvrir un compte pour un client existant."
                : "Créer un compte interne à la banque."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Catégorie de compte</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={newAccount.category === "client" ? "default" : "outline"}
                  className={`h-20 flex flex-col items-center justify-center gap-2 ${
                    newAccount.category === "client" ? "bg-indigo-600 hover:bg-indigo-700" : ""
                  }`}
                  onClick={() => setNewAccount({ ...newAccount, category: "client" })}
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">Compte Client</span>
                </Button>
                <Button
                  variant={newAccount.category === "bank" ? "default" : "outline"}
                  className={`h-20 flex flex-col items-center justify-center gap-2 ${
                    newAccount.category === "bank" ? "bg-amber-600 hover:bg-amber-700" : ""
                  }`}
                  onClick={() => setNewAccount({ ...newAccount, category: "bank" })}
                >
                  <ShieldCheck className="h-6 w-6" />
                  <span className="text-sm font-medium">Compte Banque</span>
                </Button>
              </div>
            </div>

            {newAccount.category === "client" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select
                    value={newAccount.clientId}
                    onValueChange={(value) => setNewAccount({ ...newAccount, clientId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name} ({client.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountType">Type de compte</Label>
                  <Select
                    value={newAccount.accountType}
                    onValueChange={(value) => setNewAccount({ ...newAccount, accountType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compte Courant">Compte Courant</SelectItem>
                      <SelectItem value="Livret Épargne">Livret Épargne</SelectItem>
                      <SelectItem value="Compte Joint">Compte Joint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select
                    value={newAccount.currency}
                    onValueChange={(value) => setNewAccount({ ...newAccount, currency: value })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="USD">USD - Dollar US</SelectItem>
                      <SelectItem value="GBP">GBP - Livre Sterling</SelectItem>
                      <SelectItem value="CHF">CHF - Franc Suisse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initialBalance">Solde Initial</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {newAccount.currency === "EUR"
                        ? "€"
                        : newAccount.currency === "USD"
                          ? "$"
                          : newAccount.currency === "GBP"
                            ? "£"
                            : "CHF"}
                    </span>
                    <Input
                      id="initialBalance"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.initialBalance || ""}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          initialBalance: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Attribution d'un solde initial au compte (donnée comptable)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="overdraft"
                    checked={newAccount.overdraft}
                    onCheckedChange={(checked) =>
                      setNewAccount({ ...newAccount, overdraft: checked as boolean })
                    }
                  />
                  <Label htmlFor="overdraft" className="font-normal">
                    Autoriser le découvert
                  </Label>
                </div>

                {newAccount.overdraft && (
                  <div className="space-y-2">
                    <Label htmlFor="overdraftLimit">Limite de découvert</Label>
                    <Input
                      id="overdraftLimit"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.overdraftLimit}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          overdraftLimit: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Nom du compte</Label>
                  <Input
                    id="accountName"
                    placeholder="Ex: Réserve Liquidités"
                    value={newAccount.accountName}
                    onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccountType">Type de compte</Label>
                  <Select
                    value={newAccount.bankAccountType}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, bankAccountType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bankAccountTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col items-start">
                            <span>{option.value}</span>
                            <span className="text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select
                    value={newAccount.currency}
                    onValueChange={(value) => setNewAccount({ ...newAccount, currency: value })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="USD">USD - Dollar US</SelectItem>
                      <SelectItem value="GBP">GBP - Livre Sterling</SelectItem>
                      <SelectItem value="CHF">CHF - Franc Suisse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initialBalanceBank">Solde Initial</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {newAccount.currency === "EUR"
                        ? "€"
                        : newAccount.currency === "USD"
                          ? "$"
                          : newAccount.currency === "GBP"
                            ? "£"
                            : "CHF"}
                    </span>
                    <Input
                      id="initialBalanceBank"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.initialBalance || ""}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          initialBalance: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="pl-8"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Attribution d'un solde initial au compte (donnée comptable)
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>IBAN généré (prévisualisation)</Label>
              <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                {newAccount.category === "bank"
                  ? "FR76 3000 4" +
                    Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0") +
                    " " +
                    Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0") +
                    " " +
                    Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0") +
                    " " +
                    Math.floor(Math.random() * 1000)
                      .toString()
                      .padStart(3, "0")
                  : "FR76 3000 4" +
                    Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0") +
                    " " +
                    Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0") +
                    " " +
                    Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0") +
                    " " +
                    Math.floor(Math.random() * 1000)
                      .toString()
                      .padStart(3, "0")}
              </div>
              <p className="text-xs text-muted-foreground">
                Un IBAN unique sera généré lors de la création du compte.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpenAccountOpen(false)}>
              Annuler
            </Button>
            <Button
              className={
                newAccount.category === "bank"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
              disabled={isCreating}
              onClick={async () => {
                try {
                  setIsCreating(true);
                  let response;

                  if (newAccount.category === "bank") {
                    if (!newAccount.accountName.trim()) {
                      alert("Veuillez entrer un nom pour le compte");
                      return;
                    }
                    const requestData = {
                      account_name: newAccount.accountName,
                      account_type: newAccount.bankAccountType,
                      currency: newAccount.currency,
                      purpose: "Internal bank account",
                      initial_balance: newAccount.initialBalance,
                    };
                    console.log("[DEBUG] Creating internal account with:", requestData);
                    response = await accountsApi.createInternal(requestData);
                    console.log("[DEBUG] CreateInternal response:", response);
                  } else {
                    if (!newAccount.clientId) {
                      alert("Veuillez sélectionner un client");
                      return;
                    }
                    const selectedClient = clients.find(
                      (c) => c.id.toString() === newAccount.clientId
                    );
                    const requestData = {
                      account_type: newAccount.accountType.toLowerCase().replace(" ", "_"),
                      holder_name: selectedClient?.name || "",
                      holder_type:
                        selectedClient?.type === "Entreprise" ? "business" : "individual",
                      currency: newAccount.currency,
                      country_code: "FR",
                      initial_balance: newAccount.initialBalance,
                    };
                    console.log("[DEBUG] Creating account with:", requestData);
                    response = await accountsApi.create(requestData);
                    console.log("[DEBUG] Create response:", response);
                  }

                  if (response && response.success) {
                    console.log(
                      "[DEBUG] Account created successfully, balance:",
                      response.data?.balance
                    );
                    setIsOpenAccountOpen(false);
                    setNewAccount({
                      category: "client",
                      clientId: "",
                      bankAccountType: "Compte Opérationnel",
                      accountType: "Compte Courant",
                      currency: "EUR",
                      overdraft: false,
                      overdraftLimit: 0,
                      accountName: "",
                      initialBalance: 0,
                    });
                    await fetchAccounts();
                  } else {
                    alert(response?.error || "Erreur lors de la création du compte");
                  }
                } catch (err) {
                  console.error("Failed to create account:", err);
                  alert(
                    err instanceof Error ? err.message : "Erreur lors de la création du compte"
                  );
                } finally {
                  setIsCreating(false);
                }
              }}
            >
              {isCreating ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Création...
                </>
              ) : (
                "Créer le compte"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
