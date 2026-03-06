"use client"

import { useState } from "react"
import { Check, ExternalLink, Zap, Car } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface CarBrand {
  name: string
  logo: string
  models: {
    name: string
    connector: string
    maxPower: string
    compatible: boolean
  }[]
}

const carBrands: CarBrand[] = [

  
]

export function CompatibleCars() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBrands = carBrands
    .map((brand) => ({
      ...brand,
      models: brand.models.filter(
        (model) =>
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((brand) => brand.models.length > 0)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Car className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight">Compatible Vehicles</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Suitable for approximately 99% of electric vehicles with a Type 2 connector.
          </p>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Check Your Vehicle Eligibility</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              See if your electric vehicle qualifies for Intelligent Octopus Go - the smart tariff that works seamlessly
              with your Ellenox  charger to charge your car at the cheapest times.
            </p>
            <Button size="lg" asChild className="gap-2">
              <a
                href="https://octopus.energy/smart/intelligent-octopus-go/#eligibility-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Eligibility
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Works with Tesla, BMW, Audi, Mercedes, Volkswagen, Hyundai, Kia, Porsche and more
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBrands.map((brand) => (
              <div key={brand.name} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{brand.name}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {brand.models.map((model) => (
                    <div key={model.name} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{model.name}</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="secondary" className="cursor-help">
                              {model.maxPower}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Maximum AC power: {model.maxPower}</p>
                            <p>Connector: {model.connector}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
