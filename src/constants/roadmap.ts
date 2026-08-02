export type RoadmapStatus = "done" | "in-progress" | "planned"

export interface RoadmapItem {
  label: string
  status: RoadmapStatus
  /** 진입 가능한 페이지가 있으면 링크 경로 */
  href?: string
}

/**
 * Current progress of Sprout. To advance an item, just change its `status`.
 */
export const roadmap: RoadmapItem[] = [
  { label: "프로젝트 초기 설정", status: "done" },
  { label: "랜딩 페이지", status: "done" },
  {
    label: "모달 플레이그라운드",
    status: "in-progress",
    href: "/components/modal",
  },
  { label: "토스트 플레이그라운드", status: "planned" },
  { label: "결정 로그", status: "planned" },
]
