import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/cn'
import { RiceStalkMark, SakuraMark, SnowflakeMark, type MotifName } from './motifs'

type MotifFieldProps = {
  className?: string
  motifs?: MotifName[]
  toneClassName?: string
}

const motifMap: Record<MotifName, typeof SnowflakeMark> = {
  snowflake: SnowflakeMark,
  sakura: SakuraMark,
  'rice-stalk': RiceStalkMark,
}

const layers: Array<{
  motif: MotifName
  className: string
  x: [number, number]
  y: [number, number]
  rotate: [number, number]
}> = [
  {
    motif: 'snowflake',
    className: 'left-[5%] top-[8%] h-64 w-64 sm:h-80 sm:w-80',
    x: [-12, 24],
    y: [-20, 44],
    rotate: [-6, 10],
  },
  {
    motif: 'sakura',
    className: 'right-[3%] top-[26%] h-72 w-72 sm:h-[24rem] sm:w-[24rem]',
    x: [20, -18],
    y: [18, -28],
    rotate: [8, -8],
  },
  {
    motif: 'rice-stalk',
    className: 'left-[20%] bottom-[8%] h-72 w-72 sm:h-[26rem] sm:w-[26rem]',
    x: [-10, 16],
    y: [20, -20],
    rotate: [-4, 6],
  },
]

type MotifLayerProps = (typeof layers)[number] & {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  reduceMotion: boolean
  toneClassName: string
}

function MotifLayer({
  motif,
  className,
  x,
  y,
  rotate,
  scrollYProgress,
  reduceMotion,
  toneClassName,
}: MotifLayerProps) {
  const Motif = motifMap[motif]
  const xMotion = useTransform(scrollYProgress, [0, 1], x)
  const yMotion = useTransform(scrollYProgress, [0, 1], y)
  const rotateMotion = useTransform(scrollYProgress, [0, 1], rotate)

  return (
    <motion.div
      className={cn('absolute', toneClassName, className)}
      style={reduceMotion ? undefined : { x: xMotion, y: yMotion, rotate: rotateMotion }}
    >
      <Motif className="h-full w-full" />
    </motion.div>
  )
}

export function MotifField({ className, motifs, toneClassName = 'text-ink/5' }: MotifFieldProps) {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const activeLayers = motifs ? layers.filter((layer) => motifs.includes(layer.motif)) : layers

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {activeLayers.map((layer) => (
        <MotifLayer
          key={layer.motif + layer.className}
          scrollYProgress={scrollYProgress}
          reduceMotion={reduceMotion ?? false}
          toneClassName={toneClassName}
          {...layer}
        />
      ))}
    </div>
  )
}
