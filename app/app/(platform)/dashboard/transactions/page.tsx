"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Download,
  RefreshCw,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Globe,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Filter,
  Calendar,
  Eye,
  Ban,
  FileText,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  { date: "Lun", volume: 124000, count: 342 },
  { date: "Mar", volume: 142000, count: 389 },
  { date: "Mer", volume: 189000, count: 512 },
  { date: "Jeu", volume: 161000, count: 445 },
  { date: "Ven", volume: 215000, count: 598 },
  { date: "Sam", volume: 193000, count: 521 },
  { date: "Dim", volume: 156000, count: 423 },
];

const methodDistributionData = [
  { name: "SEPA", value: 45, color: "#6366f1" },
  { name: "Carte", value: 28, color: "#8b5cf6" },
  { name: "Virement", value: 15, color: "#06b6d4" },
  { name: "Instantané", value: 8, color: "#10b981" },
  { name: "Récurrent", value: 4, color: "#f59e0b" },
];

const hourlyActivityData = [
  { hour: "00h", transactions: 45 },
  { hour: "04h", transactions: 23 },
  { hour: "08h", transactions: 189 },
  { hour: "10h", transactions: 342 },
  { hour: "12h", transactions: 298 },
  { hour: "14h", transactions: 412 },
  { hour: "16h", transactions: 389 },
  { hour: "18h", transactions: 267 },
  { hour: "20h", transactions: 198 },
  { hour: "22h", transactions: 112 },
];

const transactions = [
  {
    id: 1,
    name: "Virement SEPA - TechCorp",
    amount: 24500.0,
    type: "credit",
    method: "SEPA",
    status: "completed",
    account: "Compte Pro #1245",
    date: "Il y a 2min",
    reference: "TXN-2026-001245",
  },
  {
    id: 2,
    name: "Paiement carte - AWS",
    amount: -189.99,
    type: "debit",
    method: "Card",
    status: "completed",
    account: "Compte Pro #1245",
    date: "Il y a 15min",
    reference: "TXN-2026-001244",
  },
  {
    id: 3,
    name: "Salaires Janvier",
    amount: -45000.0,
    type: "debit",
    method: "SEPA",
    status: "pending",
    account: "Compte Pro #1245",
    date: "Il y a 1h",
    reference: "TXN-2026-001243",
  },
  {
    id: 4,
    name: "Virement reçu - Client ABC",
    amount: 12500.0,
    type: "credit",
    method: "SEPA",
    status: "completed",
    account: "Compte Pro #1245",
    date: "Il y a 2h",
    reference: "TXN-2026-001242",
  },
  {
    id: 5,
    name: "Prélèvement EDF",
    amount: -245.0,
    type: "debit",
    method: "SEPA",
    status: "completed",
    account: "Compte Particulier #7821",
    date: "Il y a 4h",
    reference: "TXN-2026-001241",
  },
  {
    id: 6,
    name: "Paiement Stripe - Boutique Online",
    amount: 3450.0,
    type: "credit",
    method: "Transfer",
    status: "completed",
    account: "Compte Pro #1245",
    date: "Il y a 5h",
    reference: "TXN-2026-001240",
  },
  {
    id: 7,
    name: "Abonnement Netflix",
    amount: -15.99,
    type: "debit",
    method: "Recurring",
    status: "completed",
    account: "Compte Particulier #7821",
    date: "Il y a 6h",
    reference: "TXN-2026-001239",
  },
  {
    id: 8,
    name: "Virement instantané - Jean",
    amount: 500.0,
    type: "credit",
    method: "Instant",
    status: "failed",
    account: "Compte Pro #1245",
    date: "Il y a 8h",
    reference: "TXN-2026-001238",
  },
  {
    id: 9,
    name: "Paiement Apple Store",
    amount: -1299.0,
    type: "debit",
    method: "Card",
    status: "completed",
    account: "Compte Particulier #7821",
    date: "Il y a 1j",
    reference: "TXN-2026-001237",
  },
  {
    id: 10,
    name: "Reversement commission",
    amount: 850.0,
    type: "credit",
    method: "Transfer",
    status: "pending",
    account: "Compte Pro #1245",
    date: "Il y a 1j",
    reference: "TXN-2026-001236",
  },
];

const pendingApprovals = [
  {
    id: 1,
    name: "Salaires Janvier",
    amount: -45000.0,
    account: "Compte Pro #1245",
    requestedBy: "Admin RH",
    date: "Il y a 1h",
    priority: "high",
  },
  {
    id: 2,
    name: "Reversement commission",
    amount: 850.0,
    account: "Compte Pro #1245",
    requestedBy: "Service Compta",
    date: "Il y a 1j",
    priority: "medium",
  },
  {
    id: 3,
    name: "Virement international - Supplier X",
    amount: -12500.0,
    account: "Compte Pro #1245",
    requestedBy: "Direction",
    date: "Il y a 2j",
    priority: "high",
  },
];

const alerts = [
  {
    type: "warning",
    message: "3 transactions > 10 000€ nécessitent vérification AML",
    time: "Il y a 5min",
  },
  {
    type: "info",
    message: "Réconciliation SEPA en cours - 847 transactions traitées",
    time: "Il y a 15min",
  },
  {
    type: "success",
    message: "Batch virements salaires validé par le superviseur",
    time: "Il y a 1h",
  },
];

