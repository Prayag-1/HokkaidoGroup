import { BusinessImage } from './BusinessImage'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { primaryNavLinks } from '../config/nav'
import { businesses, businessCategories, hokkaidoGroupLogo, menuContactPhone } from '../data/businesses'
import { GroupContact } from './GroupContact'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeMenu = () => {
    if (!dialog.current || closeTimer.current) return
    dialog.current.dataset.closing = 'true'
    closeTimer.current = setTimeout(
      () => {
        dialog.current?.close()
        closeTimer.current = null
      },
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220,
    )
  }
  useEffect(() => {
    if (!isOpen) return
    const element = dialog.current
    if (!element) return
    const triggerElement = trigger.current
    const scrollY = window.scrollY
    const openedUrl = window.location.href
    const oldStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    element.removeAttribute('data-closing')
    element.showModal()
    const panel = element.querySelector('.site-menu__panel')
    if (panel) panel.scrollTop = 0
    element
      .querySelector<HTMLButtonElement>(
        'button[aria-label="Close navigation menu"]',
      )
      ?.focus({ preventScroll: true })
    Object.assign(document.body.style, {
      overflow: 'hidden',
      position: 'fixed',
      top: `-${scrollY}px`,
      width: '100%',
    })
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
      closeTimer.current = null
      element.close()
      Object.assign(document.body.style, oldStyle)
      window.scrollTo({ top: window.location.href === openedUrl ? scrollY : 0, behavior: 'instant' })
      triggerElement?.focus({ preventScroll: true })
    }
  }, [isOpen])
  return (
    <>
      <button
        ref={trigger}
        className="corporate-hamburger"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="site-menu"
      >
        <span />
        <span />
        <span />
      </button>
      {createPortal(
        <dialog
          ref={dialog}
          id="site-menu"
          className="site-menu"
          aria-label="Hokkaido Group navigation"
          onKeyDown={(event) => {
            if (event.key !== 'Tab') return
            const focusable = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>(
                'a[href],button:not([disabled]),[tabindex="0"]',
              ),
            ).filter((el) => el.getClientRects().length > 0)
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first?.focus()
            }
          }}
          onCancel={(event) => {
            event.preventDefault()
            closeMenu()
          }}
          onClose={() => setIsOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMenu()
          }}
        >
          <div
            className="site-menu__panel"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) closeMenu()
            }}
          >
            <div className="site-menu__top">
              <Link to="/" className="corporate-logo">
                <img src={hokkaidoGroupLogo} alt="Hokkaido Group" />
                <span>Hokkaido Group</span>
              </Link>
              <button
                autoFocus
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <X />
              </button>
            </div>
            <div className="site-menu__layout">
              <div className="site-menu__navigation">
                <nav aria-label="All pages">
                  {primaryNavLinks.map((link) => (
                    <NavLink key={link.to} to={link.to}>
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <GroupContact phone={menuContactPhone} />
              </div>
              <div className="site-menu__brands">
                {businessCategories.map((category) => (
                  <section key={category}>
                    <h2>
                      {category === 'Restaurant'
                        ? 'Restaurants'
                        : category === 'Skin Care'
                          ? 'HOMA Nepal — Skincare'
                          : category === 'Imports'
                            ? 'Imports'
                            : category}
                    </h2>
                    <div className="site-menu__brand-grid">
                      {businesses
                        .filter((b) => b.category === category)
                        .map((b) => (
                          <article key={b.id}>
                            <Link to={`/businesses/${b.slug}`}>
                              <BusinessImage business={b} />
                              <h3>{b.name}</h3>
                            </Link>
                            <Link
                              className="site-menu__location"
                              to={`/businesses/${b.slug}`}
                            >
                              {b.locationSummary ?? b.address}
                            </Link>
                          </article>
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </dialog>,
        document.body,
      )}
    </>
  )
}
