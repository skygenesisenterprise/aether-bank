import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";
import { type Transaction, type IconName, categoryConfig, transactions } from "@/data/transactions";



export default function TransactionDetailScreen() {
  const insets = usePhoneSafeAreaInsets();
  const { title } = useLocalSearchParams<{ title?: string }>();
  const decodedTitle = title ? decodeURIComponent(title) : "";
  const transaction = transactions.find((t) => t.title === decodedTitle) ?? transactions[0];
  const index = transactions.indexOf(transaction);

  const cat = categoryConfig[transaction.category];
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
          <Header category={transaction.category} />

          <View style={styles.heroCard}>
            <View style={[styles.heroIcon, { backgroundColor: cat.bgColor }]}>
              <MaterialIcons name={transaction.icon} size={32} color={cat.color} />
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
            <DetailRow label="Catégorie" value={cat.label} />
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

function Header({ category }: { category: Transaction["category"] }) {
  const cat = categoryConfig[category];
  return (
    <View style={styles.header}>
      <Pressable style={[styles.closeButton, { backgroundColor: cat.color }]} onPress={() => router.push("/transactions")}>
        <MaterialIcons name="close" size={22} color="#FFFFFF" />
      </Pressable>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Détail de l'opération</Text>
        <Text style={styles.headerCategory}>{cat.label}</Text>
      </View>
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
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#05070A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  headerCategory: {
    color: "#9CA3AF",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    marginTop: 1,
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
