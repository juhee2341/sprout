"use client"

import { useCallback, useState } from "react"

export type ModalSize = "sm" | "md" | "lg" | "full"
export type ModalFooter = "default" | "none" | "custom"

export interface ModalPlaygroundState {
  /** 배경(overlay) 클릭으로 닫기 허용 */
  overlayClose: boolean
  /** ESC 키로 닫기 허용 */
  escClose: boolean
  size: ModalSize
  title: string
  description: string
  footer: ModalFooter
  confirmText: string
  cancelText: string
}

/** boolean 값을 가진 키만 추출 — toggle 대상 */
export type ModalToggleKey = {
  [K in keyof ModalPlaygroundState]: ModalPlaygroundState[K] extends boolean
    ? K
    : never
}[keyof ModalPlaygroundState]

export const initialModalState: ModalPlaygroundState = {
  overlayClose: true,
  escClose: true,
  size: "md",
  title: "Delete account",
  description: "This action cannot be undone.",
  footer: "default",
  confirmText: "Confirm",
  cancelText: "Cancel",
}

/**
 * Modal Playground 의 설정 상태를 관리한다.
 * - `toggle`: boolean 옵션 반전 (overlayClose, escClose)
 * - `set`: 나머지 필드(size, title, footer 등) 갱신
 */
export function useModalPlayground() {
  const [state, setState] = useState<ModalPlaygroundState>(initialModalState)

  const toggle = useCallback((key: ModalToggleKey) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const set = useCallback(
    <K extends keyof ModalPlaygroundState>(
      key: K,
      value: ModalPlaygroundState[K]
    ) => {
      setState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  return { state, toggle, set }
}
