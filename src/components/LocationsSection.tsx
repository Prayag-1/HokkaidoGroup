import { Link } from 'react-router-dom'
import { locations } from '../data/locations'

export function LocationsSection() {
  return (
    <section id="notable" className="hg-section">
      <div className="hg-shell">
        <div className="hg-section__intro">
          <p className="hg-eyebrow">New & Notable</p>
          <h2 className="hg-title">The latest tables from Hokkaido</h2>
          <p className="hg-lead">
            A quick path into newer and most-requested outlets across the group.
          </p>
        </div>

        <div className="hg-notable-grid">
          {locations.map((location, index) => (
            <article key={`${location.venue}-${location.area}`} className="hg-notable-card">
              <img src={`/gallery/${index % 2 === 0 ? 'food-02' : 'interior-02'}.svg`} alt="" loading="lazy" />
              <div>
                <h3>{location.venue}</h3>
                <p>{location.brand}</p>
                <p className="hg-copy">{location.area}</p>
              </div>
              <Link to={`/brands/${location.brandSlug}`} className="hg-button hg-button--outline-dark">
                View outlet
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
