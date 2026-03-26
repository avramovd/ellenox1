import Link from "next/link"
import { Play, Calculator, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6">
            
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Smart charging for your{" "}
              <span className="text-primary">electric vehicle</span>
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Ellenox  offers premium smart EV chargers with professional installation.
              Save up to 70% on fuel costs and charge conveniently at home.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                <Link href="#video">
                  <Play className="h-4 w-4" />
                  Watch Video
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                <Link href="/compatibility#calculator">
                  <Calculator className="h-4 w-4" />
                  Calculate Savings
                </Link>
              </Button>

              <Button size="lg" className="gap-2" asChild>
                <Link href="/installation#locator">
                  <MapPin className="h-4 w-4" />
                  Find Installer
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE VIDEO */}
          <div className="relative">
            <div
              id="video"
              className="relative aspect-square overflow-hidden rounded-3xl bg-muted"
            >

              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                  // 👉 додај 1 screenshot како fallback
              >
                <source src="/360.webm" type="video/webm" />
                {/*<source src="/360.mp4" type="video/mp4" />*/}
                Your browser does not support the video tag.
              </video>

              {/* PRODUCT CARD OVERLAY */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-background/95 p-4 backdrop-blur shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ellenox  Pro 22kW
                    </p>
                    <p className="text-2xl font-bold">from £495</p>
                  </div>

                  <Button asChild>
                    <Link href="/shop">View</Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
