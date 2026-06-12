import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface Transaction {
  title: string;
  description: string;
  amount: string;
  tone: "credit" | "debit";
  icon: IconName;
}

const transactions: Transaction[] = [
  { title: "Sky Genesis Enterprise", description: "Aujourd'hui, 14:30 · Versement entrant", amount: "+8,500.00 €", tone: "credit", icon: "business-center" },
  { title: "Netflix", description: "Aujourd'hui, 09:24 · Carte virtuelle", amount: "-15.99 €", tone: "debit", icon: "movie" },
  { title: "Monoprix", description: "Hier, 12:42 · Paiement carte", amount: "-92.30 €", tone: "debit", icon: "shopping-bag" },
  { title: "Aether Office", description: "Hier, 15:20 · Remboursement interne", amount: "+830.00 €", tone: "credit", icon: "workspaces" },
  { title: "Amazon", description: "11 juin, 18:05 · Achat en ligne", amount: "-129.99 €", tone: "debit", icon: "shopping-cart" },
  { title: "Spotify", description: "11 juin, 06:00 · Abonnement mensuel", amount: "-10.99 €", tone: "debit", icon: "music-note" },
  { title: "Virement SGE", description: "10 juin, 11:15 · Salaire juin", amount: "+4,200.00 €", tone: "credit", icon: "account-balance" },
  { title: "Carrefour", description: "10 juin, 09:30 · Courses", amount: "-67.45 €", tone: "debit", icon: "local-grocery-store" },
  { title: "Free Mobile", description: "9 juin, 08:00 · Forfait mobile", amount: "-19.99 €", tone: "debit", icon: "smartphone" },
  { title: "EDF", description: "8 juin, 10:00 · Facture électricité", amount: "-89.00 €", tone: "debit", icon: "bolt" },
  { title: "Client Dupont", description: "8 juin, 16:45 · Facture prestation", amount: "+1,200.00 €", tone: "credit", icon: "receipt" },
  { title: "Uber Eats", description: "7 juin, 20:15 · Livraison", amount: "-24.50 €", tone: "debit", icon: "restaurant" },
  { title: "SNCF", description: "7 juin, 07:30 · Billet TGV", amount: "-79.00 €", tone: "debit", icon: "train" },
  { title: "Orange", description: "6 juin, 09:00 · Facture internet", amount: "-42.99 €", tone: "debit", icon: "wifi" },
  { title: "Remboursement CAF", description: "6 juin, 14:00 · Aide logement", amount: "+250.00 €", tone: "credit", icon: "home" },
  { title: "Leroy Merlin", description: "5 juin, 16:30 · Bricolage", amount: "-156.00 €", tone: "debit", icon: "build" },
  { title: "Doctolib", description: "5 juin, 11:00 · Consultation", amount: "-25.00 €", tone: "debit", icon: "local-hospital" },
  { title: "Assurance AXA", description: "4 juin, 08:00 · Prélèvement auto", amount: "-54.00 €", tone: "debit", icon: "verified-user" },
  { title: "Freelance Martin", description: "4 juin, 19:00 · Projet web", amount: "+2,400.00 €", tone: "credit", icon: "code" },
  { title: "Total Energie", description: "3 juin, 10:30 · Essence", amount: "-65.00 €", tone: "debit", icon: "local-gas-station" },
  { title: "Decathlon", description: "3 juin, 15:00 · Sport", amount: "-89.99 €", tone: "debit", icon: "directions-bike" },
  { title: "Café Michel", description: "2 juin, 08:45 · Petit-déjeuner", amount: "-4.50 €", tone: "debit", icon: "local-cafe" },
  { title: "Dividendes Aether", description: "2 juin, 12:00 · Revenus trimestriels", amount: "+320.00 €", tone: "credit", icon: "trending-up" },
  { title: "Zara", description: "1 juin, 14:20 · Vêtements", amount: "-120.00 €", tone: "debit", icon: "checkroom" },
  { title: "IBKR Dépôt", description: "1 juin, 09:00 · Compte titres", amount: "-500.00 €", tone: "debit", icon: "show-chart" },
  { title: "Loyer", description: "30 mai, 08:00 · Appartement", amount: "-950.00 €", tone: "debit", icon: "apartment" },
  { title: "Vente Leboncoin", description: "29 mai, 18:30 · Meuble", amount: "+150.00 €", tone: "credit", icon: "sell" },
  { title: "Sephora", description: "29 mai, 11:00 · Beauté", amount: "-45.00 €", tone: "debit", icon: "spa" },
  { title: "Uber", description: "28 mai, 23:00 · Course", amount: "-18.00 €", tone: "debit", icon: "local-taxi" },
  { title: "Cashback Aether", description: "28 mai, 10:00 · Fidélité", amount: "+12.50 €", tone: "credit", icon: "card-giftcard" },
  { title: "Fnac", description: "27 mai, 14:00 · Livre", amount: "-34.90 €", tone: "debit", icon: "menu-book" },
  { title: "Sicap", description: "27 mai, 09:00 · Assurance habitation", amount: "-22.00 €", tone: "debit", icon: "shield" },
  { title: "Remboursement Sécu", description: "26 mai, 15:00 · Soins médicaux", amount: "+65.00 €", tone: "credit", icon: "healing" },
  { title: "McDonald's", description: "26 mai, 12:30 · Déjeuner", amount: "-11.50 €", tone: "debit", icon: "fastfood" },
  { title: "Boursorama", description: "25 mai, 08:00 · Prélèvement compte", amount: "-7.99 €", tone: "debit", icon: "account-balance-wallet" },
];

