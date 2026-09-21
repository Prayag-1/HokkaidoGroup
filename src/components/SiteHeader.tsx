import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MobileMenu } from './MobileMenu'
import { hokkaidoGroupLogo } from '../data/businesses'
export function SiteHeader() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <header
      className={`corporate-header ${pathname === '/' && !scrolled ? 'corporate-header--home-top' : 'corporate-header--scrolled'}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="corporate-header__inner">
        <MobileMenu />
        <Link
          to="/"
          className="corporate-logo"
          aria-label="Hokkaido Group home"
        >
          <img src={hokkaidoGroupLogo} alt="" />
          <span>Hokkaido Group</span>
        </Link>
        <Link className="header-contact" to="/contact">
          Get in touch
        </Link>
      </div>
    </header>
  )
}
