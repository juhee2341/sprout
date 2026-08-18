export interface Principle {
  title: string
  description: string
}

/** "왜 Sprout인가" 섹션. 번호(01·02…)는 순서에서 자동으로 만든다. */
export const principles: Principle[] = [
  {
    title: "실험",
    description: "같은 문제를 여러 방식으로 구현해보고 차이를 직접 확인합니다.",
  },
  {
    title: "비교",
    description: "접근 방식마다의 트레이드오프를 나란히 놓고 따져봅니다.",
  },
  {
    title: "기록",
    description: "왜 그 결정을 내렸는지, 근거와 맥락을 함께 남깁니다.",
  },
]
