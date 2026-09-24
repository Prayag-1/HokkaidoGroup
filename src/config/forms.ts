export const formEndpoints = {
  booking: import.meta.env.VITE_FORMSPREE_BOOKING_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_BOOKING_ID}`
    : '',
  contact: import.meta.env.VITE_FORMSPREE_CONTACT_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`
    : '',
} as const
