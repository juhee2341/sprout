import { render, screen, within } from "@/test-utils/render"

import {
  initialToastState,
  type ToastInstance,
  type ToastPlaygroundState,
} from "../hooks/useToastPlayground"
import { ToastPreview } from "./ToastPreview"

const noop = () => {}

function makeToast(overrides: Partial<ToastInstance> = {}): ToastInstance {
  return {
    id: 1,
    title: "변경 사항을 저장했어요",
    description: "",
    tone: "info",
    priority: "background",
    action: "none",
    closeButton: true,
    duration: 5000,
    ...overrides,
  }
}

function renderPreview({
  state,
  toasts = [],
  pendingCount = 0,
  onPush = noop,
  onDismiss = noop,
}: {
  state?: Partial<ToastPlaygroundState>
  toasts?: ToastInstance[]
  pendingCount?: number
  onPush?: () => void
  onDismiss?: (id: number) => void
} = {}) {
  return render(
    <ToastPreview
      state={{ ...initialToastState, ...state }}
      toasts={toasts}
      pendingCount={pendingCount}
      onPush={onPush}
      onDismiss={onDismiss}
      onClear={noop}
    />
  )
}

describe("ToastPreview", () => {
  it("토스트 띄우기 를 누르면 onPush 를 호출한다", async () => {
    const onPush = jest.fn()
    const { user } = renderPreview({ onPush })

    await user.click(screen.getByRole("button", { name: "토스트 띄우기" }))

    expect(onPush).toHaveBeenCalledTimes(1)
  })

  it("떠 있는 토스트의 제목과 설명을 렌더한다", () => {
    renderPreview({
      toasts: [
        makeToast({ title: "파일을 삭제했어요", description: "회의록.pdf" }),
      ],
    })

    expect(screen.getByText("파일을 삭제했어요")).toBeInTheDocument()
    expect(screen.getByText("회의록.pdf")).toBeInTheDocument()
  })

  it("설명이 비어 있으면 렌더하지 않는다", () => {
    renderPreview({
      toasts: [makeToast({ title: "저장했어요", description: "" })],
    })

    expect(screen.getByRole("listitem")).toHaveTextContent("저장했어요")
    expect(screen.queryByText("회의록.pdf")).not.toBeInTheDocument()
  })

  it("tone 은 색 말고 텍스트 라벨로도 구분된다", () => {
    renderPreview({ toasts: [makeToast({ tone: "error" })] })

    // 색을 보지 못해도 알 수 있도록 성격을 텍스트로도 알린다
    expect(screen.getByRole("listitem")).toHaveTextContent("오류:")
  })

  it("priority 는 스크린 리더 안내의 aria-live 를 바꾼다", () => {
    const { rerender } = renderPreview({
      toasts: [makeToast({ priority: "background" })],
    })

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite")

    rerender(
      <ToastPreview
        state={initialToastState}
        toasts={[makeToast({ priority: "foreground" })]}
        onPush={noop}
        onDismiss={noop}
        onClear={noop}
      />
    )

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "assertive")
  })

  it("action=undo 면 되돌리기 버튼을 렌더한다", () => {
    renderPreview({ toasts: [makeToast({ action: "undo" })] })

    expect(
      screen.getByRole("button", { name: "되돌리기" })
    ).toBeInTheDocument()
  })

  it("action=none 이면 액션 버튼이 없다", () => {
    renderPreview({ toasts: [makeToast({ action: "none" })] })

    expect(
      screen.queryByRole("button", { name: "되돌리기" })
    ).not.toBeInTheDocument()
  })

  it("closeButton=true 면 닫기 버튼으로 해당 토스트를 닫는다", async () => {
    const onDismiss = jest.fn()
    const { user } = renderPreview({
      toasts: [makeToast({ id: 7 })],
      onDismiss,
    })

    await user.click(screen.getByRole("button", { name: "닫기" }))

    expect(onDismiss).toHaveBeenCalledWith(7)
  })

  it("closeButton=false 면 닫기 버튼이 없다", () => {
    renderPreview({ toasts: [makeToast({ closeButton: false })] })

    expect(screen.queryByRole("button", { name: "닫기" })).not.toBeInTheDocument()
  })

  it("겹쳐 쌓기는 카드를 같은 자리에 포개고 최신 것을 맨 앞에 둔다", () => {
    renderPreview({
      state: { stackMode: "stack", position: "bottom-right" },
      toasts: [
        makeToast({ id: 1, title: "먼저" }),
        makeToast({ id: 2, title: "나중" }),
      ],
    })

    const [older, newer] = screen.getAllByRole("listitem")

    // 둘 다 같은 그리드 칸을 쓴다
    expect(newer).toHaveStyle({ gridArea: "1 / 1" })
    // 최신 것은 밀리지 않고 맨 앞
    expect(newer).toHaveStyle({ transform: "translateY(0px) scale(1)" })
    expect(older.style.transform).toContain("translateY(-10px)")
    expect(Number(older.style.zIndex)).toBeLessThan(Number(newer.style.zIndex))
  })

  it("나란히 쌓기는 겹침 스타일을 주지 않는다", () => {
    renderPreview({
      state: { stackMode: "list" },
      toasts: [makeToast({ id: 1 }), makeToast({ id: 2 })],
    })

    for (const item of screen.getAllByRole("listitem")) {
      expect(item.style.transform).toBe("")
      expect(item.style.gridArea).toBe("")
    }
  })

  it("대기 중인 토스트가 있으면 개수를 함께 알려준다", () => {
    renderPreview({ toasts: [makeToast()], pendingCount: 2 })

    expect(screen.getByText(/떠 있는 토스트 1개/)).toHaveTextContent("대기 2개")
  })

  it("여러 개가 떠 있으면 모두 렌더하고 개수를 알려준다", () => {
    renderPreview({
      toasts: [
        makeToast({ id: 1, title: "첫 번째" }),
        makeToast({ id: 2, title: "두 번째" }),
      ],
    })

    const list = screen.getByRole("list")
    expect(within(list).getByText("첫 번째")).toBeInTheDocument()
    expect(within(list).getByText("두 번째")).toBeInTheDocument()
    expect(screen.getByText("떠 있는 토스트 2개")).toBeInTheDocument()
  })
})
