export type RoadmapStatus = "done" | "in-progress" | "planned"

export interface RoadmapItem {
  label: string
  status: RoadmapStatus
}

/**
 * Current progress of Sprout. To advance an item, just change its `status`.
 */
export const roadmap: RoadmapItem[] = [
  { label: "프로젝트 초기 설정", status: "done" },
  { label: "랜딩 페이지", status: "in-progress" },
  { label: "모달 플레이그라운드", status: "planned" },
  { label: "토스트 플레이그라운드", status: "planned" },
  { label: "결정 로그", status: "planned" },
]
