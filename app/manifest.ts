import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ellenox  | Smart EV Chargers & Installation",
    short_name: "ellenox ",
    description: "Smart EV chargers with professional installation across the UK.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#03af90",
    lang: "en-GB",
    icons: [
      {
        src: "/favicon.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/favicon.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  }
}
