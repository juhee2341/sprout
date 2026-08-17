/** 라디오·셀렉트 한 칸 */
export interface SelectOption<T extends string> {
  value: T
  label: string
}

/** 스위치 한 줄 — key 는 각 기능의 boolean 상태 키 */
export interface ToggleControl<K extends string = string> {
  key: K
  label: string
  description: string
}
