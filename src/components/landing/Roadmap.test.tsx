import { roadmap } from "@/constants/roadmap"
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
    expect(screen.getByText("결정 로그")).toBeInTheDocument()
  })

  it("완료 개수를 진행률 라벨로 보여준다", () => {
    render(<Roadmap />)

    const done = roadmap.filter((item) => item.status === "done").length

    expect(
      screen.getByText(`${done} / ${roadmap.length} 완료`)
    ).toBeInTheDocument()
  })

  it("상태를 색이 아니라 문구로도 알린다", () => {
    render(<Roadmap />)

    // 진행 중 항목은 상태 문구가 함께 보인다
    expect(screen.getByText("진행중")).toBeInTheDocument()
    expect(screen.getAllByText("완료").length).toBeGreaterThan(0)
    expect(screen.getAllByText("예정").length).toBeGreaterThan(0)
  })
})
