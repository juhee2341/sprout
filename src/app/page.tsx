import { Footer } from "@/components/landing/Footer"
import { Hero } from "@/components/landing/Hero"
import { Roadmap } from "@/components/landing/Roadmap"
import { Why } from "@/components/landing/Why"
import { SiteHeader } from "@/components/layout/SiteHeader"

export default function Home() {
  return (
    // 랜딩은 라이트/다크 전환 없이 항상 다크 — 디자인 핸드오프 기준
    <div className="flex flex-1 flex-col bg-brand-bg text-brand-fg">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Why />
        <Roadmap />
      </main>
      <Footer />
    </div>
  )
}
