import { BOOKABLE_BRANDS } from './schemas'

// Free-tier Formspree forms are capped at 50 submissions/month per form, so a busy outlet hitting the cap would fail silently unless the endpoint is updated.
export const BOOKING_FORM_ENDPOINTS: Record<(typeof BOOKABLE_BRANDS)[number], string> = {
  'hokkaido-ramen-house': import.meta.env.VITE_FORMSPREE_RAMEN_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_RAMEN_ID}`
    : 'https://formspree.io/f/your-ramen-form-id',
  'hokkaido-house': import.meta.env.VITE_FORMSPREE_HOUSE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_HOUSE_ID}`
    : 'https://formspree.io/f/your-house-form-id',
  'hokkaido-yakitori': import.meta.env.VITE_FORMSPREE_YAKITORI_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_YAKITORI_ID}`
    : 'https://formspree.io/f/your-yakitori-form-id',
  'hokkaido-izakaya': import.meta.env.VITE_FORMSPREE_IZAKAYA_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_IZAKAYA_ID}`
    : 'https://formspree.io/f/your-izakaya-form-id',
  'hokkaido-umami': import.meta.env.VITE_FORMSPREE_UMAMI_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_UMAMI_ID}`
    : 'https://formspree.io/f/your-umami-form-id',
  'hokkaido-sora': import.meta.env.VITE_FORMSPREE_SORA_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_SORA_ID}`
    : 'https://formspree.io/f/your-sora-form-id',
  'hokkaido-pokhara': import.meta.env.VITE_FORMSPREE_POKHARA_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_POKHARA_ID}`
    : 'https://formspree.io/f/your-pokhara-form-id',
}

export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_CONTACT_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`
  : 'https://formspree.io/f/your-contact-form-id'
