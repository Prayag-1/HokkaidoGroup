import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useReducedMotion } from 'motion/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { cn } from '../lib/cn'
import { CONTACT_FORM_ENDPOINT } from '../lib/site-data'
import { contactFormSchema, type ContactFormValues } from '../lib/schemas'

const brandOptions = [
  'General Hokkaido Group inquiry',
  'Hokkaido Ramen (House)',
  'Hokkaido Dekkaido',
  'Hokkaido House',
  'Hokkaido Sora',
  'Hokkaido Umami',
  'Hokkaido Pokhara',
  'Hokkaido Yakitori',
  'Hokkaido Izakaya',
  'homa',
  'Janeichi',
] as const

type ContactFormProps = {
  className?: string
}

async function submitContactForm(values: ContactFormValues) {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.phone ?? '',
      brand: values.brand,
      message: values.message,
      _gotcha: values._gotcha ?? '',
    }),
  })

  if (!response.ok) {
    throw new Error('Unable to send message right now. Please try again shortly.')
  }

  return response.json()
}

export function ContactForm({ className }: ContactFormProps) {
  const reduceMotion = useReducedMotion()
  const [showSuccess, setShowSuccess] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      brand: '',
      message: '',
      _gotcha: '',
    },
  })

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      setStatusMessage('Thanks for reaching out. We will be in touch shortly.')
      setShowSuccess(true)
      reset()
    },
    onError: () => {
      setStatusMessage('Something went wrong while sending your message. Please try again in a moment.')
      setShowSuccess(false)
    },
  })

  useEffect(() => {
    if (!statusMessage) {
      return
    }

    const timer = window.setTimeout(() => setStatusMessage(null), 5000)
    return () => window.clearTimeout(timer)
  }, [statusMessage])

  const onSubmit = async (values: ContactFormValues) => {
    if (values._gotcha && values._gotcha.length > 0) {
      return
    }

    setStatusMessage(null)
    mutation.mutate(values)
  }

  return (
    <motion.form
      className={cn('hg-panel hg-form', className)}
      onSubmit={handleSubmit(onSubmit)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={showSuccess ? { opacity: 0, y: -12, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <input type="hidden" name="_subject" value="New Hokkaido Group contact inquiry" />
      <input type="text" {...register('_gotcha')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <p className="hg-eyebrow">Send a message</p>

      <label className="hg-field" htmlFor="contact-name">
        Name
        <input
          id="contact-name"
          autoComplete="name"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name ? <p id="contact-name-error" className="text-sm text-[var(--color-primary-text)]">Please enter your name.</p> : null}
      </label>

      <label className="hg-field" htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email ? <p id="contact-email-error" className="text-sm text-[var(--color-primary-text)]">Please enter a valid email.</p> : null}
      </label>

      <label className="hg-field" htmlFor="contact-phone">
        Phone
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          {...register('phone')}
        />
      </label>

      <div className="hg-field">
        <label htmlFor="contact-brand">Brand</label>
        <Controller
          control={control}
          name="brand"
          render={({ field }) => (
            <select
              id="contact-brand"
              value={field.value}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              aria-invalid={Boolean(errors.brand)}
              aria-describedby={errors.brand ? 'contact-brand-error' : undefined}
              onChange={(event) => field.onChange(event.target.value)}
              onBlur={field.onBlur}
            >
              <option value="">Select who this is for</option>
              {brandOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />
        {errors.brand ? <p id="contact-brand-error" className="text-sm text-[var(--color-primary-text)]">Please select who this is for.</p> : null}
      </div>

      <label className="hg-field" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          rows={6}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message ? <p id="contact-message-error" className="text-sm text-[var(--color-primary-text)]">Please share a bit more about your inquiry.</p> : null}
      </label>

      <div aria-live="polite" className="space-y-3">
        {statusMessage ? <p className="text-sm text-[var(--color-success)]">{statusMessage}</p> : null}
        {mutation.isError ? <p className="text-sm text-[var(--color-primary-text)]">{mutation.error instanceof Error ? mutation.error.message : 'Something went wrong while sending your message.'}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="hg-button hg-button--dark" disabled={mutation.isPending || isSubmitting}>
          {mutation.isPending || isSubmitting ? 'Sending…' : 'Send message'}
        </button>
        {showSuccess ? <span className="text-sm text-[var(--color-success)]">Thanks for reaching out.</span> : null}
      </div>
    </motion.form>
  )
}
