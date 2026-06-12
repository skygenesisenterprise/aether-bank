import * as React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

import { usePhoneSafeAreaInsets } from "@/components/mobile/use-phone-safe-area";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];
type MessageSide = "left" | "right";

interface ChatMessage {
  author: string;
  id: string;
  kind?: "approval";
  message: string;
  side: MessageSide;
  time: string;
}

const TAB_BAR_HEIGHT = 74;

const conversationNames: Record<string, { name: string; subtitle: string }> = {
  "aether-identity-team": {
    name: "Aether Identity Team",
    subtitle: "8 members · 4 online",
  },
  "executive-office": {
    name: "Executive Office",
    subtitle: "6 members · 3 online",
  },
  company: {
    name: "#company",
    subtitle: "Company-wide channel",
  },
};

const initialMessages: ChatMessage[] = [
  {
    id: "message-1",
    author: "Liam",
    message: "Can we prepare the mobile approval flow for testing?",
    side: "right",
    time: "09:38",
  },
  {
    id: "message-2",
    author: "Aether Identity Team",
    message: "Push approval prototype is ready for review.",
    side: "left",
    time: "09:40",
  },
  {
    id: "message-3",
    author: "Thomas",
    message: "We should include trusted device metadata before approving sessions.",
    side: "left",
    time: "09:41",
  },
  {
    id: "message-4",
    author: "Aether Identity Bot",
    message: "New sign-in request from Firefox on Linux · Liège",
    side: "left",
    time: "09:42",
    kind: "approval",
  },
];

export default function ChatDetailScreen() {
  const insets = usePhoneSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const { id } = useLocalSearchParams<{ id?: string }>();
  const conversation = conversationNames[id ?? ""] ?? conversationNames["aether-identity-team"];
  const [composerValue, setComposerValue] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [attachmentMenuOpen, setAttachmentMenuOpen] = React.useState(false);

  const appendSystemMessage = React.useCallback((message: string) => {
    setMessages((current) => [
      ...current,
      {
        id: `message-${current.length + 1}`,
        author: "System",
        message,
        side: "left",
        time: "Now",
      },
    ]);
  }, []);

  const handleAttachmentAction = React.useCallback((label: string) => {
    setAttachmentMenuOpen(false);
    appendSystemMessage(`${label} added to the draft message.`);
  }, [appendSystemMessage]);

  const handleSend = React.useCallback(() => {
    const trimmed = composerValue.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `message-${current.length + 1}`,
        author: "You",
        message: trimmed,
        side: "right",
        time: "Now",
      },
    ]);
    setComposerValue("");
  }, [composerValue]);

  const handleApproval = React.useCallback((decision: "approved" | "rejected") => {
    appendSystemMessage(
      decision === "approved"
        ? "Login request approved. Device marked as temporarily trusted."
        : "Login request rejected. Security team has been notified.",
    );
  }, [appendSystemMessage]);

  return (
    <View style={styles.safeArea}>
      <View style={[styles.header, compact && styles.headerCompact, { paddingTop: insets.top + 4 }]}>
        <Pressable style={[styles.headerButton, compact && styles.headerButtonCompact]} onPress={() => router.replace("/chat")}>
          <MaterialIcons name="chevron-left" size={26} color="#0B1220" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text numberOfLines={1} style={[styles.title, compact && styles.titleCompact]}>{conversation.name}</Text>
          <Text numberOfLines={1} style={[styles.subtitle, compact && styles.subtitleCompact]}>{conversation.subtitle}</Text>
        </View>
        <Pressable
          style={[styles.headerButton, compact && styles.headerButtonCompact]}
          onPress={() => setInfoOpen((current) => !current)}
        >
          <MaterialIcons name="info-outline" size={22} color="#0B1220" />
        </Pressable>
      </View>

      {infoOpen ? (
        <View style={[styles.infoPanel, compact && styles.infoPanelCompact]}>
          <Text style={styles.infoPanelTitle}>Conversation details</Text>
          <Text style={styles.infoPanelText}>Workspace thread: {conversation.name}</Text>
          <Text style={styles.infoPanelText}>Members: {conversation.subtitle}</Text>
        </View>
      ) : null}

      <View style={styles.thread}>
        <ScrollView
          style={styles.messageList}
          contentContainerStyle={[styles.messages, { paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 104 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dayDivider}>
            <Text style={styles.dayDividerText}>Today</Text>
          </View>

          {messages.map((item) =>
            item.kind === "approval" ? (
              <SystemApprovalCard
                compact={compact}
                key={item.id}
                message={item.message}
                onApprove={() => handleApproval("approved")}
                onReject={() => handleApproval("rejected")}
              />
            ) : (
              <MessageBubble
                author={item.author}
                compact={compact}
                key={item.id}
                message={item.message}
                side={item.side}
                time={item.time}
              />
            ),
          )}
        </ScrollView>
      </View>

      {attachmentMenuOpen ? (
        <View style={[styles.attachmentMenu, compact && styles.attachmentMenuCompact]}>
          <AttachmentAction label="Attach file" onPress={() => handleAttachmentAction("File")} />
          <AttachmentAction label="Share image" onPress={() => handleAttachmentAction("Image")} />
          <AttachmentAction label="Create poll" onPress={() => handleAttachmentAction("Poll")} />
        </View>
      ) : null}

      <ChatComposer
        compact={compact}
        conversationName={conversation.name.replace("#", "")}
        insets={insets}
        onAddPress={() => setAttachmentMenuOpen((current) => !current)}
        onMicPress={() => appendSystemMessage("Voice note capture is ready to start.")}
        onSendPress={handleSend}
        onTextChange={setComposerValue}
        onAttachPress={() => handleAttachmentAction("Document")}
        value={composerValue}
      />
    </View>
  );
}

function MessageBubble({
  author,
  compact,
  message,
  side,
  time,
}: {
  author: string;
  compact: boolean;
  message: string;
  side: "left" | "right";
  time: string;
}) {
  const own = side === "right";

  return (
    <View style={[styles.messageRow, compact && styles.messageRowCompact, own && styles.messageRowRight]}>
      {own ? <View style={[styles.messageAvatarSpacer, compact && styles.messageAvatarSpacerCompact]} /> : <MessageAvatar author={author} compact={compact} />}
      <View style={[styles.messageWrap, compact && styles.messageWrapCompact, own && styles.messageWrapRight]}>
        <Text style={[styles.messageAuthor, own && styles.messageAuthorRight]}>{author}</Text>
        <View style={[styles.messageBubble, own && styles.messageBubbleOwn]}>
          <Text style={[styles.messageText, own && styles.messageTextOwn]}>{message}</Text>
        </View>
        <Text style={[styles.messageTime, own && styles.messageTimeRight]}>{time}</Text>
      </View>
    </View>
  );
}

function MessageAvatar({ author, compact }: { author: string; compact: boolean }) {
  const initials = author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.messageAvatar, compact && styles.messageAvatarCompact]}>
      <Text style={styles.messageAvatarText}>{initials}</Text>
    </View>
  );
}

