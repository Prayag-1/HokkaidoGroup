import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { hokkaidoVisionParagraphs } from '../data/corporateContent'
import { businesses } from '../data/businesses'
import founderPhoto from '../assets/gallery/founder-arjun-adhikari.png'

const storyImage = businesses.find((business) => business.id === 'hokkaido-ramen-house')?.image
const storyBrands = businesses.slice(0, 6)

export function AboutPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first about-hero">
        <ScrollReveal className="corporate-shell">
          <div className="about-hero__title">
            <p className="section-header__eyebrow">About Us</p>
            <h1>Hokkaido Group</h1>
          </div>
        </ScrollReveal>
      </section>

      <section className="corporate-section about-story">
        <ScrollReveal className="corporate-shell about-story__grid">
          {storyImage ? (
            <figure className="about-story__image">
              <img src={storyImage} alt="Hokkaido Ramen House dining experience" loading="eager" />
            </figure>
          ) : null}

          <article className="about-story__copy">
            <p className="section-header__eyebrow">Our Vision</p>
            <h2>Bringing the authentic taste, culture, and lifestyle of Japan closer to Nepal.</h2>
            {hokkaidoVisionParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </ScrollReveal>
      </section>

      <section className="corporate-section about-founder">
        <ScrollReveal className="corporate-shell about-founder__grid">
          <article className="about-founder__copy">
            <p className="section-header__eyebrow">Founder</p>
            <h2>Mr. Arjun Adhikari</h2>
            <p className="about-founder__role">Founder and Chairman, Hokkaido Nepal Business Group Pvt. Ltd.</p>
            <p>
              Mr. Arjun Adhikari is a restaurateur and entrepreneur focused on introducing and promoting Japanese food
              culture in Nepal. His work connects culinary tradition, hospitality, and business innovation through
              Hokkaido Group's growing Japanese restaurant portfolio.
            </p>
            <p>
              Public profiles of Hokkaido Nepal Business Group describe the company as founded and led by Mr. Adhikari,
              with roots in his earlier Bistarai Bistarai restaurant in Hokkaido, Abashiri, Japan. His Nepal journey
              includes Hokkaido Ramen House, the group's inaugural venture at Park Village, and the development of
              multiple Japanese dining concepts in Kathmandu, Lalitpur, and Pokhara.
            </p>
          </article>

          <figure className="about-founder__photo">
            <img src={founderPhoto} alt="Mr. Arjun Adhikari" loading="lazy" />
          </figure>
        </ScrollReveal>
      </section>

      <section className="corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell">
          <div className="about-section-heading">
            <p className="section-header__eyebrow">Our Story</p>
            <h2>Japanese hospitality, retail, wellness, and trading in Nepal.</h2>
          </div>

          <div className="about-brand-grid">
            {storyBrands.map((business) => (
              <article key={business.id} className="about-brand-card">
                {business.image ? <img src={business.image} alt={`${business.name} venue`} loading="lazy" /> : null}
                <div>
                  <p>{business.category}</p>
                  <h3>{business.name}</h3>
                  <span>{business.locationSummary ?? business.address}</span>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter />
    </main>
  )
}
