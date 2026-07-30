import { Link } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { PendingNotice } from '../components/PendingNotice'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { hnbgCorporateContact } from '../data/businesses'

export function ContactPage() {
  return (
    <main className="corporate-page corporate-contact-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className="corporate-shell corporate-split corporate-split--contact">
          <div>
            <p className="corporate-eyebrow">Contact</p>
            <h1 className="corporate-title">Write to the group office.</h1>
            <p className="corporate-lead">
              For media, catering, partnerships, suppliers, events, or general questions, send a clear note.
            </p>

            <div className="corporate-panel">
              <p className="corporate-eyebrow">Direct contact</p>
              <h3>Group office</h3>
              <div className="corporate-contact-item">
                <span>Email</span>
                {hnbgCorporateContact.email ? (
                  <a href={`mailto:${hnbgCorporateContact.email}`}>{hnbgCorporateContact.email}</a>
                ) : (
                  <PendingNotice label="Email details coming soon" />
                )}
              </div>
              <div className="corporate-contact-item">
                <span>Phone</span>
                {hnbgCorporateContact.phone ? (
                  <a href={`tel:${hnbgCorporateContact.phone}`}>{hnbgCorporateContact.phone}</a>
                ) : (
                  <PendingNotice label="Phone details coming soon" />
                )}
              </div>
              <div className="corporate-contact-item">
                <span>Address</span>
                {hnbgCorporateContact.address ? (
                  <strong>{hnbgCorporateContact.address}</strong>
                ) : (
                  <PendingNotice label="Address details coming soon" />
                )}
              </div>
            </div>
          </div>

          <ContactForm />
        </ScrollReveal>

        <div className="corporate-shell corporate-actions">
          <Link to="/" className="corporate-button corporate-button--secondary">
            Return Home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
