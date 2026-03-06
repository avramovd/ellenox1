const team = [
  {
    name: "George Peters",
    role: "Managing Director",
    image: "/team-member-1.jpg",
  },
  {
    name: "Mary Evans",
    role: "Sales Director",
    image: "/team-member-2.jpg",
  },
  {
    name: "Peter Davies",
    role: "Technical Director",
    image: "/team-member-3.jpg",
  },
  {
    name: "Elena Smith",
    role: "Customer Service",
    image: "/team-member-4.jpg",
  },
]

export function AboutTeam() {
  return (
    <section className="py-16" id="partners">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Our Team(add description)</h2>
          <p className="mt-4 text-lg text-muted-foreground">Professionals dedicated to your satisfaction</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-muted">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

