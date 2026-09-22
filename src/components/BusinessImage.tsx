import type { Business } from '../data/businesses'

// Keep logo artwork at its native ratio inside a stable photographic frame.
export function BusinessImage({ business, className = '', logo = false, eager = false }: {
  business: Business
  className?: string
  logo?: boolean
  eager?: boolean
}) {
  const src = logo ? business.logo : business.image ?? business.logo
  const isLogo = src === business.logo
  return (
    <div className={`business-image ${isLogo ? 'business-image--logo' : ''} ${className}`}>
      {src && <img src={src} alt={`${business.name}${isLogo ? ' logo' : ' photo'}`}
        loading={eager ? 'eager' : 'lazy'}
        style={isLogo ? { aspectRatio: business.logoAspectRatio ?? '1', maxWidth: `min(100%, ${business.logoMaxWidth ?? 320}px)` } : undefined} />}
    </div>
  )
}
