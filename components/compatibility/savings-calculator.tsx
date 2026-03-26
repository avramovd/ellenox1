"use client"

import { useState, useMemo } from "react"
import { Calculator, Zap, Fuel, TrendingDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FuelComparison } from "./fuel-comparison"

export function SavingsCalculator() {
  const [monthlymiles, setMonthlymiles] = useState(1500)
  const [electricityPrice, setElectricityPrice] = useState(0.28) // £/kWh
  const [dieselPrice, setDieselPrice] = useState(1.45) // £/l
  const [petrolPrice, setPetrolPrice] = useState(1.4) // £/l
  const [evConsumption, setEvConsumption] = useState(17) // kWh/100miles
  const [dieselConsumption, setDieselConsumption] = useState(6) // l/100miles
  const [petrolConsumption, setPetrolConsumption] = useState(7) // l/100miles

  const calculations = useMemo(() => {
    const yearlymiles = monthlymiles * 12

    // EV costs
    const evKwhPerMile = evConsumption / 100
    const evCostPerMile = Number((evKwhPerMile * electricityPrice).toFixed(3))
    const evMonthlyCost = monthlymiles * evCostPerMile
    const evYearlyCost = yearlymiles * evCostPerMile

    // Diesel costs
    const dieselLPerMile = dieselConsumption / 100
    const dieselCostPerMile = dieselLPerMile * dieselPrice
    const dieselMonthlyCost = monthlymiles * dieselCostPerMile
    const dieselYearlyCost = yearlymiles * dieselCostPerMile

    // Petrol costs
    const petrolLPerMile = petrolConsumption / 100
    const petrolCostPerMile = petrolLPerMile * petrolPrice
    const petrolMonthlyCost = monthlymiles * petrolCostPerMile
    const petrolYearlyCost = yearlymiles * petrolCostPerMile

    // Savings
    const savingsVsDieselMonthly = dieselMonthlyCost - evMonthlyCost
    const savingsVsDieselYearly = dieselYearlyCost - evYearlyCost
    const savingsVsPetrolMonthly = petrolMonthlyCost - evMonthlyCost
    const savingsVsPetrolYearly = petrolYearlyCost - evYearlyCost

    const percentSavingsVsDiesel = dieselCostPerMile > 0
      ? ((dieselCostPerMile - evCostPerMile) / dieselCostPerMile) * 100
      : 0

    const percentSavingsVsPetrol = petrolCostPerMile > 0
      ? ((petrolCostPerMile - evCostPerMile) / petrolCostPerMile) * 100
      : 0

    return {
      evCostPerMile,
      evMonthlyCost,
      evYearlyCost,
      dieselCostPerMile,
      dieselMonthlyCost,
      dieselYearlyCost,
      petrolCostPerMile,
      petrolMonthlyCost,
      petrolYearlyCost,
      savingsVsDieselMonthly,
      savingsVsDieselYearly,
      savingsVsPetrolMonthly,
      savingsVsPetrolYearly,
      percentSavingsVsDiesel,
      percentSavingsVsPetrol,
    }
  }, [monthlymiles, electricityPrice, dieselPrice, petrolPrice, evConsumption, dieselConsumption, petrolConsumption])

  return (
    <section className="border-t border-border bg-muted/30 py-16" id="calculator">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Calculator className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Savings Calculator</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Calculate how much you can save with home electric charging
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Parameters</CardTitle>
                <CardDescription>Adjust values according to your usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Monthly Mileage</Label>
                    <span className="font-semibold">{monthlymiles} miles</span>
                  </div>
                  <Slider
                    value={[monthlymiles]}
                    onValueChange={([value]) => setMonthlymiles(value)}
                    min={100}
                    max={5000}
                    step={100}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="electricity">Electricity Price (£/kWh)</Label>
                    <Input
                      id="electricity"
                      type="number"
                      step="0.01"
                      value={electricityPrice}
                      onChange={(e) => setElectricityPrice(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ev-consumption">EV Consumption (kWh/100miles)</Label>
                    <Input
                      id="ev-consumption"
                      type="number"
                      step="0.1"
                      value={evConsumption}
                      onChange={(e) => setEvConsumption(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="diesel">Diesel Price (£/l)</Label>
                    <Input
                      id="diesel"
                      type="number"
                      step="0.01"
                      value={dieselPrice}
                      onChange={(e) => setDieselPrice(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diesel-consumption">Diesel Consumption (l/100miles)</Label>
                    <Input
                      id="diesel-consumption"
                      type="number"
                      step="0.1"
                      value={dieselConsumption}
                      onChange={(e) => setDieselConsumption(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="petrol">Petrol Price (£/l)</Label>
                    <Input
                      id="petrol"
                      type="number"
                      step="0.01"
                      value={petrolPrice}
                      onChange={(e) => setPetrolPrice(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="petrol-consumption">Petrol Consumption (l/100miles)</Label>
                    <Input
                      id="petrol-consumption"
                      type="number"
                      step="0.1"
                      value={petrolConsumption}
                      onChange={(e) => setPetrolConsumption(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                      <Zap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Electric Charging</p>
                      <p className="text-2xl font-bold">£{calculations.evCostPerMile.toFixed(3)}/mile</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">Per Month</p>
                      <p className="text-lg font-semibold">£{calculations.evMonthlyCost.toFixed(0)}</p>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">Per Year</p>
                      <p className="text-lg font-semibold">£{calculations.evYearlyCost.toFixed(0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Fuel className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Diesel</p>
                        <p className="text-xl font-bold">£{calculations.dieselCostPerMile.toFixed(3)}/mile</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      £{calculations.dieselMonthlyCost.toFixed(0)}/month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Fuel className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Petrol</p>
                        <p className="text-xl font-bold">£{calculations.petrolCostPerMile.toFixed(3)}/mile</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      £{calculations.petrolMonthlyCost.toFixed(0)}/month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                      <TrendingDown className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Your Annual Savings</p>
                      <p className="text-3xl font-bold text-green-600">
                        up to £
                        {Math.max(0, calculations.savingsVsDieselYearly, calculations.savingsVsPetrolYearly).toFixed(0)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">vs Diesel</p>
                      <p className="font-semibold text-green-600">
                        {calculations.percentSavingsVsDiesel.toFixed(0)}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">vs Petrol</p>
                      <p className="font-semibold text-green-600">
                        {calculations.percentSavingsVsPetrol.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <FuelComparison
  electricityPrice={electricityPrice}
  dieselPrice={dieselPrice}
  petrolPrice={petrolPrice}
  evConsumption={evConsumption}
  dieselConsumption={dieselConsumption}
  petrolConsumption={petrolConsumption}
/>
    </section>
  )
}