import { SiteFooter } from '../components/SiteFooter'
import { publishedPressItems } from '../data/pressItems'

export function PressPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Press & News</p>
            <h1 className="section-header__heading">Latest HNBG updates</h1>
            <p className="section-header__description">
              Press items are shown only when verified posts exist in the real news data source.
            </p>
          </div>

          {publishedPressItems.length > 0 ? (
            <div className="corporate-news-grid">
              {publishedPressItems.map((item) => (
                <article key={item.title} className="corporate-news-card">
                  <img src={item.image} alt="" loading="lazy" />
                  <div>
                    <p>{item.date}</p>
                    <h2>{item.title}</h2>
                    <p>{item.excerpt}</p>
                    <a href={item.url}>Read More</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="corporate-empty-state">
              <h2>Coming Soon</h2>
              <p>No verified press or news posts are available yet.</p>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
