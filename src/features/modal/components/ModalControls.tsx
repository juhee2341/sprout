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
import { footerOptions, sizeOptions, toggleControls } from "../modal.data"
import { DecisionGuide } from "./DecisionGuide"

interface ModalControlsProps {
  state: ModalPlaygroundState
  onToggle: (key: ModalToggleKey) => void
  onChange: <K extends keyof ModalPlaygroundState>(
    key: K,
    value: ModalPlaygroundState[K]
  ) => void
}

export function ModalControls({ state, onToggle, onChange }: ModalControlsProps) {
  const sizeLabel = sizeOptions.find((o) => o.value === state.size)?.label ?? ""
  const footerLabel =
    footerOptions.find((o) => o.value === state.footer)?.label ?? ""

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
            <DecisionGuide decisionKey={control.key} label={control.label} />
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
        <DecisionGuide
          decisionKey={`size:${state.size}`}
          label={`Size — ${sizeLabel}`}
        />
      </div>

      {/* Title / Description */}
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-title">Title</Label>
          <Input
            id="modal-title"
            value={state.title}
            placeholder="타이틀 영역이에요"
            onChange={(event) => onChange("title", event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-description">Description</Label>
          <Input
            id="modal-description"
            value={state.description}
            placeholder="디스크립션 영역이에요"
            onChange={(event) => onChange("description", event.target.value)}
          />
        </div>
        <DecisionGuide decisionKey="content" label="Title·Description" />
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
        <DecisionGuide
          decisionKey={`footer:${state.footer}`}
          label={`Footer — ${footerLabel}`}
        />
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
          <DecisionGuide decisionKey="buttons" label="Button Text" />
        </div>
      )}
    </div>
  )
}
