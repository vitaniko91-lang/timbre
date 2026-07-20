export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-[6vw] py-12">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <span className="font-display text-lg font-semibold text-ink">TIMBRE</span>
        <nav className="flex gap-6"><a href="#sound">Sound</a><a href="#tech">Tech</a><a href="#preorder">Pre-order</a></nav>
        <span>Concept piece · Vitalina Nikulina</span>
      </div>
    </footer>
  )
}
