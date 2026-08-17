import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getMailer } from "@/lib/mailer";
import {
  PAYMENT_TYPE_WALLET_TOPUP,
  WALLET_PRODUCT_NAME,
  collectMetadata,
  getWalletUserReference,
  resolvePaymentType,
} from "@/lib/payments";

export const runtime = "nodejs";

/** Fallback for shop orders that were created without a productName in metadata. */
async function getLineItemName(stripe: Stripe, sessionId: string) {
  try {
    const items = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 1,
    });
    return items.data[0]?.description ?? null;
  } catch (err) {
    console.error(
      "LINE ITEMS FETCH FAILED:",
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}

export async function POST(req: Request) {
  console.log("WEBHOOK HIT");

  const sig = req.headers.get("stripe-signature");
  console.log("SIGNATURE EXISTS:", !!sig);

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  console.log("WEBHOOK SECRET EXISTS:", !!secret);

  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const rawBody = Buffer.from(await req.arrayBuffer());

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
    console.log("EVENT TYPE:", event.type);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("WEBHOOK CONSTRUCT ERROR:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    console.log("IGNORED EVENT:", event.type);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("SESSION ID:", session.id);
    console.log("PAYMENT STATUS:", session.payment_status);

    if (session.payment_status !== "paid") {
      console.log("SESSION NOT PAID");
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const m = await collectMetadata(stripe, session);
    const paymentType = resolvePaymentType(m);
    const isWalletTopUp = paymentType === PAYMENT_TYPE_WALLET_TOPUP;
    console.log("PAYMENT TYPE:", paymentType);

    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? null;

    const amount =
      typeof session.amount_total === "number"
        ? (session.amount_total / 100).toFixed(2)
        : "n/a";

    const currency = (session.currency || "").toUpperCase();

    console.log("ENV CHECK", {
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_SECURE: process.env.EMAIL_SECURE,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS_SET: !!process.env.EMAIL_PASS,
      SALES_TO_EMAIL: process.env.SALES_TO_EMAIL,
    });

    const toInternal = process.env.SALES_TO_EMAIL || "sales@ellenox.uk";
    const fromEmail = process.env.EMAIL_USER || "quotes@ellenox.uk";

    const transporter = getMailer();

    await transporter.verify();
    console.log("SMTP VERIFY OK");

    const resolvedProductName = isWalletTopUp
      ? WALLET_PRODUCT_NAME
      : m.productName || (await getLineItemName(stripe, session.id));

    const productName = resolvedProductName ?? "-";

    const walletUser = getWalletUserReference(m);

    const internalMail = isWalletTopUp
      ? {
          subject: `✅ PAID wallet top-up (${currency} ${amount})`,
          text:
            `Payment: PAID ✅\n` +
            `Type: Wallet top-up\n` +
            `Session: ${session.id}\n` +
            `Customer email: ${customerEmail ?? "-"}\n` +
            `Amount: ${currency} ${amount}\n\n` +
            `--- Top-up data ---\n` +
            `Product: ${productName}\n` +
            `Wallet user: ${walletUser ?? "-"}\n` +
            `Name: ${m.name ?? "-"}\n` +
            `Email: ${m.email ?? customerEmail ?? "-"}\n` +
            `Phone: ${m.phone ?? "-"}\n`,
        }
      : {
          subject: `✅ PAID order (${currency} ${amount})`,
          text:
            `Payment: PAID ✅\n` +
            `Type: Shop order\n` +
            `Session: ${session.id}\n` +
            `Customer email: ${customerEmail ?? "-"}\n` +
            `Amount: ${currency} ${amount}\n\n` +
            `--- Form data ---\n` +
            `Product: ${productName}\n` +
            `Variant: ${m.variant ?? "-"}\n` +
            `Quantity: ${m.quantity ?? "-"}\n` +
            `Name: ${m.name ?? "-"}\n` +
            `Phone: ${m.phone ?? "-"}\n` +
            `Email: ${m.email ?? customerEmail ?? "-"}\n` +
            `Address: ${m.address ?? "-"}\n` +
            `Notes: ${m.notes ?? "-"}\n`,
        };

    const info1 = await transporter.sendMail({
      from: `"Ellenox ${isWalletTopUp ? "Wallet" : "Orders"}" <${fromEmail}>`,
      to: toInternal,
      subject: internalMail.subject,
      text: internalMail.text,
    });

    console.log("INTERNAL EMAIL SENT:", info1.messageId);

    if (customerEmail) {
      const customerMail = isWalletTopUp
        ? {
            subject: "Your Ellenox wallet has been topped up",
            text:
              `Hi${m.name ? ` ${m.name}` : ""},\n\n` +
              `Thanks for your payment. Your wallet balance has been topped up successfully.\n\n` +
              `Top-up summary:\n` +
              `• ${productName}\n` +
              `• Amount paid: ${currency} ${amount}\n` +
              `• Reference: ${session.id}\n\n` +
              `The credit is available in the Ellenox app and can be used at any public charge point.\n\n` +
              `Best regards,\nEllenox Team`,
          }
        : {
            subject: "Thanks — we received your order",
            text:
              `Hi${m.name ? ` ${m.name}` : ""},\n\n` +
              `Thanks for your payment. We’ve received your order successfully.\n\n` +
              `Order summary:\n` +
              `• ${resolvedProductName ?? "Your order"}${m.quantity ? ` (x${m.quantity})` : ""}\n` +
              (m.variant ? `• Option: ${m.variant}\n` : "") +
              `• Amount paid: ${currency} ${amount}\n` +
              `• Reference: ${session.id}\n\n` +
              `Best regards,\nEllenox Team`,
          };

      const info2 = await transporter.sendMail({
        from: `"Ellenox" <${fromEmail}>`,
        to: customerEmail,
        subject: customerMail.subject,
        text: customerMail.text,
      });

      console.log("CUSTOMER EMAIL SENT:", info2.messageId);
    } else {
      console.log("NO CUSTOMER EMAIL");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("WEBHOOK MAIL ERROR:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}