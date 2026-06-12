import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

export default function TransactionDetailScreen() {
  const insets = usePhoneSafeAreaInsets();
  const { title } = useLocalSearchParams<{ title?: string }>();
  const decodedTitle = title ? decodeURIComponent(title) : "";
  const transaction = transactions.find((t) => t.title === decodedTitle) ?? transactions[0];
  const index = transactions.indexOf(transaction);

  const isCredit = transaction.tone === "credit";
  const rawAmount = transaction.amount.replace(/[^0-9.,]/g, "").replace(",", ".");
  const numericAmount = parseFloat(rawAmount);

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

          <View style={styles.heroCard}>
            <View style={[styles.heroIcon, { backgroundColor: isCredit ? "#E8F5E9" : "#F3F4F6" }]}>
              <MaterialIcons name={transaction.icon} size={32} color={isCredit ? "#1F8A4C" : "#111827"} />
            </View>
            <Text style={styles.heroTitle}>{transaction.title}</Text>
            <Text style={[styles.heroAmount, { color: isCredit ? "#1F8A4C" : "#111827" }]}>
              {transaction.amount}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: isCredit ? "#E8F5E9" : "#FEF3F2" }]}>
              <Text style={[styles.statusText, { color: isCredit ? "#1F8A4C" : "#BD2E2E" }]}>
                {isCredit ? "Crédit" : "Débit"}
              </Text>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Détails de l'opération</Text>

            <DetailRow label="Date" value={transaction.description.split("·")[0].trim()} />
            <DetailRow label="Moyen de paiement" value={transaction.description.includes("·") ? transaction.description.split("·")[1].trim() : "Carte bancaire"} />
            <DetailRow label="Type" value={isCredit ? "Versement entrant" : "Paiement sortant"} />
            <DetailRow label="Statut" value="Confirmée" valueTone="success" />
            <DetailRow label="ID transaction" value={`ATH-TXN-${String(index + 1).padStart(6, "0")}`} />
            <DetailRow label="Catégorie" value={getCategory(transaction.icon)} />
            <DetailRow label="Bénéficiaire" value={transaction.title} />
            <DetailRow label="IBAN" value={`FR76 ${generateIban(index)}`} last />
          </View>

          <View style={styles.notesCard}>
            <Text style={styles.detailsTitle}>Notes</Text>
            <Text style={styles.notesText}>
              {isCredit
                ? `Paiement reçu de ${transaction.title}. Montant de ${transaction.amount} crédité sur votre compte.`
                : `Débit de ${transaction.amount} effectué vers ${transaction.title}. Opération confirmée et sécurisée.`}
            </Text>
          </View>

          <View style={styles.metaCard}>
            <Text style={styles.detailsTitle}>Informations complémentaires</Text>
            <MetaRow icon="location-on" label="Pays" value="France" />
            <MetaRow icon="security" label="Sécurisé" value="3D Secure" />
            <MetaRow icon="access-time" label="Heure exacte" value={`${9 + (index % 12)}:${(index * 7) % 60 < 10 ? "0" : ""}${(index * 7) % 60}`} />
            <MetaRow icon="repeat" label="Récurrent" value={index % 3 === 0 ? "Oui" : "Non"} />
            <MetaRow icon="description" label="Référence" value={`REF-${2024000 + index}`} last />
          </View>

          <Pressable
            style={styles.supportButton}
            onPress={() => Alert.alert("Contacter le support", "Un conseiller va vous répondre sous 24h.")}
          >
            <MaterialIcons name="headset-mic" size={18} color="#FFFFFF" />
            <Text style={styles.supportButtonText}>Contacter le support</Text>
          </Pressable>
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
      <Text style={styles.headerTitle}>Détail de l'opération</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

function DetailRow({ label, value, valueTone, last }: { label: string; value: string; valueTone?: "success"; last?: boolean }) {
  return (
    <View style={[styles.detailRow, !last && styles.detailRowBorder]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueTone === "success" && styles.detailValueSuccess]}>
        {value}
        {valueTone === "success" && <MaterialIcons name="check-circle" size={14} color="#1F8A4C" />}
      </Text>
    </View>
  );
}

function MetaRow({ icon, label, value, last }: { icon: IconName; label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.metaRow, !last && styles.detailRowBorder]}>
      <View style={styles.metaLeading}>
        <MaterialIcons name={icon} size={16} color="#6B7280" />
        <Text style={styles.detailLabel}>{label}</Text>
      </View>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function getCategory(icon: IconName): string {
  const categories: Record<string, string> = {
    "business-center": "Revenus professionnels",
    "workspaces": "Remboursement interne",
    "movie": "Abonnements",
    "shopping-bag": "Courses",
    "shopping-cart": "Achats en ligne",
    "music-note": "Abonnements",
    "account-balance": "Salaire",
    "local-grocery-store": "Alimentation",
    "smartphone": "Télécommunications",
    "bolt": "Énergie",
    "receipt": "Factures",
    "restaurant": "Restauration",
    "train": "Transport",
    "wifi": "Internet",
    "home": "Logement",
    "build": "Bricolage",
    "local-hospital": "Santé",
    "verified-user": "Assurances",
    "code": "Freelance",
    "local-gas-station": "Transport",
    "directions-bike": "Sport",
    "local-cafe": "Alimentation",
    "trending-up": "Revenus financiers",
    "checkroom": "Shopping",
    "show-chart": "Investissements",
    "apartment": "Logement",
    "sell": "Revenus divers",
    "spa": "Bien-être",
    "local-taxi": "Transport",
    "card-giftcard": "Fidélité",
    "menu-book": "Loisirs",
    "shield": "Assurances",
    "healing": "Remboursement",
    "fastfood": "Alimentation",
    "account-balance-wallet": "Frais bancaires",
  };
  return categories[icon] ?? "Autre";
}

function generateIban(index: number): string {
  const parts = [];
  for (let i = 0; i < 5; i++) {
    const block = String((index * 1234 + i * 9999) % 100000).padStart(5, "0");
    parts.push(block);
  }
  return parts.join(" ");
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
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    textAlign: "center",
  },
  headerSpacer: {
    width: 42,
  },
  heroCard: {
    alignItems: "center",
    borderRadius: 18,
    padding: 24,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  heroIcon: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 12,
  },
  heroTitle: {
    color: "#05070A",
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    marginBottom: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },
  detailsCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  detailsTitle: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  detailLabel: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
    flex: 1,
  },
  detailValue: {
    color: "#111827",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
    textAlign: "right",
    flex: 1,
  },
  detailValueSuccess: {
    color: "#1F8A4C",
  },
  notesCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  notesText: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
  metaCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  metaLeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    paddingVertical: 14,
    backgroundColor: "#111827",
    marginBottom: 14,
  },
  supportButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
});
