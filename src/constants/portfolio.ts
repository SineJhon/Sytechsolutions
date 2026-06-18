export interface Project {
  id: string
  category: 'website' | 'web-app' | 'ecommerce'
  title: string
  desc: string
  tech: string[]
  image: string
  href: string | null
  customDomain?: string
  status: 'live' | 'building'
}

export const portfolio: Project[] = [
  {
    id: 'travel',
    category: 'website',
    title: 'Explore Arba Minch',
    desc: 'Multi-page tourism website for an Ethiopian travel YouTube channel, featuring an animated hero with particle effects, YouTube episode carousel, interactive destination explorer, photo gallery, animated subscriber stats counter, and community testimonials.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    image: '/projects/travel.jpg',
    href: 'https://sinejhon.github.io/Explore-Arba-Minch/',
    customDomain: 'https://sinejhon.github.io/Explore-Arba-Minch/',
    status: 'live',
  },
  {
    id: 'portfolio',
    category: 'website',
    title: 'SineJhon.codes',
    desc: 'A personal branding and portfolio website built to show you how we can develop your portfolio, crafting it to help you attract freelance opportunities and collaborations.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    image: '/projects/portfolio.jpg',
    href: 'https://sinejhon.codes',
    customDomain: 'https://sinejhon.codes',
    status: 'live',
  },
  {
    id: 'encouragement',
    category: 'website',
    title: 'Encouragement by Empowerment',
    desc: 'A non-profit organization website developed as a competition entry, designed to showcase community empowerment initiatives. Earned Second Place in the competition — demonstrating responsive web design, UI/UX strategy, and front-end development skills.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    image: '/projects/encouragement.jpg',
    href: 'https://sinejhon.github.io/Encouragementbyempowerment/',
    customDomain: 'https://sinejhon.github.io/Encouragementbyempowerment/',
    status: 'live',
  },
]
