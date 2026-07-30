import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.25, ease: [0.2, 0, 0, 1] as [number, number, number, number] }

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={transition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
