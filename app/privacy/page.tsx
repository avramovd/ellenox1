import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { buildPageMetadata } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Ellenox ",
  description: "Read how Ellenox  collects, uses, stores, and protects personal data under UK GDPR requirements.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Privacy Policy</h1>
            <p className="mt-2 text-muted-foreground">Last updated: January 2026</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* ТВОЯТ ТЕКСТ */}
            <div className="prose prose-lg mx-auto max-w-3xl">

  <h2>1. Who we are</h2>
  <p>
    This Privacy Policy explains how Ellenox  Ltd (“Ellenox ”, “we”, “us” or “our”) collects, uses and protects your
    personal data when you use our website, request a quote, purchase products, or contact us.
  </p>
  <p>
    For the purposes of UK data protection law, we are the <strong>data controller</strong> of your personal data.
  </p>

  <h2>2. How to contact us</h2>
  <p>
    If you have any questions about this policy or want to exercise your rights, you can contact us at{" "}
    <strong>info@ellenox.uk</strong>.
  </p>

  <h2>3. The personal data we collect</h2>
  <p>Depending on how you interact with us, we may collect:</p>
  <ul>
    <li>
      <strong>Identity and contact details</strong> (name, email address, phone number, address/city)
    </li>
    <li>
      <strong>Quote and installation information</strong> (property details, electrical set-up, preferred installation
      dates, notes you provide)
    </li>
    <li>
      <strong>Vehicle and charging details</strong> (vehicle model, charging preferences, charger configuration where
      relevant)
    </li>
    <li>
      <strong>Order and payment information</strong> (items purchased, invoices, payment status).{" "}
      <em>We do not store full card details.</em>
    </li>
    <li>
      <strong>Technical data</strong> (IP address, device/browser info, pages visited, approximate location derived from
      IP)
    </li>
    <li>
      <strong>Marketing preferences</strong> (whether you opted in/out of marketing)
    </li>
  </ul>

  <h2>4. Where we get your data from</h2>
  <ul>
    <li>Directly from you (forms, checkout, emails, phone calls)</li>
    <li>From your device when you use our website (cookies and similar technologies)</li>
    <li>From partners involved in delivering services you request (e.g., installers), where necessary</li>
  </ul>

  <h2>5. How we use your data and our legal bases</h2>
  <p>
    UK GDPR requires us to have a lawful basis for using your data. We use your data for the purposes below:
  </p>
  <ul>
    <li>
      <strong>To respond to enquiries and provide quotes</strong> (e.g., contacting you about a consultation) —{" "}
      <strong>legitimate interests</strong> and/or <strong>pre-contract steps</strong>
    </li>
    <li>
      <strong>To process orders and deliver products/services</strong> — <strong>contract</strong>
    </li>
    <li>
      <strong>To arrange installation where requested</strong> (including sharing details with an installer) —{" "}
      <strong>contract</strong> and/or <strong>legitimate interests</strong>
    </li>
    <li>
      <strong>To provide customer support</strong> — <strong>legitimate interests</strong>
    </li>
    <li>
      <strong>To manage payments, accounting and fraud prevention</strong> — <strong>contract</strong>,{" "}
      <strong>legal obligation</strong> and <strong>legitimate interests</strong>
    </li>
    <li>
      <strong>To improve our website and services</strong> (analytics, performance, debugging) —{" "}
      <strong>legitimate interests</strong> (and <strong>consent</strong> where required for cookies)
    </li>
    <li>
      <strong>To send marketing</strong> (news, offers) — <strong>consent</strong> where required under PECR, or{" "}
      <strong>legitimate interests</strong> where permitted (you can opt out any time)
    </li>
  </ul>

  <h2>6. Marketing communications</h2>
  <p>
    We will only send you marketing emails or SMS where we are allowed to do so under PECR. You can opt out at any time
    by using the unsubscribe link in our emails or by contacting us at <strong>info@ellenox.uk</strong>.
  </p>

  <h2>7. Cookies and similar technologies</h2>
  <p>
    We use cookies and similar technologies to make the website work, improve performance and understand how it is used.
    Where required, we will ask for your consent before placing non-essential cookies. You can manage your cookie
    preferences at any time.
  </p>

  <h2>8. Who we share your data with</h2>
  <p>We do not sell your personal data. We may share it with trusted third parties, such as:</p>
  <ul>
    <li>Installation partners (only the details needed to provide the service you requested)</li>
    <li>Payment and fraud prevention providers</li>
    <li>Delivery and logistics providers</li>
    <li>IT, hosting and website service providers</li>
    <li>Professional advisers (e.g., accountants, insurers) where necessary</li>
  </ul>
  <p>
    Where we use service providers, they act under appropriate contractual terms and are required to protect your data.
  </p>

  <h2>9. International transfers</h2>
  <p>
    Some of our suppliers may process data outside the UK. If we transfer personal data internationally, we will ensure
    appropriate safeguards are in place (for example, UK adequacy regulations or approved contractual protections).
  </p>

  <h2>10. How long we keep your data</h2>
  <p>
    We keep personal data only for as long as needed for the purposes described in this policy, including legal,
    accounting and reporting requirements. As a general guide:
  </p>
  <ul>
    <li>Quote and enquiry records: typically retained for a reasonable period to manage follow-ups and support</li>
    <li>Order and invoice records: retained as required for accounting and tax purposes</li>
    <li>Marketing preferences: retained until you opt out or we no longer need the information</li>
  </ul>

  <h2>11. Security</h2>
  <p>
    We take reasonable technical and organisational measures to protect your personal data, including access controls,
    secure storage and encryption where appropriate. No method of transmission or storage is 100% secure, but we work to
    maintain safeguards proportionate to the risks.
  </p>

  <h2>12. Your rights</h2>
  <p>Under UK GDPR, you may have the right to:</p>
  <ul>
    <li>Access your personal data</li>
    <li>Correct inaccurate or incomplete data</li>
    <li>Request deletion of your data (in certain circumstances)</li>
    <li>Restrict or object to processing (in certain circumstances)</li>
    <li>Request data portability (where applicable)</li>
    <li>Withdraw consent at any time (where we rely on consent)</li>
  </ul>
  <p>
    To exercise your rights, contact us at <strong>info@ellenox.uk</strong>.
  </p>

  <h2>13. Complaints</h2>
  <p>
    If you are not satisfied with how we handle your data, you have the right to complain to the UK Information
    Commissioner’s Office (ICO). We would appreciate the chance to address your concerns first, so please contact us
    before submitting a complaint.
  </p>

  <h2>14. Children</h2>
  <p>
    Our website and services are not intended for children, and we do not knowingly collect personal data from children.
  </p>

  <h2>15. Automated decision-making</h2>
  <p>
    We do not use your personal data to make solely automated decisions that produce legal or similarly significant
    effects about you.
  </p>

  <h2>16. Changes to this policy</h2>
  <p>
    We may update this policy from time to time. When we do, we will update the “Last updated” date at the top of this
    page.
  </p>

              {/* ... постави останалата част от текста ти тук ... */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
