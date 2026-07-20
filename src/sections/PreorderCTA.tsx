import { SectionReveal } from '../components/SectionReveal'

export function PreorderCTA() {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[clamp(130px,20vh,220px)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[110px] [background:radial-gradient(closest-side,rgba(91,108,255,0.3),rgba(126,232,255,0.16)_45%,rgba(255,77,210,0.14)_70%,transparent_82%)]"
      />
      <SectionReveal>
        <div className="relative mx-auto max-w-[820px]">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            <span className="h-px w-8 bg-indigo/60" /> Pre-order
          </p>
          <h2 className="mt-7 font-display text-[clamp(40px,7vw,96px)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink">
            Hear it.{' '}
            <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_45%,#FF4DD2_85%)] bg-clip-text text-transparent">See it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">
            The first TIMBRE run is limited to 500 units and ships this winter.
          </p>
          <a
            href="#preorder"
            className="mt-10 inline-flex items-center gap-2 rounded-pill bg-ink px-9 py-4 font-sans font-semibold text-white shadow-[0_18px_50px_rgba(60,50,160,0.25)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:transform-none"
          >
            Pre-order — $349
          </a>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">Free shipping · 30-day returns</p>
        </div>
      </SectionReveal>
    </section>
  )
}
