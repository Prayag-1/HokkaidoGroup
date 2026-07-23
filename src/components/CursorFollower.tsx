import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const interactiveSelector = [
  'a',
  'button',
  '[role="button"]',
  'input',
  'textarea',
  'select',
  'summary',
  '[data-cursor-target="true"]',
].join(',')

export function CursorFollower() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-20)
  const y = useMotionValue(-20)
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.18 })
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.18 })

  useEffect(() => {
    if (reduceMotion) {
      return
    }

    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateEnabled = () => setEnabled(media.matches)

    updateEnabled()
    media.addEventListener('change', updateEnabled)

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 4)
      y.set(event.clientY - 4)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null
      setHovering(Boolean(target?.closest(interactiveSelector)))
    }

    const onOut = (event: PointerEvent) => {
      const target = event.relatedTarget as Element | null
      setHovering(Boolean(target?.closest(interactiveSelector)))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerout', onOut)

    return () => {
      media.removeEventListener('change', updateEnabled)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerout', onOut)
    }
  }, [reduceMotion, x, y])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-2 w-2 rounded-full bg-vermillion shadow-[0_0_0_6px_rgba(192,68,44,0.08)]"
      style={{ x: springX, y: springY, scale: hovering ? 1.8 : 1 }}
      transition={{ type: 'spring', stiffness: 700, damping: 45 }}
    />
  )
}
