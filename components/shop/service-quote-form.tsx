"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Send } from "lucide-react"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

export function ServiceQuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postCode: "",
    fullAddress: "",
    productInterest: "",
    wifiSignalConfirmed: "", // required: "yes" | "no"
    mainFuse: "", // required: "63A" | "100A" | "unknown" (но мора да се избере)
    message: "",
    gdprConsent: false,
  })

  const errors = useMemo(() => {
    const e: Record<string, string> = {}

    if (!formData.name.trim()) e.name = "Required"
    if (!formData.email.trim()) e.email = "Required"
    else if (!emailRegex.test(formData.email.trim())) e.email = "Invalid email format"

    if (!formData.phone.trim()) e.phone = "Required"
    if (!formData.postCode.trim()) e.postCode = "Required"
    if (!formData.fullAddress.trim()) e.fullAddress = "Required"
    if (!formData.productInterest.trim()) e.productInterest = "Required"

    if (!formData.wifiSignalConfirmed) e.wifiSignalConfirmed = "Please select an option"
    if (!formData.mainFuse) e.mainFuse = "Please select an option"

    if (!formData.gdprConsent) e.gdprConsent = "Consent is required"

    return e
  }, [formData])

  const isValid = Object.keys(errors).length === 0

  const markTouched = (key: string) => setTouched((p) => ({ ...p, [key]: true }))

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!isValid) {
    setTouched({
      name: true,
      email: true,
      phone: true,
      postCode: true,
      fullAddress: true,
      productInterest: true,
      wifiSignalConfirmed: true,
      mainFuse: true,
      gdprConsent: true,
    })
    return
  }

  try {
    const res = await fetch("/api/installation-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
  const err = await res.json().catch(() => ({}))
  alert(err?.error ?? "Failed to send request")
  return
}

    setSubmitted(true) // ✅ показва success съобщението
  } catch {
    alert("Network error")
  }
}


  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-background p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">Request Submitted!</h3>
        <p className="mt-4 text-muted-foreground">
          Thank you. Our consultant will contact you within 24 hours to confirm the details and provide a quote.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-background p-6 md:p-8">
      <h2 className="text-xl font-bold">Request a Quote</h2>
      <p className="mt-1 text-sm text-muted-foreground">Fill in the form and we will contact you for a free consultation</p>

      <div className="mt-6 space-y-6">
        {/* Name / Phone */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onBlur={() => markTouched("name")}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
            />
            {touched.name && errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onBlur={() => markTouched("phone")}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+44 7700 900000"
            />
            {touched.phone && errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        {/* Email / Post code */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Contact email address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onBlur={() => markTouched("email")}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
            {touched.email && errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postCode">Post code *</Label>
            <Input
              id="postCode"
              required
              value={formData.postCode}
              onBlur={() => markTouched("postCode")}
              onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
              placeholder="SW1A 1AA"
            />
            {touched.postCode && errors.postCode && <p className="text-xs text-destructive">{errors.postCode}</p>}
          </div>
        </div>

        {/* Full address */}
        <div className="space-y-2">
          <Label htmlFor="fullAddress">Full address *</Label>
          <Input
            id="fullAddress"
            required
            value={formData.fullAddress}
            onBlur={() => markTouched("fullAddress")}
            onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
            placeholder="Street, number, city, post code"
          />
          {touched.fullAddress && errors.fullAddress && <p className="text-xs text-destructive">{errors.fullAddress}</p>}
        </div>

        {/* Product */}
        <div className="space-y-2">
          <Label htmlFor="productInterest">Product of interest *</Label>
          <Input
            id="productInterest"
            required
            value={formData.productInterest}
            onBlur={() => markTouched("productInterest")}
            onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
            placeholder="e.g. Ellenox  7kW, Ellenox  22kW"
          />
          {touched.productInterest && errors.productInterest && (
            <p className="text-xs text-destructive">{errors.productInterest}</p>
          )}
        </div>

        {/* WiFi (required) */}
        <div className="space-y-3">
          <Label>Confirm Wi-Fi signal at the EV charger location *</Label>
          <RadioGroup
            value={formData.wifiSignalConfirmed}
            onValueChange={(value) => {
              setFormData({ ...formData, wifiSignalConfirmed: value })
              markTouched("wifiSignalConfirmed")
            }}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`wifi-${option.value}`} />
                <Label htmlFor={`wifi-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {touched.wifiSignalConfirmed && errors.wifiSignalConfirmed && (
            <p className="text-xs text-destructive">{errors.wifiSignalConfirmed}</p>
          )}
        </div>

        {/* Fuse (required) */}
        <div className="space-y-3">
          <Label>Main cut out fuse *</Label>
          <RadioGroup
            value={formData.mainFuse}
            onValueChange={(value) => {
              setFormData({ ...formData, mainFuse: value })
              markTouched("mainFuse")
            }}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "63A", label: "63A" },
              { value: "100A", label: "100A" },
              { value: "unknown", label: "Don't know" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`fuse-${option.value}`} />
                <Label htmlFor={`fuse-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {touched.mainFuse && errors.mainFuse && <p className="text-xs text-destructive">{errors.mainFuse}</p>}
        </div>

        {/* Optional message */}
        <div className="space-y-2">
          <Label htmlFor="message">Additional information (optional)</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Anything else we should know?"
            rows={4}
          />
        </div>

        {/* GDPR */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="gdpr"
            checked={formData.gdprConsent}
            onCheckedChange={(checked) => {
              setFormData({ ...formData, gdprConsent: checked as boolean })
              markTouched("gdprConsent")
            }}
            className="mt-1"
          />
          <Label htmlFor="gdpr" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
            I agree that Ellenox  may process my personal data for the purposes of this request in accordance with the{" "}
            <a href="/privacy" className="text-primary underline hover:no-underline">
              Privacy Policy
            </a>
            . *
          </Label>
        </div>
        {touched.gdprConsent && errors.gdprConsent && <p className="text-xs text-destructive">{errors.gdprConsent}</p>}

        <Button type="submit" size="lg" className="w-full gap-2" disabled={!isValid}>
          <Send className="h-4 w-4" />
          Send Request
        </Button>

        {!isValid && (
          <p className="text-center text-xs text-muted-foreground">
            Please complete all required fields with valid information to submit.
          </p>
        )}
      </div>
    </form>
  )
}
