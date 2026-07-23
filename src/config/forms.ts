const formspreeBase = 'https://formspree.io/f/'

export const formEndpoints = {
  booking: import.meta.env.VITE_FORMSPREE_BOOKING_ID
    ? `${formspreeBase}${import.meta.env.VITE_FORMSPREE_BOOKING_ID}`
    : `${formspreeBase}your-booking-form-id`,
  contact: import.meta.env.VITE_FORMSPREE_CONTACT_ID
    ? `${formspreeBase}${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`
    : `${formspreeBase}your-contact-form-id`,
} as const
