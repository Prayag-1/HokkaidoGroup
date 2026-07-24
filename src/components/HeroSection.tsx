export function HeroSection() {
  return (
    <section className="hg-hero">
      <div className="hg-shell hg-hero__inner">
        <div className="hg-hero__copy">
          <p className="hg-eyebrow">Restaurants, hotels, catering and hospitality</p>
          <h1 className="hg-title">
            Hokkaido Group
          </h1>
          <p className="hg-lead">
            A Nepal-based hospitality group bringing guests together through Japanese dining rooms, thoughtful service,
            private events, and warm city stays.
          </p>

          <div className="hg-actions">
            <a href="/booking" className="hg-button hg-button--light">
              Reserve a table
            </a>
            <a href="#brands" className="hg-button hg-button--outline-light">
              Restaurants
            </a>
          </div>
        </div>

        <div className="hg-stats" aria-label="Hokkaido Group highlights">
          <div className="hg-stat">
            <strong>1992</strong>
            <span>Hospitality roots</span>
          </div>
          <div className="hg-stat">
            <strong>06+</strong>
            <span>Restaurants</span>
          </div>
          <div className="hg-stat">
            <strong>03</strong>
            <span>Guest formats</span>
          </div>
        </div>
      </div>
    </section>
  )
}
