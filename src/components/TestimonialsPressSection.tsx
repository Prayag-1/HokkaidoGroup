import { testimonials } from '../data/testimonials'

export function TestimonialsPressSection() {
  return (
    <section id="press" className="hg-section hg-section--soft">
      <div className="hg-shell">
        <div className="hg-section__intro">
          <p className="hg-eyebrow">Guest voices</p>
          <h2 className="hg-title">Warmth, detail, and consistency.</h2>
        </div>

        <div className="hg-grid hg-grid--3">
          {testimonials.slice(0, 6).map((item) => (
            <article key={`${item.name}-${item.brand}`} className="hg-card">
              <p className="hg-eyebrow">{item.source}</p>
              <h3>{item.brand}</h3>
              <p>"{item.quote}"</p>
              <p className="hg-copy">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
