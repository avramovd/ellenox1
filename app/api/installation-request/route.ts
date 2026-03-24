import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('Received Webhook POST request', data);
    if (!data?.gdprConsent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 })
    }

    const required = [
      "name",
      "email",
      "phone",
      "postCode",
      "fullAddress",
      "productInterest",
      "wifiSignalConfirmed",
      "mainFuse",
    ]

    console.log('Line 23 of the Webhook POST request', required);
    for (const k of required) {
      if (!data?.[k]) {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 })
      }
    }

    const host = process.env.EMAIL_HOST
    const port = Number(process.env.EMAIL_PORT || "587")
    const secure = port === 465
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS
    const to = process.env.ORDERS_TO_EMAIL ?? user

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ error: "Email env vars are missing" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })


    const subject = `Installation Request — ${data.name} (${data.postCode})`
    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Post code: ${data.postCode}`,
      `Address: ${data.fullAddress}`,
      `Product: ${data.productInterest}`,
      `WiFi confirmed: ${data.wifiSignalConfirmed}`,
      `Main fuse: ${data.mainFuse}`,
      `Message: ${data.message || "-"}`,
    ].join("\n")

    await transporter.sendMail({
      from: `"Ellenox Quotes" <${user}>`,
      to,
      replyTo: data.email,
      subject,
      text,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("MAIL ERROR:", err)
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    )
  }
}