import { Link } from 'react-router-dom'
import { BusinessCard } from '../components/BusinessCard'
import { SiteFooter } from '../components/SiteFooter'
import { clientVisionStatement, coreValues } from '../data/corporateContent'
import { featuredBusinesses, hnbgCorporateContact } from '../data/businesses'
import { milestones } from '../data/milestones'
import { publishedPressItems } from '../data/pressItems'

const featuredBusinessPreview = featuredBusinesses.slice(0, 6)
const foundingMilestone = milestones.find((milestone) => milestone.id === 'hnbg-founded-2019')
const latestPressItems = publishedPressItems.slice(0, 3)

function ContactValue({ label, value, href }: { label: string; value: string | null; href?: string }) {
  return (
    <div className="corporate-contact-item">
      <span>{label}</span>
      {value && href ? <a href={href}>{value}</a> : <strong>{value ?? `${label} pending verification`}</strong>}
    </div>
  )
}

export function HomePage() {
  const hasVerifiedCorporateContact = hnbgCorporateContact.verified
  const hasSocialLinks = hnbgCorporateContact.socialLinks.length > 0

  return (
    <main className="corporate-page">
      <section className="corporate-hero">
        <div className="corporate-shell corporate-hero__inner">
          <div className="corporate-hero__copy">
            <p className="section-header__eyebrow">Hokkaido Nepal Business Group</p>
            <h1>Bridging Japan and Nepal Through Food, Business, and Culture</h1>
            <p>
              A corporate group building Japanese dining, retail, trading, and hospitality ventures in Nepal with a
              focus on care, consistency, and cross-cultural connection.
            </p>
            <div className="corporate-actions">
              <Link to="/businesses" className="corporate-button corporate-button--primary">
                Our Businesses
              </Link>
              <Link to="/contact" className="corporate-button corporate-button--secondary">
                Contact HNBG
              </Link>
            </div>
          </div>
          <div className="corporate-hero__media" aria-label="Japanese restaurant interior photography pending client approval">
            <img src="/gallery/interior-01.svg" alt="" />
            <p>Real HNBG photography pending client confirmation before launch.</p>
          </div>
        </div>
      </section>

      <section id="about" className="corporate-section">
        <div className="corporate-shell corporate-split">
          <div className="section-header">
            <p className="section-header__eyebrow">Vision</p>
            <h2 className="section-header__heading">Authentic Japanese food and business practice in Nepal</h2>
          </div>
          <div className="corporate-copy-card corporate-copy-card--notice">
            {clientVisionStatement ? (
              <p>{clientVisionStatement}</p>
            ) : (
              <>
                <h3>Client-approved vision copy pending</h3>
                <p>
                  Add the client's exact mission wording here before launch. Required copy fixes are already noted:
                  "Hokkaodo" should read "Hokkaido" and "Hongkong & Nepal" should read "Japan & Nepal".
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="businesses" className="corporate-section corporate-section--alt">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Our Businesses</p>
            <h2 className="section-header__heading">A growing HNBG portfolio</h2>
            <p className="section-header__description">
              Featured listings are pulled from the shared business data source. Unverified entries remain visibly
              marked through their pending location and contact details.
            </p>
          </div>

          <div className="corporate-business-grid">
            {featuredBusinessPreview.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          <div className="corporate-section__actions">
            <Link to="/businesses" className="corporate-button corporate-button--secondary">
              View All Businesses
            </Link>
          </div>
        </div>
      </section>

      <section className="corporate-section">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Core Values</p>
            <h2 className="section-header__heading">Values pending final client confirmation</h2>
            <p className="section-header__description">
              The value names below use the current draft labels. Each has a distinct one-line explanation and should be
              confirmed by the client before launch.
            </p>
          </div>
          <div className="corporate-value-grid">
            {coreValues.map((value) => (
              <article key={value.name} className="corporate-value-card">
                <span aria-hidden="true">{value.icon}</span>
                <h3>{value.name}</h3>
                <p>{value.explanation}</p>
                {value.needsClientConfirmation ? <small>Pending client confirmation</small> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="corporate-section corporate-section--alt">
        <div className="corporate-shell corporate-split">
          <div className="section-header">
            <p className="section-header__eyebrow">Milestone</p>
            <h2 className="section-header__heading">Founded in 2019 with a ramen production milestone</h2>
            <Link to="/about" className="corporate-button corporate-button--secondary">
              View Full Timeline
            </Link>
          </div>
          {foundingMilestone ? (
            <article className="timeline__item corporate-milestone-card">
              <p className="timeline__year">{foundingMilestone.year}</p>
              <h3 className="timeline__title">{foundingMilestone.title}</h3>
              <p>{foundingMilestone.description}</p>
            </article>
          ) : null}
        </div>
      </section>

      <section id="press" className="corporate-section">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Press & News</p>
            <h2 className="section-header__heading">Latest updates</h2>
          </div>
          {latestPressItems.length >= 3 ? (
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
            <div className="corporate-empty-state">
              <h3>Coming Soon</h3>
              <p>
                Fewer than three verified news posts exist in the press data source, so the homepage will not duplicate
                placeholder articles.
              </p>
              <Link to="/press" className="corporate-button corporate-button--secondary">
                Press & News
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="corporate-cta">
        <div className="corporate-shell corporate-cta__inner">
          <div>
            <p className="section-header__eyebrow">Contact</p>
            <h2>Start a conversation with HNBG</h2>
            {!hasVerifiedCorporateContact ? (
              <p className="corporate-alert">Corporate contact details are pending verification and must not go live as final.</p>
            ) : null}
          </div>
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
            <div className="corporate-contact-item">
              <span>Social</span>
              {hasSocialLinks ? (
                <div className="corporate-social-links">
                  {hnbgCorporateContact.socialLinks.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : (
                <strong>Social links pending verification</strong>
              )}
            </div>
          </div>
          <Link to="/contact" className="corporate-button corporate-button--primary">
            Get in Touch
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
