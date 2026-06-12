import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];
type ServiceStatus = "Active" | "Enabled" | "Beta" | "Internal" | "Pending" | "Operational" | "Requires setup";

interface Service {
  category: string;
  description: string;
  icon: IconName;
  id: string;
  name: string;
  status: ServiceStatus;
}

const categories = ["All", "Workspace", "Security", "Finance", "Cloud", "Developer", "Support"];

const favoriteServices: Service[] = [
  {
    id: "aether-office",
    name: "Aether Office",
    description: "Documents, calendar and workspace",
    category: "Workspace",
    status: "Active",
    icon: "dashboard",
  },
  {
    id: "aether-mail",
    name: "Aether Mail",
    description: "Secure email for your organization",
    category: "Workspace",
    status: "Active",
    icon: "mail-outline",
  },
  {
    id: "aether-bank",
    name: "Aether Bank",
    description: "Finance, cards and payment approvals",
    category: "Finance",
    status: "Pending",
    icon: "account-balance",
  },
  {
    id: "aether-identity",
    name: "Aether Identity",
    description: "Login approvals and trusted devices",
    category: "Security",
    status: "Enabled",
    icon: "fingerprint",
  },
];

const allServices: Service[] = [
  ...favoriteServices,
  { id: "aether-drive", name: "Aether Drive", description: "Shared files and folders", category: "Workspace", status: "Beta", icon: "folder" },
  { id: "aether-calendar", name: "Aether Calendar", description: "Meetings and planning", category: "Workspace", status: "Internal", icon: "calendar-month" },
  { id: "aether-notes", name: "Aether Notes", description: "Team notes and decisions", category: "Workspace", status: "Beta", icon: "sticky-note-2" },
  { id: "aether-tasks", name: "Aether Tasks", description: "Personal and team work", category: "Workspace", status: "Internal", icon: "task-alt" },
  { id: "login-approvals", name: "Login Approvals", description: "Approve sensitive sign-ins", category: "Security", status: "Enabled", icon: "verified-user" },
  { id: "trusted-devices", name: "Trusted Devices", description: "Manage secure devices", category: "Security", status: "Enabled", icon: "devices" },
  { id: "aether-secure", name: "Aether Secure", description: "Security posture and policies", category: "Security", status: "Requires setup", icon: "shield" },
  { id: "cards", name: "Cards", description: "Company cards and limits", category: "Finance", status: "Pending", icon: "credit-card" },
  { id: "expenses", name: "Expenses", description: "Receipts and approvals", category: "Finance", status: "Internal", icon: "receipt-long" },
  { id: "invoices", name: "Invoices", description: "Vendor documents", category: "Finance", status: "Internal", icon: "request-quote" },
  { id: "aether-cloud", name: "Aether Cloud", description: "Infrastructure workspace", category: "Cloud", status: "Beta", icon: "cloud" },
  { id: "aether-status", name: "Aether Status", description: "Service status and incidents", category: "Cloud", status: "Operational", icon: "monitor-heart" },
  { id: "monitoring", name: "Monitoring", description: "Metrics and alerts", category: "Cloud", status: "Internal", icon: "analytics" },
  { id: "deployments", name: "Deployments", description: "Release operations", category: "Cloud", status: "Beta", icon: "rocket-launch" },
  { id: "aether-developer", name: "Aether Developer", description: "Developer companion", category: "Developer", status: "Beta", icon: "code" },
  { id: "api-console", name: "API Console", description: "Keys and API requests", category: "Developer", status: "Internal", icon: "terminal" },
  { id: "sdks", name: "SDKs", description: "Client libraries and docs", category: "Developer", status: "Beta", icon: "data-object" },
  { id: "marketplace", name: "Marketplace", description: "Internal apps catalog", category: "Developer", status: "Internal", icon: "storefront" },
  { id: "aether-support", name: "Aether Support", description: "Workspace assistance", category: "Support", status: "Active", icon: "support-agent" },
  { id: "sge-academy", name: "SGE Academy", description: "Learning and onboarding", category: "Support", status: "Internal", icon: "school" },
  { id: "sge-jobs", name: "SGE Jobs", description: "Hiring and internal roles", category: "Support", status: "Internal", icon: "work" },
  { id: "company-docs", name: "Company Docs", description: "Policies and references", category: "Support", status: "Active", icon: "article" },
];

