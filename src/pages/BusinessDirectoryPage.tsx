import { BusinessImage } from '../components/BusinessImage'
import { OutletPhotos } from '../components/OutletPhotos'
import { Link, useSearchParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import {
  businessCategories,
  businesses,
  type BusinessCategory,
} from '../data/businesses'
export function BusinessDirectoryPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const groups = businessCategories.includes(category as BusinessCategory)
    ? [category as BusinessCategory]
    : businessCategories
  return (
    <main id="main-content" className="editorial-page">
      <PageBreadcrumb title="Our outlets" />
      <h1 className="page-title">Our outlets</h1>
      <div className="corporate-shell brand-directory">
        {category && (
          <Link className="text-link" to="/our-brands">
            View all outlets
          </Link>
        )}
        {groups.map((group) => (
          <section key={group}>
            <h2>{group}</h2>
            {businesses
              .filter((b) => b.category === group)
              .map((b) => (
                <article className="brand-listing" key={b.id}>
                  <div className="brand-listing__media">
                    <BusinessImage business={b} />
                    <OutletPhotos business={b} />
                  </div>
                  <div>
                    <p className="eyebrow">{b.name}</p>
                    <h3>{b.locationSummary ?? b.address}</h3>
                    <p>{b.description}</p>
                    {b.phone && (
                      <a className="brand-phone" href={`tel:${b.phone}`}>
                        {b.phone}
                      </a>
                    )}
                    <Link
                      className="editorial-button"
                      to={`/businesses/${b.slug}`}
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
          </section>
        ))}
      </div>
      <SiteFooter />
    </main>
  )
}
