export const dynamic = "force-static";
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceQuoteForm } from "@/components/shop/service-quote-form"
import { ChargerOnlyForm } from "@/components/ChargerOnlyForm"

import { Shield, Clock, Headphones, FileText } from "lucide-react"
import { smartCharger } from "@/lib/products"
import { absoluteUrl, buildPageMetadata, SITE_NAME } from "@/lib/seo"

export const metadata = {
  title: "Request a Quote | Ellenox  Smart EV Charger",
  description: "Get a personalised quote for a charger with professional installation.",
}

const serviceIncludes = [
  {
    icon: Shield,
    title: "Free Consultation",
    description: "Our expert will assess your needs and recommend the best solution",
  },
  {
    icon: Clock,
    title: "Quote Within 24 Hours",
    description: "Receive a detailed quote with all costs included no hidden fees",
  },
  {
    icon: FileText,
    title: "Professional Installation",
    description: "Certified electricians install and test the charging station",
  },
  {
    icon: Headphones,
    title: "Support & Warranty",
    description: "5-year warranty and free technical support after installation",
  },
]

const processSteps = [
  { step: 1, title: "Fill in the form", description: "Takes less than 2 minutes" },
  { step: 2, title: "Free consultation", description: "We call you within 24 hours" },
  { step: 3, title: "Receive your quote", description: "Clear pricing with no surprises" },
  { step: 4, title: "Installation", description: "On a date convenient for you" },
]
export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams?: Promise<{ option?: string }>
}) {
  const product = smartCharger

  const sp = await searchParams

  const option = sp?.option === "charger" ? "charger" : "installation"
  const isChargerOnly = option === "charger"
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${SITE_NAME} EV Charger Consultation and Quote`,
    serviceType: "EV charger sales and installation quote",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/shop/request-quote"),
      priceCurrency: "GBP",
      description: "Personalised quote based on product and installation requirements.",
    },
  }

  const total = isChargerOnly ? product.price : product.price + product.installationPrice

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {isChargerOnly ? "Request Smart EV Charger" : "Request Smart EV Charger with Installation"}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {isChargerOnly
                ? "Get a personalised quote for the charger only."
                : "Get a personalised quote for a complete solution - charger and professional installation"}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Left Column - Info */}
              <div className="lg:col-span-2">
                {/* Product Summary */}
                <div className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          11kW
                        </span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          Smart App
                        </span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          RFID
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Charging station</span>
                      <span className="font-medium">£{product.price}</span>
                    </div>

                    {!isChargerOnly && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Standard installation</span>
                        <span className="font-medium">from £{product.installationPrice}</span>
                      </div>
                    )}

                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary">
                        {isChargerOnly ? `£${total}` : `from £${total}`}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    {isChargerOnly
                      ? "* Charger-only request. Installation not included."
                      : "* Final price depends on installation complexity. You will receive an exact quote after consultation."}
                  </p>
                </div>

                {/* What's Included */}
                {!isChargerOnly && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold">What the Service Includes</h3>
    <div className="mt-4 space-y-4">
      {serviceIncludes.map((item) => (
        <div key={item.title} className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <item.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{!isChargerOnly && (
  <div className="mt-8 rounded-2xl bg-muted/50 p-6">
    <h3 className="font-semibold">How the Process Works</h3>
    <div className="mt-4 space-y-4">
      {processSteps.map((item) => (
        <div key={item.step} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {item.step}
          </span>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-3">
  {isChargerOnly ? <ChargerOnlyForm productName={product.name} price={product.price} /> : <ServiceQuoteForm />}
</div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
