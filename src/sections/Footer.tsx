export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 px-[6vw] pb-10 pt-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="font-display text-2xl font-semibold tracking-tight text-ink">TIMBRE</div>
            <p className="mt-2 max-w-[28ch] text-sm text-muted">Premium audio you can see. Sound, made visible.</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            <a href="#sound" className="transition-colors hover:text-ink">Sound</a>
            <a href="#tech" className="transition-colors hover:text-ink">Tech</a>
            <a href="#preorder" className="transition-colors hover:text-ink">Pre-order</a>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs uppercase tracking-[0.14em] text-muted">
          <span>© 2026 TIMBRE — concept piece</span>
          <span>Designed &amp; built by Vitalina Nikulina</span>
        </div>
      </div>

      {/* oversized wordmark bleeding off the bottom edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[3.5vw] left-1/2 w-full -translate-x-1/2 select-none text-center font-display text-[19vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.035]"
      >
        TIMBRE
      </span>
    </footer>
  )
}
