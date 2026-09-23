"use client"

import type React from "react"
import { useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import {
  INSTALLED_PRICE_FROM,
  QUOTE_LEAD_FORM_ID,
  QUOTE_LEAD_PATH,
} from "@/lib/quote-lead"

const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
const phoneRegex = /^\+?[\d\s()-]{9,}$/

export function QuoteLeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [formData, setFormData] = useState({ name: "", postCode: "", phone: "" })

  /**
   * Guards the conversion push. The submit button is already disabled while a
   * request is in flight, but this makes a duplicate generate_lead impossible
   * even if the component re-renders or the user retries after a server error.
   */
  const leadTracked = useRef(false)

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = "Required"
    if (!formData.postCode.trim()) e.postCode = "Required"
    else if (!ukPostcodeRegex.test(formData.postCode.trim())) e.postCode = "Enter a valid UK postcode"
    if (!formData.phone.trim()) e.phone = "Required"
    else if (!phoneRegex.test(formData.phone.trim())) e.phone = "Enter a valid phone number"
    return e
  }, [formData])

  const isValid = Object.keys(errors).length === 0

  const markTouched = (key: string) => setTouched((p) => ({ ...p, [key]: true }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid || isSubmitting) {
      setTouched({ name: true, postCode: true, phone: true })
      return
    }

    setIsSubmitting(true)
    setServerError(null)

    try {
      const res = await fetch("/api/quote-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setServerError(err?.error ?? "Failed to send request. Please call us instead.")
        return
      }

      // Conversion signal. Same `generate_lead` event name the existing quote
      // form pushes, so any GTM trigger / Google Ads conversion already built on
      // it keeps working here with no container change. GTM consent settings
      // still decide whether the downstream tags may fire.
      if (!leadTracked.current) {
        leadTracked.current = true
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "generate_lead",
          form_id: QUOTE_LEAD_FORM_ID,
          form_location: QUOTE_LEAD_PATH,
          lead_type: "installation_quote",
          currency: "GBP",
          value: INSTALLED_PRICE_FROM,
        })
      }

      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-xl font-bold">Request received</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Thanks — we have your details. One of our team will call you shortly with your installation price.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8"
    >
      <h2 className="text-xl font-bold">Get Your Installation Price</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Free, no-obligation quote. No pushy sales calls.
      </p>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="lead-name">Name</Label>
          <Input
            id="lead-name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onBlur={() => markTouched("name")}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
            aria-invalid={touched.name && !!errors.name}
          />
          {touched.name && errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-postcode">Postcode</Label>
          <Input
            id="lead-postcode"
            name="postal-code"
            autoComplete="postal-code"
            value={formData.postCode}
            onBlur={() => markTouched("postCode")}
            onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
            placeholder="SW1A 1AA"
            aria-invalid={touched.postCode && !!errors.postCode}
          />
          {touched.postCode && errors.postCode && (
            <p className="text-xs text-destructive">{errors.postCode}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-phone">Phone number</Label>
          <Input
            id="lead-phone"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formData.phone}
            onBlur={() => markTouched("phone")}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="07700 900123"
            aria-invalid={touched.phone && !!errors.phone}
          />
          {touched.phone && errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Get My Installation Price"}
        </Button>

        {serverError && (
          <p role="alert" className="text-center text-xs text-destructive">
            {serverError}
          </p>
        )}

        <p className="text-center text-xs text-muted-foreground">
          By submitting this form you agree to us contacting you about your quote, in line with our{" "}
          <a href="/privacy" className="text-primary underline hover:no-underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}
