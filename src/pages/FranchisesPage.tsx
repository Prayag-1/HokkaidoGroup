import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { FranchiseCard } from '../components/FranchiseCard'
import { businesses } from '../data/businesses'
import { franchises } from '../data/editorialContent'
export function FranchisesPage() {
  return (
    <main id="main-content" className="editorial-page">
      <PageBreadcrumb title="Franchises" />
      <section className="split-hero">
        <img src={businesses[1].image!} alt="The Hokkaido House dining room" />
        <div>
          <p className="eyebrow">Partnerships</p>
          <h1>
            Hokkaido
            <br />
            Franchises
          </h1>
          <p>
            Explore a conversation about bringing Japanese hospitality to your
            community.
          </p>
          <p>
            Our group brings together dining, retail, resort, and trading
            experiences across Nepal. Contact Hokkaido Group to discuss your
            interest in working together.
          </p>
        </div>
      </section>
      <section className="editorial-section corporate-shell">
        <h2>Franchise locations</h2>
        {franchises.length ? (
          <div className="journal-grid">
            {franchises.map((f) => (
              <FranchiseCard key={f.websiteUrl} franchise={f} />
            ))}
          </div>
        ) : (
          <div className="content-placeholder">
            <span className="triangle" aria-hidden="true" />
            <h3>Location announcements coming soon</h3>
            <p>
              Franchise profiles and their official websites will appear here
              once confirmed.
            </p>
          </div>
        )}
      </section>
      <section className="franchise-cta">
        <h2>Franchise with us</h2>
        <p>Start a conversation with Hokkaido Group.</p>
        <Link className="editorial-button" to="/contact">
          Learn More
        </Link>
      </section>
      <SiteFooter />
    </main>
  )
}
