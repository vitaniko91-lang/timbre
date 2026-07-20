import type { ReactNode } from 'react'
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-glass border border-white/80 bg-white/60 shadow-[0_20px_50px_rgba(60,50,160,0.12)] backdrop-blur-[14px] ${className}`}>
      {children}
    </div>
  )
}
