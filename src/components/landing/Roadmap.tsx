import Link from "next/link"

import {
  roadmap,
  type RoadmapItem,
  type RoadmapStatus,
} from "@/constants/roadmap"
import { cn } from "@/lib/utils"

const statusMeta: Record<
  RoadmapStatus,
  { icon: string; label: string; className: string }
> = {
  done: { icon: "✅", label: "완료", className: "text-foreground" },
  "in-progress": {
    icon: "🚧",
    label: "진행 중",
    className: "text-foreground",
  },
  planned: { icon: "⬜", label: "예정", className: "text-muted-foreground" },
}

const rowBase =
  "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"

function RoadmapRow({ item }: { item: RoadmapItem }) {
  const meta = statusMeta[item.status]

  const content = (
    <>
      <span className="text-lg" aria-hidden>
        {meta.icon}
      </span>
      <span className={cn("text-base font-medium", meta.className)}>
        {item.label}
      </span>
      <span className="ml-auto text-xs text-muted-foreground">
        {meta.label}
      </span>
      {item.href && (
        <span
          aria-hidden
          className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </>
  )

  if (!item.href) {
    return <li className={rowBase}>{content}</li>
  }

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          rowBase,
          "group transition-colors hover:border-foreground/20 hover:bg-muted/50"
        )}
      >
        {content}
      </Link>
    </li>
  )
}

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-20">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">로드맵</h2>
          <p className="text-sm text-muted-foreground">현재 진행 상황</p>
        </div>

        <ul className="flex flex-col gap-2">
          {roadmap.map((item) => (
            <RoadmapRow key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
