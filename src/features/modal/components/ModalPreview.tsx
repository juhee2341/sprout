"use client"

import { Loader2, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  hasCancelButton,
  hasConfirmButton,
  type FooterLayout,
  type ModalPlaygroundState,
  type ModalSize,
} from "../hooks/useModalPlayground"

const sizeClass: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  full: "max-w-[calc(100vw-2rem)]",
}

const footerLayoutClass: Record<FooterLayout, string> = {
  end: "flex flex-wrap justify-end gap-2",
  between: "flex flex-wrap justify-between gap-2",
  stacked: "flex flex-col gap-2",
}

/** Long Content 를 켰을 때 본문에 채워 넣는 더미 문단 */
const longParagraphs = [
  "이 문단은 본문이 길어졌을 때 어디가 스크롤되는지 보여주려고 채워 넣은 내용이에요. 제목과 푸터 버튼이 제자리에 남아 있는지 확인해 보세요.",
  "본문만 스크롤되면 사용자는 스크롤을 아무리 내려도 결정 버튼을 잃지 않아요. 반대로 모달 전체가 스크롤되면 버튼은 맨 아래에서만 만날 수 있어요.",
  "약관 동의처럼 끝까지 읽게 만들어야 하는 화면에서는 후자가 오히려 의도된 설계일 수 있어요.",
  "스크롤 영역에는 키보드로도 닿을 수 있어야 해요. 이 영역은 탭으로 포커스를 받아 방향키로 스크롤됩니다.",
  "여기까지 내려왔다면 제목과 버튼이 그대로 보이는지 확인해 보세요.",
]

/**
 * 실제 Radix Dialog 를 여는 미리보기. 더미가 아니라 진짜 focus trap·portal 이
 * 동작하며, Controls 의 설정이 닫기 동작·크기·내용·푸터를 실시간으로 바꾼다.
 */
export function ModalPreview({ state }: { state: ModalPlaygroundState }) {
  const confirmRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const showConfirm = hasConfirmButton(state)
  const showCancel = hasCancelButton(state)
  const isCustomFooter = state.footer === "custom"
  const isStacked = state.footerLayout === "stacked" && !isCustomFooter

  const confirmButton = showConfirm ? (
    <Dialog.Close key="confirm" asChild>
      <Button
        ref={confirmRef}
        variant={state.confirmTone === "destructive" ? "destructive" : "default"}
        disabled={state.loading}
        aria-busy={state.loading}
        className={cn(isStacked && "w-full")}
      >
        {state.loading && (
          <Loader2 aria-hidden className="motion-safe:animate-spin" />
        )}
        {state.confirmText}
      </Button>
    </Dialog.Close>
  ) : null

  const cancelButton = showCancel ? (
    <Dialog.Close key="cancel" asChild>
      <Button
        ref={cancelRef}
        variant="outline"
        className={cn(isStacked && "w-full")}
      >
        {state.cancelText}
      </Button>
    </Dialog.Close>
  ) : null

  // DOM 순서가 곧 탭 순서 — 시각 순서만 뒤집지 않고 순서 자체를 바꾼다.
  const actions =
    state.buttonOrder === "confirmFirst"
      ? [confirmButton, cancelButton]
      : [cancelButton, confirmButton]

  return (
    <Dialog.Root>
      <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-card">
        <Dialog.Trigger asChild>
          <Button size="lg" className="h-11 px-6 text-base">
            모달 열기
          </Button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            const target =
              state.initialFocus === "confirm"
                ? confirmRef.current
                : state.initialFocus === "cancel"
                  ? cancelRef.current
                  : null
            // 처리 중이라 비활성인 버튼으로는 포커스를 옮길 수 없다.
            // 이때 기본 동작을 막으면 포커스가 모달 밖에 남는다.
            if (!target || target.disabled) return
            event.preventDefault()
            target.focus()
          }}
          onEscapeKeyDown={(event) => {
            if (!state.escClose) event.preventDefault()
          }}
          onPointerDownOutside={(event) => {
            if (!state.overlayClose) event.preventDefault()
          }}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg focus:outline-none",
            sizeClass[state.size]
          )}
        >
          <Dialog.Title
            className={cn(
              "text-lg font-semibold",
              state.closeButton && "pr-8"
            )}
          >
            {state.title}
          </Dialog.Title>

          {state.closeButton && (
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="닫기"
                className="absolute top-4 right-4"
              >
                <X aria-hidden />
              </Button>
            </Dialog.Close>
          )}

          {/* 본문 — Long Content 일 때만 스크롤 영역이 되고, 키보드로도 닿는다 */}
          <div
            {...(state.longContent
              ? { role: "region", "aria-label": "모달 본문", tabIndex: 0 }
              : {})}
            className={cn(
              "mt-2",
              state.longContent &&
                "max-h-[40vh] overflow-y-auto rounded-md pr-2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            )}
          >
            <Dialog.Description className="text-sm text-muted-foreground">
              {state.description}
            </Dialog.Description>

            {state.longContent && (
              <div className="mt-3 flex flex-col gap-3 text-sm text-muted-foreground">
                {longParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          {showConfirm &&
            (isCustomFooter ? (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
                <Button variant="ghost">다시 보지 않기</Button>
                <div className="flex gap-2">{actions}</div>
              </div>
            ) : (
              <div
                className={cn("mt-6", footerLayoutClass[state.footerLayout])}
              >
                {actions}
              </div>
            ))}

          {state.loading && showConfirm && (
            <span role="status" className="sr-only">
              처리 중
            </span>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
