export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30 py-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Smart <span className="text-primary">EV charging</span> for modern living
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Ellenox creates premium EV charging solutions that combine elegant design, reliable performance, and smart
            technology for a seamless home charging experience.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Built with real drivers in mind, our chargers offer intuitive control, dependable connectivity, and
            professional-grade quality designed for everyday electric mobility.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            With Ellenox, charging your electric vehicle becomes simple, efficient, and ready for the future.
          </p>
        </div>
      </div>
    </section>
  )
}