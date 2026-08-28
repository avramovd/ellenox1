/**
 * Globals created by the Consent Mode v2 / GTM snippets injected in <head>
 * (see lib/gtm.ts and app/layout.tsx).
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

export {}
