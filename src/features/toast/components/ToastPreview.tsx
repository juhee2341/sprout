"use client"

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react"
import { Toast } from "radix-ui"
import type { ComponentType } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type {
  ToastActionKind,
  ToastInstance,
  ToastPlaygroundState,
  ToastPosition,
  ToastTone,
} from "../hooks/useToastPlayground"

/** 겹쳐 쌓을 때 뒤로 밀리는 간격(px)과 축소 비율 */
const STACK_OFFSET = 10
const STACK_SCALE_STEP = 0.04
/** 이보다 뒤에 있는 토스트는 가려져 보이지 않는다 */
const STACK_MAX_DEPTH = 2

const viewportClass: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4 flex-col-reverse",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse",
}

/** 스와이프로 닫는 방향은 토스트가 붙어 있는 가장자리를 따른다 */
const swipeDirection: Record<ToastPosition, "right" | "up" | "down"> = {
  "top-right": "right",
  "top-center": "up",
  "bottom-right": "right",
  "bottom-center": "down",
}

const toneMeta: Record<
  ToastTone,
  { icon: ComponentType<{ className?: string }>; label: string; className: string }
> = {
  info: { icon: Info, label: "정보", className: "text-foreground" },
  success: { icon: CheckCircle2, label: "성공", className: "text-primary" },
  error: { icon: AlertCircle, label: "오류", className: "text-destructive" },
}

/**
 * 액션 버튼 문구와 altText.
 * altText 는 Radix 가 필수로 요구하는 값 — 이 버튼에 닿기 어려운 사용자를 위한
 * "다른 경로"를 적는 자리다.
 */
const actionMeta: Record<
  Exclude<ToastActionKind, "none">,
  { label: string; altText: string }
> = {
  undo: {
    label: "되돌리기",
    altText: "되돌리기 — 목록 화면의 최근 활동에서도 되돌릴 수 있어요",
  },
  retry: {
    label: "다시 시도",
    altText: "다시 시도 — 목록 화면에서 새로고침으로도 재시도할 수 있어요",
  },
}

function ToastItem({
  toast,
  onDismiss,
  depth,
  growsUpward,
}: {
  toast: ToastInstance
  onDismiss: (id: number) => void
  /** 겹쳐 쌓을 때의 깊이 — 0 이 맨 앞, null 이면 겹치지 않음 */
  depth: number | null
  /** 뒤쪽 카드가 위로 삐져나오는지(하단 배치) */
  growsUpward: boolean
}) {
  const tone = toneMeta[toast.tone]
  const ToneIcon = tone.icon
  const action = toast.action === "none" ? null : actionMeta[toast.action]

  // 겹침 배치는 모든 카드를 같은 자리에 두고 뒤로 갈수록 밀어 넣는다.
  const stackStyle =
    depth === null
      ? undefined
      : {
          gridArea: "1 / 1",
          transform: `translateY(${(growsUpward ? -1 : 1) * depth * STACK_OFFSET}px) scale(${1 - depth * STACK_SCALE_STEP})`,
          zIndex: 50 - depth,
          opacity: depth > STACK_MAX_DEPTH ? 0 : 1,
        }

  return (
    <Toast.Root
      style={stackStyle}
      type={toast.priority}
      duration={toast.duration}
      open
      onOpenChange={(open) => {
        if (!open) onDismiss(toast.id)
      }}
      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-lg data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)"
    >
      {/* 색만으로 성격을 전달하지 않도록 아이콘과 텍스트 라벨을 함께 둔다 */}
      <ToneIcon aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone.className)} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Toast.Title className="text-sm font-medium">
          <span className="sr-only">{`${tone.label}: `}</span>
          {toast.title}
        </Toast.Title>
        {toast.description && (
          <Toast.Description className="text-xs text-muted-foreground">
            {toast.description}
          </Toast.Description>
        )}
      </div>

      {action && (
        <Toast.Action asChild altText={action.altText}>
          <Button variant="outline" size="sm">
            {action.label}
          </Button>
        </Toast.Action>
      )}

      {toast.closeButton && (
        <Toast.Close asChild>
          <Button variant="ghost" size="icon-sm" aria-label="닫기">
            <X aria-hidden />
          </Button>
        </Toast.Close>
      )}
    </Toast.Root>
  )
}

/**
 * 실제 Radix Toast 를 띄우는 미리보기. Controls 의 설정이 위치·유지 시간·
 * 우선순위·개수 제한을 그대로 바꾼다. 이미 떠 있는 토스트는 띄운 시점의
 * 설정을 유지한다 — 실제 토스트도 뜬 뒤에는 바뀌지 않기 때문이다.
 */
export function ToastPreview({
  state,
  toasts,
  pendingCount = 0,
  onPush,
  onDismiss,
  onClear,
}: {
  state: ToastPlaygroundState
  /** 화면에 보일 토스트 (대기 중인 것은 제외) */
  toasts: ToastInstance[]
  /** 뒤에서 차례를 기다리는 개수 */
  pendingCount?: number
  onPush: () => void
  onDismiss: (id: number) => void
  onClear: () => void
}) {
  const isStack = state.stackMode === "stack"
  const growsUpward = state.position.startsWith("bottom")

  return (
    <Toast.Provider label="알림" swipeDirection={swipeDirection[state.position]}>
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card">
        <Button size="lg" className="h-11 px-6 text-base" onClick={onPush}>
          토스트 띄우기
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClear}>
            전부 닫기
          </Button>
          <span className="text-xs text-muted-foreground">
            떠 있는 토스트 {toasts.length}개
            {pendingCount > 0 && ` · 대기 ${pendingCount}개`}
          </span>
        </div>
      </div>

      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          // 배열 끝이 가장 최신 — 겹칠 때 맨 앞에 온다
          depth={isStack ? toasts.length - 1 - index : null}
          growsUpward={growsUpward}
        />
      ))}

      <Toast.Viewport
        label="알림 ({hotkey})"
        className={cn(
          "fixed z-[60] w-[min(24rem,calc(100vw-2rem))] outline-none",
          // 겹침은 모든 카드를 같은 그리드 칸에 포갠다
          isStack ? "grid" : "flex flex-col gap-2",
          viewportClass[state.position]
        )}
      />
    </Toast.Provider>
  )
}
