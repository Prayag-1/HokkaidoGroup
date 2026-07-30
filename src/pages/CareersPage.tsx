import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'
import { EmptyState } from '../components/EmptyState'
import { SiteFooter } from '../components/SiteFooter'

export function CareersPage() {
  return (
    <main className="corporate-page">
      <section className="corporate-section corporate-section--first">
        <div className="corporate-shell">
          <EmptyState
            eyebrow="Careers"
            title="Careers will open here."
            description="Open roles and hiring updates will appear when they are ready for the public site."
            icon={Briefcase}
            action={
              <Link to="/contact" className="corporate-button corporate-button--primary">
                Contact the Group
              </Link>
            }
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
