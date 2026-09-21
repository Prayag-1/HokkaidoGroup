import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { businesses } from '../data/businesses'
const mart = businesses.find((b) => b.id === 'hokkaido-mart')!
export function MartPage() {
  return (
    <main id="main-content" className="editorial-page">
      <PageBreadcrumb title="HOMA Nepal · Mart" />
      <section className="split-hero">
        <div className="media-placeholder">
          <img src={mart.logo!} alt="HOMA Nepal" />
          <span>Store photography coming soon</span>
        </div>
        <div>
          <p className="eyebrow">Japanese retail in Kathmandu</p>
          <h1>
            HOMA
            <br />
            Nepal
          </h1>
          <h2>Everyday discoveries from Japan.</h2>
          <p>{mart.about}</p>
          <a
            className="editorial-button"
            href={`mailto:${mart.email}?subject=HOMA%20Nepal%20inquiry`}
          >
            Inquiry Now
          </a>
        </div>
      </section>
      <section className="editorial-section corporate-shell mart-story">
        <div>
          <h2>A little Japan, closer to home.</h2>
          <p>
            {mart.description} Visit the Kamaladi shop to explore the current
            selection, or contact the team about availability before making a
            special trip.
          </p>
          <p>
            From pantry ingredients and kitchenware to skincare and household
            essentials, HOMA Nepal brings the group's Japanese retail selection
            together in one place. For business sourcing and import
            conversations, our Janeichi division can help you find the right
            contact.
          </p>
          <blockquote>Japanese products for everyday life in Nepal.</blockquote>
          <p>
            For product inquiries, call{' '}
            <a href={`tel:${mart.phone}`}>{mart.phone}</a> or email{' '}
            <a href={`mailto:${mart.email}`}>{mart.email}</a>.
          </p>
          <Link className="text-link" to="/businesses/janeichi">
            Explore Japanese imports
          </Link>
        </div>
        <div className="media-placeholder media-placeholder--support">
          <span>HOMA product collection</span>
          <small>Product photography coming soon</small>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