function SystemApprovalCard({
  compact,
  message,
  onApprove,
  onReject,
}: {
  compact: boolean;
  message: string;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <View style={[styles.systemCard, compact && styles.systemCardCompact]}>
      <View style={styles.systemHeader}>
        <View style={[styles.systemIcon, compact && styles.systemIconCompact]}>
          <MaterialIcons name="fingerprint" size={24} color="#168EEA" />
        </View>
        <View style={styles.systemCopy}>
          <Text style={styles.systemTitle}>Aether Identity Bot</Text>
          <Text style={styles.systemText}>{message}</Text>
        </View>
      </View>
      <View style={styles.systemActions}>
        <Pressable onPress={onReject} style={styles.rejectButton}>
          <Text style={styles.rejectText}>Reject</Text>
        </Pressable>
        <Pressable onPress={onApprove} style={styles.approveButton}>
          <Text style={styles.approveText}>Approve</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ChatComposer({
  compact,
  conversationName,
  insets,
  onAddPress,
  onAttachPress,
  onMicPress,
  onSendPress,
  onTextChange,
  value,
}: {
  compact: boolean;
  conversationName: string;
  insets: { bottom: number };
  onAddPress: () => void;
  onAttachPress: () => void;
  onMicPress: () => void;
  onSendPress: () => void;
  onTextChange: (value: string) => void;
  value: string;
}) {
  return (
    <View style={[styles.composerWrap, { paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 10 }]}>
      <View style={[styles.composer, compact && styles.composerCompact]}>
        <Pressable onPress={onAddPress} style={[styles.composerLeading, compact && styles.composerLeadingCompact]}>
          <ComposerIcon icon="add" />
        </Pressable>
        <TextInput
          multiline
          onChangeText={onTextChange}
          placeholder={`Message ${conversationName}...`}
          placeholderTextColor="#98A2B3"
          style={styles.composerInput}
          value={value}
        />
        <View style={styles.composerActions}>
          <Pressable onPress={onAttachPress}>
            <ComposerIcon icon="attach-file" />
          </Pressable>
          <Pressable onPress={onMicPress}>
            <ComposerIcon icon="mic-none" />
          </Pressable>
        </View>
        <Pressable onPress={onSendPress} style={styles.sendButton}>
          <MaterialIcons name="send" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

function AttachmentAction({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.attachmentAction}>
      <Text style={styles.attachmentActionText}>{label}</Text>
    </Pressable>
  );
}

function ComposerIcon({ icon }: { icon: IconName }) {
  return (
    <View style={styles.composerIcon}>
      <MaterialIcons name={icon} size={20} color="#667085" />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EAF1",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  headerCompact: {
    gap: 10,
    paddingHorizontal: 12,
  },
  infoPanel: {
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#FFFFFF",
    gap: 4,
  },
  infoPanelCompact: {
    marginHorizontal: 12,
    padding: 12,
  },
  infoPanelTitle: {
    color: "#0B1220",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  infoPanelText: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  thread: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
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
  headerButtonCompact: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: "#0B1220",
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
  },
  titleCompact: {
    fontSize: 16,
    lineHeight: 21,
  },
  subtitle: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  subtitleCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
  dayDivider: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#E9EEF5",
  },
  dayDividerText: {
    color: "#526071",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  messages: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 22,
    gap: 16,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  messageRowCompact: {
    gap: 8,
  },
  messageRowRight: {
    justifyContent: "flex-end",
  },
  messageWrap: {
    maxWidth: "82%",
    gap: 4,
  },
  messageWrapCompact: {
    maxWidth: "86%",
  },
  messageWrapRight: {
    alignItems: "flex-end",
  },
  messageAvatar: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#DCEBFF",
  },
  messageAvatarCompact: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  messageAvatarSpacer: {
    width: 34,
  },
  messageAvatarSpacerCompact: {
    width: 30,
  },
  messageAvatarText: {
    color: "#1767C9",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
  },
  messageAuthor: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },
  messageAuthorRight: {
    textAlign: "right",
  },
  messageBubble: {
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 18,
    borderTopLeftRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
  },
  messageBubbleOwn: {
    borderColor: "#168EEA",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 6,
    backgroundColor: "#168EEA",
  },
  messageText: {
    color: "#0B1220",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
  },
  messageTextOwn: {
    color: "#FFFFFF",
  },
  messageTime: {
    color: "#98A2B3",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },
  messageTimeRight: {
    textAlign: "right",
  },
  systemCard: {
    borderWidth: 1,
    borderColor: "#DCEBFF",
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  systemCardCompact: {
    padding: 13,
  },
  systemHeader: {
    flexDirection: "row",
    gap: 12,
  },
  systemIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
  },
  systemIconCompact: {
    width: 38,
    height: 38,
    borderRadius: 12,
  },
  systemCopy: {
    flex: 1,
    gap: 3,
  },
  systemTitle: {
    color: "#0B1220",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
  systemText: {
    color: "#667085",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },
  systemActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 14,
  },
  rejectButton: {
    height: 38,
    minWidth: 76,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  rejectText: {
    color: "#344054",
    fontSize: 14,
    fontWeight: "900",
  },
  approveButton: {
    height: 38,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#168EEA",
  },
  approveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  composerWrap: {
    borderTopWidth: 1,
    borderTopColor: "#E4EAF1",
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  attachmentMenu: {
    marginHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 18,
    padding: 8,
    backgroundColor: "#FFFFFF",
    gap: 6,
  },
  attachmentMenuCompact: {
    marginHorizontal: 12,
  },
  attachmentAction: {
    minHeight: 40,
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F8FAFC",
  },
  attachmentActionText: {
    color: "#0B1220",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  composer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E4EAF1",
    borderRadius: 23,
    paddingHorizontal: 8,
    backgroundColor: "#F8FAFC",
  },
  composerCompact: {
    minHeight: 48,
    gap: 6,
    paddingHorizontal: 6,
  },
  composerLeading: {
    width: 36,
    alignItems: "center",
  },
  composerLeadingCompact: {
    width: 30,
  },
  composerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  composerInput: {
    flex: 1,
    maxHeight: 96,
    color: "#667085",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    paddingVertical: 12,
  },
  composerIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  composerText: {
    display: "none",
  },
  sendButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#168EEA",
  },
});
