import { smartCharger } from "@/lib/products"

/**
 * Constants for the /shop/request-quote-new landing page.
 * Kept in one place so copy, price and tracking identifiers cannot drift apart.
 */

/** Existing published number — matches the footer and the Organization schema in app/layout.tsx. */
export const CONTACT_PHONE_DISPLAY = "+44 20 8050 0852"
export const CONTACT_PHONE_HREF = "tel:+442080500852"

/**
 * Opening hours, confirmed by the business 2026-09-26. The header hides the line
 * entirely if this is ever blanked out, rather than showing invented times.
 */
export const CONTACT_HOURS: string = "Mon – Fri 8am – 6pm"

/**
 * Service area shown under the headline price. Confirmed by the business
 * 2026-09-26 — keep it in sync with wherever else coverage is advertised.
 */
export const SERVICE_AREA = "Covering Surrey and South West London"

/** The subcontracted installer named in the trust row. */
export const INSTALLER_NAME = "LIL Electrical"

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

/** Strapline shown beside the logo in the header, as in the approved design. */
export const TAGLINE = "Smarter charging for a cleaner tomorrow"

/**
 * Hero shot: the real Ellenox Model 1 on a house wall, which is what the design
 * calls for. It is a composite — the site's wall-mount render with its generic
 * unit cloned out and the Model 1 cut-out from product.webp dropped in — because
 * no photograph of an actual Ellenox install exists yet. Replace it with a real
 * one when there is one — see scripts/build-hero-images.mjs.
 */
export const HERO_INSTALL_IMAGE = "/hero-ellenox-install.webp"

/**
 * Same composite, framed for the desktop hero panel: the form card covers the
 * panel from roughly a third of its width, so this crop keeps the unit inside
 * the strip that stays visible beside the card.
 */
export const HERO_INSTALL_PANEL_IMAGE = "/hero-ellenox-install-panel.webp"

/**
 * NICEIC "Approved Contractor" endorsement.
 *
 * Entitlement to display the mark was confirmed by the business on 2026-09-26,
 * so the claim itself now renders in the trust row. NICEIC is a protected
 * certification mark: if that confirmation is ever withdrawn, blank
 * NICEIC_CLAIM_CONFIRMED and the whole badge disappears again.
 */
export const NICEIC_CLAIM_CONFIRMED = true

/**
 * NICEIC Approved Contractor artwork.
 *
 * INTERIM ASSET: recovered from the approved design mockup, which is only 687px
 * wide, so the source for this mark was 79x43px. It is legible but soft and will
 * not hold up on a high-DPI screen. Replace it with the official artwork NICEIC
 * issues to registered contractors — same path, no code change needed.
 */
export const NICEIC_LOGO_SRC: string | null = "/niceic-approved-contractor.webp"

/** Registration number to show beside the mark (optional). */
export const NICEIC_REG_NUMBER: string | null = null

/** dataLayer identifiers for this page's lead conversion. */
export const QUOTE_LEAD_FORM_ID = "request-quote-new"
export const QUOTE_LEAD_PATH = "/shop/request-quote-new"
