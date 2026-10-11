import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { hokkaidoGroupLogo } from '../data/businesses'
import { experienceNavLinks } from '../config/nav'

type MenuId = 'restaurants' | 'experiences'

export function SiteHeader() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const navigation = useRef<HTMLElement>(null)
  const triggers = useRef<Record<MenuId, HTMLButtonElement | null>>({
    restaurants: null,
    experiences: null,
  })

  useEffect(() => {
    const mobileHeader = window.matchMedia('(max-width: 47.99rem), (max-width: 56rem) and (max-height: 30rem) and (orientation: landscape)')
    const update = () => setScrolled(window.scrollY > (mobileHeader.matches ? 24 : 60))
    update()
    window.addEventListener('scroll', update, { passive: true })
    mobileHeader.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', update)
      mobileHeader.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navigation.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !openMenu) return
      event.preventDefault()
      triggers.current[openMenu]?.focus()
      setOpenMenu(null)
    }
    const media = window.matchMedia('(min-width: 1201px)')
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onBreakpointChange)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onBreakpointChange)
    }
  }, [openMenu])

  const toggleMenu = (menu: MenuId) => setOpenMenu((current) => current === menu ? null : menu)

  return (
    <header
      className={`corporate-header ${pathname === '/' && !scrolled ? 'corporate-header--home-top' : 'corporate-header--scrolled'}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="corporate-header__inner">
        <MobileMenu />
        <nav ref={navigation} className="desktop-navigation" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <div className="desktop-navigation__dropdown">
            <button
              className={pathname.startsWith('/businesses') ? 'is-current' : undefined}
              ref={(node) => { triggers.current.restaurants = node }}
              type="button"
              aria-expanded={openMenu === 'restaurants'}
              aria-controls="desktop-restaurants-menu"
              onClick={() => toggleMenu('restaurants')}
            >
              Our Restaurants <ChevronDown size={16} aria-hidden="true" />
            </button>
            <div id="desktop-restaurants-menu" hidden={openMenu !== 'restaurants'}>
              <NavLink to="/businesses">All Restaurants</NavLink>
            </div>
          </div>
          <div className="desktop-navigation__dropdown">
            <button
              className={experienceNavLinks.some((link) => pathname === link.to || pathname.startsWith(`${link.to}/`)) ? 'is-current' : undefined}
              ref={(node) => { triggers.current.experiences = node }}
              type="button"
              aria-expanded={openMenu === 'experiences'}
              aria-controls="desktop-experiences-menu"
              onClick={() => toggleMenu('experiences')}
            >
              Experiences <ChevronDown size={16} aria-hidden="true" />
            </button>
            <div id="desktop-experiences-menu" hidden={openMenu !== 'experiences'}>
              {experienceNavLinks.map((link) => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
            </div>
          </div>
          <NavLink to="/about-us">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>
        <Link
          to="/"
          className="corporate-logo"
          aria-label="Hokkaido Group home"
        >
          <img src={hokkaidoGroupLogo} alt="" />
          <span>Hokkaido Group</span>
        </Link>
        <Link className="header-restaurant-cta btn-primary" to="/businesses">
          Find a Restaurant
        </Link>
      </div>
    </header>
  )
}
