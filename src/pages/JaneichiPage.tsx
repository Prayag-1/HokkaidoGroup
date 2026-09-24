import type { Business } from '../data/businesses'
import { BusinessImage } from '../components/BusinessImage'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { SiteFooter } from '../components/SiteFooter'

export function JaneichiPage({ business }: { business: Business }) {
  return (
    <main id="main-content" className="editorial-page janeichi-page">
      <PageBreadcrumb title={business.name} />
      <section className="corporate-shell janeichi-banner" aria-label="Janeichi Business">
        <div className="brand-photo-pending">
          <BusinessImage business={business} eager />
        </div>
      </section>
      <section className="editorial-section corporate-shell janeichi-intro">
        <p className="eyebrow">{business.category}</p>
        <h1>{business.name}</h1>
        <p className="janeichi-subtitle">{business.description}</p>
      </section>
      <section className="editorial-section corporate-shell mart-story janeichi-profile">
        <div>
          <h2>From Japan to Nepal</h2>
          <p>{business.about}</p>
          <aside className="brand-callout" aria-label="Janeichi at a glance">{business.description}</aside>
          <p>{business.address}</p>
          {business.phone && <a href={`tel:${business.phone}`}>{business.phone}</a>}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
