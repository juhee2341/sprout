import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const pillars = [
  {
    icon: "🧪",
    title: "Experiment",
    description: "Build and test UI ideas.",
  },
  {
    icon: "⚖️",
    title: "Compare",
    description: "Compare different approaches.",
  },
  {
    icon: "📖",
    title: "Document",
    description: "Record engineering decisions.",
  },
]

export function Why() {
  return (
    <section id="why" className="px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Why Sprout
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title}>
              <CardHeader className="gap-3">
                <span className="text-3xl" aria-hidden>
                  {pillar.icon}
                </span>
                <CardTitle className="text-lg">{pillar.title}</CardTitle>
                <CardDescription className="text-base">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
