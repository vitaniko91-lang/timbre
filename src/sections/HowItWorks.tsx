import { SectionReveal } from '../components/SectionReveal'
import { GlassCard } from '../components/GlassCard'

const BANDS = [
  { name: 'Bass', hz: '20–250 Hz', color: '#FF4DD2', copy: 'Swells the whole surface — the ripple you feel in your chest.' },
  { name: 'Mids', hz: '250 Hz – 4 kHz', color: '#7EE8FF', copy: 'Steer the hue — vocals and instruments paint the body.' },
  { name: 'Highs', hz: '4 – 16 kHz', color: '#A66CFF', copy: 'Spark the light — cymbals and air catch as glints.' },
]

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[clamp(110px,16vh,190px)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[3vw] right-[3vw] select-none font-display text-[22vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.04]"
      >
        01
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-1/2 h-[52vh] w-[52vh] -translate-y-1/2 rounded-full opacity-50 blur-[90px] [background:radial-gradient(closest-side,rgba(126,232,255,0.3),transparent_72%)]"
      />
      <SectionReveal>
        <div className="relative mx-auto max-w-[1280px]">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            <span className="h-px w-8 bg-indigo/60" /> 01 · How it works
          </p>
          <h2 className="mt-6 max-w-[17ch] font-display text-[clamp(32px,5.4vw,72px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            Play anything. The form{' '}
            <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_45%,#FF4DD2_85%)] bg-clip-text text-transparent">is</span>{' '}
            the sound.
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted">
            No visualizer preset. The glass reads your track frequency by frequency and reshapes itself in real time —
            the shape you see is the sound you hear.
          </p>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {BANDS.map((b) => (
              <GlassCard key={b.name} className="p-7">
                <span className="block h-1.5 w-16 rounded-full" style={{ background: b.color }} />
                <div className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">{b.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">{b.hz}</div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{b.copy}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
