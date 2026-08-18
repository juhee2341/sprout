/** 섹션 제목 + 우측 라벨 + 밑줄 — Why·Roadmap 이 공유하는 머리 */
export function SectionHeader({
  title,
  label,
  id,
}: {
  title: string
  label: string
  /** 제목 요소 id — 섹션의 aria-labelledby 로 쓴다 */
  id: string
}) {
  return (
    <div className="mb-14 flex items-baseline justify-between gap-4 border-b border-brand-line pb-5">
      <h2 id={id} className="text-[32px] font-semibold">
        {title}
      </h2>
      <span className="font-mono text-[13px] whitespace-nowrap text-brand-label">
        {label}
      </span>
    </div>
  )
}
