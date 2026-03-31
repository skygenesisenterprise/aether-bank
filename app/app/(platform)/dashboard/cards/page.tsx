"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Smartphone,
  Ban,
  Eye,
  EyeOff,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const cards = [
  {
    id: 1,
    cardNumber: "4532 1234 5678 9012",
    fullName: "MARIE DUPONT",
    type: "Visa Classic",
    cardType: "Débit",
    status: "active",
    account: "Compte Particulier #7821",
    owner: "Marie Dupont",
    ownerType: "Particulier",
    expiryDate: "12/27",
    cvv: "***",
    limit: 5000,
    used: 1245.5,
    isVirtual: false,
    isContactless: true,
    isOnline: true,
    createdAt: "Il y a 3j",
  },
  {
    id: 2,
    cardNumber: "4532 1234 5678 9013",
    fullName: "SARL TECHSOLUTIONS",
    type: "Visa Business",
    cardType: "Débit",
    status: "active",
    account: "Compte Pro #1245",
    owner: "SARL TechSolutions",
    ownerType: "Entreprise",
    expiryDate: "08/26",
    cvv: "***",
    limit: 15000,
    used: 8450.0,
    isVirtual: false,
    isContactless: true,
    isOnline: true,
    createdAt: "Il y a 1sem",
  },
  {
    id: 3,
    cardNumber: "5432 9876 5432 1098",
    fullName: "JEAN MARTIN",
    type: "Mastercard Gold",
    cardType: "Crédit",
    status: "active",
    account: "Compte Particulier #7821",
    owner: "Jean Martin",
    ownerType: "Particulier",
    expiryDate: "03/28",
    cvv: "***",
    limit: 10000,
    used: 2500.0,
    isVirtual: false,
    isContactless: true,
    isOnline: true,
    createdAt: "Il y a 2sem",
  },
  {
    id: 4,
    cardNumber: "4024 1234 5678 9014",
    fullName: "SAS INNOVTECH",
    type: "Visa Business Premium",
    cardType: "Débit",
    status: "blocked",
    account: "Compte Pro #8934",
    owner: "SAS InnovTech",
    ownerType: "Entreprise",
    expiryDate: "06/25",
    cvv: "***",
    limit: 25000,
    used: 0,
    isVirtual: false,
    isContactless: true,
    isOnline: false,
    createdAt: "Il y a 1mois",
  },
  {
    id: 5,
    cardNumber: "4532 1111 2222 3333",
    fullName: "MARIE DUPONT",
    type: "Visa Virtual",
    cardType: "Virtuelle",
    status: "active",
    account: "Compte Particulier #7821",
    owner: "Marie Dupont",
    ownerType: "Particulier",
    expiryDate: "12/26",
    cvv: "***",
    limit: 500,
    used: 125.0,
    isVirtual: true,
    isContactless: false,
    isOnline: true,
    createdAt: "Il y a 5j",
  },
  {
    id: 6,
    cardNumber: "5432 4444 5555 6666",
    fullName: "EURL BOULANGER",
    type: "Visa Business",
    cardType: "Débit",
    status: "pending",
    account: "Compte Pro #5623",
    owner: "EURL Boulanger",
    ownerType: "Entreprise",
    expiryDate: "09/27",
    cvv: "***",
    limit: 8000,
    used: 0,
    isVirtual: false,
    isContactless: true,
    isOnline: true,
    createdAt: "Il y a 2j",
  },
];

const clients = [
  { id: 1, name: "SARL TechSolutions", type: "Entreprise" },
  { id: 2, name: "Marie Dupont", type: "Particulier" },
  { id: 3, name: "SAS InnovTech", type: "Entreprise" },
  { id: 4, name: "Jean Martin", type: "Particulier" },
  { id: 5, name: "EURL Boulanger", type: "Entreprise" },
];

const accounts = [
  { id: 1, name: "Compte Pro #1245", owner: "SARL TechSolutions" },
  { id: 2, name: "Compte Particulier #7821", owner: "Marie Dupont" },
  { id: 3, name: "Compte Pro #5623", owner: "EURL Boulanger" },
];

