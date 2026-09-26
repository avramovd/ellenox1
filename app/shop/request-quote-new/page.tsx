import Image from "next/image"
import { Footer } from "@/components/layout/footer"
import { QuoteLeadForm } from "@/components/shop/quote-lead-form"
import { QuoteLeadHeader } from "@/components/shop/quote-lead-header"
import { ArrowRight, Check, House, ShieldCheck, Smartphone, Sun, Zap } from "lucide-react"
import { smartCharger } from "@/lib/products"
import {
  HERO_INSTALL_IMAGE,
  HERO_INSTALL_PANEL_IMAGE,
  INSTALLED_PRICE_FROM,
  INSTALLER_NAME,
  MODEL_1_IMAGE,
  NICEIC_CLAIM_CONFIRMED,
  NICEIC_LOGO_SRC,
  NICEIC_REG_NUMBER,
  SERVICE_AREA,
} from "@/lib/quote-lead"
import { absoluteUrl, SITE_NAME } from "@/lib/seo"

export const metadata = {
  // The root layout applies the `%s | Ellenox` template, so no suffix here.
  title: "Get a Smart EV Charger Installed",
  description:
    "Free, no-obligation quote for a professionally installed Ellenox Model 1 7.4 kW smart EV charger. Smart app control, solar compatible, 4 year warranty.",
  alternates: { canonical: absoluteUrl("/shop/request-quote-new") },
  // Paid-traffic landing page that intentionally overlaps with /shop/request-quote.
  // noindex keeps it out of organic results so the two pages do not compete;
  // Google Ads does not require a page to be indexed. Flip to index when the
  // page is meant to rank on its own.
  robots: { index: false, follow: true },
}

const heroBenefits = [
  "Smart app control",
  "Solar compatible",
  "Dynamic charging",
  "4 year warranty",
  "Free, no-obligation quote",
]

const featureRow = [
  { icon: Zap, title: "Fast & Efficient", subtitle: "Reliable home charging" },
  { icon: Smartphone, title: "Smart Control", subtitle: "Manage from anywhere" },
  { icon: Sun, title: "Solar Compatible", subtitle: "Use your own solar energy" },
  { icon: ShieldCheck, title: "4 Year Warranty", subtitle: "Peace of mind" },
]

const howItWorks = [
  {
    title: "Request a quote",
    description: "Fill in the short form with your details.",
  },
  {
    title: "We'll be in touch",
    description:
      "Our team will contact you within 48 hours to confirm your requirements and provide a personalised quote.",
  },
  {
    title: "Professional installation",
    description: "Our certified electricians install and test your charger at a time that suits you.",
  },
]

const smartChargingPoints = [
  "Control and monitor your charging via the app",
  "Schedule charging to take advantage of off-peak rates",
  "Compatible with all major electric vehicles",
  "Sleek, compact design for any home",
  "Built for safety, reliability and everyday use",
]

/** Green disc with a white tick — the bullet marker used throughout the design. */
function TickBullet() {
  return (
    <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-primary">
      <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} aria-hidden="true" />
    </span>
  )
}

