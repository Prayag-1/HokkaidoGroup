import { Link, NavLink } from 'react-router-dom'
import { MobileMenu } from './MobileMenu'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/businesses', label: 'Our Businesses' },
  { to: '/careers', label: 'Careers' },
  { to: '/press', label: 'Press & News' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  return (
    <header className="hg-header">
      <div className="hg-shell hg-header__inner">
        <MobileMenu />

        <Link to="/" className="hg-logo" aria-label="HNBG home">
          HNBG<span>Corporate</span>
        </Link>

        <nav className="hg-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="hg-button hg-button--outline-dark">
          Get in Touch
        </Link>
      </div>
    </header>
  )
}
