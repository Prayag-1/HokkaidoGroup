export type Testimonial = {
  reviewer: string
  brand: string
  quote: string
  rating?: number
  reviewUrl: string
  reviewLinkLabel: string
}

export const testimonials: Testimonial[] = [
  {
    reviewer: 'Raisha Sthapit',
    brand: 'Hokkaido House',
    quote: 'Absolutely loved my visit to Hokkaido House in Sanepa - International Club! The food was fresh and full of flavor. The ambience is warm, clean, and relaxing, perfect for a quiet meal or catching up with friends. The staff were polite, attentive, and made the experience even better. Definitely worth a visit if you’re in the area! 🌸🍱',
    rating: 5,
    reviewUrl: 'https://www.google.com/maps/place/@27.683036,85.306682,17z/data=!4m10!3m9!1s0x39eb190026389727:0x40b164b59e90bbb9!5m2!4m1!1i2!8m2!3d27.683036!4d85.306682!9m1!1b1',
    reviewLinkLabel: 'View Hokkaido House on Google',
  },
  {
    reviewer: 'Srijal Prajapati',
    brand: 'Hokkaido House',
    quote: 'We had a fantastic dining experience at Hokkaido House Japanese Restaurant. We ordered the authentic Shoyu Ramen, Spicy Ramen, California Roll, and Prawn Tempura, and every dish was absolutely delicious. The flavours were authentic, fresh, and beautifully presented. A special thank you to Anish, who provided exceptional service throughout our visit. He was friendly, attentive, and made us feel genuinely welcome. His recommendations and hospitality made the experience even more enjoyable. If you’re looking for authentic Japanese food with outstanding customer service, Hokkaido House is definitely worth a visit. We will certainly be back!',
    rating: 5,
    reviewUrl: 'https://www.google.com/maps/place/@27.683036,85.306682,17z/data=!4m10!3m9!1s0x39eb190026389727:0x40b164b59e90bbb9!5m2!4m1!1i2!8m2!3d27.683036!4d85.306682!9m1!1b1',
    reviewLinkLabel: 'View Hokkaido House on Google',
  },
  {
    reviewer: 'Arun S.',
    brand: 'Hokkaido Ramen House',
    quote: 'The food was honestly amazing.',
    rating: 5,
    reviewUrl: 'https://www.google.com/maps/reviews/data%3D%214m8%2114m7%211m6%212m5%211sCi9DQUlRQUNvZENodHljRjlvT25OR1NFeDNhWEJHY0dSR00yNWxObmRRTVZSUVVVRRAB%212m1%211s0x39eb1d8d86651205%3A0x7123272181fd9a04%213m1%211s2',
    reviewLinkLabel: 'Read this review on Google',
  },
]
