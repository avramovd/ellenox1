import Link from "next/link"
import Image from "next/image"
import { Zap, Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Shop", href: "/shop" },
    { name: "Installation", href: "/installation" },
    { name: "Compatibility", href: "/compatibility" },
    { name: "App", href: "/app" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/about#contact" },
    { name: "Partners", href: "/about#partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary/20">

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
                  <Image
  src="/logo.webp"
  alt="Ellenox  logo"
  width={100}
  height={100}
  priority
/>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
  Reliable home EV charging solutions designed for safety, efficiency, and everyday convenience. Power your journey with confidence.
</p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Products</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@ellenox.uk" className="hover:text-foreground">
                    info@ellenox.uk
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+442080500852" className="hover:text-foreground">
                  +44 20 8050 0852
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span> Carelia Court, Graham Road<br />
  London, United Kingdom<br />
  W4 5DR</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
  <div className="flex flex-col items-center gap-4 text-center">

    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} Ellenox . All rights reserved.
    </p>

    <p className="text-sm text-muted-foreground">
      RWebsite by{" "}
      <a
        href="https://devorasolutions.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary hover:underline"
      >
        Devora Solutions
      </a>
    </p>

    <div className="flex gap-6">
      {footerLinks.legal.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {link.name}
        </Link>
      ))}
    </div>

  </div>
</div>

      </div>
    </footer>
  )
}
