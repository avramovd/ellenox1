import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

/**
 * Short-form lead endpoint for /shop/request-quote-new.
 *
 * Deliberately separate from /api/installation-request: that route requires the
 * full eight-field questionnaire (email, address, product, Wi-Fi, main fuse) and
 * would reject this three-field landing form with a 400. The existing route and
 * the page that uses it are left untouched.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json()

    const required = ["name", "postCode", "phone"] as const
    for (const k of required) {
      if (typeof data?.[k] !== "string" || !data[k].trim()) {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 })
      }
    }

    const name = String(data.name).trim().slice(0, 200)
    const postCode = String(data.postCode).trim().slice(0, 20)
    const phone = String(data.phone).trim().slice(0, 40)

    const host = process.env.EMAIL_HOST
    const port = Number(process.env.EMAIL_PORT || "587")
    const secure = process.env.EMAIL_SECURE === "true"
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS
    // ORDERS_TO_EMAIL is what the existing installation-request route reads, but
    // only SALES_TO_EMAIL is actually set in the environment; fall through both
    // before defaulting to the sending mailbox.
    const to = process.env.ORDERS_TO_EMAIL ?? process.env.SALES_TO_EMAIL ?? user

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ error: "Email env vars are missing" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    })

    await transporter.verify()

    const subject = `Installation Price Request — ${name} (${postCode})`
    const text = [
      `Name: ${name}`,
      `Post code: ${postCode}`,
      `Phone: ${phone}`,
      "",
      "Source: /shop/request-quote-new (Get Your Installation Price)",
    ].join("\n")

    await transporter.sendMail({
      from: `"Ellenox Quotes" <${user}>`,
      to,
      subject,
      text,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("QUOTE LEAD MAIL ERROR:", err)
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 })
  }
}
