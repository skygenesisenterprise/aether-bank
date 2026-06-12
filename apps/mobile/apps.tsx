import * as React from "react";

import { router } from "expo-router";

import { DeveloperAppCard, MobileScreen, SectionHeader } from "@/components/mobile/developer-ui";
import { developerApps } from "@/data/developer";

function push(path: string) {
  (router.push as (href: string) => void)(path);
}

export default function AppsScreen() {
  return (
    <MobileScreen
      eyebrow="Apps"
      title="Your Apps"
      subtitle="Monitor app environments, review status, credentials, and release health."
    >
      <SectionHeader title="Developer Applications" action={`${developerApps.length} total`} />
      {developerApps.map((app) => (
        <DeveloperAppCard key={app.id} app={app} onPress={() => push(`/app-detail?id=${app.id}`)} />
      ))}
    </MobileScreen>
  );
}
