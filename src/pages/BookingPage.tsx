import { Link } from 'react-router-dom'
import { BookingForm } from '../components/BookingForm'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'

export function BookingPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className="corporate-shell corporate-split">
          <div>
            <p className="corporate-eyebrow">Reservations</p>
            <h1 className="corporate-title">Request a table with care.</h1>
            <p className="corporate-lead">
              Send the details to the Hokkaido team. A reservation is final only after a manual reply.
            </p>

            <div className="corporate-grid corporate-grid--2">
              <article className="corporate-card">
                <p className="corporate-eyebrow">01</p>
                <h3>Share the details</h3>
                <p>Share the venue, date, time, guest count, and any notes.</p>
              </article>
              <article className="corporate-card">
                <p className="corporate-eyebrow">02</p>
                <h3>Confirm by reply</h3>
                <p>The booking is final only after the team confirms manually.</p>
              </article>
            </div>
          </div>

          <BookingForm />
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
