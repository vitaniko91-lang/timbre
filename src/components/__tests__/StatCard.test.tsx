import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '../StatCard'

describe('StatCard', () => {
  it('renders value and label', () => {
    render(<StatCard value="24-bit" label="lossless" />)
    expect(screen.getByText('24-bit')).toBeInTheDocument()
    expect(screen.getByText('lossless')).toBeInTheDocument()
  })
})
