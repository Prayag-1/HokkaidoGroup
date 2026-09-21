import { useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
export function ImageCarousel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const rail = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ start: true, end: false })
  const update = () => {
    const el = rail.current
    if (el)
      setPosition({
        start: el.scrollLeft < 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      })
  }
  const move = (direction: number) => {
    const el = rail.current
    if (el)
      el.scrollBy({
        left:
          direction *
            (el.firstElementChild?.getBoundingClientRect().width ??
              el.clientWidth) +
          direction * 24,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
  }
  return (
    <section
      className="editorial-section corporate-shell"
      aria-label={title}
      aria-roledescription="carousel"
    >
      <div className="section-heading">
        <h2>{title}</h2>
        <div className="carousel-controls">
          <button
            aria-label={`Previous ${title.toLowerCase()}`}
            disabled={position.start}
            onClick={() => move(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            aria-label={`Next ${title.toLowerCase()}`}
            disabled={position.end}
            onClick={() => move(1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="image-carousel"
        tabIndex={0}
        aria-label={`${title} slides; use arrow keys or swipe`}
        onScroll={update}
        onKeyDown={(event) => {
          if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault()
            move(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
      >
        {children}
      </div>
    </section>
  )
}
