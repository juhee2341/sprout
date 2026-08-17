"use client"

import {
  labelOf,
  RadioField,
  ToggleRow,
} from "@/components/common/ControlField"
import { DecisionGuide } from "@/components/common/DecisionGuide"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  decisionGuides,
  footerLayoutOptions,
  footerOptions,
  initialFocusOptions,
  loadingControl,
  longContentControl,
  sizeOptions,
  type DecisionKey,
} from "../modal.data"

interface ModalControlsProps {
  state: ModalPlaygroundState
  onToggle: (key: ModalToggleKey) => void
  onChange: <K extends keyof ModalPlaygroundState>(
    key: K,
    value: ModalPlaygroundState[K]
  ) => void
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
    <DecisionGuide guide={decisionGuides[decisionKey]} label={label} />
  )

  return (
    <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
      {/* Overlay Click / ESC Close / Close Button */}
      {closeControls.map((control) => (
        <div key={control.key} className="px-4 py-3">
          <ToggleRow
            id={`control-${control.key}`}
            label={control.label}
            description={control.description}
            checked={state[control.key]}
            onCheckedChange={() => onToggle(control.key)}
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
          id="control-longContent"
          label={longContentControl.label}
          description={longContentControl.description}
          checked={state.longContent}
          onCheckedChange={() => onToggle("longContent")}
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
              id="control-loading"
              label={loadingControl.label}
              description={loadingControl.description}
              checked={state.loading}
              onCheckedChange={() => onToggle("loading")}
            />
            {guide("loading", loadingControl.label)}
          </div>
        </div>
      )}
    </div>
  )
}
