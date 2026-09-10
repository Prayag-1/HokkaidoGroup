import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { CategoryDivisionBand } from '../components/CategoryDivisionBand'
import { FeaturedOutletsCarousel } from '../components/FeaturedOutletsCarousel'
import { PendingNotice } from '../components/PendingNotice'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionSurface } from '../components/SectionSurface'
import { SiteFooter } from '../components/SiteFooter'
import { businesses, featuredBusinesses } from '../data/businesses'
import { hokkaidoVisionParagraphs } from '../data/corporateContent'
import homeHeroImage from '../assets/gallery/sora/sora4.webp'

const LocationSpotlight = lazy(() => import('../components/LocationSpotlight').then(({ LocationSpotlight }) => ({ default: LocationSpotlight })))
const cityCount = new Set(businesses.map((business) => business.address?.match(/Kathmandu|Lalitpur|Pokhara/)?.[0]).filter(Boolean)).size

export function HomePage() {
  return (
    <main className="corporate-page corporate-page--home">
      <section className="corporate-hero corporate-hero--image corporate-hero--ink photo-text-overlay" data-surface="ink" aria-labelledby="home-hero-title">
        <div
          className="corporate-hero__image-layer"
          style={{ backgroundImage: `url(${homeHeroImage})` }}
          aria-hidden="true"
        />
        <ScrollReveal className="corporate-shell corporate-hero__inner">
          <div className="corporate-hero__copy">
            <p className="section-header__eyebrow">Since 2018 in Nepal</p>
            <h1 id="home-hero-title">A quiet house of Japanese hospitality.</h1>
            <p>
              Hokkaido Group brings authentic Japanese dining, retail, wellness, and trading experiences closer to
              Nepalese communities.
            </p>
            <div className="corporate-actions">
              <Link to="/businesses" className="corporate-button corporate-button--primary">
                Our brands
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

      <section className="corporate-brand-strip" data-surface="ink" aria-label="Hokkaido Group business portfolio">
        <ScrollReveal className="corporate-shell corporate-brand-strip__inner">
          <p className="corporate-eyebrow">Brands</p>
          <div className="corporate-brand-strip__rail">
            {businesses.map((business) => (
              <Link key={business.id} to={`/businesses/${business.slug}`} className="corporate-brand-strip__item">
                <span>{business.name}</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <CategoryDivisionBand />

      <SectionSurface variant="ink" className="home-philosophy" aria-labelledby="home-philosophy-title">
        <ScrollReveal className="corporate-shell home-philosophy__inner">
          <div className="home-philosophy__mark">
            <span lang="ja">おもてなし</span>
            <small>Omotenashi — hospitality and care</small>
          </div>
          <div className="home-philosophy__copy">
            <p className="section-header__eyebrow">The Hokkaido way</p>
            <h2 id="home-philosophy-title">Hospitality is found in the details.</h2>
            <p>
              From the first welcome to the final cup of tea, every Hokkaido experience is shaped by care,
              restraint, and a respect for the everyday ritual.
            </p>
            <div className="home-philosophy__principles" aria-label="Hokkaido hospitality principles">
              <span><b lang="ja">季節</b><small>Kisetsu — seasonality</small></span>
              <span><b lang="ja">手仕事</b><small>Teshi-goto — craft</small></span>
              <span><b lang="ja">余白</b><small>Yohaku — meaningful space</small></span>
            </div>
          </div>
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface id="businesses" variant="ink" className="corporate-section--alt home-featured-outlets">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Portfolio</p>
            <h2 className="section-header__heading">Our brands</h2>
            <p className="section-header__description">
              A portfolio of restaurants, retail businesses, wellness destinations, and trading operations.
            </p>
          </div>

          <FeaturedOutletsCarousel businesses={featuredBusinesses} />

          <div className="corporate-section__actions">
            <Link to="/businesses" className="corporate-button corporate-button--secondary">
              View full directory
            </Link>
          </div>
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface variant="rice-paper">
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
      </SectionSurface>

      <SectionSurface variant="rice-paper" className="corporate-section--alt">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Our Vision</p>
            <h2 className="section-header__heading">Premium Japanese hospitality in Nepal.</h2>
            <p className="section-header__description">{hokkaidoVisionParagraphs[0]}</p>
          </div>
          <div className="corporate-section__actions">
            <Link to="/about" className="corporate-button corporate-button--secondary">
              Read about Hokkaido Group
            </Link>
          </div>
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface variant="rice-paper" className="corporate-cta" texture={false}>
        <ScrollReveal className="corporate-shell corporate-cta__inner">
          <div>
            <p className="section-header__eyebrow">Contact</p>
            <h2>Brand contact details are listed in the directory.</h2>
          </div>
          <Link to="/businesses" className="corporate-button corporate-button--primary">
            View Directory
          </Link>
        </ScrollReveal>
      </SectionSurface>

      <SiteFooter />
    </main>
  )
}
