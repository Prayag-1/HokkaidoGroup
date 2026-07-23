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

export function SiteHeader() {
  return (
    <header className="hg-header">
      <div className="hg-shell hg-header__inner">
        <Link to="/" className="hg-logo" aria-label="Hokkaido Group home">
          Hokkaido <span>Group</span>
        </Link>

        <nav className="hg-nav" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/booking" className="hg-button hg-button--outline-dark">
          Reserve
        </Link>
      </div>
    </header>
  )
}
