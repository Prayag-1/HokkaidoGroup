const steps = [
  ['01', 'Inquiry', 'Guests choose a venue, date, time, and purpose.'],
  ['02', 'Review', 'The team checks availability manually.'],
  ['03', 'Confirm', 'A staff member replies by email or phone.'],
  ['04', 'Host', 'The venue prepares only after confirmation.'],
]

export function FarmSection() {
  return (
    <section className="hg-section hg-section--soft">
      <div className="hg-shell hg-split">
        <div>
          <p className="hg-eyebrow">Booking flow</p>
          <h2 className="hg-title">Simple requests. Human confirmation.</h2>
          <p className="hg-lead">
            The website should collect clean information, not promise instant reservations. Formspree sends the
            request to the team, and the team confirms manually.
          </p>
        </div>

        <div className="hg-grid hg-grid--2">
          {steps.map(([number, title, copy]) => (
            <article key={title} className="hg-card">
              <p className="hg-eyebrow">{number}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
