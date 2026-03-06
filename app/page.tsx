import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { TrustSection } from "@/components/home/trust-section"
import { CTASection } from "@/components/home/cta-section"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Smart EV Chargers & Installation",
  description:
    "Discover Ellenox  smart EV charging stations with professional UK installation, app control, dynamic load balancing, and long-term warranty.",
  path: "/",
  keywords: [
    "smart EV charger UK",
    "home electric car charging",
    "EV charger installation",
    "Type 2 home charger",
  ],
})

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
