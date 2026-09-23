import { smartCharger } from "@/lib/products"

/**
 * Constants for the /shop/request-quote-new landing page.
 * Kept in one place so copy, price and tracking identifiers cannot drift apart.
 */

/** Existing published number — matches the footer and the Organization schema in app/layout.tsx. */
export const CONTACT_PHONE_DISPLAY = "+44 20 8050 0852"
export const CONTACT_PHONE_HREF = "tel:+442080500852"

/**
 * Opening hours. Empty until the real hours are confirmed — the header hides the
 * line entirely while this is blank rather than showing invented times.
 * Set it to e.g. "Mon–Fri, 9am–5pm" once the business confirms.
 */
export const CONTACT_HOURS: string = ""

/**
 * Headline price, derived from the approved product data rather than hardcoded:
 * charger £495 + standard installation £404 = £899, which is what the mockup's
 * "From £899" refers to. If lib/products.ts changes, this follows automatically.
 */
export const INSTALLED_PRICE_FROM = smartCharger.price + smartCharger.installationPrice

/**
 * Genuine Ellenox Model 1 7.4 kW photo (ellenox-branded unit, RFID reader, green
 * LED ring, tethered Type 2 cable) — the same asset lib/products.ts uses as the
 * canonical Model 1 image. Replace only with another verified Model 1 shot.
 */
export const MODEL_1_IMAGE = "/product.webp"

/**
 * NICEIC "Approved Contractor" endorsement — OFF until two separate things are
 * confirmed. Do not enable one without the other:
 *
 *  1. That LIL Electrical LTD currently holds NICEIC Approved Contractor status.
 *     Their own site claims it, but a self-declaration is not verification —
 *     check the official NICEIC register at niceic.com/find-a-tradesperson and
 *     record the registration number.
 *  2. That Ellenox is permitted to display the NICEIC mark on its own site for a
 *     contractor it subcontracts to. NICEIC restricts its logo to the registered
 *     business; a third party using it is a distinct permission and usually needs
 *     NICEIC's sign-off.
 *
 * NICEIC is a protected certification mark, so an unverified badge on a page
 * running paid traffic is a real legal exposure, not a cosmetic gap. While this
 * is null the trust bar shows the installer name only.
 */
export const NICEIC_LOGO_SRC: string | null = null

/** Registration number to show beside the mark once verified (optional). */
export const NICEIC_REG_NUMBER: string | null = null

/** dataLayer identifiers for this page's lead conversion. */
export const QUOTE_LEAD_FORM_ID = "request-quote-new"
export const QUOTE_LEAD_PATH = "/shop/request-quote-new"
