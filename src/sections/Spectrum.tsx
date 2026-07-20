import { SectionReveal } from '../components/SectionReveal'

const LEGEND = [
  { band: 'Lows', color: '#FF4DD2', pos: 'left-0' },
  { band: 'Mids', color: '#7EE8FF', pos: 'left-1/2 -translate-x-1/2' },
  { band: 'Highs', color: '#FFD23D', pos: 'right-0' },
]

export function Spectrum() {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[clamp(110px,16vh,190px)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[3vw] right-[3vw] select-none font-display text-[22vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.04]"
      >
        03
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[100px] [background:radial-gradient(closest-side,rgba(91,108,255,0.22),rgba(255,77,210,0.14)_60%,transparent_78%)]"
      />
      <SectionReveal>
        <div className="relative mx-auto max-w-[1000px] text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            <span className="h-px w-8 bg-indigo/60" /> 03 · Spectrum <span className="h-px w-8 bg-indigo/60" />
          </p>
          <h2 className="mx-auto mt-6 max-w-[16ch] font-display text-[clamp(34px,6vw,84px)] font-semibold leading-[1.0] tracking-[-0.02em] text-ink">
            Every sound has a{' '}
            <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_45%,#FF4DD2_85%)] bg-clip-text text-transparent">colour</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">
            Lows glow magenta, mids drift cyan, highs spark gold. TIMBRE reads your track's balance and paints it —
            the same physics that gives every instrument its timbre.
          </p>

          {/* frequency → colour bar with labeled markers */}
          <div className="relative mx-auto mt-16 max-w-[640px]">
            <div className="h-3 w-full rounded-pill bg-[linear-gradient(90deg,#FF4DD2,#7EE8FF_50%,#FFD23D)]" />
            <div className="relative mt-4 h-5">
              {LEGEND.map((l) => (
                <div key={l.band} className={`absolute top-0 ${l.pos} flex items-center gap-2`}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{l.band}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
