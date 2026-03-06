import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/app",
    "/compatibility",
    "/installation",
    "/shop",
    "/shop/request-quote",
    "/privacy",
    "/terms",
    "/cookies",
  ]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/shop" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/shop" ? 0.9 : 0.7,
  }))
}
