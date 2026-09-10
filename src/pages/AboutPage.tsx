import { ScrollReveal } from '../components/ScrollReveal'
import { SectionSurface } from '../components/SectionSurface'
import { SiteFooter } from '../components/SiteFooter'
import { hokkaidoVisionParagraphs } from '../data/corporateContent'
import { businesses } from '../data/businesses'
import founderPhoto from '../assets/gallery/founder-arjun-adhikari.png'
import lalBahadurPhoto from '../assets/gallery/staff/chef lala bahdur.jpeg'
import bipulBasyalPhoto from '../assets/gallery/staff/hr manager.jpeg'
import manojBhattaraiPhoto from '../assets/gallery/staff/manoj bhatrai.jpeg'
import ramTamangPhoto from '../assets/gallery/staff/Ram tamang operations.jpeg'
import sandeshPoudelPhoto from '../assets/gallery/staff/sandesh poudel.jpeg'

const storyImage = businesses.find((business) => business.id === 'hokkaido-ramen-house')?.image
const storyBrands = businesses.slice(0, 6)
const leadershipTeam = [
  {
    name: 'Sandesh Poudel',
    role: 'Managing Director, Hokkaido Group',
    image: sandeshPoudelPhoto,
    bio: [
      'Sandesh Poudel is the Managing Director of Hokkaido Group, with a strong background in the hospitality and restaurant industry. Originally from Jhapa, Nepal, he has built his professional journey around hospitality, business development, and restaurant operations.',
      'Under his leadership, Hokkaido Group has continued to expand its presence in Nepal, currently operating nine outlets across the country—seven in Kathmandu, one in Chitwan, and one in Pokhara.',
      'With a clear focus on quality, service excellence, operational standards, and sustainable growth, Sandesh continues to lead the group with a forward-looking approach. His commitment to building strong teams and delivering consistent guest experiences remains an important part of Hokkaido Group’s continued growth and development.',
    ],
  },
  {
    name: 'Manoj Bhattarai',
    role: 'Finance Director',
    image: manojBhattaraiPhoto,
    bio: [
      'Manoj Bhattarai is a results-driven Finance Director at Hokkaido Company, with over four years of progressive experience and a strong commitment to financial excellence, strategic growth, and organizational success.',
      'He holds a Master of Business Studies degree with a major in Accounting and Taxation from Tribhuvan University, Nepal. His experience covers financial management, strategic planning, accounting, taxation, budgeting, reporting, and risk management.',
      'As Finance Director, Manoj supports strategic decision-making through financial integrity, transparency, accountability, and operational efficiency. His leadership philosophy is built on integrity, precision, accountability, and continuous improvement.',
    ],
  },
  {
    name: 'Ram Tamang',
    role: 'Operations Manager, Hokkaido Group',
    image: ramTamangPhoto,
    bio: [
      'Ram Tamang is an experienced hospitality professional with a strong background in Food & Beverage operations. He began his career with the Food & Beverage Service Department at Hyatt Regency Kathmandu, where he developed a foundation in international hospitality standards and guest service.',
      'He later gained extensive experience with the Rotana Group’s five-star hotels in Dubai, strengthening his expertise in service excellence, team leadership, guest relations, and hotel operations.',
      'Since 2020, Ram has served as Operations Manager at Hokkaido Group, overseeing restaurant operations, service standards, team performance, guest experience, and operational excellence. Guided by the philosophy “Guest is God,” he values genuine hospitality, consistency, teamwork, and attention to detail.',
    ],
  },
  {
    name: 'Bipul Basyal',
    role: 'HR & Administration Manager',
    image: bipulBasyalPhoto,
    bio: [
      'Bipul Basyal is responsible for employee-related matters, including recruitment, onboarding, attendance, leave, payroll coordination, performance management, employee relations, disciplinary actions, HR policies, and staff records.',
      'His administration responsibilities include day-to-day office operations, facilities, documentation, coordination, company assets, staff requirements, meetings, and communications to support a smooth and efficient workplace.',
    ],
  },
  {
    name: 'Lal Bahadur Lama',
    role: 'Executive Chef, Hokkaido Group',
    image: lalBahadurPhoto,
    bio: [
      'Lal Bahadur Lama is the Executive Chef of Hokkaido Group, bringing more than 25 years of experience in Japanese cuisine. Originally from Kavrepalanchok, Nepal, he has built his career through Japanese culinary practices, kitchen operations, and food preparation.',
      'He spent 10 years working professionally as a chef in Japan, gaining hands-on experience and a deep understanding of authentic Japanese cuisine, techniques, and standards.',
      'At Hokkaido Group, Chef Lal Bahadur helps maintain food quality, consistency, and kitchen standards across the group, contributing to authentic and high-quality Japanese dining experiences for guests.',
    ],
  },
]

export function AboutPage() {
  return (
    <main className="corporate-page about-page--editorial">
      <SectionSurface variant="ink" className="corporate-section--first about-hero">
        <ScrollReveal className="corporate-shell">
          <div className="about-hero__title">
            <p className="section-header__eyebrow">About Us</p>
            <h1>Hokkaido Group</h1>
            <p className="editorial-japanese-note"><span lang="ja">余白</span> / Yohaku — meaningful space.</p>
          </div>
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface variant="rice-paper" className="about-story">
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
      </SectionSurface>

      <SectionSurface variant="ink" className="about-founder">
        <ScrollReveal className="corporate-shell about-founder__grid">
          <article className="about-founder__copy">
            <p className="section-header__eyebrow">Founder</p>
            <h2>Mr. Arjun Adhikari</h2>
            <p className="about-founder__role">Founder and Chairman, Hokkaido Group Pvt. Ltd.</p>
            <p>
              Mr. Arjun Adhikari is a restaurateur and entrepreneur focused on introducing and promoting Japanese food
              culture in Nepal. His work connects culinary tradition, hospitality, and business innovation through
              Hokkaido Group's growing Japanese restaurant portfolio.
            </p>
            <p>
              Public profiles of Hokkaido Group describe the company as founded and led by Mr. Adhikari,
              with roots in his earlier Bistarai Bistarai restaurant in Hokkaido, Abashiri, Japan. His Nepal journey
              includes Hokkaido Ramen House, the group's inaugural venture at Park Village, and the development of
              multiple Japanese dining concepts in Kathmandu, Lalitpur, and Pokhara.
            </p>
            <div className="about-founder__connection">
              <span>Japan ↔ Nepal</span>
              <p>Hospitality shaped by experiences between Abashiri and Kathmandu.</p>
            </div>
          </article>

          <figure className="about-founder__photo">
            <img src={founderPhoto} alt="Mr. Arjun Adhikari" loading="lazy" />
          </figure>
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface variant="ink" className="about-leadership" aria-labelledby="leadership-title">
        <ScrollReveal className="corporate-shell">
          <div className="about-leadership__heading">
            <p className="section-header__eyebrow">Leadership team</p>
            <h2 id="leadership-title">The people behind the experience.</h2>
          </div>
          <div className="about-leadership__grid">
            {leadershipTeam.map((leader) => (
              <article key={leader.name} className="about-leadership__card">
                <figure>
                  <img src={leader.image} alt={leader.name} width="960" height="1200" loading="lazy" />
                </figure>
                <div className="about-leadership__content">
                  <p>{leader.role}</p>
                  <h3>{leader.name}</h3>
                  {leader.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface variant="rice-paper" className="corporate-section--alt">
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
      </SectionSurface>

      <SiteFooter />
    </main>
  )
}
