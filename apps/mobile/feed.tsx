import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

const filters = ["All", "Company", "Teams", "Engineering", "Leadership"];

const channels = [
  { name: "#company", state: "Joined" },
  { name: "#engineering", state: "Follow" },
  { name: "#aether-office", state: "Joined" },
  { name: "#identity", state: "Follow" },
  { name: "#security", state: "Follow" },
  { name: "#japan", state: "Joined" },
];

const posts = [
  {
    initials: "LD",
    author: "Liam Dispa",
    role: "Founder & CEO",
    channel: "#company",
    time: "12 min",
    content:
      "My Enterprise mobile is becoming the central workspace for SGE teams: identity, services, approvals and internal network in one place.",
    attachmentTitle: "My Enterprise mobile workspace",
    attachmentMeta: "Identity · Services · Network",
  },
  {
    initials: "AI",
    author: "Aether Identity Team",
    role: "Security",
    channel: "#identity",
    time: "34 min",
    content:
      "Push approval prototype is ready for internal testing. Trusted devices will appear inside the Identity tab.",
    attachmentTitle: "Internal testing window",
    attachmentMeta: "Trusted devices prototype",
  },
  {
    initials: "AO",
    author: "Aether Office",
    role: "Product",
    channel: "#office",
    time: "1h",
    content: "The internal preview now includes Mail, Drive and Calendar shortcuts from My Enterprise.",
  },
  {
    initials: "JP",
    author: "SGE Japan",
    role: "Expansion",
    channel: "#japan",
    time: "3h",
    content: "Workspace planning for Tokyo and Okinawa has moved to the next concept phase.",
  },
];

export default function FeedScreen() {
  const insets = usePhoneSafeAreaInsets();
  return (
    <ScreenTransition direction="down">
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 6 }]} showsVerticalScrollIndicator={false}>
        <FeedHeader />
        <ComposerCard />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((filter, index) => (
            <FeedFilterPill key={filter} label={filter} active={index === 0} />
          ))}
        </ScrollView>

        <SectionHeader title="Suggested channels" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.channelRow}
        >
          {channels.map((channel) => (
            <SuggestedChannelCard key={channel.name} {...channel} />
          ))}
        </ScrollView>

        <FeedPostCard post={posts[0]} />
        <CompanyPulseCard />
        <FeedPostCard post={posts[1]} />
        <TrendingCard />
        <FeedPostCard post={posts[2]} />
        <FeedPostCard post={posts[3]} />
      </ScrollView>
    </View>
    </ScreenTransition>
  );
}

function FeedHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Feed</Text>
        <Text style={styles.subtitle}>Sky Genesis Enterprise network</Text>
      </View>
      <View style={styles.headerActions}>
        <IconButton icon="search" />
        <IconButton icon="tune" />
      </View>
    </View>
  );
}

function IconButton({ icon }: { icon: IconName }) {
  return (
    <Pressable style={styles.iconButton}>
      <MaterialIcons name={icon} size={21} color="#111827" />
    </Pressable>
  );
}

