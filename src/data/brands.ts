export type Brand = {
  name: string
  concept: string
  location: string
  description: string
  detail: string
  highlights: string[]
  slug: string
}

export const brands: Brand[] = [
  {
    name: 'Hokkaido Ramen House',
    concept: 'Japanese comfort dining',
    location: 'Budhanilkantha and Thamel',
    description: 'Warm ramen rooms built around broth, noodles, quick service, and reliable hospitality.',
    detail:
      'The group-facing entry brand: approachable Japanese dining, strong lunch and dinner demand, and repeatable service standards across hotel and street-facing venues.',
    highlights: ['Ramen and rice bowls', 'Casual dining', 'Multiple outlets'],
    slug: 'ramen-house',
  },
  {
    name: 'Hokkaido House',
    concept: 'All-day Japanese restaurant',
    location: 'Sanepa, Lalitpur',
    description: 'A polished dining house for families, groups, and guests looking for a broader Japanese menu.',
    detail:
      'This concept should carry the flagship restaurant story: atmosphere, menu variety, hospitality standards, and space for group dining.',
    highlights: ['Family dining', 'Private tables', 'Signature Japanese menu'],
    slug: 'hokkaido-house',
  },
  {
    name: 'Izakaya Hokkaido',
    concept: 'Hotel dining and evening plates',
    location: 'Lazimpat',
    description: 'A quieter izakaya format for hotel guests, after-work dinners, and refined shared plates.',
    detail:
      'The tone should be intimate and service-led, with emphasis on beverages, shared plates, hotel convenience, and evening reservations.',
    highlights: ['Shared plates', 'Hotel venue', 'Dinner-led service'],
    slug: 'izakaya',
  },
  {
    name: 'Omakase',
    concept: 'Chef-led counter experience',
    location: 'Naxal',
    description: 'A premium tasting-counter format for guests who want a focused, reservation-led meal.',
    detail:
      'This page should feel more exclusive: chef selection, seasonal ingredients, limited seats, and clear reservation expectations.',
    highlights: ['Chef selection', 'Limited seating', 'Reservation preferred'],
    slug: 'omakase',
  },
  {
    name: 'Hokkaido Bento House',
    concept: 'Fast casual and takeaway',
    location: 'Bauddha',
    description: 'Compact Japanese meals designed for daily dining, takeaway, and dependable service.',
    detail:
      'This concept supports volume and convenience while keeping the Hokkaido quality language visible in packaging, menu, and service.',
    highlights: ['Bento meals', 'Takeaway', 'Daily dining'],
    slug: 'bento-house',
  },
  {
    name: 'Catering and Partnerships',
    concept: 'Events, supply, and growth',
    location: 'Kathmandu Valley',
    description: 'Private dining, catering, imports, and future franchise conversations handled by the group office.',
    detail:
      'This is the group development page: suitable for event inquiries, corporate meals, partner venues, supply, and expansion leads.',
    highlights: ['Event menus', 'Corporate meals', 'Partner inquiries'],
    slug: 'catering-partnerships',
  },
]
