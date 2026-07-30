import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name.').max(80),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  brand: z.string().min(1, 'Please select who this is for.'),
  message: z.string().min(10, 'Please share a bit more about your inquiry.').max(1000),
  _gotcha: z.string().max(0).optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const BOOKABLE_BRANDS = [
  'hokkaido-ramen-house',
  'hokkaido-house',
  'hokkaido-yakitori',
  'hokkaido-izakaya',
  'hokkaido-umami',
  'hokkaido-sora',
  'hokkaido-pokhara',
] as const

export const bookingFormSchema = z.object({
  brand: z.enum(BOOKABLE_BRANDS, {
    errorMap: () => ({ message: 'Please choose a restaurant' }),
  }),
  date: z.string().refine((val) => new Date(val) >= new Date(new Date().toDateString()), {
    message: 'Date cannot be in the past',
  }),
  time: z.string().min(1, 'Please choose a time'),
  partySize: z.coerce.number().int().min(1).max(30),
  name: z.string().min(2).max(80),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  specialRequests: z.string().max(500).optional(),
  _gotcha: z.string().max(0).optional(),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>

export const bookingStepSchemas = {
  brand: bookingFormSchema.pick({ brand: true }),
  details: bookingFormSchema.pick({ date: true, time: true, partySize: true }),
  guest: bookingFormSchema.pick({ name: true, phone: true, email: true, specialRequests: true }),
}
