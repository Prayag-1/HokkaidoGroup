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

export const businesses: Business[] = [
  {
    id: 'hokkaido-ramen-house',
    slug: 'hokkaido-ramen-house',
    name: 'Hokkaido Ramen House',
    category: 'Restaurant',
    address: 'Park Village Resort, Budhanilkantha, Kathmandu, Nepal',
    phone: '9801029928',
    email: 'hokkaidoramenhouse@gmail.com',
    description: `Freshly prepared Japanese ramen and comforting bowls at Park Village Resort.`,
    about: `Located within Park Village Resort Premises in Budhanilkantha, Kathmandu, Hokkaido Ramen House is Nepal's first authentic Japanese restaurant, established in 2018 and introducing genuine Japanese ramen culture to the country. Renowned for its handcrafted ramen, the restaurant specializes in rich slow-cooked broths, freshly made noodles, premium toppings, and authentic Japanese recipes prepared using traditional techniques. One of its greatest distinctions is operating its own in-house ramen production facility, ensuring freshness and consistency in every bowl served. Alongside its signature ramen, guests can enjoy sushi, donburi, gyoza, karaage, Japanese appetizers, and seasonal chef specials crafted with premium ingredients. The warm Japanese-inspired interiors and attentive hospitality create an inviting atmosphere for families, professionals, and food enthusiasts alike. Every dish reflects Hokkaido Group's commitment to authenticity, quality, and craftsmanship while introducing diners to the true flavors of Japan. Today, Hokkaido Ramen House remains one of Nepal's most recognized Japanese restaurants and continues to set the benchmark for authentic Japanese dining experiences.`,
    locationSummary: 'Park Village Resort, Budhanilkantha',
    mapQuery: 'Park Village Resort, Budhanilkantha, Kathmandu, Nepal',
    coordinates: null,
    image: ramenhouse1,
    galleryImages: [ramenhouse2, ramenhouse3],
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
    address: 'International Club, Sanepa, Lalitpur, Nepal',
    phone: '9801029933',
    email: 'hokkaidohouse01@gmail.com',
    description: `Elegant Japanese dining with sushi, sashimi, and teppanyaki inside the International Club.`,
    about: `Located inside the International Club in Sanepa, Lalitpur, Hokkaido House was established as the third restaurant under Hokkaido Group, bringing premium Japanese dining to one of the city's most prestigious locations. The restaurant offers a comprehensive Japanese culinary experience featuring sushi, sashimi, ramen, donburi, teppanyaki, grilled seafood, tempura, rice bowls, and seasonal specialties. Its specialty lies in combining authentic Japanese flavors with elegant presentation and premium-quality ingredients sourced to international standards. The sophisticated interiors provide an ideal setting for business lunches, family gatherings, celebrations, and intimate dining occasions. Every meal is prepared with precision by experienced chefs dedicated to preserving authentic Japanese cooking techniques. Guests enjoy exceptional hospitality, consistency, and an immersive dining experience that reflects Japan's rich culinary heritage. Hokkaido House continues to be one of the leading destinations for authentic Japanese cuisine in Lalitpur and the Kathmandu Valley.`,
    locationSummary: 'International Club, Sanepa, Lalitpur',
    mapQuery: 'International Club, Sanepa, Lalitpur 44600, Nepal',
    coordinates: null,
    image: house1,
    galleryImages: [house0, house2, house3],
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
    address: '3rd Floor, The Park, Durbarmarg, Kathmandu, Nepal',
    phone: '9705001233',
    email: 'umamibyhokkaido@gmail.com',
    description: `Refined Japanese fine dining built around umami-rich sushi, sashimi, and tasting menus.`,
    about: `Located on the 3rd Floor of The Park in Durbarmarg, Kathmandu, Hokkaido Umami represents Hokkaido Group's premium fine dining concept, celebrating the rich "umami" flavors that define authentic Japanese cuisine. The restaurant specializes in premium sushi, sashimi, seafood, signature chef creations, beautifully crafted tasting menus, and contemporary Japanese culinary experiences. Every dish is thoughtfully prepared to highlight the natural richness of carefully selected ingredients while preserving traditional Japanese cooking philosophies. Elegant interiors, refined presentation, and exceptional hospitality create an atmosphere perfect for celebrations, executive dining, and luxury culinary experiences. Hokkaido Umami blends authentic flavors with modern creativity, offering guests a sophisticated journey through Japanese gastronomy. It has quickly established itself as one of Kathmandu's finest destinations for premium Japanese fine dining.`,
    locationSummary: '3rd Floor, The Park, Durbarmarg, Kathmandu',
    mapQuery: 'Hokkaido Umami, The Park, Durbarmarg, Kathmandu, Nepal',
    coordinates: null,
    image: umamiImage,
    galleryImages: [umamiImage, umami2, umami3, umami4],
    logo: null,
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
    description: `Rooftop Japanese dining and cocktails with skyline views in Maharajgunj.`,
    about: `Located on the 10th Floor of Salesberry Tower in Maharajgunj, Kathmandu, Hokkaido Sora is the seventh restaurant under Hokkaido Group, offering a contemporary Japanese dining and nightlife experience with stunning city views. Inspired by the Japanese word Sora, meaning "sky," the restaurant combines modern architecture, creative cuisine, handcrafted cocktails, and premium hospitality in a stylish rooftop setting. Its specialties include contemporary Japanese fusion dishes, sushi, premium beverages, signature cocktails, creative small plates, and beautifully presented desserts. The elegant interiors and vibrant ambiance make it an ideal destination for casual dining, celebrations, romantic evenings, and social gatherings. Every menu has been carefully curated to balance authentic Japanese flavors with modern culinary innovation. Hokkaido Sora delivers a unique dining experience where exceptional cuisine, breathtaking surroundings, and Japanese hospitality come together seamlessly.`,
    locationSummary: '10th Floor, Salesberry Tower, Maharajgunj, Kathmandu',
    mapQuery: 'Hokkaido Sora, Salesberry Tower, Maharajgunj, Kathmandu, Nepal',
    coordinates: null,
    image: sora1,
    galleryImages: [sora1, sora2, sora3, sora4],
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
    address: 'Radisson Hotel, Lazimpat, Kathmandu, Nepal',
    phone: '9802343887',
    email: 'izakayahokkaido@gmail.com',
    description: `Vibrant Japanese izakaya dining with yakitori, sake, and cocktails at Radisson Hotel.`,
    about: `Located within Radisson Hotel, Lazimpat, Kathmandu, Hokkaido Izakaya was launched as the fourth concept under Hokkaido Group, introducing the vibrant atmosphere of traditional Japanese izakaya dining to Nepal. Inspired by Japan's famous after-work pubs, the restaurant specializes in Japanese tapas, charcoal-grilled dishes, yakitori, fresh seafood, handcrafted cocktails, premium sake, Japanese whisky, and an extensive beverage selection. Guests are encouraged to share small plates while enjoying a lively social atmosphere that captures the authentic spirit of Japanese nightlife. Every dish is prepared using traditional cooking techniques and premium ingredients that highlight bold Japanese flavors. The restaurant combines contemporary hospitality with authentic Japanese culture, making it an ideal venue for casual dinners, celebrations, business gatherings, and evening entertainment. Hokkaido Izakaya offers an unforgettable experience where exceptional food, premium drinks, and warm hospitality come together in one destination.`,
    locationSummary: 'Radisson Hotel, Lazimpat, Kathmandu',
    mapQuery: 'Hokkaido Izakaya, Radisson Hotel, Lazimpat, Kathmandu, Nepal',
    coordinates: null,
    image: izakayaHokkaidoImage,
    galleryImages: [izakayaHokkaidoImage, izakaya2, izakaya3, izakaya4],
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
    address: 'Courtyard by Marriott, Nadipur, Pokhara, Nepal',
    phone: '9712012353',
    email: 'pokharaomakase@gmail.com',
    description: `Authentic Japanese cuisine overlooking Nepal's premier lakeside tourism hub.`,
    about: `Located inside Courtyard by Marriott in Nadipur, Pokhara, Hokkaido Pokhara marks Hokkaido Group's expansion beyond the Kathmandu Valley, bringing authentic Japanese cuisine to Nepal's leading tourism destination. Designed to serve both local diners and international visitors, the restaurant offers an exceptional menu featuring sushi, ramen, donburi, grilled dishes, tempura, seafood, Japanese beverages, and seasonal chef specialties. Every meal is prepared using premium ingredients while maintaining the authenticity and consistency that define the Hokkaido brand. The elegant interiors, welcoming atmosphere, and attentive hospitality provide guests with an unforgettable Japanese dining experience in Pokhara. Whether visiting for lunch, dinner, celebrations, or business meetings, customers can expect world-class service and authentic flavors. Hokkaido Pokhara continues to strengthen the group's vision of making genuine Japanese cuisine accessible across Nepal.`,
    locationSummary: 'Courtyard by Marriott, Nadipur, Pokhara',
    mapQuery: 'Hokkaido Pokhara, Courtyard by Marriott, Nadipur, Pokhara, Nepal',
    coordinates: null,
    image: pokharaImage,
    galleryImages: [pokharaImage, pokhara2, pokhara3, pokhara4],
    logo: null,
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
    description: `Charcoal-grilled yakitori and authentic Japanese street food at Le Sherpa.`,
    about: `Located at Le Sherpa, Panipokhari, Kathmandu, Hokkaido Yakitori became the fifth restaurant under Hokkaido Group, dedicated to the art of traditional Japanese charcoal grilling. The restaurant specializes in authentic yakitori, featuring carefully selected cuts of chicken, seafood, vegetables, and premium meats grilled over charcoal to achieve the signature smoky flavor that defines Japanese street dining. Guests can also enjoy Japanese appetizers, rice dishes, signature sauces, and beverages carefully curated to complement every meal. The intimate atmosphere recreates the warmth of traditional Japanese eateries while delivering premium hospitality and exceptional service. Every skewer is handcrafted with precision, ensuring authenticity and consistency in every bite. Hokkaido Yakitori has become a favorite destination for diners seeking a unique and genuine Japanese grilling experience within Kathmandu.`,
    locationSummary: 'Le Sherpa, Panipokhari, Kathmandu',
    mapQuery: 'Hokkaido Yakitori, Le Sherpa, Panipokhari, Kathmandu, Nepal',
    coordinates: null,
    image: yakitori1,
    galleryImages: [yakitori1, yakitori2, yakitori3, yakitori4],
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
    address: 'Chiseni Marg, Budhanilkantha, Kathmandu, Nepal',
    phone: '9801011301',
    email: 'dekkaidoonsen@gmail.com',
    description: `Nepal's authentic Japanese onsen, paired with resort stays and multi-cuisine dining amid nature.`,
    about: `Located at Chiseni Marg, Budhanilkantha, Kathmandu, Hokkaido Dekkaido was introduced as Hokkaido Group's second venture, expanding beyond restaurant dining into hospitality, wellness, and cultural experiences. Inspired by the beauty and traditions of Hokkaido, Japan, Dekkaido offers a unique destination where guests can enjoy authentic Japanese hospitality surrounded by nature. Its signature attraction is Nepal's authentic Japanese-style Onsen, complemented by a premium multi-cuisine restaurant serving Japanese, Continental, and other international cuisines. The property also features resort accommodations, Japanese farming experiences, educational activities, and recreational facilities for visitors of all ages. Every experience has been carefully designed to blend relaxation, learning, and exceptional dining within one destination. Whether visiting for a peaceful getaway, family outing, corporate retreat, or authentic Japanese cultural experience, Hokkaido Dekkaido delivers something truly unique. It stands as one of Nepal's most distinctive hospitality destinations while reflecting Hokkaido Group's vision of introducing Japanese lifestyle experiences beyond traditional restaurants.`,
    locationSummary: 'Chiseni Marg, Budhanilkantha, Kathmandu',
    mapQuery: 'Hokkaido Dekkaido, Chiseni Marg, Budhanilkantha, Kathmandu, Nepal',
    coordinates: null,
    image: dekkaidoImage,
    galleryImages: [dekkaidoImage, dekkaido2, dekkaido3, dekkaido4],
    logo: null,
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
    description: `Hokkaido Group's retail store for authentic Japanese cosmetics, food, and lifestyle products.`,
    about: `Located in Kamaladi, Kathmandu, HOMA Nepal is Hokkaido Group's specialty Japanese retail destination dedicated to bringing authentic Japanese products directly to Nepalese consumers. The store specializes in imported Japanese cosmetics, skincare products, food ingredients, sauces, beverages, snacks, kitchenware, lifestyle products, household essentials, and wellness items sourced directly from Japan. Every product is carefully selected to ensure authenticity, quality, and reliability while introducing customers to trusted Japanese brands. HOMA Nepal serves both individual shoppers and businesses seeking genuine Japanese products that are difficult to source locally. The store reflects Hokkaido Group's commitment to making Japanese quality and lifestyle more accessible throughout Nepal.`,
    locationSummary: 'Kamaladi, Kathmandu',
    mapQuery: 'HOMA Nepal, Kamaladi, Kathmandu, Nepal',
    coordinates: null,
    image: null,
    galleryImages: [],
    logo: null,
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
    description: `Hokkaido Group's official Japanese import and trading division.`,
    about: `Located in Bansbari, Kathmandu, Janeichi Business serves as the official import and trading division of Hokkaido Group, ensuring the authenticity and quality of products supplied across every Hokkaido brand. The company specializes in directly importing premium Japanese ingredients, sauces, beverages, seafood, restaurant supplies, cosmetics, retail products, and specialty food items from Japan to Nepal. By working directly with trusted Japanese manufacturers and suppliers, Janeichi guarantees consistent quality while supporting the operational needs of Hokkaido restaurants and retail businesses. Beyond supplying the group's outlets, Janeichi also distributes authentic Japanese products to businesses throughout Nepal. Its commitment to quality sourcing, efficient logistics, and long-term partnerships has made it an essential pillar of Hokkaido Group's continued growth and reputation.`,
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
