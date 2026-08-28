"use client"

import { CONSENT_SETTINGS_EVENT } from "@/lib/gtm"

/** Reopens the cookie banner so a visitor can change or withdraw consent. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT))}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Cookie Settings
    </button>
  )
}
