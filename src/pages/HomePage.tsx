import { Link } from 'react-router-dom'
import { MapPinned, Newspaper } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { BusinessCard } from '../components/BusinessCard'
import { CategoryDivisionBand } from '../components/CategoryDivisionBand'
import { PendingNotice } from '../components/PendingNotice'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { businesses, featuredBusinesses, hnbgCorporateContact } from '../data/businesses'
import { milestones } from '../data/milestones'
import { publishedPressItems } from '../data/pressItems'

const homepageHeroMedia: { src: string; alt: string } | null = null
const featuredBusinessPreview = featuredBusinesses.slice(0, 6)
const homepageMilestones = milestones.filter((milestone) =>
  milestone.id === 'hnbg-founded-2019' || milestone.id === 'present-day-portfolio'
)
const latestPressItems = publishedPressItems.slice(0, 3)
const LocationSpotlight = lazy(() => import('../components/LocationSpotlight').then(({ LocationSpotlight }) => ({ default: LocationSpotlight })))

function displayMilestoneCopy(copy: string) {
  return copy.replace(/\s*Details pending verification\.$/, '')
}

function ComingSoonTreatment({ label = 'Details coming soon' }: { label?: string }) {
  return (
    <div className="corporate-coming-soon">
      <span aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

function ContactValue({ label, value, href }: { label: string; value: string | null; href?: string }) {
  if (!value) {
    return null
  }

  return (
    <div className="corporate-contact-item">
      <span>{label}</span>
      {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
    </div>
  )
}

export function HomePage() {
  const hasCorporateContact = Boolean(hnbgCorporateContact.email || hnbgCorporateContact.phone || hnbgCorporateContact.address)
  const hasSocialLinks = hnbgCorporateContact.socialLinks.length > 0

  return (
    <main className="corporate-page">
      <section className={`corporate-hero ${homepageHeroMedia ? 'corporate-hero--media' : 'corporate-hero--pattern'}`}>
        <ScrollReveal className="corporate-shell corporate-hero__inner">
          <div className="corporate-hero__copy">
            <p className="section-header__eyebrow">Hokkaido Nepal Business Group</p>
            <h1>Japanese craft, served across Nepal.</h1>
            <p>
              HNBG brings Japanese dining, retail, trading, and hospitality work into one careful Nepal-based group.
            </p>
            <div className="corporate-actions">
              <Link to="/businesses" className="corporate-button corporate-button--primary">
                Explore Businesses
              </Link>
              <Link to="/contact" className="corporate-button corporate-button--secondary">
                Start a Conversation
              </Link>
            </div>
          </div>
          {homepageHeroMedia ? (
            <figure className="corporate-hero__media">
              <img src={homepageHeroMedia.src} alt={homepageHeroMedia.alt} />
            </figure>
          ) : (
            <div className="corporate-hero__visual" aria-hidden="true">
              <div className="corporate-hero__visual-frame">
                <strong>Japan / Nepal</strong>
              </div>
            </div>
          )}
        </ScrollReveal>
      </section>

      <section className="corporate-brand-strip" aria-label="HNBG business portfolio">
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
            <h2 className="section-header__heading">Places with their own rhythm.</h2>
            <p className="section-header__description">
              A focused first look at restaurants, retail, trading, and resort hospitality.
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
              description="Saved Google Maps places frame each outlet view."
            />
          </Suspense>
        </ScrollReveal>
      </section>

      <section className="corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell corporate-milestone-split">
          <div className="section-header">
            <p className="section-header__eyebrow">Journey</p>
            <h2 className="section-header__heading">First steps, then a wider table.</h2>
            <Link to="/about" className="corporate-button corporate-button--secondary">
              View Timeline
            </Link>
          </div>
          <div className="corporate-map-stat-panel">
            <div className="corporate-home-map" aria-label="Nepal map graphic">
              <MapPinned aria-hidden="true" size={34} strokeWidth={1.8} />
              <span>Nepal</span>
            </div>
            <div className="corporate-home-stats">
              {homepageMilestones.map((milestone) => (
                <article key={milestone.id} className="corporate-home-stat">
                  <p>{milestone.year}</p>
                  <h3>{milestone.title}</h3>
                  <span>{displayMilestoneCopy(milestone.description)}</span>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="press" className="corporate-section">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Notes</p>
            <h2 className="section-header__heading">Public updates, when ready.</h2>
          </div>
          {latestPressItems.length > 0 ? (
            <div className="corporate-news-grid">
              {latestPressItems.map((item) => (
                <article key={item.title} className="corporate-news-card">
                  <img src={item.image} alt="" loading="lazy" />
                  <div>
                    <p>{item.date}</p>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <a href={item.url}>Read More</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="corporate-empty-state corporate-empty-state--illustrated">
              <span className="corporate-empty-state__icon" aria-hidden="true">
                <Newspaper size={28} strokeWidth={1.8} />
              </span>
              <h3>Stories will appear here.</h3>
              <p>Press updates and opening notes will appear when they are ready for the public site.</p>
              <Link to="/press" className="corporate-button corporate-button--secondary">
                Press Room
              </Link>
            </div>
          )}
        </ScrollReveal>
      </section>

      <section className="corporate-cta">
        <ScrollReveal className="corporate-shell corporate-cta__inner">
          <div>
            <p className="section-header__eyebrow">Contact</p>
            <h2>Send a note to HNBG.</h2>
          </div>
          {hasCorporateContact || hasSocialLinks ? (
            <div className="corporate-contact-grid">
              <ContactValue label="Address" value={hnbgCorporateContact.address} />
              <ContactValue
                label="Phone"
                value={hnbgCorporateContact.phone}
                href={hnbgCorporateContact.phone ? `tel:${hnbgCorporateContact.phone}` : undefined}
              />
              <ContactValue
                label="Email"
                value={hnbgCorporateContact.email}
                href={hnbgCorporateContact.email ? `mailto:${hnbgCorporateContact.email}` : undefined}
              />
              {hasSocialLinks ? (
                <div className="corporate-contact-item">
                  <span>Social</span>
                  <div className="corporate-social-links">
                    {hnbgCorporateContact.socialLinks.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <ComingSoonTreatment />
          )}
          <Link to="/contact" className="corporate-button corporate-button--primary">
            Contact the Group
          </Link>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
