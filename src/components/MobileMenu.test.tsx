import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MobileMenu } from './MobileMenu'
import { SiteHeader } from './SiteHeader'

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  vi.stubGlobal('scrollTo', vi.fn())
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})
function openMenu() {
  const result = render(
    <MemoryRouter>
      <MobileMenu />
    </MemoryRouter>,
  )
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }))
  return result
}
function finishClosing() {
  act(() => vi.runAllTimers())
}
function closeButton() {
  return document.querySelector<HTMLButtonElement>('.site-menu__top button')!
}
describe('site menu', () => {
  it('keeps the desktop restaurant CTA and mobile menu available', () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Find a Restaurant' })).toHaveAttribute('href', '/businesses')
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Experiences/ })).toHaveAttribute('aria-expanded', 'false')
  })
  it('opens the full navigation menu from the desktop header', () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }))

    expect(screen.getByRole('dialog', { name: 'Hokkaido Group navigation' })).toBeInTheDocument()
    expect(within(screen.getByRole('dialog', { name: 'Hokkaido Group navigation' })).getByRole('link', { name: 'Find a Restaurant' })).toHaveAttribute('href', '/businesses')
  })
  it('closes the other desktop dropdown when a dropdown opens', () => {
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    const restaurants = screen.getByRole('button', { name: /Our Restaurants/ })
    const experiences = screen.getByRole('button', { name: /Experiences/ })

    fireEvent.click(restaurants)
    expect(restaurants).toHaveAttribute('aria-expanded', 'true')
    expect(experiences).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(experiences)
    expect(experiences).toHaveAttribute('aria-expanded', 'true')
    expect(restaurants).toHaveAttribute('aria-expanded', 'false')
  })
  it('closes the other mobile accordion when an accordion opens', () => {
    openMenu()
    const restaurants = screen.getByRole('button', { name: /Our Restaurants/ })
    const experiences = screen.getByRole('button', { name: /Experiences/ })

    fireEvent.click(restaurants)
    expect(restaurants).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(experiences)
    expect(experiences).toHaveAttribute('aria-expanded', 'true')
    expect(restaurants).toHaveAttribute('aria-expanded', 'false')
  })
  it('keeps the requested contacts and division links together', () => {
    openMenu()
    fireEvent.click(screen.getByRole('button', { name: /Experiences/ }))
    expect(screen.getByRole('link', { name: '9801011301' })).toHaveAttribute('href', 'tel:9801011301')
    expect(screen.getByRole('link', { name: 'hokkaidogroupnepal@gmail.com' })).toHaveAttribute('href', 'mailto:hokkaidogroupnepal@gmail.com')
    expect(screen.getByRole('button', { name: /Our Restaurants/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Imports & Distribution' })).toBeInTheDocument()
    for (const category of ['HOMA Nepal — Skincare', 'Imports', 'General']) {
      expect(screen.getByRole('heading', { name: category })).toBeInTheDocument()
    }
    expect(screen.queryByText(/Onsen & resort/i)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hokkaido Dekkaido' })).toBeInTheDocument()
  })
  it('escapes the header containing block and locks background scrolling', () => {
    const { container } = openMenu()
    const dialog = screen.getByRole('dialog')
    expect(container.contains(dialog)).toBe(false)
    expect(dialog.parentElement).toBe(document.body)
    expect(document.body.style.position).toBe('fixed')
    expect(document.querySelector('.corporate-hamburger')).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(closeButton())
    finishClosing()
    expect(document.body.style.position).toBe('')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    ).toHaveFocus()
  })
  it('closes for Escape, backdrop, and internal navigation, and can reopen', () => {
    openMenu()
    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { cancelable: true }),
    )
    finishClosing()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    )
    fireEvent.click(screen.getByRole('dialog'))
    finishClosing()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    )
    fireEvent.click(screen.getByRole('link', { name: 'About Us' }))
    finishClosing()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
