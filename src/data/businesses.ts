import izakayaHokkaidoImage from '../assets/gallery/izakaya/Izakaya1.webp'
import izakaya2 from "../assets/gallery/izakaya/izakaya2.webp"
import izakaya3 from "../assets/gallery/izakaya/izakaya3.webp"
import izakaya4 from "../assets/gallery/izakaya/izakaya4.webp"

import ramenhouse1 from "../assets/gallery/ramenhouse/ramenhouse1.webp"
import ramenhouse2 from "../assets/gallery/ramenhouse/ramenhouse2.webp"
import ramenhouse3 from "../assets/gallery/ramenhouse/ramenhouse3.webp"

import house0 from "../assets/gallery/hokkaidohouse/house0.webp"
import house1 from "../assets/gallery/hokkaidohouse/house1.webp"
import house2 from "../assets/gallery/hokkaidohouse/house2.webp"
import house3 from "../assets/gallery/hokkaidohouse/house3.webp"
import janeichiLogo from '../assets/gallery/janeichi/janeichi-logo.webp'
import hnbgLogoImage from '../assets/logo/hnbg-logo-transparent.png'
import hokkaidoRamenHouseLogo from '../assets/logo/images (3).jpg'
import hokkaidoHouseLogo from '../assets/logo/images.jpg'
import hokkaidoYakitoriLogo from '../assets/logo/images (1).jpg'
import hokkaidoPokharaLogo from '../assets/logo/images (2).jpg'
import hokkaidoDekkaidoLogo from '../assets/logo/Hokkaido Dekkaido.jpg'
import hokkaidoSoraLogo from '../assets/logo/Hokkaido Sora.jpg'
import hokkaidoUmamiLogo from '../assets/logo/Hokkaido Umami.jpg'
import homaNepalLogo from '../assets/logo/HOMA Nepal.jpg'
import izakayaHokkaidoLogo from '../assets/logo/Izakaya Hokkaido.jpg'

import umamiImage from '../assets/gallery/umami/umami1.webp'
import umami2 from '../assets/gallery/umami/umami2.webp'
import umami3 from '../assets/gallery/umami/umami3.webp'
import umami4 from '../assets/gallery/umami/umami4.webp'

import sora1 from "../assets/gallery/sora/sora1.webp"
import sora2 from "../assets/gallery/sora/sora2.webp"
import sora3 from "../assets/gallery/sora/sora3.webp"
import sora4 from "../assets/gallery/sora/sora4.webp"

import pokharaImage from '../assets/gallery/pokhara/pokhara1.webp'
import pokhara2 from "../assets/gallery/pokhara/pokhara2.webp"
import pokhara3 from "../assets/gallery/pokhara/pokhara3.webp"
import pokhara4 from "../assets/gallery/pokhara/pokhara4.webp"

import dekkaidoImage from '../assets/gallery/dekkaido/dekkaido1.webp'
import dekkaido2 from "../assets/gallery/dekkaido/dekkaido2.webp"
import dekkaido3 from "../assets/gallery/dekkaido/dekkaido3.webp"
import dekkaido4 from "../assets/gallery/dekkaido/dekkaido4.webp"

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
  coordinates: {
    lat: number
    lng: number
  } | null
  image: string | null
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

export const hnbgLogo = hnbgLogoImage

