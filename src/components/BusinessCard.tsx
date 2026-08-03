import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Business } from '../data/businesses'

type BusinessCardProps = {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  const href = `/businesses/${business.slug}`
  const cardImage = business.image ?? business.logo
  const usesLogo = Boolean(business.logo && cardImage === business.logo)
  const location = business.locationSummary ?? business.address
  const cardImageAlt = business.logo && cardImage === business.logo ? `${business.name} logo` : `${business.name} venue photo`
  const fallbackLabel = business.name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 4)
    .toUpperCase()

  return (
    <article className={`business-card${cardImage ? '' : ' business-card--text-only'}${usesLogo ? ' business-card--logo' : ''}`} id={business.slug}>
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
        <p className="business-card__kicker">{business.category === 'Restaurant' ? 'Dining' : business.category}</p>
        <h3 className="business-card__title">{business.name}</h3>
        {location ? (
          <p className="business-card__location">
            <MapPin size={16} strokeWidth={2} aria-hidden="true" />
            <span>{location}</span>
          </p>
        ) : null}
        {business.description ? <p className="business-card__description">{business.description}</p> : null}
        <Link className="business-card__link" to={href}>
          View location
          <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
