import Image from "next/image"
import { Clock, Phone } from "lucide-react"
import { CONTACT_HOURS, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/quote-lead"

/**
 * Slim landing-page header for /shop/request-quote-new: logo left, phone right.
 * Kept separate from the shared site <Header /> so the global navigation is
 * untouched.
 *
 * Opening hours are intentionally absent: no real hours are known, and inventing
 * them on a page that runs paid traffic sets a response expectation the business
 * has not agreed to. Set CONTACT_HOURS in lib/quote-lead.ts once confirmed and
 * the line below renders itself.
 */
export function QuoteLeadHeader() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
        <a href="/" className="flex items-center" aria-label="Ellenox home">
          {/* logo.webp is a 1024x1024 square with internal padding — keep it square
              or the wordmark shrinks to nothing. */}
          <Image src="/logo.webp" alt="Ellenox logo" width={100} height={100} priority className="h-14 w-auto" />
        </a>

        <div className="flex flex-col items-center gap-1 sm:items-end">
          <a
            href={CONTACT_PHONE_HREF}
            className="flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          {CONTACT_HOURS && (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {CONTACT_HOURS}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
