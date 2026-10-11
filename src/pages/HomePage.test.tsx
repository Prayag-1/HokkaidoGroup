import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from './HomePage'

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('home hero', () => {
  it('keeps the headline and restaurant CTA destination', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('heading', { level: 1, name: 'A Taste of Japan, in the Heart of Nepal' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore Restaurants' })).toHaveAttribute('href', '/businesses')
    expect(screen.getByRole('link', { name: 'Explore Restaurants' })).toHaveClass('btn-primary')
  })
  it('keeps the six interest shortcuts on the opening hero image', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    const shortcuts = within(screen.getByRole('navigation', { name: 'Explore Hokkaido' }))
    const destinations = [
      ['Our Restaurants', '/businesses'],
      ['Stay With Us', '/businesses/dekkaido-farm-house'],
      ['Japanese Lifestyle', '/mart'],
      ['Catering & Events', '/catering'],
      ['Imports & Distribution', '/businesses/janeichi'],
      ['Hokkaido Privileges', '/membership'],
    ]

    for (const [label, href] of destinations) {
      expect(shortcuts.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })
  it('shows the supplied Google reviews and their source links', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: 'What Our Customers Say' })).toBeInTheDocument()
    expect(screen.getByText('Absolutely loved my visit to Hokkaido House in Sanepa - International Club!', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Srijal Prajapati · Hokkaido House')).toBeInTheDocument()
    expect(screen.getByText('Arun S. · Hokkaido Ramen House')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Review us on Google/ })).toHaveAttribute('href', expect.stringContaining('google.com'))
    expect(screen.getAllByRole('link', { name: /on Google/ })).toHaveLength(4)
  })
})
