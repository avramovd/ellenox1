import Link from "next/link"
import { ArrowRight, Smartphone, KeyRound, Activity, PlugZap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { smartCharger } from "@/lib/products"

export function ProductsSection() {
  const product = smartCharger

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-muted to-muted/50">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <Badge className="absolute left-4 top-4">Smart EV Charger</Badge>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>

            {/* Smart Features Preview */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Smartphone, label: "Mobile App" },
                { icon: KeyRound, label: "RFID Access" },
                { icon: Activity, label: "Dynamic Load Balancing" },
                { icon: PlugZap, label: "OCPP Protocol" },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Charger Only</p>
                <p className="text-2xl font-bold">£{product.price}</p>
              </div>
              <div className="rounded-lg border-2 border-primary bg-primary/5 px-4 py-2">
                <p className="text-sm font-medium text-primary">With Installation</p>
                <p className="text-2xl font-bold">£{product.price + product.installationPrice}</p>
              </div>
            </div>

            {/* Key Benefits */}
            <ul className="mt-6 space-y-2">
              {["5-year warranty", "Free delivery", "Professional installation"].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/shop">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/shop/request-quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
