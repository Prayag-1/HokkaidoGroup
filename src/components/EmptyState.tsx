import type { ReactNode } from 'react'
import { Sparkles, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

type EmptyStateProps = {
  eyebrow?: string
  title: string
  description: string
  headingLevel?: 1 | 2
  icon?: LucideIcon
  action?: ReactNode
  className?: string
}

export function EmptyState({
  eyebrow,
  title,
  description,
  headingLevel = 1,
  icon: Icon = Sparkles,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('corporate-empty-state corporate-empty-state--illustrated', className)}>
      <span className="corporate-empty-state__icon" aria-hidden="true">
        <Icon size={28} strokeWidth={1.8} />
      </span>
      {eyebrow ? <p className="section-header__eyebrow">{eyebrow}</p> : null}
      {headingLevel === 1 ? <h1>{title}</h1> : <h2>{title}</h2>}
      <p>{description}</p>
      {action ? <div className="corporate-empty-state__actions">{action}</div> : null}
    </div>
  )
}
