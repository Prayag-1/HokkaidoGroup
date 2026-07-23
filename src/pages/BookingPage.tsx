import { Link } from 'react-router-dom'
import { brands } from '../data/brands'
import { SiteFooter } from '../components/SiteFooter'
import { formEndpoints } from '../config/forms'

export function BookingPage() {
  return (
    <main>
      <section className="hg-section">
        <div className="hg-shell hg-split">
          <div>
            <p className="hg-eyebrow">Booking</p>
            <h1 className="hg-title">Request a table, event, or private experience.</h1>
            <p className="hg-lead">
              This form sends a request to the Hokkaido team. Reservations are not automatic; the team confirms
              availability manually by email or phone.
            </p>

            <div className="hg-grid hg-grid--2">
              <article className="hg-card">
                <p className="hg-eyebrow">01</p>
                <h3>Send request</h3>
                <p>Share the venue, date, time, guest count, and any notes.</p>
              </article>
              <article className="hg-card">
                <p className="hg-eyebrow">02</p>
                <h3>Wait for reply</h3>
                <p>The booking is final only after the team confirms manually.</p>
              </article>
            </div>
          </div>

          <form action={formEndpoints.booking} method="POST" className="hg-panel hg-form">
            <input type="hidden" name="_subject" value="New Hokkaido Group booking request" />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <p className="hg-eyebrow">Reservation details</p>

            <label className="hg-field">
              Full name
              <input name="name" autoComplete="name" required maxLength={120} />
            </label>
            <label className="hg-field">
              Email
              <input type="email" name="email" autoComplete="email" required maxLength={160} />
            </label>
            <label className="hg-field">
              Phone
              <input type="tel" name="phone" autoComplete="tel" required maxLength={40} />
            </label>
            <div className="hg-grid hg-grid--2" style={{ marginTop: 0 }}>
              <label className="hg-field hg-card" style={{ minHeight: 'auto' }}>
                Date
                <input type="date" name="date" required />
              </label>
              <label className="hg-field hg-card" style={{ minHeight: 'auto' }}>
                Time
                <input type="time" name="time" required />
              </label>
            </div>
            <label className="hg-field">
              Venue
              <select name="venue" required>
                {brands.slice(0, 5).map((brand) => (
                  <option key={brand.slug}>{brand.name}</option>
                ))}
                <option>Private event or catering</option>
              </select>
            </label>
            <label className="hg-field">
              Guests
              <input type="number" name="guests" min="1" max="300" required />
            </label>
            <label className="hg-field">
              Details
              <textarea name="details" rows={5} required maxLength={1200} />
            </label>
            <button type="submit" className="hg-button hg-button--dark">
              Submit request
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
