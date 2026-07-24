import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { milestones } from '../data/milestones'

export function AboutPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell corporate-split">
          <div className="section-header">
            <p className="section-header__eyebrow">About Us</p>
            <h1 className="section-header__heading">HNBG timeline</h1>
            <p className="section-header__description">
              Verified long-form company copy is pending. This page keeps the timeline source visible without adding
              unapproved claims.
            </p>
            <Link to="/contact" className="corporate-button corporate-button--primary">
              Get in Touch
            </Link>
          </div>

          <div className="timeline corporate-timeline">
            {milestones.map((milestone) => (
              <article key={milestone.id} className="timeline__item">
                <p className="timeline__year">{milestone.year}</p>
                <h2 className="timeline__title">{milestone.title}</h2>
                <p>{milestone.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
