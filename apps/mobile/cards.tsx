import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

// TODO: Connect card management API
// TODO: Connect virtual cards endpoint
// TODO: Connect card activity endpoint
// TODO: Connect cashback service

const cards = [
  { name: "Carte Virtuelle", network: "Visa", last4: "4829", type: "Virtuelle", status: "Active", expires: "08/29", currency: "EUR", balance: "12 450.80 €" },
  { name: "Carte Physique", network: "Visa", last4: "1094", type: "Physique", status: "Active", expires: "03/28", currency: "EUR", balance: "8 230.00 €" },
  { name: "Carte Organisation", network: "Visa", last4: "7621", type: "Virtuelle", status: "Active", expires: "12/30", currency: "EUR", balance: "89 150.00 €" },
];

const quickActions: { icon: IconName; label: string }[] = [
  { icon: "lock-outline", label: "Voir PIN" },
  { icon: "ac-unit", label: "Geler" },
  { icon: "phone-iphone", label: "Wallet" },
  { icon: "settings", label: "Paramètres" },
];

const cardInfo: { label: string; value: string }[] = [
  { label: "Statut", value: "Active" },
  { label: "Type", value: "Virtuelle" },
  { label: "Réseau", value: "Visa" },
  { label: "Expiration", value: "08/29" },
  { label: "Devise", value: "EUR" },
];

const monthlySummary = {
  expenses: "1 245 €",
  transactions: "32",
  cashback: "24.80 €",
};

// TODO: Connect virtual cards endpoint
const virtualCards = [
  { name: "Shopping", status: "Active", type: "Virtuelle" },
  { name: "Abonnements", status: "Active", type: "Virtuelle" },
  { name: "Temporaire", status: "Expirée", type: "Virtuelle" },
];

// TODO: Connect Apple Wallet integration
// TODO: Connect Google Wallet integration
const wallets = [
  { name: "Apple Wallet", status: "Connecté" },
  { name: "Google Wallet", status: "Non connecté" },
];

const securitySwitches = [
  { label: "Paiement en ligne", enabled: true },
  { label: "Paiement sans contact", enabled: true },
  { label: "Paiement international", enabled: true },
  { label: "Retraits ATM", enabled: true },
];

// TODO: Connect card activity endpoint
const cardActivity = [
  { title: "Netflix", amount: "-15.99 €", icon: "movie" as IconName },
  { title: "Apple", amount: "-4.99 €", icon: "apple" as IconName },
  { title: "Steam", amount: "-39.99 €", icon: "sports-esports" as IconName },
  { title: "Monoprix", amount: "-92.30 €", icon: "shopping-bag" as IconName },
];

// TODO: Connect organizational cards endpoint
const organizationalCards = [
  { name: "SGE Europe", budget: "10 000 €", available: "8 450 €" },
  { name: "Aether Office", budget: "3 000 €", available: "2 250 €" },
];

// TODO: Connect card analytics service
const insights = [
  "Votre carte la plus utilisée est la Carte Virtuelle.",
  "Les abonnements représentent 12 % de vos dépenses.",
  "Vous avez obtenu 24.80 € de cashback ce mois-ci.",
];

const infrastructure = [
  { label: "Card Processor", status: "Operational" },
  { label: "Apple Wallet", status: "Operational" },
  { label: "Virtual Cards", status: "Operational" },
  { label: "Notifications", status: "Operational" },
];

// TODO: Connect card security settings
// TODO: Connect organizational cards endpoint

export default function CardsScreen() {
  const insets = usePhoneSafeAreaInsets();
  const [activeIndex, setActiveIndex] = React.useState(0);

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
          <HeroCarousel activeIndex={activeIndex} onIndexChange={setActiveIndex} />
          <QuickActionsRow />
          <CardInfoSection />
          <FinancialSummary />
          <VirtualCardsSection />
          <WalletsSection />
          <SecuritySection />
          <CardActivitySection />
          <OrganizationalCardsSection />
          <InsightsCard />
          <Footer />
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
      <Text style={styles.headerTitle}>Mes cartes</Text>
    </View>
  );
}

