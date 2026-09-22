import { Link } from 'react-router-dom'
import {
  BedDouble,
  ShoppingCart,
  Utensils,
  Package,
  MapPinned,
  ArrowUpRight,
  ChefHat,
} from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { ImageCarousel } from '../components/ImageCarousel'
import { FranchiseCard } from '../components/FranchiseCard'
import { businesses } from '../data/businesses'
import { editorialDrafts, franchises } from '../data/editorialContent'
import homeHeroImage from '../assets/gallery/sora/sora4.webp'
const experiences = [businesses[1], businesses[2], businesses[7], businesses[5]]
const nav = [
  { label: 'Dining', to: '/our-brands?category=Restaurant', Icon: Utensils },
  {
    label: 'Onsen & resort',
    to: '/businesses/dekkaido-farm-house',
    Icon: BedDouble,
  },
  { label: 'HOMA Nepal', to: '/mart', Icon: ShoppingCart },
  { label: 'Catering', to: '/catering', Icon: ChefHat },
  { label: 'Imports', to: '/businesses/janeichi', Icon: Package },
  { label: 'Franchises', to: '/franchises', Icon: MapPinned },
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
            {b.logo && <img src={b.logo} alt={b.name} loading="lazy" />}
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
                {b.category === 'Farm & Resort'
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
            <Link
              className="location-card"
              key={b.id}
              to={`/businesses/${b.slug}`}
            >
              <img src={b.image!} alt={b.name} loading="lazy" />
              <div className="location-card__caption">
                <span className="triangle" aria-hidden="true" />
                <h3>{b.locationSummary}</h3>
                <p>{b.name}</p>
              </div>
            </Link>
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
          <h2>Guest stories</h2>
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <p className="placeholder-copy">
            Guest experiences will be shared here.
          </p>
          <p className="content-note">
            Verified testimonials are being prepared.
          </p>
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
      <section className="franchise-home editorial-section corporate-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Grow with Hokkaido</p>
            <h2>Franchises</h2>
          </div>
          <Link className="editorial-button" to="/franchises">
            Explore franchises <ArrowUpRight size={16} />
          </Link>
        </div>
        {franchises.length > 0 ? (
          <div className="journal-grid">
            {franchises.map((f) => (
              <FranchiseCard key={f.websiteUrl} franchise={f} />
            ))}
          </div>
        ) : (
          <p>
            For partnership conversations, get in touch with Hokkaido Group.
          </p>
        )}
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