function ComposerCard() {
  return (
    <View style={styles.composerCard}>
      <View style={styles.composerTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LD</Text>
        </View>
        <View style={styles.composerInput}>
          <Text style={styles.composerPlaceholder}>Share an update with your workspace</Text>
        </View>
      </View>
      <View style={styles.composerActions}>
        <ComposerAction icon="edit-note" label="Update" />
        <ComposerAction icon="image" label="Media" />
        <ComposerAction icon="poll" label="Poll" />
        <ComposerAction icon="flag" label="Report" />
      </View>
    </View>
  );
}

function ComposerAction({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable style={styles.composerAction}>
      <MaterialIcons name={icon} size={18} color="#007AFF" />
      <Text style={styles.composerActionText}>{label}</Text>
    </Pressable>
  );
}

function FeedFilterPill({ active, label }: { active?: boolean; label: string }) {
  return (
    <Pressable style={[styles.filterPill, active && styles.filterPillActive]}>
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function SuggestedChannelCard({ name, state }: { name: string; state: string }) {
  const joined = state === "Joined";

  return (
    <Pressable style={styles.channelCard}>
      <Text style={styles.channelName}>{name}</Text>
      <View style={[styles.channelBadge, joined && styles.channelBadgeJoined]}>
        <Text style={[styles.channelBadgeText, joined && styles.channelBadgeTextJoined]}>{state}</Text>
      </View>
    </Pressable>
  );
}

function FeedPostCard({
  post,
}: {
  post: {
    attachmentMeta?: string;
    attachmentTitle?: string;
    author: string;
    channel: string;
    content: string;
    initials: string;
    role: string;
    time: string;
  };
}) {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Text style={styles.postAvatarText}>{post.initials}</Text>
        </View>
        <View style={styles.postAuthorBlock}>
          <View style={styles.postAuthorRow}>
            <Text style={styles.postAuthor}>{post.author}</Text>
            <Text style={styles.postTime}>{post.time}</Text>
          </View>
          <Text style={styles.postMeta}>
            {post.role} · {post.channel}
          </Text>
        </View>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      {post.attachmentTitle ? (
        <View style={styles.attachmentCard}>
          <View style={styles.attachmentIcon}>
            <MaterialIcons name="link" size={20} color="#007AFF" />
          </View>
          <View style={styles.attachmentCopy}>
            <Text style={styles.attachmentTitle}>{post.attachmentTitle}</Text>
            <Text style={styles.attachmentMeta}>{post.attachmentMeta}</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.postActions}>
        <PostAction icon="thumb-up-off-alt" label="Like" />
        <PostAction icon="chat-bubble-outline" label="Reply" />
        <PostAction icon="ios-share" label="Share" />
        <PostAction icon="bookmark-border" label="Save" />
      </View>
    </View>
  );
}

function PostAction({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable style={styles.postAction}>
      <MaterialIcons name={icon} size={17} color="#6B7280" />
      <Text style={styles.postActionText}>{label}</Text>
    </Pressable>
  );
}

function CompanyPulseCard() {
  return (
    <View style={styles.widgetCard}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Company Pulse</Text>
        <MaterialIcons name="monitor-heart" size={22} color="#007AFF" />
      </View>
      <View style={styles.pulseGrid}>
        <PulseMetric value="3" label="new announcements" />
        <PulseMetric value="2" label="login approvals" />
        <PulseMetric value="7" label="unread updates" />
      </View>
    </View>
  );
}

function PulseMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.pulseMetric}>
      <Text style={styles.pulseValue}>{value}</Text>
      <Text style={styles.pulseLabel}>{label}</Text>
    </View>
  );
}

function TrendingCard() {
  return (
    <View style={styles.widgetCard}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Trending inside SGE</Text>
        <MaterialIcons name="trending-up" size={22} color="#007AFF" />
      </View>
      <View style={styles.trendingRow}>
        {["#identity", "#aether-office", "#japan", "#cloud"].map((tag) => (
          <View key={tag} style={styles.trendingPill}>
            <Text style={styles.trendingText}>{tag}</Text>
          </View>
        ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  composerCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 15,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  composerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  composerInput: {
    flex: 1,
    height: 42,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 21,
    paddingHorizontal: 15,
    backgroundColor: "#F8FAFC",
  },
  composerPlaceholder: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
  composerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  composerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  composerActionText: {
    color: "#374151",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  filterRow: {
    gap: 9,
    paddingRight: 20,
    marginBottom: 18,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  filterPillActive: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#374151",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    color: "#05070A",
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "900",
    marginBottom: 12,
  },
  channelRow: {
    gap: 10,
    paddingRight: 20,
    marginBottom: 18,
  },
  channelCard: {
    minWidth: 132,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    padding: 13,
    gap: 10,
    backgroundColor: "#FFFFFF",
  },
  channelName: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  channelBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: "#EAF4FF",
  },
  channelBadgeJoined: {
    backgroundColor: "#EAF8EF",
  },
  channelBadgeText: {
    color: "#007AFF",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "900",
  },
  channelBadgeTextJoined: {
    color: "#1F8A4C",
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
    gap: 11,
    marginBottom: 12,
  },
  postAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },
  postAvatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  postAuthorBlock: {
    flex: 1,
    gap: 2,
  },
  postAuthorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  postAuthor: {
    flex: 1,
    color: "#05070A",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  postTime: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },
  postMeta: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  postContent: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  attachmentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderWidth: 1,
    borderColor: "#DCE5F2",
    borderRadius: 15,
    padding: 13,
    marginTop: 13,
    backgroundColor: "#F8FBFF",
  },
  attachmentIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF4FF",
  },
  attachmentCopy: {
    flex: 1,
  },
  attachmentTitle: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
  },
  attachmentMeta: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    marginTop: 14,
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postActionText: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  widgetCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  widgetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  widgetTitle: {
    color: "#05070A",
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
  },
  pulseGrid: {
    flexDirection: "row",
    gap: 10,
  },
  pulseMetric: {
    flex: 1,
    borderRadius: 14,
    padding: 11,
    backgroundColor: "#F1F6FF",
  },
  pulseValue: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "900",
  },
  pulseLabel: {
    color: "#4B5563",
    textAlign: "center",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },
  trendingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },
  trendingPill: {
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: "#EAF4FF",
  },
  trendingText: {
    color: "#007AFF",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },
});
