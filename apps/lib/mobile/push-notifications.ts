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

export type BankNotificationKind = "money_received" | "card_debited" | "transfer_sent";

export interface BankNotificationData {
  accountId?: string;
  amount?: number;
  counterparty?: string;
  currency?: string;
  kind: BankNotificationKind;
  route?: string;
  transactionId?: string;
}

interface FinanceNotificationInput {
  accountId?: string;
  amount: number;
  counterparty: string;
  currency?: string;
  route?: string;
  transactionId?: string;
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
  if (!projectId) {
    return {
      permissionStatus: finalStatus,
      error: "No Expo projectId configured for push notifications.",
    };
  }

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
    trigger: null,
  });
}

export async function scheduleMoneyReceivedNotificationAsync(input: FinanceNotificationInput) {
  const currency = input.currency ?? "EUR";

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Argent reçu",
      body: `${formatCurrency(input.amount, currency)} recus de ${input.counterparty}.`,
      data: {
        accountId: input.accountId,
        amount: input.amount,
        counterparty: input.counterparty,
        currency,
        kind: "money_received",
        route: input.route ?? "/transactions",
        transactionId: input.transactionId,
      } satisfies BankNotificationData,
    },
    trigger: null,
  });
}

export async function scheduleCardDebitedNotificationAsync(input: FinanceNotificationInput) {
  const currency = input.currency ?? "EUR";

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Paiement carte",
      body: `${formatCurrency(input.amount, currency)} debites chez ${input.counterparty}.`,
      data: {
        accountId: input.accountId,
        amount: input.amount,
        counterparty: input.counterparty,
        currency,
        kind: "card_debited",
        route: input.route ?? "/transactions",
        transactionId: input.transactionId,
      } satisfies BankNotificationData,
    },
    trigger: null,
  });
}

export async function scheduleTransferSentNotificationAsync(input: FinanceNotificationInput) {
  const currency = input.currency ?? "EUR";

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Virement envoye",
      body: `${formatCurrency(input.amount, currency)} envoyes a ${input.counterparty}.`,
      data: {
        accountId: input.accountId,
        amount: input.amount,
        counterparty: input.counterparty,
        currency,
        kind: "transfer_sent",
        route: input.route ?? "/transferts",
        transactionId: input.transactionId,
      } satisfies BankNotificationData,
    },
    trigger: null,
  });
}

function getExpoProjectId() {
  return (
    process.env.EXPO_PUBLIC_EAS_PROJECT_ID ??
    Constants.easConfig?.projectId ??
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.expoConfig?.extra?.projectId
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
