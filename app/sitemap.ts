import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/shop", changeFrequency: "weekly", priority: 0.9 },
    { path: "/shop/charger-only", changeFrequency: "weekly", priority: 0.8 },
    { path: "/shop/request-quote", changeFrequency: "monthly", priority: 0.6 },
    { path: "/installation", changeFrequency: "monthly", priority: 0.7 },
    { path: "/compatibility", changeFrequency: "monthly", priority: 0.7 },
    { path: "/app", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  ]

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
