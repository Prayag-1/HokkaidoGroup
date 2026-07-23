export type LocationEntry = {
  brand: string
  brandSlug: string
  venue: string
  area: string
  lat: number | null
  lng: number | null
}

export const locations: LocationEntry[] = [
  {
    brand: 'Hokkaido Ramen House',
    brandSlug: 'ramen-house',
    venue: 'Park Village Resort',
    area: 'Budhanilkantha',
    lat: null,
    lng: null,
  },
  {
    brand: 'Hokkaido Ramen House',
    brandSlug: 'ramen-house',
    venue: 'Kathmandu Guest House',
    area: 'Thamel',
    lat: null,
    lng: null,
  },
  {
    brand: 'Hokkaido House',
    brandSlug: 'hokkaido-house',
    venue: 'Hokkaido House',
    area: 'Sanepa, Lalitpur',
    lat: null,
    lng: null,
  },
  {
    brand: 'Izakaya Hokkaido',
    brandSlug: 'izakaya',
    venue: 'Radisson Hotel',
    area: 'Lazimpat',
    lat: null,
    lng: null,
  },
  {
    brand: 'Omakase',
    brandSlug: 'omakase',
    venue: 'Omakase',
    area: 'Naxal',
    lat: null,
    lng: null,
  },
  {
    brand: 'Hokkaido Bento House',
    brandSlug: 'bento-house',
    venue: 'Hokkaido Bento House',
    area: 'Bauddha',
    lat: null,
    lng: null,
  },
]
