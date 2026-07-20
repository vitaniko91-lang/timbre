import { SectionReveal } from '../components/SectionReveal'
import { StatCard } from '../components/StatCard'

const SPECS = [
  { value: '40 mm', label: 'planar driver' },
  { value: '24-bit', label: 'lossless dac' },
  { value: '360°', label: 'spatial audio' },
  { value: '48 h', label: 'battery' },
  { value: '0 ms', label: 'wired latency' },
  { value: 'Ti', label: 'titanium frame' },
]

export function Specs() {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[clamp(110px,16vh,190px)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[3vw] left-[3vw] select-none font-display text-[22vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.04]"
      >
        02
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-1/3 h-[46vh] w-[46vh] rounded-full opacity-45 blur-[90px] [background:radial-gradient(closest-side,rgba(255,77,210,0.22),transparent_72%)]"
      />
      <SectionReveal>
        <div className="relative mx-auto max-w-[1280px]">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            <span className="h-px w-8 bg-indigo/60" /> 02 · Engineered
          </p>
          <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(32px,5.4vw,72px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            Built to{' '}
            <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_45%,#FF4DD2_85%)] bg-clip-text text-transparent">disappear</span>.
          </h2>
          <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-muted">
            Everything measurable, engineered out of the way — so the only thing left is the sound, and the light it casts.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {SPECS.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
