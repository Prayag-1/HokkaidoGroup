import { Link, useParams } from 'react-router-dom'
import { brands } from '../data/brands'
import { locations } from '../data/locations'
import { SiteFooter } from '../components/SiteFooter'

export function BrandPage() {
  const { slug } = useParams()
  const brand = brands.find((entry) => entry.slug === slug)
  const brandLocations = locations.filter((entry) => entry.brandSlug === slug)

  if (!brand) {
    return (
      <main>
        <section className="hg-section">
          <div className="hg-shell">
            <p className="hg-eyebrow">Not found</p>
            <h1 className="hg-title">Brand page unavailable.</h1>
            <div className="hg-actions">
              <Link to="/" className="hg-button hg-button--dark">
                Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="hg-section">
        <div className="hg-shell hg-split">
          <div>
            <p className="hg-eyebrow">{brand.concept}</p>
            <h1 className="hg-title">{brand.name}</h1>
            <p className="hg-lead">{brand.description}</p>
            <div className="hg-actions">
              <Link to="/booking" className="hg-button hg-button--dark">
                Request booking
              </Link>
              <Link to="/contact" className="hg-button hg-button--outline-dark">
                Contact office
              </Link>
            </div>
          </div>

          <div className="hg-panel">
            <p className="hg-eyebrow">Overview</p>
            <h3>{brand.location}</h3>
            <p>{brand.detail}</p>
            <div className="hg-grid hg-grid--3">
              {brand.highlights.map((highlight) => (
                <div key={highlight} className="hg-card">
                  <p className="hg-eyebrow">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hg-section hg-section--soft">
        <div className="hg-shell">
          <div className="hg-section__intro hg-section__intro--left">
            <p className="hg-eyebrow">Outlets</p>
            <h2 className="hg-title">Where to find this brand.</h2>
          </div>
          <div className="hg-list">
            {brandLocations.length > 0 ? (
              brandLocations.map((location, index) => (
                <article key={`${location.venue}-${location.area}`} className="hg-list__item">
                  <span className="hg-eyebrow">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{location.venue}</h3>
                    <p>{location.area}</p>
                  </div>
                  <Link to="/booking" className="hg-button hg-button--outline-dark">
                    Book
                  </Link>
                </article>
              ))
            ) : (
              <article className="hg-list__item">
                <span className="hg-eyebrow">01</span>
                <div>
                  <h3>Group office inquiry</h3>
                  <p>Available for catering, events, suppliers, and partnerships.</p>
                </div>
                <Link to="/contact" className="hg-button hg-button--outline-dark">
                  Contact
                </Link>
              </article>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
