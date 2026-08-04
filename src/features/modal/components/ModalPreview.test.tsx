import { render, screen } from "@/test-utils/render"

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
})
