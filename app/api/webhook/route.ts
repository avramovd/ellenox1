// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getMailer } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const rawBody = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // ignore everything else fast
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // ---- from here: only checkout.session.completed ----
  try {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const m = session.metadata ?? {};
    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? null;

    const amount =
      typeof session.amount_total === "number"
        ? (session.amount_total / 100).toFixed(2)
        : "n/a";

    const currency = (session.currency || "").toUpperCase();

    // ENV sanity
    console.log("ENV CHECK", {
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_SECURE: process.env.EMAIL_SECURE,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS_SET: !!process.env.EMAIL_PASS,
      ORDERS_TO_EMAIL: process.env.ORDERS_TO_EMAIL,
    });

    const toInternal = process.env.ORDERS_TO_EMAIL || "quotes@ellenox.uk";
    const fromEmail = process.env.EMAIL_USER || "quotes@ellenox.uk";

    const transporter = getMailer();

    // ✅ this will immediately tell you SMTP connection/auth issues
    await transporter.verify();

    const info1 = await transporter.sendMail({
      from: `"Ellenox Orders" <${fromEmail}>`,
      to: toInternal,
      subject: `✅ PAID order (${currency} ${amount})`,
      text:
        `Payment: PAID ✅\n` +
        `Session: ${session.id}\n` +
        `Customer email: ${customerEmail ?? "-"}\n` +
        `Amount: ${currency} ${amount}\n\n` +
        `--- Form data ---\n` +
        `Product: ${m.productName ?? "-"}\n` +
        `Variant: ${m.variant ?? "-"}\n` +
        `Quantity: ${m.quantity ?? "-"}\n` +
        `Name: ${m.name ?? "-"}\n` +
        `Phone: ${m.phone ?? "-"}\n` +
        `Email: ${m.email ?? customerEmail ?? "-"}\n` +
        `Address: ${m.address ?? "-"}\n` +
        `Notes: ${m.notes ?? "-"}\n`,
    });

    if (customerEmail) {
      const info2 = await transporter.sendMail({
        from: `"Ellenox" <${fromEmail}>`,
        to: customerEmail,
        subject: "Thanks — we received your order",
        text:
          `Hi${m.name ? ` ${m.name}` : ""},\n\n` +
          `Thanks for your payment. We’ve received your order successfully.\n\n` +
          `Order summary:\n` +
          `• Item: ${m.productName ?? "Product"}${m.quantity ? ` (x${m.quantity})` : ""}\n` +
          (m.variant ? `• Option: ${m.variant}\n` : "") +
          `• Amount paid: ${currency} ${amount}\n` +
          `• Reference: ${session.id}\n\n` +
          `Best regards,\nEllenox Team`,
      });
      
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
