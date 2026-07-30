import { Link } from 'react-router-dom'
import type { Business } from '../data/businesses'

type BusinessCardProps = {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  const href = `/businesses/${business.slug}`
  const cardImage = business.logo ?? business.image
  const location = business.locationSummary ?? business.address
  const cardImageAlt = business.logo && cardImage === business.logo ? `${business.name} logo` : `${business.name} venue photo`
  const fallbackLabel = business.name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 4)
    .toUpperCase()

  return (
    <article className={`business-card${cardImage ? '' : ' business-card--text-only'}`} id={business.slug}>
      <Link className="business-card__media" to={href} aria-label={`Learn more about ${business.name}`}>
        {cardImage ? (
          <img
            src={cardImage}
            alt={cardImageAlt}
            loading="lazy"
            sizes="(max-width: 40rem) 86vw, (max-width: 64rem) 45vw, 24rem"
          />
        ) : (
          <span className="business-card__media-fallback" aria-hidden="true">{fallbackLabel}</span>
        )}
      </Link>
      <div className="business-card__body">
        <p className="business-card__tag">{business.category}</p>
        <h3 className="business-card__title">{business.name}</h3>
        {location ? <p className="business-card__location">{location}</p> : null}
        {business.description ? <p className="business-card__description">{business.description}</p> : null}
        <Link className="business-card__link" to={href}>
          View Business
        </Link>
      </div>
    </article>
  )
}
