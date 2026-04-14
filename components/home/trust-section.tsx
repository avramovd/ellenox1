import { Star } from "lucide-react"

//const testimonials = [
 // {
  //  name: "James Wilson",
  //  role: "Tesla Model 3 Owner",
  //  content:
 //     "Extremely happy with the charging station and professional installation. The team was very friendly and competent.",
  //  rating: 5,
 // },
 // {
 //   name: "Sarah Johnson",
  //  role: "VW ID.4 Owner",
 //   content: "Excellent service from A to Z. The app is very convenient for monitoring charging and costs.",
 //   rating: 5,
 // },
 // {
 //   name: "Michael Brown",
  //  role: "BMW iX3 Owner",
  //  content: "Fast installation and excellent support. I recommend it to all electric vehicle owners.",
  //  rating: 5,
  //},
//]

const stats = [
  { value: "100+", label: "Installations" },
  { value: "98%", label: "Happy Customers" },
  { value: "4", label: "Years Warranty" },
  { value: "24/7", label: "Support" },
]

export function TrustSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-16">

          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted by Customers</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our customers say about Ellenox  charging stations
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

           {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                <div className="mt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>*/}
        </div>
      </div>
    </section>
  )
}
