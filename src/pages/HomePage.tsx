import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BedDouble, ChefHat, Package, ShoppingCart, Utensils, UsersRound } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { ImageCarousel } from '../components/ImageCarousel'
import { businesses, getBusinessImagePosition, outletBusinesses } from '../data/businesses'
import { hokkaidoVisionParagraphs } from '../data/corporateContent'
import { verifiedHomeUpdates } from '../data/homeUpdates'
import { testimonials } from '../data/testimonials'
import { handleBusinessImageError } from '../lib/businessImages'
import homeHeroImage from '../assets/gallery/sora/sora4.webp'

const restaurants = outletBusinesses.filter((business) => business.category === 'Restaurant')
const beyondDining = businesses.filter((business) => business.category !== 'Restaurant')
const experienceBusiness = businesses.find((business) => business.slug === 'hokkaido-sora')
const homeNav = [
  { label: 'Our Restaurants', to: '/businesses', Icon: Utensils },
  { label: 'Stay With Us', to: '/businesses/dekkaido-farm-house', Icon: BedDouble },
  { label: 'Japanese Lifestyle', to: '/mart', Icon: ShoppingCart },
  { label: 'Catering & Events', to: '/catering', Icon: ChefHat },
  { label: 'Imports & Distribution', to: '/businesses/janeichi', Icon: Package },
  { label: 'Hokkaido Privileges', to: '/membership', Icon: UsersRound },
]

