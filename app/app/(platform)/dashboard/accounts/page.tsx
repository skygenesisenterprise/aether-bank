"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
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
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const clients = [
  { id: 1, name: "SARL TechSolutions", type: "Entreprise" },
  { id: 2, name: "Marie Dupont", type: "Particulier" },
  { id: 3, name: "SAS InnovTech", type: "Entreprise" },
  { id: 4, name: "Jean Martin", type: "Particulier" },
  { id: 5, name: "EURL Boulanger", type: "Entreprise" },
  { id: 6, name: "Sophie Bernard", type: "Particulier" },
];

const accounts = [
  {
    id: 1,
    accountNumber: "FR76 3000 4000 1245 6789 0123 456",
    name: "Compte Pro #1245",
    type: "Compte Courant",
    accountType: "Professionnel",
    owner: "SARL TechSolutions",
    ownerType: "Entreprise",
    balance: 245000.0,
    availableBalance: 242000.0,
    status: "active",
    currency: "EUR",
    iban: "FR76 3000 4000 1245 6789 0123 456",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 1j",
  },
  {
    id: 2,
    accountNumber: "FR76 3000 4000 7821 3456 7890 123",
    name: "Compte Particulier #7821",
    type: "Compte Courant",
    accountType: "Particulier",
    owner: "Marie Dupont",
    ownerType: "Particulier",
    balance: 15750.0,
    availableBalance: 15750.0,
    status: "active",
    currency: "EUR",
    iban: "FR76 3000 4000 7821 3456 7890 123",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 3j",
  },
  {
    id: 3,
    accountNumber: "FR76 3000 4000 3102 5678 9012 345",
    name: "Compte Épargne #3102",
    type: "Livret Épargne",
    accountType: "Épargne",
    owner: "Marie Dupont",
    ownerType: "Particulier",
    balance: 52000.0,
    availableBalance: 52000.0,
    status: "active",
    currency: "EUR",
    iban: "FR76 3000 4000 3102 5678 9012 345",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 5j",
  },
  {
    id: 4,
    accountNumber: "FR76 3000 4000 8934 6789 0123 456",
    name: "Compte Pro #8934",
    type: "Compte Courant",
    accountType: "Professionnel",
    owner: "SAS InnovTech",
    ownerType: "Entreprise",
    balance: 0.0,
    availableBalance: 0.0,
    status: "pending",
    currency: "EUR",
    iban: "FR76 3000 4000 8934 6789 0123 456",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 6h",
  },
  {
    id: 5,
    accountNumber: "FR76 3000 4000 4521 1234 5678 901",
    name: "Compte Joint #4521",
    type: "Compte Joint",
    accountType: "Joint",
    owner: "Jean & Sophie Martin",
    ownerType: "Particulier",
    balance: 34500.0,
    availableBalance: 34500.0,
    status: "active",
    currency: "EUR",
    iban: "FR76 3000 4000 4521 1234 5678 901",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 1sem",
  },
  {
    id: 6,
    accountNumber: "FR76 3000 4000 5623 2345 6789 012",
    name: "Compte Pro #5623",
    type: "Compte Courant",
    accountType: "Professionnel",
    owner: "EURL Boulanger",
    ownerType: "Entreprise",
    balance: 45000.0,
    availableBalance: 44500.0,
    status: "active",
    currency: "EUR",
    iban: "FR76 3000 4000 5623 2345 6789 012",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 2sem",
  },
  {
    id: 7,
    accountNumber: "FR76 3000 4000 6734 3456 7890 123",
    name: "Compte Particulier #6734",
    type: "Compte Courant",
    accountType: "Particulier",
    owner: "Pierre Durant",
    ownerType: "Particulier",
    balance: -2500.0,
    availableBalance: -2500.0,
    status: "blocked",
    currency: "EUR",
    iban: "FR76 3000 4000 6734 3456 7890 123",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 1mois",
  },
  {
    id: 8,
    accountNumber: "FR76 3000 4000 7845 4567 8901 234",
    name: "Compte Épargne #7845",
    type: "Livret Épargne",
    accountType: "Épargne",
    owner: "Jean Martin",
    ownerType: "Particulier",
    balance: 12300.0,
    availableBalance: 12300.0,
    status: "active",
    currency: "EUR",
    iban: "FR76 3000 4000 7845 4567 8901 234",
    bic: "BNPAFRPPXXX",
    createdAt: "Il y a 1mois",
  },
];

