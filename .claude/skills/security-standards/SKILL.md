---
name: security-standards
description: Security checklist for Server Actions, Route Handlers, forms, auth, secrets, and user input. Load when writing security-sensitive code or reviewing for OWASP-level issues.
---

# Security Standards

## Critical

- Secrets in client code or committed
- SQL/NoSQL injection from unsanitized input
- XSS from unescaped `dangerouslySetInnerHTML`
- Server Action mutation without auth check
- SSRF: user-controlled URL in `fetch()`
- Open redirect: `redirect(searchParams.next)` without allowlist

## Major

- Missing zod parse on Server Action / Route Handler input
- Sensitive data in Server Component props (hashes, tokens)
- Overly permissive CORS
- Missing rate limiting on public endpoints (login, signup, password reset)
- File upload without MIME/size validation

## Minor

- Missing security headers (CSP, HSTS, X-Frame-Options)
- Stack traces leaked to client
- Missing `SameSite`/`Secure`/`HttpOnly` on cookies

## Rules

- **Every Server Action & Route Handler MUST zod-parse input at the top**
- **Every mutating Server Action MUST check auth at the top** (`await requireAuth()` from `src/lib/auth.ts` — throws/redirects if unauthenticated)
- Server-only secrets: unprefixed env vars. `NEXT_PUBLIC_*` = public
- ORM query builder or parameterized queries only. Never string-concat SQL
- User URL in `<a href>` / `<img src>`: block `javascript:`, `data:`
- Redirect allowlist: must start with `/`, no `//` (protocol-relative)
- File upload: validate magic bytes not `file.type`, rename to UUID
- Passwords: bcrypt cost 12+ or argon2id
- Never log tokens, PII, or secrets

## Security headers (middleware or next.config.ts)

`Strict-Transport-Security` · `X-Content-Type-Options: nosniff` · `X-Frame-Options: DENY` · `CSP` with nonce · `Referrer-Policy: strict-origin-when-cross-origin`
