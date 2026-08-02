import type { ModalToggleKey } from "./hooks/useModalPlayground"

export interface ToggleControl {
  key: ModalToggleKey
  label: string
  description: string
}

/**
 * Controls 패널에 렌더할 토글 정의. 데이터 주도로 두어 후속 컨트롤을
 * 여기에 추가하기만 하면 UI 가 확장되도록 한다.
 */
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
