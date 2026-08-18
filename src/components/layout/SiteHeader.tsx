import { GITHUB_URL } from "@/constants/site"

const navItems = [
  { label: "why", href: "#why" },
  { label: "roadmap", href: "#roadmap" },
  { label: "github ↗", href: GITHUB_URL, external: true },
]

/** 랜딩 페이지 상단 바 — 워드마크 + 앵커 내비 */
export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-14 py-7">
      <div className="flex items-center gap-2.5">
        {/* 흔들림은 장식일 뿐이라 모션을 줄인 사용자에게는 멈춘다 */}
        <span
          aria-hidden
          className="inline-block origin-bottom text-[20px] motion-safe:animate-sway"
        >
          🌱
        </span>
        <span className="font-mono text-[15px] tracking-[0.02em]">sprout</span>
      </div>

      <nav
        aria-label="주요"
        className="flex items-center gap-8 font-mono text-[13px] text-brand-muted"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="transition-colors hover:text-brand-fg focus-visible:text-brand-fg focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
