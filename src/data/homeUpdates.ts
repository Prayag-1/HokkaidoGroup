export type HomeUpdate = {
  title: string
  summary?: string
  date?: string
  url?: string
  verified: boolean
}

export const homeUpdates: HomeUpdate[] = []

export const verifiedHomeUpdates = homeUpdates.filter((item) => item.verified)
