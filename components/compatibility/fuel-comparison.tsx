"use client"

import { useMemo, useState } from "react"
import { Zap, Fuel, TrendingUp, Car } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function FuelComparison() {
  const [distance, setDistance] = useState(100)

  const comparison = useMemo(() => {
    // Prices
    const electricityPrice = 0.28 // £/kWh
    const dieselPrice = 1.45 // £/litre
    const petrolPrice = 1.4 // £/litre

    // Consumption
    const evConsumptionPer100Miles = 17 // kWh / 100 miles
    const dieselConsumptionPer100Km = 6 // litres / 100 km
    const petrolConsumptionPer100Km = 7 // litres / 100 km

    const kmPer100Miles = 160.934
    const milesPer100Km = 62.137

    // Cost per mile
    const evCostPerMile = (evConsumptionPer100Miles * electricityPrice) / 100
    const dieselCostPerMile = (dieselConsumptionPer100Km * dieselPrice) / milesPer100Km
    const petrolCostPerMile = (petrolConsumptionPer100Km * petrolPrice) / milesPer100Km

    const evCost = evCostPerMile * distance
    const dieselCost = dieselCostPerMile * distance
    const petrolCost = petrolCostPerMile * distance

    return {
      evCostPerMile,
      dieselCostPerMile,
      petrolCostPerMile,
      evCost,
      dieselCost,
      petrolCost,
    }
  }, [distance])

  const maxCost = Math.max(comparison.evCost, comparison.dieselCost, comparison.petrolCost)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Cost Comparison</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Visual comparison of fuel costs between electric, diesel and petrol vehicles
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <Label>Distance</Label>
              <span className="font-semibold">{distance} miles</span>
            </div>
            <Slider
              value={[distance]}
              onValueChange={([value]) => setDistance(value)}
              min={10}
              max={1000}
              step={10}
              className="mt-3"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-primary bg-primary/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Electric</p>
                    <p className="text-sm text-muted-foreground">
                      £{comparison.evCostPerMile.toFixed(3)}/mile
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary">£{comparison.evCost.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <div
                  className="h-4 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(comparison.evCost / maxCost) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Diesel</p>
                    <p className="text-sm text-muted-foreground">
                      £{comparison.dieselCostPerMile.toFixed(3)}/mile
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold">£{comparison.dieselCost.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <div
                  className="h-4 rounded-full bg-muted-foreground/30 transition-all duration-500"
                  style={{ width: `${(comparison.dieselCost / maxCost) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Petrol</p>
                    <p className="text-sm text-muted-foreground">
                      £{comparison.petrolCostPerMile.toFixed(3)}/mile
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold">£{comparison.petrolCost.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <div
                  className="h-4 rounded-full bg-muted-foreground/30 transition-all duration-500"
                  style={{ width: `${(comparison.petrolCost / maxCost) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <Car className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-2xl font-bold">{distance} miles</p>
              <p className="text-sm text-muted-foreground">Distance</p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center">
              <TrendingUp className="mx-auto h-6 w-6 text-green-600" />
              <p className="mt-2 text-2xl font-bold text-green-600">
                £{(comparison.dieselCost - comparison.evCost).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">You save vs diesel</p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center">
              <TrendingUp className="mx-auto h-6 w-6 text-green-600" />
              <p className="mt-2 text-2xl font-bold text-green-600">
                £{(comparison.petrolCost - comparison.evCost).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">You save vs petrol</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}