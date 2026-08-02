---
name: error-handling
description: Error handling patterns for Next.js App Router — error.tsx, not-found.tsx, Server Action error returns, Route Handler responses. Load when writing error UI or catch blocks.
---

# Error Handling

## Server Actions

- Never `throw` to the client. Return `{ success: true, data } | { success: false, error, code? }`
- Codes: `VALIDATION_ERROR` · `UNAUTHORIZED` · `NOT_FOUND` · `RATE_LIMITED` · `INTERNAL`
- Log server-side with context; return generic Korean message to client
- Consume with `useActionState`

## Route Handlers

- Proper HTTP status (400 / 401 / 403 / 404 / 409 / 422 / 429 / 500)
- Body: `{ error, code?, details? }`
- No stack traces to client

## Server Components

- Uncaught throws bubble to nearest `error.tsx`
- For "not found": call `notFound()` from `next/navigation`
- Data errors: catch and render fallback, or re-throw to boundary

## Client Components

- Wrap risky components in error boundaries
- Async in event handler: store error in state, render inline

## Required files

- `src/app/global-error.tsx` — root fallback (replaces root layout, catches root errors)
- `src/app/error.tsx` — root segment boundary
- `src/app/not-found.tsx` — root 404 handler
- Per-segment: `error.tsx` / `not-found.tsx` can be placed in any route segment (e.g. `(dashboard)/error.tsx`) to scope error UI. Nearest ancestor wins.
- `loading.tsx` — only when the segment needs a specific Suspense fallback

## Rules

- User-facing messages in Korean
- Structured logs: `{ userId, action, error }` — not string concat
- Distinguish operational (retry) vs programmer (bug) errors
- Never swallow errors silently
- Don't try/catch just to log and re-throw
