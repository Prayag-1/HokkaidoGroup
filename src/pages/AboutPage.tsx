import { Link } from 'react-router-dom'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { SiteFooter } from '../components/SiteFooter'
import { hokkaidoVisionParagraphs } from '../data/corporateContent'
import { businesses, getBusinessImagePosition } from '../data/businesses'
import { handleBusinessImageError } from '../lib/businessImages'
import founderPhoto from '../assets/gallery/founder-arjun-adhikari.png'
import lalBahadurPhoto from '../assets/gallery/staff/chef lala bahdur.jpeg'
import bipulBasyalPhoto from '../assets/gallery/staff/hr manager.jpeg'
import manojBhattaraiPhoto from '../assets/gallery/staff/manoj bhatrai.jpeg'
import ramTamangPhoto from '../assets/gallery/staff/Ram tamang operations.jpeg'
import sandeshPoudelPhoto from '../assets/gallery/staff/sandesh poudel.jpeg'

const storyImage = businesses.find(
  (business) => business.id === 'hokkaido-ramen-house',
)?.image
const storyPhotos = businesses.flatMap(b => b.galleryImages.map(src => ({ business: b, src })))
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
    <main id="main-content" className="editorial-page about-page">
      <PageBreadcrumb title="About us" />
      <h1 className="page-title">About us</h1>
      <section className="about-intro corporate-shell">
        <div className="vertical-rule" />
        <h2>
          Japanese hospitality in Nepal,
          <br />
          <em>since 2018.</em>
        </h2>
        <p>{hokkaidoVisionParagraphs[0]}</p>
      </section>
      <section
        className="story-banner"
        style={{ backgroundImage: 'url(' + storyImage + ')' }}
      >
        <p>
          From Abashiri to Kathmandu, a shared love of Japanese food and the
          people around the table.
        </p>
      </section>
      <section className="editorial-section corporate-shell about-prose">
        {hokkaidoVisionParagraphs.slice(1).map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          Our story begins with founder Arjun Adhikari's hospitality journey in
          Japan, followed by Hokkaido Ramen House at Park Village in Nepal.
          Today, our brands bring together restaurants, retail, wellness, and
          trading.
        </p>
        <Link to="/our-story" className="editorial-button">
          Our Story
        </Link>
      </section>
      <section className="editorial-section corporate-shell">
        <div className="section-heading">
          <h2>
            Hokkaido Group
            <br />
            <span className="heading-light">Social wall</span>
          </h2>
          <p className="content-note">A glimpse of our places</p>
        </div>
        <div className="social-wall">
          {storyPhotos.map(({ business: b, src }, index) => (
            <Link key={src} to={'/businesses/' + b.slug}>
              <img src={src} alt={`${b.name} photo ${index + 1}`} loading="lazy" style={{ objectPosition: getBusinessImagePosition(b, src) }} onError={(event) => handleBusinessImageError(event, b, 'a')} />
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-section corporate-shell">
        <h2 className="center-heading">Leadership Team</h2>
        <div className="leadership-grid">
          <article>
            <img src={founderPhoto} alt="Arjun Adhikari" loading="lazy" onError={(event) => event.currentTarget.remove()} />
            <h3>Arjun Adhikari</h3>
            <p>Founder and Chairman</p>
            <details>
              <summary>Read biography</summary>
              <p>
                Arjun Adhikari is a restaurateur and entrepreneur focused on
                introducing and promoting Japanese food culture in Nepal. His
                work connects culinary tradition, hospitality, and business
                innovation.
              </p>
            </details>
          </article>
          {leadershipTeam.map((leader) => (
            <article key={leader.name}>
              <img src={leader.image} alt={leader.name} loading="lazy" onError={(event) => event.currentTarget.remove()} />
              <h3>{leader.name}</h3>
              <p>{leader.role}</p>
              <details>
                <summary>Read biography</summary>
                {leader.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </details>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
