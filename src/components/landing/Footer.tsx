import { GITHUB_URL } from "@/constants/site"

export function Footer() {
  return (
    <footer className="border-t border-brand-line-soft">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-14 py-8 font-mono text-[13px] text-brand-label">
        <div className="flex items-center gap-2">
          <span aria-hidden>🌱</span>
          <span>sprout — {new Date().getFullYear()}</span>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-brand-fg focus-visible:text-brand-fg focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  )
}