function formatCardNumber(number: string, showFull: boolean = false) {
  if (showFull) return number;
  return number.slice(-4).padStart(number.length, "*").replace(/\s/g, " ");
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
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
          <Ban className="w-3 h-3 mr-1" />
          Bloquée
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getCardTypeColor(type: string) {
  switch (type) {
    case "Visa Classic":
      return "from-blue-600 to-blue-800";
    case "Visa Business":
    case "Visa Business Premium":
      return "from-indigo-600 to-indigo-800";
    case "Mastercard Gold":
      return "from-amber-500 to-amber-700";
    case "Visa Virtual":
      return "from-gray-400 to-gray-600";
    default:
      return "from-primary to-primary/80";
  }
}

export default function CardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [showCardNumbers, setShowCardNumbers] = useState<Record<number, boolean>>({});
  const [newCard, setNewCard] = useState({
    clientId: "",
    accountId: "",
    cardType: "Visa Classic",
    cardCategory: "Débit",
    limit: 5000,
    isVirtual: false,
    isContactless: true,
    isOnline: true,
  });

  const toggleShowCard = (id: number) => {
    setShowCardNumbers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.cardNumber.includes(searchQuery) ||
      card.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || card.status === statusFilter;
    const matchesType = typeFilter === "all" || card.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: cards.length,
    active: cards.filter((c) => c.status === "active").length,
    pending: cards.filter((c) => c.status === "pending").length,
    blocked: cards.filter((c) => c.status === "blocked").length,
    virtual: cards.filter((c) => c.isVirtual).length,
    totalLimit: cards.reduce((sum, c) => sum + c.limit, 0),
    totalUsed: cards.reduce((sum, c) => sum + c.used, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cartes Bancaires</h1>
          <p className="text-sm text-muted-foreground">
            Gestion des cartes bancaires clients (Particuliers & Entreprises)
          </p>
        </div>
        <Dialog open={isNewCardOpen} onOpenChange={setIsNewCardOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Commander une carte
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Commander une nouvelle carte</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous pour commander une nouvelle carte bancaire.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Client Selection */}
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select
                  value={newCard.clientId}
                  onValueChange={(value) => setNewCard({ ...newCard, clientId: value })}
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

              {/* Account Selection */}
              <div className="space-y-2">
                <Label htmlFor="account">Compte lié</Label>
                <Select
                  value={newCard.accountId}
                  onValueChange={(value) => setNewCard({ ...newCard, accountId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un compte" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.name} - {account.owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Card Type */}
              <div className="space-y-2">
                <Label htmlFor="cardType">Type de carte</Label>
                <Select
                  value={newCard.cardType}
                  onValueChange={(value) => setNewCard({ ...newCard, cardType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa Classic">Visa Classic</SelectItem>
                    <SelectItem value="Visa Business">Visa Business</SelectItem>
                    <SelectItem value="Visa Business Premium">Visa Business Premium</SelectItem>
                    <SelectItem value="Mastercard Gold">Mastercard Gold</SelectItem>
                    <SelectItem value="Visa Virtual">Visa Virtual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Card Category */}
              <div className="space-y-2">
                <Label htmlFor="cardCategory">Catégorie</Label>
                <Select
                  value={newCard.cardCategory}
                  onValueChange={(value) => setNewCard({ ...newCard, cardCategory: value })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Débit">Débit</SelectItem>
                    <SelectItem value="Crédit">Crédit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Limit */}
              <div className="space-y-2">
                <Label htmlFor="limit">Plafond</Label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="5000"
                  value={newCard.limit}
                  onChange={(e) =>
                    setNewCard({ ...newCard, limit: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isVirtual"
                    checked={newCard.isVirtual}
                    onChange={(e) => setNewCard({ ...newCard, isVirtual: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isVirtual" className="font-normal">
                    Carte virtuelle
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isContactless"
                    checked={newCard.isContactless}
                    onChange={(e) => setNewCard({ ...newCard, isContactless: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isContactless" className="font-normal">
                    Sans contact
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isOnline"
                    checked={newCard.isOnline}
                    onChange={(e) => setNewCard({ ...newCard, isOnline: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isOnline" className="font-normal">
                    Paiements en ligne
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewCardOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating card:", newCard);
                  setIsNewCardOpen(false);
                }}
              >
                Commander la carte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Cartes</CardDescription>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Actives</CardDescription>
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
              <CardDescription>Bloquées</CardDescription>
              <Ban className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blocked}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Virtuelles</CardDescription>
              <Smartphone className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.virtual}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Utilisé / Plafond</CardDescription>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsed.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })} /{" "}
              {stats.totalLimit.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
            </div>
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
                placeholder="Rechercher par nom, numéro de carte..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="blocked">Bloquée</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Type de carte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="Visa Classic">Visa Classic</SelectItem>
                  <SelectItem value="Visa Business">Visa Business</SelectItem>
                  <SelectItem value="Visa Business Premium">Visa Business Premium</SelectItem>
                  <SelectItem value="Mastercard Gold">Mastercard Gold</SelectItem>
                  <SelectItem value="Visa Virtual">Visa Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Card Visual */}
              <div
                className={`h-40 p-4 bg-linear-to-br ${getCardTypeColor(card.type)} text-white relative`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-xs font-medium opacity-80">{card.type}</div>
                  <Badge
                    variant="secondary"
                    className={card.isVirtual ? "bg-white/20 text-white" : "bg-white/20 text-white"}
                  >
                    {card.isVirtual ? "Virtuelle" : "Physique"}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="font-mono text-lg tracking-widest">
                    {showCardNumbers[card.id] ? card.cardNumber : formatCardNumber(card.cardNumber)}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70">TITULAIRE</p>
                    <p className="font-medium text-sm">{card.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">EXPIRE</p>
                    <p className="font-medium text-sm">{card.expiryDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleShowCard(card.id)}
                  className="absolute top-4 right-4 p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {showCardNumbers[card.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {/* Card Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {card.owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{card.owner}</p>
                      <p className="text-xs text-muted-foreground">{card.account}</p>
                    </div>
                  </div>
                  {getStatusBadge(card.status)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Plafond</p>
                    <p className="font-medium">{card.limit.toLocaleString("fr-FR")} €</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Utilisé</p>
                    <p className="font-medium">{card.used.toLocaleString("fr-FR")} €</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {card.isContactless && (
                    <Badge variant="outline" className="text-xs">
                      Sans contact
                    </Badge>
                  )}
                  {card.isOnline && (
                    <Badge variant="outline" className="text-xs">
                      Online
                    </Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full">
                      <MoreHorizontal className="h-4 w-4 mr-2" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/platform/cards/${card.id}`}>Voir détails</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem> Bloquer la carte</DropdownMenuItem>
                    <DropdownMenuItem>Modifier le plafond</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Annuler la carte</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucune carte trouvée</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
