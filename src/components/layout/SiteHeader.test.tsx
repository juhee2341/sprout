import { render, screen } from "@/test-utils/render"

import { SiteHeader } from "./SiteHeader"

describe("SiteHeader", () => {
  it("섹션 앵커와 GitHub 링크를 제공한다", () => {
    render(<SiteHeader />)

    expect(screen.getByRole("link", { name: "why" })).toHaveAttribute(
      "href",
      "#why"
    )
    expect(screen.getByRole("link", { name: "roadmap" })).toHaveAttribute(
      "href",
      "#roadmap"
    )

    const github = screen.getByRole("link", { name: "github ↗" })
    expect(github).toHaveAttribute("href", "https://github.com/juhee2341/sprout")
    expect(github).toHaveAttribute("target", "_blank")
    expect(github).toHaveAttribute("rel", "noopener noreferrer")
  })
})
