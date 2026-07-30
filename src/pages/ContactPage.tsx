import { Link } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { SiteFooter } from '../components/SiteFooter'
import { hnbgCorporateContact } from '../data/businesses'

export function ContactPage() {
  return (
    <main>
      <section className="hg-section">
        <div className="hg-shell hg-split">
          <div>
            <p className="hg-eyebrow">Contact</p>
            <h1 className="hg-title">Reach the Hokkaido Group office.</h1>
            <p className="hg-lead">
              For media, catering, partnerships, suppliers, events, or general questions, send a message to the group
              office.
            </p>

            <div className="hg-panel">
              <p className="hg-eyebrow">Direct contact</p>
              <h3>Head Office</h3>
              <p>
                {hnbgCorporateContact.email ? (
                  <a href={`mailto:${hnbgCorporateContact.email}`}>{hnbgCorporateContact.email}</a>
                ) : (
                  'Email pending verification'
                )}
              </p>
              <p>
                {hnbgCorporateContact.phone ? (
                  <a href={`tel:${hnbgCorporateContact.phone}`}>{hnbgCorporateContact.phone}</a>
                ) : (
                  'Phone pending verification'
                )}
              </p>
              <p>{hnbgCorporateContact.address ?? 'Address pending verification'}</p>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="hg-shell hg-actions">
          <Link to="/" className="hg-button hg-button--outline-dark">
            Back home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
