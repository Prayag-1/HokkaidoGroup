import type { Business } from '../data/businesses'
import { getBusinessImagePosition } from '../data/businesses'
import { useState } from 'react'

// Keep logo artwork at its native ratio inside a stable photographic frame.
export function BusinessImage({ business, className = '', logo = false, eager = false }: {
  business: Business
  className?: string
  logo?: boolean
  eager?: boolean
}) {
  const src = logo ? business.logo : business.image ?? business.logo
  const [activeSrc, setActiveSrc] = useState(src)
  const [failedSources, setFailedSources] = useState<string[]>([])
  const [unavailable, setUnavailable] = useState(false)
  const isLogo = activeSrc === business.logo
  const fallbackSources = [...new Set([business.image, ...business.galleryImages])]
    .filter((candidate): candidate is string => Boolean(candidate && candidate !== business.logo && candidate !== src))

  const useFallback = () => {
    if (!activeSrc) return
    const tried = [...failedSources, activeSrc]
    const fallback = fallbackSources.find((candidate) => !tried.includes(candidate))
    setFailedSources(tried)
    if (fallback) setActiveSrc(fallback)
    else setUnavailable(true)
  }

  return (
    <div className={`business-image ${isLogo ? 'business-image--logo' : ''} ${unavailable ? 'business-image--unavailable' : ''} ${className}`}>
      {activeSrc && !unavailable && <img src={activeSrc} alt={`${business.name}${isLogo ? ' logo' : ' photo'}`}
        loading={eager ? 'eager' : 'lazy'}
        onError={useFallback}
        style={isLogo
          ? { aspectRatio: business.logoAspectRatio ?? '1', maxWidth: `min(100%, ${business.logoMaxWidth ?? 320}px)` }
          : { objectPosition: getBusinessImagePosition(business, activeSrc) }} />}
    </div>
  )
}
