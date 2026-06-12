import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];
type BadgeTone = "blue" | "green" | "gray";

const sections = [
  {
    title: "Account",
    rows: [
      { label: "Manage profile", icon: "person-outline" as IconName },
      { label: "Organization", icon: "business" as IconName },
      { label: "Sign out", icon: "logout" as IconName, destructive: true },
    ],
  },
  {
    title: "Security",
    rows: [
      { label: "Aether Identity", icon: "fingerprint" as IconName, badge: "Enabled" },
      { label: "Login approvals", icon: "verified-user" as IconName, switchValue: true },
      { label: "Trusted devices", icon: "devices" as IconName, badge: "Secure" },
      { label: "Biometrics", icon: "face" as IconName, switchValue: true },
      { label: "Recovery codes", icon: "vpn-key" as IconName },
    ],
  },
  {
    title: "Notifications",
    rows: [
      { label: "Company updates", icon: "campaign" as IconName, switchValue: true },
      { label: "Login approvals", icon: "notifications-active" as IconName, switchValue: true },
      { label: "Mentions", icon: "alternate-email" as IconName, switchValue: true },
      { label: "Service alerts", icon: "warning-amber" as IconName, switchValue: false },
    ],
  },
  {
    title: "Appearance",
    rows: [
      { label: "Theme", value: "System", icon: "dark-mode" as IconName, badge: "System" },
      { label: "Accent color", value: "Aether Blue", icon: "palette" as IconName },
      { label: "Compact mode", icon: "density-medium" as IconName, switchValue: false },
    ],
  },
  {
    title: "Preferences",
    rows: [
      { label: "Language", value: "English", icon: "language" as IconName },
      { label: "Default workspace", value: "SGE Belgium", icon: "workspaces" as IconName },
      { label: "Home shortcuts", icon: "dashboard-customize" as IconName },
    ],
  },
  {
    title: "Privacy",
    rows: [
      { label: "Activity visibility", icon: "visibility" as IconName },
      { label: "Analytics sharing", icon: "analytics" as IconName, switchValue: false },
      { label: "Connected sessions", icon: "link" as IconName },
    ],
  },
  {
    title: "About",
    rows: [
      { label: "My Enterprise version", value: "0.1.0", icon: "info-outline" as IconName },
      { label: "Terms", icon: "article" as IconName },
      { label: "Privacy policy", icon: "policy" as IconName },
      { label: "Open source licenses", icon: "code" as IconName },
    ],
  },
];

const badgeColors: Record<BadgeTone, { backgroundColor: string; color: string }> = {
  blue: { backgroundColor: "#EAF4FF", color: "#007AFF" },
  green: { backgroundColor: "#EAF8EF", color: "#1F8A4C" },
  gray: { backgroundColor: "#EEF1F5", color: "#5D6675" },
};

export default function SettingsScreen() {
  const insets = usePhoneSafeAreaInsets();
  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>My Enterprise preferences and security</Text>
        </View>

        <SettingsStatusCard />

        {sections.map((section) => (
          <SettingsSection key={section.title} title={section.title}>
            {section.rows.map((row) =>
              typeof row.switchValue === "boolean" ? (
                <SettingsSwitchRow key={row.label} {...row} enabled={row.switchValue} />
              ) : (
                <SettingsRow key={row.label} {...row} />
              ),
            )}
          </SettingsSection>
        ))}
      </ScrollView>
    </View>
  );
}

function SettingsStatusCard() {
  return (
    <View style={styles.statusCard}>
      <View style={styles.statusIcon}>
        <MaterialIcons name="admin-panel-settings" size={30} color="#FFFFFF" />
      </View>
      <View style={styles.statusCopy}>
        <View style={styles.statusTitleRow}>
          <Text style={styles.statusTitle}>My Enterprise</Text>
          <SettingsBadge label="Secure" tone="green" />
        </View>
        <Text style={styles.statusText}>Aether Identity active</Text>
        <Text style={styles.statusText}>This device is trusted</Text>
      </View>
    </View>
  );
}

function SettingsSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function SettingsRow({
  badge,
  destructive,
  icon,
  label,
  value,
}: {
  badge?: string;
  destructive?: boolean;
  icon: IconName;
  label: string;
  value?: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeading}>
        <View style={styles.rowIcon}>
          <MaterialIcons name={icon} size={20} color={destructive ? "#BD2E2E" : "#007AFF"} />
        </View>
        <Text style={[styles.rowLabel, destructive && styles.destructive]}>{label}</Text>
      </View>
      <View style={styles.rowTrailing}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        {badge ? <SettingsBadge label={badge} tone={badge === "Secure" || badge === "Enabled" ? "green" : "gray"} /> : null}
        <MaterialIcons name="chevron-right" size={21} color={destructive ? "#BD2E2E" : "#9CA3AF"} />
      </View>
    </View>
  );
}

function SettingsSwitchRow({
  enabled,
  icon,
  label,
}: {
  enabled: boolean;
  icon: IconName;
  label: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeading}>
        <View style={styles.rowIcon}>
          <MaterialIcons name={icon} size={20} color="#007AFF" />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <View style={[styles.switchTrack, enabled && styles.switchTrackEnabled]}>
        <View style={[styles.switchThumb, enabled && styles.switchThumbEnabled]} />
      </View>
    </View>
  );
}

function SettingsBadge({ label, tone }: { label: string; tone: BadgeTone }) {
  const colors = badgeColors[tone];

  return (
    <View style={[styles.badge, { backgroundColor: colors.backgroundColor }]}>
      <Text style={[styles.badgeText, { color: colors.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 116,
  },
  header: {
    gap: 6,
    marginBottom: 18,
  },
  title: {
    color: "#05070A",
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  statusCard: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
    backgroundColor: "#087BEA",
  },
  statusIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  statusCopy: {
    flex: 1,
    gap: 3,
  },
  statusTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
  },
  statusText: {
    color: "#D8EBFF",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    color: "#05070A",
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "900",
    marginBottom: 11,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  row: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  rowLeading: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF4FF",
  },
  rowLabel: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  destructive: {
    color: "#BD2E2E",
  },
  rowTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowValue: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "900",
  },
  switchTrack: {
    width: 48,
    height: 28,
    justifyContent: "center",
    borderRadius: 999,
    padding: 3,
    backgroundColor: "#D1D5DB",
  },
  switchTrackEnabled: {
    backgroundColor: "#007AFF",
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },
  switchThumbEnabled: {
    alignSelf: "flex-end",
  },
});
