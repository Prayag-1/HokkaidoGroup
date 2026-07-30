import { Link, useParams } from 'react-router-dom'
import { LocationSpotlight } from '../components/LocationSpotlight'
import { PendingNotice } from '../components/PendingNotice'
import { ScrollReveal } from '../components/ScrollReveal'
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
              <p className="section-header__eyebrow">Business unavailable</p>
              <h1 className="section-header__heading">This page is not ready.</h1>
              <p className="section-header__description">
                The requested business may not have been added to the directory yet.
              </p>
              <Link to="/businesses" className="corporate-button corporate-button--primary">
                Return to Directory
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    )
  }

  const locationLabel = business.locationSummary ?? business.address
  const aboutText = business.about ?? business.description
  const galleryImages = business.galleryImages.filter(Boolean)
  const hasHeroMedia = Boolean(business.image)
  const emailValue = business.email
  const phoneValue = business.phone

  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className={`corporate-shell business-detail__hero-shell${hasHeroMedia ? '' : ' business-detail__hero-shell--text-only'}`}>
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">{business.category}</p>
            <h1 className="section-header__heading">{business.name}</h1>
            <p className="section-header__description">
              {business.description ?? locationLabel ?? business.category}
            </p>
            <dl className="business-detail__hero-contact">
              <div>
                <dt>Email</dt>
                <dd>
                  {emailValue ? (
                    <a href={`mailto:${emailValue}`}>{emailValue}</a>
                  ) : (
                    <PendingNotice label="Email details coming soon" />
                  )}
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  {phoneValue ? (
                    <a href={`tel:${phoneValue}`}>{phoneValue}</a>
                  ) : (
                    <PendingNotice label="Phone details coming soon" />
                  )}
                </dd>
              </div>
            </dl>
          </div>

          {hasHeroMedia ? (
            <figure className="business-detail__hero-media">
              <img
                src={business.image as string}
                alt={business.logo && business.image === business.logo ? `${business.name} logo` : `${business.name} venue photo`}
                loading="eager"
                sizes="(max-width: 64rem) 100vw, 44rem"
              />
            </figure>
          ) : (
            <div className="business-detail__hero-wordmark" aria-hidden="true">
              <span>{business.name}</span>
            </div>
          )}
        </ScrollReveal>
      </section>

      <section className="corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell business-detail__info-grid">
          <article className="business-detail__panel">
            <p className="section-header__eyebrow">Story</p>
            <h2 className="business-detail__panel-title">About {business.name}</h2>
            {aboutText ? (
              <p className="business-detail__copy">{aboutText}</p>
            ) : (
              <PendingNotice label="Business story coming soon" />
            )}
          </article>

          <article className="business-detail__panel">
            <p className="section-header__eyebrow">Contact</p>
            <h2 className="business-detail__panel-title">Reach this location</h2>
            <dl className="business-detail__contact-list">
              <div>
                <dt>Address</dt>
                <dd>
                  {business.address ? (
                    business.address
                  ) : (
                    <PendingNotice label="Address details coming soon" />
                  )}
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  {phoneValue ? (
                    <a href={`tel:${phoneValue}`}>{phoneValue}</a>
                  ) : (
                    <PendingNotice label="Phone details coming soon" />
                  )}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  {emailValue ? (
                    <a href={`mailto:${emailValue}`}>{emailValue}</a>
                  ) : (
                    <PendingNotice label="Email details coming soon" />
                  )}
                </dd>
              </div>
            </dl>
          </article>
        </ScrollReveal>
      </section>

      {galleryImages.length > 0 ? (
        <section className="corporate-section corporate-section--alt">
          <ScrollReveal className="corporate-shell business-detail__gallery-section">
            <div className="corporate-section__intro corporate-section__intro--left business-detail__gallery-intro">
              <p className="corporate-eyebrow">Scenes</p>
              <h2 className="business-detail__gallery-title">A look inside {business.name}</h2>
            </div>
            <div className="business-detail__gallery">
              {galleryImages.map((src, index) => (
                <figure key={`${src}-${index}`} className="business-detail__gallery-item">
                  <img
                    src={src}
                    alt={business.logo && src === business.logo ? `${business.name} logo` : `${business.name} photo ${index + 1}`}
                    loading="lazy"
                    sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                  />
                </figure>
              ))}
            </div>
          </ScrollReveal>
        </section>
      ) : null}

      <section className="corporate-section">
        <ScrollReveal className="corporate-shell business-detail__location-grid">
          <div className="business-detail__panel">
            <p className="corporate-eyebrow">Place</p>
            {locationLabel ? (
              <h3>{locationLabel}</h3>
            ) : (
              <PendingNotice label="Location details coming soon" />
            )}
            {business.mapQuery ? <p>{business.mapQuery}</p> : null}
            {business.mapQuery ? (
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

          <LocationSpotlight
            businesses={[business]}
            eyebrow="Map"
            title="Map view"
            description="Saved Google Maps place details frame this outlet."
          />
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
