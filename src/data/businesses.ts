export type BusinessCategory = 'Restaurant' | 'Retail' | 'Trading' | 'Farm & Resort'

export type Business = {
  id: string
  slug: string
  name: string
  category: BusinessCategory
  address: string | null
  phone: string | null
  email: string | null
  description: string | null
  locationSummary: string | null
  image: string
  logo: string | null
  websiteUrl: string | null
  featured: boolean
  verified: boolean
}

export type CorporateContact = {
  name: string
  address: string | null
  phone: string | null
  email: string | null
  socialLinks: {
    label: string
    url: string
    verified: boolean
  }[]
  verified: boolean
}

export const hnbgCorporateContact: CorporateContact = {
  name: 'Hokkaido Nepal Business Group',
  address: null,
  phone: null,
  email: null,
  socialLinks: [],
  verified: false,
}

export const businesses: Business[] = [
  {
    id: 'hokkaido-ramen-house',
    slug: 'hokkaido-ramen-house',
    name: 'Hokkaido Ramen House',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/food-01.svg',
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-house',
    slug: 'hokkaido-house',
    name: 'Hokkaido House',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/interior-01.svg',
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-bento-house',
    slug: 'hokkaido-bento-house',
    name: 'Hokkaido Bento House',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/food-02.svg',
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'hokkaido-qx',
    slug: 'hokkaido-qx',
    name: 'Hokkaido QX',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/interior-02.svg',
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'izakaya-hokkaido',
    slug: 'izakaya-hokkaido',
    name: 'Izakaya Hokkaido',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/interior-02.svg',
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'omakase',
    slug: 'omakase',
    name: 'Omakase',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/food-03.svg',
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'dekkaido-farm-house',
    slug: 'dekkaido-farm-house',
    name: 'Dekkaido Farm House',
    category: 'Farm & Resort',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/farm-01.svg',
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-mart',
    slug: 'hokkaido-mart',
    name: 'Hokkaido Mart',
    category: 'Retail',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/people-01.svg',
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'janeichi',
    slug: 'janeichi',
    name: 'Janeichi',
    category: 'Trading',
    address: null,
    phone: null,
    email: null,
    description: null,
    locationSummary: 'Location pending verification',
    image: '/gallery/people-02.svg',
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
]

export const businessCategories: BusinessCategory[] = ['Restaurant', 'Retail', 'Trading', 'Farm & Resort']

export const featuredBusinesses = businesses.filter((business) => business.featured)

export function getBusinessBySlug(slug: string) {
  return businesses.find((business) => business.slug === slug)
}
