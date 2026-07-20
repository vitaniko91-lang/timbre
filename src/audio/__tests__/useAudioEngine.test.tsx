import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAudioEngine } from '../useAudioEngine'

class FakeAnalyser {
  fftSize = 2048; frequencyBinCount = 1024
  getByteFrequencyData(a: Uint8Array) { a.fill(128) }
  connect() {} disconnect() {}
}
class FakeCtx {
  state = 'suspended'; sampleRate = 48000
  createAnalyser() { return new FakeAnalyser() as unknown as AnalyserNode }
  createMediaElementSource() { return { connect: () => {} } as unknown as MediaElementAudioSourceNode }
  get destination() { return {} as AudioDestinationNode }
  resume() { this.state = 'running'; return Promise.resolve() }
}

beforeEach(() => {
  vi.stubGlobal('AudioContext', FakeCtx as unknown as typeof AudioContext)
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { cb(0); return 1 })
  vi.stubGlobal('cancelAnimationFrame', () => {})
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
  HTMLMediaElement.prototype.pause = vi.fn()
})

describe('useAudioEngine', () => {
  it('starts not playing with zeroed bands', () => {
    const { result } = renderHook(() => useAudioEngine('/audio/timbre-demo.mp3'))
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.bandsRef.current).toEqual({ bass: 0, mid: 0, treble: 0 })
  })
  it('play() resumes context, sets isPlaying, updates bands', async () => {
    const { result } = renderHook(() => useAudioEngine('/audio/timbre-demo.mp3'))
    await act(async () => { await result.current.play() })
    expect(result.current.isPlaying).toBe(true)
    // 128/255 ≈ 0.50 across all bands from FakeAnalyser
    expect(result.current.bandsRef.current.bass).toBeCloseTo(0.5, 1)
  })
})
