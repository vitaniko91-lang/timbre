export interface Bands { bass: number; mid: number; treble: number }

const RANGES = { bass: [20, 250], mid: [250, 4000], treble: [4000, 16000] } as const

/** Average byte magnitude (0..255) within a Hz range, normalized to 0..1. */
function bandEnergy(freq: Uint8Array, lo: number, hi: number, binHz: number): number {
  const start = Math.max(0, Math.floor(lo / binHz))
  const end = Math.min(freq.length - 1, Math.ceil(hi / binHz))
  if (end < start) return 0
  let sum = 0
  for (let i = start; i <= end; i++) sum += freq[i]
  const avg = sum / (end - start + 1)
  return avg / 255
}

export function computeBands(freq: Uint8Array, sampleRate: number, fftSize: number): Bands {
  const binHz = sampleRate / fftSize
  return {
    bass: bandEnergy(freq, RANGES.bass[0], RANGES.bass[1], binHz),
    mid: bandEnergy(freq, RANGES.mid[0], RANGES.mid[1], binHz),
    treble: bandEnergy(freq, RANGES.treble[0], RANGES.treble[1], binHz),
  }
}
