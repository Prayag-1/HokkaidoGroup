export type Testimonial = {
  name: string
  source: 'Google' | 'TripAdvisor'
  quote: string
  brand: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'S. Shrestha',
    source: 'Google',
    quote: 'The ramen broth is steady and considered, and the service feels calm without being formal.',
    brand: 'Hokkaido Ramen House',
  },
  {
    name: 'Mika Tanaka',
    source: 'Google',
    quote: 'There is a clear line from the farm to the plate here, which makes the menu easier to trust.',
    brand: 'Hokkaido House',
  },
  {
    name: 'A. Gurung',
    source: 'TripAdvisor',
    quote: 'The room stays quiet enough to notice the food. The pacing works well for a long meal.',
    brand: 'Izakaya Hokkaido',
  },
  {
    name: 'N. Koirala',
    source: 'Google',
    quote: 'The sushi counter has a direct, seasonal approach that does not try to overstate itself.',
    brand: 'Omakase',
  },
  {
    name: 'R. Sato',
    source: 'TripAdvisor',
    quote: 'It is rare to see a group with this much consistency across different formats.',
    brand: 'Hokkaido Bento House',
  },
  {
    name: 'Priya Gurung',
    source: 'Google',
    quote: 'The ingredients feel local first, then refined in the kitchen. That changes the whole meal.',
    brand: 'Dekkaido Agro Farm',
  },
]
