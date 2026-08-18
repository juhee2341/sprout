import { principles } from "@/constants/principles"
import { render, screen } from "@/test-utils/render"

import { Why } from "./Why"

describe("Why", () => {
  it("원칙 세 가지를 번호와 함께 렌더한다", () => {
    render(<Why />)

    expect(
      screen.getByRole("heading", { level: 2, name: "왜 Sprout인가" })
    ).toBeInTheDocument()
    expect(screen.getByText("03 principles")).toBeInTheDocument()

    for (const principle of principles) {
      expect(
        screen.getByRole("heading", { level: 3, name: principle.title })
      ).toBeInTheDocument()
      expect(screen.getByText(principle.description)).toBeInTheDocument()
    }
  })
})
