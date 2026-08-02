import { Button } from "@/components/ui/button"

const GITHUB_URL = "https://github.com/juhee2341/sprout"

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 py-28 text-center sm:py-36">
      <span className="text-6xl sm:text-7xl" aria-hidden>
        🌱
      </span>

      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Sprout
        </h1>
        <p className="max-w-xl text-lg leading-8 text-muted-foreground">
          A frontend playground for exploring UI components and engineering
          decisions.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-11 px-6 text-base">
          <a href="#roadmap">Explore</a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-11 px-6 text-base"
        >
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Button>
      </div>
    </section>
  )
}
