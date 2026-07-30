import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../lib/cn'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  once?: boolean
  rootMargin?: string
}

export function ScrollReveal({
  children,
  className,
  once = true,
  rootMargin = '0px 0px -12% 0px',
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(Boolean(reduceMotion))

  useEffect(() => {
    const node = ref.current
    let observer: IntersectionObserver | null = null

    if (!node) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      if (reduceMotion || !('IntersectionObserver' in window)) {
        setIsVisible(true)
        return
      }

      const rect = node.getBoundingClientRect()

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true)
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)

            if (once) {
              observer?.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        },
        { rootMargin, threshold: 0.16 },
      )

      observer.observe(node)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [once, reduceMotion, rootMargin])

  return (
    <div
      ref={ref}
      className={cn('corporate-scroll-reveal', isVisible ? 'corporate-scroll-reveal--visible' : '', className)}
    >
      {children}
    </div>
  )
}
