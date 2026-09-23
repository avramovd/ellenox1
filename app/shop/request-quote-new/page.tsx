import Image from "next/image"
import { Footer } from "@/components/layout/footer"
import { QuoteLeadForm } from "@/components/shop/quote-lead-form"
import { QuoteLeadHeader } from "@/components/shop/quote-lead-header"
import {
  Activity,
  BadgeCheck,
  Check,
  ClipboardList,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sun,
  Wrench,
  Zap,
} from "lucide-react"
import { smartCharger } from "@/lib/products"
import {
  INSTALLED_PRICE_FROM,
  MODEL_1_IMAGE,
  NICEIC_LOGO_SRC,
  NICEIC_REG_NUMBER,
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

const keyBenefits = [
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "7.4 kW single-phase charging adds far more range per hour than a standard 3-pin plug.",
  },
  {
    icon: Smartphone,
    title: "Smart Control",
    description: "Start, stop, schedule and monitor every session from the Ellenox app, wherever you are.",
  },
  {
    icon: Sun,
    title: "Solar Compatible",
    description: "Charge from your own generation when paired with a compatible energy system and CT clamp.",
  },
  {
    icon: ShieldCheck,
    title: "4 Year Warranty",
    description: "Four years of cover as standard, backed by UK-based technical support after installation.",
  },
]

const howItWorks = [
  {
    icon: ClipboardList,
    title: "Request a quote",
    description: "Send us your name, postcode and phone number. It takes less than a minute.",
  },
  {
    icon: PhoneCall,
    title: "We'll be in touch",
    description: "We confirm the details of your property and give you a clear, all-in installation price.",
  },
  {
    icon: Wrench,
    title: "Professional installation",
    description: "A qualified electrician installs, tests and commissions your charger, typically in one visit.",
  },
]

const featureIcons: Record<string, typeof Zap> = {
  smartphone: Smartphone,
  "key-round": BadgeCheck,
  sun: Sun,
  activity: Activity,
  "plug-zap": Zap,
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

      {/* `order` utilities give mobile the lead-first sequence (headline, price,
          form, then How It Works) while desktop keeps the trust bar and benefits
          above How It Works. */}
      <main className="flex flex-1 flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        {/* ---------- Hero ---------- */}
        <section className="order-1 bg-muted/30 py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
              {/* Headline + price — row 1, left column on desktop */}
              <div className="lg:col-start-1 lg:row-start-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
                  Home EV Charger Installation
                </p>
                <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                  Get a Smart EV Charger Installed
                </h1>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                    From £{INSTALLED_PRICE_FROM}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">fully installed</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Charger and standard installation included.
                </p>
              </div>

              {/* Form — right column, spanning both rows on desktop */}
              <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <QuoteLeadForm />
              </div>

              {/* Description, benefits and the product photo — row 2, left column */}
              <div className="lg:col-start-1 lg:row-start-2">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="mx-auto w-48 shrink-0 rounded-2xl bg-gradient-to-b from-background to-muted/60 p-4 ring-1 ring-border/60 sm:mx-0 sm:w-56">
                    <Image
                      src={MODEL_1_IMAGE}
                      alt="Ellenox Smart EV Charger Model 1 7.4 kW with tethered Type 2 cable"
                      width={440}
                      height={640}
                      className="h-auto w-full object-contain"
                      priority
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-bold">Ellenox Model 1 — 7.4 kW</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      A premium smart charging station with full app connectivity, dynamic load balancing and
                      OCPP compatibility — designed for everyday home charging, indoors or out.
                    </p>

                    <ul className="mt-5 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                      {heroBenefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5 text-sm font-medium">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
                            <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Installer trust bar ---------- */}
        <section className="order-3 border-y border-border bg-background py-6 lg:order-2">
          <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:gap-8">
            <p className="text-sm font-medium text-muted-foreground">
              Installed by <span className="font-semibold text-foreground">LIL Electrical</span>
            </p>

            {/* The NICEIC mark renders only once entitlement is verified — see
                NICEIC_LOGO_SRC in lib/quote-lead.ts. Nothing is shown until then,
                deliberately: an unverified certification claim is worse than a
                missing one. */}
            {NICEIC_LOGO_SRC && (
              <div className="flex items-center gap-3">
                <Image
                  src={NICEIC_LOGO_SRC}
                  alt="NICEIC Approved Contractor"
                  width={200}
                  height={80}
                  className="h-14 w-auto object-contain"
                />
                {NICEIC_REG_NUMBER && (
                  <span className="text-xs text-muted-foreground">Reg. {NICEIC_REG_NUMBER}</span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ---------- Four key benefits ---------- */}
        <section className="order-4 py-12 md:py-16 lg:order-3">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {keyBenefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How It Works ---------- */}
        <section className="order-2 bg-muted/30 py-12 md:py-16 lg:order-4">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How It Works</h2>
              <p className="mt-3 text-muted-foreground">Three simple steps from enquiry to a working charger.</p>
            </div>

            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {howItWorks.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Smart charging for everyday life ---------- */}
        <section className="order-5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <Image
                  src="/ev-charger-app-smartphone-display.webp"
                  alt="Ellenox app showing live charging status on a smartphone"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Smart Charging for Everyday Life</h2>
                <p className="mt-3 text-muted-foreground">
                  Everything the Ellenox Model 1 does once it is on your wall.
                </p>

                <div className="mt-8 space-y-6">
                  {smartCharger.smartFeatures.map((feature) => {
                    const Icon = featureIcons[feature.icon] ?? Zap
                    return (
                      <div key={feature.id} className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-medium">{feature.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
