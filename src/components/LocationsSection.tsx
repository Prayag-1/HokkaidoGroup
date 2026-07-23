import { Link } from 'react-router-dom'
import { locations } from '../data/locations'

export function LocationsSection() {
  return (
    <section id="locations" className="hg-section">
      <div className="hg-shell hg-split">
        <div>
          <p className="hg-eyebrow">Locations</p>
          <h2 className="hg-title">Six venues, one standard of welcome.</h2>
          <p className="hg-lead">
            Every venue has its own pace, but the guest experience should feel connected across the group.
          </p>
        </div>

        <div className="hg-list">
          {locations.map((location, index) => (
            <article key={`${location.venue}-${location.area}`} className="hg-list__item">
              <span className="hg-eyebrow">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{location.venue}</h3>
                <p>{location.brand}</p>
                <p className="hg-copy">{location.area}</p>
              </div>
              <Link to={`/brands/${location.brandSlug}`} className="hg-button hg-button--outline-dark">
                View
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
