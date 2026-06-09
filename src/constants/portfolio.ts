export interface Project {
  id: string
  category: 'website' | 'web-app' | 'ecommerce'
  title: string
  desc: string
  tech: string[]
  image: string
  href: string | null
  status: 'live' | 'building'
}

export const portfolio: Project[] = [
  {
    id: 'travel',
    category: 'website',
    title: 'Cinematic Travel Portfolio',
    desc: 'Full-screen cinematic website for a travel content creator with scroll-based transitions and parallax video backgrounds.',
    tech: ['React', 'GSAP', 'Vercel'],
    image: '/projects/travel.jpg',
    href: null,
    status: 'live',
  },
  {
    id: 'mycity',
    category: 'web-app',
    title: 'My City — Arba Minch',
    desc: 'Local business discovery platform for Arba Minch with Google Maps, category filtering, and pay-to-list for businesses.',
    tech: ['Next.js', 'Supabase', 'Maps API', 'Chapa'],
    image: '/projects/mycity.jpg',
    href: null,
    status: 'building',
  },
  {
    id: 'gifts',
    category: 'web-app',
    title: 'Digital Gifts Platform',
    desc: 'Couples memory and gift platform with password-protected pages, shared timeline journals, and emotional trigger features.',
    tech: ['Next.js', 'Supabase', 'Stripe', 'Framer Motion'],
    image: '/projects/gifts.jpg',
    href: null,
    status: 'building',
  },
]