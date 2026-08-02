"use client"

import { Label } from "radix-ui"

import { Switch } from "@/components/ui/switch"

import type {
  ModalPlaygroundState,
  ModalToggleKey,
} from "../hooks/useModalPlayground"
import { toggleControls } from "../modal.data"

interface ModalControlsProps {
  state: ModalPlaygroundState
  onToggle: (key: ModalToggleKey) => void
}

export function ModalControls({ state, onToggle }: ModalControlsProps) {
  return (
    <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
      {toggleControls.map((control) => {
        const switchId = `control-${control.key}`
        const labelId = `${switchId}-label`

        return (
          <div
            key={control.key}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="flex flex-col gap-0.5">
              <Label.Root
                id={labelId}
                htmlFor={switchId}
                className="text-sm font-medium"
              >
                {control.label}
              </Label.Root>
              <span className="text-xs text-muted-foreground">
                {control.description}
              </span>
            </div>

            <Switch
              id={switchId}
              aria-labelledby={labelId}
              checked={state[control.key]}
              onCheckedChange={() => onToggle(control.key)}
            />
          </div>
        )
      })}
    </div>
  )
}
