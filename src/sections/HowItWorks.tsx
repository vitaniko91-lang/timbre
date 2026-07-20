import { SectionReveal } from '../components/SectionReveal'
export function HowItWorks() {
  return (
    <section className="px-[6vw] py-[clamp(96px,14vh,160px)]">
      <SectionReveal>
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">01 · How it works</p>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(30px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            Play anything. The form <span className="text-indigo">is</span> the sound.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            Bass swells the surface, mids and highs steer its color. No visualizer preset — the shape is your track,
            frequency by frequency, in real time.
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}
