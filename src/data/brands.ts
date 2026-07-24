export type Brand = {
  name: string
  concept: string
  location: string
  description: string
  detail: string
  highlights: string[]
  slug: string
  image: string
}

export const brands: Brand[] = [
  {
    name: 'Hokkaido Ramen House',
    concept: 'Restaurant',
    location: 'Budhanilkantha and Thamel',
    description: 'Signature ramen, rice bowls, and Japanese comfort plates served in warm neighborhood rooms.',
    detail:
      'The everyday dining brand of the group: approachable, lively, dependable, and built for guests who return for familiar bowls and attentive service.',
    highlights: ['Ramen and rice bowls', 'Casual dining', 'Multiple outlets'],
    slug: 'ramen-house',
    image: '/gallery/food-01.svg',
  },
  {
    name: 'Hokkaido House',
    concept: 'Restaurant',
    location: 'Sanepa, Lalitpur',
    description: 'An all-day Japanese restaurant for families, long lunches, celebrations, and group dining.',
    detail:
      'The flagship dining room carries the fuller hospitality story: broader menus, polished interiors, private tables, and relaxed pacing.',
    highlights: ['Family dining', 'Private tables', 'Signature Japanese menu'],
    slug: 'hokkaido-house',
    image: '/gallery/interior-01.svg',
  },
  {
    name: 'Izakaya Hokkaido',
    concept: 'Restaurant',
    location: 'Lazimpat',
    description: 'Hotel dining with shared plates, evening drinks, and a quieter room for longer meals.',
    detail:
      'This concept is intimate and service-led, with emphasis on beverages, shared plates, hotel convenience, and evening reservations.',
    highlights: ['Shared plates', 'Hotel venue', 'Dinner-led service'],
    slug: 'izakaya',
    image: '/gallery/interior-02.svg',
  },
  {
    name: 'Omakase',
    concept: 'Restaurant',
    location: 'Naxal',
    description: 'A chef-led counter experience built around seasonal choices, limited seats, and calm service.',
    detail:
      'The most reservation-led format in the group, designed for guests who want a focused meal, seasonal ingredients, and direct chef attention.',
    highlights: ['Chef selection', 'Limited seating', 'Reservation preferred'],
    slug: 'omakase',
    image: '/gallery/food-03.svg',
  },
  {
    name: 'Hokkaido Bento House',
    concept: 'Restaurant',
    location: 'Bauddha',
    description: 'Fast casual bento meals for daily dining, takeaway, office lunches, and quick service.',
    detail:
      'A compact format that supports convenience while keeping the group standard visible in packaging, menu design, and staff care.',
    highlights: ['Bento meals', 'Takeaway', 'Daily dining'],
    slug: 'bento-house',
    image: '/gallery/food-02.svg',
  },
  {
    name: 'Hokkaido Events',
    concept: 'Catering',
    location: 'Kathmandu Valley',
    description: 'Private dining, catering, imports, and partnership conversations handled by the group office.',
    detail:
      'This is the group development arm for event inquiries, corporate meals, partner venues, supply, and future expansion leads.',
    highlights: ['Event menus', 'Corporate meals', 'Partner inquiries'],
    slug: 'catering-partnerships',
    image: '/gallery/people-01.svg',
  },
]
