"use client"

import { useCallback, useRef, useState } from "react"

export type ToastPosition =
  | "top-right"
  | "top-center"
  | "bottom-right"
  | "bottom-center"
/** 자동 소멸까지의 시간(ms). "manual" 은 직접 닫을 때까지 유지 */
export type ToastDuration = "3000" | "5000" | "10000" | "manual"
/** Radix Toast 의 type — 스크린 리더가 끊고 읽을지(foreground) 여부 */
export type ToastPriority = "background" | "foreground"
export type ToastTone = "info" | "success" | "error"
export type ToastActionKind = "none" | "undo" | "retry"
export type ToastMaxVisible = "1" | "3" | "unlimited"

export interface ToastPlaygroundState {
  position: ToastPosition
  duration: ToastDuration
  priority: ToastPriority
  tone: ToastTone
  action: ToastActionKind
  maxVisible: ToastMaxVisible
  /** 토스트마다 X 버튼 노출 */
  closeButton: boolean
  title: string
  description: string
}

export type ToastToggleKey = {
  [K in keyof ToastPlaygroundState]: ToastPlaygroundState[K] extends boolean
    ? K
    : never
}[keyof ToastPlaygroundState]

/**
 * 화면에 떠 있는 토스트 하나.
 * 띄우는 순간의 설정을 복사해 둔다 — 실제 토스트도 뜬 뒤에는 바뀌지 않는다.
 */
export interface ToastInstance {
  id: number
  title: string
  description: string
  tone: ToastTone
  priority: ToastPriority
  action: ToastActionKind
  closeButton: boolean
  /** Radix 에 넘길 값 — 자동으로 닫지 않으려면 Infinity */
  duration: number
}

export const initialToastState: ToastPlaygroundState = {
  position: "bottom-right",
  duration: "5000",
  priority: "background",
  tone: "info",
  action: "none",
  maxVisible: "3",
  closeButton: true,
  title: "변경 사항을 저장했어요",
  description: "",
}

/** 설정값을 Radix duration(ms) 으로 변환 */
export function toDurationMs(duration: ToastDuration) {
  return duration === "manual" ? Infinity : Number(duration)
}

/** 동시에 띄울 수 있는 최대 개수 */
export function toVisibleLimit(maxVisible: ToastMaxVisible) {
  return maxVisible === "unlimited" ? Infinity : Number(maxVisible)
}

/**
 * Toast Playground 의 설정과 화면에 떠 있는 토스트 목록을 관리한다.
 * 개수 제한을 넘기면 **오래된 것부터** 밀어낸다 — 최신 상태를 남기는 쪽.
 */
export function useToastPlayground() {
  const [state, setState] = useState<ToastPlaygroundState>(initialToastState)
  const [toasts, setToasts] = useState<ToastInstance[]>([])
  const nextId = useRef(0)

  const toggle = useCallback((key: ToastToggleKey) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const set = useCallback(
    <K extends keyof ToastPlaygroundState>(
      key: K,
      value: ToastPlaygroundState[K]
    ) => {
      setState((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const push = useCallback(() => {
    const instance: ToastInstance = {
      id: nextId.current++,
      title: state.title,
      description: state.description,
      tone: state.tone,
      priority: state.priority,
      action: state.action,
      closeButton: state.closeButton,
      duration: toDurationMs(state.duration),
    }
    const limit = toVisibleLimit(state.maxVisible)

    setToasts((prev) => {
      const next = [...prev, instance]
      return next.length > limit ? next.slice(next.length - limit) : next
    })
  }, [state])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clear = useCallback(() => setToasts([]), [])

  return { state, toasts, toggle, set, push, dismiss, clear }
}
