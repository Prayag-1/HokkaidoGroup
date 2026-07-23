import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { formEndpoints } from '../config/forms'

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
                <a href="mailto:hello@hokkaidogroup.com">hello@hokkaidogroup.com</a>
              </p>
              <p>
                <a href="tel:+97714000000">+977 1 4000 000</a>
              </p>
              <p>Durbar Marg, Kathmandu 44600, Nepal</p>
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