function formatCurrency(amount: number, currency: string = "EUR") {
  return amount.toLocaleString("fr-FR", { style: "currency", currency });
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Compte Courant":
      return <CreditCard className="h-4 w-4" />;
    case "Livret Épargne":
      return <PiggyBank className="h-4 w-4" />;
    case "Compte Joint":
      return <Users className="h-4 w-4" />;
    case "Professionnel":
      return <Building className="h-4 w-4" />;
    default:
      return <Wallet className="h-4 w-4" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Actif
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "blocked":
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Bloqué
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isOpenAccountOpen, setIsOpenAccountOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    clientId: "",
    accountType: "Compte Courant",
    currency: "EUR",
    overdraft: false,
    overdraftLimit: 0,
  });

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.iban.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    const matchesType = typeFilter === "all" || account.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: accounts.length,
    active: accounts.filter((a) => a.status === "active").length,
    pending: accounts.filter((a) => a.status === "pending").length,
    blocked: accounts.filter((a) => a.status === "blocked").length,
    totalBalance: accounts.reduce((sum, a) => sum + a.balance, 0),
    totalAvailable: accounts.reduce((sum, a) => sum + a.availableBalance, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comptes Bancaires</h1>
          <p className="text-sm text-muted-foreground">
            Gestion des comptes bancaires clients (Particuliers & Entreprises)
          </p>
        </div>
        <Dialog open={isOpenAccountOpen} onOpenChange={setIsOpenAccountOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ouvrir un compte
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ouvrir un nouveau compte bancaire</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous pour ouvrir un nouveau compte pour un client.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Client Selection */}
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

              {/* Account Type */}
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

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Select
                  value={newAccount.currency}
                  onValueChange={(value) => setNewAccount({ ...newAccount, currency: value })}
                >
                  <SelectTrigger className="w-32">
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

              {/* Overdraft Option */}
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

              {/* Overdraft Limit */}
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

              {/* IBAN Preview (read-only) */}
              <div className="space-y-2">
                <Label>IBAN généré (prévisualisation)</Label>
                <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                  FR76 3000 4{String(Math.floor(Math.random() * 9999)).padStart(4, "0")}{" "}
                  {String(Math.floor(Math.random() * 9999)).padStart(4, "0")}{" "}
                  {String(Math.floor(Math.random() * 9999)).padStart(4, "0")}{" "}
                  {String(Math.floor(Math.random() * 999)).padStart(3, "0")}
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
                onClick={() => {
                  console.log("Creating account:", newAccount);
                  setIsOpenAccountOpen(false);
                }}
              >
                Créer le compte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Comptes</CardDescription>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Solde Total</CardDescription>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalBalance)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Disponible</CardDescription>
              <ArrowDownLeft className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalAvailable)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Actifs</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Bloqués</CardDescription>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blocked}</div>
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
                placeholder="Rechercher par nom, client ou IBAN..."
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
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="blocked">Bloqué</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Type de compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="Compte Courant">Compte Courant</SelectItem>
                  <SelectItem value="Livret Épargne">Livret Épargne</SelectItem>
                  <SelectItem value="Compte Joint">Compte Joint</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Liste des Comptes Bancaires</CardTitle>
              <CardDescription>
                {filteredAccounts.length} compte{filteredAccounts.length !== 1 ? "s" : ""} bancaire
                {filteredAccounts.length !== 1 ? "s" : ""} trouvé
                {filteredAccounts.length !== 1 ? "s" : ""}
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
                      Compte
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">IBAN</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-right p-4 font-medium">Solde</th>
                  <th className="text-right p-4 font-medium">Disponible</th>
                  <th className="text-left p-4 font-medium">Créé</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getTypeIcon(account.type)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{account.name}</p>
                          <p className="text-xs text-muted-foreground">{account.accountType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{account.owner}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.ownerType === "Entreprise" ? (
                            <Building className="h-3 w-3 inline mr-1" />
                          ) : (
                            <User className="h-3 w-3 inline mr-1" />
                          )}
                          {account.ownerType}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {getTypeIcon(account.type)}
                        </div>
                        {account.type}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-xs font-mono text-muted-foreground">{account.iban}</p>
                    </td>
                    <td className="p-4">{getStatusBadge(account.status)}</td>
                    <td className="p-4 text-right">
                      <p
                        className={`font-medium text-sm ${account.balance < 0 ? "text-red-600" : ""}`}
                      >
                        {formatCurrency(account.balance, account.currency)}
                      </p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(account.availableBalance, account.currency)}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{account.createdAt}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/platform/accounts/${account.id}`}>Voir détails</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Opérations</DropdownMenuItem>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Bloquer</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Clôturer</DropdownMenuItem>
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
