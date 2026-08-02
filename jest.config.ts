import type { Config } from "jest"
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  // Next.js 설정과 .env 를 테스트 환경에 로드
  dir: "./",
})

const config: Config = {
  coverageProvider: "v8",
  // jest-fixed-jsdom: jsdom 에 fetch/Request/Response 등 Node 전역을 되살려 msw v2 호환
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // @/* → src/* (tsconfig paths 와 일치, next/jest 가 대부분 처리하지만 명시)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**/{layout,page}.tsx",
    "!src/mocks/**",
    "!src/test-utils/**",
  ],
}

// createJestConfig 는 next/jest 가 비동기 Next 설정을 로드할 수 있도록 이렇게 export
export default createJestConfig(config)
