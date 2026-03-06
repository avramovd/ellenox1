import { Download, LogIn, Wifi, Zap } from "lucide-react"

const steps = [
  {
    icon: Download,
    title: "Download the App",
    description: "Get Ellenox  from the App Store or Google Play for free",
  },
  {
    icon: LogIn,
    title: "Create an Account",
    description: "Sign up with email or log in with Google/Apple",
  },
  {
    icon: Wifi,
    title: "Connect Your Charger",
    description: "Scan the QR code on your charging station",
  },
  {
    icon: Zap,
    title: "Start Charging",
    description: "Control charging and track your statistics",
  },
]

export function AppGuide() {
  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">How to Get Started</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Set up the app in just a few minutes</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <step.icon className="h-8 w-8" />
              </div>
              
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Step {index + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
