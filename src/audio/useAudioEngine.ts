import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { computeBands, type Bands } from './computeBands'

export function useAudioEngine(src: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const bandsRef = useRef<Bands>({ bass: 0, mid: 0, treble: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef<number | null>(null)
  const inTickRef = useRef(false)

  // Lazy <audio> element (preload none until play)
  useMemo(() => {
    if (typeof Audio === 'undefined') return
    const el = new Audio(src)
    el.preload = 'none'
    el.crossOrigin = 'anonymous'
    el.loop = true
    audioRef.current = el
  }, [src])

  const tick = useCallback(() => {
    // Re-entrancy guard: some test doubles for requestAnimationFrame invoke
    // their callback synchronously (real browsers never do — the callback
    // fires on the next paint, after this call stack has fully unwound).
    // Without this guard, a synchronous rAF mock recursing into tick() from
    // inside the `requestAnimationFrame(tick)` call below would recurse
    // unboundedly. The inner call bails out immediately; the outer call has
    // already sampled the analyser before scheduling, so no frame is lost.
    if (inTickRef.current) return
    inTickRef.current = true
    const analyser = analyserRef.current, ctx = ctxRef.current
    if (analyser && ctx) {
      const data = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(data)
      bandsRef.current = computeBands(data, ctx.sampleRate, analyser.fftSize)
    }
    rafRef.current = requestAnimationFrame(tick)
    inTickRef.current = false
  }, [])

  const play = useCallback(async () => {
    const el = audioRef.current
    if (!el) return
    if (!ctxRef.current) {
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      const source = ctx.createMediaElementSource(el)
      source.connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
    }
    await ctxRef.current.resume()
    await el.play()
    setIsPlaying(true)
    if (rafRef.current == null) tick()
  }, [tick])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    audioRef.current?.pause()
    ctxRef.current?.close?.()
  }, [])

  return { isPlaying, play, pause, bandsRef }
}
