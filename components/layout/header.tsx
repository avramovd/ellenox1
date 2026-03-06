"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Installation", href: "/installation" },
  { name: "Compatibility", href: "/compatibility" },
  { name: "App", href: "/app" },
  { name: "About", href: "/about" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary/10 backdrop-blur supports-[backdrop-filter]:bg-primary/5">

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="mt-[11px] flex items-center gap-2">
          <Image
  src="/logo.webp"
  alt="Ellenox  logo"
  width={100}
  height={100}
  priority
/>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
  <div className="flex flex-col items-center text-center gap-6 pt-6">

    <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <Zap className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">Ellenox </span>
    </Link>

    <nav className="flex flex-col items-center gap-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => setOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </nav>

    <div className="flex w-full flex-col items-center gap-3 pt-4">
      <Button variant="outline" asChild>
        <Link href="/compatibility#calculator" onClick={() => setOpen(false)}>
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
