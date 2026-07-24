const milestones = [
  ['1992', 'Nepal meets its own Japanese comfort dining tradition in the heart of Kathmandu.'],
  ['06+ Restaurants', 'The group grows one venue at a time, carrying a consistent standard across formats.'],
]

const commitments = [
  ['Franchise', 'Opening the door for local operators to grow with a trusted hospitality system.'],
  ['Community', 'Using food, service, and shared spaces to bring people together across the valley.'],
  ['Hotels', 'Extending the group culture from restaurants into comfortable guest stays.'],
]

const values = [
  ['Mission', 'To provide exceptional hospitality experiences through warmth, detail, and reliable service.'],
  ['Vision', "To become one of Nepal hospitality's most trusted groups through quality, inclusion, and sustainable growth."],
  ['Community Values', 'Inclusivity, integrity, collaboration, and giving back guide the way each venue welcomes guests.'],
]

export function FarmSection() {
  return (
    <section className="hg-section hg-section--soft hg-legacy">
      <div className="hg-shell">
        <div className="hg-legacy__map">
          <div className="hg-map-shape" aria-hidden="true">Nepal</div>
          {milestones.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="hg-grid hg-grid--3">
          {commitments.map(([title, copy], index) => (
            <article key={title} className="hg-card hg-image-card">
              <img src={`/gallery/${index === 0 ? 'people-02' : index === 1 ? 'people-03' : 'interior-03'}.svg`} alt="" loading="lazy" />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="hg-value-grid">
          {values.map(([title, copy]) => (
            <article key={title} className="hg-value-card">
              <p className="hg-eyebrow">{title}</p>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
