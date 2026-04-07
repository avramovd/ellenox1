"use client"

import { useState } from "react"

const screenshots = [
  {
    id: "dashboard",
    title: "Home Screen",
    description: "Quick overview of current charging and statistics",
    image: "/home.png",
  },
  {
    id: "charging",
    title: "Active Charging",
    description: "Track progress in real-time",
    image: "/charging.png",
  },
  {
    id: "schedule",
    title: "Scheduling",
    description: "Set automatic charging times",
    image: "/scheduling.jpg",
  },
  {
    id: "stats",
    title: "Statistics",
    description: "Analyse your costs",
    image: "/statistics.png",
  },
]

export function AppScreenshots() {
  const [activeScreenshot, setActiveScreenshot] = useState(screenshots[0])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Explore the App</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Intuitive interface for easy charging management
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {screenshots.map((screenshot) => (
                <button
                  key={screenshot.id}
                  onClick={() => setActiveScreenshot(screenshot)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    activeScreenshot.id === screenshot.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <h3 className="font-semibold">{screenshot.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{screenshot.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div className="rounded-3xl bg-foreground p-2">
                <img
                  src={activeScreenshot.image || "/placeholder.svg"}
                  alt={activeScreenshot.title}
                  className="h-auto w-64 rounded-2xl md:w-72"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
