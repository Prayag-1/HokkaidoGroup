import { useState, type FormEvent } from 'react'
import { ArrowUpRight, ChefHat, CalendarDays, Users, Mail } from 'lucide-react'
import { PageBreadcrumb } from '../components/PageBreadcrumb'
import { SiteFooter } from '../components/SiteFooter'
import { businesses } from '../data/businesses'
import sushiPhoto from '../assets/gallery/umami/umami2.webp'
import chefPhoto from '../assets/gallery/sora/sora3.webp'
import craftPhoto from '../assets/gallery/sora/sora1.webp'
import diningPhoto from '../assets/gallery/hokkaidohouse/house3.webp'
import platterPhoto from '../assets/gallery/sora/sora2.webp'

const contact = businesses.find((business) => business.id === 'hokkaido-house')!
const occasions = [
  {
    Icon: Users,
    title: 'Private celebrations',
    description:
      'Birthdays, anniversaries, and the simple joy of bringing your favourite people together. Tell us what you have in mind.',
  },
  {
    Icon: CalendarDays,
    title: 'Corporate gatherings',
    description:
      'From a team lunch to an evening with clients, start a conversation about Japanese food that suits the occasion.',
  },
  {
    Icon: ChefHat,
    title: 'A Japanese table',
    description:
      'Explore ideas inspired by our kitchens: carefully prepared sushi, Japanese small plates, and dishes made for sharing.',
  },
]

