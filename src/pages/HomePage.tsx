import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { BusinessCard } from '../components/BusinessCard'
import { CategoryDivisionBand } from '../components/CategoryDivisionBand'
import { PendingNotice } from '../components/PendingNotice'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { businesses, featuredBusinesses } from '../data/businesses'
import { hokkaidoVisionParagraphs } from '../data/corporateContent'
import homeHeroImage from '../assets/gallery/sora/sora4.webp'

const featuredBusinessPreview = featuredBusinesses.slice(0, 6)
const LocationSpotlight = lazy(() => import('../components/LocationSpotlight').then(({ LocationSpotlight }) => ({ default: LocationSpotlight })))
const cityCount = new Set(businesses.map((business) => business.address?.match(/Kathmandu|Lalitpur|Pokhara/)?.[0]).filter(Boolean)).size

export function HomePage() {
  return (
    <main className="corporate-page">
      <section className="corporate-hero corporate-hero--image" style={{ backgroundImage: `url(${homeHeroImage})` }}>
        <ScrollReveal className="corporate-shell corporate-hero__inner">
          <div className="corporate-hero__copy">
            <p className="section-header__eyebrow">Since 2018 · Nepal</p>
            <h1>A quiet house of Japanese hospitality.</h1>
            <p>
              Hokkaido Group brings authentic Japanese dining, retail, wellness, and trading experiences closer to
              Nepalese communities.
            </p>
            <div className="corporate-actions">
              <Link to="/businesses" className="corporate-button corporate-button--primary">
                Our Brands
              </Link>
              <Link to="/contact" className="corporate-button corporate-button--secondary">
                Contact the Group
              </Link>
            </div>

            <dl className="corporate-hero__stats" aria-label="Hokkaido Group summary">
              <div>
                <dt>{String(businesses.length).padStart(2, '0')}</dt>
                <dd>Brands</dd>
              </div>
              <div>
                <dt>2018</dt>
                <dd>First Restaurant</dd>
              </div>
              <div>
                <dt>{String(cityCount).padStart(2, '0')}</dt>
                <dd>Cities Across Nepal</dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>
      </section>

      <section className="corporate-brand-strip" aria-label="Hokkaido Group business portfolio">
        <ScrollReveal className="corporate-shell corporate-brand-strip__inner">
          <p className="corporate-eyebrow">Brands</p>
          <div className="corporate-brand-strip__rail">
            {businesses.map((business) => (
              <Link key={business.id} to={`/businesses/${business.slug}`} className="corporate-brand-strip__item">
                {business.logo ? <img src={business.logo} alt={`${business.name} logo`} loading="lazy" /> : <span>{business.name}</span>}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <CategoryDivisionBand />

      <section id="businesses" className="corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Portfolio</p>
            <h2 className="section-header__heading">Our Brands</h2>
            <p className="section-header__description">
              A portfolio of restaurants, retail businesses, wellness destinations, and trading operations.
            </p>
          </div>

          <div className="corporate-business-rail" aria-label="Featured businesses">
            {featuredBusinessPreview.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          <div className="corporate-section__actions">
            <Link to="/businesses" className="corporate-button corporate-button--secondary">
              View Full Directory
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="corporate-section">
        <ScrollReveal className="corporate-shell">
          <Suspense fallback={<PendingNotice label="Location map loading" />}>
            <LocationSpotlight
              businesses={businesses}
              eyebrow="Outlets"
              title="Outlet maps"
              description="Hokkaido Group brand locations across Kathmandu, Lalitpur, and Pokhara."
            />
          </Suspense>
        </ScrollReveal>
      </section>

      <section className="corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Our Vision</p>
            <h2 className="section-header__heading">Premium Japanese hospitality in Nepal.</h2>
            <p className="section-header__description">{hokkaidoVisionParagraphs[0]}</p>
          </div>
          <div className="corporate-section__actions">
            <Link to="/about" className="corporate-button corporate-button--secondary">
              Read About Hokkaido Group
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="corporate-cta">
        <ScrollReveal className="corporate-shell corporate-cta__inner">
          <div>
            <p className="section-header__eyebrow">Contact</p>
            <h2>Brand contact details are listed in the directory.</h2>
          </div>
          <Link to="/businesses" className="corporate-button corporate-button--primary">
            View Directory
          </Link>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
