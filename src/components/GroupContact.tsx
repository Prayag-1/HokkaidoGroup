import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { businesses, hokkaidoGroupCorporateContact } from '../data/businesses'
function SocialIcon({ label }: { label: string }) {
  if (/facebook/i.test(label))
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v9z" />
      </svg>
    )
  if (/instagram/i.test(label))
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".7" />
      </svg>
    )
  if (/youtube/i.test(label))
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" />
      </svg>
    )
  return <ExternalLink size={20} />
}
export function GroupContact() {
  const group = hokkaidoGroupCorporateContact
  const contact = group.phone || group.email ? group : businesses[0]
  return (
    <div className="group-contact">
      <h3>Contact us</h3>
      {contact !== group && <p>Hokkaido Ramen House · outlet contact</p>}
      <address>
        {contact.phone && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
        {contact.email && (
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        )}
        <Link to="/contact">All outlet contacts</Link>
      </address>
      <div className="social-links">
        {group.socialLinks
          .filter((s) => s.verified)
          .map((s) => {
            return (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <SocialIcon label={s.label} />
              </a>
            )
          })}
      </div>
    </div>
  )
}
