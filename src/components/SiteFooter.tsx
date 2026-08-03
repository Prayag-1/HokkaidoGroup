import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { businesses, hnbgCorporateContact, hnbgLogo } from '../data/businesses'
import { footerCompanyLinks, footerSupportLinks } from '../config/nav'

export function SiteFooter() {
  const hasQuickContact = Boolean(hnbgCorporateContact.email || hnbgCorporateContact.phone || hnbgCorporateContact.address)

  return (
    <footer className="corporate-footer">
      <div className="corporate-shell">
        <div className="corporate-footer__brand-row">
          <div className="corporate-footer__brand-lockup">
            <img src={hnbgLogo} alt="Hokkaido Nepal Business Group logo" loading="lazy" />
            <h2>Hokkaido Nepal Business Group</h2>
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
                  {hnbgCorporateContact.email ? <a href={`mailto:${hnbgCorporateContact.email}`}>{hnbgCorporateContact.email}</a> : null}
                  {hnbgCorporateContact.phone ? <a href={`tel:${hnbgCorporateContact.phone}`}>{hnbgCorporateContact.phone}</a> : null}
                  {hnbgCorporateContact.address ? <span>{hnbgCorporateContact.address}</span> : null}
                </address>
              ) : (
                <Link to="/businesses">View Brand Contacts</Link>
              )}
            </div>
          </details>
        </div>

        <div className="corporate-footer__bottom">
          <p>Copyright 2026 Hokkaido Nepal Business Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
