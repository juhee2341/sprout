import { act, renderHook } from "@testing-library/react"

import { initialModalState, useModalPlayground } from "./useModalPlayground"

describe("useModalPlayground", () => {
  it("기본 상태로 시작한다", () => {
    const { result } = renderHook(() => useModalPlayground())

    expect(result.current.state).toEqual(initialModalState)
  })

  it("toggle 은 boolean 키만 반전한다", () => {
    const { result } = renderHook(() => useModalPlayground())

    act(() => result.current.toggle("escClose"))

    expect(result.current.state.escClose).toBe(false)
    expect(result.current.state.overlayClose).toBe(true)
  })

  it("set 은 임의 필드를 갱신한다", () => {
    const { result } = renderHook(() => useModalPlayground())

    act(() => result.current.set("size", "lg"))
    act(() => result.current.set("title", "Remove item"))

    expect(result.current.state.size).toBe("lg")
    expect(result.current.state.title).toBe("Remove item")
  })

  it("취소 버튼이 사라지는 footer 로 바꾸면 초기 포커스를 auto 로 되돌린다", () => {
    const { result } = renderHook(() => useModalPlayground())

    act(() => result.current.set("initialFocus", "cancel"))
    act(() => result.current.set("footer", "single"))

    expect(result.current.state.initialFocus).toBe("auto")
  })

  it("버튼이 그대로 있는 footer 변경은 초기 포커스를 건드리지 않는다", () => {
    const { result } = renderHook(() => useModalPlayground())

    act(() => result.current.set("initialFocus", "cancel"))
    act(() => result.current.set("footer", "custom"))

    expect(result.current.state.initialFocus).toBe("cancel")
  })
})
