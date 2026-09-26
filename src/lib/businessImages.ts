import type { SyntheticEvent } from 'react'
import type { Business } from '../data/businesses'
import { getBusinessImagePosition } from '../data/businesses'

export function handleBusinessImageError(
  event: SyntheticEvent<HTMLImageElement>,
  business: Business,
  removeSelector?: string,
) {
  const image = event.currentTarget
  const currentSrc = image.getAttribute('src') ?? ''
  const failedSources: string[] = JSON.parse(image.dataset.failedSources ?? '[]')
  if (currentSrc && !failedSources.includes(currentSrc)) failedSources.push(currentSrc)

  const fallback = [...new Set([business.image, ...business.galleryImages])]
    .find((candidate) => candidate && candidate !== business.logo && !failedSources.includes(candidate))

  if (fallback) {
    image.dataset.failedSources = JSON.stringify(failedSources)
    image.src = fallback
    image.style.objectPosition = getBusinessImagePosition(business, fallback)
    image.alt = `${business.name} photo`
    return
  }

  if (removeSelector) image.closest(removeSelector)?.remove()
  else image.remove()
}
