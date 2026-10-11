import { Link } from 'react-router-dom'
import { hokkaidoGroupLogo } from '../data/businesses'
import { GroupContact } from './GroupContact'
import { businesses } from '../data/businesses'
export function SiteFooter() {
  return (
    <footer className="group-footer">
      <div className="corporate-shell">
        <Link className="group-footer__brand" to="/">
          <img src={hokkaidoGroupLogo} alt="" width={75} height={75} loading="lazy" />
          <span>Hokkaido Group</span>
        </Link>
        <div className="group-footer__main">
          <nav aria-label="Footer navigation" className="group-footer__links">
            <div><h2>Explore</h2><Link to="/businesses">Our Restaurants</Link><Link to="/about-us">About Us</Link><Link to="/catering">Catering &amp; Events</Link><Link to="/contact">Contact Us</Link></div>
            <div><h2>Discover</h2><Link to="/businesses">Locations</Link><Link to="/mart">Japanese Lifestyle</Link><Link to="/membership">Membership</Link><Link to="/about-us#our-brands">Our Brands</Link></div>
          </nav>
        </div>
        <section className="footer-brand-strip" aria-label="Our Brands">
          <h2>Our Brands</h2>
          <div>{businesses.filter((business) => business.logo).map((business) => <Link className="footer-brand-strip__tile" key={business.id} to={business.id === 'hokkaido-mart' ? '/mart' : `/businesses/${business.slug}`}><img src={business.footerLogo ?? business.logo!} alt={business.name} width={96} height={96} loading="lazy" /></Link>)}</div>
        </section>
        <GroupContact socialFirst />
        <p className="group-footer__copyright">
          © {new Date().getFullYear()} Hokkaido Group. All rights reserved. — Dynamic Media Nepal /Prayag
        </p>
      </div>
    </footer>
  )
}
