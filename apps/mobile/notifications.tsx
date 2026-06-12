import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";
import { MobileTokens } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

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
      </View>
    </View>
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
});
