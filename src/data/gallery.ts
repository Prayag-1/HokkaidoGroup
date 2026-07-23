export type GallerySet = 'food' | 'interior' | 'farm' | 'people'

export type GalleryImage = {
  set: GallerySet
  locationSlug: string | null
  caption: string
  src: string
}

export const galleryImages: GalleryImage[] = [
  { set: 'food', locationSlug: null, caption: '', src: '/gallery/food-01.svg' },
  { set: 'interior', locationSlug: 'ramen-house', caption: '', src: '/gallery/interior-01.svg' },
  { set: 'farm', locationSlug: null, caption: '', src: '/gallery/farm-01.svg' },
  { set: 'people', locationSlug: null, caption: '', src: '/gallery/people-01.svg' },
  { set: 'food', locationSlug: null, caption: '', src: '/gallery/food-02.svg' },
  { set: 'interior', locationSlug: 'izakaya', caption: '', src: '/gallery/interior-02.svg' },
  { set: 'farm', locationSlug: null, caption: '', src: '/gallery/farm-02.svg' },
  { set: 'people', locationSlug: null, caption: '', src: '/gallery/people-02.svg' },
  { set: 'food', locationSlug: 'omakase', caption: '', src: '/gallery/food-03.svg' },
  { set: 'interior', locationSlug: 'hokkaido-house', caption: '', src: '/gallery/interior-03.svg' },
  { set: 'farm', locationSlug: null, caption: '', src: '/gallery/farm-03.svg' },
  { set: 'people', locationSlug: null, caption: '', src: '/gallery/people-03.svg' },
]
