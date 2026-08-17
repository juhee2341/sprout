import { fireEvent, render, screen } from "@/test-utils/render"

import { initialToastState } from "../hooks/useToastPlayground"
import { decisionGuides } from "../toast.data"
import { ToastControls } from "./ToastControls"

const noop = () => {}

describe("ToastControls", () => {
  it("Position 을 고르면 onChange('position', ...) 를 호출한다", async () => {
    const onChange = jest.fn()
    const { user } = render(
      <ToastControls
        state={initialToastState}
        onToggle={noop}
        onChange={onChange}
      />
    )

    await user.click(screen.getByRole("radio", { name: "상단 중앙" }))

    expect(onChange).toHaveBeenCalledWith("position", "top-center")
  })

  it("Duration 에 '직접 닫을 때까지' 선택지를 제공한다", async () => {
    const onChange = jest.fn()
    const { user } = render(
      <ToastControls
        state={initialToastState}
        onToggle={noop}
        onChange={onChange}
      />
    )

    await user.click(screen.getByRole("radio", { name: "직접 닫을 때까지" }))

    expect(onChange).toHaveBeenCalledWith("duration", "manual")
  })

  it("Close Button 스위치를 누르면 onToggle 을 호출한다", async () => {
    const onToggle = jest.fn()
    const { user } = render(
      <ToastControls
        state={initialToastState}
        onToggle={onToggle}
        onChange={noop}
      />
    )

    await user.click(screen.getByRole("switch", { name: "Close Button" }))

    expect(onToggle).toHaveBeenCalledWith("closeButton")
  })

  it("Title 입력이 바뀌면 onChange('title', ...) 를 호출한다", () => {
    const onChange = jest.fn()
    render(
      <ToastControls
        state={initialToastState}
        onToggle={noop}
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "삭제했어요" },
    })

    expect(onChange).toHaveBeenCalledWith("title", "삭제했어요")
  })

  it("라디오 그룹은 모두 이름을 가진다", () => {
    render(
      <ToastControls
        state={initialToastState}
        onToggle={noop}
        onChange={noop}
      />
    )

    const names = screen
      .getAllByRole("radiogroup")
      .map((group) => group.getAttribute("aria-labelledby"))

    expect(names.every(Boolean)).toBe(true)
    expect(
      screen.getByRole("radiogroup", { name: "Screen Reader Priority" })
    ).toBeInTheDocument()
  })

  it("고른 값에 맞는 판단 근거를 보여준다", async () => {
    const { user } = render(
      <ToastControls
        state={{ ...initialToastState, duration: "manual" }}
        onToggle={noop}
        onChange={noop}
      />
    )

    await user.click(
      screen.getByRole("button", {
        name: /왜 이 선택을 하나요.*Duration — 직접 닫을 때까지/,
      })
    )

    expect(screen.getByText(decisionGuides.duration.why)).toBeInTheDocument()
    expect(
      screen.queryByText(decisionGuides.position.why)
    ).not.toBeInTheDocument()
  })
})
