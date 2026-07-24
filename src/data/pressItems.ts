export type PressItem = {
  title: string
  excerpt: string
  image: string
  date: string
  url: string
  verified: boolean
}

export const pressItems: PressItem[] = []

export const publishedPressItems = pressItems.filter((item) => item.verified)