export function CateringPage() {
  const [emailDraft, setEmailDraft] = useState<string | null>(null)
  const prepareInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const fields = [
      ['Name', 'name'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Event date', 'date'],
      ['Guests', 'guests'],
      ['Occasion', 'occasion'],
      ['Location', 'location'],
      ['Menu ideas and dietary requirements', 'message'],
    ]
    const body = fields
      .map(
        ([label, key]) => `${label}: ${values.get(key) || 'To be discussed'}`,
      )
      .join('\n')
    setEmailDraft(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email!)}&su=${encodeURIComponent('Hokkaido catering inquiry')}&body=${encodeURIComponent(body)}`,
    )
  }

  return (
    <main id="main-content" className="editorial-page catering-page">
      <PageBreadcrumb title="Catering" />
      <section className="split-hero catering-hero">
        <div className="catering-hero__media">
          <img
            src={sushiPhoto}
            alt="Beautifully presented sushi rolls and a drink at Hokkaido Umami"
            fetchPriority="high"
          />
          <span>From our kitchens, with care.</span>
        </div>
        <div className="catering-hero__copy">
          <p className="eyebrow">Gather. Savour. Celebrate.</p>
          <h1>
            Hokkaido
            <br />
            Catering
          </h1>
          <h2>
            Good food.
            <br />
            An occasion to remember.
          </h2>
          <p>
            Some of the best memories begin around a table. Bring a little of
            Japan to your next gathering, with food inspired by Hokkaido’s
            kitchens and the warmth of a thoughtful welcome.
          </p>
          <p>
            From a personal celebration to a meal with colleagues, let’s talk
            about the flavours, setting, and small details that will make it
            yours.
          </p>
          <a className="editorial-button" href="#catering-inquiry">
            Plan your gathering <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section
        className="editorial-section corporate-shell catering-occasions"
        aria-label="Gathering ideas"
      >
        {occasions.map(({ Icon, title, description }) => (
          <article key={title}>
            <Icon size={30} strokeWidth={1.25} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <section className="catering-story corporate-shell">
        <div className="catering-story__copy">
          <p className="eyebrow">01 / The people behind the plate</p>
          <h2>
            A thoughtful touch.
            <br />
            In every detail.
          </h2>
          <p>
            Japanese hospitality is as much about how people feel as what they
            eat. Our kitchens bring together careful preparation, an eye for
            presentation, and a love of welcoming guests.
          </p>
          <p>
            Share your guest list, the mood of your occasion, and the food you
            enjoy. The team can help you explore menu ideas and discuss the
            arrangements that suit your gathering.
          </p>
        </div>
        <img
          src={chefPhoto}
          alt="A Hokkaido chef carefully arranging a sushi platter"
          loading="lazy"
        />
      </section>
      <section className="catering-story catering-story--reverse corporate-shell">
        <div className="catering-story__copy">
          <p className="eyebrow">02 / The art of Japanese food</p>
          <h2>
            Freshly prepared.
            <br />
            Beautifully shared.
          </h2>
          <p>
            A neatly rolled piece of sushi. The texture of a crisp small plate.
            A colourful platter that invites everyone to try something new. It
            is the care in these details that gives a Japanese meal its
            character.
          </p>
          <p>
            Build your conversation around favourites from our restaurant menus,
            and let us know about dietary preferences, the size of your group,
            and how you would like the meal to unfold.
          </p>
          <a className="text-link" href="#catering-inquiry">
            Discuss your menu <ArrowUpRight size={16} />
          </a>
        </div>
        <img
          src={craftPhoto}
          alt="Sushi being rolled by hand in a Hokkaido kitchen"
          loading="lazy"
        />
      </section>

      <section className="catering-gathering" aria-labelledby="gathering-title">
        <img
          src={diningPhoto}
          alt="Hokkaido House dining tables set beneath a sculptural wooden chandelier"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">A reason to come together</p>
          <h2 id="gathering-title">
            Make room for
            <br />
            something memorable.
          </h2>
          <p>
            A warm setting, a shared meal, and the people who matter. Start with
            the occasion; we’ll help you explore the possibilities.
          </p>
          <a
            className="editorial-button editorial-button--light"
            href="#catering-inquiry"
          >
            Inquiry Now <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section
        id="catering-inquiry"
        className="editorial-section corporate-shell catering-inquiry"
        aria-labelledby="inquiry-title"
      >
        <div className="catering-inquiry__intro">
          <p className="eyebrow">Let’s plan something special</p>
          <h2 id="inquiry-title">
            Your gathering.
            <br />
            Our conversation.
          </h2>
          <p>
            Tell us a little about your event. The Hokkaido House team can
            advise on menus, availability, and arrangements.
          </p>
          <p className="content-note">
            This prepares an inquiry to Hokkaido House in Gmail. Review the
            details and click Send in Gmail to send your inquiry.
          </p>
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email!)}`} target="_blank" rel="noopener noreferrer">{contact.email}</a>
          <img
            src={platterPhoto}
            alt="An assortment of Hokkaido sushi presented on a wooden serving platter"
            loading="lazy"
          />
        </div>
        <form
          className="catering-form"
          onSubmit={prepareInquiry}
          onChange={() => setEmailDraft(null)}
        >
          <h3>Tell us about your event</h3>
          <div className="catering-form__grid">
            <label>
              Full name <span aria-hidden="true">*</span>
              <input name="name" autoComplete="name" required maxLength={80} />
            </label>
            <label>
              Email address <span aria-hidden="true">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={120}
              />
            </label>
            <label>
              Contact number <span aria-hidden="true">*</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={30}
              />
            </label>
            <label>
              Event date
              <input name="date" type="date" />
            </label>
            <label>
              Number of guests
              <input
                name="guests"
                type="number"
                min="1"
                max="9999"
                inputMode="numeric"
              />
            </label>
            <label>
              Occasion
              <select name="occasion" defaultValue="">
                <option value="">Select an occasion</option>
                <option>Private celebration</option>
                <option>Corporate gathering</option>
                <option>Wedding or reception</option>
                <option>Other gathering</option>
              </select>
            </label>
          </div>
          <label>
            Event location
            <input
              name="location"
              placeholder="Venue, neighbourhood, or city"
              maxLength={150}
            />
          </label>
          <label>
            What do you have in mind?
            <textarea
              name="message"
              rows={4}
              maxLength={1500}
              placeholder="Menu ideas, dietary preferences, and anything else you would like us to know."
            />
          </label>
          <button className="editorial-button" type="submit">
            Prepare inquiry <Mail size={16} />
          </button>
          {emailDraft && (
            <div className="catering-form__ready" role="status">
              <p>
                Your inquiry is ready. Open Gmail below, review the details,
                and send it to the team.
              </p>
              <a className="editorial-button" href={emailDraft} target="_blank" rel="noopener noreferrer">
                Open Gmail <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </form>
      </section>
      <SiteFooter />
    </main>
  )
}
