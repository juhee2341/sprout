import { render, screen } from "@/test-utils/render"

import { Hero } from "./Hero"

describe("Hero", () => {
  it("제목과 두 개의 CTA 링크를 렌더한다", () => {
    render(<Hero />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Sprout" })
    ).toBeInTheDocument()

    expect(screen.getByRole("link", { name: "둘러보기" })).toHaveAttribute(
      "href",
      "#roadmap"
    )

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/juhee2341/sprout"
    )
  })
})
