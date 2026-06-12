import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { ScreenTransition } from "@/components/mobile/screen-transition";
import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface Conversation {
  badge?: string;
  id: string;
  initials: string;
  label: string;
  message: string;
  name: string;
  online?: boolean;
  time: string;
  unread?: number;
}

const filters = ["All", "Unread", "Teams", "Direct", "Support"];

const priorityConversations: Conversation[] = [
  {
    id: "executive-office",
    initials: "EO",
    name: "Executive Office",
    label: "Team",
    message: "Mathis: I updated the leadership dashboard concept.",
    time: "2 min",
    unread: 3,
    online: true,
  },
  {
    id: "aether-identity-team",
    initials: "AI",
    name: "Aether Identity Team",
    label: "Team",
    message: "Push approval flow is ready for review.",
    time: "18 min",
    unread: 1,
    online: true,
  },
];

const teamChannels: Conversation[] = [
  {
    id: "company",
    initials: "#",
    name: "#company",
    label: "Channel",
    message: "New company-wide update posted.",
    time: "12 min",
    unread: 5,
  },
  {
    id: "engineering",
    initials: "#",
    name: "#engineering",
    label: "Channel",
    message: "API client package structure was discussed.",
    time: "42 min",
    unread: 2,
  },
  {
    id: "security",
    initials: "#",
    name: "#security",
    label: "Channel",
    message: "Trusted device policy draft is ready.",
    time: "1h",
    unread: 0,
  },
  {
    id: "japan",
    initials: "#",
    name: "#japan",
    label: "Channel",
    message: "Tokyo workspace notes were added.",
    time: "3h",
    unread: 5,
  },
];

const directMessages: Conversation[] = [
  {
    id: "mathis-luymoyen",
    initials: "ML",
    name: "Mathis Luymoyen",
    label: "Direct",
    message: "Let's review the home page content later.",
    time: "24 min",
    online: true,
  },
  {
    id: "alane-jaunet",
    initials: "AJ",
    name: "Alane Jaunet",
    label: "Direct",
    message: "I pushed an update to the mobile layout.",
    time: "1h",
    online: false,
  },
  {
    id: "thomas-cybersecurity",
    initials: "TC",
    name: "Thomas Cybersecurity",
    label: "Direct",
    message: "We should review trusted device policies.",
    time: "Yesterday",
    online: false,
  },
];

const systemConversations: Conversation[] = [
  {
    id: "aether-identity",
    initials: "AI",
    name: "Aether Identity",
    label: "System",
    message: "New login approval request detected.",
    time: "Now",
    badge: "Security",
  },
  {
    id: "aether-support",
    initials: "AS",
    name: "Aether Support",
    label: "Support",
    message: "Your workspace request has been received.",
    time: "1h",
    badge: "Support",
  },
  {
    id: "aether-status",
    initials: "ST",
    name: "Aether Status",
    label: "System",
    message: "Aether Mail incident resolved.",
    time: "3h",
    badge: "Status",
  },
];

export default function ChatScreen() {
  const insets = usePhoneSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const compact = width < 370;

  useFocusEffect(
    React.useCallback(() => {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
      });
    }, []),
  );

  return (
    <ScreenTransition direction="up">
    <View style={styles.safeArea}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.content,
          compact && styles.contentCompact,
          { paddingTop: insets.top + 6 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ChatHeader compact={compact} />
        <ChatSearchBar compact={compact} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((filter, index) => (
            <ChatFilterPill key={filter} active={index === 0} compact={compact} label={filter} />
          ))}
        </ScrollView>

        <ConversationSection compact={compact} conversations={priorityConversations} title="Priority" />
        <ConversationSection compact={compact} conversations={teamChannels} title="Teams & Channels" />
        <ConversationSection compact={compact} conversations={directMessages} title="Direct Messages" />
        <ConversationSection compact={compact} conversations={systemConversations} system title="System & Support" />
      </ScrollView>
    </View>
    </ScreenTransition>
  );
}

function ChatHeader({ compact }: { compact: boolean }) {
  return (
    <View style={[styles.header, compact && styles.headerCompact]}>
      <View style={styles.headerCopy}>
        <Text style={[styles.title, compact && styles.titleCompact]}>Chat</Text>
        <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>
          Internal messages and team conversations
        </Text>
      </View>
      <View style={styles.headerActions}>
        <IconButton compact={compact} icon="edit" />
        <IconButton compact={compact} icon="tune" />
      </View>
    </View>
  );
}

function IconButton({ compact, icon }: { compact: boolean; icon: IconName }) {
  return (
    <Pressable style={[styles.iconButton, compact && styles.iconButtonCompact]}>
      <MaterialIcons name={icon} size={21} color="#0B1220" />
    </Pressable>
  );
}

function ChatSearchBar({ compact }: { compact: boolean }) {
  return (
    <View style={[styles.searchCard, compact && styles.searchCardCompact]}>
      <MaterialIcons name="search" size={21} color="#667085" />
      <Text numberOfLines={1} style={styles.searchText}>Search conversations, people or teams</Text>
    </View>
  );
}

