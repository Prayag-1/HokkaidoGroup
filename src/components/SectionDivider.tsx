import { cn } from '../lib/cn'
import { RiceStalkMark, SakuraMark, SnowflakeMark, type MotifName } from './motifs'

type SectionDividerProps = {
  motif?: MotifName
  className?: string
}

const motifMap: Record<MotifName, typeof SnowflakeMark> = {
  snowflake: SnowflakeMark,
  sakura: SakuraMark,
  'rice-stalk': RiceStalkMark,
}

export function SectionDivider({ motif = 'sakura', className }: SectionDividerProps) {
  const Motif = motifMap[motif]

  return (
    <div
      className={cn('flex items-center gap-4 text-stone/90', className)}
      role="separator"
      aria-label="Section divider"
    >
      <span className="h-px flex-1 bg-current opacity-40" />
      <span className="inline-flex items-center justify-center text-vermillion/75">
        <Motif className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  )
}
