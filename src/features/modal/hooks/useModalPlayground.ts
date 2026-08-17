"use client"

import { useCallback, useState } from "react"

export type ModalSize = "sm" | "md" | "lg" | "full"
/** 푸터 구성 — 버튼 두 개 / 하나 / 없음 / 직접 배치 */
export type ModalFooter = "default" | "single" | "none" | "custom"
export type FooterLayout = "end" | "between" | "stacked"
export type ButtonOrder = "cancelFirst" | "confirmFirst"
export type ConfirmTone = "default" | "destructive"
export type InitialFocus = "auto" | "confirm" | "cancel"

export interface ModalPlaygroundState {
  /** 배경(overlay) 클릭으로 닫기 허용 */
  overlayClose: boolean
  /** ESC 키로 닫기 허용 */
  escClose: boolean
  /** 우측 상단 X 닫기 버튼 노출 */
  closeButton: boolean
  /** 본문을 스크롤이 생길 만큼 길게 채움 */
  longContent: boolean
  /** 확인 버튼을 처리 중 상태로 둠 */
  loading: boolean
  size: ModalSize
  title: string
  description: string
  footer: ModalFooter
  footerLayout: FooterLayout
  buttonOrder: ButtonOrder
  confirmTone: ConfirmTone
  initialFocus: InitialFocus
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
  closeButton: true,
  longContent: false,
  loading: false,
  size: "md",
  title: "타이틀 영역이에요",
  description: "디스크립션 영역이에요",
  footer: "default",
  footerLayout: "end",
  buttonOrder: "cancelFirst",
  confirmTone: "default",
  initialFocus: "auto",
  confirmText: "확인",
  cancelText: "취소",
}

/** 확인 버튼이 있는 푸터인지 */
export function hasConfirmButton(state: ModalPlaygroundState) {
  return state.footer !== "none"
}

/** 취소 버튼이 있는 푸터인지 */
export function hasCancelButton(state: ModalPlaygroundState) {
  return state.footer === "default" || state.footer === "custom"
}

/**
 * Modal Playground 의 설정 상태를 관리한다.
 * - `toggle`: boolean 옵션 반전 (overlayClose, escClose, closeButton ...)
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
      setState((prev) => {
        const next = { ...prev, [key]: value }

        // 푸터를 바꾸면 사라진 버튼을 가리키던 초기 포커스가 갈 곳을 잃는다.
        if (key === "footer") {
          if (
            (next.initialFocus === "cancel" && !hasCancelButton(next)) ||
            (next.initialFocus === "confirm" && !hasConfirmButton(next))
          ) {
            next.initialFocus = "auto"
          }
        }

        return next
      })
    },
    []
  )

  return { state, toggle, set }
}
