import { render, screen } from "@/test-utils/render"

import { decisionGuides } from "../modal.data"
import { DecisionGuide } from "./DecisionGuide"

describe("DecisionGuide", () => {
  it("기본은 접힌 상태로 렌더한다", () => {
    render(<DecisionGuide decisionKey="overlayClose" label="Overlay Click" />)

    const trigger = screen.getByRole("button", { name: /왜 이 선택을 하나요/ })

    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(
      screen.queryByText(decisionGuides.overlayClose.why)
    ).not.toBeInTheDocument()
  })

  it("펼치면 해당 옵션의 판단 근거를 보여준다", async () => {
    const { user } = render(
      <DecisionGuide decisionKey="overlayClose" label="Overlay Click" />
    )

    await user.click(screen.getByRole("button", { name: /왜 이 선택을 하나요/ }))

    const guide = decisionGuides.overlayClose

    expect(
      screen.getByRole("button", { name: /왜 이 선택을 하나요/ })
    ).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(guide.summary)).toBeInTheDocument()
    expect(screen.getByText(guide.why)).toBeInTheDocument()
    expect(screen.getByText(guide.fits[0])).toBeInTheDocument()
    expect(screen.getByText(guide.careful[0])).toBeInTheDocument()
    expect(screen.getByText(guide.tradeOffs[0].label)).toBeInTheDocument()
  })

  it("근거가 있으면 출처 링크를 새 탭으로 연다", async () => {
    const { user } = render(
      <DecisionGuide decisionKey="escClose" label="ESC Close" />
    )

    await user.click(screen.getByRole("button", { name: /왜 이 선택을 하나요/ }))

    const evidence = decisionGuides.escClose.evidence?.[0]
    const link = screen.getByRole("link", {
      name: new RegExp(evidence!.source.split(" — ")[0]),
    })

    expect(link).toHaveAttribute("href", evidence!.url)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noreferrer")
  })

  it("근거가 없는 옵션은 근거 섹션을 렌더하지 않는다", async () => {
    const { user } = render(
      <DecisionGuide decisionKey="size:sm" label="Size — Small" />
    )

    await user.click(screen.getByRole("button", { name: /왜 이 선택을 하나요/ }))

    expect(decisionGuides["size:sm"].evidence).toBeUndefined()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
    expect(screen.getByText(decisionGuides["size:sm"].why)).toBeInTheDocument()
  })

  it("aria-controls 가 실제 패널을 가리킨다", async () => {
    const { user } = render(
      <DecisionGuide decisionKey="content" label="Title·Description" />
    )

    const trigger = screen.getByRole("button", { name: /왜 이 선택을 하나요/ })
    const panelId = trigger.getAttribute("aria-controls")

    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toBeInTheDocument()

    await user.click(trigger)

    expect(document.getElementById(panelId!)).not.toHaveAttribute("hidden")
  })
})
