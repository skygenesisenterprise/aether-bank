import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];
type StatusTone = "blue" | "green" | "orange" | "gray" | "red";

const sgeBadges = [
  {
    icon: "workspace-premium" as IconName,
    title: "Founder",
    description: "Original SGE leadership identity.",
  },
  {
    icon: "construction" as IconName,
    title: "Early Builder",
    description: "Built the first internal systems.",
  },
  {
    icon: "fingerprint" as IconName,
    title: "Aether Identity Tester",
    description: "Validated mobile approval flows.",
  },
  {
    icon: "dashboard" as IconName,
    title: "Office Pioneer",
    description: "First Aether Office workspace group.",
  },
  {
    icon: "verified-user" as IconName,
    title: "Security Trusted",
    description: "Strong authentication posture.",
  },
  {
    icon: "travel-explore" as IconName,
    title: "Japan Expansion",
    description: "SGE Japan planning access.",
  },
];

const services = [
  { name: "Aether Office", status: "Active", tone: "green" as StatusTone },
  { name: "Aether Mail", status: "Active", tone: "green" as StatusTone },
  { name: "Aether Bank", status: "Pending", tone: "orange" as StatusTone },
  { name: "Aether Identity", status: "Enabled", tone: "blue" as StatusTone },
  { name: "Aether Cloud", status: "Developer Access", tone: "gray" as StatusTone },
];

const devices = [
  {
    icon: "phone-iphone" as IconName,
    name: "iPhone 15 Pro",
    detail: "Current device · Trusted",
    tone: "green" as StatusTone,
  },
  {
    icon: "desktop-windows" as IconName,
    name: "Debian Workstation",
    detail: "Last seen today · Liège",
    tone: "green" as StatusTone,
  },
  {
    icon: "computer" as IconName,
    name: "Shadow PC",
    detail: "Needs verification",
    tone: "orange" as StatusTone,
  },
];

const activity = [
  { label: "Last sign-in", value: "Today · 09:42" },
  { label: "Last approval", value: "Aether Office · 09:43" },
  { label: "Last post", value: "#company · Yesterday" },
  { label: "Unread notifications", value: "7" },
];

const settings = [
  "Security",
  "Notifications",
  "Appearance",
  "Language",
  "Privacy",
  "Support",
  "Sign out",
];

const statusColors: Record<StatusTone, { backgroundColor: string; color: string }> = {
  blue: { backgroundColor: "#EAF4FF", color: "#007AFF" },
  green: { backgroundColor: "#EAF8EF", color: "#1F8A4C" },
  orange: { backgroundColor: "#FFF3E1", color: "#B56A00" },
  gray: { backgroundColor: "#EEF1F5", color: "#5D6675" },
  red: { backgroundColor: "#FDECEC", color: "#BD2E2E" },
};

export default function ProfileScreen() {
  const insets = usePhoneSafeAreaInsets();
  return (
    <ScreenTransition direction="up">
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6 }]} showsVerticalScrollIndicator={false}>
        <ProfileHero />
        <EnterpriseIdCard />

        <SectionHeader title="Role & Organization" />
        <Card>
          <InfoRow label="Primary role" value="Founder & CEO" />
          <InfoRow label="Organization" value="Sky Genesis Enterprise" />
          <InfoRow label="Entity" value="SGE Belgium" />
          <InfoRow label="Department" value="Executive Office" />
          <InfoRow label="Access level" value="Global Admin" />
        </Card>

        <SectionHeader title="Badges" />
        <View style={styles.badgeGrid}>
          {sgeBadges.map((badge) => (
            <BadgeCard key={badge.title} {...badge} />
          ))}
        </View>

        <SectionHeader title="My Services" />
        <Card>
          {services.map((service) => (
            <ServiceAccessRow key={service.name} {...service} />
          ))}
        </Card>

        <SectionHeader title="Trusted Devices" action="Manage devices" />
        <Card>
          {devices.map((device) => (
            <TrustedDeviceRow key={device.name} {...device} />
          ))}
        </Card>

        <SectionHeader title="Activity" />
        <Card>
          {activity.map((item) => (
            <InfoRow key={item.label} {...item} />
          ))}
        </Card>

        <SectionHeader title="Settings & Support" />
        <Card>
          {settings.map((setting) => (
            <SettingsRow key={setting} label={setting} destructive={setting === "Sign out"} />
          ))}
        </Card>
      </ScrollView>
    </View>
    </ScreenTransition>
  );
}

function ProfileHero() {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroTop}>
        <View style={styles.heroAvatar}>
          <Text style={styles.heroAvatarText}>LD</Text>
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.heroName}>Liam Dispa</Text>
          <Text style={styles.heroRole}>Founder & CEO</Text>
          <Text style={styles.heroOrg}>Sky Genesis Enterprise</Text>
          <Text style={styles.heroEntity}>SGE Belgium</Text>
        </View>
      </View>

      <View style={styles.heroMetaRow}>
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
        <StatusBadge label="Aether Identity Verified" tone="blue" />
      </View>

      <Pressable style={styles.enterpriseButton}>
        <Text style={styles.enterpriseButtonText}>View Enterprise ID</Text>
        <MaterialIcons name="chevron-right" size={20} color="#007AFF" />
      </Pressable>
    </View>
  );
}

