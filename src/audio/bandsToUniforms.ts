import type { Bands } from './computeBands'

export interface OrbUniformValues {
  uAudioAmp: number
  uSparkle: number
  uSpectrum: [number, number, number]
}

const INDIGO: [number, number, number] = [0x5b / 255, 0x6c / 255, 1]
const MAGENTA: [number, number, number] = [1, 0x4d / 255, 0xd2 / 255]
const CYAN: [number, number, number] = [0x7e / 255, 0xe8 / 255, 1]
const GOLD: [number, number, number] = [1, 0xd2 / 255, 0x3d / 255]

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Map frequency bands to orb shader uniform values. Pure + deterministic. */
export function bandsToUniforms(b: Bands, gain = 1.1): OrbUniformValues {
  const total = b.bass + b.mid + b.treble
  let spectrum: [number, number, number]
  if (total < 1e-4) {
    spectrum = [...INDIGO]
  } else {
    // Blend accents by which bands dominate; magenta=bass, cyan=mid, gold=treble.
    const r = (MAGENTA[0] * b.bass + CYAN[0] * b.mid + GOLD[0] * b.treble) / total
    const g = (MAGENTA[1] * b.bass + CYAN[1] * b.mid + GOLD[1] * b.treble) / total
    const bl = (MAGENTA[2] * b.bass + CYAN[2] * b.mid + GOLD[2] * b.treble) / total
    spectrum = [clamp01(r), clamp01(g), clamp01(bl)]
  }
  return {
    uAudioAmp: clamp01(b.bass * gain),
    uSparkle: clamp01(b.treble),
    uSpectrum: spectrum,
  }
}
