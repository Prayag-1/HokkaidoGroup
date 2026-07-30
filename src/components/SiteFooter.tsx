import { Link } from 'react-router-dom'
import { businesses, hnbgCorporateContact } from '../data/businesses'
import { footerCompanyLinks, footerSupportLinks } from '../config/nav'

function DetailsComingSoon({ label = 'Details coming soon' }: { label?: string }) {
  return (
    <div className="corporate-footer__coming-soon">
      <span aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export function SiteFooter() {
  const hasSocialLinks = hnbgCorporateContact.socialLinks.length > 0
  const hasQuickContact = Boolean(hnbgCorporateContact.email || hnbgCorporateContact.phone || hnbgCorporateContact.address)

  return (
    <footer className="corporate-footer">
      <div className="corporate-shell">
        <div className="corporate-footer__brand-row">
          <div>
            <h2>HNBG</h2>
            <p className="corporate-footer__summary">
              Japanese dining, trading, retail, and hospitality work connected across Nepal.
            </p>
          </div>

          <div className="corporate-footer__quick-contact">
            <p className="corporate-meta">Quick Contact</p>
            {hasQuickContact ? (
              <address>
                {hnbgCorporateContact.email ? <a href={`mailto:${hnbgCorporateContact.email}`}>{hnbgCorporateContact.email}</a> : null}
                {hnbgCorporateContact.phone ? <a href={`tel:${hnbgCorporateContact.phone}`}>{hnbgCorporateContact.phone}</a> : null}
                {hnbgCorporateContact.address ? <span>{hnbgCorporateContact.address}</span> : null}
              </address>
            ) : (
              <DetailsComingSoon />
            )}
          </div>
        </div>

        <div className="corporate-footer__main">
          <div>
            <p className="corporate-meta">Social</p>
            <div className="corporate-actions">
              {hasSocialLinks ? (
                hnbgCorporateContact.socialLinks.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="corporate-button corporate-button--outline-light">
                    {link.label}
                  </a>
                ))
              ) : (
                <DetailsComingSoon label="Social channels coming soon" />
              )}
            </div>
          </div>

          <div>
            <p className="corporate-meta">Company</p>
            <nav className="corporate-footer__links" aria-label="Footer company navigation">
              {footerCompanyLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="corporate-meta">Businesses</p>
            <nav className="corporate-footer__links" aria-label="Footer business navigation">
              {businesses.map((business) => (
                <Link key={business.id} to={`/businesses/${business.slug}`}>
                  {business.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="corporate-meta">Support</p>
            <nav className="corporate-footer__links" aria-label="Footer support navigation">
              {footerSupportLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="corporate-footer__bottom">
          <p>Copyright 2026 Hokkaido Nepal Business Group. All rights reserved.</p>
          <DetailsComingSoon label="Corporate details coming soon" />
        </div>
      </div>
    </footer>
  )
}
