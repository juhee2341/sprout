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
})
