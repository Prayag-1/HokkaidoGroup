import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { businesses, hokkaidoGroupCorporateContact, hokkaidoGroupLogo } from '../data/businesses'
import { footerCompanyLinks, footerSupportLinks } from '../config/nav'

export function SiteFooter() {
  const hasQuickContact = Boolean(hokkaidoGroupCorporateContact.email || hokkaidoGroupCorporateContact.phone || hokkaidoGroupCorporateContact.address)

  return (
    <footer className="corporate-footer" data-surface="ink">
      <div className="corporate-shell">
        <div className="corporate-footer__brand-row">
          <div className="corporate-footer__brand-lockup">
            <img src={hokkaidoGroupLogo} alt="Hokkaido Group logo" loading="lazy" />
            <h2>Hokkaido Group</h2>
          </div>
          <p className="corporate-footer__summary">
            Authentic Japanese dining, retail, wellness, and trading operations in Nepal.
          </p>
        </div>

        <div className="corporate-footer__main">
          <details className="corporate-footer__dropdown">
            <summary>
              <span>Company</span>
              <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
            </summary>
            <nav className="corporate-footer__links" aria-label="Footer company navigation">
              {footerCompanyLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>

          <details className="corporate-footer__dropdown">
            <summary>
              <span>Businesses</span>
              <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
            </summary>
            <nav className="corporate-footer__links" aria-label="Footer business navigation">
              {businesses.map((business) => (
                <Link key={business.id} to={`/businesses/${business.slug}`}>
                  {business.name}
                </Link>
              ))}
            </nav>
          </details>

          <details className="corporate-footer__dropdown">
            <summary>
              <span>Contact</span>
              <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
            </summary>
            <div className="corporate-footer__links">
              {footerSupportLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
              {hasQuickContact ? (
                <address>
                  {hokkaidoGroupCorporateContact.email ? <a href={`mailto:${hokkaidoGroupCorporateContact.email}`}>{hokkaidoGroupCorporateContact.email}</a> : null}
                  {hokkaidoGroupCorporateContact.phone ? <a href={`tel:${hokkaidoGroupCorporateContact.phone}`}>{hokkaidoGroupCorporateContact.phone}</a> : null}
                  {hokkaidoGroupCorporateContact.address ? <span>{hokkaidoGroupCorporateContact.address}</span> : null}
                </address>
              ) : (
                <Link to="/businesses">View Brand Contacts</Link>
              )}
            </div>
          </details>
        </div>

        <div className="corporate-footer__bottom">
          <p>Copyright 2026 Hokkaido Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
