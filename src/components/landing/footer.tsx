const GITHUB_URL = "https://github.com/juhee2341/sprout"

const stack = ["Next.js", "TypeScript", "Tailwind CSS"]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          Built with{" "}
          {stack.map((tech, i) => (
            <span key={tech}>
              <span className="font-medium text-foreground">{tech}</span>
              {i < stack.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