const recentlyUsed = ["Aether Office", "Aether Identity", "Aether Mail", "Aether Status"];

const statusColors: Record<ServiceStatus, { backgroundColor: string; color: string }> = {
  Active: { backgroundColor: "#EAF8EF", color: "#1F8A4C" },
  Enabled: { backgroundColor: "#EAF4FF", color: "#168EEA" },
  Beta: { backgroundColor: "#F0EAFF", color: "#6941C6" },
  Internal: { backgroundColor: "#EEF1F5", color: "#5D6675" },
  Pending: { backgroundColor: "#FFF3E1", color: "#B56A00" },
  Operational: { backgroundColor: "#EAF8EF", color: "#1F8A4C" },
  "Requires setup": { backgroundColor: "#FDECEC", color: "#BD2E2E" },
};

export default function ServicesScreen() {
  const insets = usePhoneSafeAreaInsets();
  return (
    <ScreenTransition>
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6 }]} showsVerticalScrollIndicator={false}>
        <ServicesHeader />
        <ServiceSearchBar />

        <SectionHeader title="Favorites" />
        <View style={styles.favoriteGrid}>
          {favoriteServices.map((service) => (
            <FavoriteServiceCard key={service.id} service={service} />
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category, index) => (
            <CategoryPill key={category} active={index === 0} label={category} />
          ))}
        </ScrollView>

        <SectionHeader title="All Services" />
        <ServiceGrid services={allServices} />

        <ServiceHealthCard />

        <SectionHeader title="Recently Used" />
        <View style={styles.recentCard}>
          {recentlyUsed.map((name) => (
            <RecentlyUsedRow key={name} name={name} />
          ))}
        </View>
      </ScrollView>
    </View>
    </ScreenTransition>
  );
}

function ServicesHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>Your SGE workspace apps</Text>
      </View>
      <Pressable style={styles.headerButton}>
        <MaterialIcons name="tune" size={21} color="#0B1220" />
      </Pressable>
    </View>
  );
}

function ServiceSearchBar() {
  return (
    <View style={styles.searchCard}>
      <MaterialIcons name="search" size={21} color="#667085" />
      <Text style={styles.searchText}>Search services, tools or platforms</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function CategoryPill({ active, label }: { active?: boolean; label: string }) {
  return (
    <Pressable style={[styles.categoryPill, active && styles.categoryPillActive]}>
      <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{label}</Text>
    </Pressable>
  );
}

function FavoriteServiceCard({ service }: { service: Service }) {
  return (
    <Pressable style={styles.favoriteCard} onPress={() => router.push(`/services/${service.id}`)}>
      <View style={styles.favoriteTop}>
        <View style={styles.favoriteIcon}>
          <MaterialIcons name={service.icon} size={24} color="#168EEA" />
        </View>
        <ServiceStatusBadge status={service.status} />
      </View>
      <Text style={styles.favoriteTitle}>{service.name}</Text>
      <Text style={styles.favoriteDescription}>{service.description}</Text>
    </Pressable>
  );
}

function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <View style={styles.serviceGrid}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </View>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Pressable style={styles.serviceCard} onPress={() => router.push(`/services/${service.id}`)}>
      <View style={styles.serviceIcon}>
        <MaterialIcons name={service.icon} size={22} color="#168EEA" />
      </View>
      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>
      <Text style={styles.serviceCategory}>{service.category}</Text>
      <ServiceStatusBadge status={service.status} />
    </Pressable>
  );
}

function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  const colors = statusColors[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: colors.backgroundColor }]}>
      <Text style={[styles.statusText, { color: colors.color }]}>{status}</Text>
    </View>
  );
}

