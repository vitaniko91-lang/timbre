import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HowItWorks } from '../HowItWorks'
import { Specs } from '../Specs'
import { Spectrum } from '../Spectrum'
import { PreorderCTA } from '../PreorderCTA'
import { Footer } from '../Footer'

describe('content sections', () => {
  it('HowItWorks has a level-2 heading', () => {
    render(<HowItWorks />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
  it('Specs renders a grid of stat values', () => {
    render(<Specs />)
    expect(screen.getByText(/40 mm/i)).toBeInTheDocument()
    expect(screen.getByText(/48 h/i)).toBeInTheDocument()
  })
  it('Spectrum explains sound-to-color', () => {
    render(<Spectrum />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/spectrum|colou?r/i)
  })
  it('PreorderCTA has a real actionable control', () => {
    render(<PreorderCTA />)
    expect(screen.getByRole('link', { name: /pre-?order/i })).toBeInTheDocument()
  })
  it('Footer is a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
