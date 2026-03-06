import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AppHero } from "@/components/app/app-hero"
import { AppGuide } from "@/components/app/app-guide"
import { AppScreenshots } from "@/components/app/app-screenshots"

export const metadata = {
  title: "App | Ellenox  EV Charging Stations",
  description: "Control your electric vehicle charging with the Ellenox  mobile app. Available for iOS and Android.",
}

export default function AppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AppHero />
        <AppGuide />
        <AppScreenshots />
      </main>
      <Footer />
    </div>
  )
}
