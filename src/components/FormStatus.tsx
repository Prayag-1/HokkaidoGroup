import { AlertCircle, CheckCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

type FormStatusProps = {
  tone: 'success' | 'error'
  title: string
  message?: string
}

export function FormStatus({ tone, title, message }: FormStatusProps) {
  const reduceMotion = useReducedMotion()
  const Icon = tone === 'success' ? CheckCircle : AlertCircle

  return (
    <motion.div
      className={`corporate-form-status corporate-form-status--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.22, ease: [0.2, 0, 0, 1] }}
    >
      <Icon aria-hidden="true" size={22} strokeWidth={1.9} />
      <div>
        <p>{title}</p>
        {message ? <span>{message}</span> : null}
      </div>
    </motion.div>
  )
}
