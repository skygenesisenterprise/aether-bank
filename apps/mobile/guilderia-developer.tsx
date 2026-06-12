import * as React from "react";

import { Text } from "react-native";

import { InfoCard, KeyValueRow, MobileScreen, StatusBadge } from "@/components/mobile/developer-ui";
import { useTheme } from "@/hooks/use-theme";

export default function GuilderiaDeveloperScreen() {
  const theme = useTheme();

  return (
    <MobileScreen
      eyebrow="Guilderia"
      title="Guilderia Developer"
      subtitle="Build bots, community tools, guild automations, and marketplace extensions."
    >
      <InfoCard title="Bot Framework" accent="#AF52DE">
        <StatusBadge label="Beta" tone="blue" />
        <KeyValueRow label="Commands" value="Slash and context commands" />
        <KeyValueRow label="Events" value="Guild, member, message" />
        <KeyValueRow label="Review" value="Required for public bots" />
      </InfoCard>
      <InfoCard title="Publishing" accent="#FF2D55">
        <Text style={{ color: theme.textSecondary, fontSize: 15, lineHeight: 22 }}>
          Submit bot permissions, privacy notes, screenshots, and moderation details before public distribution.
        </Text>
      </InfoCard>
    </MobileScreen>
  );
}
