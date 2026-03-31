"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Send,
  Eye,
  Building,
  User,
  XCircle,
  RefreshCw,
  Mail,
  Printer,
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

const invoices = [
  {
    id: 1,
    invoiceNumber: "FA-2026-001",
    type: "Facture",
    client: "SARL TechSolutions",
    clientType: "Entreprise",
    account: "Compte Pro #1245",
    amount: 2450.0,
    status: "paid",
    issueDate: "2026-03-15",
    dueDate: "2026-04-14",
    paidDate: "2026-03-20",
    items: [
      { description: "Frais de gestion mensuels", quantity: 1, unitPrice: 2000.0, total: 2000.0 },
      {
        description: "Cartes bancaires additionnelles",
        quantity: 3,
        unitPrice: 150.0,
        total: 450.0,
      },
    ],
  },
  {
    id: 2,
    invoiceNumber: "FA-2026-002",
    type: "Facture",
    client: "Marie Dupont",
    clientType: "Particulier",
    account: "Compte Particulier #7821",
    amount: 120.0,
    status: "paid",
    issueDate: "2026-03-20",
    dueDate: "2026-04-19",
    paidDate: "2026-03-22",
    items: [{ description: "Cotisation carte Gold", quantity: 1, unitPrice: 120.0, total: 120.0 }],
  },
  {
    id: 3,
    invoiceNumber: "FA-2026-003",
    type: "Facture",
    client: "SAS InnovTech",
    clientType: "Entreprise",
    account: "Compte Pro #8934",
    amount: 5800.0,
    status: "pending",
    issueDate: "2026-03-25",
    dueDate: "2026-04-24",
    paidDate: null,
    items: [
      { description: "Frais de gestion mensuels", quantity: 1, unitPrice: 2500.0, total: 2500.0 },
      {
        description: "Virements SEPA supplémentaires",
        quantity: 30,
        unitPrice: 50.0,
        total: 1500.0,
      },
      { description: "Cartes business", quantity: 5, unitPrice: 360.0, total: 1800.0 },
    ],
  },
  {
    id: 4,
    invoiceNumber: "AV-2026-001",
    type: "Avoir",
    client: "EURL Boulanger",
    clientType: "Entreprise",
    account: "Compte Pro #5623",
    amount: -500.0,
    status: "paid",
    issueDate: "2026-03-10",
    dueDate: "2026-03-25",
    paidDate: "2026-03-12",
    items: [
      {
        description: "Remboursement frais de résiliation",
        quantity: 1,
        unitPrice: -500.0,
        total: -500.0,
      },
    ],
  },
  {
    id: 5,
    invoiceNumber: "FA-2026-004",
    type: "Facture",
    client: "Jean Martin",
    clientType: "Particulier",
    account: "Compte Particulier #7821",
    amount: 180.0,
    status: "overdue",
    issueDate: "2026-02-15",
    dueDate: "2026-03-16",
    paidDate: null,
    items: [
      { description: "Cotisation carte Classic", quantity: 1, unitPrice: 60.0, total: 60.0 },
      { description: "Frais de tenue de compte", quantity: 1, unitPrice: 120.0, total: 120.0 },
    ],
  },
  {
    id: 6,
    invoiceNumber: "FA-2026-005",
    type: "Facture",
    client: "Pierre Durant",
    clientType: "Particulier",
    account: "Compte Particulier #6734",
    amount: 240.0,
    status: "draft",
    issueDate: "2026-03-28",
    dueDate: "2026-04-27",
    paidDate: null,
    items: [{ description: "Frais de compte bloqué", quantity: 1, unitPrice: 240.0, total: 240.0 }],
  },
];

