"use client"

import { Dialog } from "radix-ui"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type {
  ModalPlaygroundState,
  ModalSize,
} from "../hooks/useModalPlayground"

const sizeClass: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  full: "max-w-[calc(100vw-2rem)]",
}

/**
 * 실제 Radix Dialog 를 여는 미리보기. 더미가 아니라 진짜 focus trap·portal 이
 * 동작하며, Controls 의 설정이 닫기 동작·크기·내용·푸터를 실시간으로 바꾼다.
 */
export function ModalPreview({ state }: { state: ModalPlaygroundState }) {
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
          <Dialog.Title className="text-lg font-semibold">
            {state.title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            {state.description}
          </Dialog.Description>

          {state.footer !== "none" && (
            <div className="mt-6 flex justify-end gap-2">
              {state.footer === "default" && (
                <Dialog.Close asChild>
                  <Button variant="outline">{state.cancelText}</Button>
                </Dialog.Close>
              )}
              <Dialog.Close asChild>
                <Button>{state.confirmText}</Button>
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
