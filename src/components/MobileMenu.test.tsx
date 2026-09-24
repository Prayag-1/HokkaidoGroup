import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MobileMenu } from './MobileMenu'

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
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
describe('site menu', () => {
  it('keeps the requested contacts and division links together', () => {
    openMenu()
    expect(screen.getByRole('link', { name: '9801011301' })).toHaveAttribute('href', 'tel:9801011301')
    expect(screen.getByRole('link', { name: 'hokkaidoramenhouse@gmail.com' })).toHaveAttribute('href', 'mailto:hokkaidoramenhouse@gmail.com')
    for (const category of ['HOMA Nepal — Skincare', 'Japanese imports — Imports', 'General']) {
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
    expect(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    ).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(
      screen.getByRole('button', { name: 'Close navigation menu' }),
    )
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
    fireEvent.click(screen.getByRole('link', { name: 'About Hokkaido' }))
    finishClosing()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
