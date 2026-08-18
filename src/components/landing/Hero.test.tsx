import { render, screen } from "@/test-utils/render"

import { Hero } from "./Hero"

describe("Hero", () => {
  it("헤드라인과 두 개의 CTA 링크를 렌더한다", () => {
    render(<Hero />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "UI를 만드는 게 아니라, 왜 이렇게 만드는지 기록합니다.",
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: "플레이그라운드 둘러보기 →" })
    ).toHaveAttribute("href", "#roadmap")

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/juhee2341/sprout"
    )
  })

  it("스택 목록을 렌더한다", () => {
    render(<Hero />)

    const items = screen.getAllByRole("listitem")

    expect(items).toHaveLength(4)
    expect(items[0]).toHaveTextContent("Next.js")
    expect(items[3]).toHaveTextContent("Radix UI")
  })
})
