export interface Testimonial {
  name: string
  role: string
  quote: string
  image: string
  company: string
  accent: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Yakob Demeke',
    role: 'Tour Operations & Production Coordinator',
    quote: 'SY Tech Solutions didn\'t just build us a website — they crafted a cinematic experience that captures the soul of Arba Minch. Every frame, every scroll feels like a journey that invites visitors to explore the beauty and culture of our city.',
    image: '/authors/jj.jpg',
    company: 'Explore Arba Minch',
    accent: '#06b6d4',
    rating: 5,
  },
]
