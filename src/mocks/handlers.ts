import type { RequestHandler } from "msw"

/**
 * msw 요청 핸들러. API 라우트가 생기면 여기에 추가한다. 예:
 *
 *   import { http, HttpResponse } from "msw"
 *   http.get("/api/health", () => HttpResponse.json({ ok: true }))
 */
export const handlers: RequestHandler[] = []
