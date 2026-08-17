"use client"

import { BackLink } from "@/components/layout/BackLink"

import { useToastPlayground } from "../hooks/useToastPlayground"
import { ToastControls } from "./ToastControls"
import { ToastPreview } from "./ToastPreview"

export function ToastPlayground() {
  const { state, toasts, toggle, set, push, dismiss, clear } =
    useToastPlayground()

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <BackLink className="mb-2" />
        <h1 className="text-3xl font-semibold tracking-tight">Toast</h1>
        <p className="text-muted-foreground">
          알림을 언제·어디에·얼마나 띄울지 직접 바꿔보세요.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
        <ToastPreview
          state={state}
          toasts={toasts}
          onPush={push}
          onDismiss={dismiss}
          onClear={clear}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Controls</h2>
        <ToastControls state={state} onToggle={toggle} onChange={set} />
      </section>
    </main>
  )
}
