"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

import type {
  ModalFooter,
  ModalPlaygroundState,
  ModalSize,
  ModalToggleKey,
} from "../hooks/useModalPlayground"
import {
  footerOptions,
  learningNotes,
  sizeOptions,
  toggleControls,
  type LearningNote,
} from "../modal.data"

interface ModalControlsProps {
  state: ModalPlaygroundState
  onToggle: (key: ModalToggleKey) => void
  onChange: <K extends keyof ModalPlaygroundState>(
    key: K,
    value: ModalPlaygroundState[K]
  ) => void
}

function LearningNotes({ notes }: { notes?: LearningNote[] }) {
  if (!notes?.length) return null

  return (
    <ul className="mt-2.5 flex flex-col gap-1">
      {notes.map((note) => (
        <li
          key={note.text}
          className="flex gap-1.5 text-xs leading-relaxed text-muted-foreground"
        >
          <span aria-hidden>{note.tone === "tip" ? "💡" : "⚠️"}</span>
          <span>{note.text}</span>
        </li>
      ))}
    </ul>
  )
}

export function ModalControls({ state, onToggle, onChange }: ModalControlsProps) {
  return (
    <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
      {/* Overlay Click / ESC Close */}
      {toggleControls.map((control) => {
        const switchId = `control-${control.key}`
        const labelId = `${switchId}-label`

        return (
          <div key={control.key} className="px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <Label id={labelId} htmlFor={switchId}>
                  {control.label}
                </Label>
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
            <LearningNotes notes={learningNotes[control.key]} />
          </div>
        )
      })}

      {/* Size */}
      <div className="px-4 py-3">
        <span className="text-sm font-medium">Size</span>
        <RadioGroup
          className="mt-2 flex flex-wrap gap-4"
          value={state.size}
          onValueChange={(value) => onChange("size", value as ModalSize)}
        >
          {sizeOptions.map((option) => {
            const id = `size-${option.value}`
            return (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem id={id} value={option.value} />
                <Label htmlFor={id} className="font-normal">
                  {option.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
        <LearningNotes notes={learningNotes.size} />
      </div>

      {/* Title / Description */}
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-title">Title</Label>
          <Input
            id="modal-title"
            value={state.title}
            placeholder="Delete account"
            onChange={(event) => onChange("title", event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-description">Description</Label>
          <Input
            id="modal-description"
            value={state.description}
            placeholder="This action cannot be undone."
            onChange={(event) => onChange("description", event.target.value)}
          />
        </div>
        <LearningNotes notes={learningNotes.content} />
      </div>

      {/* Footer */}
      <div className="px-4 py-3">
        <span className="text-sm font-medium">Footer</span>
        <RadioGroup
          className="mt-2 flex flex-wrap gap-4"
          value={state.footer}
          onValueChange={(value) => onChange("footer", value as ModalFooter)}
        >
          {footerOptions.map((option) => {
            const id = `footer-${option.value}`
            return (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem id={id} value={option.value} />
                <Label htmlFor={id} className="font-normal">
                  {option.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
        <LearningNotes notes={learningNotes.footer} />
      </div>

      {/* Button Text — footer 가 있을 때만 */}
      {state.footer !== "none" && (
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-text">Confirm Text</Label>
            <Input
              id="confirm-text"
              value={state.confirmText}
              onChange={(event) => onChange("confirmText", event.target.value)}
            />
          </div>
          {state.footer === "default" && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cancel-text">Cancel Text</Label>
              <Input
                id="cancel-text"
                value={state.cancelText}
                onChange={(event) => onChange("cancelText", event.target.value)}
              />
            </div>
          )}
          <LearningNotes notes={learningNotes.buttons} />
        </div>
      )}
    </div>
  )
}
