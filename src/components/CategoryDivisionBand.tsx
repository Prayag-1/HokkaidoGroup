import { Link } from 'react-router-dom'
import { HandPlatter, PackageSearch, ShoppingBag, Sprout, type LucideIcon } from 'lucide-react'
import type { BusinessCategory } from '../data/businesses'
import { businessCategories } from '../data/businesses'

const categoryIconMap: Record<BusinessCategory, LucideIcon> = {
  Restaurant: HandPlatter,
  Retail: ShoppingBag,
  Trading: PackageSearch,
  'Farm & Resort': Sprout,
}

export function CategoryDivisionBand() {
  return (
    <section className="corporate-division-band" aria-label="HNBG business divisions">
      <div className="corporate-shell corporate-division-band__inner">
        <div className="corporate-division-band__intro">
          <p className="corporate-eyebrow">Divisions</p>
        </div>
        <div className="corporate-division-band__list">
          {businessCategories.map((category) => {
            const Icon = categoryIconMap[category]

            return (
              <Link
                key={category}
                to={`/businesses?category=${encodeURIComponent(category)}`}
                className="corporate-division-band__item"
              >
                <Icon aria-hidden="true" size={34} strokeWidth={1.65} />
                <span>{category}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
