import { describe, it, expect } from 'vitest'
import { createOrbMaterial } from '../orbMaterial'

describe('createOrbMaterial', () => {
  it('is a physical material exposing orb uniforms with sane defaults', () => {
    const m = createOrbMaterial()
    expect(m.transmission).toBeGreaterThan(0)
    expect(m.iridescence).toBeGreaterThan(0)
    const u = m.userData.uniforms
    for (const key of ['uTime', 'uAudioAmp', 'uSparkle', 'uSpectrum', 'uBaseAmp', 'uScroll']) {
      expect(u[key as keyof typeof u]).toBeDefined()
    }
    expect(u.uTime.value).toBe(0)
    expect(u.uBaseAmp.value).toBeGreaterThan(0)
  })
})
