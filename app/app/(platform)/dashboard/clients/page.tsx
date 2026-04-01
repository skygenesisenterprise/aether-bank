"use client";

import { useState } from "react";
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
  Phone,
  Building,
  Filter,
  Download,
  Eye,
  Edit,
  Ban,
  UserCheck,
  FileText,
  TrendingUp,
  Wallet,
  ShieldCheck,
  UserPlus,
  ArrowUpRight,
  CreditCard,
  AlertTriangle,
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
import { NewClientDialog } from "@/components/platform/new-client-dialog";

const clients = [
  {
    id: 1,
    name: "SARL TechSolutions",
    type: "Entreprise",
    email: "contact@techsolutions.fr",
    phone: "+33 1 23 45 67 89",
    status: "verified",
    kyc: 100,
    accounts: 3,
    cards: 5,
    balance: 245000.0,
    monthlyVolume: 89000,
    riskLevel: "low",
    createdAt: "Il y a 1h",
    lastActivity: "Il y a 2min",
  },
  {
    id: 2,
    name: "Marie Dupont",
    type: "Particulier",
    email: "marie.dupont@email.fr",
    phone: "+33 6 12 34 56 78",
    status: "verified",
    kyc: 100,
    accounts: 2,
    cards: 2,
    balance: 15750.0,
    monthlyVolume: 4200,
    riskLevel: "low",
    createdAt: "Il y a 3h",
    lastActivity: "Il y a 15min",
  },
  {
    id: 3,
    name: "SAS InnovTech",
    type: "Entreprise",
    email: "contact@innovtech.com",
    phone: "+33 1 98 76 54 32",
    status: "pending",
    kyc: 45,
    accounts: 1,
    cards: 0,
    balance: 0.0,
    monthlyVolume: 0,
    riskLevel: "medium",
    createdAt: "Il y a 5h",
    lastActivity: "Il y a 5h",
  },
  {
    id: 4,
    name: "Jean Martin",
    type: "Particulier",
    email: "jean.martin@email.fr",
    phone: "+33 6 23 45 67 89",
    status: "verified",
    kyc: 100,
    accounts: 1,
    cards: 1,
    balance: 8900.0,
    monthlyVolume: 2100,
    riskLevel: "low",
    createdAt: "Il y a 6h",
    lastActivity: "Il y a 1h",
  },
  {
    id: 5,
    name: "EURL Boulanger",
    type: "Entreprise",
    email: "contact@boulanger.fr",
    phone: "+33 1 45 67 89 01",
    status: "verified",
    kyc: 92,
    accounts: 2,
    cards: 3,
    balance: 45000.0,
    monthlyVolume: 15600,
    riskLevel: "low",
    createdAt: "Il y a 1j",
    lastActivity: "Il y a 30min",
  },
  {
    id: 6,
    name: "Sophie Bernard",
    type: "Particulier",
    email: "sophie.bernard@email.fr",
    phone: "+33 6 34 56 78 90",
    status: "verified",
    kyc: 100,
    accounts: 3,
    cards: 4,
    balance: 32500.0,
    monthlyVolume: 8900,
    riskLevel: "low",
    createdAt: "Il y a 1j",
    lastActivity: "Il y a 2h",
  },
  {
    id: 7,
    name: "SAS Gestion Plus",
    type: "Entreprise",
    email: "info@gestionplus.fr",
    phone: "+33 1 56 78 90 12",
    status: "suspended",
    kyc: 78,
    accounts: 2,
    cards: 2,
    balance: -2500.0,
    monthlyVolume: 3200,
    riskLevel: "high",
    createdAt: "Il y a 2j",
    lastActivity: "Il y a 3j",
  },
  {
    id: 8,
    name: "Pierre Durant",
    type: "Particulier",
    email: "pierre.durant@email.fr",
    phone: "+33 6 45 67 89 01",
    status: "verified",
    kyc: 100,
    accounts: 1,
    cards: 1,
    balance: 12300.0,
    monthlyVolume: 1800,
    riskLevel: "low",
    createdAt: "Il y a 2j",
    lastActivity: "Il y a 4h",
  },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function getStatusBadge(status: string) {
  switch (status) {
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
    case "suspended":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
          <AlertCircle className="w-3 h-3 mr-1" />
          Suspendu
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getRiskBadge(level: string) {
  switch (level) {
    case "low":
      return <span className="text-xs font-medium text-emerald-600">Faible</span>;
    case "medium":
      return <span className="text-xs font-medium text-amber-600">Modéré</span>;
    case "high":
      return <span className="text-xs font-medium text-red-600">Élevé</span>;
    default:
      return null;
  }
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);
  const [clientsData, setClientsData] = useState(clients);

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesType = typeFilter === "all" || client.type === typeFilter;
    const matchesRisk = riskFilter === "all" || client.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesType && matchesRisk;
  });

  const stats = {
    total: clientsData.length,
    verified: clientsData.filter((c) => c.status === "verified").length,
    pending: clientsData.filter((c) => c.status === "pending").length,
    suspended: clientsData.filter((c) => c.status === "suspended").length,
    totalBalance: clientsData.reduce((sum, c) => sum + c.balance, 0),
    totalVolume: clientsData.reduce((sum, c) => sum + c.monthlyVolume, 0),
    avgKyc: Math.round(clientsData.reduce((sum, c) => sum + c.kyc, 0) / clientsData.length),
  };

  const handleClientCreated = (newClient: any) => {
    setClientsData((prev) => [newClient, ...prev]);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
            <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">
              <Users className="h-3 w-3 mr-1" />
              {stats.total} clients
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gestion et suivi complet de la clientèle Aether Bank
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => setIsNewClientOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+8</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-800">
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.verified}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-semibold">
                {Math.round((stats.verified / stats.total) * 100)}%
              </span>
              <span>du total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">
                Encours Total
              </CardDescription>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats.totalBalance)}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <TrendingUp className="h-3 w-3" />
              <span className="font-semibold">+12.5%</span>
              <span className="text-gray-500 dark:text-gray-400">ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-gray-800">
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgKyc}%</div>
            <Progress value={stats.avgKyc} className="h-2 mt-2" />
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
                  <SelectItem value="Particulier">Particulier</SelectItem>
                  <SelectItem value="Entreprise">Entreprise</SelectItem>
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
                  <SelectItem value="suspended">Suspendu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Risque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Modéré</SelectItem>
                  <SelectItem value="high">Élevé</SelectItem>
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
                {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} trouvé
                {filteredClients.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Volume mensuel total:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(stats.totalVolume)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 font-medium">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Client
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">KYC</th>
                  <th className="text-right p-4 font-medium">Comptes</th>
                  <th className="text-right p-4 font-medium">Cartes</th>
                  <th className="text-right p-4 font-medium">Solde</th>
                  <th className="text-left p-4 font-medium">Risque</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback
                            className={`text-sm font-semibold ${client.type === "Entreprise" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"}`}
                          >
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">
                            {client.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {client.lastActivity}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className={`p-1.5 rounded-lg ${client.type === "Entreprise" ? "bg-indigo-100 dark:bg-indigo-900/30" : "bg-purple-100 dark:bg-purple-900/30"}`}
                        >
                          <Building
                            className={`h-3.5 w-3.5 ${client.type === "Entreprise" ? "text-indigo-600 dark:text-indigo-400" : "text-purple-600 dark:text-purple-400"}`}
                          />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{client.type}</span>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(client.status)}</td>
                    <td className="p-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">{client.kyc}%</span>
                          {client.kyc < 100 && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                        </div>
                        <Progress value={client.kyc} className="h-1.5" />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                        <Wallet className="h-3.5 w-3.5 text-gray-400" />
                        <span className="font-medium">{client.accounts}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                        <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                        <span className="font-medium">{client.cards}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-right">
                        <p
                          className={`font-semibold text-sm ${client.balance < 0 ? "text-red-600" : "text-gray-900 dark:text-white"}`}
                        >
                          {formatCurrency(client.balance)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatCurrency(client.monthlyVolume)}/mois
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${client.riskLevel === "low" ? "bg-emerald-500" : client.riskLevel === "medium" ? "bg-amber-500" : "bg-red-500"}`}
                        />
                        {getRiskBadge(client.riskLevel)}
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
                          {client.status === "suspended" ? (
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <NewClientDialog
        open={isNewClientOpen}
        onOpenChange={setIsNewClientOpen}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
}
