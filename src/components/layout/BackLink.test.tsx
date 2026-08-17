import { render, screen } from "@/test-utils/render"

import { BackLink } from "./BackLink"

describe("BackLink", () => {
  it("기본값은 홈으로 가는 링크다", () => {
    render(<BackLink />)

    expect(screen.getByRole("link", { name: "홈으로" })).toHaveAttribute(
      "href",
      "/"
    )
  })

  it("href·label 을 바꿀 수 있다", () => {
    render(<BackLink href="/#roadmap" label="로드맵으로" />)

    expect(screen.getByRole("link", { name: "로드맵으로" })).toHaveAttribute(
      "href",
      "/#roadmap"
    )
  })
})
