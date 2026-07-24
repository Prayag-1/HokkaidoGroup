import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'

export function CareersPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell">
          <div className="corporate-empty-state">
            <p className="section-header__eyebrow">Careers</p>
            <h1>Coming Soon</h1>
            <p>Career openings and verified hiring information are pending client content.</p>
            <Link to="/contact" className="corporate-button corporate-button--primary">
              Contact HNBG
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