export function HomePage() {
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 47.99rem), (max-width: 56rem) and (max-height: 30rem) and (orientation: landscape)').matches)
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 0)
  const animateHero = isMobile && !reduceMotion

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 47.99rem), (max-width: 56rem) and (max-height: 30rem) and (orientation: landscape)')
    const updateMobileLayout = () => setIsMobile(mobileQuery.matches)
    updateMobileLayout()
    mobileQuery.addEventListener('change', updateMobileLayout)
    return () => mobileQuery.removeEventListener('change', updateMobileLayout)
  }, [])

  useEffect(() => {
    const hideCue = () => setHasScrolled(true)
    window.addEventListener('scroll', hideCue, { passive: true, once: true })
    return () => window.removeEventListener('scroll', hideCue)
  }, [])

  const introMotion = (delay: number) => animateHero
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.36, delay, ease: 'easeOut' as const },
      }
    : {}

  const heroImageProps = {
    className: 'home-banner__image',
    src: homeHeroImage,
    alt: 'The dining room at Hokkaido Sora',
    width: 816,
    height: 1020,
    fetchPriority: 'high' as const,
    loading: 'eager' as const,
    decoding: 'async' as const,
  }

  return (
    <main id="main-content" className="editorial-page">
      <section className="home-banner" aria-label="Welcome to Hokkaido Group">
        {animateHero ? (
          <motion.img
            {...heroImageProps}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        ) : <img {...heroImageProps} />}
        <div className="home-banner__copy corporate-shell">
          <motion.p className="home-banner__eyebrow" {...introMotion(0)}>Japanese hospitality</motion.p>
          <motion.h1 {...introMotion(0.12)}>A Taste of Japan, in the Heart of Nepal</motion.h1>
          <motion.div className="home-banner__support" {...introMotion(0.27)}>
            <span className="home-banner__rule" aria-hidden="true" />
            <p>Authentic taste, culture, and lifestyle of Japan.</p>
          </motion.div>
          <motion.div className="home-banner__actions" {...introMotion(0.42)}>
            <Link className="home-banner__cta btn-primary" to="/businesses">
              Explore Restaurants <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
        <nav className="home-banner__nav" aria-label="Explore Hokkaido">
          {homeNav.map(({ label, to, Icon }) => (
            <Link key={to} to={to}>
              <Icon size={32} strokeWidth={1.2} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <span
          className={`home-banner__scroll-cue${hasScrolled ? ' home-banner__scroll-cue--hidden' : ''}`}
          aria-hidden="true"
        />
      </section>

      <ImageCarousel title="Discover Our Restaurants">
        {restaurants.map((business) => (
          <Link
            key={business.id}
            to={`/businesses/${business.slug}`}
            className="experience-card"
          >
            <img
              src={business.image ?? ''}
              alt={`${business.name} restaurant`}
              loading="lazy"
              style={{ objectPosition: business.image ? getBusinessImagePosition(business, business.image) : 'center' }}
              onError={(event) => handleBusinessImageError(event, business, '.experience-card')}
            />
            <div>
              <span>{business.locationSummary ?? business.address}</span>
              <h3>{business.name}</h3>
            </div>
          </Link>
        ))}
      </ImageCarousel>

      <section className="editorial-section hokkaido-experience corporate-shell">
        <div>
          <p className="eyebrow">Japanese hospitality in Nepal</p>
          <h2>The Hokkaido Experience</h2>
          <p>{hokkaidoVisionParagraphs[1]}</p>
          <Link className="editorial-button btn-primary" to="/about-us">
            About Hokkaido Group <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        {experienceBusiness?.image ? (
          <img
            src={experienceBusiness.image}
            alt={`${experienceBusiness.name} dining room`}
            loading="lazy"
            style={{ objectPosition: getBusinessImagePosition(experienceBusiness, experienceBusiness.image) }}
          />
        ) : null}
      </section>

      <section className="our-story-band">
        <div className="corporate-shell">
          <h2>Our Story</h2>
          {/* Client-supplied milestone wording: since 2018. */}
          <p>{hokkaidoVisionParagraphs[0].split(' Since opening its first restaurant in ')[0]} Since 2018.</p>
          <Link className="editorial-button btn-primary" to="/about-us">
            Read Our Story <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="editorial-section corporate-shell beyond-dining" aria-labelledby="home-beyond-dining-title">
        <p className="eyebrow">Explore more of Hokkaido Group</p>
        <h2 id="home-beyond-dining-title">Beyond Dining</h2>
        <div className="home-beyond-dining__list">
          {beyondDining.map((business) => (
            <Link key={business.id} to={business.id === 'hokkaido-mart' ? '/mart' : `/businesses/${business.slug}`}>
              <h3>{business.name}</h3>
              {business.locationSummary || business.address ? <p>{business.locationSummary ?? business.address}</p> : null}
              {business.description ? <p>{business.description}</p> : null}
            </Link>
          ))}
        </div>
      </section>

      {verifiedHomeUpdates.length > 0 ? (
        <section className="editorial-section home-updates" aria-labelledby="home-updates-title">
          <div className="corporate-shell">
            <p className="eyebrow">News and updates</p>
            <h2 id="home-updates-title">What’s New at Hokkaido</h2>
            <div className="home-updates__grid">
              {verifiedHomeUpdates.map((item) => (
                <article key={`${item.title}-${item.date ?? ''}`}>
                  <h3>{item.title}</h3>
                  {item.date ? <p>{item.date}</p> : null}
                  {item.summary ? <p>{item.summary}</p> : null}
                  {item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {testimonials.length > 0 ? (
        <section className="editorial-section testimonial-section" aria-labelledby="google-reviews-title">
          <div className="corporate-shell">
            <h2 id="google-reviews-title">What Our Customers Say</h2>
            <div className="reviews-summary">
              <div className="reviews-summary__brand">
                <span className="google-wordmark" aria-label="Google">
                  <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                </span>
                <strong>Reviews</strong>
              </div>
              <p>Guest feedback from Hokkaido Group restaurants</p>
              <a href={testimonials[0].reviewUrl} target="_blank" rel="noopener noreferrer">
                Review us on Google <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="testimonial-grid">
              {testimonials.slice(0, 3).map((review) => (
                <article className="testimonial-card" key={`${review.reviewer}-${review.reviewUrl}`}>
                  <p className="testimonial-card__stars" aria-label={`${review.rating ?? 5} out of 5 stars`}>
                    {'★'.repeat(review.rating ?? 5)}
                  </p>
                  <details className="testimonial-card__review">
                    <summary><blockquote>“{review.quote}”</blockquote><span className="testimonial-card__read-more" aria-hidden="true" /></summary>
                  </details>
                  <p className="testimonial-card__byline">{review.reviewer} · {review.brand}</p>
                  <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer">
                    {review.reviewLinkLabel} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="editorial-section corporate-shell home-membership">
        <div className="section-heading">
          <div><p className="eyebrow">Stay connected</p><h2>Hokkaido Privileges</h2></div>
          <Link className="editorial-button btn-primary" to="/membership">Register your interest <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <p>Register your interest to hear when membership updates are available.</p>
      </section>

      <SiteFooter />
    </main>
  )
}
