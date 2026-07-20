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
    <section className="px-[6vw] py-[clamp(96px,14vh,160px)]">
      <SectionReveal>
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">02 · Specs</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {SPECS.map((s) => <StatCard key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
