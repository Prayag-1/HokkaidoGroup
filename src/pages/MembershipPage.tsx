import { UsersRound } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { EmptyState } from '../components/EmptyState'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionSurface } from '../components/SectionSurface'
import { SiteFooter } from '../components/SiteFooter'

export function MembershipPage() {
  return (
    <main id="main-content" className="corporate-page membership-page">
      <SectionSurface variant="rice-paper" className="corporate-section--first">
        <ScrollReveal className="corporate-shell">
          <EmptyState
            eyebrow="Membership"
            title="Coming Soon"
            description="Our membership program is on its way."
            icon={UsersRound}
          />
        </ScrollReveal>
      </SectionSurface>

      <SectionSurface variant="ink" className="membership-interest">
        <ScrollReveal className="corporate-shell corporate-split">
          <div>
            <p className="corporate-eyebrow">Stay connected</p>
            <h2 className="corporate-title">Be the first to hear when membership opens.</h2>
            <p className="corporate-lead">
              Share your details and interest with the Hokkaido Group team.
            </p>
          </div>
          <ContactForm defaultBrand="Membership" hideBrand messageOptional />
        </ScrollReveal>
      </SectionSurface>

      <SiteFooter />
    </main>
  )
}
