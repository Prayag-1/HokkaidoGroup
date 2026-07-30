import { Link } from 'react-router-dom'
import { BookingForm } from '../components/BookingForm'
import { SiteFooter } from '../components/SiteFooter'

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

          <BookingForm />
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
