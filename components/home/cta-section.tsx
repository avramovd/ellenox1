import Link from "next/link"
import { Calculator, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl bg-foreground text-background">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-background/80">
                Calculate how much you can save with home electric charging or find a certified installer in your area.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <Link href="/compatibility#calculator">
                    <Calculator className="h-4 w-4" />
                    Calculate Savings
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-background/20 text-background hover:bg-background/10 hover:text-background bg-transparent"
                  asChild
                >
                  <Link href="/installation#locator">
                    <MapPin className="h-4 w-4" />
                    Find Installer
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-background/20 text-background hover:bg-background/10 hover:text-background bg-transparent"
                  asChild
                >
                  <Link href="/shop/request-quote">
                    <FileText className="h-4 w-4" />
                    Request Installation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/electric-car-charging-at-home-night-time-cozy-atmo.webp"
                alt="Electric car charging at home"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
