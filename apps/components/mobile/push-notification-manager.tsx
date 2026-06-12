import * as React from "react";

import { router } from "expo-router";

import {
  addPushNotificationListeners,
  registerForPushNotificationsAsync,
  type PushNotificationRegistration,
} from "@/lib/mobile/push-notifications";

interface PushNotificationManagerProps {
  children: React.ReactNode;
}

export function PushNotificationManager({ children }: PushNotificationManagerProps) {
  const [registration, setRegistration] = React.useState<PushNotificationRegistration | null>(null);

  React.useEffect(() => {
    let mounted = true;

    registerForPushNotificationsAsync()
      .then((nextRegistration) => {
        if (mounted) {
          setRegistration(nextRegistration);
        }
      })
      .catch((error: unknown) => {
        if (mounted) {
          setRegistration({
            permissionStatus: "undetermined" as PushNotificationRegistration["permissionStatus"],
            error: error instanceof Error ? error.message : "Unable to register push notifications.",
          });
        }
      });

    const removeListeners = addPushNotificationListeners({
      onNotificationReceived: (notification) => {
        console.info("Push notification received", notification.request.content);
      },
      onNotificationResponse: (response) => {
        const route = response.notification.request.content.data?.route;

        if (typeof route === "string") {
          (router.push as (href: string) => void)(route);
        }
      },
    });

    return () => {
      mounted = false;
      removeListeners();
    };
  }, []);

  React.useEffect(() => {
    if (!registration) {
      return;
    }

    if (registration.token) {
      console.info("Expo push token registered locally", registration.token);
      return;
    }

    if (registration.error) {
      console.info("Push notification registration skipped", registration.error);
    }
  }, [registration]);

  return <>{children}</>;
}
