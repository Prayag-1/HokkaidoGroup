import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { formEndpoints } from '../config/forms'
import { hnbgCorporateContact } from '../data/businesses'

export function ContactPage() {
  return (
    <main className="hg-contact-page">
      <section className="hg-section">
        <div className="hg-shell hg-split hg-split--contact">
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

          <form action={formEndpoints.contact} method="POST" className="hg-panel hg-form">
            <input type="hidden" name="_subject" value="New Hokkaido Group contact inquiry" />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <p className="hg-eyebrow">Send a message</p>

            <label className="hg-field">
              Name
              <input name="name" autoComplete="name" required maxLength={120} />
            </label>
            <label className="hg-field">
              Email
              <input type="email" name="email" autoComplete="email" required maxLength={160} />
            </label>
            <label className="hg-field">
              Inquiry type
              <select name="inquiry" required>
                <option>General inquiry</option>
                <option>Reservation support</option>
                <option>Catering</option>
                <option>Franchise</option>
                <option>Partnership</option>
                <option>Supplier or import</option>
                <option>Media</option>
              </select>
            </label>
            <label className="hg-field">
              Message
              <textarea name="message" rows={6} required maxLength={1200} />
            </label>
            <button type="submit" className="hg-button hg-button--dark">
              Send message
            </button>
          </form>
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
