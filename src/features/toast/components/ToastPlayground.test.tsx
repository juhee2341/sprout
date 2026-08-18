import { render, screen, within } from "@/test-utils/render"

import { ToastPlayground } from "./ToastPlayground"

describe("ToastPlayground", () => {
  it("설정을 바꾸고 띄우면 그 설정대로 토스트가 뜬다", async () => {
    const { user } = render(<ToastPlayground />)

    await user.click(screen.getByRole("radio", { name: "오류" }))
    await user.click(screen.getByRole("radio", { name: "되돌리기" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))

    const toast = screen.getByRole("listitem")
    expect(toast).toHaveTextContent("오류:")
    expect(
      within(toast).getByRole("button", { name: "되돌리기" })
    ).toBeInTheDocument()
  })

  it("개수 제한을 1개로 두면 마지막 토스트만 남는다", async () => {
    const { user } = render(<ToastPlayground />)

    await user.click(screen.getByRole("radio", { name: "1개" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))

    expect(screen.getAllByRole("listitem")).toHaveLength(1)
    expect(screen.getByText("떠 있는 토스트 1개")).toBeInTheDocument()
  })

  it("전부 닫기 로 떠 있는 토스트를 비운다", async () => {
    const { user } = render(<ToastPlayground />)

    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))
    expect(screen.getByRole("listitem")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "전부 닫기" }))

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument()
    expect(screen.getByText("떠 있는 토스트 0개")).toBeInTheDocument()
  })

  it("1개씩 차례로 모드는 하나만 보여주고 나머지를 대기시킨다", async () => {
    const { user } = render(<ToastPlayground />)

    await user.click(screen.getByRole("radio", { name: "1개씩 차례로" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))

    expect(screen.getAllByRole("listitem")).toHaveLength(1)
    expect(screen.getByText(/대기 1개/)).toBeInTheDocument()

    // 앞의 것을 닫으면 대기하던 것이 올라온다
    await user.click(screen.getByRole("button", { name: "닫기" }))

    expect(screen.getAllByRole("listitem")).toHaveLength(1)
    expect(screen.queryByText(/대기/)).not.toBeInTheDocument()
  })

  it("겹쳐 쌓기는 여러 개를 동시에 렌더하되 포갠다", async () => {
    const { user } = render(<ToastPlayground />)

    await user.click(screen.getByRole("radio", { name: "겹쳐 쌓기" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))
    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))

    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveStyle({ gridArea: "1 / 1" })
  })

  it("홈으로 돌아가는 링크가 있다", () => {
    render(<ToastPlayground />)

    expect(screen.getByRole("link", { name: "홈으로" })).toHaveAttribute(
      "href",
      "/"
    )
  })
})
