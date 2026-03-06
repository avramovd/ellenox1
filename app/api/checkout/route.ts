// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.json();

    const {
      name,
      email,
      phone,
      fullAddress,
      quantity,
      deliveryNotes,
      productName,
    } = body ?? {};

    const qtyNum = Number(quantity);

    if (!email || !Number.isFinite(qtyNum) || qtyNum < 1 || qtyNum > 10) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const variant = String(body?.variant ?? "");

const priceId =
  variant === "with_installation"
    ? process.env.STRIPE_PRICE_WITH_INSTALLATION
    : variant === "charger_only"
    ? process.env.STRIPE_PRICE_CHARGER_ONLY
    : null;

if (!priceId) {
  return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
}

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

    const orderId = `ORD-${Date.now()}`;

const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{ price: priceId, quantity: qtyNum }],
  customer_email: email,
  client_reference_id: orderId,

  success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${appUrl}/cancel`,

  metadata: {
    orderId,
    productName: String(productName ?? "EV Charger"),
    variant: String(variant ?? ""),
    quantity: String(qtyNum),
    name: String(name ?? ""),
    email: String(email ?? ""),
    phone: String(phone ?? ""),
    address: String(fullAddress ?? ""),
    notes: String(deliveryNotes ?? ""),
  },
});

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Checkout error" },
      { status: 500 }
    );
  }
}