function EnterpriseIdCard() {
  return (
    <View style={styles.enterpriseCard}>
      <View style={styles.enterpriseHeader}>
        <View style={styles.enterpriseIcon}>
          <MaterialIcons name="badge" size={28} color="#FFFFFF" />
        </View>
        <View style={styles.enterpriseCopy}>
          <Text style={styles.enterpriseTitle}>Enterprise ID</Text>
          <Text style={styles.enterpriseSubtitle}>Verified by Aether Identity</Text>
          <Text style={styles.enterpriseDetail}>Trusted device enabled · MFA active</Text>
        </View>
      </View>
      <View style={styles.enterpriseDivider} />
      <View style={styles.idStatusRow}>
        <MiniStatus label="Identity" value="Verified" tone="green" />
        <MiniStatus label="Device" value="Trusted" tone="blue" />
        <MiniStatus label="Security" value="Strong" tone="green" />
      </View>
    </View>
  );
}

function SectionHeader({ action, title }: { action?: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  const colors = statusColors[tone];

  return (
    <View style={[styles.statusBadge, { backgroundColor: colors.backgroundColor }]}>
      <Text style={[styles.statusText, { color: colors.color }]}>{label}</Text>
    </View>
  );
}

function MiniStatus({ label, tone, value }: { label: string; tone: StatusTone; value: string }) {
  const colors = statusColors[tone];

  return (
    <View style={styles.miniStatus}>
      <Text style={styles.miniStatusLabel}>{label}</Text>
      <Text style={[styles.miniStatusValue, { color: colors.color }]}>{value}</Text>
    </View>
  );
}

function BadgeCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: IconName;
  title: string;
}) {
  return (
    <View style={styles.badgeCard}>
      <View style={styles.badgeIcon}>
        <MaterialIcons name={icon} size={23} color="#007AFF" />
      </View>
      <Text style={styles.badgeTitle}>{title}</Text>
      <Text style={styles.badgeDescription}>{description}</Text>
    </View>
  );
}

function ServiceAccessRow({
  name,
  status,
  tone,
}: {
  name: string;
  status: string;
  tone: StatusTone;
}) {
  return (
    <View style={styles.serviceRow}>
      <Text style={styles.serviceName}>{name}</Text>
      <StatusBadge label={status} tone={tone} />
    </View>
  );
}

function TrustedDeviceRow({
  detail,
  icon,
  name,
  tone,
}: {
  detail: string;
  icon: IconName;
  name: string;
  tone: StatusTone;
}) {
  return (
    <View style={styles.deviceRow}>
      <View style={styles.deviceIcon}>
        <MaterialIcons name={icon} size={22} color="#007AFF" />
      </View>
      <View style={styles.deviceCopy}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceDetail}>{detail}</Text>
      </View>
      <StatusDot tone={tone} />
    </View>
  );
}

function StatusDot({ tone }: { tone: StatusTone }) {
  const colors = statusColors[tone];

  return <View style={[styles.statusDot, { backgroundColor: colors.color }]} />;
}

function SettingsRow({ destructive, label }: { destructive?: boolean; label: string }) {
  return (
    <Pressable style={styles.settingsRow}>
      <Text style={[styles.settingsLabel, destructive && styles.settingsDestructive]}>{label}</Text>
      <MaterialIcons name="chevron-right" size={22} color={destructive ? "#BD2E2E" : "#9CA3AF"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 116,
  },
  heroCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },
  heroTop: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  heroAvatar: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  heroAvatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },
  heroCopy: {
    flex: 1,
  },
  heroName: {
    color: "#05070A",
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "900",
  },
  heroRole: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "800",
    marginTop: 2,
  },
  heroOrg: {
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    marginTop: 4,
  },
  heroEntity: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  onlinePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#EAF8EF",
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  onlineText: {
    color: "#1F8A4C",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "800",
  },
  enterpriseButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 16,
    backgroundColor: "#EAF4FF",
  },
  enterpriseButtonText: {
    color: "#007AFF",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  enterpriseCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
    backgroundColor: "#087BEA",
  },
  enterpriseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  enterpriseIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  enterpriseCopy: {
    flex: 1,
  },
  enterpriseTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
  },
  enterpriseSubtitle: {
    color: "#D8EBFF",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },
  enterpriseDetail: {
    color: "#D8EBFF",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },
  enterpriseDivider: {
    height: 1,
    marginVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.24)",
  },
  idStatusRow: {
    flexDirection: "row",
    gap: 10,
  },
  miniStatus: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  miniStatusLabel: {
    color: "#D8EBFF",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },
  miniStatusValue: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#05070A",
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "900",
  },
  sectionAction: {
    color: "#007AFF",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    paddingVertical: 9,
  },
  infoLabel: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
  infoValue: {
    flex: 1,
    color: "#111827",
    textAlign: "right",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "900",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  badgeCard: {
    width: "48%",
    minHeight: 142,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 14,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  badgeIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF4FF",
  },
  badgeTitle: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900",
  },
  badgeDescription: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 10,
  },
  serviceName: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF4FF",
  },
  deviceCopy: {
    flex: 1,
  },
  deviceName: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  deviceDetail: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  settingsRow: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsLabel: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  settingsDestructive: {
    color: "#BD2E2E",
  },
});
