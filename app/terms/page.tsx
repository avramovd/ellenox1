import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Terms & Conditions | Ellenox ",
  description: "Review Ellenox  terms for EV charger purchases, installation services, returns, warranties, and website use.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Terms & Conditions</h1>
            <p className="mt-2 text-muted-foreground">Last updated: January 2026</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg mx-auto max-w-3xl">
  <p className="text-sm text-muted-foreground"></p>

  <h2>1. About us</h2>
  <p>
    These Terms & Conditions apply to the use of the Ellenox  website and the purchase of our products and services.
    Ellenox  Ltd (“Ellenox ”, “we”, “us” or “our”) supplies electric vehicle charging equipment and related installation
    services throughout the United Kingdom.
  </p>
  <p>
    By accessing our website, requesting a quote, or placing an order, you agree to be bound by these Terms.
  </p>

  <h2>2. Products and services</h2>
  <p>
    We provide EV charging stations, accessories and professional installation services. Product descriptions, images
    and specifications are provided for guidance only. We reserve the right to make reasonable changes or improvements
    to our products where necessary.
  </p>

  <h2>3. Orders and contract formation</h2>
  <p>
    When you place an order or accept a quotation, you are making an offer to purchase. A contract is formed only when
    we confirm acceptance in writing (email confirmation or invoice).
  </p>
  <p>
    We may decline or cancel an order where there is a pricing error, stock issue, or where installation requirements
    cannot reasonably be met.
  </p>

  <h2>4. Prices and payment</h2>
  <p>
    All prices are shown in pounds sterling (£) and include VAT unless stated otherwise. Payment must be made in full
    before dispatch or installation unless alternative terms are agreed.
  </p>
  <p>
    We accept card payments, bank transfers and other approved methods displayed at checkout.
  </p>

  <h2>5. Delivery</h2>
  <p>
    Delivery times are estimates only. We are not responsible for delays outside our reasonable control. Risk in the
    goods passes to you on delivery. Ownership transfers once full payment has been received.
  </p>

  <h2>6. Installation services</h2>
  <p>
    Installation is carried out by qualified and certified technicians. You agree to provide safe access to the
    property, accurate information about your electrical system, and a suitable installation environment.
  </p>
  <p>
    Additional works required due to unforeseen site conditions may result in extra charges, which will be agreed with
    you before proceeding.
  </p>

  <h2>7. Your consumer rights</h2>
  <p>
    Nothing in these Terms affects your statutory rights under the Consumer Rights Act 2015 or other applicable UK
    consumer protection laws. Goods must be as described, of satisfactory quality and fit for purpose.
  </p>

  <h2>8. Cancellation and returns (cooling-off period)</h2>
  <p>
    If you purchase online or at a distance, you generally have the right to cancel your order within 14 days of
    receiving the goods under the Consumer Contracts Regulations 2013.
  </p>
  <ul>
    <li>Products must be unused and in original packaging</li>
    <li>Return shipping may be your responsibility unless the goods are faulty</li>
    <li>Installed or customised products may not be eligible for return</li>
  </ul>
  <p>
    To request a return, please contact us at <strong>info@Ellenox .co.uk</strong>.
  </p>

  <h2>9. Warranty</h2>
  <p>
    Our charging stations are supplied with a manufacturer’s warranty (typically up to 5 years). This covers
    manufacturing defects only and does not apply to damage caused by misuse, unauthorised modification, improper
    installation or normal wear and tear.
  </p>

  <h2>10. Use of products</h2>
  <p>
    Products must be installed and used in accordance with our instructions and applicable safety regulations. We are
    not responsible for issues arising from unauthorised or non-compliant installation.
  </p>

  <h2>11. Liability</h2>
  <p>
    We do not exclude or limit liability where it would be unlawful to do so, including liability for death or personal
    injury caused by negligence, fraud, or breach of statutory rights.
  </p>
  <p>
    Subject to the above, our liability for any loss or damage arising from your use of our products or services is
    limited to the amount paid for the relevant order. We are not liable for indirect or consequential losses such as
    loss of profit, business interruption or loss of data.
  </p>

  <h2>12. Website use</h2>
  <p>
    You agree not to misuse our website, attempt unauthorised access, or interfere with its operation. All content on
    the website, including text, logos and images, is our property or licensed to us and may not be copied without
    permission.
  </p>

  <h2>13. Privacy</h2>
  <p>
    Your personal data is handled in accordance with our Privacy Policy, which explains how we collect and use your
    information.
  </p>

  <h2>14. Force majeure</h2>
  <p>
    We are not responsible for delays or failures caused by events beyond our reasonable control, including supply
    chain disruptions, extreme weather, or government restrictions.
  </p>

  <h2>15. Changes to these Terms</h2>
  <p>
    We may update these Terms from time to time. The latest version will always be available on our website. Continued
    use of our services after changes means you accept the updated Terms.
  </p>

  <h2>16. Governing law</h2>
  <p>
    These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive
    jurisdiction of the courts of England and Wales.
  </p>

  <h2>17. Contact</h2>
  <p>
    For any questions regarding these Terms, please contact us at <strong>info@Ellenox .co.uk</strong>.
  </p>
</div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
