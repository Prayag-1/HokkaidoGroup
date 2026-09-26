import type { Business } from '../data/businesses'
import { getBusinessImagePosition } from '../data/businesses'
import { handleBusinessImageError } from '../lib/businessImages'

export function OutletPhotos({ business }: { business: Business }) {
  const photos = business.galleryImages.filter(src => src !== business.image && src !== business.logo)
  if (!photos.length) return null
  return (
    <div className="outlet-photos" role="region" tabIndex={0} aria-label={`${business.name} photos — scroll for more`}>
      {photos.map((src, index) => <img key={src} src={src} alt={`${business.name} gallery photo ${index + 1}`} loading="lazy" style={{ objectPosition: getBusinessImagePosition(business, src) }} onError={(event) => handleBusinessImageError(event, business)} />)}
    </div>
  )
}
