import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

function mockMatch(matches: boolean) {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches,
    media: q,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  }))
}

describe('usePrefersReducedMotion', () => {
  it('true when user prefers reduced motion', () => {
    mockMatch(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })
  it('false otherwise', () => {
    mockMatch(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })
})
