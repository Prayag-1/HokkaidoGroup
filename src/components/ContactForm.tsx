import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormStatus } from './FormStatus'
import { SelectField } from './SelectField'
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
].map((option) => ({ value: option, label: option }))

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
      reset()
    },
    onError: () => {
      setStatusMessage(null)
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    if (values._gotcha && values._gotcha.length > 0) {
      return
    }

    setStatusMessage(null)
    mutation.reset()
    mutation.mutate(values)
  }

  return (
    <motion.form
      className={cn('corporate-panel corporate-form', className)}
      onSubmit={handleSubmit(onSubmit)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.25, ease: [0.2, 0, 0, 1] }}
    >
      <input type="hidden" name="_subject" value="New Hokkaido Group contact inquiry" />
      <input type="text" {...register('_gotcha')} tabIndex={-1} autoComplete="off" className="corporate-honeypot" aria-hidden="true" />

      <p className="corporate-eyebrow">Send a message</p>

      <Label.Root className="corporate-field" htmlFor="contact-name">
        Name
        <input
          id="contact-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name ? <p id="contact-name-error" className="corporate-form-error">Please enter your name.</p> : null}
      </Label.Root>

      <Label.Root className="corporate-field" htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email ? <p id="contact-email-error" className="corporate-form-error">Please enter a valid email.</p> : null}
      </Label.Root>

      <Label.Root className="corporate-field" htmlFor="contact-phone">
        Phone
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
        />
      </Label.Root>

      <div>
        <Controller
          control={control}
          name="brand"
          render={({ field }) => (
            <SelectField
              id="contact-brand"
              label="Brand"
              value={field.value}
              placeholder="Select who this is for"
              options={brandOptions}
              error={errors.brand ? 'Please select who this is for.' : undefined}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>

      <Label.Root className="corporate-field" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message ? <p id="contact-message-error" className="corporate-form-error">Please share a bit more about your inquiry.</p> : null}
      </Label.Root>

      <div aria-live="polite" className="corporate-form__status-region">
        {statusMessage ? <FormStatus tone="success" title="Message sent" message={statusMessage} /> : null}
        {mutation.isError ? (
          <FormStatus
            tone="error"
            title="Message not sent"
            message={mutation.error instanceof Error ? mutation.error.message : 'Something went wrong while sending your message.'}
          />
        ) : null}
      </div>

      <div className="corporate-form__actions">
        <button type="submit" className="corporate-button corporate-button--primary" disabled={mutation.isPending || isSubmitting}>
          {mutation.isPending || isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </motion.form>
  )
}

