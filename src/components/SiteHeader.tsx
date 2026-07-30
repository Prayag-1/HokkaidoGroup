import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MobileMenu } from './MobileMenu'
import { primaryNavLinks } from '../config/nav'
import { hnbgCorporateContact } from '../data/businesses'

function useHeaderScrolled() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 24)

  useEffect(() => {
    const updateHeaderState = () => {
      const heroThreshold = Math.min(window.innerHeight * 0.62, 520)
      setIsScrolled(window.scrollY > heroThreshold)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    window.addEventListener('resize', updateHeaderState)

    return () => {
      window.removeEventListener('scroll', updateHeaderState)
      window.removeEventListener('resize', updateHeaderState)
    }
  }, [])

  return isScrolled
}

export function SiteHeader() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isScrolled = useHeaderScrolled()
  const hasSolidChrome = !isHome || isScrolled
  const quickContactLinks = [
    hnbgCorporateContact.phone ? { href: `tel:${hnbgCorporateContact.phone}`, label: hnbgCorporateContact.phone } : null,
    hnbgCorporateContact.email ? { href: `mailto:${hnbgCorporateContact.email}`, label: hnbgCorporateContact.email } : null,
  ].filter(Boolean) as { href: string; label: string }[]
  const hasQuickContact = quickContactLinks.length > 0

  return (
    <header className={`corporate-header ${hasSolidChrome ? 'corporate-header--scrolled' : 'corporate-header--home-top'}`}>
      {hasQuickContact ? (
        <div className="corporate-quickbar">
          <div className="corporate-shell corporate-quickbar__inner">
            <span>Quick Contact</span>
            <div>
              {quickContactLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className="corporate-shell corporate-header__inner">
        <MobileMenu />

        <Link to="/" className="corporate-logo" aria-label="HNBG home">
          HNBG<span>Corporate</span>
        </Link>

        <nav className="corporate-nav" aria-label="Main navigation">
          {primaryNavLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="corporate-button corporate-button--secondary">
          Start a Conversation
        </Link>
      </div>
    </header>
  )
}
