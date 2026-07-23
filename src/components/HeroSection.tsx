export function HeroSection() {
  return (
    <section className="hg-hero">
      <div className="hg-shell hg-hero__inner">
        <div className="hg-hero__copy">
          <p className="hg-eyebrow">Est. Kathmandu, Nepal</p>
          <h1 className="hg-title">
            A quiet house of hospitality, <em>shaped by patience.</em>
          </h1>
          <p className="hg-lead">
            Hokkaido Group is a family of Japanese restaurants, cafes, catering, and guest experiences rooted in
            Kathmandu, where omotenashi meets the warmth of Nepal.
          </p>

          <div className="hg-actions">
            <a href="/booking" className="hg-button hg-button--light">
              Reserve a table
            </a>
            <a href="#brands" className="hg-button hg-button--outline-light">
              Our brands
            </a>
          </div>
        </div>

        <div className="hg-stats" aria-label="Hokkaido Group highlights">
          <div className="hg-stat">
            <strong>06</strong>
            <span>Venues</span>
          </div>
          <div className="hg-stat">
            <strong>12</strong>
            <span>Years of craft</span>
          </div>
          <div className="hg-stat">
            <strong>03</strong>
            <span>Cities across Nepal</span>
          </div>
        </div>
      </div>
    </section>
  )
}
