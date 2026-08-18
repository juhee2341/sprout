import { GITHUB_URL, STACK_TAGS, STATUS_LABEL } from "@/constants/site"

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-end gap-10 px-14 pt-24 pb-[120px] lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="mb-6 font-mono text-[13px] tracking-[0.06em] text-brand-accent">
          FRONTEND PLAYGROUND — {STATUS_LABEL}
        </p>

        {/*
          "기록"만 강조하면 단어가 요소로 쪼개져 보조기술이 "기록 합니다"로
          끊어 읽는다. 눈으로 보이는 강조는 유지하고 읽히는 문장만 바로잡는다.
        */}
        {/*
          핸드오프의 76px 은 이 한글 카피와 1.1fr 컬럼(1280 기준 620px)에
          들어가지 않는다 — 둘째 줄만 909px 이라 의도한 2줄 구성이 깨진다.
          구성을 살리는 최대 크기로 맞추고, 좁은 화면에서는 함께 줄인다.
        */}
        <h1
          aria-label="UI를 만드는 게 아니라, 왜 이렇게 만드는지 기록합니다."
          className="mb-7 text-[clamp(2rem,3.8vw,50px)] leading-[1.02] font-semibold tracking-[-0.02em] break-keep"
        >
          UI를 만드는 게 아니라,
          <br />왜 이렇게 만드는지{" "}
          <span className="text-brand-accent">기록</span>합니다.
        </h1>

        <p className="mb-10 max-w-[520px] text-[18px] leading-[1.6] break-keep text-brand-muted">
          같은 컴포넌트를 다른 방식으로 짜보고, 트레이드오프를 비교하고, 그
          결정을 남기는 프론트엔드 실험실입니다.
        </p>

        <div className="flex flex-wrap gap-[14px]">
          <a
            href="#roadmap"
            className="bg-brand-accent px-6 py-[14px] font-mono text-[14px] font-medium text-brand-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            플레이그라운드 둘러보기 →
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brand-cta-border px-6 py-[14px] font-mono text-[14px] text-brand-fg-cta transition-colors hover:border-brand-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            GitHub
          </a>
        </div>
      </div>

      <ul className="border-l border-brand-line pl-8 font-mono text-[13px] leading-[2] text-brand-stack">
        {STACK_TAGS.map((tag) => (
          <li key={tag}>
            <span aria-hidden>· </span>
            {tag}
          </li>
        ))}
      </ul>
    </section>
  )
}
