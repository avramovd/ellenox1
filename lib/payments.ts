import type Stripe from "stripe";

export const PAYMENT_TYPE_SHOP_ORDER = "shop_order";
export const PAYMENT_TYPE_WALLET_TOPUP = "wallet_topup";

export type PaymentType =
  | typeof PAYMENT_TYPE_SHOP_ORDER
  | typeof PAYMENT_TYPE_WALLET_TOPUP;

export const WALLET_PRODUCT_NAME = "Public charge user wallet";

type Meta = Record<string, string | undefined>;

// The wallet top-up sessions are created by the public-charging backend, not by
// this site, so we accept a few spellings of the metadata key instead of one.
const TYPE_KEYS = ["paymentType", "payment_type", "type", "kind", "purpose"];

const WALLET_PATTERN = /wallet|top[\s_-]?up|balance|credit/i;
const SHOP_PATTERN = /shop|order|product|checkout/i;

/**
 * Decides what the customer actually paid for.
 *
 * Priority:
 *  1. explicit payment type in metadata (`paymentType: shop_order | wallet_topup`)
 *  2. presence of shop-order metadata (productName / variant / orderId)
 *  3. otherwise it is a wallet top-up — every order created by this site is
 *     tagged in step 1, so an untagged payment does not come from the shop.
 */
export function resolvePaymentType(metadata: Meta): PaymentType {
  for (const key of TYPE_KEYS) {
    const raw = metadata[key];
    if (!raw) continue;

    if (WALLET_PATTERN.test(raw)) return PAYMENT_TYPE_WALLET_TOPUP;
    if (SHOP_PATTERN.test(raw)) return PAYMENT_TYPE_SHOP_ORDER;
  }

  if (metadata.productName || metadata.variant || metadata.orderId) {
    return PAYMENT_TYPE_SHOP_ORDER;
  }

  return PAYMENT_TYPE_WALLET_TOPUP;
}

/**
 * Metadata can sit on the session or on the payment intent, depending on who
 * created the payment. Merge both, session wins.
 */
export async function collectMetadata(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<Meta> {
  const sessionMeta: Meta = { ...(session.metadata ?? {}) };

  if (Object.keys(sessionMeta).length > 0) return sessionMeta;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  if (!paymentIntentId) return sessionMeta;

  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return { ...(intent.metadata ?? {}), ...sessionMeta };
  } catch (err) {
    console.error(
      "PAYMENT INTENT METADATA FETCH FAILED:",
      err instanceof Error ? err.message : String(err)
    );
    return sessionMeta;
  }
}

export function getWalletUserReference(metadata: Meta): string | null {
  const keys = [
    "walletUserId",
    "wallet_user_id",
    "walletId",
    "wallet_id",
    "userId",
    "user_id",
    "accountId",
    "account_id",
    "driverId",
  ];

  for (const key of keys) {
    const value = metadata[key];
    if (value) return value;
  }

  return null;
}
