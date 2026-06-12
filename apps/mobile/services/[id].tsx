import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface ServiceDetail {
  about: string;
  access: string;
  category: string;
  description: string;
  icon: IconName;
  name: string;
  quickActions: string[];
  related: string[];
  role: string;
  status: string;
}

const details: Record<string, ServiceDetail> = {
  "aether-identity": {
    name: "Aether Identity",
    description: "Security and authentication for your SGE workspace",
    status: "Enabled",
    category: "Security",
    access: "Enabled for SGE Belgium",
    role: "Global Admin",
    icon: "fingerprint",
    quickActions: ["View login approvals", "Manage trusted devices", "Enable biometrics", "View recovery codes"],
    about: "Aether Identity protects SGE sessions, trusted devices, MFA approvals and workspace access.",
    related: ["Trusted Devices", "Login Approvals", "Aether Secure"],
  },
  "aether-office": {
    name: "Aether Office",
    description: "Documents, calendar and workspace",
    status: "Active",
    category: "Workspace",
    access: "Available for SGE Belgium",
    role: "Owner",
    icon: "dashboard",
    quickActions: ["Open Mail", "Open Drive", "Open Calendar", "View documents"],
    about: "Aether Office groups daily workspace tools for documents, mail, meetings and internal collaboration.",
    related: ["Aether Mail", "Aether Drive", "Aether Calendar"],
  },
  "aether-bank": {
    name: "Aether Bank",
    description: "Finance, cards and payment approvals",
    status: "Pending",
    category: "Finance",
    access: "Pending setup for SGE Belgium",
    role: "Approver",
    icon: "account-balance",
    quickActions: ["View account", "Cards", "Expenses", "Payment approvals"],
    about: "Aether Bank centralizes internal finance workflows, cards, expenses and sensitive approvals.",
    related: ["Cards", "Expenses", "Invoices"],
  },
};

const fallback: ServiceDetail = {
  name: "SGE Service",
  description: "Workspace service available inside My Enterprise",
  status: "Internal",
  category: "Workspace",
  access: "Available for SGE Belgium",
  role: "Member",
  icon: "apps",
  quickActions: ["Open service", "View activity", "Manage access", "Get support"],
  about: "This static service detail previews how My Enterprise can present workspace tools and internal platforms.",
  related: ["Aether Office", "Aether Identity", "Aether Support"],
};

export default function ServiceDetailScreen() {
  const insets = usePhoneSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const service = details[id ?? ""] ?? fallback;

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6 }]} showsVerticalScrollIndicator={false}>
        <ServiceDetailHeader service={service} />

        <Section title="Quick Actions">
          <View style={styles.actionsGrid}>
            {service.quickActions.map((action) => (
              <ServiceQuickAction key={action} label={action} />
            ))}
          </View>
        </Section>

        <Section title="Access">
          <InfoRow label="User access" value={service.access} />
          <InfoRow label="Role" value={service.role} />
          <InfoRow label="Category" value={service.category} />
        </Section>

        <Section title="About">
          <Text style={styles.aboutText}>{service.about}</Text>
        </Section>

        <Section title="Related Services">
          {service.related.map((related) => (
            <View key={related} style={styles.relatedRow}>
              <Text style={styles.relatedName}>{related}</Text>
              <MaterialIcons name="chevron-right" size={21} color="#A3ACBA" />
            </View>
          ))}
        </Section>
      </ScrollView>
    </View>
  );
}

function ServiceDetailHeader({ service }: { service: ServiceDetail }) {
  return (
    <View style={styles.heroCard}>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="chevron-left" size={26} color="#0B1220" />
        </Pressable>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{service.status}</Text>
        </View>
      </View>
      <View style={styles.heroIcon}>
        <MaterialIcons name={service.icon} size={34} color="#168EEA" />
      </View>
      <Text style={styles.heroTitle}>{service.name}</Text>
      <Text style={styles.heroDescription}>{service.description}</Text>
      <Text style={styles.heroCategory}>{service.category}</Text>
    </View>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function ServiceQuickAction({ label }: { label: string }) {
  return (
    <Pressable style={styles.quickAction}>
      <View style={styles.quickIcon}>
        <MaterialIcons name="arrow-forward" size={18} color="#168EEA" />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
  content: { paddingHorizontal: 20, paddingBottom: 116 },
  heroCard: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  heroIcon: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    marginBottom: 14,
    backgroundColor: "#EAF4FF",
  },
  heroTitle: { color: "#0B1220", fontSize: 29, lineHeight: 34, fontWeight: "900" },
  heroDescription: { color: "#667085", fontSize: 15, lineHeight: 22, fontWeight: "600", marginTop: 6 },
  heroCategory: { color: "#168EEA", fontSize: 13, lineHeight: 18, fontWeight: "900", marginTop: 10 },
  statusBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#EAF4FF" },
  statusText: { color: "#168EEA", fontSize: 12, lineHeight: 14, fontWeight: "900" },
  section: { marginBottom: 22 },
  sectionTitle: { color: "#0B1220", fontSize: 21, lineHeight: 26, fontWeight: "900", marginBottom: 11 },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  actionsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 10 },
  quickAction: {
    width: "48%",
    minHeight: 78,
    borderRadius: 15,
    padding: 12,
    gap: 8,
    backgroundColor: "#F8FBFF",
  },
  quickIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#EAF4FF",
  },
  quickLabel: { color: "#0B1220", fontSize: 13, lineHeight: 18, fontWeight: "900" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", gap: 14, paddingVertical: 8 },
  infoLabel: { color: "#667085", fontSize: 14, lineHeight: 19, fontWeight: "600" },
  infoValue: { flex: 1, color: "#0B1220", textAlign: "right", fontSize: 14, lineHeight: 19, fontWeight: "900" },
  aboutText: { color: "#667085", fontSize: 14, lineHeight: 21, fontWeight: "600" },
  relatedRow: { minHeight: 46, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  relatedName: { color: "#0B1220", fontSize: 15, lineHeight: 20, fontWeight: "800" },
});
