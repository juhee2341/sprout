import { principles } from "@/constants/principles"

import { SectionHeader } from "./SectionHeader"

export function Why() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="mx-auto w-full max-w-[1280px] px-14 pb-[120px]"
    >
      <SectionHeader
        id="why-title"
        title="왜 Sprout인가"
        label={`${String(principles.length).padStart(2, "0")} principles`}
      />

      {principles.map((principle, index) => (
        <div
          key={principle.title}
          className="grid grid-cols-1 items-start gap-6 border-b border-brand-line-softer py-8 md:grid-cols-[80px_1fr_1.4fr]"
        >
          <span aria-hidden className="font-mono text-[14px] text-brand-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[22px] font-semibold">{principle.title}</h3>
          <p className="text-[16px] leading-[1.6] break-keep text-brand-desc">
            {principle.description}
          </p>
        </div>
      ))}
    </section>
  )
}
