import { Link, NavLink } from 'react-router-dom'
import { MobileMenu } from './MobileMenu'
import { hnbgCorporateContact } from '../data/businesses'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/businesses', label: 'Our Businesses' },
  { to: '/careers', label: 'Careers' },
  { to: '/press', label: 'Press & News' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const phone = hnbgCorporateContact.phone
  const email = hnbgCorporateContact.email

  return (
    <header className="hg-header">
      <div className="hg-topbar">
        <div className="hg-shell hg-topbar__inner">
          {phone ? <a href={`tel:${phone}`}>{phone}</a> : <span>Phone pending verification</span>}
          {email ? <a href={`mailto:${email}`}>{email}</a> : <span>Email pending verification</span>}
        </div>
      </div>
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
