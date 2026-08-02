import { render, screen } from "@/test-utils/render"

import { ModalControls } from "./ModalControls"

describe("ModalControls", () => {
  it("컨트롤 개수만큼 스위치를 상태에 맞게 렌더한다", () => {
    render(
      <ModalControls
        state={{ overlayClose: true, escClose: false }}
        onToggle={() => {}}
      />
    )

    const switches = screen.getAllByRole("switch")
    expect(switches).toHaveLength(2)
    expect(screen.getByRole("switch", { name: "Overlay Click" })).toBeChecked()
    expect(screen.getByRole("switch", { name: "ESC Close" })).not.toBeChecked()
  })

  it("스위치를 누르면 해당 키로 onToggle 을 호출한다", async () => {
    const onToggle = jest.fn()
    const { user } = render(
      <ModalControls
        state={{ overlayClose: true, escClose: true }}
        onToggle={onToggle}
      />
    )

    await user.click(screen.getByRole("switch", { name: "ESC Close" }))

    expect(onToggle).toHaveBeenCalledWith("escClose")
  })
})
