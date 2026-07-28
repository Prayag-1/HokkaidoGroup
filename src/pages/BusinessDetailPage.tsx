import { Link, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { getBusinessBySlug } from '../data/businesses'

export function BusinessDetailPage() {
  const { slug } = useParams()
  const business = slug ? getBusinessBySlug(slug) : undefined

  if (!business) {
    return (
      <main className="corporate-page">
        <section className="corporate-section corporate-section--first">
          <div className="corporate-shell">
            <div className="section-header corporate-section__header">
              <p className="section-header__eyebrow">Business not found</p>
              <h1 className="section-header__heading">That business page is unavailable.</h1>
              <p className="section-header__description">
                The requested business may not have been added to the directory yet.
              </p>
              <Link to="/businesses" className="corporate-button corporate-button--primary">
                Back to directory
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    )
  }

  const locationLabel = business.locationSummary ?? business.address ?? 'Location pending verification'
  const aboutText =
    business.about ??
    business.description ??
    'Detailed company information is pending verification for this business.'
  const galleryImages = business.galleryImages.filter(Boolean)
  const hasHeroMedia = Boolean(business.image)
  const mapSrc = business.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`
    : null
  const emailValue = business.email ?? 'email@business.com'
  const phoneValue = business.phone ?? '+977 98XXXXXXXX'

  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className={`corporate-shell business-detail__hero-shell${hasHeroMedia ? '' : ' business-detail__hero-shell--text-only'}`}>
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">{business.category}</p>
            <h1 className="section-header__heading">{business.name}</h1>
            <p className="section-header__description">
              {business.description ?? locationLabel}
            </p>
            <dl className="business-detail__hero-contact">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${emailValue}`}>{emailValue}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${phoneValue}`}>{phoneValue}</a>
                </dd>
              </div>
            </dl>
          </div>

          {hasHeroMedia ? (
            <figure className="business-detail__hero-media">
              <img src={business.image as string} alt={business.name} loading="eager" />
            </figure>
          ) : null}
        </div>
      </section>

      <section className="corporate-section corporate-section--alt">
        <div className="corporate-shell business-detail__info-grid">
          <article className="business-detail__panel">
            <p className="section-header__eyebrow">About</p>
            <h2 className="business-detail__panel-title">About {business.name}</h2>
            <p className="business-detail__copy">{aboutText}</p>
          </article>

          <article className="business-detail__panel">
            <p className="section-header__eyebrow">Contact</p>
            <h2 className="business-detail__panel-title">Get in touch</h2>
            <dl className="business-detail__contact-list">
              <div>
                <dt>Address</dt>
                <dd>{business.address ?? 'Pending verification'}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${phoneValue}`}>{phoneValue}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${emailValue}`}>{emailValue}</a>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      {galleryImages.length > 0 ? (
        <section className="hg-section hg-section--soft">
          <div className="hg-shell business-detail__gallery-section">
            <div className="hg-section__intro hg-section__intro--left business-detail__gallery-intro">
              <p className="hg-eyebrow">Photos</p>
              <h2 className="business-detail__gallery-title">Inside {business.name}</h2>
            </div>
            <div className="business-detail__gallery">
              {galleryImages.map((src, index) => (
                <figure key={`${src}-${index}`} className="business-detail__gallery-item">
                  <img src={src} alt={`${business.name} photo ${index + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="hg-section">
        <div className="hg-shell business-detail__location-grid">
          <div className="hg-panel">
            <p className="hg-eyebrow">Location</p>
            <h3>{locationLabel}</h3>
            <p>{business.mapQuery ?? locationLabel}</p>
            {mapSrc ? (
              <a
                className="business-detail__map-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
              </a>
            ) : null}
          </div>

          <div className="business-detail__map">
            {mapSrc ? (
              <iframe
                title={`${business.name} location map`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="business-detail__map-placeholder">
                Google Maps embed pending verification.
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
