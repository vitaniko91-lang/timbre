import { SectionReveal } from '../components/SectionReveal'
export function Spectrum() {
  return (
    <section className="px-[6vw] py-[clamp(96px,14vh,160px)]">
      <SectionReveal>
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">03 · Spectrum</p>
          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(30px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            Every sound has a colour.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            Lows glow magenta, mids drift cyan, highs spark gold. The orb reads your track's frequency balance and
            paints it — the same idea that gives every instrument its timbre.
          </p>
          <div className="mt-8 h-3 w-full max-w-[560px] rounded-pill bg-[linear-gradient(90deg,#FF4DD2,#7EE8FF,#FFD23D,#78FFC8)]" aria-hidden />
        </div>
      </SectionReveal>
    </section>
  )
}
