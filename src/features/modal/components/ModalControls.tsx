"use client"

import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

import {
  hasCancelButton,
  hasConfirmButton,
  type ButtonOrder,
  type ConfirmTone,
  type FooterLayout,
  type InitialFocus,
  type ModalFooter,
  type ModalPlaygroundState,
  type ModalSize,
  type ModalToggleKey,
} from "../hooks/useModalPlayground"
import {
  buttonOrderOptions,
  closeControls,
  confirmToneOptions,
  footerLayoutOptions,
  footerOptions,
  initialFocusOptions,
  loadingControl,
  longContentControl,
  sizeOptions,
  type DecisionKey,
  type SelectOption,
  type ToggleControl,
} from "../modal.data"
import { DecisionGuide } from "./DecisionGuide"

interface ModalControlsProps {
  state: ModalPlaygroundState
  onToggle: (key: ModalToggleKey) => void
  onChange: <K extends keyof ModalPlaygroundState>(
    key: K,
    value: ModalPlaygroundState[K]
  ) => void
}

function ToggleRow({
  control,
  checked,
  onToggle,
}: {
  control: ToggleControl
  checked: boolean
  onToggle: (key: ModalToggleKey) => void
}) {
  const switchId = `control-${control.key}`
  const labelId = `${switchId}-label`

  return (
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
        checked={checked}
        onCheckedChange={() => onToggle(control.key)}
      />
    </div>
  )
}

function RadioField<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string
  label: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
}) {
  const labelId = useId()

  return (
    <div>
      <span id={labelId} className="text-sm font-medium">
        {label}
      </span>
      <RadioGroup
        aria-labelledby={labelId}
        className="mt-2 flex flex-wrap gap-4"
        value={value}
        onValueChange={(next) => onChange(next as T)}
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`
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
    </div>
  )
}

function labelOf<T extends string>(options: SelectOption<T>[], value: T) {
  return options.find((option) => option.value === value)?.label ?? ""
}

export function ModalControls({ state, onToggle, onChange }: ModalControlsProps) {
  const showConfirm = hasConfirmButton(state)
  const showCancel = hasCancelButton(state)
  const isCustomFooter = state.footer === "custom"

  /** 초기 포커스는 실제로 존재하는 버튼만 고를 수 있다 */
  const focusOptions = initialFocusOptions.filter((option) => {
    if (option.value === "confirm") return showConfirm
    if (option.value === "cancel") return showCancel
    return true
  })

  const guide = (decisionKey: DecisionKey, label: string) => (
    <DecisionGuide decisionKey={decisionKey} label={label} />
  )

  return (
    <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
      {/* Overlay Click / ESC Close / Close Button */}
      {closeControls.map((control) => (
        <div key={control.key} className="px-4 py-3">
          <ToggleRow
            control={control}
            checked={state[control.key]}
            onToggle={onToggle}
          />
          {guide(control.key, control.label)}
        </div>
      ))}

      {/* Size */}
      <div className="px-4 py-3">
        <RadioField
          name="size"
          label="Size"
          value={state.size}
          options={sizeOptions}
          onChange={(value: ModalSize) => onChange("size", value)}
        />
        {guide(`size:${state.size}`, `Size — ${labelOf(sizeOptions, state.size)}`)}
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
        {guide("content", "Title·Description")}
      </div>

      {/* Long Content */}
      <div className="px-4 py-3">
        <ToggleRow
          control={longContentControl}
          checked={state.longContent}
          onToggle={onToggle}
        />
        {guide("longContent", longContentControl.label)}
      </div>

      {/* Footer */}
      <div className="px-4 py-3">
        <RadioField
          name="footer"
          label="Footer"
          value={state.footer}
          options={footerOptions}
          onChange={(value: ModalFooter) => onChange("footer", value)}
        />
        {guide(
          `footer:${state.footer}`,
          `Footer — ${labelOf(footerOptions, state.footer)}`
        )}
      </div>

      {/* Button Layout — 푸터 버튼을 직접 배치하는 Custom 에는 해당 없음 */}
      {showConfirm && !isCustomFooter && (
        <div className="px-4 py-3">
          <RadioField
            name="layout"
            label="Button Layout"
            value={state.footerLayout}
            options={footerLayoutOptions}
            onChange={(value: FooterLayout) => onChange("footerLayout", value)}
          />
          {guide("layout", "Button Layout")}
        </div>
      )}

      {/* Button Order — 버튼이 둘일 때만 의미가 있음 */}
      {showCancel && (
        <div className="px-4 py-3">
          <RadioField
            name="order"
            label="Button Order"
            value={state.buttonOrder}
            options={buttonOrderOptions}
            onChange={(value: ButtonOrder) => onChange("buttonOrder", value)}
          />
          {guide("order", "Button Order")}
        </div>
      )}

      {/* Confirm Tone */}
      {showConfirm && (
        <div className="px-4 py-3">
          <RadioField
            name="tone"
            label="Confirm Tone"
            value={state.confirmTone}
            options={confirmToneOptions}
            onChange={(value: ConfirmTone) => onChange("confirmTone", value)}
          />
          {guide("tone", "Confirm Tone")}
        </div>
      )}

      {/* Initial Focus */}
      <div className="px-4 py-3">
        <RadioField
          name="focus"
          label="Initial Focus"
          value={state.initialFocus}
          options={focusOptions}
          onChange={(value: InitialFocus) => onChange("initialFocus", value)}
        />
        {guide("focus", "Initial Focus")}
      </div>

      {/* Button Text / Loading — footer 가 있을 때만 */}
      {showConfirm && (
        <div className="flex flex-col gap-3 px-4 py-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-text">Confirm Text</Label>
            <Input
              id="confirm-text"
              value={state.confirmText}
              onChange={(event) => onChange("confirmText", event.target.value)}
            />
          </div>
          {showCancel && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cancel-text">Cancel Text</Label>
              <Input
                id="cancel-text"
                value={state.cancelText}
                onChange={(event) => onChange("cancelText", event.target.value)}
              />
            </div>
          )}
          {guide("buttons", "Button Text")}

          <div className="border-t border-border pt-3">
            <ToggleRow
              control={loadingControl}
              checked={state.loading}
              onToggle={onToggle}
            />
            {guide("loading", loadingControl.label)}
          </div>
        </div>
      )}
    </div>
  )
}
