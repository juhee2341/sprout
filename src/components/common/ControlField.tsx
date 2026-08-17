"use client"

import { useId } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import type { SelectOption } from "@/types/control"

/**
 * 라벨 + 설명 + 스위치 한 줄.
 * 플레이그라운드 Controls 목록이 공통으로 쓴다.
 */
export function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  onCheckedChange: () => void
}) {
  const labelId = `${id}-label`

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <Label id={labelId} htmlFor={id}>
          {label}
        </Label>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <Switch
        id={id}
        aria-labelledby={labelId}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}

/**
 * 그룹 라벨이 붙은 라디오 묶음.
 * 라디오 그룹은 aria-labelledby 로 이름을 갖는다 — 이름 없는 radiogroup 은
 * 스크린 리더에서 무엇을 고르는 자리인지 알 수 없다.
 */
export function RadioField<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
}: {
  /** 라디오 id 접두사 */
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

/** 고른 값의 라벨을 찾는다 — 판단 근거 토글 이름에 쓴다 */
export function labelOf<T extends string>(
  options: SelectOption<T>[],
  value: T
) {
  return options.find((option) => option.value === value)?.label ?? ""
}
