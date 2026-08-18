import Link from "next/link"

import {
  progressLabel,
  roadmap,
  statusLabel,
  type RoadmapItem,
  type RoadmapStatus,
} from "@/constants/roadmap"
import { cn } from "@/lib/utils"

import { SectionHeader } from "./SectionHeader"

/** 점과 상태 문구는 같은 색을 쓴다 — 색만으로 구분되지 않도록 문구를 함께 둔다 */
const dotClass: Record<RoadmapStatus, string> = {
  done: "bg-brand-label shadow-[0_0_0_1px_var(--brand-label)]",
  "in-progress": "bg-brand-accent shadow-[0_0_0_1px_var(--brand-accent)]",
  planned: "bg-brand-dim-dot shadow-[0_0_0_1px_var(--brand-dim-dot)]",
}

const statusClass: Record<RoadmapStatus, string> = {
  done: "text-brand-label",
  "in-progress": "text-brand-accent",
  planned: "text-brand-dim-dot",
}

function RoadmapRow({ item }: { item: RoadmapItem }) {
  const content = (
    <>
      <span
        className={cn(
          "text-[17px] font-medium",
          item.status === "planned" ? "text-brand-dim" : "text-brand-fg-row"
        )}
      >
        {item.label}
      </span>
      <span
        className={cn(
          "font-mono text-[12px] tracking-[0.04em]",
          statusClass[item.status]
        )}
      >
        {statusLabel[item.status]}
      </span>
    </>
  )

  return (
    <li className="relative flex items-center py-[18px]">
      {/* 타임라인 선 위에 얹히는 점 */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 left-[-32px] size-[11px] -translate-y-1/2 rounded-full border-2 border-brand-bg",
          dotClass[item.status]
        )}
      />

      {item.href ? (
        <Link
          href={item.href}
          className="flex flex-1 items-center justify-between gap-4 transition-opacity hover:opacity-70 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
        >
          {content}
        </Link>
      ) : (
        <div className="flex flex-1 items-center justify-between gap-4">
          {content}
        </div>
      )}
    </li>
  )
}

export function Roadmap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="mx-auto w-full max-w-[1280px] px-14 pb-[140px]"
    >
      <SectionHeader
        id="roadmap-title"
        title="로드맵"
        label={progressLabel()}
      />

      <div className="relative pl-8">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-brand-line"
        />
        <ul>
          {roadmap.map((item) => (
            <RoadmapRow key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
