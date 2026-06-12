import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

const cards = [
  { name: "Carte Virtuelle", last4: "4829", network: "Visa", status: "Active", color: "#111827" },
  { name: "Carte Physique", last4: "1094", network: "Visa", status: "Active", color: "#374151" },
  { name: "Carte Organisation", last4: "7621", network: "Visa", status: "Active", color: "#4B5563" },
];

export default function MesCartesScreen() {
  const insets = usePhoneSafeAreaInsets();

  return (
    <ScreenTransition>
      <View style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <Text style={styles.pageTitle}>Mes cartes</Text>
            <Text style={styles.pageSubtitle}>Gérez vos cartes et moyens de paiement</Text>
          </View>
          <Pressable style={styles.manageButton} onPress={() => router.push("/cards")}>
            <MaterialIcons name="credit-card" size={20} color="#FFFFFF" />
            <Text style={styles.manageButtonText}>Gestion avancée des cartes</Text>
            <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.6)" />
          </Pressable>
          <Text style={styles.sectionTitle}>Vos cartes</Text>
          {cards.map((card) => (
            <View key={card.last4} style={styles.cardRow}>
              <View style={[styles.cardPreview, { backgroundColor: card.color }]}>
                <Text style={styles.cardPreviewText}>**** {card.last4}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardMeta}>{card.network} · {card.status}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScreenTransition>
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
  headerBlock: {
    marginBottom: 18,
  },
  pageTitle: {
    color: "#05070A",
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "900",
  },
  pageSubtitle: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  manageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    backgroundColor: "#111827",
  },
  manageButtonText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  sectionTitle: {
    color: "#05070A",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  cardPreview: {
    width: 56,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardPreviewText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  cardMeta: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 1,
  },
});
