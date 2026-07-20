import { describe, it, expect } from 'vitest'
import { bandsToUniforms } from '../bandsToUniforms'

describe('bandsToUniforms', () => {
  it('silence -> zero amp, zero sparkle, indigo base color', () => {
    const u = bandsToUniforms({ bass: 0, mid: 0, treble: 0 })
    expect(u.uAudioAmp).toBe(0)
    expect(u.uSparkle).toBe(0)
    // indigo #5B6CFF ≈ [0.357, 0.424, 1]
    expect(u.uSpectrum[2]).toBeGreaterThan(u.uSpectrum[0])
  })
  it('bass drives amplitude', () => {
    const lo = bandsToUniforms({ bass: 0.2, mid: 0, treble: 0 })
    const hi = bandsToUniforms({ bass: 0.9, mid: 0, treble: 0 })
    expect(hi.uAudioAmp).toBeGreaterThan(lo.uAudioAmp)
  })
  it('treble drives sparkle', () => {
    const u = bandsToUniforms({ bass: 0, mid: 0, treble: 0.8 })
    expect(u.uSparkle).toBeCloseTo(0.8, 5)
  })
  it('clamps color channels to 0..1', () => {
    const u = bandsToUniforms({ bass: 1, mid: 1, treble: 1 })
    for (const c of u.uSpectrum) { expect(c).toBeGreaterThanOrEqual(0); expect(c).toBeLessThanOrEqual(1) }
  })
})
