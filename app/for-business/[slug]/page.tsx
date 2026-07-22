import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { businessProducts } from "@/data/business-products"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return businessProducts.map((product) => ({
    slug: product.slug,
  }))
}

export default async function BusinessProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const product = businessProducts.find((item) => item.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Commercial EV Charging Solutions
            </h1>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
            {product.image && (
              <div className="relative h-[340px] w-full bg-white md:h-[390px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain object-top p-10"
                  priority
                  unoptimized
                />
              </div>
            )}

            <div className="p-8">
              <p className="mb-3 text-sm font-medium text-primary">
                {product.category}
              </p>

              <h2 className="text-4xl font-bold tracking-tight">
                {product.name}
              </h2>

              <p className="mt-4 text-3xl font-bold">
                {product.price}
              </p>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold">
                  Product specifications
                </h3>

                <ul className="mt-4 grid gap-3 text-muted-foreground md:grid-cols-2">
                  {product.specs.map((spec) => (
                    <li
  key={spec}
  className="whitespace-pre-line rounded-lg border p-3"
>
  {spec}
</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
  <a
    href={`mailto:info@ellenox.uk?subject=Request%20for%20order%20-%20${encodeURIComponent(
      product.name
    )}`}
  >
    Request for order
  </a>
</Button>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}