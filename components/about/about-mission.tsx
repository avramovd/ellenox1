import { Check } from "lucide-react"

const values = [
  {
    title: "Our Mission",
    description:
      "To make home EV charging accessible, convenient and reliable for every electric vehicle owner in the UK.",
    bullets: ["Easy installation", "Approved installers", "Quality product", "Customer service", "Easy for use "],
  },
  {
    title: "Our Vision",
    description:
      "For the UK to lead the transition to electric mobility with a well-developed charging infrastructure.",
    bullets: ["Future-ready network", "Smarter energy use", "Seamless EV adoption"],
  },
  {
    title: "Our Values",
    description:
      "Quality, innovation, customer focus and sustainability are at the core of everything we do.",
    bullets: ["Quality first", "Customer obsession", "Sustainable by design"],
  },
]

export function AboutMission() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* One unified container */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-8 md:p-10">
          {/* soft background accents */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-28 -bottom-28 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for real life EV charging
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
              A clear mission, an ambitious vision, and values that keep us focused on what matters.
            </p>
          </div>

          {/* Content (no cards, no icons) */}
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
            {values.map((v, idx) => (
              <div
                key={v.title}
                className={[
                  "relative px-0 md:px-8",
                  idx !== 0 ? "md:border-l md:border-border" : "",
                ].join(" ")}
              >
                <h3 className="text-xl font-semibold tracking-tight">
                  {v.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {v.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            Mission, vision and values — presented in one unified section.
          </div>
        </div>
      </div>
    </section>
  )
}
