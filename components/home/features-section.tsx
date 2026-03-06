import {
  PiggyBank,
  Smartphone,
  Moon,
  ShieldCheck,
  BadgeCheck,
  RefreshCw,
  Award,
} from "lucide-react"

const features = [
  {
    icon: PiggyBank,
    title: "Save up to 70% on charging costs",
    description:
      "Home charging is significantly cheaper than public stations — up to 8× less. With off-peak electricity tariffs, your savings increase even more.",
  },
  {
    icon: Smartphone,
    title: "Full control from your phone",
    description:
      "Monitor charging in real time, review history and costs, manage access remotely, and share usage with family members via the mobile app.",
  },
  {
    icon: Moon,
    title: "Charge while you sleep",
    description:
      "Schedule charging during night hours to use cheaper electricity and wake up to a fully charged vehicle every morning.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and reliable",
    description:
      "Built-in protection against overload, short circuits, over/under voltage, overheating, and electric shock. Integrated RCD and IP65 protection. Certified CE & TÜV for safe and easy installation.",
  },
  {
    icon: BadgeCheck,
    title: "Up to 4-year warranty",
    description:
      "3-year full warranty as standard, extended to 4 years when installed by an authorised installer — plus expert technical support for complete peace of mind.",
  },
  {
    icon: RefreshCw,
    title: "Future-ready (OCPP)",
    description:
      "OCPP compatibility enables smart energy integration and business or public use. Wi-Fi comes standard, with optional 4G connectivity for areas with weak signal.",
  },

  // ✅ 7th card (bottom-center)
  {
    icon: Award,
    title: "Approved by OZEV for £350 Grant",
    description:
      "Eligible for the OZEV grant — save up to £350 on your home charger installation.",
    isCentered: true,
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose Ellenox ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A complete home EV charging solution — intelligently designed by
            industry experts for efficiency, safety, and long-term reliability.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={[
                "group rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg",
                feature.isCentered
                  ? "md:col-start-1 md:col-end-3 lg:col-start-2 lg:col-end-3"
                  : "",
              ].join(" ")}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}