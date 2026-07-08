import Link from "next/link"
import { businessProducts } from "@/data/business-products"
import { Button } from "@/components/ui/button"

export default function ForBusinessPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          EV Charging Solutions for Business
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Commercial AC and DC charging solutions for workplaces, fleets,
          public charging locations and destination charging.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businessProducts.map((product) => (
          <div
            key={product.slug}
            className="flex flex-col rounded-2xl border bg-background p-6 shadow-sm"
          >
            <p className="mb-2 text-sm font-medium text-primary">
              {product.category}
            </p>

            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p className="mt-3 text-2xl font-bold">
              {product.price}
            </p>

            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
              {product.specs.slice(0, 5).map((spec) => (
                <li key={spec}>• {spec}</li>
              ))}
            </ul>

            <Button className="mt-6" asChild>
              <Link href={product.href}>View product</Link>
            </Button>
          </div>
        ))}
      </div>
    </main>
  )
}