function ChatFilterPill({ active, compact, label }: { active?: boolean; compact: boolean; label: string }) {
  return (
    <Pressable style={[styles.filterPill, compact && styles.filterPillCompact, active && styles.filterPillActive]}>
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

function ConversationSection({
  conversations,
  compact,
  system,
  title,
}: {
  conversations: Conversation[];
  compact: boolean;
  system?: boolean;
  title: string;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, compact && styles.sectionTitleCompact]}>{title}</Text>
      <View style={[styles.sectionCard, compact && styles.sectionCardCompact]}>
        {conversations.map((conversation) =>
          system ? (
            <SystemConversationRow compact={compact} key={conversation.id} conversation={conversation} />
          ) : (
            <ConversationRow compact={compact} key={conversation.id} conversation={conversation} />
          ),
        )}
      </View>
    </View>
  );
}

function ConversationRow({ compact, conversation }: { compact: boolean; conversation: Conversation }) {
  return (
    <Pressable style={[styles.conversationRow, compact && styles.conversationRowCompact]} onPress={() => router.push(`/chat/${conversation.id}`)}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, compact && styles.avatarCompact]}>
          <Text style={styles.avatarText}>{conversation.initials}</Text>
        </View>
        {conversation.online ? <OnlineDot /> : null}
      </View>
      <View style={styles.conversationCopy}>
        <View style={[styles.conversationTop, compact && styles.conversationTopCompact]}>
          <Text style={styles.conversationName}>{conversation.name}</Text>
          <Text style={[styles.time, compact && styles.timeCompact]}>{conversation.time}</Text>
        </View>
        <Text style={styles.label}>{conversation.label}</Text>
        <Text numberOfLines={1} style={styles.message}>
          {conversation.message}
        </Text>
      </View>
      <View style={[styles.trailing, compact && styles.trailingCompact]}>
        {conversation.unread ? <UnreadBadge count={conversation.unread} /> : null}
        <MaterialIcons name="chevron-right" size={21} color="#A3ACBA" />
      </View>
    </Pressable>
  );
}

function SystemConversationRow({ compact, conversation }: { compact: boolean; conversation: Conversation }) {
  return (
    <Pressable style={[styles.conversationRow, compact && styles.conversationRowCompact]} onPress={() => router.push(`/chat/${conversation.id}`)}>
      <View style={[styles.avatar, styles.systemAvatar, compact && styles.avatarCompact]}>
        <Text style={styles.avatarText}>{conversation.initials}</Text>
      </View>
      <View style={styles.conversationCopy}>
        <View style={[styles.conversationTop, compact && styles.conversationTopCompact]}>
          <Text style={styles.conversationName}>{conversation.name}</Text>
          <Text style={[styles.time, compact && styles.timeCompact]}>{conversation.time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.message}>
          {conversation.message}
        </Text>
      </View>
      <View style={[styles.trailing, compact && styles.trailingCompact]}>
        {conversation.badge ? <StatusBadge label={conversation.badge} /> : null}
        <MaterialIcons name="chevron-right" size={21} color="#A3ACBA" />
      </View>
    </Pressable>
  );
}

function UnreadBadge({ count }: { count: number }) {
  return (
    <View style={styles.unreadBadge}>
      <Text style={styles.unreadText}>{count}</Text>
    </View>
  );
}

function OnlineDot() {
  return <View style={styles.onlineDot} />;
}

function StatusBadge({ label }: { label: string }) {
  return (
    <View style={styles.statusBadge}>
      <Text style={styles.statusBadgeText}>{label}</Text>
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
  contentCompact: {
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 18,
  },
  headerCompact: {
    gap: 10,
    marginBottom: 16,
  },
  title: {
    color: "#0B1220",
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
  },
  titleCompact: {
    fontSize: 30,
    lineHeight: 34,
  },
  subtitle: {
    color: "#667085",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
  },
  subtitleCompact: {
    fontSize: 14,
    lineHeight: 19,
  },
  headerActions: {
    flexDirection: "row",
    gap: 9,
    paddingTop: 3,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  iconButtonCompact: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  searchCardCompact: {
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  searchText: {
    flex: 1,
    color: "#667085",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
  },
  filterRow: {
    gap: 9,
    paddingRight: 20,
    marginBottom: 22,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  filterPillCompact: {
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  filterPillActive: {
    borderColor: "#168EEA",
    backgroundColor: "#168EEA",
  },
  filterText: {
    color: "#344054",
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    color: "#0B1220",
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "900",
    marginBottom: 11,
  },
  sectionTitleCompact: {
    fontSize: 19,
    lineHeight: 24,
    marginBottom: 10,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  sectionCardCompact: {
    paddingHorizontal: 12,
  },
  conversationRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  conversationRowCompact: {
    minHeight: 76,
    gap: 10,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168EEA",
  },
  avatarCompact: {
    width: 42,
    height: 42,
    borderRadius: 16,
  },
  systemAvatar: {
    backgroundColor: "#0B1220",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  onlineDot: {
    position: "absolute",
    right: -1,
    bottom: -1,
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 6,
    backgroundColor: "#22C55E",
  },
  conversationCopy: {
    flex: 1,
    gap: 2,
  },
  conversationTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  conversationTopCompact: {
    gap: 8,
  },
  conversationName: {
    flex: 1,
    color: "#0B1220",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  time: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },
  timeCompact: {
    fontSize: 11,
    lineHeight: 15,
  },
  label: {
    color: "#168EEA",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  message: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  trailing: {
    alignItems: "flex-end",
    gap: 7,
    minWidth: 28,
  },
  trailingCompact: {
    minWidth: 22,
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "#168EEA",
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: "#EAF4FF",
  },
  statusBadgeText: {
    color: "#168EEA",
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "900",
  },
});
