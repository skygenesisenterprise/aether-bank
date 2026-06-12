import * as React from "react";

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import { InfoCard, KeyValueRow, MobileScreen, StatusBadge } from "@/components/mobile/developer-ui";
import { products } from "@/data/developer";
import { useTheme } from "@/hooks/use-theme";

export default function ProductDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const product = products.find((item) => item.id === id) ?? products[0];

  return (
    <MobileScreen eyebrow="Product" title={product.name} subtitle={product.description}>
      <InfoCard title="Overview" accent={product.accent}>
        <StatusBadge label={product.audience} tone="blue" />
        <KeyValueRow label="CTA" value={product.cta} />
        <KeyValueRow label="SDK status" value="Preview-ready" />
        <KeyValueRow label="Docs" value="Guides and API reference" />
      </InfoCard>
      <InfoCard title="Developer workflow" accent="#111827">
        <Text style={{ color: theme.textSecondary, fontSize: 15, lineHeight: 22 }}>
          Configure locally, test in sandbox, submit permissions, and publish through the Aether review pipeline.
        </Text>
      </InfoCard>
    </MobileScreen>
  );
}
