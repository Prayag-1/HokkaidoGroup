import { useState, type KeyboardEvent, type TouchEvent } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import type { Business } from '../data/businesses'

type FeaturedOutletsCarouselProps = {
  businesses: Business[]
}

export function FeaturedOutletsCarousel({ businesses }: FeaturedOutletsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()
  const activeBusiness = businesses[activeIndex]

  if (businesses.length === 0) {
    return null
  }

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + businesses.length) % businesses.length)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    }
  }

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0]?.clientX ?? null)
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchEnd = event.changedTouches[0]?.clientX

    if (touchStart === null || touchEnd === undefined) {
      return
    }

    const distance = touchEnd - touchStart
    setTouchStart(null)

    if (Math.abs(distance) < 40) {
      return
    }

    move(distance < 0 ? 1 : -1)
  }

  const getPosition = (index: number) => {
    const offset = (index - activeIndex + businesses.length) % businesses.length

    if (offset === 0) return 'center'
    if (offset === 1) return 'next'
    if (offset === businesses.length - 1) return 'previous'
    return 'hidden'
  }

  return (
    <div
      className={`featured-outlets${reduceMotion ? ' featured-outlets--reduced-motion' : ''}`}
      aria-label="Featured outlets carousel"
      aria-roledescription="carousel"
      aria-live="polite"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="featured-outlets__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {businesses.map((business, index) => {
          const cardImage = business.image ?? business.logo
          const location = business.locationSummary ?? business.address
          const position = getPosition(index)

          return (
            <article
              key={business.id}
              className="featured-outlets__card"
              data-position={position}
              aria-hidden={position === 'hidden' ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
            >
              {cardImage ? (
                <img
                  src={cardImage}
                  alt={business.logo && cardImage === business.logo ? `${business.name} logo` : `${business.name} venue photo`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 40rem) 86vw, 28rem"
                />
              ) : null}
              <div className="featured-outlets__card-copy">
                <p>{business.category === 'Restaurant' ? 'Dining' : business.category}</p>
                <h3>{business.name}</h3>
                {location ? (
                  <span className="featured-outlets__location">
                    <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                    {location}
                  </span>
                ) : null}
                {business.description ? <span className="featured-outlets__description">{business.description}</span> : null}
                <Link to={`/businesses/${business.slug}`} onClick={(event) => event.stopPropagation()}>
                  View location
                  <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      <div className="featured-outlets__controls">
        <button type="button" onClick={() => move(-1)} aria-label={`Show previous outlet before ${activeBusiness.name}`}>
          <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <p aria-label={`Showing ${activeIndex + 1} of ${businesses.length}`}>{String(activeIndex + 1).padStart(2, '0')} / {String(businesses.length).padStart(2, '0')}</p>
        <button type="button" onClick={() => move(1)} aria-label={`Show next outlet after ${activeBusiness.name}`}>
          <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