function HeroCarousel({ activeIndex, onIndexChange }: { activeIndex: number; onIndexChange: (i: number) => void }) {
  const [cardWidth, setCardWidth] = React.useState(0);

  return (
    <View
      style={styles.heroOuter}
      onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth || 320}
        snapToAlignment="start"
        onMomentumScrollEnd={(e) => {
          const index = cardWidth > 0 ? Math.round(e.nativeEvent.contentOffset.x / cardWidth) : 0;
          onIndexChange(index);
        }}
        style={{ overflow: "visible" }}
      >
        {cards.map((card, i) => (
          <View key={card.last4} style={[styles.heroCard, { width: cardWidth || 320 }]}>
            <View style={styles.heroCardInner}>
              <Text style={styles.heroCardBank}>Aether Bank</Text>
              <View style={styles.heroCardChipRow}>
                <View style={styles.heroCardChip} />
              </View>
              <Text style={styles.heroCardNumber}>**** {card.last4}</Text>
              <View style={styles.heroCardFooter}>
                <View>
                  <Text style={styles.heroCardStatus}>{card.status}</Text>
                  <Text style={styles.heroCardMeta}>{card.name}</Text>
                </View>
                <Text style={styles.heroCardNetwork}>{card.network}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.carouselDots}>
        {cards.map((_, i) => (
          <View key={i} style={[styles.carouselDot, i === activeIndex && styles.carouselDotActive]} />
        ))}
      </View>
    </View>
  );
}

function QuickActionsRow() {
  return (
    <View style={styles.quickActionRow}>
      {quickActions.map((action) => (
        <Pressable key={action.label} style={styles.quickAction}>
          <View style={styles.quickActionIcon}>
            <MaterialIcons name={action.icon} size={20} color="#111827" />
          </View>
          <Text style={styles.quickActionText}>{action.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function CardInfoSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Informations carte</Text>
      <View style={styles.infoGrid}>
        {cardInfo.map((row) => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function FinancialSummary() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Résumé carte</Text>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Dépenses du mois</Text>
          <Text style={styles.summaryValue}>{monthlySummary.expenses}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Transactions</Text>
          <Text style={styles.summaryValue}>{monthlySummary.transactions}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Cashback</Text>
          <Text style={styles.summaryValue}>{monthlySummary.cashback}</Text>
        </View>
      </View>
    </View>
  );
}

function VirtualCardsSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Cartes virtuelles</Text>
      {virtualCards.map((vc, i) => (
        <View key={vc.name} style={[styles.listRow, i < virtualCards.length - 1 && styles.listRowBorder]}>
          <View style={styles.listRowLeading}>
            <View style={styles.listIcon}>
              <MaterialIcons name="credit-card" size={18} color="#111827" />
            </View>
            <Text style={styles.listLabel}>{vc.name}</Text>
          </View>
          <View style={styles.listStatusBadge}>
            <Text style={[styles.listStatusText, vc.status === "Expirée" ? { color: "#BD2E2E" } : { color: "#1F8A4C" }]}>
              {vc.status}
            </Text>
          </View>
        </View>
      ))}
      <Pressable style={styles.createButton}>
        <MaterialIcons name="add" size={18} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Créer une carte virtuelle</Text>
      </Pressable>
    </View>
  );
}

function WalletsSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Wallets</Text>
      {wallets.map((wallet, i) => (
        <View key={wallet.name} style={[styles.listRow, i < wallets.length - 1 && styles.listRowBorder]}>
          <View style={styles.listRowLeading}>
            <View style={styles.listIcon}>
              <MaterialIcons name={wallet.name === "Apple Wallet" ? "phone-iphone" : "android"} size={18} color="#111827" />
            </View>
            <View>
              <Text style={styles.listLabel}>{wallet.name}</Text>
              <Text style={styles.listStatusCaption}>{wallet.status}</Text>
            </View>
          </View>
          <Pressable style={styles.configureBadge}>
            <Text style={styles.configureBadgeText}>Configurer</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

function SecuritySection() {
  const [switches, setSwitches] = React.useState(securitySwitches.map((s) => s.enabled));

  const toggle = (i: number) => {
    setSwitches((prev) => prev.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Sécurité de la carte</Text>
      {securitySwitches.map((item, i) => (
        <Pressable key={item.label} style={styles.securityRow} onPress={() => toggle(i)}>
          <Text style={styles.securityLabel}>{item.label}</Text>
          <View style={[styles.switchTrack, switches[i] && styles.switchTrackActive]}>
            <View style={[styles.switchThumb, switches[i] && styles.switchThumbActive]} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

function CardActivitySection() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Activité carte</Text>
      {cardActivity.map((item, i) => (
        <View key={item.title} style={[styles.listRow, i < cardActivity.length - 1 && styles.listRowBorder]}>
          <View style={styles.listRowLeading}>
            <View style={styles.listIcon}>
              <MaterialIcons name={item.icon} size={18} color="#111827" />
            </View>
            <Text style={styles.listLabel}>{item.title}</Text>
          </View>
          <Text style={styles.activityAmount}>{item.amount}</Text>
        </View>
      ))}
    </View>
  );
}

function OrganizationalCardsSection() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Cartes organisationnelles</Text>
      {organizationalCards.map((oc, i) => (
        <View key={oc.name} style={[styles.orgCard, i < organizationalCards.length - 1 && styles.orgCardBorder]}>
          <Text style={styles.orgName}>{oc.name}</Text>
          <View style={styles.orgStats}>
            <View style={styles.orgStat}>
              <Text style={styles.orgStatLabel}>Budget</Text>
              <Text style={styles.orgStatValue}>{oc.budget}</Text>
            </View>
            <View style={styles.orgStat}>
              <Text style={styles.orgStatLabel}>Disponible</Text>
              <Text style={[styles.orgStatValue, { color: "#1F8A4C" }]}>{oc.available}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function InsightsCard() {
  return (
    <View style={styles.insightsCard}>
      <View style={styles.insightsHeader}>
        <MaterialIcons name="auto-awesome" size={20} color="#FFFFFF" />
        <Text style={styles.insightsTitle}>Aether Insights</Text>
      </View>
      {insights.map((text, i) => (
        <View key={i} style={styles.insightRow}>
          <View style={styles.insightBullet} />
          <Text style={styles.insightText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Aether Bank Cards</Text>
      <Text style={styles.footerVersion}>Version 1.0.0</Text>
      <Text style={styles.footerDisclaimer}>Données simulées</Text>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "900",
  },
  heroOuter: {
    marginBottom: 4,
    overflow: "visible",
  },
  heroCard: {
    paddingHorizontal: 2,
  },
  heroCardInner: {
    borderRadius: 22,
    padding: 22,
    backgroundColor: "#111827",
    justifyContent: "space-between",
    minHeight: 210,
  },
  heroCardBank: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  heroCardChipRow: {
    marginTop: 6,
    marginBottom: 14,
  },
  heroCardChip: {
    width: 38,
    height: 28,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  heroCardNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 18,
  },
  heroCardFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  heroCardStatus: {
    color: "#22C55E",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  heroCardMeta: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
  },
  heroCardNetwork: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  carouselDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 14,
    marginBottom: 8,
  },
  carouselDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
  },
  carouselDotActive: {
    width: 18,
    backgroundColor: "#111827",
  },
  quickActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  quickAction: {
    width: "23%",
    alignItems: "center",
    gap: 7,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#111827",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  quickActionText: {
    color: "#374151",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    color: "#05070A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    marginBottom: 12,
  },
  infoGrid: {
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  infoValue: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#D1D5DB",
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  summaryValue: {
    color: "#05070A",
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
    textAlign: "center",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  listRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  listRowLeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  listIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  listLabel: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  listStatusCaption: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 1,
  },
  listStatusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
  },
  listStatusText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "800",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 999,
    paddingVertical: 12,
    marginTop: 6,
    backgroundColor: "#111827",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },
  configureBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#111827",
  },
  configureBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "900",
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  securityLabel: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  switchTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 3,
    backgroundColor: "#D1D5DB",
  },
  switchTrackActive: {
    backgroundColor: "#111827",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  activityAmount: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  orgCard: {
    paddingVertical: 12,
  },
  orgCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  orgName: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900",
    marginBottom: 10,
  },
  orgStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  orgStat: {
    gap: 2,
  },
  orgStatLabel: {
    color: "#6B7280",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",
  },
  orgStatValue: {
    color: "#05070A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  insightsCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    backgroundColor: "#087BEA",
  },
  insightsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  insightsTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  insightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  insightText: {
    flex: 1,
    color: "#D8EBFF",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  infraRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infraLabel: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  infraStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infraDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
  },
  infraStatusText: {
    color: "#1F8A4C",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 8,
    gap: 4,
  },
  footerTitle: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  footerVersion: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "600",
  },
  footerDisclaimer: {
    color: "#9CA3AF",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
    marginTop: 2,
  },
});
