"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  Building,
  CreditCard,
  PiggyBank,
  Download,
  Edit,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Shield,
  Copy,
  FileText,
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

const accounts = [
  {
    id: 1,
    name: "Compte Courant",
    type: "Compte Courant",
    accountType: "Principal",
    iban: "FR76 3000 6000 0012 3456 7890 189",
    bic: "AGRIFRPP882",
    balance: 24850.0,
    availableBalance: 24850.0,
    currency: "EUR",
    trend: "+2.4%",
    trendUp: true,
    status: "active",
    openedDate: "15 mars 2023",
    rib: "30006 00012 12345678901 88",
    hasCard: true,
    cardType: "Visa Classic",
  },
  {
    id: 2,
    name: "Livret A",
    type: "Livret Épargne",
    accountType: "Épargne",
    iban: "FR76 3000 6000 0022 3456 7890 190",
    bic: "AGRIFRPP882",
    balance: 5200.0,
    availableBalance: 5200.0,
    currency: "EUR",
    trend: "+1.2%",
    trendUp: true,
    status: "active",
    openedDate: "20 avril 2023",
    rib: "30006 00022 22345678901 90",
    hasCard: false,
    cardType: null,
  },
  {
    id: 3,
    name: "Compte Titre",
    type: "Compte Titre",
    accountType: "Investissement",
    iban: "FR76 3000 6000 0032 3456 7890 191",
    bic: "AGRIFRPP882",
    balance: 15750.0,
    availableBalance: 15750.0,
    currency: "EUR",
    trend: "+8.5%",
    trendUp: true,
    status: "active",
    openedDate: "10 juin 2023",
    rib: "30006 00032 32345678901 91",
    hasCard: false,
    cardType: null,
  },
];

function formatCurrency(amount: number, currency: string = "EUR") {
  return amount.toLocaleString("fr-FR", { style: "currency", currency });
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Compte Courant":
      return <CreditCard className="h-5 w-5" />;
    case "Livret Épargne":
      return <PiggyBank className="h-5 w-5" />;
    case "Compte Titre":
      return <TrendingUp className="h-5 w-5" />;
    default:
      return <Wallet className="h-5 w-5" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "Compte Courant":
      return "from-blue-600 to-blue-800";
    case "Livret Épargne":
      return "from-green-600 to-green-800";
    case "Compte Titre":
      return "from-purple-600 to-purple-800";
    default:
      return "from-primary to-primary/80";
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
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function UserAccountPage() {
  const [showIban, setShowIban] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountType: "Livret Épargne",
    initialDeposit: 0,
  });

  const toggleIban = (id: number) => {
    setShowIban((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalAvailable = accounts.reduce((sum, acc) => sum + acc.availableBalance, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes Comptes</h1>
          <p className="text-sm text-muted-foreground">
            Gérez vos comptes bancaires et vos coordonnées
          </p>
        </div>
        <Dialog open={isNewAccountOpen} onOpenChange={setIsNewAccountOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ouvrir un compte
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ouvrir un nouveau compte</DialogTitle>
              <DialogDescription>
                Sélectionnez le type de compte que vous souhaitez ouvrir.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                    <SelectItem value="Livret A">Livret A</SelectItem>
                    <SelectItem value="Livret B">Livret B</SelectItem>
                    <SelectItem value="Compte Titre">Compte Titre</SelectItem>
                    <SelectItem value="Compte Joint">Compte Joint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialDeposit">Dépôt initial</Label>
                <Input
                  id="initialDeposit"
                  type="number"
                  placeholder="0.00"
                  value={newAccount.initialDeposit}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      initialDeposit: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewAccountOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating account:", newAccount);
                  setIsNewAccountOpen(false);
                }}
              >
                Ouvrir le compte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-linear-to-r from-indigo-600 to-purple-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Solde total</p>
              <p className="text-4xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm text-indigo-100">+4.2% ce mois</span>
              </div>
            </div>
            <div className="hidden md:block">
              <Building className="w-16 h-16 text-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total épargne</CardDescription>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Disponible</CardDescription>
              <ArrowDownLeft className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAvailable)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Nombre de comptes</CardDescription>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <Card key={account.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Account Header */}
              <div className="p-4 bg-muted/30 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${getTypeColor(account.type)} flex items-center justify-center text-white`}
                    >
                      {getTypeIcon(account.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>
                        {account.accountType} • Ouvert le {account.openedDate}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(account.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Relevé PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger RIB
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Balance */}
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Solde disponible</p>
                    <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-sm ${account.trendUp ? "text-green-600" : "text-red-600"}`}
                    >
                      {account.trendUp ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {account.trend} ce mois
                    </div>
                  </div>

                  {/* IBAN */}
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-muted-foreground">IBAN</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleIban(account.id)}
                      >
                        {showIban[account.id] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm font-mono break-all">
                      {showIban[account.id] ? account.iban : account.iban.replace(/./g, "*")}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-primary mt-1"
                      onClick={() => copyToClipboard(account.iban, account.id)}
                    >
                      {copiedId === account.id ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copié
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copier
                        </>
                      )}
                    </Button>
                  </div>

                  {/* BIC */}
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">BIC / SWIFT</p>
                    <p className="text-sm font-mono">{account.bic}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-primary mt-1"
                      onClick={() => copyToClipboard(account.bic, account.id + 100)}
                    >
                      {copiedId === account.id + 100 ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copié
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copier
                        </>
                      )}
                    </Button>
                  </div>

                  {/* RIB */}
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-muted-foreground">RIB</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs font-mono break-all">{account.rib}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-primary mt-1"
                      onClick={() => copyToClipboard(account.rib, account.id + 200)}
                    >
                      {copiedId === account.id + 200 ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copié
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copier RIB
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Card Info */}
                {account.hasCard && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{account.cardType}</p>
                        <p className="text-xs text-muted-foreground">Carte liée à ce compte</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/user/cards">Voir la carte</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Account Card */}
      <Card className="border-dashed hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Ajouter un compte</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
            Ouvrez un nouveau compte épargne, un compte titres ou un compte joint
          </p>
          <Button asChild>
            <Link href="/user/savings">
              Voir les offres
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-base">Fonds garantis</CardTitle>
                <CardDescription>Protection jusqu'à 100 000€</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Vos fonds sont protégés par le FGDR (Fonds de Garantie des Dépôts et de Résolution)
              jusqu'à 100 000€ par établissement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Virements instantanés</CardTitle>
                <CardDescription>Disponible 24h/24, 7j/7</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Effectuez des virements instantanés vers n'importe quelle banque européenne en
              quelques secondes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
