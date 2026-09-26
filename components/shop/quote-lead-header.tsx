import Image from "next/image"
import { Phone } from "lucide-react"
import { CONTACT_HOURS, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, TAGLINE } from "@/lib/quote-lead"

/**
 * Slim landing-page header for /shop/request-quote-new: horizontal logo and
 * strapline left, phone and opening hours right — the lockup from the approved
 * design. Kept separate from the shared site <Header /> so the global navigation
 * is untouched.
 *
 * The hours line renders only while CONTACT_HOURS is set in lib/quote-lead.ts —
 * blanking it there removes the line rather than leaving a stale promise on a
 * page that runs paid traffic.
 */
export function QuoteLeadHeader() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 md:py-4">
        <div className="flex min-w-0 items-center gap-4 lg:gap-5">
          <a href="/" className="shrink-0" aria-label="Ellenox home">
            {/* logo-horizontal.webp is the mark and wordmark set side by side,
                rebuilt from logo.webp — the shipped asset is a stacked lockup
                that shrinks the wordmark to nothing at header height. */}
            <Image
              src="/logo-horizontal.webp"
              alt="Ellenox"
              width={1004}
              height={240}
              priority
              className="h-8 w-auto md:h-9"
            />
          </a>

          {/* The strapline is the first thing to go when width is tight. */}
          <span aria-hidden="true" className="hidden h-7 w-px bg-border md:block" />
          <p className="hidden truncate text-sm text-muted-foreground md:block">{TAGLINE}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <a
            href={CONTACT_PHONE_HREF}
            className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-lg"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          {CONTACT_HOURS && (
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{CONTACT_HOURS}</p>
          )}
        </div>
      </div>
    </header>
  )
}
