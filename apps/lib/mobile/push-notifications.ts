import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export interface PushNotificationRegistration {
  error?: string;
  permissionStatus: Notifications.PermissionStatus;
  projectId?: string;
  token?: string;
}

export const AETHER_BANK_NOTIFICATION_CHANNEL_ID = "aether-bank";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function configureAndroidNotificationChannel() {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync(AETHER_BANK_NOTIFICATION_CHANNEL_ID, {
    name: "Aether Bank",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#168EEA",
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    showBadge: true,
  });
}

export async function registerForPushNotificationsAsync(): Promise<PushNotificationRegistration> {
  await configureAndroidNotificationChannel();

  if (Platform.OS === "web") {
    return {
      permissionStatus: Notifications.PermissionStatus.UNDETERMINED,
      error: "Expo push notifications are only registered on native devices.",
    };
  }

  if (!Device.isDevice) {
    return {
      permissionStatus: Notifications.PermissionStatus.UNDETERMINED,
      error: "Push notifications require a physical device.",
    };
  }

  const permissions = await Notifications.getPermissionsAsync();
  let finalStatus = permissions.status;

  if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
    const requestedPermissions = await Notifications.requestPermissionsAsync();
    finalStatus = requestedPermissions.status;
  }

  if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
    return {
      permissionStatus: finalStatus,
      error: "Notification permission was not granted.",
    };
  }

  const projectId = getExpoProjectId();
  const tokenResponse = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);

  return {
    permissionStatus: finalStatus,
    projectId,
    token: tokenResponse.data,
  };
}

export function addPushNotificationListeners({
  onNotificationReceived,
  onNotificationResponse,
}: {
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  onNotificationResponse?: (response: Notifications.NotificationResponse) => void;
}) {
  const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
    onNotificationReceived?.(notification);
  });

  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    onNotificationResponse?.(response);
  });

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
}

export async function scheduleLocalTestNotificationAsync() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Aether Bank",
      body: "This is a local notification preview.",
      data: {
        route: "/",
        source: "local-test",
      },
    },
    trigger: {
      seconds: 2,
    },
  });
}

function getExpoProjectId() {
  return (
    Constants.easConfig?.projectId ??
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.expoConfig?.extra?.projectId
  );
}
