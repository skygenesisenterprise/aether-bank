import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";
import { MobileTokens } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import {
  scheduleCardDebitedNotificationAsync,
  scheduleMoneyReceivedNotificationAsync,
  scheduleTransferSentNotificationAsync,
} from "@/lib/mobile/push-notifications";

export default function NotificationsScreen() {
  const insets = usePhoneSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <MaterialIcons name="notifications-active" size={42} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Centre de notifications</Text>
        <Text style={[styles.body, { color: theme.textSecondary }]}>
          Cet onglet peut agreger alertes, validations en attente et rappels d&apos;evenements.
        </Text>

        <View style={styles.actionGroup}>
          <PreviewButton
            label="Preview argent recu"
            onPress={() =>
              scheduleMoneyReceivedNotificationAsync({
                amount: 2480.5,
                counterparty: "Acme SARL",
                route: "/transactions",
                transactionId: "tx-credit-demo",
              })
            }
          />
          <PreviewButton
            label="Preview debit carte"
            onPress={() =>
              scheduleCardDebitedNotificationAsync({
                amount: 84.9,
                counterparty: "Apple Store",
                route: "/transactions",
                transactionId: "tx-card-demo",
              })
            }
          />
          <PreviewButton
            label="Preview virement envoye"
            onPress={() =>
              scheduleTransferSentNotificationAsync({
                amount: 320,
                counterparty: "Studio Nova",
                route: "/transferts",
                transactionId: "tx-transfer-demo",
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

function PreviewButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.previewButton} onPress={onPress}>
      <Text style={styles.previewButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5FA",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  card: {
    borderRadius: MobileTokens.radius.lg,
    borderWidth: 1,
    padding: 28,
    alignItems: "center",
    gap: 12,
    ...MobileTokens.shadow.card,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  actionGroup: {
    width: "100%",
    gap: 10,
    marginTop: 12,
  },
  previewButton: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#111827",
    paddingHorizontal: 16,
  },
  previewButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
