import { fireEvent, render, screen } from "@/test-utils/render"

import { initialModalState } from "../hooks/useModalPlayground"
import { decisionGuides } from "../modal.data"
import { ModalControls } from "./ModalControls"

const noop = () => {}

describe("ModalControls", () => {
  it("토글 스위치를 상태에 맞게 렌더한다", () => {
    render(
      <ModalControls
        state={{ ...initialModalState, overlayClose: true, escClose: false }}
        onToggle={noop}
        onChange={noop}
      />
    )

    expect(screen.getByRole("switch", { name: "Overlay Click" })).toBeChecked()
    expect(
      screen.getByRole("switch", { name: "ESC Close" })
    ).not.toBeChecked()
  })

  it("스위치를 누르면 해당 키로 onToggle 을 호출한다", async () => {
    const onToggle = jest.fn()
    const { user } = render(
      <ModalControls
        state={initialModalState}
        onToggle={onToggle}
        onChange={noop}
      />
    )

    await user.click(screen.getByRole("switch", { name: "ESC Close" }))

    expect(onToggle).toHaveBeenCalledWith("escClose")
  })

  it("Size 라디오를 고르면 onChange('size', ...) 를 호출한다", async () => {
    const onChange = jest.fn()
    const { user } = render(
      <ModalControls
        state={initialModalState}
        onToggle={noop}
        onChange={onChange}
      />
    )

    await user.click(screen.getByRole("radio", { name: "Large" }))

    expect(onChange).toHaveBeenCalledWith("size", "lg")
  })

  it("Title 입력이 바뀌면 onChange('title', ...) 를 호출한다", () => {
    const onChange = jest.fn()
    render(
      <ModalControls
        state={initialModalState}
        onToggle={noop}
        onChange={onChange}
      />
    )

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Remove item" },
    })

    expect(onChange).toHaveBeenCalledWith("title", "Remove item")
  })

  it("Footer 가 none 이면 버튼 텍스트 필드를 숨긴다", () => {
    render(
      <ModalControls
        state={{ ...initialModalState, footer: "none" }}
        onToggle={noop}
        onChange={noop}
      />
    )

    expect(screen.queryByLabelText("Confirm Text")).not.toBeInTheDocument()
    expect(screen.queryByLabelText("Cancel Text")).not.toBeInTheDocument()
  })

  it("고른 Size 값에 맞는 판단 근거를 보여준다", async () => {
    const { user } = render(
      <ModalControls
        state={{ ...initialModalState, size: "full" }}
        onToggle={noop}
        onChange={noop}
      />
    )

    await user.click(
      screen.getByRole("button", { name: /왜 이 선택을 하나요.*Size — Full/ })
    )

    expect(
      screen.getByText(decisionGuides["size:full"].why)
    ).toBeInTheDocument()
    expect(
      screen.queryByText(decisionGuides["size:md"].why)
    ).not.toBeInTheDocument()
  })

  it("Footer 가 custom 이면 Confirm 만, Cancel 은 숨긴다", () => {
    render(
      <ModalControls
        state={{ ...initialModalState, footer: "custom" }}
        onToggle={noop}
        onChange={noop}
      />
    )

    expect(screen.getByLabelText("Confirm Text")).toBeInTheDocument()
    expect(screen.queryByLabelText("Cancel Text")).not.toBeInTheDocument()
  })
})
