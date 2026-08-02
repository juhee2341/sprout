import type {
  ModalFooter,
  ModalSize,
  ModalToggleKey,
} from "./hooks/useModalPlayground"

export interface ToggleControl {
  key: ModalToggleKey
  label: string
  description: string
}

export const toggleControls: ToggleControl[] = [
  {
    key: "overlayClose",
    label: "Overlay Click",
    description: "배경을 클릭하면 닫힙니다.",
  },
  {
    key: "escClose",
    label: "ESC Close",
    description: "ESC 키로 닫힙니다.",
  },
]

export const sizeOptions: { value: ModalSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
]

export const footerOptions: { value: ModalFooter; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "none", label: "None" },
  { value: "custom", label: "Custom" },
]

export type LearningTone = "tip" | "warn"

export interface LearningNote {
  tone: LearningTone
  text: string
}

/**
 * 옵션 하나당 학습 포인트 하나. "설정을 바꾸는 Playground"가 아니라
 * "왜 이 설정을 선택하는지 배우는 Playground"가 되게 하는 핵심 콘텐츠.
 */
export const learningNotes: Record<string, LearningNote[]> = {
  overlayClose: [
    { tone: "tip", text: "일반적인 확인 모달에는 적합합니다." },
    { tone: "warn", text: "긴 입력 폼이나 결제 화면에서는 비활성화를 고려하세요." },
  ],
  escClose: [
    { tone: "tip", text: "대부분의 모달에서 사용자가 기대하는 닫기 방식입니다." },
    {
      tone: "warn",
      text: "삭제 같은 파괴적 확인에서는 실수 방지를 위해 끄기도 합니다.",
    },
  ],
  size: [
    { tone: "tip", text: "콘텐츠 양에 맞추세요 — 확인창은 Small, 폼은 Large." },
    { tone: "warn", text: "Full 은 모바일·복잡한 흐름에만; 단순 확인엔 과합니다." },
  ],
  content: [
    { tone: "tip", text: "Title·Description 은 props 로 즉시 반영됩니다." },
    {
      tone: "warn",
      text: "Title 은 접근성상 항상 필요합니다 — 비우지 마세요.",
    },
  ],
  footer: [
    { tone: "tip", text: "명확한 액션이 필요하면 Default 를 쓰세요." },
    {
      tone: "warn",
      text: "None 은 X·ESC·Overlay 등 다른 닫기 수단이 반드시 있어야 합니다.",
    },
  ],
  buttons: [
    {
      tone: "tip",
      text: '버튼 문구는 액션을 구체적으로 — "삭제"가 "확인"보다 명확합니다.',
    },
  ],
}
