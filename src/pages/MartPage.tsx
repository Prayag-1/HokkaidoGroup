import { SiteFooter } from '../components/SiteFooter'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { BusinessImage } from '../components/BusinessImage'
import { LocationSpotlight } from '../components/LocationSpotlight'
import { getBusinessBySlug } from '../data/businesses'

const homa = getBusinessBySlug('hokkaido-mart')!
// Only Kamaladi is on file. Add confirmed branches to businesses.ts, not here.
const outlets = [homa]

export function MartPage() {
  return (
    <main id="main-content" className="editorial-page homa-page">
      <PageBreadcrumb title={homa.name} />
      <section className="split-hero">
        <div className="brand-photo-pending" aria-label="HOMA Nepal brand mark">
          <BusinessImage business={homa} eager logo />
        </div>
        <div>
          <p className="eyebrow">{homa.category}</p>
          <h1>{homa.name}</h1>
          <h2>{homa.description}</h2>
          <p>{homa.about}</p>
        </div>
      </section>
      <section className="editorial-section corporate-shell">
        <div className="section-heading"><h2>Visit HOMA Nepal</h2></div>
        {outlets.map(outlet => (
          <article className="brand-listing" key={outlet.id}>
            <div>
              <p className="eyebrow">{outlet.name}</p>
              <h3>{outlet.locationSummary}</h3>
              <p>{outlet.description}</p>
              {outlet.websiteUrl ? (
                <a className="editorial-button" href={outlet.websiteUrl} target="_blank" rel="noopener noreferrer">Learn more</a>
              ) : (
                <a className="editorial-button" href="#homa-location">Location & contact</a>
              )}
              {/* Add the confirmed official URL to businesses.ts when supplied. */}
            </div>
          </article>
        ))}
      </section>
      <section className="editorial-section corporate-shell">
        <p className="eyebrow">Get in touch</p>
        <h2>Discover HOMA Nepal</h2>
        <a className="editorial-button" href={`mailto:${homa.email}?subject=HOMA%20Nepal%20inquiry`}>Inquiry Now</a>
        <p><a href={`tel:${homa.phone}`}>{homa.phone}</a></p>
      </section>
      <section id="homa-location" className="editorial-section corporate-shell brand-location">
        <LocationSpotlight businesses={outlets} eyebrow="Find us" title="HOMA Nepal location" description={homa.address ?? ''} />
      </section>
      <SiteFooter />
    </main>
  )
}
