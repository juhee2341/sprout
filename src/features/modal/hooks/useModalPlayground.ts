"use client"

import { useCallback, useState } from "react"

export interface ModalPlaygroundState {
  /** 배경(overlay) 클릭으로 닫기 허용 */
  overlayClose: boolean
  /** ESC 키로 닫기 허용 */
  escClose: boolean
}

export type ModalToggleKey = keyof ModalPlaygroundState

const initialState: ModalPlaygroundState = {
  overlayClose: true,
  escClose: true,
}

/**
 * Modal Playground 의 설정 상태를 관리한다. v1 은 토글 2개(overlayClose, escClose).
 * Width·Animation 등은 후속 PR 에서 이 상태에 필드를 추가하며 확장한다.
 */
export function useModalPlayground() {
  const [state, setState] = useState<ModalPlaygroundState>(initialState)

  const toggle = useCallback((key: ModalToggleKey) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  return { state, toggle }
}
