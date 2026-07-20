import type { RefObject } from 'react'
import type { Bands } from '../audio/computeBands'
import { LiquidOrb } from '../orb/LiquidOrb'
import { PlayButton } from '../components/PlayButton'
import { StatCard } from '../components/StatCard'

interface Props {
  bandsRef: RefObject<Bands>
  scrollRef: RefObject<number>
  playing: boolean
  onToggle: () => void
  reducedMotion: boolean
}

export function HeroSection({ bandsRef, scrollRef, playing, onToggle, reducedMotion }: Props) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-[6vw] pt-24 lg:pt-0">
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-[3vw] lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-muted">TIMBRE · premium audio</p>
          <h1 className="font-display text-[clamp(44px,7vw,104px)] font-semibold leading-[0.92] tracking-[-0.03em] text-ink">
            SEE <br />THE <span className="font-light text-ink/50">SOUND</span>
          </h1>
          <p className="mt-6 max-w-[30ch] text-lg leading-relaxed text-muted">
            A single living form that ripples, refracts and glows in real time to whatever you play.
          </p>
          <div className="mt-9"><PlayButton playing={playing} onToggle={onToggle} /></div>
        </div>
        <div className="relative h-[70vh]">
          <LiquidOrb bandsRef={bandsRef} scrollRef={scrollRef} reducedMotion={reducedMotion} />
          <div className="absolute right-[2%] top-[6%]"><StatCard value="24-bit" label="lossless" /></div>
          <div className="absolute bottom-[10%] right-[12%]"><StatCard value="360°" label="spatial" /></div>
          <div className="absolute bottom-[22%] left-[-4%]"><StatCard value="0 ms" label="latency" /></div>
        </div>
      </div>
    </section>
  )
}
