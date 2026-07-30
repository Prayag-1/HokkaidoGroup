import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { FormStatus } from './FormStatus'
import { cn } from '../lib/cn'
import { BOOKING_FORM_ENDPOINTS } from '../lib/site-data'
import { BOOKABLE_BRANDS, bookingFormSchema, type BookingFormValues } from '../lib/schemas'

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
    control,
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
      setStatusMessage(null)
    },
  })

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
    setSuccessSummary(null)
    mutation.reset()
    mutation.mutate(values)
  }

  const watchedValues = useWatch({ control })
  const brandValue = watchedValues.brand
  const selectedBrandName = brandValue ? brandLabelMap[brandValue as keyof typeof brandLabelMap] : 'Selected restaurant'

  const stepOrder: BookingStep[] = ['brand', 'details', 'guest', 'confirmation']

  return (
    <motion.form
      className={cn('corporate-panel corporate-form', className)}
      onSubmit={handleSubmit(onSubmit)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.25, ease: [0.2, 0, 0, 1] }}
    >
      <input type="text" {...register('_gotcha')} tabIndex={-1} autoComplete="off" className="corporate-honeypot" aria-hidden="true" />

      <div className="corporate-stepper" aria-label="Booking progress">
        <p className="corporate-eyebrow">Reservation details</p>
        <div className="corporate-stepper__list" role="list">
          {stepOrder.map((item, index) => {
            const isActive = step === item
            const isComplete = stepOrder.indexOf(step) > index
            return (
              <div key={item} className="corporate-stepper__item" role="listitem">
                <span
                  className={cn(
                    'corporate-stepper__marker',
                    isActive ? 'corporate-stepper__marker--active' : '',
                    isComplete ? 'corporate-stepper__marker--complete' : '',
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isComplete ? <Check aria-hidden="true" size={15} strokeWidth={2.2} /> : index + 1}
                </span>
                <span className="corporate-stepper__label">{stepLabels[item]}</span>
                {index < stepOrder.length - 1 ? <span className="corporate-stepper__line" /> : null}
              </div>
            )
          })}
        </div>
        <p className="corporate-stepper__meta">Step {stepOrder.indexOf(step) + 1} of {stepOrder.length}: {stepLabels[step]}</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={reduceMotion ? { duration: 0.01 } : { duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <h2 ref={(node) => { stepRefs.current[step] = node }} tabIndex={-1} className="corporate-sr-only" id={headingId}>
            {stepLabels[step]} step
          </h2>

          {step === 'brand' ? (
            <div className="corporate-form__section">
              <p className="corporate-form__hint">Choose the restaurant that will receive your reservation request.</p>
              <div className="corporate-choice-grid">
                {BOOKABLE_BRANDS.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setValue('brand', brand, { shouldValidate: true })}
                    className={cn(
                      'corporate-choice-card',
                      brandValue === brand ? 'corporate-choice-card--active' : '',
                    )}
                    aria-pressed={brandValue === brand}
                  >
                    {brandLabelMap[brand]}
                  </button>
                ))}
              </div>
              {errors.brand ? <p className="corporate-form-error">{errors.brand.message}</p> : null}
            </div>
          ) : null}

        {step === 'details' ? (
          <div className="corporate-form__section">
            <div className="corporate-form__grid corporate-form__grid--2">
              <Label.Root className="corporate-field" htmlFor="booking-date">
                Date
                <input
                  id="booking-date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'booking-date-error' : undefined}
                  {...register('date')}
                />
                {errors.date ? <p id="booking-date-error" className="corporate-form-error">{errors.date.message}</p> : null}
              </Label.Root>
              <Label.Root className="corporate-field" htmlFor="booking-time">
                Time
                <input
                  id="booking-time"
                  type="time"
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'booking-time-error' : undefined}
                  {...register('time')}
                />
                {errors.time ? <p id="booking-time-error" className="corporate-form-error">{errors.time.message}</p> : null}
              </Label.Root>
            </div>
            <Label.Root className="corporate-field" htmlFor="booking-party-size">
              Party size
              <input
                id="booking-party-size"
                type="number"
                min={1}
                max={30}
                aria-invalid={Boolean(errors.partySize)}
                aria-describedby={errors.partySize ? 'booking-party-size-error' : undefined}
                {...register('partySize', { valueAsNumber: true })}
              />
              {errors.partySize ? <p id="booking-party-size-error" className="corporate-form-error">{errors.partySize.message}</p> : null}
            </Label.Root>
          </div>
        ) : null}

        {step === 'guest' ? (
          <div className="corporate-form__section">
            <Label.Root className="corporate-field" htmlFor="booking-name">
              Full name
              <input
                id="booking-name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'booking-name-error' : undefined}
                {...register('name')}
              />
              {errors.name ? <p id="booking-name-error" className="corporate-form-error">{errors.name.message}</p> : null}
            </Label.Root>
            <Label.Root className="corporate-field" htmlFor="booking-phone">
              Phone
              <input
                id="booking-phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                {...register('phone')}
              />
              {errors.phone ? <p id="booking-phone-error" className="corporate-form-error">{errors.phone.message}</p> : null}
            </Label.Root>
            <Label.Root className="corporate-field" htmlFor="booking-email">
              Email (optional)
              <input
                id="booking-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'booking-email-error' : undefined}
                {...register('email')}
              />
              {errors.email ? <p id="booking-email-error" className="corporate-form-error">{errors.email.message}</p> : null}
            </Label.Root>
            <Label.Root className="corporate-field" htmlFor="booking-special-requests">
              Special requests (optional)
              <textarea
                id="booking-special-requests"
                rows={4}
                aria-invalid={Boolean(errors.specialRequests)}
                aria-describedby={errors.specialRequests ? 'booking-special-requests-error' : undefined}
                {...register('specialRequests')}
              />
              {errors.specialRequests ? <p id="booking-special-requests-error" className="corporate-form-error">{errors.specialRequests.message}</p> : null}
            </Label.Root>
          </div>
        ) : null}

        {step === 'confirmation' ? (
          <div className="corporate-form__section">
            <p className="corporate-form__hint">Review your request before sending it to {selectedBrandName}.</p>
            <div className="corporate-summary">
              <dl>
                <div className="corporate-summary__row">
                  <dt>Restaurant</dt>
                  <dd>{selectedBrandName}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Date</dt>
                  <dd>{watchedValues.date}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Time</dt>
                  <dd>{watchedValues.time}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Party size</dt>
                  <dd>{watchedValues.partySize}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Guest</dt>
                  <dd>{watchedValues.name}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Phone</dt>
                  <dd>{watchedValues.phone}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Email</dt>
                  <dd>{watchedValues.email || '-'}</dd>
                </div>
                <div className="corporate-summary__row">
                  <dt>Requests</dt>
                  <dd>{watchedValues.specialRequests || '-'}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : null}
        </motion.div>
      </AnimatePresence>

      <div aria-live="polite" className="corporate-form__status-region">
        {statusMessage && successSummary ? (
          <FormStatus
            tone="success"
            title="Booking request sent"
            message={`${statusMessage} ${successSummary.name} - ${successSummary.date} at ${successSummary.time} for ${successSummary.partySize} guests.`}
          />
        ) : null}
        {mutation.isError ? (
          <FormStatus
            tone="error"
            title="Booking not sent"
            message={mutation.error instanceof Error ? mutation.error.message : 'We could not send your booking request right now.'}
          />
        ) : null}
      </div>

      <div className="corporate-form__actions corporate-form__actions--split">
        <button type="button" className="corporate-button corporate-button--secondary" onClick={goBack} disabled={step === 'brand'}>
          Back
        </button>
        {step === 'confirmation' ? (
          <button type="submit" className="corporate-button corporate-button--primary" disabled={mutation.isPending || isSubmitting}>
            {mutation.isPending || isSubmitting ? 'Sending…' : 'Confirm booking'}
          </button>
        ) : (
          <button type="button" className="corporate-button corporate-button--primary" onClick={goNext}>
            Next
          </button>
        )}
      </div>
    </motion.form>
  )
}