function ServiceHealthCard() {
  return (
    <View style={styles.healthCard}>
      <View style={styles.healthHeader}>
        <View>
          <Text style={styles.healthTitle}>Service Health</Text>
          <Text style={styles.healthSubtitle}>All core services operational</Text>
          <Text style={styles.healthAttention}>1 service requires attention</Text>
        </View>
        <MaterialIcons name="monitor-heart" size={26} color="#168EEA" />
      </View>
      <HealthRow name="Aether Office" status="Operational" />
      <HealthRow name="Aether Identity" status="Operational" />
      <HealthRow name="Aether Mail" status="Degraded" warning />
      <HealthRow name="Aether Bank" status="Pending setup" warning />
    </View>
  );
}

function HealthRow({ name, status, warning }: { name: string; status: string; warning?: boolean }) {
  return (
    <View style={styles.healthRow}>
      <Text style={styles.healthName}>{name}</Text>
      <Text style={[styles.healthStatus, warning && styles.healthStatusWarning]}>{status}</Text>
    </View>
  );
}

function RecentlyUsedRow({ name }: { name: string }) {
  return (
    <Pressable style={styles.recentRow}>
      <Text style={styles.recentName}>{name}</Text>
      <MaterialIcons name="chevron-right" size={21} color="#A3ACBA" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
  content: { paddingHorizontal: 20, paddingBottom: 116 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: { color: "#0B1220", fontSize: 34, lineHeight: 39, fontWeight: "900" },
  subtitle: { color: "#667085", fontSize: 16, lineHeight: 22, fontWeight: "500" },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  searchCard: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 22,
    backgroundColor: "#FFFFFF",
  },
  searchText: { color: "#667085", fontSize: 14, lineHeight: 19, fontWeight: "600" },
  sectionTitle: { color: "#0B1220", fontSize: 21, lineHeight: 26, fontWeight: "900", marginBottom: 12 },
  favoriteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 22,
  },
  favoriteCard: {
    width: "48%",
    minHeight: 154,
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 20,
    padding: 14,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  favoriteTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  favoriteIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
  },
  favoriteTitle: { color: "#0B1220", fontSize: 16, lineHeight: 21, fontWeight: "900" },
  favoriteDescription: { color: "#667085", fontSize: 13, lineHeight: 18, fontWeight: "600" },
  categoryRow: { gap: 9, paddingRight: 20, marginBottom: 22 },
  categoryPill: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  categoryPillActive: { borderColor: "#168EEA", backgroundColor: "#168EEA" },
  categoryText: { color: "#344054", fontSize: 13, lineHeight: 17, fontWeight: "800" },
  categoryTextActive: { color: "#FFFFFF" },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  serviceCard: {
    width: "48%",
    minHeight: 174,
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 18,
    padding: 13,
    gap: 7,
    backgroundColor: "#FFFFFF",
  },
  serviceIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#EAF4FF",
  },
  serviceName: { color: "#0B1220", fontSize: 15, lineHeight: 19, fontWeight: "900" },
  serviceDescription: { color: "#667085", fontSize: 12, lineHeight: 17, fontWeight: "600" },
  serviceCategory: { color: "#168EEA", fontSize: 11, lineHeight: 15, fontWeight: "900" },
  statusBadge: { alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 5 },
  statusText: { fontSize: 11, lineHeight: 13, fontWeight: "900" },
  healthCard: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  healthHeader: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginBottom: 12 },
  healthTitle: { color: "#0B1220", fontSize: 18, lineHeight: 23, fontWeight: "900" },
  healthSubtitle: { color: "#1F8A4C", fontSize: 13, lineHeight: 18, fontWeight: "800" },
  healthAttention: { color: "#B56A00", fontSize: 13, lineHeight: 18, fontWeight: "700" },
  healthRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 7, gap: 12 },
  healthName: { color: "#0B1220", fontSize: 14, lineHeight: 19, fontWeight: "800" },
  healthStatus: { color: "#1F8A4C", fontSize: 13, lineHeight: 18, fontWeight: "800" },
  healthStatusWarning: { color: "#B56A00" },
  recentCard: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  recentRow: { minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  recentName: { color: "#0B1220", fontSize: 15, lineHeight: 20, fontWeight: "800" },
});
