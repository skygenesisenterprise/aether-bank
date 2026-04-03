"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Smartphone,
  Ban,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Calendar,
  Zap,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";

import { cardsApi, BankCard } from "@/lib/api/client";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

interface CardFormData {
  account_id: string;
  card_type: "PHYSICAL" | "VIRTUAL";
  brand: "MASTERCARD" | "VISA";
  holder_name: string;
  spending_limit: number;
  contactless: boolean;
  online_payments: boolean;
}

function formatCardNumber(last4: string, showFull: boolean = false) {
  if (showFull) return `**** **** **** ${last4}`;
  return `**** **** **** ${last4}`;
}

function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
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
    case "frozen":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
          <Ban className="w-3 h-3 mr-1" />
          Bloquée
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getCardTypeColor(brand: string) {
  switch (brand?.toUpperCase()) {
    case "VISA":
      return "from-blue-600 to-blue-800";
    case "MASTERCARD":
      return "from-amber-500 to-amber-700";
    default:
      return "from-indigo-600 to-indigo-800";
  }
}

export default function CardsPage() {
  const [cards, setCards] = useState<BankCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showCardNumbers, setShowCardNumbers] = useState<Record<string, boolean>>({});
  const [accounts, setAccounts] = useState<{ id: string; name: string; owner: string }[]>([]);

  const [newCard, setNewCard] = useState<CardFormData>({
    account_id: "",
    card_type: "PHYSICAL",
    brand: "VISA",
    holder_name: "",
    spending_limit: 5000,
    contactless: true,
    online_payments: true,
  });

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await cardsApi.list();
      console.log("[DEBUG] Cards response:", response);
      if (response && response.success && response.data) {
        const cardsData = Array.isArray(response.data) ? response.data : response.data.data || [];
        setCards(cardsData);
      } else {
        setError(response?.error || "Failed to fetch cards");
      }
    } catch (err) {
      console.error("[ERROR] Failed to fetch cards:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const { accountsApi } = await import("@/lib/api/client");
      const response = await accountsApi.list({ status: "active" });
      if (response && response.success && response.data) {
        const accountsData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setAccounts(
          accountsData.map(
            (acc: { id: string; name?: string; owner?: string; holder?: { name: string } }) => ({
              id: acc.id,
              name: acc.name || acc.holder?.name || acc.id,
              owner: acc.owner || acc.holder?.name || "",
            })
          )
        );
      }
    } catch (err) {
      console.error("[ERROR] Failed to fetch accounts:", err);
    }
  }, []);

  useEffect(() => {
    fetchCards();
    fetchAccounts();
  }, [fetchCards, fetchAccounts]);

  const handleCreateCard = async () => {
    setIsCreating(true);
    try {
      const response = await cardsApi.create(newCard);
      if (response.success) {
        setIsNewCardOpen(false);
        fetchCards();
        setNewCard({
          account_id: "",
          card_type: "PHYSICAL",
          brand: "VISA",
          holder_name: "",
          spending_limit: 5000,
          contactless: true,
          online_payments: true,
        });
      }
    } catch (err) {
      console.error("[ERROR] Failed to create card:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleFreezeCard = async (id: string) => {
    try {
      await cardsApi.freeze(id);
      fetchCards();
    } catch (err) {
      console.error("[ERROR] Failed to freeze card:", err);
    }
  };

  const handleUnfreezeCard = async (id: string) => {
    try {
      await cardsApi.unfreeze(id);
      fetchCards();
    } catch (err) {
      console.error("[ERROR] Failed to unfreeze card:", err);
    }
  };

  const toggleShowCard = (id: string) => {
    setShowCardNumbers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      (card.holder_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (card.last4 || "").includes(searchQuery) ||
      (card.id || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || card.status === statusFilter;
    const matchesType = typeFilter === "all" || card.card_type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: cards.length,
    active: cards.filter((c) => c.status === "active").length,
    pending: cards.filter((c) => c.status === "pending").length,
    blocked: cards.filter((c) => c.status === "blocked" || c.status === "frozen").length,
    virtual: cards.filter((c) => c.card_type === "VIRTUAL").length,
    physical: cards.filter((c) => c.card_type === "PHYSICAL").length,
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cartes Bancaires</h1>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
              <Zap className="h-3 w-3 mr-1" />
              En direct
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gestion des cartes bancaires clients (Particuliers & Entreprises)
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
          <Button variant="outline" onClick={fetchCards} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium">
                Total Cartes
              </CardDescription>
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                <CreditCard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
              <CheckCircle className="h-3 w-3" />
              <span className="font-semibold">+{stats.active}</span>
              <span className="text-gray-500 dark:text-gray-400">actives</span>
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
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.active}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <span>{Math.round((stats.active / Math.max(stats.total, 1)) * 100)}% du total</span>
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
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pending}</div>
            <div className="flex items-center gap-1 text-xs text-amber-600 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-semibold">Attention requise</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-red-50 to-white dark:from-red-950/30 dark:to-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-red-700 dark:text-red-300 font-medium">
                Bloquées
              </CardDescription>
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                <Ban className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.blocked}</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-semibold">Action requise</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Cartes Physiques</CardDescription>
              <CreditCard className="h-4 w-4 text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.physical}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              {Math.round((stats.physical / Math.max(stats.total, 1)) * 100)}% du total
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Cartes Virtuelles</CardDescription>
              <Smartphone className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.virtual}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              {Math.round((stats.virtual / Math.max(stats.total, 1)) * 100)}% du total
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-indigo-600 to-purple-700 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-indigo-200">Score Santé</CardDescription>
              <CheckCircle className="h-4 w-4 text-indigo-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.active / Math.max(stats.total, 1)) * 100)}%
            </div>
            <div className="text-xs text-indigo-200 mt-1">Cartes actives</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, numéro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white dark:bg-gray-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36 bg-white dark:bg-gray-800">
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
                  <SelectTrigger className="w-40 bg-white dark:bg-gray-800">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous types</SelectItem>
                    <SelectItem value="PHYSICAL">Physique</SelectItem>
                    <SelectItem value="VIRTUAL">Virtuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Dialog open={isNewCardOpen} onOpenChange={setIsNewCardOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Commander une carte
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Commander une nouvelle carte</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations ci-dessous pour commander une nouvelle carte
                    bancaire.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="account">Compte lié</Label>
                    <Select
                      value={newCard.account_id}
                      onValueChange={(value) => setNewCard({ ...newCard, account_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un compte" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} - {account.owner}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="holder_name">Nom du titulaire</Label>
                    <Input
                      id="holder_name"
                      placeholder="MARIE DUPONT"
                      value={newCard.holder_name}
                      onChange={(e) =>
                        setNewCard({ ...newCard, holder_name: e.target.value.toUpperCase() })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card_type">Type de carte</Label>
                      <Select
                        value={newCard.card_type}
                        onValueChange={(value: "PHYSICAL" | "VIRTUAL") =>
                          setNewCard({ ...newCard, card_type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PHYSICAL">Physique</SelectItem>
                          <SelectItem value="VIRTUAL">Virtuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="brand">Marque</Label>
                      <Select
                        value={newCard.brand}
                        onValueChange={(value: "MASTERCARD" | "VISA") =>
                          setNewCard({ ...newCard, brand: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VISA">Visa</SelectItem>
                          <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spending_limit">Plafond de dépenses (EUR)</Label>
                    <Input
                      id="spending_limit"
                      type="number"
                      placeholder="5000"
                      value={newCard.spending_limit}
                      onChange={(e) =>
                        setNewCard({ ...newCard, spending_limit: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Options</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="contactless"
                        checked={newCard.contactless}
                        onChange={(e) => setNewCard({ ...newCard, contactless: e.target.checked })}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="contactless" className="font-normal">
                        Sans contact
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="online_payments"
                        checked={newCard.online_payments}
                        onChange={(e) =>
                          setNewCard({ ...newCard, online_payments: e.target.checked })
                        }
                        className="h-4 w-4"
                      />
                      <Label htmlFor="online_payments" className="font-normal">
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
                    onClick={handleCreateCard}
                    disabled={isCreating || !newCard.account_id || !newCard.holder_name}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isCreating ? "Création..." : "Commander la carte"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : error ? (
          <Card className="col-span-full border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Ban className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={fetchCards}>
                Réessayer
              </Button>
            </CardContent>
          </Card>
        ) : filteredCards.length === 0 ? (
          <Card className="col-span-full border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune carte trouvée</p>
            </CardContent>
          </Card>
        ) : (
          filteredCards.map((card) => (
            <Card
              key={card.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Card Visual */}
                <div
                  className={`h-40 p-4 bg-linear-to-br ${getCardTypeColor(card.brand)} text-white relative`}
                >
                  <div className="flex justify-between items-start">
                    <div className="text-xs font-medium opacity-80">
                      {card.brand} {card.card_type === "VIRTUAL" ? "Virtual" : ""}
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {card.card_type === "VIRTUAL" ? "Virtuelle" : "Physique"}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="font-mono text-lg tracking-widest">
                      {showCardNumbers[card.id]
                        ? `**** **** **** ${card.last4}`
                        : "**** **** **** ****"}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-70">TITULAIRE</p>
                      <p className="font-medium text-sm">{card.holder_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-70">EXPIRE</p>
                      <p className="font-medium text-sm">
                        {String(card.expiry_month).padStart(2, "0")}/{card.expiry_year}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleShowCard(card.id)}
                    className="absolute top-4 right-4 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
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
                        <AvatarFallback className="text-xs bg-indigo-100 text-indigo-600 font-semibold">
                          {(card.holder_name || "XX")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {card.holder_name || "Titulaire"}
                        </p>
                        <p className="text-xs text-muted-foreground">#{card.last4}</p>
                      </div>
                    </div>
                    {getStatusBadge(card.status)}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Compte</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {card.account_id?.substring(0, 8)}...
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {card.card_type?.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    {card.contactless && (
                      <Badge variant="outline" className="text-xs">
                        Sans contact
                      </Badge>
                    )}
                    {card.online_payments && (
                      <Badge variant="outline" className="text-xs">
                        En ligne
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
                        <Link href={`/dashboard/cards/${card.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {card.status === "blocked" || card.status === "frozen" ? (
                        <DropdownMenuItem onClick={() => handleUnfreezeCard(card.id)}>
                          <Check className="h-4 w-4 mr-2 text-emerald-600" />
                          Débloquer la carte
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleFreezeCard(card.id)}
                          className="text-amber-600"
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Bloquer la carte
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        Annuler la carte
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
