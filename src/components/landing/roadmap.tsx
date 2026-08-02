import { roadmap, type RoadmapStatus } from "@/constants/roadmap"
import { cn } from "@/lib/utils"

const statusMeta: Record<
  RoadmapStatus,
  { icon: string; label: string; className: string }
> = {
  done: { icon: "✅", label: "Done", className: "text-foreground" },
  "in-progress": {
    icon: "🚧",
    label: "In progress",
    className: "text-foreground",
  },
  planned: { icon: "⬜", label: "Planned", className: "text-muted-foreground" },
}

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-20">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Roadmap</h2>
          <p className="text-sm text-muted-foreground">Current progress</p>
        </div>

        <ul className="flex flex-col gap-2">
          {roadmap.map((item) => {
            const meta = statusMeta[item.status]
            return (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <span className="text-lg" aria-hidden>
                  {meta.icon}
                </span>
                <span className={cn("text-base font-medium", meta.className)}>
                  {item.label}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {meta.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
