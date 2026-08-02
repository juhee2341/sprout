import { setupServer } from "msw/node"

import { handlers } from "./handlers"

// Node(테스트) 환경용 msw 서버. jest.setup.ts 에서 수명주기를 관리한다.
export const server = setupServer(...handlers)
