import { SectionReveal } from '../components/SectionReveal'
export function PreorderCTA() {
  return (
    <section className="px-[6vw] py-[clamp(120px,18vh,200px)] text-center">
      <SectionReveal>
        <div className="mx-auto max-w-[720px]">
          <h2 className="font-display text-[clamp(34px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            Hear it. See it.
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-lg text-muted">The first TIMBRE run ships this winter.</p>
          <a
            href="#preorder"
            className="mt-8 inline-flex rounded-pill bg-[linear-gradient(90deg,#6a7cff,#7ee8ff)] px-8 py-4 font-sans font-semibold text-[#08103a] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:transform-none"
          >
            Pre-order — $349
          </a>
        </div>
      </SectionReveal>
    </section>
  )
}
