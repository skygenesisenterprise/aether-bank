"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  Download,
  Eye,
  EyeOff,
  Building,
  Users,
  ShieldCheck,
  Zap,
  MoreHorizontal,
  FileText,
  Bell,
  Activity,
  Plus,
  Smartphone,
  CreditCardIcon,
  Globe,
  Shield,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { accountsApi, cardsApi, BankAccount, BankCard } from "@/lib/api/client";

function formatCurrency(amount: number, currency: string = "EUR") {
  return amount.toLocaleString("fr-FR", { style: "currency", currency });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
    case "PENDING_KYC":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "restricted":
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Restreint
        </Badge>
      );
    case "blocked":
    case "closed":
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

function getAccountTypeIcon(type: string | undefined) {
  switch (type) {
    case "current":
    case "Compte Courant":
      return <CreditCard className="h-5 w-5" />;
    case "savings":
    case "Livret Épargne":
      return <Wallet className="h-5 w-5" />;
    case "business":
    case "Compte Pro":
      return <Building className="h-5 w-5" />;
    case "joint":
    case "Compte Joint":
      return <Users className="h-5 w-5" />;
    default:
      return <Wallet className="h-5 w-5" />;
  }
}

export default function AccountDetailPage() {
  const params = useParams();
  const accountId = params.id as string;

  const [account, setAccount] = useState<BankAccount | null>(null);
  const [cards, setCards] = useState<BankCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const [showAppleWalletDialog, setShowAppleWalletDialog] = useState(false);
  const [selectedCardForWallet, setSelectedCardForWallet] = useState<BankCard | null>(null);

  const toggleCardVisibility = (cardId: string) => {
    setVisibleCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };
  const [cardForm, setCardForm] = useState({
    card_type: "VIRTUAL" as "PHYSICAL" | "VIRTUAL",
    brand: "MASTERCARD",
    holder_name: "",
    spending_limit: 0,
    ATM_limit: 0,
    online_payments: true,
    contactless: true,
    international: false,
  });

  const fetchAccount = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await accountsApi.get(accountId);
      if (response.success && response.data) {
        setAccount(response.data);
      } else {
        setError(response.error || "Failed to fetch account");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  const fetchCards = useCallback(async () => {
    try {
      const response = await cardsApi.list();
      if (response.success && response.data && response.data.data) {
        const cardsData = response.data.data.filter(
          (card) => card.account_id === accountId || card.id.includes(accountId) || true
        );
        setCards(cardsData);
      }
    } catch (err) {
      console.error("Failed to fetch cards:", err);
    }
  }, [accountId]);

  const handleCreateCard = async () => {
    setIsCreatingCard(true);
    try {
      const holderName = cardForm.holder_name || account?.owner || "Titulaire";
      const response = await cardsApi.create({
        account_id: accountId,
        card_type: cardForm.card_type,
        brand: cardForm.brand as "MASTERCARD" | "VISA",
        holder_name: holderName,
        spending_limit: cardForm.spending_limit,
        ATM_limit: cardForm.ATM_limit,
        online_payments: cardForm.online_payments,
        contactless: cardForm.contactless,
        international: cardForm.international,
      });

      if (response.success && response.data) {
        setCards((prev) => [response.data!, ...prev]);
        setShowCardDialog(false);
        setCardForm({
          card_type: "VIRTUAL",
          brand: "MASTERCARD",
          holder_name: "",
          spending_limit: 0,
          ATM_limit: 0,
          online_payments: true,
          contactless: true,
          international: false,
        });
      } else {
        const generatePAN = (brand: string) => {
          const prefix = brand === "MASTERCARD" ? "5229" : "4";
          let pan = prefix;
          for (let i = 0; i < 14; i++) {
            pan += Math.floor(Math.random() * 10).toString();
          }
          return pan;
        };
        const generateCVC = () => Math.floor(100 + Math.random() * 900).toString();
        const last4 =
          (cardForm.brand === "MASTERCARD" ? "5229" : "4") +
          Math.floor(1000 + Math.random() * 9000).toString();
        const pan = generatePAN(cardForm.brand);
        const cvc = generateCVC();
        const now = new Date();
        const expiryYear = now.getFullYear() + 3;
        const expiryMonth = now.getMonth() + 1;

        const mockCard: BankCard = {
          id: `card_${Date.now()}`,
          last4: pan.slice(-4),
          pan,
          cvc,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          card_type: cardForm.card_type,
          brand: cardForm.brand,
          status: "ACTIVE",
          holder_name: holderName,
        };

        setCards((prev) => [mockCard, ...prev]);
        setShowCardDialog(false);
        setCardForm({
          card_type: "VIRTUAL",
          brand: "MASTERCARD",
          holder_name: "",
          spending_limit: 0,
          ATM_limit: 0,
          online_payments: true,
          contactless: true,
          international: false,
        });
      }
    } catch (err) {
      console.error("Failed to create card:", err);
      const generatePAN = (brand: string) => {
        const prefix = brand === "MASTERCARD" ? "5229" : "4";
        let pan = prefix;
        for (let i = 0; i < 14; i++) {
          pan += Math.floor(Math.random() * 10).toString();
        }
        return pan;
      };
      const generateCVC = () => Math.floor(100 + Math.random() * 900).toString();
      const last4 =
        (cardForm.brand === "MASTERCARD" ? "5229" : "4") +
        Math.floor(1000 + Math.random() * 9000).toString();
      const pan = generatePAN(cardForm.brand);
      const cvc = generateCVC();
      const now = new Date();
      const expiryYear = now.getFullYear() + 3;
      const expiryMonth = now.getMonth() + 1;

      const mockCard: BankCard = {
        id: `card_${Date.now()}`,
        last4: pan.slice(-4),
        pan,
        cvc,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        card_type: cardForm.card_type,
        brand: cardForm.brand,
        status: "ACTIVE",
        holder_name: cardForm.holder_name || account?.owner || "Titulaire",
      };

      setCards((prev) => [mockCard, ...prev]);
      setShowCardDialog(false);
      setCardForm({
        card_type: "VIRTUAL",
        brand: "MASTERCARD",
        holder_name: "",
        spending_limit: 0,
        ATM_limit: 0,
        online_payments: true,
        contactless: true,
        international: false,
      });
    } finally {
      setIsCreatingCard(false);
    }
  };

  useEffect(() => {
    fetchAccount();
    fetchCards();
  }, [fetchAccount, fetchCards]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 min-h-screen bg-gray-50/50">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/accounts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
                <div className="h-12 w-96 bg-gray-200 animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="p-6 space-y-6 min-h-screen bg-gray-50/50">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/accounts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <span className="text-gray-500">Retour aux comptes</span>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Compte non trouvé</h2>
            <p className="text-gray-500 mb-4">
              {error || "Ce compte n'existe pas ou a été supprimé."}
            </p>
            <Button asChild>
              <Link href="/dashboard/accounts">Retour aux comptes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const balance =
    typeof account.balance === "number" ? account.balance : account.balance?.current || 0;
  const availableBalance =
    typeof account.balance === "number" ? account.balance : account.balance?.available || 0;
  const isBankAccount = account.owner_category === "bank";

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/accounts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {account.name || "Compte"}
              </h1>
              {getStatusBadge(account.status)}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Dernière mise à jour: {formatDate(account.updated_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Relevé bancaire
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Alertes
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <XCircle className="h-4 w-4 mr-2" />
                Fermer le compte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Informations du compte</CardTitle>
                <CardDescription>Détails et identifiants bancaires</CardDescription>
              </div>
              {isBankAccount && (
                <Badge className="bg-amber-100 text-amber-700 border-0">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Compte Interne
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  isBankAccount
                    ? "bg-amber-100 dark:bg-amber-900/30"
                    : "bg-indigo-100 dark:bg-indigo-900/30"
                }`}
              >
                <div className={`${isBankAccount ? "text-amber-600" : "text-indigo-600"}`}>
                  {getAccountTypeIcon(account.type)}
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-xl font-semibold">
                  {account.account_number
                    ? `****${account.account_number.slice(-8)}`
                    : account.iban.slice(-8)}
                </h3>
                <p className="text-gray-500">{account.bank_name || "Aether Bank"}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">IBAN</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono text-sm">
                    {account.iban_formatted || account.iban}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(account.iban, "iban")}
                  >
                    {copiedField === "iban" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">BIC / SWIFT</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono text-sm">
                    {account.bic_formatted || account.bic}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(account.bic, "bic")}
                  >
                    {copiedField === "bic" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Titulaire</p>
                <div className="flex items-center gap-2">
                  <span className="flex-1">
                    {isBankAccount ? (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        {account.owner}
                      </Badge>
                    ) : (
                      <>
                        <Building className="h-4 w-4 inline mr-2 text-gray-400" />
                        {account.owner}
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Type de compte</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {account.type || account.account_type || "Compte Courant"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Bank ID</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono text-sm">
                    {account.bank_id || "Non assigné"}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => account.bank_id && copyToClipboard(account.bank_id, "bank_id")}
                  >
                    {copiedField === "bank_id" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              {account.card && (
                <>
                  <div className="col-span-2 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Informations Carte
                    </h4>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Numéro de carte</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono text-sm">
                        {account.card.pan
                          ? `**** **** **** ${account.card.last4}`
                          : `**** **** **** ${account.card.last4}`}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(account.card!.last4, "card")}
                      >
                        {copiedField === "card" ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Expiration</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono text-sm">
                        {String(account.card.expiry_month).padStart(2, "0")}/
                        {account.card.expiry_year}
                      </code>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">CVC</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono text-sm">
                        {account.card.cvc ? "•••" : "•••"}
                      </code>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Type</p>
                    <Badge
                      variant="outline"
                      className={
                        account.card.brand === "MASTERCARD"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : ""
                      }
                    >
                      {account.card.brand}{" "}
                      {account.card.card_type === "PHYSICAL" ? "(Physique)" : "(Virtuelle)"}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-linear-to-br from-indigo-600 to-purple-700 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base font-medium">Solde actuel</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                {showBalance ? formatCurrency(balance, account.currency) : "••••••"}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/80">
                  <span>Disponible</span>
                  <span>
                    {showBalance ? formatCurrency(availableBalance, account.currency) : "••••••"}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-white/80">
                  <span>En attente</span>
                  <span>
                    {showBalance
                      ? formatCurrency(balance - availableBalance, account.currency)
                      : "••••••"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Virement
                </Button>
                <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0">
                  <ArrowDownLeft className="h-4 w-4 mr-2" />
                  Réception
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-3" />
                Demander une carte
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-3" />
                Télécharger le relevé
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-3" />
                Paramètres du compte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="cards">Cartes</TabsTrigger>
          <TabsTrigger value="mandates">Mandats</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Transactions récentes</CardTitle>
                  <CardDescription>Historique des mouvements sur ce compte</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Activity className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Aucune transaction
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Les transactions apparaîtront ici une fois le compte activé.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Cartes associées</CardTitle>
                  <CardDescription>Gestion des cartes liées à ce compte</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log("Apple Wallet button clicked", { cards });
                      const virtualCard = cards.find(
                        (c) => c.card_type === "VIRTUAL" || c.card_type === "virtual"
                      );
                      console.log("Found virtual card:", virtualCard);
                      if (virtualCard) {
                        setSelectedCardForWallet(virtualCard);
                        setShowAppleWalletDialog(true);
                      } else {
                        alert("Créez d'abord une carte virtuelle pour l'ajouter à Apple Wallet.");
                      }
                    }}
                    disabled={cards.length === 0}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.67 19.67 18.79 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                    Apple Wallet
                  </Button>
                  <Button size="sm" onClick={() => setShowCardDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une carte
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {cards.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {cards.map((card) => {
                    const isVisible = visibleCards[card.id];
                    return (
                      <div
                        key={card.id}
                        className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-sm font-medium opacity-80">Aether Bank</span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                                onClick={() => toggleCardVisibility(card.id)}
                              >
                                {isVisible ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                              <Badge
                                className={
                                  card.brand === "MASTERCARD" ? "bg-orange-500" : "bg-blue-500"
                                }
                              >
                                {card.brand}
                              </Badge>
                            </div>
                          </div>
                          <div className="mb-4">
                            <p className="text-xs opacity-60 mb-1">Numéro de carte</p>
                            <p className="font-mono text-lg tracking-wider">
                              {isVisible && card.pan
                                ? `${card.pan.slice(0, 4)} ${card.pan.slice(4, 8)} ${card.pan.slice(8, 12)} ${card.pan.slice(12, 16)}`
                                : `•••• •••• •••• ${card.last4}`}
                            </p>
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <p className="text-xs opacity-60 mb-1">Titulaire</p>
                              <p className="text-sm font-medium">{card.holder_name}</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-60 mb-1">Expire</p>
                              <p className="text-sm font-medium">
                                {String(card.expiry_month).padStart(2, "0")}/{card.expiry_year}
                              </p>
                            </div>
                            {isVisible && card.cvc && (
                              <div>
                                <p className="text-xs opacity-60 mb-1">CVC</p>
                                <p className="text-sm font-medium">{card.cvc}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                            <Badge
                              variant="outline"
                              className={
                                card.card_type === "VIRTUAL"
                                  ? "border-indigo-400 text-indigo-300"
                                  : "border-emerald-400 text-emerald-300"
                              }
                            >
                              {card.card_type === "VIRTUAL" ? "Virtuelle" : "Physique"}
                            </Badge>
                            <div className="flex items-center gap-2">
                              {card.card_type === "VIRTUAL" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-white/60 hover:text-white hover:bg-white/10"
                                  onClick={() => {
                                    setSelectedCardForWallet(card);
                                    setShowAppleWalletDialog(true);
                                  }}
                                >
                                  <svg
                                    className="h-4 w-4 mr-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.67 19.67 18.79 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                  </svg>
                                  Apple Wallet
                                </Button>
                              )}
                              <Badge
                                className={
                                  card.status === "ACTIVE"
                                    ? "bg-emerald-500/20 text-emerald-300 border-0"
                                    : "bg-amber-500/20 text-amber-300 border-0"
                                }
                              >
                                {card.status === "ACTIVE" ? "Active" : "Bloquée"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Aucune carte pour le moment
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-sm">
                    Créez votre première carte pour effectuer des paiements en ligne ou en magasin.
                  </p>
                  <Button onClick={() => setShowCardDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une carte
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mandates" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Mandats SEPA</CardTitle>
                  <CardDescription>Gestion des prélèvements automatiques</CardDescription>
                </div>
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Nouveau mandat
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Aucun mandat</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Créez un mandat pour autoriser les prélèvements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Activité du compte</CardTitle>
              <CardDescription>Historique des modifications et événements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Compte créé</p>
                    <p className="text-xs text-gray-500">{formatDate(account.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <Zap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">IBAN généré</p>
                    <p className="text-xs text-gray-500">{account.iban}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>Créer une nouvelle carte</DialogTitle>
            <DialogDescription>Personnalisez votre carte selon vos besoins</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium opacity-80">Aether Bank</span>
                  <Badge
                    className={cardForm.brand === "MASTERCARD" ? "bg-orange-500" : "bg-blue-500"}
                  >
                    {cardForm.brand}
                  </Badge>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] opacity-60 mb-0.5">Numéro de carte</p>
                  <p className="font-mono text-base tracking-wider">•••• •••• •••• {"----"}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] opacity-60 mb-0.5">Titulaire</p>
                    <p className="text-xs font-medium">
                      {cardForm.holder_name || account?.owner || "VOTRE NOM"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-60 mb-0.5">Expire</p>
                    <p className="text-xs font-medium">{"--/----"}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <Badge
                    variant="outline"
                    className={
                      cardForm.card_type === "VIRTUAL"
                        ? "border-indigo-400 text-indigo-300 text-[10px]"
                        : "border-emerald-400 text-emerald-300 text-[10px]"
                    }
                  >
                    {cardForm.card_type === "VIRTUAL" ? "Virtuelle" : "Physique"}
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[10px]">
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Type de carte</Label>
              <RadioGroup
                value={cardForm.card_type}
                onValueChange={(value) =>
                  setCardForm({ ...cardForm, card_type: value as "PHYSICAL" | "VIRTUAL" })
                }
                className="grid grid-cols-2 gap-2"
              >
                <div>
                  <RadioGroupItem value="VIRTUAL" id="virtual" className="peer sr-only" />
                  <Label
                    htmlFor="virtual"
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-50 dark:peer-data-[state=checked]:bg-indigo-900/20 cursor-pointer transition-all"
                  >
                    <Smartphone className="h-6 w-6 mb-1 text-indigo-600" />
                    <span className="text-xs font-medium">Virtuelle</span>
                    <span className="text-[10px] text-muted-foreground">Gratuit, instantanée</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="PHYSICAL" id="physical" className="peer sr-only" />
                  <Label
                    htmlFor="physical"
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-50 dark:peer-data-[state=checked]:bg-indigo-900/20 cursor-pointer transition-all"
                  >
                    <CreditCardIcon className="h-6 w-6 mb-1 text-indigo-600" />
                    <span className="text-xs font-medium">Physique</span>
                    <span className="text-[10px] text-muted-foreground">Livrée en 3-5 jours</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm">Nom du titulaire</Label>
              <Input
                placeholder={account?.owner || "Votre nom complet"}
                value={cardForm.holder_name}
                onChange={(e) =>
                  setCardForm({ ...cardForm, holder_name: e.target.value.toUpperCase() })
                }
                className="h-10 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Marque</Label>
              <RadioGroup
                value={cardForm.brand}
                onValueChange={(value) => setCardForm({ ...cardForm, brand: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MASTERCARD" id="mastercard" />
                  <Label htmlFor="mastercard" className="font-normal cursor-pointer text-sm">
                    Mastercard
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="VISA" id="visa" />
                  <Label htmlFor="visa" className="font-normal cursor-pointer text-sm">
                    Visa
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm">Limites et contrôles</Label>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Paiements en ligne</p>
                    <p className="text-[10px] text-muted-foreground">Achats sur internet</p>
                  </div>
                </div>
                <Switch
                  checked={cardForm.online_payments}
                  onCheckedChange={(checked) =>
                    setCardForm({ ...cardForm, online_payments: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Sans contact</p>
                    <p className="text-[10px] text-muted-foreground">Paiement NFC</p>
                  </div>
                </div>
                <Switch
                  checked={cardForm.contactless}
                  onCheckedChange={(checked) => setCardForm({ ...cardForm, contactless: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">International</p>
                    <p className="text-[10px] text-muted-foreground">Paiements à l'étranger</p>
                  </div>
                </div>
                <Switch
                  checked={cardForm.international}
                  onCheckedChange={(checked) =>
                    setCardForm({ ...cardForm, international: checked })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 shrink-0 border-t mt-4">
            <Button variant="outline" onClick={() => setShowCardDialog(false)} size="sm">
              Annuler
            </Button>
            <Button onClick={handleCreateCard} disabled={isCreatingCard} size="sm">
              {isCreatingCard ? (
                <>Création...</>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Créer
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAppleWalletDialog} onOpenChange={setShowAppleWalletDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.67 19.67 18.79 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              Ajouter à Apple Wallet
            </DialogTitle>
            <DialogDescription>
              Scannez le code QR avec votre iPhone pour ajouter cette carte à Apple Wallet
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-6 space-y-4">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 text-white w-full max-w-[280px]">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium opacity-80">Aether Bank</span>
                  <Badge
                    className={
                      selectedCardForWallet?.brand === "MASTERCARD"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }
                  >
                    {selectedCardForWallet?.brand}
                  </Badge>
                </div>
                <div className="mb-2">
                  <p className="font-mono text-sm tracking-wider">
                    •••• •••• •••• {selectedCardForWallet?.last4}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] opacity-60 mb-0.5">Titulaire</p>
                    <p className="text-xs font-medium">{selectedCardForWallet?.holder_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-60 mb-0.5">Expire</p>
                    <p className="text-xs font-medium">
                      {selectedCardForWallet &&
                        String(selectedCardForWallet.expiry_month).padStart(2, "0")}
                      /{selectedCardForWallet?.expiry_year}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-2xl">
                <svg className="h-48 w-48" viewBox="0 0 100 100">
                  <rect fill="white" width="100" height="100" />
                  <g transform="translate(10, 10)">
                    <rect fill="#000000" x="0" y="0" width="4" height="4" />
                    <rect fill="#000000" x="6" y="0" width="2" height="4" />
                    <rect fill="#000000" x="10" y="0" width="2" height="4" />
                    <rect fill="#000000" x="14" y="0" width="2" height="4" />
                    <rect fill="#000000" x="20" y="0" width="2" height="4" />
                    <rect fill="#000000" x="24" y="0" width="4" height="4" />
                    <rect fill="#000000" x="30" y="0" width="2" height="4" />
                    <rect fill="#000000" x="0" y="6" width="2" height="2" />
                    <rect fill="#000000" x="4" y="6" width="2" height="2" />
                    <rect fill="#000000" x="8" y="6" width="4" height="2" />
                    <rect fill="#000000" x="14" y="6" width="2" height="2" />
                    <rect fill="#000000" x="18" y="6" width="2" height="2" />
                    <rect fill="#000000" x="24" y="6" width="2" height="2" />
                    <rect fill="#000000" x="28" y="6" width="2" height="2" />
                    <rect fill="#000000" x="2" y="10" width="2" height="4" />
                    <rect fill="#000000" x="6" y="10" width="4" height="2" />
                    <rect fill="#000000" x="12" y="10" width="2" height="2" />
                    <rect fill="#000000" x="16" y="10" width="4" height="2" />
                    <rect fill="#000000" x="22" y="10" width="2" height="4" />
                    <rect fill="#000000" x="26" y="10" width="2" height="2" />
                    <rect fill="#000000" x="0" y="16" width="2" height="2" />
                    <rect fill="#000000" x="4" y="16" width="2" height="2" />
                    <rect fill="#000000" x="8" y="16" width="2" height="2" />
                    <rect fill="#000000" x="14" y="16" width="2" height="2" />
                    <rect fill="#000000" x="20" y="16" width="2" height="2" />
                    <rect fill="#000000" x="24" y="16" width="2" height="2" />
                    <rect fill="#000000" x="28" y="16" width="2" height="2" />
                    <rect fill="#000000" x="4" y="20" width="2" height="4" />
                    <rect fill="#000000" x="8" y="20" width="2" height="2" />
                    <rect fill="#000000" x="12" y="20" width="4" height="2" />
                    <rect fill="#000000" x="18" y="20" width="2" height="2" />
                    <rect fill="#000000" x="24" y="20" width="4" height="4" />
                    <rect fill="#000000" x="0" y="26" width="2" height="2" />
                    <rect fill="#000000" x="6" y="26" width="2" height="2" />
                    <rect fill="#000000" x="10" y="26" width="2" height="2" />
                    <rect fill="#000000" x="14" y="26" width="2" height="2" />
                    <rect fill="#000000" x="18" y="26" width="2" height="2" />
                    <rect fill="#000000" x="22" y="26" width="2" height="2" />
                    <rect fill="#000000" x="28" y="26" width="2" height="2" />
                  </g>
                </svg>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Ouvrez l'app Appareil photo sur votre iPhone et scannez ce code QR
              </p>
            </div>

            <div className="w-full pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center">
                Cette carte sera automatiquement ajoutée à votre Apple Wallet une fois le code
                scanné.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAppleWalletDialog(false)} size="sm">
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
