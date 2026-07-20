/** Fraction (0..1) of `scrollTop` between `start` and `start+height`. */
export function sectionProgress(scrollTop: number, start: number, height: number): number {
  if (height <= 0) return 0
  const p = (scrollTop - start) / height
  return Math.min(1, Math.max(0, p))
}
