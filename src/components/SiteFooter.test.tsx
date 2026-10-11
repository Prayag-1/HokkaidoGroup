import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { businesses } from '../data/businesses'
import { SiteFooter } from './SiteFooter'

describe('site footer', () => {
  it('links only to active pages and uses consistent accessible logo tiles', () => {
    render(<MemoryRouter><SiteFooter /></MemoryRouter>)
    const footerNav = screen.getByRole('navigation', { name: 'Footer navigation' })
    for (const label of ['Our Restaurants', 'About Us', 'Catering & Events', 'Contact Us', 'Locations', 'Japanese Lifestyle', 'Membership', 'Our Brands']) {
      expect(within(footerNav).getByRole('link', { name: label })).toHaveAttribute('href')
      expect(within(footerNav).getByRole('link', { name: label })).not.toHaveAttribute('href', '/')
    }

    const tiles = screen.getByRole('region', { name: 'Our Brands' }).querySelectorAll<HTMLAnchorElement>('.footer-brand-strip__tile')
    expect(tiles).toHaveLength(businesses.filter((business) => business.logo).length)
    for (const tile of tiles) {
      const image = tile.querySelector('img')!
      expect(image).toHaveAttribute('alt')
      expect(image).toHaveAttribute('width', '96')
      expect(image).toHaveAttribute('height', '96')
      expect(tile.getAttribute('href')).toMatch(/^\/(mart|businesses\/)/)
    }
    const groupLogo = screen.getByRole('link', { name: 'Hokkaido Group' }).querySelector('img')
    expect(groupLogo).toHaveAttribute('width', '75')
    expect(groupLogo).toHaveAttribute('height', '75')
    expect(groupLogo).toHaveAttribute('loading', 'lazy')
  })
})
