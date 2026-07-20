import { describe, it, expect } from 'vitest'
import { computeBands } from '../computeBands'

// fftSize 2048 -> 1024 bins. sampleRate 48000 -> binHz = 48000/2048 ≈ 23.4375 Hz
const SR = 48000, FFT = 2048, BINS = FFT / 2

function freqAt(hz: number, value = 255): Uint8Array {
  const arr = new Uint8Array(BINS)
  const bin = Math.round(hz / (SR / FFT))
  arr[bin] = value
  return arr
}

describe('computeBands', () => {
  it('returns zeros for a silent spectrum', () => {
    const b = computeBands(new Uint8Array(BINS), SR, FFT)
    expect(b).toEqual({ bass: 0, mid: 0, treble: 0 })
  })
  it('puts 100 Hz energy in bass', () => {
    const b = computeBands(freqAt(100), SR, FFT)
    expect(b.bass).toBeGreaterThan(0)
    expect(b.mid).toBe(0)
    expect(b.treble).toBe(0)
  })
  it('puts 1 kHz energy in mid', () => {
    const b = computeBands(freqAt(1000), SR, FFT)
    expect(b.mid).toBeGreaterThan(0)
    expect(b.bass).toBe(0)
    expect(b.treble).toBe(0)
  })
  it('puts 8 kHz energy in treble', () => {
    const b = computeBands(freqAt(8000), SR, FFT)
    expect(b.treble).toBeGreaterThan(0)
  })
  it('normalizes full-scale energy toward 1', () => {
    const arr = new Uint8Array(BINS).fill(255)
    const b = computeBands(arr, SR, FFT)
    expect(b.bass).toBeCloseTo(1, 1)
  })
})
