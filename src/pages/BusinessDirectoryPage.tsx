import { BusinessCard } from '../components/BusinessCard'
import { SiteFooter } from '../components/SiteFooter'
import { businessCategories, businesses } from '../data/businesses'

export function BusinessDirectoryPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Our Businesses</p>
            <h1 className="section-header__heading">HNBG business directory</h1>
            <p className="section-header__description">
              Portfolio listings are pulled from the shared business data source. Entries marked pending still need
              client verification before launch.
            </p>
          </div>

          <div className="business-directory">
            {businessCategories.map((category) => {
              const categoryBusinesses = businesses.filter((business) => business.category === category)

              return (
                <section key={category} className="business-directory__group" aria-labelledby={`${category}-heading`}>
                  <h2 id={`${category}-heading`}>{category}</h2>
                  <div className="corporate-business-grid">
                    {categoryBusinesses.map((business) => (
                      <BusinessCard key={business.id} business={business} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
