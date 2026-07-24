import { Link } from 'react-router-dom'
import { businesses, hnbgCorporateContact } from '../data/businesses'

const companyLinks = [
  ['About', '/about'],
  ['Careers', '/careers'],
  ['Press', '/press'],
  ['Contact', '/contact'],
] as const

export function SiteFooter() {
  const hasSocialLinks = hnbgCorporateContact.socialLinks.length > 0

  return (
    <footer className="hg-footer">
      <div className="hg-shell">
        <div className="hg-footer__main">
          <div>
            <h2>HNBG</h2>
            <p style={{ marginTop: '1.5rem' }}>
              Hokkaido Nepal Business Group connects Japanese cuisine, business practice, and cultural exchange in
              Nepal.
            </p>
            <div className="hg-actions">
              {hasSocialLinks ? (
                hnbgCorporateContact.socialLinks.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="hg-button hg-button--outline-light">
                    {link.label}
                  </a>
                ))
              ) : (
                <p>Social links pending verification</p>
              )}
            </div>
          </div>

          <div>
            <p className="hg-meta">Businesses</p>
            <nav className="hg-footer__links" aria-label="Footer business directory">
              {businesses.map((business) => (
                <Link key={business.id} to={`/businesses/${business.slug}`}>
                  {business.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="hg-meta">Company</p>
            <nav className="hg-footer__links" aria-label="Footer company navigation">
              {companyLinks.map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </nav>

            <div className="hg-footer__links">
              <p className="hg-meta">Contact</p>
              {hnbgCorporateContact.email ? (
                <a href={`mailto:${hnbgCorporateContact.email}`}>{hnbgCorporateContact.email}</a>
              ) : (
                <p>Email pending verification</p>
              )}
              {hnbgCorporateContact.phone ? (
                <a href={`tel:${hnbgCorporateContact.phone}`}>{hnbgCorporateContact.phone}</a>
              ) : (
                <p>Phone pending verification</p>
              )}
              <p>{hnbgCorporateContact.address ?? 'Address pending verification'}</p>
            </div>
          </div>
        </div>

        <div className="hg-footer__bottom">
          <p>Copyright 2026 Hokkaido Nepal Business Group. All rights reserved.</p>
          <p className="hg-meta">Contact details pending final verification</p>
        </div>
      </div>
    </footer>
  )
}
