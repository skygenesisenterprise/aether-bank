"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  RefreshCw,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function getMethodBadge(method: string) {
  switch (method) {
    case "SEPA":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          SEPA
        </Badge>
      );
    case "Card":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          Carte
        </Badge>
      );
    case "Instant":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Instantané
        </Badge>
      );
    case "Transfer":
      return <Badge variant="outline">Virement</Badge>;
    case "Recurring":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          Récurrent
        </Badge>
      );
    default:
      return <Badge variant="outline">{method}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Validé
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Échoué
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.account.toLowerCase().includes(searchQuery.toLowerCase());
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
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-sm text-muted-foreground">Suivi des transactions de la plateforme</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Transactions</CardDescription>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Volume Total</CardDescription>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.volume)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Validées</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
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
              <CardDescription>Échouées</CardDescription>
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failed}</div>
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
                placeholder="Rechercher une transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="credit">Entrant</SelectItem>
                  <SelectItem value="debit">Sortant</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
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
                <SelectTrigger className="w-36">
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
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Liste des Transactions</CardTitle>
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
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Transaction</th>
                  <th className="text-left p-4 font-medium">Compte</th>
                  <th className="text-left p-4 font-medium">Méthode</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-right p-4 font-medium">Montant</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "credit" ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          {tx.type === "credit" ? (
                            <ArrowUpRight className="w-5 h-5 text-green-600 rotate-45" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 text-gray-600 rotate-45" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{tx.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {tx.type === "credit" ? "Entrant" : "Sortant"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{tx.account}</td>
                    <td className="p-4">{getMethodBadge(tx.method)}</td>
                    <td className="p-4">{getStatusBadge(tx.status)}</td>
                    <td className="p-4 text-right">
                      <p
                        className={`font-medium text-sm ${tx.type === "credit" ? "text-green-600" : ""}`}
                      >
                        {tx.type === "credit" ? "+" : ""}
                        {formatCurrency(tx.amount)}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{tx.date}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Voir détails</DropdownMenuItem>
                          <DropdownMenuItem>Télécharger reçu</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {tx.status === "pending" ? "Annuler" : "Contester"}
                          </DropdownMenuItem>
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
