import izakayaHokkaidoImage from '../assets/gallery/izakaya/Izakaya1.jpg'
import izakaya2 from "../assets/gallery/izakaya/izakaya2.jpg"
import izakaya3 from "../assets/gallery/izakaya/izakaya3.jpg"
import izakaya4 from "../assets/gallery/izakaya/izakaya4.jpg"


import ramenhouse1 from "../assets/gallery/ramenhouse/ramenhouse1.webp"
import ramenhouse2 from "../assets/gallery/ramenhouse/ramenhouse2.webp"
import ramenhouse3 from "../assets/gallery/ramenhouse/ramenhouse3.webp"

import house0 from "../assets/gallery/hokkaidohouse/house0.webp"
import house1 from "../assets/gallery/hokkaidohouse/house1.webp"
import house2 from "../assets/gallery/hokkaidohouse/house2.webp"
import house3 from "../assets/gallery/hokkaidohouse/house3.webp"

import umamiImage from '../assets/gallery/umami/umami1.jpg'
import umami2 from '../assets/gallery/umami/umami2.webp'
import umami3 from '../assets/gallery/umami/umami3.webp'
import umami4 from '../assets/gallery/umami/umami4.webp'

import sora1 from "../assets/gallery/sora/sora1.webp"
import sora2 from "../assets/gallery/sora/sora2.webp"
import sora3 from "../assets/gallery/sora/sora3.webp"
import sora4 from "../assets/gallery/sora/sora4.webp"

import pokharaImage from '../assets/gallery/pokhara/pokhara1.jpg'
import pokhara2 from "../assets/gallery/pokhara/pokhara2.jpg"
import pokhara3 from "../assets/gallery/pokhara/pokhara3.jpg"
import pokhara4 from "../assets/gallery/pokhara/pokhara4.jpg"

import dekkaidoImage from '../assets/gallery/dekkaido/dekkaido1.jpg'
import dekkaido2 from "../assets/gallery/dekkaido/dekkaido2.jpg"
import dekkaido3 from "../assets/gallery/dekkaido/dekkaido3.jpg"
import dekkaido4 from "../assets/gallery/dekkaido/dekkaido4.jpg"

import yakitori1 from "../assets/gallery/yakitori/yakitori1.webp"
import yakitori2 from "../assets/gallery/yakitori/yakitori2.webp"
import yakitori3 from "../assets/gallery/yakitori/yakitori3.webp"
import yakitori4 from "../assets/gallery/yakitori/yakitori4.webp"


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
  about: string | null
  locationSummary: string | null
  mapQuery: string | null
  image: string
  galleryImages: string[]
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
    address: 'Park Village - Budhanilkantha Kathmandu, Nepal',
    phone: '9801029928',
    email: 'hokkaidoramenhouse@gmail.com',
    description: null,
    about: null,
    locationSummary: 'Park Village Resort, Budhanilkantha',
    mapQuery: 'Park Village Resort, Budhanilkantha, Kathmandu, Nepal',
    image: ramenhouse1,
    galleryImages: [ramenhouse2,ramenhouse3],
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
    address: "Sanepa, Lalitpur, Nepal",
    phone: "980-1029933",
    email: "hokkaidohouse01@gmail.com",
    description: null,
    about: null,
    locationSummary: 'International Club, Sanepa, Lalitpur',
    mapQuery: "International Club, Lalitpur 44600",
    image: house1,
    galleryImages: [house0,house3],
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-umami',
    slug: 'hokkaido-umami',
    name: 'Hokkaido Umami',
    category: 'Restaurant',
    address: "The Park -2nd Floor, Kathmandu",
    phone: "9705001233",
    email: null,
    description: null,
    about: null,
    locationSummary: 'The Park -2nd Floor, Durbarmarg, Kathmandu',
    mapQuery: "Hokkaido Umami",
    image: umamiImage,
    galleryImages: [umamiImage,umami2,umami3,umami4],
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'hokkaido-sora',
    slug: 'hokkaido-sora',
    name: 'Hokkaido SORA',
    category: 'Restaurant',
    address: "Salesberry Tower, Maharajgunj, Kathmandu",
    phone: "9801234894",
    email: null,
    description: null,
    about: null,
    locationSummary: 'Salesberry Tower, Maharajgunj, Kathmandu ',
    mapQuery: "Hokkaido Sora",
    image: sora1,
    galleryImages: [sora1,sora2,sora3,sora4],
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'izakaya-hokkaido',
    slug: 'izakaya-hokkaido',
    name: 'Hokkaido Izakaya',
    category: 'Restaurant',
    address: 'Radisson Hotel, Lazimpat, Kathmandu',
    phone: " 9802343887",
    email: "izkaya@gmail.com",
    description: null,
    about:
      "Izakaya Hokkaido is a quieter, evening-led dining room focused on shared plates, drinks, and a slower pace for long meals. The space is positioned as hotel dining with a more intimate atmosphere than the group's everyday restaurant formats.",
    locationSummary: 'Radisson Hotel, Lazimpat, Kathmandu',
    mapQuery: 'IZAKAYA HOKKAIDO',
    image: izakayaHokkaidoImage,
    galleryImages: [izakayaHokkaidoImage,izakaya2,izakaya3,izakaya4],
    logo: null,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'pokhara',
    slug: 'pokhara',
    name: 'Hokkaido Pokhara',
    category: 'Restaurant',
    address: null,
    phone: null,
    email: null,
    description: null,
    about: null,
    locationSummary: 'Location pending verification',
    mapQuery: "Hokkaido Pokhara",
    image: pokharaImage,
    galleryImages: [pokharaImage,pokhara2,pokhara3,pokhara4],
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'yakitori',
    slug: 'yakitori',
    name: 'Hokkaido YAKITORI',
    category: 'Restaurant',
    address: "Le Sherpa, Kathmandu ",
    phone: "9801011300",
    email: null,
    description: null,
    about: null,
    locationSummary: 'Le Sherpa, Lazimpat, Kathmandu',
    mapQuery: "Yakitori Hokkaido",
    image: yakitori1,
    galleryImages: [yakitori1,yakitori2,yakitori3,yakitori4 ],
    logo: null,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'dekkaido-farm-house',
    slug: 'dekkaido-farm-house',
    name: 'Hokkaido Dekkaido',
    category: 'Farm & Resort',
    address: null,
    phone: null,
    email: null,
    description: null,
    about: null,
    locationSummary: 'Location pending verification',
    mapQuery: "Hokkaido Dekkaido",
    image: dekkaidoImage,
    galleryImages: [dekkaidoImage,dekkaido2,dekkaido3,dekkaido4],
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
    about: null,
    locationSummary: 'Location pending verification',
    mapQuery: "Hokkaido Mart",
    image: '/gallery/people-01.svg',
    galleryImages: ['/gallery/people-01.svg'],
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
    about: null,
    locationSummary: 'Location pending verification',
    mapQuery: "Janeichi Business",
    image: '/gallery/people-02.svg',
    galleryImages: ['/gallery/people-02.svg'],
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
