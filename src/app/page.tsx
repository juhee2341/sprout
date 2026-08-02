import { Hero } from "@/components/landing/Hero"
import { Why } from "@/components/landing/Why"
import { Roadmap } from "@/components/landing/Roadmap"
import { Footer } from "@/components/landing/Footer"

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
