import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import { HeroSection } from '../HeroSection'

// Orb uses WebGL (unavailable in jsdom) — stub it out for this DOM-focused test.
vi.mock('../../orb/LiquidOrb', () => ({ LiquidOrb: () => <div data-testid="orb" /> }))

function Harness() {
  const bandsRef = useRef({ bass: 0, mid: 0, treble: 0 })
  const scrollRef = useRef(0)
  return <HeroSection bandsRef={bandsRef} scrollRef={scrollRef} playing={false} onToggle={() => {}} reducedMotion />
}

describe('HeroSection', () => {
  it('renders the h1, sub, play button and stats', () => {
    render(<Harness />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/see the sound/i)
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    expect(screen.getByText('24-bit')).toBeInTheDocument()
    expect(screen.getByText('360°')).toBeInTheDocument()
  })
})
