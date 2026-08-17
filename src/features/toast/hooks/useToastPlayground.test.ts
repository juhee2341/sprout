import { act, renderHook } from "@testing-library/react"

import {
  initialToastState,
  toDurationMs,
  toVisibleLimit,
  useToastPlayground,
} from "./useToastPlayground"

describe("useToastPlayground", () => {
  it("기본 상태로 시작하고 떠 있는 토스트는 없다", () => {
    const { result } = renderHook(() => useToastPlayground())

    expect(result.current.state).toEqual(initialToastState)
    expect(result.current.toasts).toEqual([])
  })

  it("push 는 현재 설정을 복사한 토스트를 추가한다", () => {
    const { result } = renderHook(() => useToastPlayground())

    act(() => result.current.set("tone", "error"))
    act(() => result.current.push())
    // 띄운 뒤 설정을 바꿔도 이미 떠 있는 토스트는 그대로다
    act(() => result.current.set("tone", "success"))

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].tone).toBe("error")
  })

  it("개수 제한을 넘기면 오래된 토스트부터 밀어낸다", () => {
    const { result } = renderHook(() => useToastPlayground())

    act(() => result.current.set("maxVisible", "1"))
    act(() => result.current.set("title", "첫 번째"))
    act(() => result.current.push())
    act(() => result.current.set("title", "두 번째"))
    act(() => result.current.push())

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe("두 번째")
  })

  it("제한 없음이면 계속 쌓인다", () => {
    const { result } = renderHook(() => useToastPlayground())

    act(() => result.current.set("maxVisible", "unlimited"))
    act(() => result.current.push())
    act(() => result.current.push())
    act(() => result.current.push())

    expect(result.current.toasts).toHaveLength(3)
  })

  it("dismiss 는 해당 토스트만, clear 는 전부 지운다", () => {
    const { result } = renderHook(() => useToastPlayground())

    act(() => result.current.push())
    act(() => result.current.push())
    const [first] = result.current.toasts

    act(() => result.current.dismiss(first.id))
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].id).not.toBe(first.id)

    act(() => result.current.clear())
    expect(result.current.toasts).toEqual([])
  })

  it("manual 은 자동으로 닫히지 않는 duration 으로 변환된다", () => {
    expect(toDurationMs("manual")).toBe(Infinity)
    expect(toDurationMs("3000")).toBe(3000)
    expect(toVisibleLimit("unlimited")).toBe(Infinity)
    expect(toVisibleLimit("3")).toBe(3)
  })
})
