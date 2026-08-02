---
name: form-patterns
description: Form patterns for this project — Server Action + useActionState + zod, and when to reach for react-hook-form + shadcn Form. Load when building forms or handling submissions.
---

# Form Patterns

## Decision matrix

| Situation | Pattern |
|-----------|---------|
| Simple form, no client feedback | `<form action={serverAction}>` (progressive enhancement) |
| Need pending state or inline error | `useActionState(action, initial)` |
| Many fields or cross-field validation | react-hook-form + `zodResolver` + shadcn `Form` |
| Autosave / debounced | react-hook-form + debounced Server Action |
| Multi-step wizard | Client state + Server Action on final submit |

## Canonical example (useActionState)

Initial state is `null` (idle). Server Action returns the union defined in `error-handling`.

```tsx
"use client";
import { useActionState } from "react";
import { subscribe } from "@/app/actions/subscribe";

type State = Awaited<ReturnType<typeof subscribe>> | null;

export function SubscribeForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => subscribe(formData),
    null,
  );
  const error = state && !state.success ? state.error : null;

  return (
    <form action={formAction}>
      <label htmlFor="email">이메일</label>
      <input id="email" name="email" type="email" autoComplete="email" required
        aria-invalid={!!error}
        aria-describedby={error ? "email-error" : undefined} />
      {error && <p id="email-error" role="alert">{error}</p>}
      <button type="submit" disabled={pending}>{pending ? "처리 중..." : "구독"}</button>
    </form>
  );
}
```

## Rules

- **zod schema = single source of truth** (share between client and server when possible)
- **Server validation is mandatory**; client validation is UX only
- Every input: label + `autoComplete` (email / current-password / new-password / one-time-code / name / tel)
- Error messages in Korean
- Disable submit while pending
- Reset repeatable forms on success
- Never `preventDefault` on `<form action={serverAction}>` — breaks progressive enhancement
