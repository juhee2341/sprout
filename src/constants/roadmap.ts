export type RoadmapStatus = "done" | "in-progress" | "planned"

export interface RoadmapItem {
  label: string
  status: RoadmapStatus
}

/**
 * Current progress of Sprout. To advance an item, just change its `status`.
 */
export const roadmap: RoadmapItem[] = [
  { label: "Project Init", status: "done" },
  { label: "Landing Page", status: "in-progress" },
  { label: "Modal Playground", status: "planned" },
  { label: "Toast Playground", status: "planned" },
  { label: "Decision Log", status: "planned" },
]
