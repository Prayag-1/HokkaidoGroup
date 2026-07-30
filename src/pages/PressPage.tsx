import { Newspaper } from 'lucide-react'
import { EmptyState } from '../components/EmptyState'
import { SiteFooter } from '../components/SiteFooter'
import { publishedPressItems } from '../data/pressItems'

export function PressPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Notes</p>
            <h1 className="section-header__heading">Public updates, when ready.</h1>
            <p className="section-header__description">
              Verified posts appear only when the real news data source is ready.
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
            <EmptyState
              title="Stories will appear here."
              description="Press updates and opening notes will appear when they are ready for the public site."
              headingLevel={2}
              icon={Newspaper}
            />
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
