import { describe, it, expect } from 'vitest'
import { createOrbMaterial } from '../orbMaterial'

describe('createOrbMaterial', () => {
  it('exposes the expected uniforms with sane defaults', () => {
    const m = createOrbMaterial()
    for (const key of ['uTime', 'uAudioAmp', 'uSparkle', 'uSpectrum', 'uBaseAmp', 'uScroll']) {
      expect(m.uniforms[key]).toBeDefined()
    }
    expect(m.uniforms.uTime.value).toBe(0)
    expect(m.uniforms.uBaseAmp.value).toBeGreaterThan(0)
    expect(Array.isArray(m.uniforms.uSpectrum.value.toArray?.() ?? m.uniforms.uSpectrum.value)).toBe(true)
  })
})
