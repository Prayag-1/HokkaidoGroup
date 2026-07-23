import { motion, useScroll, useTransform } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
      <motion.div
        className="h-full origin-left bg-vermillion/85"
        style={{ scaleX }}
        aria-hidden="true"
      />
    </div>
  )
}
