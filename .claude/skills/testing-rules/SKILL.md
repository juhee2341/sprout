---
name: testing-rules
description: How to test Next.js code in this project. Load when writing tests, debugging test failures, or deciding how to cover a specific pattern (Server Component, Server Action, Route Handler, hook).
---

# Testing Rules

## Stack

Jest + @swc/jest · @testing-library/react + user-event · msw v2 · jest-dom. **No E2E.**

## Decision tree

```
Utility           → Jest unit test, 100% branch coverage
Custom Hook       → renderHook, wrap in providers if needed
Client Component  → render() + screen + userEvent, msw for HTTP
Server Component  → Extract data function → unit-test that.
                    Async RSC rendering is NOT supported in Jest.
                    Refactor to accept props if you must assert on markup.
Server Action     → Import & call. Mock next/cache, next/navigation.
                    Assert { success, data | error } and side effects.
Route Handler     → Build NextRequest, call handler(request).
                    Assert response.status and body.
```

## Rules

- Co-locate: `Foo.tsx` → `Foo.test.tsx`
- Shared helpers: `src/test-utils/`, msw: `src/mocks/`
- Test name: verb phrase — "returns null when unauthenticated"
- One behavior per `it`
- `userEvent` over `fireEvent`
- Never test implementation details
- Never weaken assertions to make a failing test pass

## Coverage targets

| Type | Line | Branch |
|------|------|--------|
| Utilities | 100 | 100 |
| Hooks | 90 | 85 |
| Client Components | 80 | 75 |
| Server Actions | 80 | 80 |
| Route Handlers | 80 | 80 |

## Cover

Happy path, edge cases (empty/null/boundary), errors, side effects.

## Do NOT test

Implementation details, third-party internals, static markup, TypeScript types.

## msw setup (once per project)

Files:
- `jest.setup.ts` (project root)
- `src/mocks/handlers.ts` — request handlers
- `src/mocks/server.ts` — `export const server = setupServer(...handlers)`

`jest.config.ts` must reference the setup file:
```ts
setupFilesAfterEach: ['<rootDir>/jest.setup.ts']
```

`jest.setup.ts`:
```ts
import { server } from './src/mocks/server';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```
