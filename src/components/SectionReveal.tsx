import { useEffect, useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../scroll/usePrefersReducedMotion'

export function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = 'opacity 600ms cubic-bezier(0.23,1,0.32,1), transform 600ms cubic-bezier(0.23,1,0.32,1)'
        el.style.opacity = '1'; el.style.transform = 'none'
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])
  return <div ref={ref}>{children}</div>
}
