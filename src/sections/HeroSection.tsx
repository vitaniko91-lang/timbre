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
      {/* Atmosphere: soft color glow fields bleeding behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[6%] top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 rounded-full opacity-70 blur-[80px] [background:radial-gradient(closest-side,rgba(91,108,255,0.35),rgba(126,232,255,0.12)_55%,transparent_75%)]" />
        <div className="absolute right-[24%] top-[22%] h-[36vh] w-[36vh] rounded-full opacity-60 blur-[70px] [background:radial-gradient(closest-side,rgba(255,77,210,0.22),transparent_70%)]" />
      </div>

      {/* Giant ghost watermark, bleeding off the bottom edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[6vw] left-[-2vw] select-none font-display text-[26vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.045]"
      >
        TIMBRE
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-[3vw] lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            <span className="h-px w-8 bg-indigo/60" /> TIMBRE · premium audio
          </p>
          <h1 className="font-display text-[clamp(48px,7.4vw,116px)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink">
            SEE <br />THE <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_40%,#FF4DD2_80%)] bg-clip-text text-transparent">SOUND</span>
          </h1>
          <p className="mt-7 max-w-[32ch] text-lg leading-relaxed text-muted">
            A single drop of liquid glass — it ripples, refracts and re-colors in real time to the sound you play.
          </p>
          <div className="mt-9"><PlayButton playing={playing} onToggle={onToggle} /></div>
        </div>

        <div className="relative h-[78vh]">
          <LiquidOrb bandsRef={bandsRef} scrollRef={scrollRef} reducedMotion={reducedMotion} />
          <div className="absolute right-[4%] top-[8%]"><StatCard value="24-bit" label="lossless" /></div>
          <div className="absolute bottom-[14%] right-[10%]"><StatCard value="360°" label="spatial" /></div>
          <div className="absolute bottom-[26%] left-[-2%]"><StatCard value="0 ms" label="latency" /></div>
        </div>
      </div>

      {/* Fine grain for a premium, filmic surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  )
}
