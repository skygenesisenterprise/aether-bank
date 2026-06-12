import * as React from "react";

import { useLocalSearchParams } from "expo-router";

import {
  InfoCard,
  KeyValueRow,
  MobileScreen,
  SectionHeader,
  StatusBadge,
} from "@/components/mobile/developer-ui";
import { developerApps } from "@/data/developer";

export default function AppDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const app = developerApps.find((item) => item.id === id) ?? developerApps[0];

  return (
    <MobileScreen eyebrow="App Detail" title={app.name} subtitle={`${app.product} - ${app.environment}`}>
      <InfoCard title="Overview" accent="#0A84FF">
        <KeyValueRow label="Product" value={app.product} />
        <KeyValueRow label="Type" value={app.type} />
        <KeyValueRow label="Environment" value={app.environment} />
        <KeyValueRow label="Last update" value={app.lastUpdated} />
      </InfoCard>

      <InfoCard title="Credentials Summary" accent="#111827">
        <KeyValueRow label="Client ID" value={`aeth_${app.id}`} />
        <KeyValueRow label="Signing key" value="Rotated 12 days ago" />
        <KeyValueRow label="Webhook secret" value="Configured" />
      </InfoCard>

      <SectionHeader title="Permissions" />
      {app.permissions.map((permission) => (
        <InfoCard key={permission} title={permission} accent="#5E5CE6">
          <StatusBadge label="Granted" tone="green" />
        </InfoCard>
      ))}

      <InfoCard title="Review Status" accent={app.statusTone === "red" ? "#FF3B30" : "#FF9500"}>
        <StatusBadge label={app.reviewStatus} tone={app.statusTone} />
        <KeyValueRow label="Queue" value="Aether Store Review" />
        <KeyValueRow label="Expected response" value="24-48h" />
      </InfoCard>

      <InfoCard title="Analytics Summary" accent="#34A853">
        <KeyValueRow label="Installs" value={app.analytics.installs} />
        <KeyValueRow label="Sessions" value={app.analytics.sessions} />
        <KeyValueRow label="Crash rate" value={app.analytics.crashes} />
      </InfoCard>
    </MobileScreen>
  );
}
