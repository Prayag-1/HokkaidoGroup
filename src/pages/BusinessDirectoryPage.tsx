import { Link, useSearchParams } from 'react-router-dom'
import { BusinessCard } from '../components/BusinessCard'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionSurface } from '../components/SectionSurface'
import { SiteFooter } from '../components/SiteFooter'
import { businessCategories, businesses, type BusinessCategory } from '../data/businesses'

export function BusinessDirectoryPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const selectedCategory = businessCategories.includes(categoryParam as BusinessCategory) ? categoryParam as BusinessCategory : null
  const visibleCategories = selectedCategory ? [selectedCategory] : businessCategories

  return (
    <main className="corporate-page corporate-page--business-directory">
      <SectionSurface variant="rice-paper" className="corporate-section--first">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Brands</p>
            <h1 className="section-header__heading">Restaurants, retail, resort, and trading</h1>
            <p className="section-header__description">
              Explore the Hokkaido Group locations and operating divisions across Nepal.
            </p>
            {selectedCategory ? (
              <div className="corporate-section__actions">
                <Link to="/businesses" className="corporate-button corporate-button--secondary">
                  Show all divisions
                </Link>
              </div>
            ) : null}
          </div>

          <div className="business-directory">
            {visibleCategories.map((category) => {
              const categoryBusinesses = businesses.filter((business) => business.category === category)

              return (
                <section
                  key={category}
                  className="business-directory__group"
                  data-card-count={Math.min(categoryBusinesses.length, 3)}
                  aria-labelledby={`${category}-heading`}
                >
                  <header className="business-directory__group-header">
                    <p className="section-header__eyebrow">{categoryBusinesses.length} {categoryBusinesses.length === 1 ? 'location' : 'locations'}</p>
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
      </SectionSurface>
      <SiteFooter />
    </main>
  )
}
