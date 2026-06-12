import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface QuickAction {
  title: string;
  icon: IconName;
}

interface Transaction {
  title: string;
  description: string;
  amount: string;
  tone: "credit" | "debit";
  icon: IconName;
}

interface BankCard {
  title: string;
  status: string;
  last4: string;
  icon: IconName;
}

const quickActions: QuickAction[] = [
  { title: "Ajouter de l'argent", icon: "add" },
  { title: "Entre mes comptes", icon: "shuffle" },
  { title: "Informations", icon: "account-balance" },
  { title: "Plus", icon: "more-horiz" },
];

interface Account {
  type: string;
  balance: string;
  meta: string;
}

// TODO: Connect SGE API account list
const accounts: Account[] = [
  { type: "Personnel · EUR", balance: "€12,450.80", meta: "Solde disponible" },
  { type: "Joint · EUR", balance: "€8,230.00", meta: "Compte joint" },
  { type: "Épargne · EUR", balance: "€34,200.00", meta: "Taux 2.5%" },
  { type: "Professionnel · EUR", balance: "€89,150.00", meta: "SGE Belgium" },
];

// TODO: Connect transaction history endpoint
const transactions: Transaction[] = [
  {
    title: "Netflix",
    description: "Aujourd'hui, 09:24 · Carte virtuelle",
    amount: "-15.99 €",
    tone: "debit",
    icon: "movie",
  },
  {
    title: "Sky Genesis Enterprise",
    description: "Hier, 18:10 · Versement entrant",
    amount: "+8,500.00 €",
    tone: "credit",
    icon: "business-center",
  },
  {
    title: "Monoprix",
    description: "10 juin, 12:42 · Paiement carte",
    amount: "-92.30 €",
    tone: "debit",
    icon: "shopping-bag",
  },
  {
    title: "Aether Office",
    description: "9 juin, 15:20 · Remboursement interne",
    amount: "+830.00 €",
    tone: "credit",
    icon: "workspaces",
  },
];

// TODO: Connect SGE API monthly spending summary
const monthlySummary = {
  expenses: "1 245 €",
  income: "8 500 €",
};

const monthlySpendingBars = [38, 62, 44, 78, 52, 34, 68];

const monthlySpendingChartData = [
  { day: "L", amount: 380 },
  { day: "M", amount: 620 },
  { day: "M", amount: 440 },
  { day: "J", amount: 780 },
  { day: "V", amount: 520 },
  { day: "S", amount: 340 },
  { day: "D", amount: 680 },
];

interface Promotion {
  title: string;
  description: string;
  action: string;
  icon: IconName;
  // TODO: Connect SGE API / notification service
}

// TODO: Connect SGE API promotions / notification service
const promotions: Promotion[] = [
  {
    title: "Aether Metal",
    description: "Profitez de vos avantages premium : cashback, cartes virtuelles et support prioritaire.",
    action: "Découvrir",
    icon: "diamond",
  },
  {
    title: "Aether Identity",
    description: "Activez Face ID pour sécuriser vos paiements.",
    action: "Configurer",
    icon: "fingerprint",
  },
  {
    title: "Wero",
    description: "Envoyez de l'argent instantanément en Europe.",
    action: "Essayer",
    icon: "send",
  },
  {
    title: "Carte virtuelle",
    description: "Créez une carte temporaire pour vos achats en ligne.",
    action: "Créer",
    icon: "credit-card",
  },
];

// TODO: Connect SGE API card list
const bankCards: BankCard[] = [
  {
    title: "Carte Virtuelle Aether Bank",
    status: "Active",
    last4: "4829",
    icon: "credit-card",
  },
  {
    title: "Carte Physique Aether Black",
    status: "Active",
    last4: "1094",
    icon: "style",
  },
];

export default function HomeScreen() {
  const insets = usePhoneSafeAreaInsets();

  return (
    <ScreenTransition>
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6 }]} showsVerticalScrollIndicator={false}>
          <HomeHeader />

          <HeroSection />

          <View style={styles.quickActionRow}>
            {quickActions.map((action) => (
              <QuickActionButton key={action.title} action={action} />
            ))}
          </View>

          <PromotionSection />

          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>Activite recente</Text>
              <Pressable onPress={() => router.push("/transactions")}>
                <Text style={styles.postAction}>Voir tout</Text>
              </Pressable>
            </View>
            {transactions.map((transaction) => (
              <TransactionRow key={`${transaction.title}-${transaction.amount}`} transaction={transaction} />
            ))}
          </View>

          <MonthlySpendingSection />

          <CardsSection />

          <SecuritySection />
        </ScrollView>
      </View>
    </ScreenTransition>
  );
}

function HeroSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);

  const handleLayout = (e: LayoutChangeEvent) => {
    setCardWidth(e.nativeEvent.layout.width);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = cardWidth > 0 ? Math.round(e.nativeEvent.contentOffset.x / cardWidth) : 0;
    setActiveIndex(index);
  };

  return (
    <View style={styles.heroSection} onLayout={handleLayout}>
      {cardWidth > 0 && (
        <>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            snapToAlignment="start"
            onMomentumScrollEnd={handleScroll}
            style={styles.heroScroll}
          >
            {accounts.map((account) => (
              <Pressable key={account.type} style={[styles.heroAccountContent, { width: cardWidth }]}>
                <Text style={styles.heroAccountType}>{account.type}</Text>
                <Text style={styles.heroAccountAmount}>{account.balance}</Text>
                <Text style={styles.heroAccountMeta}>{account.meta}</Text>
                <View style={styles.walletButton}>
                  <Text style={styles.walletButtonText}>Comptes et Portefeuilles</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.accountPageDots}>
            {accounts.map((_, i) => (
              <View key={i} style={[styles.accountPageDot, i === activeIndex && styles.accountPageDotActive]} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

function HomeHeader() {
  const [query, setQuery] = React.useState("");

  return (
    <View style={styles.headerBlock}>
      <View style={styles.header}>
        <Pressable style={styles.accountButton} onPress={() => router.push("/profile")}>
          <Text style={styles.accountInitials}>LD</Text>
          <View style={styles.accountNotificationDot} />
        </Pressable>

        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher"
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <Pressable style={styles.headerUtilityButton} onPress={() => router.push("/analytics")}>
          <MaterialIcons name="bar-chart" size={21} color="#111827" />
          <Text style={styles.headerUtilityLabel}>Analyse</Text>
        </Pressable>

        <Pressable style={styles.headerUtilityButton} onPress={() => router.push("/cards")}>
          <MaterialIcons name="credit-card" size={21} color="#111827" />
          <Text style={styles.headerUtilityLabel}>Cartes</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PromotionSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [cardWidth, setCardWidth] = React.useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    setCardWidth(e.nativeEvent.layout.width);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = cardWidth > 0 ? Math.round(e.nativeEvent.contentOffset.x / cardWidth) : 0;
    setActiveIndex(index);
  };

  return (
    <View style={styles.promoSection}>
      <View style={styles.promoCarousel} onLayout={handleLayout}>
        {cardWidth > 0 && (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth}
              snapToAlignment="start"
              onMomentumScrollEnd={handleScroll}
              style={{ height: 150 }}
            >
              {promotions.map((promo) => (
                <View key={promo.title} style={[styles.promoCard, { width: cardWidth }]}>
                  <View style={styles.promoCardHeader}>
                    <View style={styles.promoIcon}>
                      <MaterialIcons name={promo.icon} size={18} color="#111827" />
                    </View>
                    <Text style={styles.promoTitle}>{promo.title}</Text>
                  </View>
                  <Text style={styles.promoDescription}>{promo.description}</Text>
                  <Pressable style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>{promo.action}</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
            <View style={styles.promoDots}>
              {promotions.map((_, i) => (
                <View key={i} style={[styles.promoDot, i === activeIndex && styles.promoDotActive]} />
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

function QuickActionButton({ action }: { action: QuickAction }) {
  return (
    <Pressable style={styles.quickAction}>
      <View style={styles.quickActionIcon}>
        <MaterialIcons name={action.icon} size={20} color="#111827" />
      </View>
      <Text style={styles.quickActionText}>{action.title}</Text>
    </Pressable>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <Pressable style={styles.transactionRow} onPress={() => router.push(`/transaction-detail?title=${encodeURIComponent(transaction.title)}`)}>
      <View style={styles.transactionIcon}>
        <MaterialIcons name={transaction.icon} size={20} color="#111827" />
      </View>
      <View style={styles.transactionCopy}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      </View>
      <Text style={[styles.transactionAmount, transaction.tone === "credit" ? styles.creditAmount : styles.debitAmount]}>
        {transaction.amount}
      </Text>
    </Pressable>
  );
}

function MonthlySpendingSection() {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>Depenses du mois</Text>
      </View>
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View>
            <Text style={styles.chartLabel}>Depenses</Text>
            <Text style={styles.chartValue}>{monthlySummary.expenses}</Text>
          </View>
          <View style={styles.chartIncomeBlock}>
            <Text style={styles.chartLabel}>Revenus</Text>
            <Text style={styles.chartIncomeValue}>{monthlySummary.income}</Text>
          </View>
        </View>

        {Platform.OS === "web" ? <MonthlySpendingRechart /> : <MonthlySpendingNativeChart />}
      </View>
    </View>
  );
}

function MonthlySpendingRechart() {
  return (
    <View style={styles.webChart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlySpendingChartData} margin={{ bottom: 0, left: 0, right: 0, top: 10 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 700 }}
          />
          <Bar dataKey="amount" fill="#111827" radius={[999, 999, 999, 999]} />
        </BarChart>
      </ResponsiveContainer>
    </View>
  );
}

function MonthlySpendingNativeChart() {
  return (
    <View style={styles.barChart}>
      {monthlySpendingBars.map((height, index) => (
        <View key={`${height}-${index}`} style={styles.barColumn}>
          <View style={[styles.barFill, { height }]} />
        </View>
      ))}
    </View>
  );
}

function CardsSection() {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>Mes cartes</Text>
        <Text style={styles.postAction}>Voir tout</Text>
      </View>
      {bankCards.map((card) => (
        <CardRow key={card.last4} card={card} />
      ))}
    </View>
  );
}

function CardRow({ card }: { card: BankCard }) {
  return (
    <Pressable style={styles.cardRow}>
      <View style={styles.transactionIcon}>
        <MaterialIcons name={card.icon} size={20} color="#111827" />
      </View>
      <View style={styles.transactionCopy}>
        <Text style={styles.transactionTitle}>{card.title}</Text>
        <Text style={styles.transactionDescription}>{card.status}</Text>
      </View>
      <Text style={styles.cardLast4}>**** {card.last4}</Text>
    </Pressable>
  );
}

function SecuritySection() {
  return (
    <View style={styles.postCard}>
      <View style={styles.securityContent}>
        <View style={styles.identityIcon}>
          <MaterialIcons name="fingerprint" size={25} color="#111827" />
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.identityTitle}>Face ID non active</Text>
          <Text style={styles.identityText}>Activez Face ID pour securiser votre compte.</Text>
        </View>
        {/* TODO: Connect Aether Identity */}
        <Pressable style={styles.configureButton}>
          <Text style={styles.configureText}>Configurer</Text>
        </Pressable>
      </View>
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
  heroSection: {
    minHeight: 284,
    borderRadius: 32,
    paddingBottom: 20,
    marginBottom: 0,
    backgroundColor: "transparent",
  },
  headerBlock: {
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  accountButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 22,
    backgroundColor: "#111827",
  },
  accountInitials: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },
  accountNotificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#EF4444",
  },
  searchBar: {
    flex: 1,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 22,
    paddingHorizontal: 13,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    padding: 0,
  },
  headerUtilityButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
  },
  headerUtilityLabel: {
    position: "absolute",
    opacity: 0,
    fontSize: 1,
  },
  heroScroll: {
    height: 248,
  },
  heroAccountContent: {
    height: 248,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  heroAccountType: {
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    marginBottom: 16,
  },
  heroAccountAmount: {
    color: "#05070A",
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "900",
    letterSpacing: 0,
  },
  heroAccountMeta: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    marginTop: 4,
  },
  walletButton: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 22,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#111827",
  },
  walletButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },
  accountPageDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 14,
    marginBottom: 8,
  },
  accountPageDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
  },
  accountPageDotActive: {
    width: 18,
    backgroundColor: "#111827",
  },
  quickActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -14,
    marginBottom: 18,
    zIndex: 2,
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
  identityCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  identityIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
  },
  identityCopy: {
    flex: 1,
  },
  identityTitle: {
    color: "#05070A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  identityText: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginTop: 1,
  },
  configureButton: {
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: "#111827",
  },
  configureText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
  },
  postCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  postTitle: {
    color: "#05070A",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
  },
  postAction: {
    color: "#111827",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  transactionIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  transactionCopy: {
    flex: 1,
  },
  transactionTitle: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  transactionDescription: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginTop: 1,
  },
  transactionAmount: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
  },
  creditAmount: {
    color: "#1F8A4C",
  },
  debitAmount: {
    color: "#111827",
  },
  chartCard: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    marginTop: 5,
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
  },
  chartLabel: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  chartValue: {
    color: "#05070A",
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "900",
    marginTop: 3,
  },
  chartIncomeBlock: {
    alignItems: "flex-end",
  },
  chartIncomeValue: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    marginTop: 3,
  },
  barChart: {
    height: 96,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 16,
  },
  barColumn: {
    flex: 1,
    height: 96,
    justifyContent: "flex-end",
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  barFill: {
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  webChart: {
    height: 116,
    marginTop: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  cardLast4: {
    color: "#111827",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },
  securityContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  promoSection: {
    marginBottom: 14,
  },
  promoSectionTitle: {
    color: "#05070A",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 12,
  },
  promoCarousel: {
    overflow: "hidden",
  },
  promoCard: {
    height: 150,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#FFFFFF",
    gap: 10,
  },
  promoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  promoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  promoTitle: {
    color: "#05070A",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "900",
  },
  promoDescription: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  promoButton: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: "#111827",
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "900",
  },
  promoDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
  },
  promoDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
  },
  promoDotActive: {
    width: 18,
    backgroundColor: "#111827",
  },
});
