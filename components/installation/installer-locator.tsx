"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { UKInstaller } from "./uk-leaflet-map"

import { MapPin, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const UKLeafletMap = dynamic(() => import("./uk-leaflet-map"), { ssr: false })

/* ================================
   TYPES
================================ */

interface Installer {
  id: string
  name: string
  address: string
  phone: string
  email: string
  rating: number
  reviews: number
  postalCodes: string[]
  certified: boolean
  website: string
}

/* ================================
   DATA (ONLY 1 COMPANY)
================================ */

const installers: Installer[] = [
  {
    id: "lil-electrical",
    name: "Lil Electrical",
    address: "4 Hampton Terrace, GU26 6NR",
    phone: "",
    email: "",
    rating: 0,
    reviews: 0,
    postalCodes: ["GU26"],
    certified: true,
    website: "https://lilelectrical.co.uk/", // ← стави вистинскиот линк
  },
]


const ukInstallers: UKInstaller[] = [
  {
    id: "lil-electrical",
    type: "installer",
    // ⚠️ IMPORTANT: put exact coordinates for 4 Hampton Terrace, GU26 6NR
    // These are placeholders near Haslemere / GU26 region
    lat: 51.088,
    lng: -0.711,
    name: "Lil Electrical",
    city: "Haslemere",
    postcodePrefixes: ["GU26"],
    website: "https://lilelectrical.co.uk/",
  },
]

/* ================================
   HELPERS
================================ */

const RADIUS_MILES = 25

function normalizePostcode(input: string) {
  return input.replace(/\s+/g, "").toUpperCase()
}

function isLikelyPostcode(input: string) {
  // basic check: UK postcodes almost always contain digits
  return /\d/.test(input)
}

function haversineMiles(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (v: number) => (v * Math.PI) / 180
  const R = 3958.7613 // Earth radius in miles

  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)

  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2

  return 2 * R * Math.asin(Math.sqrt(s))
}

async function geocodeUKPostcode(postcode: string): Promise<{ lat: number; lng: number } | null> {
  const pc = normalizePostcode(postcode)
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}`)
    if (!res.ok) return null
    const data = await res.json()
    const r = data?.result
    if (!r?.latitude || !r?.longitude) return null
    return { lat: r.latitude, lng: r.longitude }
  } catch {
    return null
  }
}

/* ================================
   COMPONENT
================================ */

export function InstallerLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const [searchResults, setSearchResults] = useState<Installer[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const [filteredInstallers, setFilteredInstallers] = useState<UKInstaller[]>(ukInstallers)
  const [selectedInstaller, setSelectedInstaller] = useState<UKInstaller | null>(null)

  /* ========= debounce ========= */

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(t)
  }, [searchQuery])

  /* ========= radius filter (25 miles) ========= */

  useEffect(() => {
    const q = debouncedQuery.trim()

    if (!q) {
      // show the one installer by default (or set [] if you want empty map until search)
      setFilteredInstallers(ukInstallers)
      setSelectedInstaller(null)
      setSearchResults([])
      setHasSearched(false)
      return
    }

    // radius mode requires postcode (because we geocode with postcodes.io)
    if (!isLikelyPostcode(q)) {
      setFilteredInstallers([])
      setSelectedInstaller(null)
      setSearchResults([])
      setHasSearched(true)
      return
    }

    let cancelled = false

    ;(async () => {
      const userLoc = await geocodeUKPostcode(q)
      if (cancelled) return

      if (!userLoc) {
        setFilteredInstallers([])
        setSelectedInstaller(null)
        setSearchResults([])
        setHasSearched(true)
        return
      }

      const only = ukInstallers[0]
      const d = haversineMiles(userLoc, { lat: only.lat, lng: only.lng })

      if (d <= RADIUS_MILES) {
        setFilteredInstallers([only])
        setSelectedInstaller(only)
        setSearchResults([installers[0]])
      } else {
        setFilteredInstallers([])
        setSelectedInstaller(null)
        setSearchResults([])
      }

      setHasSearched(true)
    })()

    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  /* ================================
     UI
  ================================= */

  return (
    <section className="border-t border-border py-16" id="locator">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Find Your Nearest Installer</h2>
          <p className="mt-2 text-sm text-muted-foreground">Search by UK postcode (25-mile radius)</p>
        </div>

        {/* MAP */}
        <div
          className="relative overflow-hidden rounded-2xl border bg-[#e8f4f0]"
          style={{ height: "650px" }}
        >
          <UKLeafletMap
            installers={filteredInstallers}
            selected={selectedInstaller}
            onSelect={(ins) => setSelectedInstaller(ins)}
          />
        </div>

        {/* SEARCH UNDER MAP */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-md flex gap-2">
            <Input
              placeholder="Enter UK postcode (e.g., GU26 6NR)"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* RESULTS */}
        {hasSearched && searchResults.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            No installer found within 25 miles of this postcode.
          </div>
        )}

        {hasSearched && searchResults.length > 0 && (
          <div className="mt-10 space-y-4">
            {searchResults.map((i) => (
              <Card key={i.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold">{i.name}</h3>

                      <div className="mt-2 text-sm text-muted-foreground flex flex-wrap gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {i.address}
                        </span>

                        {i.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {i.phone}
                          </span>
                        )}

                        {i.email && (
                          <span className="flex items-center gap-1">
                            <Mail size={14} />
                            {i.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {i.certified && <Badge>Certified</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
