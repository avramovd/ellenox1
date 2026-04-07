import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { InstallerLocator } from "@/components/installation/installer-locator"
import { Button } from "@/components/ui/button"
import { FileText, Download, CheckCircle, Clock, Shield, Phone, ArrowRight, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "EV Charger Installation | Ellenox ",
  description:
    "Book professional EV charger installation by certified electricians, including consultation, setup, documentation, and ongoing support.",
  path: "/installation",
})

const processSteps = [
  {
    title: "Free Consultation",
    description:
      "Fill in the form with the required details and we’ll get back to you within 48 hours.",
    icon: Phone,
  },
  {
    title: "Site Assessment",
    description:
      "Based on the information provided, we’ll first complete a desk study. If we identify additional constraints, a site assessment will be carried out by one of our approved installers.",
    icon: CheckCircle,
  },
  {
    title: "Personalised Quote",
    description:
      "You’ll receive a final quote for the charger purchase and any bespoke installation — tailored to your needs and preferences (no hidden fees).",
    icon: FileText,
  },
  {
    title: "Professional Installation",
    description:
      "Certified electricians complete the installation safely and professionally, in line with BS 7671 (IET Wiring Regulations) 18th Edition.",
    icon: Shield,
  },
  {
    title: "Setup & Training",
    description:
      "We configure the app, connect the charger to Wi-Fi, and show you how to use it.",
    icon: Clock,
  },
]

const documents = [
  {
    name: "User Manual",
    description: "General operating instructions",
    size: "240 KB",
    href: "/docs/User Manual.pdf",
  },
  {
    name: "Installation Guide",
    description: "Installation and wiring instructions",
    size: "1.162 MB",
    href: "/docs/Installation_Guide.pdf",
  },
  {
    name: "App Guide",
    description: "How to use the mobile app",
    size: "328 KB",
    href: "/docs/App Guide.pdf",
  },
  {
    name: "Maintenance & Troubleshooting",
    description: "Maintenance instructions and fault codes",
    size: "140 KB",
    href: "/docs/Maintenance & Troubleshooting.pdf",
  },
  {
  name: "Standard Installation",
  description: "Standard installation instructions",
  size: "7 MB",
  href: "/docs/Standard%20Installation.pdf",
}

]


export default function InstallationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Professional Installation</h1>
              <p className="mt-4 text-lg text-muted-foreground">
  Professional installation by approved contractors. Safe, certified work — plus an extra 1-year charger warranty
  (4 years total).
</p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/shop/request-quote">
                    Request a quote 
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Notice */}
        <section className="border-b border-border bg-amber-50 py-6 dark:bg-amber-950/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-500" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Important Safety Information</h3>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
  Installing an EV charging station involves mains electricity and must only be carried out by a qualified,
  certified electrician. In accordance with BS 7671 (IET Wiring Regulations), EV charger installation is
  notifiable work. Do not attempt to install the charging station yourself.
</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">How the Process Works</h2>
              <h3 className="text-xl font-bold tracking-tight">(only for Bespoke installation)</h3>

              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                From first contact to completed installation - here's what to expect
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="border-y border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  What’s Included in Standard Installation
                </h2>        
                <p className="mt-4 text-lg text-muted-foreground">
                    Standard installation includes all essential work required for safe and compliant EV charger operation. 
                </p>
                <ul className="mt-8 space-y-4">
                  {[
  "Wall mounting of the charging station",
  "Installation of up to 10 metres of 6mm surface-mounted cable",
  "Drilling one wall penetration for cable routing",
  "Connection to the electrical consumer unit",
  "Installation of dedicated protective circuit breaker",
  "Testing and commissioning of the new EV charging circuit",
  "Mobile app setup and user training",
  "Electrical installation certificate & DNO notification",
].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm text-muted-foreground">
                  * Additional materials, extended cable runs, or complex installations may require a site visit and separate quotation.
Standard installation is typically completed within 3 hours. Please review the Standard Installation document for qualification criteria.
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-2xl border border-border bg-background p-8">
                  <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Request a free consultation and get a personalised quote for your installation.
                  </p>
                  <Button size="lg" className="mt-6 w-full gap-2" asChild>
                    <Link href="/shop/request-quote">
                      Request a Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    No obligation. We respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Download manuals and technical documents for your charging station
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/50"
                >
                  <a
  href={doc.href}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4"
>
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
    <FileText className="h-6 w-6" />
  </div>
  <div>
    <p className="font-medium">{doc.name}</p>
    <p className="text-sm text-muted-foreground">
      {doc.description} • PDF • {doc.size}
    </p>
  </div>
</a>

<Button variant="ghost" size="icon" asChild>
  <a href={doc.href} download={doc.name}>
    <Download className="h-5 w-5" />
    <span className="sr-only">Download {doc.name}</span>
  </a>
</Button>


                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Installer Locator */}
        <InstallerLocator />
      </main>
      <Footer />
    </div>
  )
}
