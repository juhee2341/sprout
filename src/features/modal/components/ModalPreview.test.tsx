import { render, screen } from "@/test-utils/render"

import { ModalPreview } from "./ModalPreview"

describe("ModalPreview", () => {
  it("Open Modal 을 누르면 실제 다이얼로그가 열린다", async () => {
    const { user } = render(
      <ModalPreview state={{ overlayClose: true, escClose: true }} />
    )

    await user.click(screen.getByRole("button", { name: "Open Modal" }))

    expect(await screen.findByRole("dialog")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Are you sure?" })
    ).toBeInTheDocument()
  })

  it("escClose=true 면 ESC 로 닫힌다", async () => {
    const { user } = render(
      <ModalPreview state={{ overlayClose: true, escClose: true }} />
    )

    await user.click(screen.getByRole("button", { name: "Open Modal" }))
    expect(await screen.findByRole("dialog")).toBeInTheDocument()

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("escClose=false 면 ESC 를 눌러도 닫히지 않는다", async () => {
    const { user } = render(
      <ModalPreview state={{ overlayClose: true, escClose: false }} />
    )

    await user.click(screen.getByRole("button", { name: "Open Modal" }))
    expect(await screen.findByRole("dialog")).toBeInTheDocument()

    await user.keyboard("{Escape}")

    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })
})
