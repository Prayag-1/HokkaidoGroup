import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { primaryNavLinks } from '../config/nav'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const overlayTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.15, ease: [0.2, 0, 0, 1] }
  const panelTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }

  return (
    <>
      <button
        className="corporate-hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="corporate-hamburger__line"></span>
        <span className="corporate-hamburger__line"></span>
        <span className="corporate-hamburger__line"></span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <>
            <motion.div
              className="corporate-mobile-menu-overlay"
              onClick={closeMenu}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
            />

            <motion.nav
              className="corporate-mobile-menu"
              aria-label="Mobile navigation"
              initial={reduceMotion ? { opacity: 1 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={panelTransition}
            >
              <div className="corporate-mobile-menu__header">
                <Link to="/" className="corporate-logo" onClick={closeMenu} aria-label="HNBG home">
                  HNBG<span>Corporate</span>
                </Link>
                <button className="corporate-mobile-menu__close" onClick={closeMenu} aria-label="Close navigation menu">
                  <X aria-hidden="true" size={20} strokeWidth={2} />
                </button>
              </div>

              <div className="corporate-mobile-menu__links">
                {primaryNavLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `corporate-mobile-menu__link ${isActive ? 'corporate-mobile-menu__link--active' : ''}`
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <Link to="/contact" className="corporate-button corporate-button--secondary corporate-mobile-menu__button" onClick={closeMenu}>
                Start a Conversation
              </Link>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
