@AGENTS.md

# Claude Code Toolkit

Next.js 프로젝트를 위한 Claude Code 커스텀 Skills & Agents.

## 문서

- **기획서**: TBD
- **디자인 (Figma)**: TBD
- **스타일 가이드**: TBD

---

## 스택

- **Framework**: Next.js (App Router, `src/app/`)
- **Language**: TypeScript strict
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Validation**: zod (모든 boundary 입력 검증)
- **Testing**: Jest + @testing-library/react + msw v2 (E2E 없음)
- **Package manager**: pnpm

## 폴더 구조

```
src/
  app/                라우트·레이아웃·액션
    (그룹)/
    api/              웹훅 / OAuth 콜백만
    actions/          Server Actions
  components/
    ui/               shadcn/ui (직접 수정 금지)
    common/           재사용 범용 컴포넌트
    layout/           헤더·푸터 등 레이아웃 조각
    <feature>/        단순 프리젠테이션 컴포넌트 (예: landing/)
  features/
    <feature>/        자기완결형 기능 모듈 (예: modal/ 플레이그라운드)
      components/     모듈 전용 컴포넌트
      hooks/          모듈 전용 훅
      <feature>.data.ts  모듈 정적 데이터
  hooks/
  lib/
    auth.ts           requireAuth() 등 인증 헬퍼
    validators/       zod 스키마 — <domain>.schema.ts
  types/
  constants/          정적 상수·설정 데이터
  mocks/              msw
  test-utils/
```

**파일명**: 컴포넌트 `PascalCase`, 그 외 `kebab-case`, 테스트는 co-located.
예외 — `components/ui/`는 shadcn/ui 생성 관례를 따라 소문자(`button.tsx`) 유지.

**`components/<feature>/` vs `features/<feature>/`**: 여러 페이지에서 재사용되는
단순 컴포넌트는 `components/`, 자체 상태·훅·데이터를 가진 자기완결형 기능은
`features/`. 훅·상수는 모듈 안에 co-locate 하고, 전역 공유 시에만 `hooks/`·`constants/`.

## Scripts

- `pnpm dev` — 개발 서버
- `pnpm build` — 프로덕션 빌드
- `pnpm test` / `pnpm test:coverage` — Jest
- `pnpm lint` / `pnpm typecheck` — ESLint · TS 검사

## 환경 변수

- 서버 전용: 접두사 없음 (`DATABASE_URL`, `AUTH_SECRET`)
- 클라이언트 노출: `NEXT_PUBLIC_*` (누구나 볼 수 있음, 시크릿 금지)
- 로컬: `.env.local` (커밋 금지). Vercel 동기화: `vercel env pull`

## 렌더링 전략

| 라우트 | 전략 |
|--------|------|
| 마케팅 / 정적 | Static (SSG) |
| 상품 목록 등 | Cache Components (`"use cache"` + `cacheLife('minutes')`) |
| 대시보드 | Dynamic + Suspense 스트리밍 |
| 실시간 | Dynamic + `no-store` |

## 상태 위치 결정

```
서버 데이터?           → Server Component + Server Action + revalidate
URL 공유/새로고침?     → searchParams (nuqs 권장)
한 컴포넌트?           → useState
자주 안 변하고 넓게?   → Context
자주 변하고 넓게?      → Zustand (마지막 수단)
```

## z-index 스케일

`z-10` 헤더 · `z-20` 드롭다운 · `z-40` 모달 오버레이 · `z-50` 모달 · `z-[60]` 토스트 · `z-[70]` 툴팁

## 필수 사항

- 모든 async Server Component는 `<Suspense>` 경계 안에 배치
- 모든 Server Action / Route Handler는 진입 첫 줄에서 zod 파싱
- 모든 mutating Server Action은 `await requireAuth()`로 시작

## 금지 사항

- `useEffect` for data fetching / derived state
- `React.FC` 타입 어노테이션
- `className` 문자열 `+` 연결 → `cn()` from `lib/utils`
- `console.log` 커밋
- `any` (정당한 이유 없이)
- Server Action에서 client로 `throw`
- 하드코딩된 hex 컬러
- Server Action `export default` (named export만)

---

## Skills (프로젝트 커스텀)

`.claude/skills/<이름>/SKILL.md` — Claude가 관련 작업 시 자동 로드.

| Skill | 트리거 |
|-------|--------|
| **testing-rules** | 테스트 작성 / 디버깅 |
| **a11y-standards** | UI 코드 / 접근성 감사 |
| **security-standards** | Server Action / Route Handler / 인증 / 폼 |
| **error-handling** | 에러 UI / 에러 반환 |
| **form-patterns** | 폼 작성 |

## Agents (프로젝트 커스텀)

| Agent | 트리거 |
|-------|--------|
| **test-writer** | 테스트 작성·실행 |
| **code-reviewer** | 코드 리뷰 (버그·보안·성능·접근성 통합) |
| **a11y-auditor** | 접근성 감사 후 수정 |

## Vercel 공식 Skills (플러그인 자동 제공)

`~/.claude/plugins/cache/claude-plugins-official/vercel/<version>/skills/`

프로젝트에 복사 안 함 — 플러그인 업데이트 시 자동 최신화. 팀원은 `/plugin` 명령으로 `vercel` 플러그인 설치.

**주요 Vercel 스킬** (관련 작업 시 자동 로드):
- `vercel:nextjs` — App Router, 라우팅, 데이터 패칭
- `vercel:next-cache-components` — PPR, `use cache`, cacheTag
- `vercel:shadcn` — 컴포넌트 설치, 테마
- `vercel:ai-sdk`, `vercel:ai-gateway` — AI 기능
- `vercel:deploy`, `vercel:deployments-cicd`, `vercel:env-vars` — 배포
- `vercel:vercel-functions`, `vercel:routing-middleware` — 런타임
- 그 외 auth, turbopack, storage, firewall, marketplace 등 26개

---

## 실행 흐름 예시

```
"테스트 짜줘"       → test-writer agent + testing-rules skill
"코드 리뷰해줘"     → code-reviewer agent + 관련 skills 전부
"접근성 확인"       → a11y-auditor agent + a11y-standards skill
UI 컴포넌트 작성    → a11y-standards + security-standards 자동 로드
Server Action 작성  → security-standards + error-handling 자동 로드
폼 작성             → form-patterns + a11y-standards + security-standards
배포 관련           → vercel:deploy (Vercel 공식)
```
