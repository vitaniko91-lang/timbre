import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Returns a ref holding whole-page scroll progress 0..1; runs Lenis smooth-scroll unless reduced-motion. */
export function useScrollProgress() {
  const progressRef = useRef(0)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    if (reduced) {
      window.addEventListener('scroll', update, { passive: true })
      update()
      return () => window.removeEventListener('scroll', update)
    }
    const lenis = new Lenis({ smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); update(); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [reduced])
  return progressRef
}
