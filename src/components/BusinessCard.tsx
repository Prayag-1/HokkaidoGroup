import type { Business } from '../data/businesses'

type BusinessCardProps = {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  const href = business.websiteUrl ?? `/businesses#${business.slug}`
  const location = business.locationSummary ?? business.address ?? 'Location pending verification'

  return (
    <article className="business-card" id={business.slug}>
      <a className="business-card__media" href={href} aria-label={`Learn more about ${business.name}`}>
        <img src={business.logo ?? business.image} alt="" loading="lazy" />
      </a>
      <div className="business-card__body">
        <p className="business-card__tag">{business.category}</p>
        <h3 className="business-card__title">{business.name}</h3>
        <p className="business-card__location">{location}</p>
        {business.description ? <p className="business-card__description">{business.description}</p> : null}
        <a className="business-card__link" href={href}>
          Learn More
        </a>
      </div>
    </article>
  )
}
