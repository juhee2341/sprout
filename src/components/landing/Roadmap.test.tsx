import { render, screen } from "@/test-utils/render"

import { Roadmap } from "./Roadmap"

describe("Roadmap", () => {
  it("진입 가능한 항목은 해당 경로로 링크된다", () => {
    render(<Roadmap />)

    expect(
      screen.getByRole("link", { name: /모달 플레이그라운드/ })
    ).toHaveAttribute("href", "/components/modal")
    expect(
      screen.getByRole("link", { name: /토스트 플레이그라운드/ })
    ).toHaveAttribute("href", "/components/toast")
  })

  it("페이지가 없는 항목은 링크로 렌더하지 않는다", () => {
    render(<Roadmap />)

    expect(
      screen.queryByRole("link", { name: /결정 로그/ })
    ).not.toBeInTheDocument()
  })
})
