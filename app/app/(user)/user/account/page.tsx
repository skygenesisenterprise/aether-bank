"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  CheckCircle,
  Download,
  Edit,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CreditCard,
  PiggyBank,
  Wallet,
  Building2,
  Clock,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const accounts = [
  {
    id: 1,
    name: "Compte professionnel",
    type: "Pro",
    iban: "FR76 3000 6000 0012 3456 7890 189",
    bic: "AGRIFRPP882",
    balance: 24850.0,
    currency: "EUR",
    trend: "+2.4%",
    trendUp: true,
    status: "active",
    openedDate: "15 mars 2023",
    rib: "30006 00012 12345678901 88",
  },
  {
    id: 2,
    name: "Livret A",
    type: "Épargne",
    iban: "FR76 3000 6000 0022 3456 7890 190",
    bic: "AGRIFRPP882",
    balance: 5200.0,
    currency: "EUR",
    trend: "+1.2%",
    trendUp: true,
    status: "active",
    openedDate: "20 avril 2023",
    rib: "30006 00022 22345678901 90",
  },
  {
    id: 3,
    name: "Compte titres",
    type: "Investissement",
    iban: "FR76 3000 6000 0032 3456 7890 191",
    bic: "AGRIFRPP882",
    balance: 15750.0,
    currency: "EUR",
    trend: "+8.5%",
    trendUp: true,
    status: "active",
    openedDate: "10 juin 2023",
    rib: "30006 00032 32345678901 91",
  },
];

const accountTypes = [
  { type: "Pro", icon: Building2, color: "bg-indigo-500" },
  { type: "Épargne", icon: PiggyBank, color: "bg-green-500" },
  { type: "Investissement", icon: TrendingUp, color: "bg-purple-500" },
];

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export default function UserAccountPage() {
  const [showIban, setShowIban] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const toggleIban = (id: number) => {
    setShowIban((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getAccountTypeInfo = (type: string) => {
    return accountTypes.find((t) => t.type === type) || { icon: Building2, color: "bg-gray-500" };
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes comptes</h1>
          <p className="text-sm text-gray-500">Gérez vos comptes bancaires et vos coordonnées</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Ouvrir un compte
        </Button>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Solde total</p>
              <p className="text-4xl font-bold mt-1">
                {totalBalance.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm text-indigo-100">+4.2% ce mois</span>
              </div>
            </div>
            <div className="hidden md:block">
              <Building2 className="w-16 h-16 text-white/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account) => {
          const typeInfo = getAccountTypeInfo(account.type);
          const Icon = typeInfo.icon;
          return (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${typeInfo.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>Ouvert le {account.openedDate}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={account.status === "active" ? "default" : "secondary"}
                      className={account.status === "active" ? "bg-green-100 text-green-700" : ""}
                    >
                      {account.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Balance */}
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Solde disponible</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {account.balance.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: account.currency,
                      })}
                    </p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-sm ${account.trendUp ? "text-green-600" : "text-red-600"}`}
                    >
                      {account.trendUp ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {account.trend}
                    </div>
                  </div>

                  {/* IBAN */}
                  <div className="p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-500">IBAN</p>
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
                    <p className="text-sm font-mono text-gray-900 break-all">
                      {showIban[account.id] ? account.iban : account.iban.replace(/./g, "*")}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-indigo-600 hover:text-indigo-700 mt-1"
                      onClick={() => copyToClipboard(account.iban, account.id)}
                    >
                      {copiedId === account.id ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copié
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3 h-3 mr-1" />
                          Copier
                        </>
                      )}
                    </Button>
                  </div>

                  {/* BIC */}
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">BIC / SWIFT</p>
                    <p className="text-sm font-mono text-gray-900">{account.bic}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-indigo-600 hover:text-indigo-700 mt-1"
                      onClick={() => copyToClipboard(account.bic, account.id + 100)}
                    >
                      {copiedId === account.id + 100 ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copié
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3 h-3 mr-1" />
                          Copier
                        </>
                      )}
                    </Button>
                  </div>

                  {/* RIB */}
                  <div className="p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-500">RIB</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs font-mono text-gray-900 break-all">{account.rib}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-indigo-600 hover:text-indigo-700 mt-1"
                      onClick={() => copyToClipboard(account.rib, account.id + 200)}
                    >
                      {copiedId === account.id + 200 ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copié
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3 h-3 mr-1" />
                          Copier RIB
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Account Card */}
      <Card className="border-dashed hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ajouter un compte</h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Ouvrez un nouveau compte épargne, un compte titres ou un compte joint
          </p>
          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
            Voir les offres
            <ArrowRight className="w-4 h-4 ml-2" />
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
            <p className="text-sm text-gray-600">
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
            <p className="text-sm text-gray-600">
              Effectuez des virements instantanés vers n'importe quelle banque européenne en
              quelques secondes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
