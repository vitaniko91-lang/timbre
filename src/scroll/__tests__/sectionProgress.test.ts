import { describe, it, expect } from 'vitest'
import { sectionProgress } from '../sectionProgress'

describe('sectionProgress', () => {
  it('0 at/above the top, 1 at/below the bottom', () => {
    expect(sectionProgress(0, 0, 1000)).toBe(0) // scroll at top
    expect(sectionProgress(1000, 0, 1000)).toBe(1) // scrolled full height
  })
  it('is linear in the middle', () => {
    expect(sectionProgress(500, 0, 1000)).toBeCloseTo(0.5, 5)
  })
  it('clamps outside the range', () => {
    expect(sectionProgress(-200, 0, 1000)).toBe(0)
    expect(sectionProgress(2000, 0, 1000)).toBe(1)
  })
})
