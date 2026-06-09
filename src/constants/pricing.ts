export interface PricingTier {
  tier: string
  price: string
  subtitle: string
  featured: boolean
  cta: string
  features: string[]
}

export const pricing: PricingTier[] = [
  {
    tier: 'Starter',
    price: 'from 8,000 ETB',
    subtitle: 'Business landing page',
    featured: false,
    cta: 'Get Started',
    features: [
      'Up to 6 sections',
      'Mobile responsive',
      'Contact form',
      'Google Maps integration',
      'Basic SEO setup',
      '2 rounds of revisions',
    ],
  },
  {
    tier: 'Growth',
    price: 'from 20,000 ETB',
    subtitle: 'Full web application',
    featured: true,
    cta: 'Start a Project',
    features: [
      'Custom feature development',
      'User authentication',
      'Database & backend',
      'Chapa / Stripe payments',
      'Admin dashboard',
      '1 month support included',
    ],
  },
  {
    tier: 'Enterprise',
    price: "Let's talk",
    subtitle: 'Platforms & SaaS products',
    featured: false,
    cta: 'Book a Call',
    features: [
      'Full product scope',
      'Multiple user roles',
      'SaaS architecture',
      'API integrations',
      'Performance optimization',
      'Long-term partnership',
    ],
  },
]