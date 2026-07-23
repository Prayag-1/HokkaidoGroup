import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/#story', label: 'About' },
  { to: '/#brands', label: 'Brands' },
  { to: '/#locations', label: 'Locations' },
  { to: '/#gallery', label: 'Gallery' },
  { to: '/booking', label: 'Booking' },
  { to: '/contact', label: 'Contact' },
] as const

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="hg-hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="hg-hamburger__line"></span>
        <span className="hg-hamburger__line"></span>
        <span className="hg-hamburger__line"></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="hg-mobile-menu-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* Mobile Menu Sidebar */}
      <nav className={`hg-mobile-menu ${isOpen ? 'hg-mobile-menu--open' : ''}`} aria-label="Mobile navigation">
        <div className="hg-mobile-menu__header">
          <Link to="/" className="hg-logo" onClick={closeMenu} aria-label="Hokkaido Group home">
            Hokkaido <span>Group</span>
          </Link>
          <button
            className="hg-mobile-menu__close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <div className="hg-mobile-menu__links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hg-mobile-menu__link ${isActive ? 'hg-mobile-menu__link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/booking"
          className="hg-button hg-button--outline-dark hg-mobile-menu__button"
          onClick={closeMenu}
        >
          Reserve
        </Link>
      </nav>
    </>
  )
}
