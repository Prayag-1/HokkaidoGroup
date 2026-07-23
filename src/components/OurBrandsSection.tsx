import { Link } from 'react-router-dom'
import { brands } from '../data/brands'

export function OurBrandsSection() {
  return (
    <section id="brands" className="hg-section hg-section--soft">
      <div className="hg-shell">
        <div className="hg-section__intro">
          <p className="hg-eyebrow">Our brands</p>
          <h2 className="hg-title">A collection built slowly, and on purpose.</h2>
          <p className="hg-lead">
            Each Hokkaido brand answers a different guest need: everyday ramen, relaxed dining, refined izakaya,
            chef-led omakase, quick bento, catering, and group partnerships.
          </p>
        </div>

        <div className="hg-grid hg-grid--3">
          {brands.map((brand, index) => (
            <Link key={brand.slug} to={`/brands/${brand.slug}`} className="hg-card">
              <div className="hg-card__top">
                <p className="hg-eyebrow">{brand.concept}</p>
                <span className="hg-eyebrow">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <p className="hg-copy">{brand.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
