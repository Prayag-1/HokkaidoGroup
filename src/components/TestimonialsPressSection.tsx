import { testimonials } from '../data/testimonials'
import { pressItems } from '../data/pressItems'

export function TestimonialsPressSection() {
  return (
    <section id="press" className="hg-section hg-section--soft">
      <div className="hg-shell">
        <div className="hg-section__intro">
          <p className="hg-eyebrow">Testimonial</p>
          <h2 className="hg-title">Guest voices from across the group</h2>
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

        <div className="hg-section__intro hg-section__intro--left hg-press-intro">
          <p className="hg-eyebrow">Press & Media</p>
          <h2 className="hg-title">Stories, openings, and guest notes.</h2>
        </div>

        <div className="hg-press-grid">
          {pressItems.map((item) => (
            <article key={item.title} className="hg-press-card">
              <img src={item.image} alt="" loading="lazy" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a href="/contact">Read more</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
