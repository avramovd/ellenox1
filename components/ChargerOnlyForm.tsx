"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Send } from "lucide-react"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

type ChargerOnlyFormProps = {
  productName: string
  price?: number
}

export function ChargerOnlyForm({ productName, price }: ChargerOnlyFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fullAddress: "",
    quantity: "1",
    deliveryNotes: "",
    gdprConsent: false,
  })

  const errors = useMemo(() => {
    const e: Record<string, string> = {}

    if (!formData.name.trim()) e.name = "Required"

    if (!formData.email.trim()) e.email = "Required"
    else if (!emailRegex.test(formData.email.trim())) e.email = "Invalid email format"

    if (!formData.phone.trim()) e.phone = "Required"
    if (!formData.fullAddress.trim()) e.fullAddress = "Required"

    const qtyNum = Number(formData.quantity)
    if (!formData.quantity.trim()) e.quantity = "Required"
    else if (!Number.isFinite(qtyNum) || !Number.isInteger(qtyNum) || qtyNum < 1 || qtyNum > 10) e.quantity = "Enter 1–10"

    if (!formData.gdprConsent) e.gdprConsent = "Consent is required"

    return e
  }, [formData])

  const isValid = Object.keys(errors).length === 0

  const markTouched = (key: string) => setTouched((p) => ({ ...p, [key]: true }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid || isLoading) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        fullAddress: true,
        quantity: true,
        gdprConsent: true,
      })
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        fullAddress: formData.fullAddress.trim(),
        deliveryNotes: formData.deliveryNotes.trim(),
        quantity: Number(formData.quantity),
        variant: "charger_only",
        productName,
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        alert(data?.error ?? "Checkout failed")
        return
      }

      if (data?.url) {
        window.location.href = data.url
        return
      }

      alert("Missing checkout url")
    } catch (err) {
      alert("Network error")
    } finally {
      setIsLoading(false)
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
          Thank you. We will contact you shortly to confirm the delivery details and availability.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">Check your email for confirmation.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-background p-6 md:p-8">
      <h2 className="text-xl font-bold">Request Charger Only {price ? `— £${price}` : ""}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Fill in your delivery and contact details</p>

      <div className="mt-6 space-y-6">
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground">Product</p>
          <p className="font-medium">{productName}</p>
          {price !== undefined && <p className="mt-1 text-sm text-muted-foreground">Price: £{price}</p>}
        </div>

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
            <Label htmlFor="phone">Phone *</Label>
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
          <Label htmlFor="fullAddress">Full delivery address *</Label>
          <Input
            id="fullAddress"
            required
            value={formData.fullAddress}
            onBlur={() => markTouched("fullAddress")}
            onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
            placeholder="Street, number, city, post code"
          />
          {touched.fullAddress && errors.fullAddress && (
            <p className="text-xs text-destructive">{errors.fullAddress}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={10}
            required
            value={formData.quantity}
            onBlur={() => markTouched("quantity")}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
          {touched.quantity && errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryNotes">Delivery notes (optional)</Label>
          <Textarea
            id="deliveryNotes"
            value={formData.deliveryNotes}
            onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
            placeholder="Entrance code, floor, contact person, preferred delivery time..."
            rows={3}
          />
        </div>

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

        <Button type="submit" size="lg" className="w-full gap-2" disabled={!isValid || isLoading}>
          <Send className="h-4 w-4" />
          {isLoading ? "Redirecting..." : "Pay with Stripe"}
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