const complianceData = [
  { name: "Transactions AML Vérifiées", value: 97, target: 95, status: "success" },
  { name: "Plafonds Respectés", value: 99, target: 99, status: "success" },
  { name: "Double Authentification", value: 94, target: 95, status: "warning" },
  { name: "Logs Complets", value: 100, target: 95, status: "success" },
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

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
          <CheckCircle className="w-3 h-3 mr-1" />
          Validé
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
          <XCircle className="w-3 h-3 mr-1" />
          Échoué
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getMethodBadge(method: string) {
  switch (method) {
    case "SEPA":
      return (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          SEPA
        </Badge>
      );
    case "Card":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Carte
        </Badge>
      );
    case "Instant":
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          Instant
        </Badge>
      );
    case "Transfer":
      return (
        <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
          Virement
        </Badge>
      );
    case "Recurring":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          Récurrent
        </Badge>
      );
    default:
      return <Badge variant="outline">{method}</Badge>;
  }
}

export default function TransactionsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const matchesMethod = methodFilter === "all" || tx.method === methodFilter;
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    return matchesSearch && matchesStatus && matchesMethod && matchesType;
  });

  const stats = {
    total: transactions.length,
    completed: transactions.filter((t) => t.status === "completed").length,
    pending: transactions.filter((t) => t.status === "pending").length,
    failed: transactions.filter((t) => t.status === "failed").length,
    volume: transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
    successRate:
      (transactions.filter((t) => t.status === "completed").length / transactions.length) * 100,
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
              <Zap className="h-3 w-3 mr-1" />
              Gestion
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Supervision et gestion des transactions de la plateforme
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-44 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Dernières 24h</SelectItem>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white dark:bg-gray-800">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards Principaux */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium">
                Total Transactions
              </CardDescription>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatNumber(stats.total * 1247)}
            </div>
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
                Volume Entrant
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.volume)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+22%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-amber-700 dark:text-amber-300 font-medium">
                En Attente
              </CardDescription>
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pending}</div>
            <div className="flex items-center gap-1 text-xs text-amber-600 mt-2">
              <span className="font-semibold">{stats.pending} à valider</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-cyan-700 dark:text-cyan-300 font-medium">
                Taux de Réussite
              </CardDescription>
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.successRate.toFixed(1)}%
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+0.5%</span>
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
              <CardDescription>Validées</CardDescription>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.completed}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Échouées</CardDescription>
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.failed}</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3" />
              -3% ce mois
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Volume SEPA</CardDescription>
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
              <CardDescription>Montant Moyen</CardDescription>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">€1,247</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% ce mois
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

        {/* Method Distribution */}
        <Card className="lg:col-span-3 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Répartition par Méthode</CardTitle>
                <CardDescription>Distribution des paiements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={methodDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {methodDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {methodDistributionData.map((item) => (
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

      {/* Hourly Activity & Compliance */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hourly Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Activité Horaire</CardTitle>
                <CardDescription>Transactions par heure</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                <Tooltip />
                <Bar
                  dataKey="transactions"
                  name="Transactions"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
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

        {/* Pending Approvals */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Approbations</CardTitle>
                <CardDescription>En attente de validation</CardDescription>
              </div>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                {pendingApprovals.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {approval.name}
                    </p>
                    <Badge
                      className={
                        approval.priority === "high"
                          ? "bg-red-100 text-red-700 hover:bg-red-100 border-0 text-[10px]"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-[10px]"
                      }
                    >
                      {approval.priority === "high" ? "Urgent" : "Normal"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {approval.requestedBy} • {approval.date}
                    </p>
                    <p
                      className={`text-sm font-semibold ${approval.amount > 0 ? "text-emerald-600" : "text-gray-900 dark:text-white"}`}
                    >
                      {formatCurrency(Math.abs(approval.amount))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, compte ou référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="credit">Entrant</SelectItem>
                  <SelectItem value="debit">Sortant</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="completed">Validé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes méthodes</SelectItem>
                  <SelectItem value="SEPA">SEPA</SelectItem>
                  <SelectItem value="Card">Carte</SelectItem>
                  <SelectItem value="Instant">Instantané</SelectItem>
                  <SelectItem value="Transfer">Virement</SelectItem>
                  <SelectItem value="Recurring">Récurrent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Liste des Transactions</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transaction
                {filteredTransactions.length !== 1 ? "s" : ""} trouvée
                {filteredTransactions.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Transaction
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Référence
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Compte
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Méthode
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Statut
                  </th>
                  <th className="text-right p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Montant
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            tx.type === "credit"
                              ? "bg-emerald-100 dark:bg-emerald-900/30"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          {tx.type === "credit" ? (
                            <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">
                            {tx.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {tx.type === "credit" ? "Entrant" : "Sortant"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {tx.reference}
                      </code>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{tx.account}</td>
                    <td className="p-4">{getMethodBadge(tx.method)}</td>
                    <td className="p-4">{getStatusBadge(tx.status)}</td>
                    <td className="p-4 text-right">
                      <p
                        className={`font-semibold text-sm ${tx.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                      >
                        {tx.type === "credit" ? "+" : ""}
                        {formatCurrency(tx.amount)}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{tx.date}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Télécharger reçu
                          </DropdownMenuItem>
                          {tx.status === "pending" && (
                            <>
                              <DropdownMenuItem className="text-emerald-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Valider
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Refuser
                              </DropdownMenuItem>
                            </>
                          )}
                          {tx.status === "completed" && (
                            <DropdownMenuItem className="text-amber-600">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Signaler
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Alertes & Notifications</CardTitle>
              <CardDescription>Événements récents nécessitant votre attention</CardDescription>
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
                    <Activity className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{alert.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
