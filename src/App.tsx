import { useAudioEngine } from './audio/useAudioEngine'
import { useScrollProgress } from './scroll/useScrollProgress'
import { usePrefersReducedMotion } from './scroll/usePrefersReducedMotion'
import { HeroSection } from './sections/HeroSection'
import { HowItWorks } from './sections/HowItWorks'
import { Specs } from './sections/Specs'
import { Spectrum } from './sections/Spectrum'
import { PreorderCTA } from './sections/PreorderCTA'
import { Footer } from './sections/Footer'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const { isPlaying, play, pause, bandsRef } = useAudioEngine('/audio/timbre-demo.wav')
  const scrollRef = useScrollProgress()
  const onToggle = () => (isPlaying ? pause() : play())
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[6vw] py-5 text-sm">
        <span className="font-display text-lg font-semibold text-ink">TIMBRE</span>
        <nav className="flex gap-7 text-muted"><a href="#sound">Sound</a><a href="#tech">Tech</a><a href="#preorder">Pre-order</a></nav>
      </header>
      <main>
        <HeroSection bandsRef={bandsRef} scrollRef={scrollRef} playing={isPlaying} onToggle={onToggle} reducedMotion={reduced} />
        <div id="sound"><HowItWorks /></div>
        <div id="tech"><Specs /></div>
        <Spectrum />
        <div id="preorder"><PreorderCTA /></div>
      </main>
      <Footer />
    </>
  )
}
