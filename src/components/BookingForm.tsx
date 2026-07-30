import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useReducedMotion } from 'motion/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { cn } from '../lib/cn'
import { BOOKING_FORM_ENDPOINTS } from '../lib/site-data'
import { BOOKABLE_BRANDS, bookingFormSchema, bookingStepSchemas, type BookingFormValues } from '../lib/schemas'

type BookingFormProps = {
  className?: string
}

type BookingStep = 'brand' | 'details' | 'guest' | 'confirmation'

const stepLabels: Record<BookingStep, string> = {
  brand: 'Brand',
  details: 'Details',
  guest: 'Guest',
  confirmation: 'Confirm',
}

const brandLabelMap: Record<(typeof BOOKABLE_BRANDS)[number], string> = {
  'hokkaido-ramen-house': 'Hokkaido Ramen (House)',
  'hokkaido-house': 'Hokkaido House',
  'hokkaido-yakitori': 'Hokkaido Yakitori',
  'hokkaido-izakaya': 'Hokkaido Izakaya',
  'hokkaido-umami': 'Hokkaido Umami',
  'hokkaido-sora': 'Hokkaido Sora',
  'hokkaido-pokhara': 'Hokkaido Pokhara',
}

async function submitBooking(values: BookingFormValues) {
  const endpoint = BOOKING_FORM_ENDPOINTS[values.brand]
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      brand: values.brand,
      date: values.date,
      time: values.time,
      partySize: values.partySize,
      name: values.name,
      phone: values.phone,
      email: values.email,
      specialRequests: values.specialRequests ?? '',
      _gotcha: values._gotcha ?? '',
    }),
  })

  if (!response.ok) {
    throw new Error('We could not send your booking request right now. Please try again in a moment.')
  }

  return response.json()
}

