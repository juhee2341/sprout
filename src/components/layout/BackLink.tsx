import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface BackLinkProps {
  /** 돌아갈 곳. 기본은 홈 */
  href?: string
  /** 링크 문구 — 아이콘만 두지 않는다 */
  label?: string
  className?: string
}

/**
 * 하위 페이지에서 상위로 돌아가는 링크.
 * 플레이그라운드 페이지들이 공통으로 쓴다.
 */
export function BackLink({
  href = "/",
  label = "홈으로",
  className,
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-1.5 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
    >
      <ArrowLeft
        aria-hidden
        className="size-4 transition-transform group-hover:-translate-x-0.5"
      />
      {label}
    </Link>
  )
}
