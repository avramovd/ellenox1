"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function ProductPricing({
  price,
  installationPrice,
}: {
  price: number
  installationPrice: number
}) {
  const [withInstallation, setWithInstallation] = useState(false)

  const totalPrice = withInstallation ? price + installationPrice : price
  const option = withInstallation ? "installation" : "charger"

  return (
    <div className="mt-8 space-y-6">
      {/* OPTIONS */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setWithInstallation(false)}
          className={`rounded-xl border bg-background p-4 text-left transition ${
            !withInstallation ? "border-primary ring-2 ring-primary" : "border-border"
          }`}
        >
          <p className="text-sm text-muted-foreground">Charger Only</p>
          <p className="text-3xl font-bold">£{price}</p>
        </button>

        <button
          type="button"
          onClick={() => setWithInstallation(true)}
          className={`rounded-xl border bg-background p-4 text-left transition ${
            withInstallation ? "border-primary ring-2 ring-primary bg-primary/5" : "border-border"
          }`}
        >
          <p className={`text-sm ${withInstallation ? "font-medium text-primary" : "text-muted-foreground"}`}>
            With Installation
          </p>
          <p className="text-3xl font-bold">£{price + installationPrice}</p>
        </button>
      </div>

      {/* CTA (redirect with option) */}
     <Link
  href={withInstallation 
  ? "/shop/request-quote" 
  : "/shop/charger-only"}

  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
>

        {withInstallation ? "Request Charger + Installation" : "Request Charger Only"} — £{totalPrice}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
