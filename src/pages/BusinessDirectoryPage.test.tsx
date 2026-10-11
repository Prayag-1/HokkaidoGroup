import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BusinessDirectoryPage } from './BusinessDirectoryPage'

vi.mock('../components/LocationSpotlight', () => ({
  LocationSpotlight: () => <div>Restaurant map preview</div>,
}))

describe('restaurant directory controls', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('toggles the map view with an accessible pressed state', () => {
    render(<MemoryRouter><BusinessDirectoryPage /></MemoryRouter>)
    const toggle = screen.getByRole('button', { name: 'Map view' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Hide map' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Restaurant map preview')).toBeInTheDocument()
  })
  it('opens directly into map view when the view query is set', () => {
    render(<MemoryRouter initialEntries={['/businesses?view=map']}><BusinessDirectoryPage /></MemoryRouter>)

    expect(screen.getByRole('button', { name: 'Hide map' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Restaurant map preview')).toBeInTheDocument()
  })
  it('links each restaurant Directions action to a Google Maps destination route', () => {
    render(<MemoryRouter><BusinessDirectoryPage /></MemoryRouter>)

    const directionLinks = screen.getAllByRole('link', { name: 'Directions' })
    expect(directionLinks.length).toBeGreaterThan(0)
    for (const link of directionLinks) {
      expect(link.getAttribute('href')).toMatch(/^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=/)
    }
  })
  it('uses the HOMA and Janeichi brand logos in Beyond Dining', () => {
    render(<MemoryRouter><BusinessDirectoryPage /></MemoryRouter>)
    const beyondDining = screen.getByRole('region', { name: 'Beyond Dining' })

    const homaLogo = within(beyondDining).getByRole('link', { name: /HOMA Nepal/ }).querySelector('img')
    const janeichiLogo = within(beyondDining).getByRole('link', { name: /Janeichi Business/ }).querySelector('img')

    expect(homaLogo?.getAttribute('src')).toContain('images.png')
    expect(janeichiLogo?.getAttribute('src')).toContain('janeichi-logo.webp')
  })
})
