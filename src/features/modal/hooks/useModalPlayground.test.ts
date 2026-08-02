import { act, renderHook } from "@testing-library/react"

import { useModalPlayground } from "./useModalPlayground"

describe("useModalPlayground", () => {
  it("기본값은 overlayClose·escClose 모두 true", () => {
    const { result } = renderHook(() => useModalPlayground())

    expect(result.current.state).toEqual({ overlayClose: true, escClose: true })
  })

  it("toggle 은 해당 키만 반전한다", () => {
    const { result } = renderHook(() => useModalPlayground())

    act(() => result.current.toggle("escClose"))

    expect(result.current.state.escClose).toBe(false)
    expect(result.current.state.overlayClose).toBe(true)
  })
})
