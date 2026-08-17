"use client"

import {
  labelOf,
  RadioField,
  ToggleRow,
} from "@/components/common/ControlField"
import { DecisionGuide } from "@/components/common/DecisionGuide"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type {
  ToastActionKind,
  ToastDuration,
  ToastMaxVisible,
  ToastPlaygroundState,
  ToastPosition,
  ToastPriority,
  ToastToggleKey,
  ToastTone,
} from "../hooks/useToastPlayground"
import {
  actionOptions,
  closeButtonControl,
  decisionGuides,
  durationOptions,
  maxVisibleOptions,
  positionOptions,
  priorityOptions,
  toneOptions,
  type DecisionKey,
} from "../toast.data"

interface ToastControlsProps {
  state: ToastPlaygroundState
  onToggle: (key: ToastToggleKey) => void
  onChange: <K extends keyof ToastPlaygroundState>(
    key: K,
    value: ToastPlaygroundState[K]
  ) => void
}

export function ToastControls({
  state,
  onToggle,
  onChange,
}: ToastControlsProps) {
  const guide = (decisionKey: DecisionKey, label: string) => (
    <DecisionGuide guide={decisionGuides[decisionKey]} label={label} />
  )

  return (
    <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
      {/* Position */}
      <div className="px-4 py-3">
        <RadioField
          name="position"
          label="Position"
          value={state.position}
          options={positionOptions}
          onChange={(value: ToastPosition) => onChange("position", value)}
        />
        {guide("position", `Position — ${labelOf(positionOptions, state.position)}`)}
      </div>

      {/* Duration */}
      <div className="px-4 py-3">
        <RadioField
          name="duration"
          label="Duration"
          value={state.duration}
          options={durationOptions}
          onChange={(value: ToastDuration) => onChange("duration", value)}
        />
        {guide("duration", `Duration — ${labelOf(durationOptions, state.duration)}`)}
      </div>

      {/* Priority — 화면에는 아무 차이도 만들지 않는 설정 */}
      <div className="px-4 py-3">
        <RadioField
          name="priority"
          label="Screen Reader Priority"
          value={state.priority}
          options={priorityOptions}
          onChange={(value: ToastPriority) => onChange("priority", value)}
        />
        {guide("priority", "Screen Reader Priority")}
      </div>

      {/* Tone */}
      <div className="px-4 py-3">
        <RadioField
          name="tone"
          label="Tone"
          value={state.tone}
          options={toneOptions}
          onChange={(value: ToastTone) => onChange("tone", value)}
        />
        {guide("tone", `Tone — ${labelOf(toneOptions, state.tone)}`)}
      </div>

      {/* Title / Description */}
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="toast-title">Title</Label>
          <Input
            id="toast-title"
            value={state.title}
            placeholder="변경 사항을 저장했어요"
            onChange={(event) => onChange("title", event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="toast-description">Description</Label>
          <Input
            id="toast-description"
            value={state.description}
            placeholder="비워 두면 제목만 보여줍니다"
            onChange={(event) => onChange("description", event.target.value)}
          />
        </div>
        {guide("content", "Title·Description")}
      </div>

      {/* Action */}
      <div className="px-4 py-3">
        <RadioField
          name="action"
          label="Action Button"
          value={state.action}
          options={actionOptions}
          onChange={(value: ToastActionKind) => onChange("action", value)}
        />
        {guide("action", `Action Button — ${labelOf(actionOptions, state.action)}`)}
      </div>

      {/* Close Button */}
      <div className="px-4 py-3">
        <ToggleRow
          id="control-closeButton"
          label={closeButtonControl.label}
          description={closeButtonControl.description}
          checked={state.closeButton}
          onCheckedChange={() => onToggle("closeButton")}
        />
        {guide("closeButton", closeButtonControl.label)}
      </div>

      {/* Max Visible */}
      <div className="px-4 py-3">
        <RadioField
          name="maxVisible"
          label="Max Visible"
          value={state.maxVisible}
          options={maxVisibleOptions}
          onChange={(value: ToastMaxVisible) => onChange("maxVisible", value)}
        />
        {guide(
          "maxVisible",
          `Max Visible — ${labelOf(maxVisibleOptions, state.maxVisible)}`
        )}
      </div>
    </div>
  )
}
