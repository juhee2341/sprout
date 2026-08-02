import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const pillars = [
  {
    icon: "🧪",
    title: "실험",
    description: "UI 아이디어를 만들고 시험합니다.",
  },
  {
    icon: "⚖️",
    title: "비교",
    description: "여러 접근 방식을 비교합니다.",
  },
  {
    icon: "📖",
    title: "기록",
    description: "엔지니어링 결정을 기록합니다.",
  },
]

export function Why() {
  return (
    <section id="why" className="px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
왜 Sprout인가
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
