import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { businesses } from '../data/businesses'
export function StoryPage() {
  return (
    <main id="main-content" className="editorial-page">
      <PageBreadcrumb title="Our story" />
      <h1 className="page-title">Our story</h1>
      <section className="editorial-section corporate-shell timeline">
        <article>
          <span>Japan</span>
          <div>
            <h2>Where the journey began</h2>
            <p>
              Founder Arjun Adhikari's hospitality journey has roots in Bistarai
              Bistarai in Abashiri, Hokkaido, Japan.
            </p>
          </div>
        </article>
        <article>
          <span>2018</span>
          <div>
            <h2>A first home in Nepal</h2>
            <p>
              Hokkaido Ramen House opened at Park Village Resort in
              Budhanilkantha, introducing the group's Japanese dining experience
              to Nepal.
            </p>
            <img src={businesses[0].image!} alt="Hokkaido Ramen House" />
          </div>
        </article>
        <article>
          <span>Today</span>
          <div>
            <h2>A family of experiences</h2>
            <p>
              The portfolio spans restaurants, Japanese retail, sourcing and
              trading, and onsen and resort experiences.
            </p>
            <Link className="editorial-button" to="/our-brands">
              Explore our brands
            </Link>
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  )
}
