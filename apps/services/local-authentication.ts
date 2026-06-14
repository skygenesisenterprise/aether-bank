import { Alert, Platform } from "react-native";

import {
  authenticateWithDeviceBiometrics,
  getMobileBiometricStatus,
} from "@/components/mobile/mobile-biometrics";

export interface LocalPaymentAuthenticationResult {
  success: boolean;
  method: "biometric" | "mock";
  error?: string;
}

function presentMockConfirmationAlert() {
  return new Promise<boolean>((resolve) => {
    Alert.alert(
      "Confirmation de paiement",
      "Confirmez ce paiement avec votre appareil.",
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => resolve(false),
        },
        {
          text: "Confirmer",
          onPress: () => resolve(true),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
}

export async function authenticatePaymentAuthorization(): Promise<LocalPaymentAuthenticationResult> {
  if (Platform.OS === "web") {
    const confirmed = await presentMockConfirmationAlert();

    return {
      success: confirmed,
      method: "mock",
      error: confirmed ? undefined : "Confirmation annulee.",
    };
  }

  try {
    const biometricStatus = await getMobileBiometricStatus();

    if (!biometricStatus.available) {
      const confirmed = await presentMockConfirmationAlert();

      return {
        success: confirmed,
        method: "mock",
        error: confirmed ? undefined : biometricStatus.reason ?? "Confirmation annulee.",
      };
    }

    const result = await authenticateWithDeviceBiometrics("Confirmez ce paiement avec votre appareil.");

    return {
      success: result.success,
      method: "biometric",
      error: result.error,
    };
  } catch {
    const confirmed = await presentMockConfirmationAlert();

    return {
      success: confirmed,
      method: "mock",
      error: confirmed ? undefined : "Confirmation annulee.",
    };
  }
}
