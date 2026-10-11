import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, MapPin, Utensils } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { LocationSpotlight } from '../components/LocationSpotlight'
import { businesses, outletBusinesses, type Business } from '../data/businesses'

function cityOf(business: Business) {
  const parts = (business.address ?? '').split(',').map((part) => part.trim())
  return parts.find((part) => ['Kathmandu', 'Lalitpur', 'Pokhara'].includes(part)) ?? ''
}

function neighbourhoodOf(business: Business) {
  const parts = (business.address ?? '').split(',').map((part) => part.trim())
  const cityIndex = parts.findIndex((part) => ['Kathmandu', 'Lalitpur', 'Pokhara'].includes(part))
  return cityIndex > 0 ? parts[cityIndex - 1] : ''
}

function directionsUrl(business: Business) {
  const query = business.mapQuery ?? business.address
  return query ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}` : null
}

export function BusinessDirectoryPage() {
  const [city, setCity] = useState('')
  const [neighbourhood, setNeighbourhood] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const showMap = searchParams.get('view') === 'map'
  const [filtersOpen, setFiltersOpen] = useState(true)
  useEffect(() => {
    const media = window.matchMedia('(min-width: 48rem)')
    const keepDesktopFiltersOpen = (event: MediaQueryListEvent) => {
      if (event.matches) setFiltersOpen(true)
    }
    media.addEventListener('change', keepDesktopFiltersOpen)
    return () => media.removeEventListener('change', keepDesktopFiltersOpen)
  }, [])
  const cities = useMemo(() => [...new Set(outletBusinesses.map(cityOf).filter(Boolean))].sort(), [])
  const availableRestaurants = outletBusinesses.filter((business) => business.category === 'Restaurant')
  const neighbourhoods = [...new Set(availableRestaurants.filter((business) => !city || cityOf(business) === city).map(neighbourhoodOf).filter(Boolean))].sort()
  const restaurants = availableRestaurants.filter((business) => (!city || cityOf(business) === city) && (!neighbourhood || neighbourhoodOf(business) === neighbourhood))
  const beyondDining = ['hokkaido-mart', 'janeichi', 'dekkaido-farm-house'].map((id) => businesses.find((business) => business.id === id)).filter((business): business is Business => Boolean(business))
  const toggleMap = () => {
    const nextParams = new URLSearchParams(searchParams)
    if (showMap) nextParams.delete('view')
    else nextParams.set('view', 'map')
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <main id="main-content" className="editorial-page restaurant-directory-page">
      <PageBreadcrumb title="Our Restaurants" />
      <header className="corporate-shell restaurant-directory__header">
        <p className="eyebrow">Hokkaido Group</p>
        <h1>Our Restaurants</h1>
        <p>Find a Hokkaido restaurant, explore its menu when available, and plan your visit.</p>
      </header>
      <section className="corporate-shell restaurant-directory" aria-label="Restaurant directory">
        <details className="restaurant-directory__filter-disclosure" open={filtersOpen} onToggle={(event) => setFiltersOpen(event.currentTarget.open)}>
          <summary>Filter restaurants <ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="restaurant-directory__filters">
            <label>City<select value={city} onChange={(event) => { setCity(event.target.value); setNeighbourhood('') }}><option value="">All cities</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Neighbourhood<select value={neighbourhood} onChange={(event) => setNeighbourhood(event.target.value)}><option value="">All neighbourhoods</option>{neighbourhoods.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button type="button" className="corporate-button btn-secondary" onClick={toggleMap} aria-pressed={showMap}>{showMap ? 'Hide map' : 'Map view'}</button>
          </div>
        </details>
        <div className="restaurant-directory__grid">
          {restaurants.map((business) => {
            const directions = directionsUrl(business)
            return <article className="restaurant-directory__card" key={business.id}>
              <Link to={`/businesses/${business.slug}`} className="restaurant-directory__photo" aria-label={`View ${business.name}`}>
                <img src={business.image ?? ''} alt={`${business.name} restaurant`} loading="lazy" />
              </Link>
              <div className="restaurant-directory__body">
                <h2><Link to={`/businesses/${business.slug}`}>{business.name}</Link></h2>
                <p className="restaurant-directory__location"><MapPin size={17} aria-hidden="true" />{business.locationSummary ?? business.address}</p>
                {business.description && <p>{business.description}</p>}
                <div className="restaurant-directory__actions">
                  {directions && <a className="corporate-button btn-primary" href={directions} target="_blank" rel="noopener noreferrer">Directions</a>}
                  {business.menu?.pdfUrl && <a className="corporate-button btn-secondary" href={business.menu.pdfUrl} target="_blank" rel="noopener noreferrer">Menu</a>}
                  {!business.menu?.pdfUrl && business.menu?.sections?.length ? <Link className="corporate-button btn-secondary" to={`/businesses/${business.slug}#menu`}>Menu</Link> : null}
                </div>
              </div>
            </article>
          })}
        </div>
        {restaurants.length === 0 && <p>No restaurants match those filters.</p>}
        {showMap && <div className="restaurant-directory__map"><LocationSpotlight businesses={restaurants} eyebrow="Map" title="Restaurant locations" description="Explore restaurant locations from the address information on file." /></div>}
      </section>
      <section className="corporate-shell beyond-dining" aria-labelledby="beyond-dining-title">
        <p className="eyebrow">More from Hokkaido Group</p><h2 id="beyond-dining-title">Beyond Dining</h2>
        <div className="beyond-dining__list">{beyondDining.map((business) => <Link key={business.id} to={business.id === 'hokkaido-mart' ? '/mart' : `/businesses/${business.slug}`}>
          <span className="beyond-dining__logo">
            {business.logo ? <img src={business.logo} alt="" width="48" height="48" loading="lazy" /> : <Utensils size={18} aria-hidden="true" />}
          </span>
          <span>{business.name}</span>
          <span>{business.locationSummary ?? business.address}</span>
        </Link>)}</div>
      </section>
      <SiteFooter />
    </main>
  )
}
