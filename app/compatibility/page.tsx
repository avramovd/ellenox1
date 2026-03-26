import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CompatibleCars } from "@/components/compatibility/compatible-cars"
import { SavingsCalculator } from "@/components/compatibility/savings-calculator"
import { FuelComparison } from "@/components/compatibility/fuel-comparison"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "EV Compatibility & Savings Calculator | Ellenox  Charging Stations",
  description:
    "Check vehicle compatibility and estimate your potential savings by switching to home EV charging with Ellenox .",
  path: "/compatibility",
})

export default function CompatibilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Compatibility</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Check compatibility and calculate savings from home charging
            </p>
          </div>
        </section>

        <CompatibleCars />
        <SavingsCalculator />
      </main>
      <Footer />
    </div>
  )
}
