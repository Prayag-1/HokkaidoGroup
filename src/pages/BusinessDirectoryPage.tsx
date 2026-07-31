import { Link, useSearchParams } from 'react-router-dom'
import { BusinessCard } from '../components/BusinessCard'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { businessCategories, businesses, type BusinessCategory } from '../data/businesses'

export function BusinessDirectoryPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const selectedCategory = businessCategories.includes(categoryParam as BusinessCategory) ? categoryParam as BusinessCategory : null
  const visibleCategories = selectedCategory ? [selectedCategory] : businessCategories

  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Portfolio</p>
            <h1 className="section-header__heading">Business directory</h1>
            <p className="section-header__description">
              Browse the Hokkaido Group brands listed in the source document.
            </p>
            {selectedCategory ? (
              <div className="corporate-section__actions">
                <Link to="/businesses" className="corporate-button corporate-button--secondary">
                  Show All Divisions
                </Link>
              </div>
            ) : null}
          </div>

          <div className="business-directory">
            {visibleCategories.map((category) => {
              const categoryBusinesses = businesses.filter((business) => business.category === category)

              return (
                <section key={category} className="business-directory__group" aria-labelledby={`${category}-heading`}>
                  <header className="business-directory__group-header">
                    <p className="section-header__eyebrow">{categoryBusinesses.length} listings</p>
                    <h2 id={`${category}-heading`}>{category}</h2>
                  </header>
                  <div className="corporate-business-grid">
                    {categoryBusinesses.map((business) => (
                      <BusinessCard key={business.id} business={business} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </ScrollReveal>
      </section>
      <SiteFooter />
    </main>
  )
}
