export type Franchise = {
  name: string
  brand: string
  location: string
  description: string
  image: string
  websiteUrl: string
}
// Add only client-confirmed franchise records. Links go directly to websiteUrl.
export const franchises: Franchise[] = []
export const editorialDrafts = [
  {
    title: 'At the Japanese table',
    description: 'Stories from our kitchens and the people behind each plate.',
  },
  {
    title: 'A moment of calm',
    description: 'Discover the places and rituals that shape a Hokkaido visit.',
  },
  {
    title: 'From Japan to Nepal',
    description: 'An introduction to the products and ideas that connect us.',
  },
]
