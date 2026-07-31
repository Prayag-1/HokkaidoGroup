import { Link } from 'react-router-dom'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { businesses } from '../data/businesses'

export function ContactPage() {
  return (
    <main className="corporate-page corporate-contact-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Contact</p>
            <h1 className="section-header__heading">Hokkaido Group brand contacts</h1>
            <p className="section-header__description">
              Direct phone and email details listed in the source document.
            </p>
          </div>

          <div className="corporate-business-grid">
            {businesses.map((business) => (
              <article key={business.id} className="business-detail__panel">
                <p className="section-header__eyebrow">{business.category}</p>
                <h2 className="business-detail__panel-title">{business.name}</h2>
                <dl className="business-detail__contact-list">
                  <div>
                    <dt>Location</dt>
                    <dd>{business.locationSummary ?? business.address}</dd>
                  </div>
                  {business.phone ? (
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <a href={`tel:${business.phone}`}>{business.phone}</a>
                      </dd>
                    </div>
                  ) : null}
                  {business.email ? (
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${business.email}`}>{business.email}</a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
                <Link to={`/businesses/${business.slug}`} className="corporate-button corporate-button--secondary">
                  View Brand
                </Link>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>
      <SiteFooter />
    </main>
  )
}
