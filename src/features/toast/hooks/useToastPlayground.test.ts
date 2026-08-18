import { act, renderHook } from "@testing-library/react"

import {
  initialToastState,
  toDurationMs,
  toVisibleLimit,
  useToastPlayground,
  visibleToasts,
  type ToastInstance,
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

  it("1개씩 차례로 모드는 버리지 않고 대기시킨다", () => {
    const { result } = renderHook(() => useToastPlayground())

    act(() => result.current.set("stackMode", "queue"))
    act(() => result.current.set("title", "첫 번째"))
    act(() => result.current.push())
    act(() => result.current.set("title", "두 번째"))
    act(() => result.current.push())

    // 개수 제한으로 버리는 것과 달리 뒤에 세워 둔다
    expect(result.current.toasts).toHaveLength(2)
    expect(result.current.visible).toHaveLength(1)
    expect(result.current.visible[0].title).toBe("첫 번째")
    expect(result.current.pendingCount).toBe(1)
  })

  it("앞의 것을 닫으면 대기하던 토스트가 올라온다", () => {
    const { result } = renderHook(() => useToastPlayground())

    act(() => result.current.set("stackMode", "queue"))
    act(() => result.current.set("title", "첫 번째"))
    act(() => result.current.push())
    act(() => result.current.set("title", "두 번째"))
    act(() => result.current.push())
    act(() => result.current.dismiss(result.current.visible[0].id))

    expect(result.current.visible[0].title).toBe("두 번째")
    expect(result.current.pendingCount).toBe(0)
  })

  it("visibleToasts 는 모드에 따라 보일 것을 고른다", () => {
    const make = (id: number) => ({ id }) as ToastInstance
    const toasts = [make(1), make(2), make(3), make(4)]

    // 나란히·겹쳐 쌓기는 최신 것부터 개수만큼
    expect(visibleToasts(toasts, "list", "3").map((t) => t.id)).toEqual([2, 3, 4])
    expect(visibleToasts(toasts, "stack", "1").map((t) => t.id)).toEqual([4])
    expect(visibleToasts(toasts, "list", "unlimited")).toHaveLength(4)
    // 1개씩 차례로는 도착 순서대로 맨 앞 하나
    expect(visibleToasts(toasts, "queue", "3").map((t) => t.id)).toEqual([1])
  })

  it("manual 은 자동으로 닫히지 않는 duration 으로 변환된다", () => {
    expect(toDurationMs("manual")).toBe(Infinity)
    expect(toDurationMs("3000")).toBe(3000)
    expect(toVisibleLimit("unlimited")).toBe(Infinity)
    expect(toVisibleLimit("3")).toBe(3)
  })
})
