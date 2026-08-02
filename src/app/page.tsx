import { Hero } from "@/components/landing/hero"
import { Why } from "@/components/landing/why"
import { Roadmap } from "@/components/landing/roadmap"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <Hero />
        <Why />
        <Roadmap />
      </main>
      <Footer />
    </div>
  )
}