export function BookingForm({ className }: BookingFormProps) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const headingId = useId()
  const [step, setStep] = useState<BookingStep>('brand')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [successSummary, setSuccessSummary] = useState<BookingFormValues | null>(null)
  const stepRefs = useRef<Record<BookingStep, HTMLHeadingElement | null>>({ brand: null, details: null, guest: null, confirmation: null })

  const defaultValues: BookingFormValues = useMemo(() => ({
    brand: (location.state as { brand?: BookingFormValues['brand'] } | null)?.brand ?? 'hokkaido-ramen-house',
    date: '',
    time: '',
    partySize: 2,
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
    _gotcha: '',
  }), [location.state])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  })

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      setStatusMessage('Thanks! Your booking request has been sent and the team will follow up shortly.')
      setSuccessSummary(getValues())
    },
    onError: () => {
      setStatusMessage('We could not send your booking request right now. Please try again in a moment.')
    },
  })

  useEffect(() => {
    if (!statusMessage) {
      return
    }

    const timer = window.setTimeout(() => setStatusMessage(null), 5000)
    return () => window.clearTimeout(timer)
  }, [statusMessage])

  useEffect(() => {
    const heading = stepRefs.current[step]
    if (heading) {
      heading.focus()
    }
  }, [step])

  const goNext = async () => {
    if (step === 'brand') {
      const valid = await trigger('brand')
      if (!valid) return
      setStep('details')
      return
    }

    if (step === 'details') {
      const valid = await trigger(['date', 'time', 'partySize'])
      if (!valid) return
      setStep('guest')
      return
    }

    if (step === 'guest') {
      const valid = await trigger(['name', 'phone', 'email'])
      if (!valid) return
      setStep('confirmation')
    }
  }

  const goBack = () => {
    if (step === 'details') {
      setStep('brand')
      return
    }

    if (step === 'guest') {
      setStep('details')
      return
    }

    if (step === 'confirmation') {
      setStep('guest')
    }
  }

  const onSubmit = async (values: BookingFormValues) => {
    if (values._gotcha && values._gotcha.length > 0) {
      return
    }

    setStatusMessage(null)
    mutation.mutate(values)
  }

  const brandValue = watch('brand')
  const selectedBrandName = brandValue ? brandLabelMap[brandValue as keyof typeof brandLabelMap] : 'Selected restaurant'

  const stepOrder: BookingStep[] = ['brand', 'details', 'guest', 'confirmation']

  return (
    <motion.form
      className={cn('hg-panel hg-form', className)}
      onSubmit={handleSubmit(onSubmit)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <input type="text" {...register('_gotcha')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mb-6" aria-label="Booking progress">
        <p className="hg-eyebrow">Reservation details</p>
        <div className="mt-3 flex items-center gap-2" role="list">
          {stepOrder.map((item, index) => {
            const isActive = step === item
            const isComplete = stepOrder.indexOf(step) > index
            return (
              <div key={item} className="flex items-center gap-2" role="listitem">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold',
                    isActive ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-bg)]' : '',
                    isComplete ? 'border-[var(--color-success)] text-[var(--color-success)]' : '',
                    !isActive && !isComplete ? 'border-[var(--color-border)] text-[var(--color-muted)]' : '',
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {index + 1}
                </div>
                {index < stepOrder.length - 1 ? <span className="h-px w-6 bg-[var(--color-border)]" /> : null}
              </div>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-[var(--color-secondary-text)]">Step {stepOrder.indexOf(step) + 1} of {stepOrder.length}: {stepLabels[step]}</p>
      </div>

      <motion.div
        key={step}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 ref={(node) => { stepRefs.current[step] = node }} tabIndex={-1} className="sr-only" id={headingId}>
          {stepLabels[step]} step
        </h2>

        {step === 'brand' ? (
          <div className="space-y-4">
            <p className="text-sm text-[var(--color-secondary-text)]">Choose the restaurant that will receive your reservation request.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {BOOKABLE_BRANDS.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setValue('brand', brand, { shouldValidate: true })}
                  className={cn(
                    'rounded-[var(--radius-input)] border px-4 py-3 text-left transition-colors',
                    brandValue === brand
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/8 text-[var(--color-primary-text)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-body)]',
                  )}
                >
                  {brandLabelMap[brand]}
                </button>
              ))}
            </div>
            {errors.brand ? <p className="text-sm text-[var(--color-primary-text)]">{errors.brand.message}</p> : null}
          </div>
        ) : null}

        {step === 'details' ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="hg-field" htmlFor="booking-date">
                Date
                <input
                  id="booking-date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'booking-date-error' : undefined}
                  {...register('date')}
                />
                {errors.date ? <p id="booking-date-error" className="text-sm text-[var(--color-primary-text)]">{errors.date.message}</p> : null}
              </label>
              <label className="hg-field" htmlFor="booking-time">
                Time
                <input
                  id="booking-time"
                  type="time"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'booking-time-error' : undefined}
                  {...register('time')}
                />
                {errors.time ? <p id="booking-time-error" className="text-sm text-[var(--color-primary-text)]">{errors.time.message}</p> : null}
              </label>
            </div>
            <label className="hg-field" htmlFor="booking-party-size">
              Party size
              <input
                id="booking-party-size"
                type="number"
                min={1}
                max={30}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                aria-invalid={Boolean(errors.partySize)}
                aria-describedby={errors.partySize ? 'booking-party-size-error' : undefined}
                {...register('partySize', { valueAsNumber: true })}
              />
              {errors.partySize ? <p id="booking-party-size-error" className="text-sm text-[var(--color-primary-text)]">{errors.partySize.message}</p> : null}
            </label>
          </div>
        ) : null}

        {step === 'guest' ? (
          <div className="space-y-4">
            <label className="hg-field" htmlFor="booking-name">
              Full name
              <input
                id="booking-name"
                autoComplete="name"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'booking-name-error' : undefined}
                {...register('name')}
              />
              {errors.name ? <p id="booking-name-error" className="text-sm text-[var(--color-primary-text)]">{errors.name.message}</p> : null}
            </label>
            <label className="hg-field" htmlFor="booking-phone">
              Phone
              <input
                id="booking-phone"
                type="tel"
                autoComplete="tel"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                {...register('phone')}
              />
              {errors.phone ? <p id="booking-phone-error" className="text-sm text-[var(--color-primary-text)]">{errors.phone.message}</p> : null}
            </label>
            <label className="hg-field" htmlFor="booking-email">
              Email (optional)
              <input
                id="booking-email"
                type="email"
                autoComplete="email"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'booking-email-error' : undefined}
                {...register('email')}
              />
              {errors.email ? <p id="booking-email-error" className="text-sm text-[var(--color-primary-text)]">{errors.email.message}</p> : null}
            </label>
            <label className="hg-field" htmlFor="booking-special-requests">
              Special requests (optional)
              <textarea
                id="booking-special-requests"
                rows={4}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                aria-invalid={Boolean(errors.specialRequests)}
                aria-describedby={errors.specialRequests ? 'booking-special-requests-error' : undefined}
                {...register('specialRequests')}
              />
              {errors.specialRequests ? <p id="booking-special-requests-error" className="text-sm text-[var(--color-primary-text)]">{errors.specialRequests.message}</p> : null}
            </label>
          </div>
        ) : null}

        {step === 'confirmation' ? (
          <div className="space-y-4">
            <p className="text-sm text-[var(--color-secondary-text)]">Review your request before sending it to {selectedBrandName}.</p>
            <div className="rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4">
              <dl className="grid gap-3 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Restaurant</dt>
                  <dd>{selectedBrandName}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Date</dt>
                  <dd>{watch('date')}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Time</dt>
                  <dd>{watch('time')}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Party size</dt>
                  <dd>{watch('partySize')}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Guest</dt>
                  <dd>{watch('name')}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Phone</dt>
                  <dd>{watch('phone')}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Email</dt>
                  <dd>{watch('email') || '—'}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="font-semibold text-[var(--color-secondary-text)]">Requests</dt>
                  <dd>{watch('specialRequests') || '—'}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : null}
      </motion.div>

      <div aria-live="polite" className="mt-6 space-y-3">
        {statusMessage ? <p className="text-sm text-[var(--color-success)]">{statusMessage}</p> : null}
        {mutation.isError ? <p className="text-sm text-[var(--color-primary-text)]">{mutation.error instanceof Error ? mutation.error.message : 'We could not send your booking request right now.'}</p> : null}
        {successSummary ? <p className="text-sm text-[var(--color-success)]">{successSummary.name} — {successSummary.date} at {successSummary.time} for {successSummary.partySize} guests.</p> : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="hg-button hg-button--outline-dark" onClick={goBack} disabled={step === 'brand'}>
          Back
        </button>
        {step === 'confirmation' ? (
          <button type="submit" className="hg-button hg-button--dark" disabled={mutation.isPending || isSubmitting}>
            {mutation.isPending || isSubmitting ? 'Sending…' : 'Confirm booking'}
          </button>
        ) : (
          <button type="button" className="hg-button hg-button--dark" onClick={goNext}>
            Next
          </button>
        )}
      </div>
    </motion.form>
  )
}
