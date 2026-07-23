import { Link } from 'react-router-dom'

const exploreLinks = [
  ['Home', '/'],
  ['About', '/#story'],
  ['Brands', '/#brands'],
  ['Locations', '/#locations'],
  ['Gallery', '/#gallery'],
  ['Booking', '/booking'],
  ['Contact', '/contact'],
] as const

export function SiteFooter() {
  return (
    <footer className="hg-footer">
      <div className="hg-shell">
        <div className="hg-footer__main">
          <div>
            <h2>Hokkaido Group</h2>
            <p style={{ marginTop: '1.5rem' }}>
              A hospitality house rooted in Kathmandu, guided by the Japanese principle of omotenashi: the quiet art
              of anticipating a guest.
            </p>
            <div className="hg-actions">
              <a href="https://instagram.com/hokkaidohousenp" target="_blank" rel="noreferrer" className="hg-button hg-button--outline-light">
                Instagram
              </a>
              <a href="https://facebook.com/hokkaidoramenhousenepal" target="_blank" rel="noreferrer" className="hg-button hg-button--outline-light">
                Facebook
              </a>
            </div>
          </div>

          <div>
            <p className="hg-meta">Explore</p>
            <nav className="hg-footer__links" aria-label="Footer navigation">
              {exploreLinks.map(([label, to]) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="hg-meta">Contact</p>
            <div className="hg-footer__links">
              <a href="mailto:hello@hokkaidogroup.com">hello@hokkaidogroup.com</a>
              <a href="tel:+97714000000">+977 1 4000 000</a>
              <p>Head Office, Durbar Marg</p>
              <p>Kathmandu 44600, Nepal</p>
            </div>
          </div>
        </div>

        <div className="hg-footer__bottom">
          <p>© 2026 Hokkaido Group. All rights reserved.</p>
          <p className="hg-meta">Kathmandu · Pokhara · Nagarkot</p>
        </div>
      </div>
    </footer>
  )
}
