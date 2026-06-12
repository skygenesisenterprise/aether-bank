import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";
import { MobileTokens } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

interface QuickAction {
  title: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  tint: string;
  backgroundColor: string;
  badge?: number;
}

interface AgendaItem {
  title: string;
  time: string;
  tag: string;
  accent: string;
  tagColor: string;
  tagBackground: string;
}

const quickActions: QuickAction[] = [
  {
    title: "Conges",
    icon: "beach-access",
    tint: "#6D9ED6",
    backgroundColor: "#EEF5FD",
  },
  {
    title: "Frais",
    icon: "attach-money",
    tint: "#D5A128",
    backgroundColor: "#FFF6E8",
    badge: 2,
  },
  {
    title: "IT Support",
    icon: "build",
    tint: "#53B7E8",
    backgroundColor: "#EDF8FD",
    badge: 1,
  },
  {
    title: "Documents",
    icon: "folder-open",
    tint: "#9551BB",
    backgroundColor: "#F5ECFB",
  },
  {
    title: "Annuaire",
    icon: "groups-2",
    tint: "#D16055",
    backgroundColor: "#FDEEEF",
  },
  {
    title: "Formation",
    icon: "menu-book",
    tint: "#2BAE66",
    backgroundColor: "#EAF8EF",
    badge: 3,
  },
];

const agendaItems: AgendaItem[] = [
  {
    title: "Comite de direction",
    time: "Auj. 14:00",
    tag: "Reunion",
    accent: "#1B4C8A",
    tagColor: "#4F648A",
    tagBackground: "#EBF0F8",
  },
  {
    title: "Formation securite SI",
    time: "Demain 10:00",
    tag: "Formation",
    accent: "#F39A27",
    tagColor: "#D38A1B",
    tagBackground: "#FFF4E6",
  },
  {
    title: "Nettoyage quartier RSE",
    time: "Ven. 10:00",
    tag: "Evenement",
    accent: "#4BD18C",
    tagColor: "#49B275",
    tagBackground: "#EAFBF2",
  },
];

function BrowserStatusBar() {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View style={styles.statusBar}>
      <View style={styles.statusTopRow}>
        <View style={styles.statusTimeRow}>
          <Text style={styles.statusTime}>20:48</Text>
          <MaterialIcons name="hotel" size={19} color="#05070A" />
        </View>
        <View style={styles.statusIcons}>
          <MaterialIcons name="signal-cellular-alt" size={20} color="#05070A" />
          <MaterialIcons name="wifi" size={20} color="#05070A" />
          <View style={styles.batteryPill}>
            <Text style={styles.batteryText}>99</Text>
          </View>
        </View>
      </View>
      <View style={styles.cameraBackRow}>
        <Text style={styles.cameraBackText}>◀ Appareil photo</Text>
      </View>
    </View>
  );
}

function StatCard({
  value,
  label,
  showDivider,
}: {
  value: string;
  label: string;
  showDivider?: boolean;
}) {
  return (
    <View style={[styles.statItem, showDivider && styles.statDivider]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickActionCard({ action }: { action: QuickAction }) {
  const theme = useTheme();

  return (
    <Pressable style={[styles.quickActionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.quickActionIconWrap, { backgroundColor: action.backgroundColor }]}>
        <MaterialIcons name={action.icon} size={30} color={action.tint} />
        {typeof action.badge === "number" ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{action.badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.quickActionLabel, { color: theme.text }]}>{action.title}</Text>
    </Pressable>
  );
}

function AgendaCard({ item }: { item: AgendaItem }) {
  const theme = useTheme();

  return (
    <Pressable style={[styles.agendaCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.agendaAccent, { backgroundColor: item.accent }]} />
      <View style={styles.agendaContent}>
        <Text style={[styles.agendaTitle, { color: theme.text }]}>{item.title}</Text>
        <View style={styles.agendaMetaRow}>
          <MaterialIcons name="schedule" size={18} color={theme.textSecondary} />
          <Text style={[styles.agendaTime, { color: theme.textSecondary }]}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.agendaRight}>
        <View style={[styles.tag, { backgroundColor: item.tagBackground }]}>
          <Text style={[styles.tagText, { color: item.tagColor }]}>{item.tag}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#7B8798" />
      </View>
    </Pressable>
  );
}

export function DashboardScreen() {
  const insets = usePhoneSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <BrowserStatusBar />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: theme.primary, paddingTop: Platform.OS === "web" ? insets.top + 40 : insets.top + 20 }]}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.greeting}>Bonsoir,</Text>
              <Text style={styles.name}>Alexandre</Text>
              <Text style={styles.role}>Directeur Commercial</Text>
            </View>

            <View style={styles.heroActions}>
              <View style={styles.notificationWrap}>
                <MaterialIcons name="notifications-none" size={30} color="#FFFFFF" />
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>4</Text>
                </View>
              </View>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>AM</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatCard value="12" label="Jours conges" showDivider />
            <StatCard value="2" label="Tickets IT" showDivider />
            <StatCard value="3" label="Formations" showDivider />
            <StatCard value="1" label="Note frais" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Acces rapides</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} action={action} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Agenda</Text>
          <View style={styles.agendaList}>
            {agendaItems.map((item) => (
              <AgendaCard key={item.title} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  statusBar: {
    height: 48,
    paddingHorizontal: 16,
    paddingTop: 9,
    backgroundColor: "#EFF3F8",
  },
  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusTime: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "800",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  batteryPill: {
    minWidth: 28,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#05070A",
  },
  batteryText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "900",
  },
  cameraBackRow: {
    marginTop: 2,
  },
  cameraBackText: {
    color: "#05070A",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "800",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 132,
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 36,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#0B5D9A",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 24,
    fontWeight: "400",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 41,
    lineHeight: 48,
    fontWeight: "800",
    marginTop: 4,
  },
  role: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 18,
    marginTop: 4,
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: -20,
  },
  notificationWrap: {
    position: "relative",
  },
  heroBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 5,
    backgroundColor: "#F44557",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0C6CB6",
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  statsRow: {
    marginTop: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.22)",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 38,
    lineHeight: 40,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 6,
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: "#1C2434",
    marginBottom: 18,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  quickActionCard: {
    width: "31.3%",
    minWidth: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: MobileTokens.radius.md,
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...MobileTokens.shadow.card,
  },
  quickActionIconWrap: {
    width: 64,
    height: 64,
    borderRadius: MobileTokens.radius.md,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  quickActionLabel: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FDB022",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  agendaList: {
    gap: 16,
  },
  agendaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: MobileTokens.radius.md,
    minHeight: 72,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...MobileTokens.shadow.card,
  },
  agendaAccent: {
    width: 6,
    alignSelf: "stretch",
    borderRadius: 999,
    marginRight: 16,
  },
  agendaContent: {
    flex: 1,
  },
  agendaTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  agendaMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  agendaTime: {
    color: "#6B7280",
    fontSize: 15,
  },
  agendaRight: {
    alignItems: "flex-end",
    gap: 12,
    marginLeft: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
