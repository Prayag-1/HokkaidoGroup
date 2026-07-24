const pillars = [
  ['Restaurants', '#brands'],
  ['Hotels', '#hotels'],
  ['Catering', '/booking'],
  ['Imports', '/contact'],
  ['Franchise', '/contact'],
] as const

export function OriginStory() {
  return (
    <section id="story" className="hg-section hg-statement">
      <div className="hg-shell">
        <div className="hg-mark" aria-hidden="true">HG</div>
        <h2>
          Hokkaido remains committed to warm hospitality, consistent food, attentive service, and welcoming spaces that
          guests remember long after the meal.
        </h2>
        <nav className="hg-category-nav" aria-label="Hospitality categories">
          {pillars.map(([title, href]) => (
            <a key={title} href={href}>
              {title}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
