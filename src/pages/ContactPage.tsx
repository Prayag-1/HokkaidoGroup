import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Clock, Mail, MapPin, MessageSquare, Navigation, Phone } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { businesses, hnbgLogo } from '../data/businesses'
import contactHeroImage from '../assets/gallery/izakaya/izakaya2.webp'
import contactDetailImage from '../assets/gallery/sora/sora4.webp'
import contactRoomImage from '../assets/gallery/umami/umami1.webp'

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function ContactPage() {
  const cityCount = new Set(businesses.map((business) => business.address?.match(/Kathmandu|Lalitpur|Pokhara/)?.[0]).filter(Boolean)).size

  return (
    <main className="corporate-page corporate-contact-page">
      <section className="contact-hero corporate-section corporate-section--first">
        <ScrollReveal className="corporate-shell contact-hero__grid">
          <div className="contact-hero__copy">
            <div className="contact-hero__brandmark">
              <img src={hnbgLogo} alt="" aria-hidden="true" />
              <span>Hokkaido Nepal Business Group</span>
            </div>
            <p className="section-header__eyebrow">Contact HNBG</p>
            <h1>Book a table. Reach a brand. Start a partnership.</h1>
            <p>
              Choose the right outlet directly or send one group inquiry for reservations, retail, resort, import, and
              business conversations.
            </p>
            <div className="contact-hero__actions">
              <a href="#brand-contacts" className="corporate-button corporate-button--primary">
                <Building2 size={17} strokeWidth={2.2} aria-hidden="true" />
                Brand contacts
              </a>
              <a href="#contact-form" className="corporate-button corporate-button--secondary">
                <MessageSquare size={17} strokeWidth={2.2} aria-hidden="true" />
                Send inquiry
              </a>
            </div>
            <dl className="contact-hero__metrics" aria-label="Hokkaido Group contact summary">
              <div>
                <dt>{businesses.length}</dt>
                <dd>Operating brands</dd>
              </div>
              <div>
                <dt>{cityCount}</dt>
                <dd>Cities</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>Group directory</dd>
              </div>
            </dl>
          </div>

          <div className="contact-hero__visual">
            <div className="contact-showcase" aria-label="Hokkaido Group dining spaces">
              <figure className="contact-showcase__primary">
                <img src={contactHeroImage} alt="Hokkaido Group dining room" loading="eager" />
              </figure>
              <figure className="contact-showcase__tile contact-showcase__tile--top">
                <img src={contactDetailImage} alt="Hokkaido Sora dining view" loading="eager" />
              </figure>
              <figure className="contact-showcase__tile contact-showcase__tile--bottom">
                <img src={contactRoomImage} alt="Hokkaido Umami dining room" loading="eager" />
              </figure>
              <div className="contact-showcase__badge">
                <img src={hnbgLogo} alt="" aria-hidden="true" />
                <div>
                  <span>Concierge line</span>
                  <strong>{businesses.length} brands across Nepal</strong>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="contact-form" className="contact-workbench corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell contact-workbench__grid">
          <div className="contact-workbench__intro">
            <p className="section-header__eyebrow">Message the group</p>
            <h2>Tell us where the conversation should go.</h2>
            <p className="section-header__description">
              Select the brand that matches your request, or choose a general Hokkaido Group inquiry.
            </p>
            <div className="contact-route-panel" aria-label="Contact routes">
              <article>
                <Clock size={18} strokeWidth={2.1} aria-hidden="true" />
                <div>
                  <h3>Reservations</h3>
                  <p>Call the outlet for same-day table availability.</p>
                </div>
              </article>
              <article>
                <Navigation size={18} strokeWidth={2.1} aria-hidden="true" />
                <div>
                  <h3>Visits</h3>
                  <p>Open the map link before heading to a branch.</p>
                </div>
              </article>
              <article>
                <MessageSquare size={18} strokeWidth={2.1} aria-hidden="true" />
                <div>
                  <h3>Partnerships</h3>
                  <p>Use the form for group and supplier inquiries.</p>
                </div>
              </article>
            </div>
          </div>
          <ContactForm className="contact-form-card" />
        </ScrollReveal>
      </section>

      <section id="brand-contacts" className="contact-directory corporate-section">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Brand directory</p>
            <h2 className="section-header__heading">Call, email, or find the right location.</h2>
            <p className="section-header__description">
              Direct contact details for every Hokkaido Nepal Business Group outlet and division.
            </p>
          </div>

          <div className="contact-brand-grid">
            {businesses.map((business) => {
              const contactCardImage = business.image && business.image !== business.logo ? business.image : null

              return (
                <article key={business.id} className={`contact-brand-card${contactCardImage ? '' : ' contact-brand-card--logo-only'}`}>
                  <div className="contact-brand-card__media">
                    {contactCardImage ? (
                      <img src={contactCardImage} alt={`${business.name} location`} loading="lazy" />
                    ) : business.logo ? (
                      <img src={business.logo} alt={`${business.name} logo`} loading="lazy" />
                    ) : (
                      <span>{business.name}</span>
                    )}
                  </div>

                  <div className="contact-brand-card__content">
                    <div className="contact-brand-card__header">
                      {business.logo ? (
                        <div className="contact-brand-card__logo">
                          <img src={business.logo} alt={`${business.name} logo`} loading="lazy" />
                        </div>
                      ) : null}
                      <div>
                        <p>{business.category === 'Restaurant' ? 'Dining' : business.category}</p>
                        <h3>{business.name}</h3>
                      </div>
                    </div>

                    <dl className="contact-brand-card__details">
                      <div className="contact-brand-card__detail">
                        <dt>
                          <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
                          Location
                        </dt>
                        <dd>{business.locationSummary ?? business.address}</dd>
                      </div>
                      {business.phone ? (
                        <div className="contact-brand-card__detail">
                          <dt>
                            <Phone size={15} strokeWidth={2.2} aria-hidden="true" />
                            Phone
                          </dt>
                          <dd>
                            <a href={phoneHref(business.phone)}>{business.phone}</a>
                          </dd>
                        </div>
                      ) : null}
                      {business.email ? (
                        <div className="contact-brand-card__detail">
                          <dt>
                            <Mail size={15} strokeWidth={2.2} aria-hidden="true" />
                            Email
                          </dt>
                          <dd>
                            <a href={`mailto:${business.email}`}>{business.email}</a>
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="contact-brand-card__actions">
                      {business.phone ? (
                        <a href={phoneHref(business.phone)} aria-label={`Call ${business.name}`}>
                          <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
                          Call
                        </a>
                      ) : null}
                      {business.email ? (
                        <a href={`mailto:${business.email}`} aria-label={`Email ${business.name}`}>
                          <Mail size={16} strokeWidth={2.2} aria-hidden="true" />
                          Email
                        </a>
                      ) : null}
                      {business.mapQuery ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${business.name} in Google Maps`}
                        >
                          <Navigation size={16} strokeWidth={2.2} aria-hidden="true" />
                          Map
                        </a>
                      ) : null}
                      <Link to={`/businesses/${business.slug}`} aria-label={`View ${business.name}`}>
                        <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
                        Brand
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </ScrollReveal>
      </section>
      <SiteFooter />
    </main>
  )
}
