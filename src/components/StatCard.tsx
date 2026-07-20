import { GlassCard } from './GlassCard'
export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <GlassCard className="px-5 py-4">
      <div className="font-display text-2xl font-semibold tracking-tight text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted">{label}</div>
    </GlassCard>
  )
}
