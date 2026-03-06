import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Cookie Policy | Ellenox ",
  description: "Read how Ellenox  uses cookies and similar technologies to improve website performance and user experience.",
  path: "/cookies",
})

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Cookie Policy</h1>
            <p className="mt-2 text-muted-foreground">Last updated: January 2026</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg mx-auto max-w-3xl">
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They help the
                website remember your preferences and improve the user experience.
              </p>

              <h2>What Cookies We Use</h2>

              <h3>Essential Cookies</h3>
              <p>
                These cookies are essential for the website to function. They enable navigation and use of basic
                features.
              </p>

              <h3>Analytics Cookies</h3>
              <p>
                We use Vercel Analytics to collect anonymous information about how visitors use our website. This helps
                us improve content and functionality.
              </p>

              <h3>Functional Cookies</h3>
              <p>
                These cookies remember your preferences (such as language or region) and provide a personalised
                experience.
              </p>

              <h2>Managing Cookies</h2>
              <p>
                You can control and delete cookies through your browser settings. Please note that disabling some
                cookies may affect the functionality of the website.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions about our cookie policy, please contact us at:
                <strong> info@Ellenox .co.uk</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
