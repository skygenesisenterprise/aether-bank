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
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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

const clients = [
  {
    id: 1,
    name: "SARL TechSolutions",
    type: "Entreprise",
    email: "contact@techsolutions.fr",
    phone: "+33 1 23 45 67 89",
    status: "verified",
    accounts: 3,
    balance: 245000.0,
    createdAt: "Il y a 1h",
  },
  {
    id: 2,
    name: "Marie Dupont",
    type: "Particulier",
    email: "marie.dupont@email.fr",
    phone: "+33 6 12 34 56 78",
    status: "verified",
    accounts: 2,
    balance: 15750.0,
    createdAt: "Il y a 3h",
  },
  {
    id: 3,
    name: "SAS InnovTech",
    type: "Entreprise",
    email: "contact@innovtech.com",
    phone: "+33 1 98 76 54 32",
    status: "pending",
    accounts: 1,
    balance: 0.0,
    createdAt: "Il y a 5h",
  },
  {
    id: 4,
    name: "Jean Martin",
    type: "Particulier",
    email: "jean.martin@email.fr",
    phone: "+33 6 23 45 67 89",
    status: "verified",
    accounts: 1,
    balance: 8900.0,
    createdAt: "Il y a 6h",
  },
  {
    id: 5,
    name: "EURL Boulanger",
    type: "Entreprise",
    email: "contact@boulanger.fr",
    phone: "+33 1 45 67 89 01",
    status: "verified",
    accounts: 2,
    balance: 45000.0,
    createdAt: "Il y a 1j",
  },
  {
    id: 6,
    name: "Sophie Bernard",
    type: "Particulier",
    email: "sophie.bernard@email.fr",
    phone: "+33 6 34 56 78 90",
    status: "verified",
    accounts: 3,
    balance: 32500.0,
    createdAt: "Il y a 1j",
  },
  {
    id: 7,
    name: "SAS Gestion Plus",
    type: "Entreprise",
    email: "info@gestionplus.fr",
    phone: "+33 1 56 78 90 12",
    status: "suspended",
    accounts: 2,
    balance: -2500.0,
    createdAt: "Il y a 2j",
  },
  {
    id: 8,
    name: "Pierre Durant",
    type: "Particulier",
    email: "pierre.durant@email.fr",
    phone: "+33 6 45 67 89 01",
    status: "verified",
    accounts: 1,
    balance: 12300.0,
    createdAt: "Il y a 2j",
  },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Vérifié
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "suspended":
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Suspendu
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesType = typeFilter === "all" || client.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: clients.length,
    verified: clients.filter((c) => c.status === "verified").length,
    pending: clients.filter((c) => c.status === "pending").length,
    suspended: clients.filter((c) => c.status === "suspended").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Gestion et suivi des clients de la plateforme
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Clients</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Vérifiés</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>En Attente</CardDescription>
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Suspendus</CardDescription>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.suspended}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="verified">Vérifié</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Particulier">Particulier</SelectItem>
                  <SelectItem value="Entreprise">Entreprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Liste des Clients</CardTitle>
              <CardDescription>
                {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} trouvé
                {filteredClients.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
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
                  <th className="text-right p-4 font-medium">Comptes</th>
                  <th className="text-right p-4 font-medium">Solde</th>
                  <th className="text-left p-4 font-medium">Créé</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{client.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {client.type}
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(client.status)}</td>
                    <td className="p-4 text-right text-sm">{client.accounts}</td>
                    <td className="p-4 text-right text-sm font-medium">
                      <span className={client.balance < 0 ? "text-red-600" : ""}>
                        {formatCurrency(client.balance)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{client.createdAt}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/platform/clients/${client.id}`}>Voir détails</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Suspendre</DropdownMenuItem>
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
    </div>
  );
}
