import { Link } from 'react-router-dom'
import { hokkaidoGroupLogo } from '../data/businesses'
import { primaryNavLinks } from '../config/nav'
import { GroupContact } from './GroupContact'
export function SiteFooter() {
  return (
    <footer className="group-footer">
      <div className="corporate-shell">
        <Link className="group-footer__brand" to="/">
          <img src={hokkaidoGroupLogo} alt="" />
          <span>Hokkaido Group</span>
        </Link>
        <div className="group-footer__main">
          <GroupContact />
          <nav aria-label="Footer navigation">
            {primaryNavLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="group-footer__copyright">
          © {new Date().getFullYear()} Hokkaido Group. All rights reserved. — Made by Prayag Nepal
        </p>
      </div>
    </footer>
  )
}
