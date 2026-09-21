import { ArrowUpRight } from 'lucide-react'
import type { Franchise } from '../data/editorialContent'
export function FranchiseCard({ franchise }: { franchise: Franchise }) {
  return (
    <article className="location-card">
      <a href={franchise.websiteUrl} target="_blank" rel="noopener noreferrer">
        <img src={franchise.image} alt={franchise.name} />
        <div className="location-card__caption">
          <span className="triangle" aria-hidden="true" />
          <h3>{franchise.location}</h3>
          <p>{franchise.brand}</p>
        </div>
        <h3>{franchise.name}</h3>
        <p>{franchise.description}</p>
        <span className="text-link">
          Learn more <ArrowUpRight size={16} />
        </span>
      </a>
    </article>
  )
}
