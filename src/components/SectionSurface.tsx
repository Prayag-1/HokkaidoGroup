import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../lib/cn'

type SurfaceVariant = 'ink' | 'rice-paper'

type SectionSurfaceProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  variant: SurfaceVariant
  texture?: boolean
  children: ReactNode
}

export function SectionSurface({
  variant,
  texture = false,
  className,
  children,
  ...props
}: SectionSurfaceProps) {
  return (
    <section
      {...props}
      data-surface={variant}
      data-texture={texture ? 'true' : 'false'}
      className={cn('section-surface', 'corporate-section', `corporate-section--${variant}`, className)}
    >
      {texture ? <span className="section-surface__texture" aria-hidden="true" /> : null}
      {children}
    </section>
  )
}
