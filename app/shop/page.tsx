
import type React from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { smartCharger } from "@/lib/products"
import { ProductPricing } from "@/components/product/product-pricing"
import { absoluteUrl, buildPageMetadata, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Smart EV Charger | Ellenox ",
  description:
    "Explore the Ellenox  Smart EV Charger with app control, RFID, OCPP support, and dynamic load balancing for home charging.",
  path: "/shop",
  keywords: ["smart EV charger", "OCPP EV charger", "RFID EV charger", "home charger UK"],
})

export default function ShopPage() {
  const product = smartCharger
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
    },
    image: absoluteUrl(product.image),
    sku: product.id,
    category: "EV Charger",
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/shop"),
      priceCurrency: "GBP",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-linear-to-br from-background via-background to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Smart EV Charger
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{product.name}</h1>
                <p className="mt-4 text-xl text-muted-foreground">{product.tagline}</p>
                <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>

                <ProductPricing price={product.price} installationPrice={product.installationPrice} />

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" variant="outline" className="bg-transparent" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>

              </div>

              <div className="relative">
<div className="mx-auto mt-[3px] aspect-square w-1/2 lg:w-[400px] overflow-hidden rounded-3xl bg-transparent">                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-background p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">3 + 1 Year Warranty</p>
                      <p className="text-sm text-muted-foreground">Full protection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Features */}
        <section id="features" className="border-y border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Smart Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">More Than Just a Charger</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Ellenox  Smart EV Charger is a complete smart system for charging management
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
  {product.smartFeatures.map((feature, index, arr) => {
    const isLast = index === arr.length - 1

    return (
      <div
        key={feature.id}
        className={
          isLast
            ? "lg:col-span-2 flex justify-center"
            : ""
        }
      >
        <div
          className={
            isLast
              ? "w-full lg:max-w-[640px]"
              : "w-full"
          }
        >
          <div className="flex gap-6 rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <SmartFeatureIcon icon={feature.icon} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{feature.name}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  })}
</div>

          </div>
        </section>

        {/* Technical Specs & FAQ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Technical Specs Accordion */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Technical Specifications</h2>
                <p className="mt-2 text-muted-foreground">Detailed parameters of the charging station</p>
                <div className="mt-8">
                  <TechnicalSpecsAccordion specs={product.technicalSpecs} />
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Frequently Asked Questions</h2>
                <p className="mt-2 text-muted-foreground">Answers to the most common questions</p>
                <div className="mt-8">
                  <FAQAccordion faqs={product.faqs} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary py-16 text-primary-foreground md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready for Smart Charging?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Request a free consultation and get a personalised quote for a charger with professional installation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <Link href="/shop/request-quote">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/installation">Learn More About Installation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

// Icon components
import {
  PiggyBank,
  Moon,
  Smartphone,
  ShieldCheck,
  BadgeCheck,
  RefreshCw,
  KeyRound,
  Activity,
  PlugZap,
  Sun,
} from "lucide-react"

function BenefitIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    "piggy-bank": <PiggyBank className="h-6 w-6" />,
    moon: <Moon className="h-6 w-6" />,
    smartphone: <Smartphone className="h-6 w-6" />,
    "shield-check": <ShieldCheck className="h-6 w-6" />,
    "badge-check": <BadgeCheck className="h-6 w-6" />,
    "refresh-cw": <RefreshCw className="h-6 w-6" />,
  }
  return icons[icon] || <Check className="h-6 w-6" />
}

function SmartFeatureIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    smartphone: <Smartphone className="h-6 w-6" />,
    "key-round": <KeyRound className="h-6 w-6" />,
    activity: <Activity className="h-6 w-6" />,
    "plug-zap": <PlugZap className="h-6 w-6" />,
    sun: <Sun className="h-6 w-6" />,
  }
  return icons[icon] || <Check className="h-6 w-6" />
}


// Accordion components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { TechnicalSpec } from "@/lib/products"

function TechnicalSpecsAccordion({ specs }: { specs: TechnicalSpec[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {specs.map((category, index) => (
        <AccordionItem key={index} value={`spec-${index}`} className="border-border">
          <AccordionTrigger className="text-left hover:no-underline">{category.category}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {category.specs.map((spec, specIndex) => (
                <div key={specIndex} className="flex justify-between gap-4 rounded-lg bg-muted/50 px-4 py-3">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index}`} className="border-border">
          <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
