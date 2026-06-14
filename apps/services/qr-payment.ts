export interface ParsedQrPaymentRequest {
  merchantName: string;
  merchantCity?: string;
  amountMinor: number;
  currency: "EUR" | "USD";
  label: string;
  reference: string;
  rawValue: string;
}

function parseAmountMinor(value: string) {
  const normalizedValue = value.replace(",", ".").trim();
  const numericValue = Number.parseFloat(normalizedValue);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null;
  }

  return Math.round(numericValue * 100);
}

function buildFallbackPayment(rawValue: string): ParsedQrPaymentRequest {
  const normalizedValue = rawValue.toLowerCase();

  if (normalizedValue.includes("coffee") || normalizedValue.includes("cafe")) {
    return {
      merchantName: "Cafe Aether",
      merchantCity: "Paris",
      amountMinor: 680,
      currency: "EUR",
      label: "Pause cafe",
      reference: "ATH-QR-CAFE-001",
      rawValue,
    };
  }

  if (normalizedValue.includes("uber") || normalizedValue.includes("taxi")) {
    return {
      merchantName: "Aether Ride",
      merchantCity: "Bruxelles",
      amountMinor: 2490,
      currency: "EUR",
      label: "Mobilite",
      reference: "ATH-QR-RIDE-019",
      rawValue,
    };
  }

  if (normalizedValue.includes("aws") || normalizedValue.includes("cloud")) {
    return {
      merchantName: "AWS Europe",
      merchantCity: "Dublin",
      amountMinor: 84200,
      currency: "EUR",
      label: "Infrastructure cloud",
      reference: "ATH-QR-AWS-447",
      rawValue,
    };
  }

  return {
    merchantName: "Aether Merchant",
    merchantCity: "Paris",
    amountMinor: 5299,
    currency: "EUR",
    label: "Paiement QR",
    reference: "ATH-QR-DEFAULT-101",
    rawValue,
  };
}

export function parseQrPaymentPayload(rawValue: string): ParsedQrPaymentRequest {
  const trimmedValue = rawValue.trim();

  try {
    const parsedObject = JSON.parse(trimmedValue) as Partial<ParsedQrPaymentRequest> & {
      amount?: string | number;
    };

    const amountMinor = typeof parsedObject.amountMinor === "number"
      ? parsedObject.amountMinor
      : typeof parsedObject.amount === "number"
        ? Math.round(parsedObject.amount * 100)
        : typeof parsedObject.amount === "string"
          ? parseAmountMinor(parsedObject.amount)
          : null;

    if (parsedObject.merchantName && amountMinor) {
      return {
        merchantName: parsedObject.merchantName,
        merchantCity: parsedObject.merchantCity,
        amountMinor,
        currency: parsedObject.currency === "USD" ? "USD" : "EUR",
        label: parsedObject.label ?? "Paiement QR",
        reference: parsedObject.reference ?? "ATH-QR-JSON-001",
        rawValue,
      };
    }
  } catch {
    // Fallback to lightweight key/value parsing below.
  }

  const searchParams = new URLSearchParams(trimmedValue.replace(/^aetherpay:\/*/i, ""));
  const merchantName = searchParams.get("merchant");
  const amountValue = searchParams.get("amount");
  const amountMinor = amountValue ? parseAmountMinor(amountValue) : null;

  if (merchantName && amountMinor) {
    return {
      merchantName,
      merchantCity: searchParams.get("city") ?? undefined,
      amountMinor,
      currency: searchParams.get("currency") === "USD" ? "USD" : "EUR",
      label: searchParams.get("label") ?? "Paiement QR",
      reference: searchParams.get("reference") ?? "ATH-QR-URL-001",
      rawValue,
    };
  }

  return buildFallbackPayment(rawValue);
}