const clients = [
  { id: 1, name: "SARL TechSolutions", type: "Entreprise" },
  { id: 2, name: "Marie Dupont", type: "Particulier" },
  { id: 3, name: "SAS InnovTech", type: "Entreprise" },
  { id: 4, name: "Jean Martin", type: "Particulier" },
  { id: 5, name: "EURL Boulanger", type: "Entreprise" },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(date: string | null) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Payée
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "overdue":
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          En retard
        </Badge>
      );
    case "draft":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-600">
          <FileText className="w-3 h-3 mr-1" />
          Brouillon
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getTypeBadge(type: string) {
  switch (type) {
    case "Facture":
      return <Badge variant="default">Facture</Badge>;
    case "Avoir":
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
          Avoir
        </Badge>
      );
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientId: "",
    invoiceType: "Facture",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
  });

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    const matchesType = typeFilter === "all" || invoice.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "paid").length,
    pending: invoices.filter((i) => i.status === "pending").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
    draft: invoices.filter((i) => i.status === "draft").length,
    totalAmount: invoices
      .filter((i) => i.type === "Facture" && i.status !== "draft")
      .reduce((sum, i) => sum + i.amount, 0),
    paidAmount: invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0),
    pendingAmount: invoices
      .filter((i) => i.status === "pending" || i.status === "overdue")
      .reduce((sum, i) => sum + i.amount, 0),
  };

  const addItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const removeItem = (index: number) => {
    const updatedItems = newInvoice.items.filter((_, i) => i !== index);
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const totalInvoice = newInvoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Factures</h1>
          <p className="text-sm text-muted-foreground">Gestion des factures et avoirs clients</p>
        </div>
        <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle facture
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle facture</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous pour créer une nouvelle facture.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Client Selection */}
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select
                  value={newInvoice.clientId}
                  onValueChange={(value) => setNewInvoice({ ...newInvoice, clientId: value })}
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

              {/* Invoice Type */}
              <div className="space-y-2">
                <Label htmlFor="invoiceType">Type de document</Label>
                <Select
                  value={newInvoice.invoiceType}
                  onValueChange={(value) => setNewInvoice({ ...newInvoice, invoiceType: value })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facture">Facture</SelectItem>
                    <SelectItem value="Avoir">Avoir</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <Label>Articles</Label>
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="w-20">
                      <Input
                        type="number"
                        placeholder="Qté"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        type="number"
                        placeholder="Prix"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(index, "unitPrice", parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="w-24 text-right font-medium">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      disabled={newInvoice.items.length === 1}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un article
                </Button>
              </div>

              {/* Total */}
              <div className="flex justify-end gap-4 border-t pt-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalInvoice)}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewInvoiceOpen(false)}>
                Annuler
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  console.log("Saving as draft:", newInvoice);
                  setIsNewInvoiceOpen(false);
                }}
              >
                Enregistrer brouillon
              </Button>
              <Button
                onClick={() => {
                  console.log("Creating invoice:", newInvoice);
                  setIsNewInvoiceOpen(false);
                }}
              >
                Créer et envoyer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Total Factures</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Montant Payé</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.paidAmount)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>En Attente</CardDescription>
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.pendingAmount)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>En Retard</CardDescription>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overdue}</div>
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
                placeholder="Rechercher par numéro, client..."
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
                  <SelectItem value="paid">Payée</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="overdue">En retard</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="Facture">Facture</SelectItem>
                  <SelectItem value="Avoir">Avoir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Liste des Factures</CardTitle>
              <CardDescription>
                {filteredInvoices.length} document{filteredInvoices.length !== 1 ? "s" : ""} trouvé
                {filteredInvoices.length !== 1 ? "s" : ""}
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
                      N° Document
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Compte</th>
                  <th className="text-left p-4 font-medium">Émission</th>
                  <th className="text-left p-4 font-medium">Échéance</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-right p-4 font-medium">Montant</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-muted-foreground">{invoice.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getTypeBadge(invoice.type)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {invoice.client
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{invoice.client}</p>
                          <p className="text-xs text-muted-foreground">
                            {invoice.clientType === "Entreprise" ? (
                              <Building className="h-3 w-3 inline mr-1" />
                            ) : (
                              <User className="h-3 w-3 inline mr-1" />
                            )}
                            {invoice.clientType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{invoice.account}</td>
                    <td className="p-4 text-sm">{formatDate(invoice.issueDate)}</td>
                    <td className="p-4 text-sm">{formatDate(invoice.dueDate)}</td>
                    <td className="p-4">{getStatusBadge(invoice.status)}</td>
                    <td className="p-4 text-right">
                      <p
                        className={`font-medium text-sm ${invoice.amount < 0 ? "text-red-600" : ""}`}
                      >
                        {formatCurrency(invoice.amount)}
                      </p>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Envoyer par email
                          </DropdownMenuItem>
                          {invoice.status === "pending" && (
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Marquer payée
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Annuler
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

      {filteredInvoices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucune facture trouvée</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
