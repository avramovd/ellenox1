export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30 py-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Your partner in <span className="text-primary">electric mobility</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Ellenox  was created with a clear purpose: to redefine the home EV charging experience. Our EV chargers are
            designed by industry experts following more than five years of development and real-world feedback,
            shaped around what drivers truly expect from modern charging.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            We deliver intelligent charging solutions that blend refined aesthetics, advanced technology, and
            uncompromising reliability. Every detail is engineered to meet real user needs — from seamless connectivity
            and smart control to safe, professional installation.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Charging is no longer a routine task; it becomes a natural, effortless part of modern living. Ellenox  is the
            choice for those who value quality, confidence, and forward-thinking mobility — today and for the electric
            future ahead.
          </p>
        </div>
      </div>
    </section>
  )
}