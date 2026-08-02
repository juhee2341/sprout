"use client"

import { useModalPlayground } from "../hooks/useModalPlayground"
import { ModalControls } from "./ModalControls"
import { ModalPreview } from "./ModalPreview"

export function ModalPlayground() {
  const { state, toggle, set } = useModalPlayground()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Modal</h1>
        <p className="text-muted-foreground">
          토글을 바꿔가며 Modal이 어떻게 동작하는지 직접 만져보세요.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
        <ModalPreview state={state} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">Controls</h2>
        <ModalControls state={state} onToggle={toggle} onChange={set} />
      </section>
    </div>
  )
}
