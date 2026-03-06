"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              We use cookies to improve your experience on our site. By continuing to use the site, you agree to our{" "}
              <Link href="/cookies" className="text-primary underline hover:text-primary/80">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={declineCookies} className="bg-transparent">
              Decline
            </Button>
            <Button size="sm" onClick={acceptCookies}>
              Accept
            </Button>
          </div>
          <button
            onClick={declineCookies}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground md:hidden"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
