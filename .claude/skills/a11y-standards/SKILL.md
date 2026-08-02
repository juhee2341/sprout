---
name: a11y-standards
description: WCAG 2.1 AA checklist for this project's UI. Load when writing UI code, auditing accessibility, or reviewing components for screen reader / keyboard support.
---

# Accessibility (WCAG 2.1 AA)

## Critical — ship blocker

- Missing/empty `alt` on meaningful images
- Interactive elements unreachable by keyboard
- Form inputs without associated label
- Contrast < 4.5:1 (normal) / < 3:1 (large ≥ 18px or bold ≥ 14px)
- Keyboard traps
- Missing `lang` on `<html>`

## Major — fix before merge

- Heading hierarchy skips levels
- Missing landmarks (`<main>`, `<nav>`, `<header>`)
- Icon-only button without `aria-label`
- Error not linked via `aria-describedby`
- `aria-hidden` on focusable elements
- Ignoring `prefers-reduced-motion`

## Minor

- Missing skip nav link
- Redundant ARIA (`role="button"` on `<button>`)
- Missing autocomplete on common form fields

## Rules

- Native HTML first, ARIA only when necessary
- Focus indicator `:focus-visible`, ≥ 3:1 contrast
- Modal: trap focus intentionally, release on Escape
- Form: every input labeled + autocomplete, errors via `aria-describedby`
- Dynamic updates: `aria-live` or `role="status"`
- Never convey info by color alone

## Next.js specific

- `next/image` always has `alt` (empty string for decorative)
- `next/link` wraps meaningful text, not bare icons
- Client-side navigation announces page title change
