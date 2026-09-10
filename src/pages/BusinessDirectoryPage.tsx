import { Link, useSearchParams } from 'react-router-dom'
import { FeaturedOutletsCarousel } from '../components/FeaturedOutletsCarousel'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionSurface } from '../components/SectionSurface'
import { SiteFooter } from '../components/SiteFooter'
import { businessCategories, businesses, type BusinessCategory } from '../data/businesses'

export function BusinessDirectoryPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const selectedCategory = businessCategories.includes(categoryParam as BusinessCategory) ? categoryParam as BusinessCategory : null
  const visibleBusinesses = selectedCategory
    ? businesses.filter((business) => business.category === selectedCategory)
    : businesses

  return (
    <main className="corporate-page corporate-page--business-directory business-directory--editorial">
      <SectionSurface variant="ink" className="corporate-section--first business-directory__surface">
        <ScrollReveal className="corporate-shell">
          <div className="business-directory__intro">
            <div className="section-header corporate-section__header">
              <p className="section-header__eyebrow">Brands</p>
              <h1 className="section-header__heading">Restaurants, retail, resort, and trading</h1>
              <p className="editorial-japanese-note"><span lang="ja">まち</span> / Machi — places to return to.</p>
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
          </div>

          <FeaturedOutletsCarousel businesses={visibleBusinesses} />
        </ScrollReveal>
      </SectionSurface>
      <SiteFooter />
    </main>
  )
}
