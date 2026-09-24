import { BusinessImage } from '../components/BusinessImage'
import { OutletPhotos } from '../components/OutletPhotos'
import { Link } from 'react-router-dom'
import {
  BedDouble,
  ShoppingCart,
  Utensils,
  Package,
  UsersRound,
  ArrowUpRight,
  ChefHat,
} from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { ImageCarousel } from '../components/ImageCarousel'
import { businesses } from '../data/businesses'
import { editorialDrafts } from '../data/editorialContent'
import { testimonials } from '../data/testimonials'
import homeHeroImage from '../assets/gallery/sora/sora4.webp'
const experiences = [businesses[1], businesses[2], businesses[7], businesses[5]]
const nav = [
  { label: 'Dining', to: '/our-brands?category=Restaurant', Icon: Utensils },
  {
    label: 'Rooms',
    to: '/businesses/dekkaido-farm-house',
    Icon: BedDouble,
  },
  { label: 'Skincare', to: '/mart', Icon: ShoppingCart },
  { label: 'Catering', to: '/catering', Icon: ChefHat },
  { label: 'Imports', to: '/businesses/janeichi', Icon: Package },
  { label: 'Membership', to: '/membership', Icon: UsersRound },
]
export function HomePage() {
  return (
    <main id="main-content" className="editorial-page">
      <section className="home-banner" aria-label="Welcome to Hokkaido Group">
        <img
          className="home-banner__image"
          src={homeHeroImage}
          alt="The dining room at Hokkaido Sora"
          fetchPriority="high"
        />
        <div className="home-banner__copy">
          <p>Japanese hospitality. Nepalese warmth.</p>
          <h1>
            A place to
            <br />
            come together.
          </h1>
          <Link to="/our-brands">
            Discover Hokkaido <ArrowUpRight size={18} />
          </Link>
        </div>
        <nav className="home-banner__nav" aria-label="Explore Hokkaido">
          {nav.map(({ label, to, Icon }) => (
            <Link key={to} to={to}>
              <Icon size={32} strokeWidth={1.2} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </section>
      <section className="brand-logo-strip" aria-label="Our brands">
        {businesses.map((b) => (
          <Link key={b.id} to={`/businesses/${b.slug}`} aria-label={b.name}>
            <BusinessImage business={b} logo />
          </Link>
        ))}
      </section>
      <ImageCarousel title="Hokkaido Experiences">
        {experiences.map((b) => (
          <Link
            key={b.id}
            to={`/businesses/${b.slug}`}
            className="experience-card"
          >
            <img src={b.image!} alt={b.name} loading="lazy" />
            <div>
              <span>
                {b.id === 'dekkaido-farm-house'
                  ? 'A little time for yourself'
                  : 'Around the table'}
              </span>
              <h3>{b.name}</h3>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </Link>
        ))}
      </ImageCarousel>
      <ImageCarousel title="New & Notable">
        {businesses
          .filter((b) => b.category === 'Restaurant')
          .map((b) => (
            <article key={b.id} className="location-outlet">
              <Link
                className="location-card"
                to={`/businesses/${b.slug}`}
              >
                <img src={b.image!} alt={b.name} loading="lazy" />
                <div className="location-card__caption">
                  <span className="triangle" aria-hidden="true" />
                  <h3>{b.locationSummary}</h3>
                  <p>{b.name}</p>
                </div>
              </Link>
              <OutletPhotos business={b} />
            </article>
          ))}
      </ImageCarousel>
      <section className="milestone-band">
        <div className="corporate-shell">
          <p className="eyebrow">Growing together, since 2018</p>
          <h2>
            Rooted in Japan.
            <br />
            At home in Nepal.
          </h2>
          <dl>
            <div>
              <dt>2018</dt>
              <dd>Our first restaurant</dd>
            </div>
            <div>
              <dt>{businesses.length}</dt>
              <dd>Brands in our directory</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>Cities to discover</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="editorial-section corporate-shell principles">
        <article>
          <span>01</span>
          <h2>Our Mission</h2>
          <p>
            Bring the authentic taste, culture, and lifestyle of Japan closer to
            Nepalese communities.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Our Vision</h2>
          <p>
            Grow across Nepal and become its most trusted Japanese hospitality
            group.
          </p>
        </article>
        <article>
          <span>03</span>
          <h2>Our Values</h2>
          <p>
            Authenticity, quality, consistency, innovation, and thoughtful
            Japanese hospitality.
          </p>
        </article>
      </section>
      <section className="editorial-section testimonial-section">
        <div className="corporate-shell">
          <h2>What Our Customers Say</h2>
          <div className="reviews-summary">
            <div className="reviews-summary__brand" aria-label="Google Reviews">
              <span className="google-wordmark" aria-hidden="true">
                <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
              </span>
              <strong>Reviews</strong>
            </div>
            <p>Guest feedback from Hokkaido Group restaurants</p>
            <a
              href="https://www.google.com/maps/place/@27.683036,85.306682,17z/data=!4m10!3m9!1s0x39eb190026389727:0x40b164b59e90bbb9!5m2!4m1!1i2!8m2!3d27.683036!4d85.306682!9m1!1b1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Review us on Google <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={`${testimonial.brand}-${testimonial.reviewer}`}>
                {testimonial.rating && (
                  <p className="testimonial-card__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {'★'.repeat(testimonial.rating)}
                  </p>
                )}
                {testimonial.quote.length > 180 ? (
                  <details className="testimonial-card__review">
                    <summary>
                      <blockquote>“{testimonial.quote}”</blockquote>
                      <span className="testimonial-card__read-more" aria-hidden="true" />
                    </summary>
                  </details>
                ) : (
                  <blockquote>“{testimonial.quote}”</blockquote>
                )}
                <p className="testimonial-card__byline">
                  {testimonial.reviewer} · {testimonial.brand}
                </p>
                <a href={testimonial.reviewUrl} target="_blank" rel="noopener noreferrer">
                  {testimonial.reviewLinkLabel} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="editorial-section corporate-shell">
        <div className="section-heading">
          <h2>From Hokkaido</h2>
          <span className="content-note">Journal · coming soon</span>
        </div>
        <div className="journal-grid">
          {editorialDrafts.map((item, index) => (
            <article key={item.title}>
              <img
                src={experiences[index].image!}
                alt={experiences[index].name}
                loading="lazy"
              />
              <p className="eyebrow">Story preview</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="content-note">Full story coming soon</span>
            </article>
          ))}
        </div>
      </section>
      <section className="editorial-section corporate-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Stay connected</p>
            <h2>Membership</h2>
          </div>
          <Link className="editorial-button" to="/membership">
            Membership coming soon <ArrowUpRight size={16} />
          </Link>
        </div>
        <p>Our membership program is on its way.</p>
      </section>
      <section
        className="community-banner"
        style={{ backgroundImage: `url(${businesses[7].image})` }}
      >
        <div>
          <p className="eyebrow">Hospitality & community</p>
          <blockquote>
            “Bringing the authentic taste, culture, and lifestyle of Japan
            closer to Nepalese communities.”
          </blockquote>
          <p className="content-note">
            From our vision · community programme details coming soon
          </p>
          <Link
            className="editorial-button editorial-button--light"
            to="/about-us"
          >
            Our philosophy <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
