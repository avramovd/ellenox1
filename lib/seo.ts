import type { Metadata } from "next"

export const SITE_URL = "https://Ellenox.uk"
export const SITE_NAME = "Ellenox "
export const SITE_LEGAL_NAME = "Ellenox "
export const DEFAULT_LOCALE = "en_GB"
export const SITE_DESCRIPTION =
  "Ellenox  delivers smart EV chargers with professional installation, app control, dynamic load balancing, and long-term support across the UK."
export const DEFAULT_OG_IMAGE = "/product.webp"

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  noindex?: boolean
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: false,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
