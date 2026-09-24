import { BOOKABLE_BRANDS } from './schemas'

// Free-tier Formspree forms are capped at 50 submissions/month per form, so a busy outlet hitting the cap would fail silently unless the endpoint is updated.
export const BOOKING_FORM_ENDPOINTS: Record<(typeof BOOKABLE_BRANDS)[number], string> = {
  'hokkaido-ramen-house': import.meta.env.VITE_FORMSPREE_RAMEN_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_RAMEN_ID}`
    : '',
  'hokkaido-house': import.meta.env.VITE_FORMSPREE_HOUSE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_HOUSE_ID}`
    : '',
  'hokkaido-express': import.meta.env.VITE_FORMSPREE_EXPRESS_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_EXPRESS_ID}`
    : '',
  'hokkaido-asian-cuisine': import.meta.env.VITE_FORMSPREE_ASIAN_CUISINE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ASIAN_CUISINE_ID}`
    : '',
  'hokkaido-umami': import.meta.env.VITE_FORMSPREE_UMAMI_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_UMAMI_ID}`
    : '',
  'hokkaido-sora': import.meta.env.VITE_FORMSPREE_SORA_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_SORA_ID}`
    : '',
  'hokkaido-pokhara': import.meta.env.VITE_FORMSPREE_POKHARA_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_POKHARA_ID}`
    : '',
}

export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_CONTACT_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`
  : ''
