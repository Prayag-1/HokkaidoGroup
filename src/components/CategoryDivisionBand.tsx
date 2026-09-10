import { Link } from 'react-router-dom'
import { HandPlatter, PackageSearch, ShoppingBag, Sprout, type LucideIcon } from 'lucide-react'
import type { BusinessCategory } from '../data/businesses'
import { businessCategories } from '../data/businesses'
import { SectionSurface } from './SectionSurface'

const categoryIconMap: Record<BusinessCategory, LucideIcon> = {
  Restaurant: HandPlatter,
  Retail: ShoppingBag,
  Trading: PackageSearch,
  'Farm & Resort': Sprout,
}

export function CategoryDivisionBand() {
  return (
    <SectionSurface
      variant="rice-paper"
      className="corporate-division-band"
      aria-labelledby="business-divisions-title"
    >
      <div className="corporate-shell corporate-division-band__inner">
        <div className="corporate-division-band__intro">
          <p className="section-header__eyebrow">Divisions</p>
          <h2 id="business-divisions-title">Our business divisions</h2>
        </div>
        <div className="corporate-division-band__list">
          {businessCategories.map((category, index) => {
            const Icon = categoryIconMap[category]

            return (
              <Link
                key={category}
                to={`/businesses?category=${encodeURIComponent(category)}`}
                className="corporate-division-band__item"
              >
                <span className="corporate-division-band__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon aria-hidden="true" size={26} strokeWidth={1.5} />
                <span className="corporate-division-band__label">{category}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </SectionSurface>
  )
}
