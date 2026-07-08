"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Zap, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"

import { businessProducts } from "@/data/business-products"

const navigation = [
  { name: "Home", href: "/" },

  {
    name: "Home EV Charging",
    href: "/shop",
    
  },

  { name: "Installation", href: "/installation" },
  { name: "Compatibility", href: "/compatibility" },

  {
  name: "For Business",
  children: businessProducts.map((product) => ({
    name: product.menuName,
    href: product.href,
    category: product.category,
  })),
},
  

  { name: "App", href: "/app" },
  { name: "About", href: "/about" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary/10 backdrop-blur supports-[backdrop-filter]:bg-primary/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <Link href="/" className="mt-[11px] flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Ellenox logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <div key={item.name} className="group relative">
              {item.children ? (
  <button
    type="button"
    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
  >
    {item.name}
    <ChevronDown className="h-4 w-4" />
  </button>
) : (
  <Link
    href={item.href}
    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
  >
    {item.name}
  </Link>
)}

              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 mt-3 w-56 rounded-xl border bg-background p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" asChild>
            <Link href="/compatibility#calculator">Calculate Savings</Link>
          </Button>
          <Button asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="h-dvh w-[320px] overflow-y-auto pb-8">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-center text-center gap-6 pt-6">

              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Ellenox</span>
              </Link>

              <nav className="flex w-full flex-col items-center gap-2">
                {navigation.map((item) => (
                  <div key={item.name} className="w-full">
                    {item.children ? (
                      <>
                       <button
  type="button"
  onClick={() =>
    setMobileDropdown(
      mobileDropdown === item.name ? null : item.name
    )
  }
  className="relative flex w-full items-center justify-center rounded-lg px-4 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
>
  <span className="text-center">{item.name}</span>

  <ChevronDown
    className={`absolute right-4 h-5 w-5 transition-transform ${
      mobileDropdown === item.name ? "rotate-180" : ""
    }`}
  />
</button>

                        {mobileDropdown === item.name && (
  <div className="mt-3 max-h-[60vh] overflow-y-auto rounded-2xl border bg-background p-3 shadow-sm">
    {["DC Charger", "AC Charger", "Accessory", "Testing Equipment"].map(
      (category) => {
        const products = item.children.filter(
          (child) => child.category === category
        )

        if (products.length === 0) return null

        return (
          <div key={category} className="mb-4 last:mb-0">
            <p className="mb-2 px-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {category}
            </p>

            <div className="flex flex-col gap-2">
              {products.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  className="rounded-xl border bg-muted/40 px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => {
                    setOpen(false)
                    setMobileDropdown(null)
                  }}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        )
      }
    )}
  </div>
)}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block rounded-lg px-4 py-2 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex w-full flex-col items-center gap-3 pt-4">
                <Button variant="outline" asChild>
                  <Link
                    href="/compatibility#calculator"
                    onClick={() => setOpen(false)}
                  >
                    Calculate Savings
                  </Link>
                </Button>

                <Button asChild>
                  <Link href="/shop" onClick={() => setOpen(false)}>
                    Shop Now
                  </Link>
                </Button>
              </div>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}