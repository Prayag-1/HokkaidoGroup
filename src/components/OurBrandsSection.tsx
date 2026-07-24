import { Link } from 'react-router-dom'
import { brands } from '../data/brands'

const hotelBrands = [
  {
    name: 'Hokkaido Stay',
    location: 'Kathmandu',
    description: 'A calm city stay connected to dining, events, and group hospitality.',
    image: '/gallery/interior-03.svg',
  },
  {
    name: 'Mountain Retreat',
    location: 'Nagarkot',
    description: 'A quiet escape for guests looking for fresh air, simple comfort, and hosted meals.',
    image: '/gallery/farm-02.svg',
  },
]

export function OurBrandsSection() {
  return (
    <>
    <section id="brands" className="hg-section hg-section--soft">
      <div className="hg-shell">
        <div className="hg-section__intro">
          <p className="hg-eyebrow">Restaurants</p>
          <h2 className="hg-title">Hokkaido dining experiences</h2>
          <p className="hg-lead">
            From everyday ramen rooms to reservation-led counters, each restaurant carries the same promise of care,
            comfort, and consistency.
          </p>
        </div>

        <div className="hg-brand-grid">
          {brands.map((brand, index) => (
            <Link key={brand.slug} to={`/brands/${brand.slug}`} className="hg-brand-card">
              <img src={brand.image} alt="" loading="lazy" />
              <div>
                <p className="hg-eyebrow">{String(index + 1).padStart(2, '0')} / {brand.concept}</p>
                <h3>{brand.name}</h3>
                <p>{brand.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section id="hotels" className="hg-section">
      <div className="hg-shell">
        <div className="hg-section__intro hg-section__intro--left">
          <p className="hg-eyebrow">Hotels</p>
          <h2 className="hg-title">Extending the hospitality culture into stays.</h2>
        </div>

        <div className="hg-brand-grid hg-brand-grid--hotels">
          {hotelBrands.map((hotel) => (
            <article key={hotel.name} className="hg-brand-card">
              <img src={hotel.image} alt="" loading="lazy" />
              <div>
                <p className="hg-eyebrow">{hotel.location}</p>
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
