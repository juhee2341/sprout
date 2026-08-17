import { render, screen, within } from "@/test-utils/render"

import { initialModalState } from "../hooks/useModalPlayground"
import { ModalPreview } from "./ModalPreview"

async function openModal(user: ReturnType<typeof render>["user"]) {
  await user.click(screen.getByRole("button", { name: "모달 열기" }))
  return screen.findByRole("dialog")
}

describe("ModalPreview", () => {
  it("모달 열기 를 누르면 title·description 을 담은 다이얼로그가 열린다", async () => {
    const { user } = render(
      <ModalPreview
        state={{ ...initialModalState, title: "Remove item" }}
      />
    )

    await openModal(user)

    expect(
      screen.getByRole("heading", { name: "Remove item" })
    ).toBeInTheDocument()
  })

  it("escClose=true 면 ESC 로 닫힌다", async () => {
    const { user } = render(<ModalPreview state={initialModalState} />)

    await openModal(user)
    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("escClose=false 면 ESC 를 눌러도 닫히지 않는다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, escClose: false }} />
    )

    await openModal(user)
    await user.keyboard("{Escape}")

    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("footer=default 면 Cancel·Confirm 버튼을 커스텀 문구로 렌더한다", async () => {
    const { user } = render(
      <ModalPreview
        state={{
          ...initialModalState,
          footer: "default",
          confirmText: "삭제",
          cancelText: "취소",
        }}
      />
    )

    await openModal(user)

    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument()
  })

  it("footer=none 이면 액션 버튼이 없다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, footer: "none" }} />
    )

    await openModal(user)

    expect(
      screen.queryByRole("button", { name: initialModalState.confirmText })
    ).not.toBeInTheDocument()
  })

  it("footer=single 이면 확인 버튼만 렌더한다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, footer: "single" }} />
    )

    await openModal(user)

    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "취소" })
    ).not.toBeInTheDocument()
  })

  it("footer=custom 이면 보조 액션을 함께 렌더한다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, footer: "custom" }} />
    )

    await openModal(user)

    expect(
      screen.getByRole("button", { name: "다시 보지 않기" })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument()
  })

  it("closeButton=true 면 X 버튼으로 닫을 수 있다", async () => {
    const { user } = render(<ModalPreview state={initialModalState} />)

    await openModal(user)
    await user.click(screen.getByRole("button", { name: "닫기" }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closeButton=false 면 X 버튼이 없다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, closeButton: false }} />
    )

    await openModal(user)

    expect(screen.queryByRole("button", { name: "닫기" })).not.toBeInTheDocument()
  })

  it("buttonOrder 는 DOM 순서(=탭 순서)를 바꾼다", async () => {
    const { user } = render(
      <ModalPreview
        state={{ ...initialModalState, buttonOrder: "confirmFirst" }}
      />
    )

    const dialog = await openModal(user)
    const actionNames = within(dialog)
      .getAllByRole("button")
      .map((button) => button.textContent)
      .filter((text) => text === "확인" || text === "취소")

    expect(actionNames).toEqual(["확인", "취소"])
  })

  it("initialFocus=cancel 이면 열릴 때 취소 버튼에 포커스가 간다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, initialFocus: "cancel" }} />
    )

    await openModal(user)

    expect(screen.getByRole("button", { name: "취소" })).toHaveFocus()
  })

  it("loading=true 면 확인 버튼을 막고 처리 중임을 알린다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, loading: true }} />
    )

    await openModal(user)

    const confirm = screen.getByRole("button", { name: "확인" })
    expect(confirm).toBeDisabled()
    expect(confirm).toHaveAttribute("aria-busy", "true")
    expect(screen.getByRole("status")).toHaveTextContent("처리 중")
    // 취소는 막지 않는다 — 응답이 늦어도 빠져나갈 수 있어야 한다
    expect(screen.getByRole("button", { name: "취소" })).toBeEnabled()
  })

  it("초기 포커스 대상이 처리 중이면 포커스를 모달 안에 남긴다", async () => {
    const { user } = render(
      <ModalPreview
        state={{ ...initialModalState, initialFocus: "confirm", loading: true }}
      />
    )

    const dialog = await openModal(user)

    expect(dialog).toContainElement(document.activeElement as HTMLElement)
  })

  it("confirmTone=destructive 면 확인 버튼을 파괴적 액션으로 표시한다", async () => {
    const { user } = render(
      <ModalPreview
        state={{ ...initialModalState, confirmTone: "destructive" }}
      />
    )

    await openModal(user)

    expect(screen.getByRole("button", { name: "확인" })).toHaveAttribute(
      "data-variant",
      "destructive"
    )
  })

  it("longContent=true 면 본문이 키보드로 닿는 스크롤 영역이 된다", async () => {
    const { user } = render(
      <ModalPreview state={{ ...initialModalState, longContent: true }} />
    )

    await openModal(user)

    const body = screen.getByRole("region", { name: "모달 본문" })
    expect(body).toHaveAttribute("tabindex", "0")
  })

  it("longContent=false 면 본문에 스크롤 영역을 만들지 않는다", async () => {
    const { user } = render(<ModalPreview state={initialModalState} />)

    await openModal(user)

    expect(
      screen.queryByRole("region", { name: "모달 본문" })
    ).not.toBeInTheDocument()
  })
})
