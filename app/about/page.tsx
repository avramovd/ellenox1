import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
//import { AboutTeam } from "@/components/about/about-team"

export const metadata = {
  title: "About Us | Ellenox  EV Charging Stations",
  description: "Learn more about Ellenox  - a leading provider of smart EV charging stations in the UK.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <AboutMission />
      </main>
      <Footer />
    </div>
  )
}
