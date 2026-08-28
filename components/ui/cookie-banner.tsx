"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import {
  CONSENT_SETTINGS_EVENT,
  CONSENT_STORAGE_KEY,
  consentPayload,
  readStoredConsent,
  type ConsentCategories,
} from "@/lib/gtm"

const ALL_GRANTED: ConsentCategories = { analytics: true, marketing: true }
const ALL_DENIED: ConsentCategories = { analytics: false, marketing: false }

/**
 * Push a Consent Mode v2 update for the four ad/analytics signals.
 * The defaults (all denied) are set in the <head> snippet before GTM loads,
 * so this only ever relaxes or re-confirms them.
 */
function applyConsent(categories: ConsentCategories, source: string) {
  const payload = consentPayload(categories)

  window.gtag?.("consent", "update", payload)
  window.dataLayer?.push({
    event: "cookie_consent_update",
    consent_analytics: payload.analytics_storage,
    consent_marketing: payload.ad_storage,
    consent_source: source,
  })
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [prefs, setPrefs] = useState<ConsentCategories>(ALL_DENIED)

  useEffect(() => {
    if (!readStoredConsent()) {
      setIsVisible(true)
    }
  }, [])

  // Lets the footer link (or any other trigger) reopen the banner so a visitor
  // can change or withdraw a choice they already made.
  useEffect(() => {
    const reopen = () => {
      setPrefs(readStoredConsent() ?? ALL_DENIED)
      setShowDetails(true)
      setIsVisible(true)
    }
    window.addEventListener(CONSENT_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, reopen)
  }, [])

  const save = useCallback((categories: ConsentCategories, source: string) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ ...categories, v: 2 }))
    applyConsent(categories, source)
    setIsVisible(false)
    setShowDetails(false)
  }, [])

  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg md:p-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              We use cookies to improve your experience on our site. You can choose which categories to allow. Read our{" "}
              <Link href="/cookies" className="text-primary underline hover:text-primary/80">
                Cookie Policy
              </Link>
              .
            </p>
            <button
              onClick={() => save(ALL_DENIED, "close")}
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Reject all and close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {showDetails && (
            <div className="flex flex-col gap-3 rounded-md border border-border p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Strictly necessary</p>
                  <p className="text-xs text-muted-foreground">Required for the site to work. Always on.</p>
                </div>
                <Switch checked disabled aria-label="Strictly necessary cookies (always on)" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">Helps us understand how the site is used.</p>
                </div>
                <Switch
                  checked={prefs.analytics}
                  onCheckedChange={(analytics) => setPrefs((p) => ({ ...p, analytics }))}
                  aria-label="Analytics cookies"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Marketing</p>
                  <p className="text-xs text-muted-foreground">Used for advertising and measuring campaigns.</p>
                </div>
                <Switch
                  checked={prefs.marketing}
                  onCheckedChange={(marketing) => setPrefs((p) => ({ ...p, marketing }))}
                  aria-label="Marketing cookies"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 md:justify-end">
            {showDetails ? (
              <Button variant="outline" size="sm" onClick={() => save(prefs, "save-preferences")}>
                Save preferences
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
                Manage preferences
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => save(ALL_DENIED, "reject-all")}>
              Reject all
            </Button>
            <Button size="sm" onClick={() => save(ALL_GRANTED, "accept-all")}>
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