export default function TransactionsScreen() {
  const insets = usePhoneSafeAreaInsets();

  return (
    <ScreenTransition direction="up">
      <View style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 40 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <SummaryCard />
          <View style={styles.transactionsCard}>
            <Text style={styles.sectionTitle}>Toutes les opérations</Text>
            {transactions.map((transaction, index) => (
              <TransactionRow key={`${transaction.title}-${transaction.amount}-${index}`} transaction={transaction} isLast={index === transactions.length - 1} />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenTransition>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <MaterialIcons name="close" size={22} color="#FFFFFF" />
      </Pressable>
      <Text style={styles.headerTitle}>Toutes les transactions</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

function SummaryCard() {
  const totalCredits = transactions
    .filter((t) => t.tone === "credit")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[^0-9.,]/g, "").replace(",", ".")), 0);
  const totalDebits = transactions
    .filter((t) => t.tone === "debit")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[^0-9.,]/g, "").replace(",", ".")), 0);

  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Crédits</Text>
          <Text style={styles.summaryValueCredit}>+{totalCredits.toFixed(2).replace(".", ",")} €</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Débits</Text>
          <Text style={styles.summaryValueDebit}>-{totalDebits.toFixed(2).replace(".", ",")} €</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Opérations</Text>
          <Text style={styles.summaryValueCount}>{transactions.length}</Text>
        </View>
      </View>
    </View>
  );
}

function TransactionRow({ transaction, isLast }: { transaction: Transaction; isLast: boolean }) {
  return (
    <Pressable style={[styles.transactionRow, isLast && styles.transactionRowLast]} onPress={() => router.push(`/transaction-detail?title=${encodeURIComponent(transaction.title)}`)}>
      <View style={styles.transactionIcon}>
        <MaterialIcons name={transaction.icon} size={20} color="#111827" />
      </View>
      <View style={styles.transactionCopy}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      </View>
      <Text style={[styles.transactionAmount, transaction.tone === "credit" ? styles.creditAmount : styles.debitAmount]}>
        {transaction.amount}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  closeButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#111827",
  },
  headerTitle: {
    color: "#05070A",
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
    textAlign: "center",
  },
  headerSpacer: {
    width: 42,
  },
  summaryCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  summaryValueCredit: {
    color: "#1F8A4C",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  summaryValueDebit: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  summaryValueCount: {
    color: "#05070A",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
  },
  transactionsCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    color: "#05070A",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 5,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  transactionRowLast: {
    borderBottomWidth: 0,
  },
  transactionIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  transactionCopy: {
    flex: 1,
  },
  transactionTitle: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  transactionDescription: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginTop: 1,
  },
  transactionAmount: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
  },
  creditAmount: {
    color: "#1F8A4C",
  },
  debitAmount: {
    color: "#111827",
  },
});