export const businesses: Business[] = [
  {
    id: 'hokkaido-ramen-house',
    slug: 'hokkaido-ramen-house',
    name: 'Hokkaido Ramen House',
    category: 'Restaurant',
    address: 'Park Village Resort Premises, Budhanilkantha, Kathmandu, Nepal',
    phone: '9801029928',
    email: 'hokkaidoramenhouse@gmail.com',
    description: `Ramen, rice bowls, and Japanese small plates inside Park Village Resort.`,
    about: `Hokkaido Ramen House opened in 2018 at Park Village Resort in Budhanilkantha. The kitchen focuses on ramen broths, house noodles, donburi, gyoza, karaage, sushi, and seasonal Japanese plates. Its in-house ramen production keeps the bowls consistent across busy family lunches, resort stays, and regular neighborhood visits.`,
    locationSummary: 'Park Village Resort Premises, Budhanilkantha',
    mapQuery: 'Park Village Resort Premises, Budhanilkantha, Kathmandu, Nepal',
    coordinates: null,
    image: ramenhouse1,
    galleryImages: [ramenhouse2, ramenhouse3],
    logo: hokkaidoRamenHouseLogo,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-house',
    slug: 'hokkaido-house',
    name: 'Hokkaido House',
    category: 'Restaurant',
    address: 'Inside International Club, Sanepa, Lalitpur, Nepal',
    phone: '9801029933',
    email: 'hokkaidohouse01@gmail.com',
    description: `Sushi, sashimi, teppanyaki, and private dining at International Club.`,
    about: `Hokkaido House sits inside International Club in Sanepa and is built for longer meals, private gatherings, and business dining. The menu covers sushi, sashimi, ramen, donburi, teppanyaki, grilled seafood, tempura, and seasonal specials. The room keeps the service polished without losing the warmth expected from a neighborhood Japanese restaurant.`,
    locationSummary: 'Inside International Club, Sanepa, Lalitpur',
    mapQuery: 'Inside International Club, Sanepa, Lalitpur, Nepal',
    coordinates: null,
    image: house1,
    galleryImages: [house0, house2, house3],
    logo: hokkaidoHouseLogo,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-umami',
    slug: 'hokkaido-umami',
    name: 'Hokkaido Umami',
    category: 'Restaurant',
    address: '3rd Floor, The Park, Durbarmarg, Kathmandu, Nepal',
    phone: '9705001233',
    email: 'umamibyhokkaido@gmail.com',
    description: `A polished Durbarmarg dining room for sushi, sashimi, and chef-led menus.`,
    about: `Hokkaido Umami is the group's refined dining room at The Park in Durbarmarg. Guests come for sushi, sashimi, seafood, chef specials, and tasting-style menus served in a quieter setting. It is shaped for celebrations, executive dinners, and guests who want a more composed Japanese dining experience.`,
    locationSummary: '3rd Floor, The Park, Durbarmarg, Kathmandu',
    mapQuery: 'Hokkaido Umami, The Park, Durbarmarg, Kathmandu, Nepal',
    coordinates: null,
    image: umamiImage,
    galleryImages: [umamiImage, umami2, umami3, umami4],
    logo: hokkaidoUmamiLogo,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'hokkaido-sora',
    slug: 'hokkaido-sora',
    name: 'Hokkaido Sora',
    category: 'Restaurant',
    address: '10th Floor, Salesberry Tower, Maharajgunj, Kathmandu, Nepal',
    phone: '9707082507',
    email: 'sorabyhokkaido@gmail.com',
    description: `Japanese plates, cocktails, and skyline views from Salesberry Tower.`,
    about: `Hokkaido Sora brings the group to the 10th floor of Salesberry Tower in Maharajgunj. The rooftop setting pairs city views with sushi, contemporary Japanese plates, desserts, cocktails, and premium drinks. It works well for evenings, dates, group dinners, and celebrations that need a livelier room.`,
    locationSummary: '10th Floor, Salesberry Tower, Maharajgunj, Kathmandu',
    mapQuery: 'Hokkaido Sora, Salesberry Tower, Maharajgunj, Kathmandu, Nepal',
    coordinates: null,
    image: sora1,
    galleryImages: [sora1, sora2, sora3, sora4],
    logo: hokkaidoSoraLogo,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'izakaya-hokkaido',
    slug: 'izakaya-hokkaido',
    name: 'Hokkaido Izakaya',
    category: 'Restaurant',
    address: 'Radisson Hotel, Lazimpat, Kathmandu, Nepal',
    phone: '9802343887',
    email: 'izakayahokkaido@gmail.com',
    description: `Yakitori, sake, cocktails, and share plates at Radisson Hotel.`,
    about: `Hokkaido Izakaya is the group's Radisson Hotel concept in Lazimpat. The menu leans into share plates, yakitori, charcoal-grilled dishes, seafood, sake, whisky, and cocktails. It is a social room first: casual dinners, hotel guests, business groups, and late evening plans all fit naturally here.`,
    locationSummary: 'Radisson Hotel, Lazimpat, Kathmandu',
    mapQuery: 'Hokkaido Izakaya, Radisson Hotel, Lazimpat, Kathmandu, Nepal',
    coordinates: null,
    image: izakayaHokkaidoImage,
    galleryImages: [izakayaHokkaidoImage, izakaya2, izakaya3, izakaya4],
    logo: izakayaHokkaidoLogo,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'pokhara',
    slug: 'pokhara',
    name: 'Hokkaido Pokhara',
    category: 'Restaurant',
    address: 'Inside Courtyard by Marriott, Nadipur, Pokhara, Nepal',
    phone: '9712012353',
    email: 'pokharaomakase@gmail.com',
    description: `Japanese dining for Pokhara locals, hotel guests, and travelers.`,
    about: `Hokkaido Pokhara brings the brand outside Kathmandu Valley through Courtyard by Marriott in Nadipur. The restaurant serves hotel guests, travelers, and local diners with sushi, ramen, donburi, grilled dishes, tempura, seafood, and Japanese beverages. The format keeps the menu familiar for Hokkaido regulars while fitting Pokhara's visitor-heavy dining scene.`,
    locationSummary: 'Inside Courtyard by Marriott, Nadipur, Pokhara',
    mapQuery: 'Hokkaido Pokhara, Inside Courtyard by Marriott, Nadipur, Pokhara, Nepal',
    coordinates: null,
    image: pokharaImage,
    galleryImages: [pokharaImage, pokhara2, pokhara3, pokhara4],
    logo: hokkaidoPokharaLogo,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'yakitori',
    slug: 'yakitori',
    name: 'Hokkaido Yakitori',
    category: 'Restaurant',
    address: 'Le Sherpa, Panipokhari, Kathmandu, Nepal',
    phone: '9801011300',
    email: 'yakitori.hokkaido1@gmail.com',
    description: `Charcoal-grilled skewers, Japanese snacks, and casual service at Le Sherpa.`,
    about: `Hokkaido Yakitori is the group's charcoal-grill concept at Le Sherpa in Panipokhari. The kitchen centers on chicken, seafood, vegetables, and premium meats cooked as skewers over charcoal. Small plates, rice dishes, sauces, and drinks round out a focused menu for casual Japanese grilling.`,
    locationSummary: 'Le Sherpa, Panipokhari, Kathmandu',
    mapQuery: 'Hokkaido Yakitori, Le Sherpa, Panipokhari, Kathmandu, Nepal',
    coordinates: null,
    image: yakitori1,
    galleryImages: [yakitori1, yakitori2, yakitori3, yakitori4],
    logo: hokkaidoYakitoriLogo,
    websiteUrl: null,
    featured: false,
    verified: false,
  },
  {
    id: 'dekkaido-farm-house',
    slug: 'dekkaido-farm-house',
    name: 'Hokkaido Dekkaido',
    category: 'Farm & Resort',
    address: 'Chiseni Marg, Budhanilkantha, Kathmandu, Nepal',
    phone: '9801011301',
    email: 'dekkaidoonsen@gmail.com',
    description: `Onsen, resort stays, farming experiences, and dining in Budhanilkantha.`,
    about: `Hokkaido Dekkaido expands the group into hospitality, wellness, and outdoor experiences in Budhanilkantha. The property includes a Japanese-style onsen, resort stays, dining, farming activities, education programs, and recreation for families and groups. It is designed for day visits, relaxed getaways, and corporate retreats close to Kathmandu.`,
    locationSummary: 'Chiseni Marg, Budhanilkantha, Kathmandu',
    mapQuery: 'Hokkaido Dekkaido, Chiseni Marg, Budhanilkantha, Kathmandu, Nepal',
    coordinates: null,
    image: dekkaidoImage,
    galleryImages: [dekkaidoImage, dekkaido2, dekkaido3, dekkaido4],
    logo: hokkaidoDekkaidoLogo,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'hokkaido-mart',
    slug: 'hokkaido-mart',
    name: 'HOMA Nepal',
    category: 'Retail',
    address: 'Kamaladi, Kathmandu, Nepal',
    phone: '9801011304',
    email: 'homanepal@gmail.com',
    description: `Japanese skincare, pantry goods, snacks, and daily lifestyle products.`,
    about: `HOMA Nepal is the group's Japanese retail shop in Kamaladi. The shelves focus on skincare, cosmetics, sauces, snacks, beverages, pantry ingredients, kitchenware, wellness items, and household goods. It serves everyday shoppers as well as businesses looking for reliable Japanese products in Nepal.`,
    locationSummary: 'Kamaladi, Kathmandu',
    mapQuery: 'HOMA Nepal, Kamaladi, Kathmandu, Nepal',
    coordinates: null,
    image: homaNepalLogo,
    galleryImages: [homaNepalLogo],
    logo: homaNepalLogo,
    websiteUrl: null,
    featured: true,
    verified: false,
  },
  {
    id: 'janeichi',
    slug: 'janeichi',
    name: 'Janeichi Business',
    category: 'Trading',
    address: 'Bansbari, Kathmandu, Nepal',
    phone: '9801011303',
    email: null,
    description: `Import, sourcing, and distribution support for the group's Japanese products.`,
    about: `Janeichi Business handles sourcing, import, and trading for Hokkaido Group from Bansbari. The division works with Japanese suppliers for ingredients, sauces, beverages, seafood, restaurant supplies, cosmetics, retail goods, and specialty food items. It supports the group's own outlets and distributes selected Japanese products to other businesses in Nepal.`,
    locationSummary: 'Bansbari, Kathmandu',
    mapQuery: 'Janeichi Business, Bansbari, Kathmandu, Nepal',
    coordinates: null,
    image: janeichiLogo,
    galleryImages: [janeichiLogo],
    logo: janeichiLogo,
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
