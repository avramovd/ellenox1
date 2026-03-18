import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { CookieBanner } from "@/components/ui/cookie-banner"
import {
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Smart EV Chargers & Installation`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: [
    "EV charger",
    "home EV charging",
    "smart EV charger",
    "EV charger installation UK",
    "Type 2 EV charger",
    "dynamic load balancing charger",
    "OCPP charger",
  ],
  creator: SITE_LEGAL_NAME,
  publisher: SITE_LEGAL_NAME,
  authors: [{ name: SITE_LEGAL_NAME, url: SITE_URL }],
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
    shortcut: "/favicon.webp",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} | Smart EV Chargers & Installation`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: DEFAULT_LOCALE,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Smart EV Charger`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Smart EV Chargers & Installation`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo.webp"),
  email: "info@ellenox.uk",
  telephone: "+442080500852",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Electric Avenue",
    addressLocality: "London",
    postalCode: "EC1A 1BB",
    addressCountry: "GB",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-GB",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
