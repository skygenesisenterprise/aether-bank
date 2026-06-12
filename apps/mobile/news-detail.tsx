import * as React from "react";

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import { InfoCard, MobileScreen, StatusBadge } from "@/components/mobile/developer-ui";
import { announcements } from "@/data/developer";
import { useTheme } from "@/hooks/use-theme";

export default function NewsDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const announcement = announcements.find((item) => item.id === id) ?? announcements[0];

  return (
    <MobileScreen eyebrow="News" title={announcement.title} subtitle={announcement.date}>
      <InfoCard title="Announcement" accent="#5E5CE6">
        <StatusBadge label={announcement.category} tone="blue" />
        <Text style={{ color: theme.textSecondary, fontSize: 15, lineHeight: 22 }}>{announcement.summary}</Text>
        <Text style={{ color: theme.textSecondary, fontSize: 15, lineHeight: 22 }}>
          This static detail view previews how release notes, platform updates, and review policy changes can be
          presented in the companion app.
        </Text>
      </InfoCard>
    </MobileScreen>
  );
}
