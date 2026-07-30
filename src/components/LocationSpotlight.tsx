import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from 'lucide-react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import type { Business } from '../data/businesses'

type Coordinates = {
  lat: number
  lng: number
}

type SpotlightBusiness = Business & {
  spotlightCoordinates: Coordinates | null
  mapHref: string | null
  mapEmbedSrc: string | null
}

type LocationSpotlightProps = {
  businesses: Business[]
  eyebrow?: string
  title?: string
  description?: string
}

function isValidCoordinates(coordinates: Coordinates | null): coordinates is Coordinates {
  return Boolean(
    coordinates &&
      Number.isFinite(coordinates.lat) &&
      Number.isFinite(coordinates.lng) &&
      Math.abs(coordinates.lat) <= 90 &&
      Math.abs(coordinates.lng) <= 180
  )
}

function MapCenter({ coordinates }: { coordinates: Coordinates }) {
  const map = useMap()

  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lng], 15, { animate: true })
  }, [coordinates, map])

  return null
}

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

function extractCoordinatesFromText(value: string | null): Coordinates | null {
  if (!value) {
    return null
  }

  const decodedValue = decodeURIComponent(value)
  const patterns = [
    /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /(?:[?&](?:q|query|ll)=)(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/,
  ]

  for (const pattern of patterns) {
    const match = decodedValue.match(pattern)
    if (!match) {
      continue
    }

    const coordinates = {
      lat: Number(match[1]),
      lng: Number(match[2]),
    }

    if (isValidCoordinates(coordinates)) {
      return coordinates
    }
  }

  return null
}

function getQueryFromGoogleUrl(value: string) {
  try {
    const url = new URL(value)
    const query = url.searchParams.get('query') ?? url.searchParams.get('q') ?? url.searchParams.get('ll')

    if (query) {
      return query
    }

    const placeMatch = decodeURIComponent(url.pathname).match(/\/place\/([^/]+)/)
    return placeMatch ? placeMatch[1].replace(/\+/g, ' ') : null
  } catch {
    return null
  }
}

function getMapSourceQuery(mapQuery: string | null) {
  if (!mapQuery) {
    return null
  }

  const trimmedQuery = mapQuery.trim()

  if (!trimmedQuery) {
    return null
  }

  return isHttpUrl(trimmedQuery) ? getQueryFromGoogleUrl(trimmedQuery) ?? trimmedQuery : trimmedQuery
}

function buildGoogleMapsHref(business: Business, coordinates: Coordinates | null) {
  const source = business.mapQuery?.trim()

  if (source && isHttpUrl(source)) {
    return source
  }

  if (source) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(source)}`
  }

  if (coordinates) {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
  }

  return null
}

function buildGoogleMapsEmbedSrc(mapQuery: string | null, coordinates: Coordinates | null) {
  const query = coordinates ? `${coordinates.lat},${coordinates.lng}` : getMapSourceQuery(mapQuery)

  return query ? `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed` : null
}

function buildSpotlightBusiness(business: Business): SpotlightBusiness {
  const spotlightCoordinates = isValidCoordinates(business.coordinates)
    ? business.coordinates
    : extractCoordinatesFromText(business.mapQuery)

  return {
    ...business,
    spotlightCoordinates,
    mapHref: buildGoogleMapsHref(business, spotlightCoordinates),
    mapEmbedSrc: buildGoogleMapsEmbedSrc(business.mapQuery, spotlightCoordinates),
  }
}

function getFallbackLabel(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 4)
    .toUpperCase()
}

export function LocationSpotlight({
  businesses,
  eyebrow = 'Locations',
  title = 'Mapped places, ready for verified coordinates.',
  description = 'Only businesses with client-approved latitude and longitude appear here.',
}: LocationSpotlightProps) {
  const mappedBusinesses = useMemo(
    () => businesses.map(buildSpotlightBusiness).filter((business) => business.spotlightCoordinates || business.mapEmbedSrc),
    [businesses]
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const safeActiveIndex = mappedBusinesses.length > 0 ? activeIndex % mappedBusinesses.length : 0
  const visibleCount = Math.min(mappedBusinesses.length, 3)
  const visibleBusinesses = Array.from({ length: visibleCount }, (_, index) => mappedBusinesses[(safeActiveIndex + index) % mappedBusinesses.length])

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? mappedBusinesses.length - 1 : current - 1))
  }

  const showNext = () => {
    setActiveIndex((current) => (current === mappedBusinesses.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="location-spotlight" aria-live="polite">
      <div className="section-header corporate-section__header">
        <p className="section-header__eyebrow">{eyebrow}</p>
        <h2 className="section-header__heading">{title}</h2>
        <p className="section-header__description">{description}</p>
      </div>

      {mappedBusinesses.length > 0 ? (
        <div className="location-spotlight__carousel">
          <button type="button" className="location-spotlight__arrow" onClick={showPrevious} aria-label="Previous location">
            <ChevronLeft aria-hidden="true" size={24} />
          </button>

          <div className="location-spotlight__cards">
            {visibleBusinesses.map((business) => (
              <article key={business.id} className="location-spotlight__card">
                <div className="location-spotlight__map" aria-label={`${business.name} map`}>
                  {business.spotlightCoordinates ? (
                    <MapContainer
                      center={[business.spotlightCoordinates.lat, business.spotlightCoordinates.lng]}
                      zoom={15}
                      scrollWheelZoom={false}
                      dragging={false}
                      zoomControl={false}
                      attributionControl
                    >
                      <MapCenter coordinates={business.spotlightCoordinates} />
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </MapContainer>
                  ) : business.mapEmbedSrc ? (
                    <iframe
                      src={business.mapEmbedSrc}
                      title={`${business.name} Google Maps view`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : null}
                  <div className="location-spotlight__photo">
                    {business.image || business.logo ? (
                      <img
                        src={(business.image ?? business.logo) as string}
                        alt={business.logo && !business.image ? `${business.name} logo` : `${business.name} venue photo`}
                        loading="lazy"
                        sizes="10rem"
                      />
                    ) : (
                      <span aria-hidden="true">{getFallbackLabel(business.name)}</span>
                    )}
                  </div>
                  <span className="location-spotlight__pin" aria-hidden="true" />
                </div>
                <div className="location-spotlight__caption">
                  <p>
                    <MapPin aria-hidden="true" size={16} />
                    {business.locationSummary ?? business.address ?? 'Location details coming soon'}
                  </p>
                  <h3>{business.name}</h3>
                  {business.mapHref ? (
                    <a href={business.mapHref} target="_blank" rel="noreferrer">
                      Open Google Maps
                      <ExternalLink aria-hidden="true" size={14} />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <button type="button" className="location-spotlight__arrow" onClick={showNext} aria-label="Next location">
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>
      ) : (
        <article className="location-spotlight__empty-card">
          <div className="location-spotlight__empty-map" aria-hidden="true" />
          <div className="location-spotlight__caption">
            <p>
              <MapPin aria-hidden="true" size={16} />
              Location links pending
            </p>
            <h3>Maps will open when coordinates are approved.</h3>
          </div>
        </article>
      )}

      {mappedBusinesses.length > 1 ? (
        <div className="location-spotlight__dots" role="tablist" aria-label="Location slides">
          {mappedBusinesses.map((business, index) => (
            <button
              key={business.id}
              type="button"
              className={index === safeActiveIndex ? 'location-spotlight__dot location-spotlight__dot--active' : 'location-spotlight__dot'}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${business.name}`}
              aria-selected={index === safeActiveIndex}
              role="tab"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
