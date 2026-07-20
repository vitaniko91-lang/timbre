import { describe, it, expect } from 'vitest'
import { colors, motion } from '../tokens'

describe('tokens', () => {
  it('exposes Pearl Prism core colors', () => {
    expect(colors.bg).toBe('#F4F6FF')
    expect(colors.ink).toBe('#0E1130')
    expect(colors.indigo).toBe('#5B6CFF')
  })
  it('exposes spectrum accents', () => {
    expect(colors.spectrum).toEqual(['#FF4DD2', '#7EE8FF', '#FFD23D', '#78FFC8'])
  })
  it('exposes motion durations in ms', () => {
    expect(motion.durations).toEqual({ fast: 200, normal: 400, slow: 600, dramatic: 1000 })
  })
})
