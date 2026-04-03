"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Mail,
  Building,
  Download,
  Eye,
  Edit,
  Ban,
  UserCheck,
  FileText,
  TrendingUp,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Calendar,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Label } from "@/components/ui/label";
import { clientsApi, Client, ClientListResponse } from "@/lib/api/client";

interface ClientStats {
  total: number;
  verified: number;
  pending: number;
  active: number;
  totalAccounts: number;
  totalCards: number;
}

function formatCurrency(amount: number, currency: string = "EUR") {
  return (amount / 100).toLocaleString("fr-FR", { style: "currency", currency });
}

function formatTimeAgo(dateStr: string) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes}min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days}j`;
  return date.toLocaleDateString("fr-FR");
}

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
    case "verified":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
          <CheckCircle className="w-3 h-3 mr-1" />
          Vérifié
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
    case "suspended":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
          <AlertCircle className="w-3 h-3 mr-1" />
          Bloqué
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">
          <Clock className="w-3 h-3 mr-1" />
          Inactif
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getRiskBadge(kycVerified: boolean) {
  if (kycVerified) {
    return <span className="text-xs font-medium text-emerald-600">Faible</span>;
  }
  return (
    <span className="text-xs font-medium text-amber-600 flex items-center gap-1">
      <AlertTriangle className="w-3 h-3" />
      Modéré
    </span>
  );
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ email: "", password: "", name: "", company: "" });
  const [isCreating, setIsCreating] = useState(false);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await clientsApi.list();
      console.log("[DEBUG] Clients response:", response);
      if (response && response.success && response.data) {
        const clients = Array.isArray(response.data)
          ? response.data
          : (response.data as any).data || [];
        setClientsData(clients);
      } else {
        setError(response?.error || "Failed to fetch clients");
      }
    } catch (err) {
      console.error("[ERROR] Failed to fetch clients:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleCreateClient = async () => {
    if (!newClient.email || !newClient.name) return;
    setIsCreating(true);
    try {
      const response = await clientsApi.create(newClient);
      if (response.success) {
        setIsNewClientOpen(false);
        fetchClients();
        setNewClient({ email: "", password: "", name: "", company: "" });
      }
    } catch (err) {
      console.error("[ERROR] Failed to create client:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      (client.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (client.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (client.company?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && client.kyc_verified) ||
      (statusFilter === "pending" && !client.kyc_verified) ||
      client.status === statusFilter;
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "business" && client.company) ||
      (typeFilter === "individual" && !client.company);
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats: ClientStats = {
    total: clientsData.length,
    verified: clientsData.filter((c) => c.kyc_verified).length,
    pending: clientsData.filter((c) => !c.kyc_verified).length,
    active: clientsData.filter((c) => c.status === "active" || c.status === "verified").length,
    totalAccounts: clientsData.reduce((sum, c) => sum + (c.account_ids?.length || 0), 0),
    totalCards: 0,
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
              <Zap className="h-3 w-3 mr-1" />
              En direct
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gestion et suivi complet de la clientèle Aether Bank
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
          <Button variant="outline" onClick={fetchClients} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Dialog open={isNewClientOpen} onOpenChange={setIsNewClientOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouveau client</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer un nouveau client. Un compte utilisateur
                  sera automatiquement créé.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom / Raison sociale</Label>
                  <Input
                    id="name"
                    placeholder="Marie Dupont ou SARL TechSolutions"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@exemple.fr"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 caractères"
                    value={newClient.password}
                    onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise (optionnel)</Label>
                  <Input
                    id="company"
                    placeholder="Nom de l'entreprise"
                    value={newClient.company}
                    onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewClientOpen(false)}>
                  Annuler
                </Button>
                <Button
                  onClick={handleCreateClient}
                  disabled={
                    isCreating || !newClient.email || !newClient.name || !newClient.password
                  }
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isCreating ? "Création..." : "Créer le client"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchClients} className="ml-auto">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.total}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+{stats.active}</span>
              <span className="text-gray-500 dark:text-gray-400">actifs</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
                Vérifiés
              </CardDescription>
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                <UserCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.verified}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-semibold">
                {Math.round((stats.verified / Math.max(stats.total, 1)) * 100)}%
              </span>
              <span>du total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-gray-800">
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading ? "..." : stats.pending}
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-600 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-semibold">KYC requis</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-cyan-700 dark:text-cyan-300 font-medium">
                KYC Moyen
              </CardDescription>
              <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLoading
                ? "..."
                : `${Math.round((stats.verified / Math.max(stats.total, 1)) * 100)}%`}
            </div>
            <Progress
              value={Math.round((stats.verified / Math.max(stats.total, 1)) * 100)}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, email, entreprise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="individual">Particulier</SelectItem>
                  <SelectItem value="business">Entreprise</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="verified">Vérifié</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="blocked">Bloqué</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Liste des Clients</CardTitle>
              <CardDescription>
                {isLoading
                  ? "Chargement..."
                  : `${filteredClients.length} client${filteredClients.length !== 1 ? "s" : ""} trouvé${filteredClients.length !== 1 ? "s" : ""}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Comptes totaux:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {isLoading ? "..." : stats.totalAccounts}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Client
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                    Contact
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                    Statut
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                    KYC
                  </th>
                  <th className="text-right p-4 font-medium text-gray-600 dark:text-gray-400">
                    Comptes
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                    Risque
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                      <td className="p-4">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500">Aucun client trouvé</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback
                              className={`text-sm font-semibold ${
                                client.company
                                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                              }`}
                            >
                              {(client.name || "XX")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                              {client.name || "Sans nom"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimeAgo(client.created_at)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            {client.email || "N/A"}
                          </div>
                          {client.company && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                              <Building className="h-3 w-3" />
                              {client.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div
                            className={`p-1.5 rounded-lg ${
                              client.company
                                ? "bg-indigo-100 dark:bg-indigo-900/30"
                                : "bg-purple-100 dark:bg-purple-900/30"
                            }`}
                          >
                            <Building
                              className={`h-3.5 w-3.5 ${
                                client.company
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-purple-600 dark:text-purple-400"
                              }`}
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {client.company ? "Entreprise" : "Particulier"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(client.status)}</td>
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">
                              {client.kyc_verified ? "100%" : "0%"}
                            </span>
                            {!client.kyc_verified && (
                              <AlertTriangle className="h-3 w-3 text-amber-500" />
                            )}
                          </div>
                          <Progress value={client.kyc_verified ? 100 : 0} className="h-1.5" />
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                          <Wallet className="h-3.5 w-3.5 text-gray-400" />
                          <span className="font-medium">{client.account_ids?.length || 0}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              client.kyc_verified ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {getRiskBadge(client.kyc_verified)}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/clients/${client.id}`}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                Voir détails
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Documents KYC
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {client.status === "blocked" || client.status === "suspended" ? (
                              <DropdownMenuItem className="flex items-center gap-2 text-emerald-600">
                                <UserCheck className="h-4 w-4" />
                                Réactiver
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                <Ban className="h-4 w-4" />
                                Suspendre
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
