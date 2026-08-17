/**
 * 하나의 선택지를 "어느 쪽이 정답인가"가 아니라
 * "어떤 상황에서 어떤 대가를 치르는가"로 설명하는 단위.
 * 플레이그라운드 기능들이 공통으로 쓴다.
 */
export interface DecisionGuide {
  /** 이 옵션이 무엇을 정하는지 한 줄로 */
  summary: string
  /** 이 선택이 자주 쓰이는 상황 */
  fits: string[]
  /** 신중하게 고려해야 하는 상황 */
  careful: string[]
  /** 양쪽 방향이 각각 무엇을 얻고 무엇을 내주는지 */
  tradeOffs: TradeOff[]
  /** 겉으로 드러나지 않는 판단 근거 — 이 Playground 의 핵심 */
  why: string
  /** 인용 가능한 1차 출처. 추측은 넣지 않는다. */
  evidence?: Evidence[]
}

export interface TradeOff {
  label: string
  points: string[]
}

export interface Evidence {
  source: string
  detail: string
  url: string
}
