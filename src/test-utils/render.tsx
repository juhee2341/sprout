import { render, type RenderOptions } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement, ReactNode } from "react"

/**
 * 전역 프로바이더 래퍼. 향후 ThemeProvider·Context 등을 여기에 추가하면
 * 모든 테스트가 자동으로 감싸진다.
 */
function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/**
 * RTL render 를 프로바이더로 감싸고 userEvent 인스턴스를 함께 반환한다.
 */
function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Providers, ...options }),
  }
}

export * from "@testing-library/react"
export { renderWithProviders as render, userEvent }