export default function RequestQuoteNewPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: smartCharger.name,
    description: smartCharger.description,
    image: absoluteUrl(MODEL_1_IMAGE),
    brand: { "@type": "Brand", name: SITE_NAME.trim() },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/shop/request-quote-new"),
      priceCurrency: "GBP",
      price: INSTALLED_PRICE_FROM,
      availability: "https://schema.org/InStock",
      description: "Charger supplied and professionally installed.",
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <QuoteLeadHeader />

      <main className="flex flex-1 flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        {/* ---------- Hero ---------- */}
        {/* Light left column, install photo filling the right of the viewport, and
            the form card sitting over the photo — the layout from the design.
            Below lg the photo becomes a band between the price and the form so the
            product is still seen without pushing the form off the first screen. */}
        <section className="relative overflow-hidden bg-background">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[46%] lg:block xl:w-[45%]"
          >
            <Image
              src={HERO_INSTALL_PANEL_IMAGE}
              alt=""
              fill
              priority
              sizes="46vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-x-10 lg:gap-y-8 lg:py-14 xl:gap-x-14">
              {/* Headline block — left column, first row on desktop. The width cap
                  reproduces the design's line breaks; without it the headline
                  runs the full column and sets on two very different lines. */}
              <div className="max-w-[36rem] lg:col-start-1 lg:row-start-1">
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-primary sm:text-[0.8125rem]">
                  Home EV Charger Installation
                </p>
                <h1 className="mt-3 text-[2.15rem] font-extrabold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.15rem]">
                  Get a Smart EV Charger Installed
                </h1>
                <p className="mt-1 text-[2.15rem] font-extrabold leading-[1.07] tracking-tight text-primary sm:text-5xl lg:text-[3.15rem]">
                  From £{INSTALLED_PRICE_FROM}
                </p>
                <p className="mt-4 text-base sm:text-lg">{SERVICE_AREA}</p>
                <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                  Ellenox Model 1 with standard home installation by certified electricians. Safe.
                  Reliable. Professional.
                </p>
              </div>

              {/* Photo band — mobile and tablet only */}
              <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72 lg:hidden">
                <Image
                  src={HERO_INSTALL_IMAGE}
                  alt="Ellenox Model 1 smart EV charger installed on the wall of a house"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[42%_38%]"
                />
              </div>

              {/* Form — right column, spanning both rows on desktop */}
              <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
                <QuoteLeadForm />
              </div>

              {/* Benefits and installer trust row — left column, second row */}
              <div className="lg:col-start-1 lg:row-start-2">
                <ul className="space-y-3">
                  {heroBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[0.95rem] sm:text-base">
                      <TickBullet />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Every claim here is switched from lib/quote-lead.ts. The NICEIC
                    mark is a protected certification mark, so it renders only
                    while NICEIC_CLAIM_CONFIRMED is true. */}
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 sm:gap-x-7">
                  {NICEIC_CLAIM_CONFIRMED && NICEIC_LOGO_SRC && (
                    <>
                      <div className="flex items-center gap-3">
                        <Image
                          src={NICEIC_LOGO_SRC}
                          alt="NICEIC Approved Contractor"
                          width={316}
                          height={172}
                          className="h-14 w-auto object-contain"
                        />
                        {NICEIC_REG_NUMBER && (
                          <span className="text-xs text-muted-foreground">Reg. {NICEIC_REG_NUMBER}</span>
                        )}
                      </div>
                      <span aria-hidden="true" className="hidden h-11 w-px bg-border sm:block" />
                    </>
                  )}

                  <div className="flex items-center gap-2.5">
                    <House className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.6} aria-hidden="true" />
                    <p className="text-sm font-medium leading-tight">
                      Domestic
                      <br />
                      EV Installer
                    </p>
                  </div>

                  <span aria-hidden="true" className="hidden h-11 w-px bg-border sm:block" />

                  <div className="flex items-center gap-2.5">
                    <ShieldCheck
                      className="h-8 w-8 shrink-0 text-primary"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium leading-tight">
                      Fully insured
                      <br />
                      and certified
                    </p>
                  </div>
                </div>

                {/* Named installer. Not in the mockup, but it was an explicit
                    requirement and it was already published on this page. */}
                <p className="mt-3 text-xs text-muted-foreground">
                  Installed by <span className="font-semibold text-foreground">{INSTALLER_NAME}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Feature row ---------- */}
        <section className="border-y border-border bg-primary/[0.04]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {featureRow.map((feature, index) => (
                <div
                  key={feature.title}
                  className={[
                    "flex items-center gap-4 px-2 py-6 sm:px-6 lg:px-5",
                    // Rules between columns only — never before the first item in a row.
                    index > 0 ? "border-t border-border sm:border-t-0" : "",
                    index % 2 === 1 ? "sm:border-l sm:border-border" : "",
                    index >= 2 ? "sm:border-t sm:border-border lg:border-t-0" : "",
                    index > 0 ? "lg:border-l lg:border-border" : "",
                  ].join(" ")}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-inset ring-primary/15">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-tight">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How It Works ---------- */}
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-[2.5rem]">How It Works</h2>
            <p className="mt-3 text-muted-foreground sm:text-lg">
              Getting your EV charger installed is simple.
            </p>

            {/* The arrows are siblings of the steps rather than children, so the
                three columns keep equal width and their headings line up. */}
            {/* Stays stacked until lg: at tablet widths three columns squeeze
                step 2 into six wrapped lines. */}
            <ol className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
              {howItWorks.map((step, index) => (
                <li key={step.title} className="contents">
                  <div className="flex flex-1 items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div className="min-w-0 pt-1.5">
                      <h3 className="font-bold leading-tight">{step.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < howItWorks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex shrink-0 justify-center text-muted-foreground lg:px-6 lg:pt-2.5 xl:px-8"
                    >
                      <ArrowRight className="h-7 w-7 rotate-90 lg:rotate-0" strokeWidth={1.5} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Smart charging for everyday life ---------- */}
        {/* App photo bleeds off the left edge, copy in the middle, and the Model 1
            cropped against the right edge — the three-part band from the design. */}
        <section className="border-t border-border">
          <div className="grid lg:grid-cols-[36%_minmax(0,1fr)_12%]">
            <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[28rem]">
              <Image
                src="/ev-charger-app-smartphone-display.webp"
                alt="The Ellenox app showing a live charging session"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="px-4 py-12 sm:px-6 lg:px-12 lg:py-16 xl:px-16">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-primary sm:text-[0.8125rem]">
                The Ellenox Model 1
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-[2rem]">
                Smart Charging for Everyday Life
              </h2>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                The Ellenox Model 1 gives you fast, reliable charging at home, with smart features to
                make it simple.
              </p>

              <ul className="mt-7 space-y-3.5">
                {smartChargingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[0.95rem] sm:text-base">
                    <TickBullet />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src="/model-1-wall-detail.webp"
                alt="Ellenox Model 1 mounted on a wall"
                fill
                sizes="12vw"
                className="object-cover object-left"
              />
            </div>
          </div>
        </section>
      </main>

      {/* The mockup shows a slim landing footer, but this page uses the shared
          site footer so it matches every other page. */}
      <Footer />
    </div>
  )
}
