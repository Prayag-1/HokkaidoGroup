const storyLines = [
  'Hokkaido Group is built as a hospitality house: one calm parent brand with clear paths into each restaurant, venue, booking request, and partnership inquiry.',
  'Like the reference site, the experience should feel editorial and deliberate. The guest should understand the group first, then move naturally into brands, locations, gallery, booking, and contact.',
  'Because most of the website is static, the work is in the UI system: strong typography, real-feeling hospitality imagery, thin borders, polished spacing, and forms that set the right expectation.',
]

const pillars = [
  ['Omotenashi', 'Quiet service, anticipation, and care before the guest asks.'],
  ['Kathmandu', 'A local hospitality group shaped for Nepal, not a copied template.'],
  ['Craft', 'Japanese food culture presented with patience, restraint, and detail.'],
]

export function OriginStory() {
  return (
    <section id="story" className="hg-section">
      <div className="hg-shell hg-split">
        <div>
          <p className="hg-eyebrow">About</p>
          <h2 className="hg-title">A hospitality house rooted in Kathmandu.</h2>
        </div>

        <div>
          <div className="space-y-5">
            {storyLines.map((line) => (
              <p key={line} className="hg-lead">
                {line}
              </p>
            ))}
          </div>

          <div className="hg-grid hg-grid--3">
            {pillars.map(([title, copy]) => (
              <article key={title} className="hg-card">
                <p className="hg-eyebrow">{title}</p>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
