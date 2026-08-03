import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { LocationSpotlight } from '../components/LocationSpotlight'
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
  const scrollingGalleryImages = [...galleryImages, ...galleryImages]
  const hasHeroMedia = Boolean(business.image)
  const heroUsesLogo = Boolean(business.logo && business.image === business.logo)
  const emailValue = business.email
  const phoneValue = business.phone

  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className={`corporate-shell business-detail__hero-shell${hasHeroMedia ? '' : ' business-detail__hero-shell--text-only'}`}>
          <div className="section-header corporate-section__header business-detail__hero-copy">
            <Link to="/businesses" className="business-detail__back-link">
              <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true" />
              All brands
            </Link>
            <p className="section-header__eyebrow">{business.category === 'Restaurant' ? 'Hokkaido dining' : `${business.category} division`}</p>
            <h1 className="section-header__heading">{business.name}</h1>
            <p className="section-header__description">
              {business.description ?? locationLabel ?? business.category}
            </p>
            <dl className="business-detail__hero-contact">
              {locationLabel ? (
                <div>
                  <dt>
                    <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
                    Location
                  </dt>
                  <dd>{locationLabel}</dd>
                </div>
              ) : null}
              {emailValue ? (
                <div>
                  <dt>
                    <Mail size={15} strokeWidth={2.2} aria-hidden="true" />
                    Email
                  </dt>
                  <dd>
                    <a href={`mailto:${emailValue}`}>{emailValue}</a>
                  </dd>
                </div>
              ) : null}
              {phoneValue ? (
                <div>
                  <dt>
                    <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
                    Phone
                  </dt>
                  <dd>
                    <a href={`tel:${phoneValue}`}>{phoneValue}</a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          {hasHeroMedia ? (
            <figure className={`business-detail__hero-media${heroUsesLogo ? ' business-detail__hero-media--logo' : ''}`}>
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
            <p className="section-header__eyebrow">Profile</p>
            <h2 className="business-detail__panel-title">What to expect</h2>
            {aboutText ? <p className="business-detail__copy">{aboutText}</p> : null}
          </article>

          <article className="business-detail__panel">
            <p className="section-header__eyebrow">Visit</p>
            <h2 className="business-detail__panel-title">Contact details</h2>
            <dl className="business-detail__contact-list">
              {business.address ? (
                <div>
                  <dt>
                    <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
                    Address
                  </dt>
                  <dd>{business.address}</dd>
                </div>
              ) : null}
              {phoneValue ? (
                <div>
                  <dt>
                    <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
                    Phone
                  </dt>
                  <dd>
                    <a href={`tel:${phoneValue}`}>{phoneValue}</a>
                  </dd>
                </div>
              ) : null}
              {emailValue ? (
                <div>
                  <dt>
                    <Mail size={15} strokeWidth={2.2} aria-hidden="true" />
                    Email
                  </dt>
                  <dd>
                    <a href={`mailto:${emailValue}`}>{emailValue}</a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </article>
        </ScrollReveal>
      </section>

      {galleryImages.length > 0 ? (
        <section className="corporate-section corporate-section--alt">
          <ScrollReveal className="corporate-shell business-detail__gallery-section">
            <div className="corporate-section__intro corporate-section__intro--left business-detail__gallery-intro">
              <p className="corporate-eyebrow">Gallery</p>
              <h2 className="business-detail__gallery-title">{business.name} in view</h2>
            </div>
            <div className="business-detail__gallery" aria-label={`${business.name} image gallery`}>
              {scrollingGalleryImages.map((src, index) => (
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
            {locationLabel ? <h3>{locationLabel}</h3> : null}
            {business.mapQuery ? <p>{business.mapQuery}</p> : null}
            {business.mapQuery ? (
              <a
                className="business-detail__map-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
                <ExternalLink size={15} strokeWidth={2.2} aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <LocationSpotlight
            businesses={[business]}
            eyebrow="Map"
            title="Map view"
            description="Use the map to check the area before you visit."
          />
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
