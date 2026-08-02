// @testing-library/jest-dom 커스텀 매처(.toBeInTheDocument() 등) 등록
import "@testing-library/jest-dom"

// msw 는 설치·스캐폴딩(src/mocks/) 되어 있으나, 아직 목킹할 네트워크 경계
// (API 라우트·클라이언트 fetch)가 없어 서버 수명주기는 비활성 상태다.
// 첫 네트워크 호출이 생기면 아래를 활성화한다:
//
//   import { server } from "./src/mocks/server"
//   beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
//   afterEach(() => server.resetHandlers())
//   afterAll(() => server.close())
//
// 이때 msw v2 의 ESM 의존성 때문에 next.config.ts 의 transpilePackages 에
// msw 체인(msw, @mswjs/interceptors, rettime, until-async 등)을 추가해야 한다.
// jest-fixed-jsdom(testEnvironment) 는 이미 그 준비를 마쳤다.
