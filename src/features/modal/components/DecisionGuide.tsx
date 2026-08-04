"use client"

import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"

import { cn } from "@/lib/utils"

import { decisionGuides, type DecisionKey, type DecisionGuide } from "../modal.data"

function Section({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-border pt-3 first:border-t-0 first:pt-0">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold">
        <span aria-hidden>{icon}</span>
        {title}
      </h4>
      <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item} className="flex gap-1.5">
          <span aria-hidden className="select-none">
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function GuideBody({ guide }: { guide: DecisionGuide }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-muted/40 p-3">
      <Section icon="📖" title="무엇을 정하나">
        {guide.summary}
      </Section>

      <Section icon="🎯" title="이런 상황에서 자주 쓰입니다">
        <Bullets items={guide.fits} />
      </Section>

      <Section icon="⚠️" title="이런 상황에서는 신중하게">
        <Bullets items={guide.careful} />
      </Section>

      <Section icon="⚖️" title="Trade-off">
        <dl className="flex flex-col gap-2">
          {guide.tradeOffs.map((tradeOff) => (
            <div key={tradeOff.label}>
              <dt className="font-medium text-foreground">{tradeOff.label}</dt>
              <dd className="mt-0.5">
                <Bullets items={tradeOff.points} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section icon="💡" title="왜?">
        {guide.why}
      </Section>

      {guide.evidence?.length ? (
        <Section icon="🔍" title="근거">
          <ul className="flex flex-col gap-2">
            {guide.evidence.map((item) => (
              <li key={item.url + item.source}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
                >
                  {item.source}
                  <span className="sr-only"> (새 탭에서 열림)</span>
                </a>
                <p className="mt-0.5">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  )
}

/**
 * 옵션 하나의 판단 근거를 접었다 펴는 영역.
 * 기본은 접힌 상태 — 컨트롤 목록의 훑어보기 흐름을 깨지 않으면서,
 * "왜 이걸 고르지?"가 떠오른 순간에만 열리게 한다.
 */
export function DecisionGuide({
  decisionKey,
  label,
}: {
  decisionKey: DecisionKey
  label: string
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const guide = decisionGuides[decisionKey]

  return (
    <div className="mt-2.5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        왜 이 선택을 하나요?
        <span className="sr-only">{` — ${label}`}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <div id={panelId} hidden={!open} className="mt-2">
        {open && <GuideBody guide={guide} />}
      </div>
    </div>
  )
}
