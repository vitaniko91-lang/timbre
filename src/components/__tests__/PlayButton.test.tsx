import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayButton } from '../PlayButton'

describe('PlayButton', () => {
  it('is a real button reflecting playing state via aria-pressed', async () => {
    const onToggle = vi.fn()
    const { rerender } = render(<PlayButton playing={false} onToggle={onToggle} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
    expect(btn).toHaveAccessibleName(/play/i)
    await userEvent.click(btn)
    expect(onToggle).toHaveBeenCalledTimes(1)
    rerender(<PlayButton playing onToggle={onToggle} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })
})
