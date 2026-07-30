import { Link } from 'react-router-dom'
import { Eye, HeartHandshake, Lightbulb, Sparkles, TrendingUp, Users } from 'lucide-react'
import { PendingNotice } from '../components/PendingNotice'
import { ScrollReveal } from '../components/ScrollReveal'
import { SiteFooter } from '../components/SiteFooter'
import { clientVisionStatement, coreValues } from '../data/corporateContent'
import { milestones } from '../data/milestones'

const valueIconMap = {
  diversity: Users,
  moments: Sparkles,
  growth: TrendingUp,
  innovation: Lightbulb,
} as const

function getMilestoneCopy(copy: string) {
  const pendingSuffix = /\s*Details pending verification\.$/

  return {
    copy: copy.replace(pendingSuffix, ''),
    hasPendingDetails: pendingSuffix.test(copy),
  }
}

export function AboutPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <ScrollReveal className="corporate-shell corporate-split corporate-split--about">
          <div className="section-header">
            <p className="section-header__eyebrow">About</p>
            <h1 className="section-header__heading">A group story, awaiting its final words.</h1>
            <p className="section-header__description">
              Leadership, values, and milestones are structured here so approved client copy can drop in cleanly.
            </p>
            <div className="corporate-copy-card corporate-copy-card--notice">
              <PendingNotice label="Company story coming soon" />
            </div>
            <Link to="/contact" className="corporate-button corporate-button--primary">
              Start a Conversation
            </Link>
          </div>

          <article className="corporate-leadership-card">
            <div className="corporate-leadership-card__portrait" aria-label="Portrait pending">
              <span>Portrait awaiting client photo</span>
            </div>
            <div>
              <p className="section-header__eyebrow">Leadership</p>
              <h2>Mr. Arjun Adhikari</h2>
              <p className="corporate-meta">President, Hokkaido Nepal Business Group</p>
              <div className="corporate-copy-card corporate-copy-card--notice">
                <PendingNotice label="[Founder's story — awaiting content from the client]" />
              </div>
            </div>
          </article>
        </ScrollReveal>
      </section>

      <section className="corporate-section corporate-section--alt">
        <ScrollReveal className="corporate-shell">
          <div className="section-header corporate-section__header">
            <p className="section-header__eyebrow">Principles</p>
            <h2 className="section-header__heading">Mission, vision, and values live here.</h2>
            <p className="section-header__description">
              The homepage keeps these short. This page holds the fuller client-approval structure.
            </p>
          </div>

          <div className="corporate-principle-grid">
            <article className="corporate-value-card corporate-value-card--wide">
              <span aria-hidden="true">
                <HeartHandshake size={20} strokeWidth={2} />
              </span>
              <h3>Mission</h3>
              <PendingNotice label="Mission copy awaiting client approval" />
            </article>
            <article className="corporate-value-card corporate-value-card--wide">
              <span aria-hidden="true">
                <Eye size={20} strokeWidth={2} />
              </span>
              <h3>Vision</h3>
              {clientVisionStatement ? <p>{clientVisionStatement}</p> : <PendingNotice label="Vision copy awaiting client approval" />}
            </article>
          </div>

          <div className="corporate-value-grid corporate-value-grid--about">
            {coreValues.map((value) => {
              const ValueIcon = valueIconMap[value.icon]

              return (
                <article key={value.name} className="corporate-value-card">
                  <span aria-hidden="true">
                    <ValueIcon size={20} strokeWidth={2} />
                  </span>
                  <h3>{value.name}</h3>
                  <p>{value.explanation}</p>
                  {value.needsClientConfirmation ? <PendingNotice label="Value wording awaiting client approval" /> : null}
                </article>
              )
            })}
          </div>
        </ScrollReveal>
      </section>

      <section className="corporate-section">
        <ScrollReveal className="corporate-shell corporate-timeline-layout">
          <div className="section-header">
            <p className="section-header__eyebrow">Timeline</p>
            <h2 className="section-header__heading">Milestones from the shared source.</h2>
            <p className="section-header__description">
              These entries stay literal to the current company data and keep pending notes visible.
            </p>
          </div>

          <ol className="corporate-timeline" aria-label="HNBG milestone timeline">
            {milestones.map((milestone, index) => {
              const milestoneCopy = getMilestoneCopy(milestone.description)

              return (
                <li key={milestone.id} className="corporate-timeline__item">
                  <span className="corporate-timeline__marker" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <article className="corporate-timeline__card">
                    <p className="corporate-timeline__year">{milestone.year}</p>
                    <h2>{milestone.title}</h2>
                    <p>{milestoneCopy.copy}</p>
                    {milestoneCopy.hasPendingDetails ? <PendingNotice label="Milestone details coming soon" /> : null}
                  </article>
                </li>
              )
            })}
          </ol>
        </ScrollReveal>
      </section>
      <SiteFooter />
    </main>
  )
}
