import { cn } from '../lib/cn'

type PendingNoticeProps = {
  label?: string
  className?: string
}

export function PendingNotice({ label = 'Details coming soon', className }: PendingNoticeProps) {
  return (
    <div className={cn('corporate-pending-note', className)} role="note">
      <span aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}
