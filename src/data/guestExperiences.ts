export type GuestExperience = {
  restaurantName: string
  text: string
  googleUrl: string
  verified: boolean
}

export const guestExperiences: GuestExperience[] = []

export const verifiedGuestExperiences = guestExperiences.filter(
  (review) => review.verified && review.restaurantName && review.text && review.googleUrl,
)
