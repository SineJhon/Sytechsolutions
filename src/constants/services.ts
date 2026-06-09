export interface Service {
  id: string
  icon: string
  title: string
  desc: string
}

export const services: Service[] = [
  {
    id: '01',
    icon: 'Globe',
    title: 'Website Development',
    desc: 'Custom, fast, and SEO-optimized websites built with modern technology. Not templates — every site is designed and built specifically for your goals.',
  },
  {
    id: '02',
    icon: 'LayoutDashboard',
    title: 'Web Applications',
    desc: 'Booking systems, dashboards, CRMs, directories, and custom platforms. We build tools that actually work and scale with your business.',
  },
  {
    id: '03',
    icon: 'ShoppingBag',
    title: 'E-Commerce Solutions',
    desc: 'Full online stores with Chapa and Stripe payment integration, product management, order tracking, and admin dashboards.',
  },
  {
    id: '04',
    icon: 'Palette',
    title: 'UI/UX Design',
    desc: 'Interface design that converts visitors into customers. We prototype in Figma before development begins — you approve what you see.',
  },
  {
    id: '05',
    icon: 'Layers',
    title: 'SaaS Development',
    desc: 'Have a software product idea? We help you scope, design, build, and launch your own SaaS — from MVP to a scalable product.',
  },
  {
    id: '06',
    icon: 'Zap',
    title: 'Digital Transformation',
    desc: 'Taking offline business processes online with the right technology. From automation to digital presence — we map the path and build it.',
  },
]