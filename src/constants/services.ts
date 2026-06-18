export interface ServiceItem {
  name: string
  desc: string
  price: string
}

export interface Service {
  id: string
  icon: string
  title: string
  desc: string
  items: ServiceItem[]
}

export const services: Service[] = [
  {
    id: '01',
    icon: 'Globe',
    title: 'Website Development',
    desc: 'Custom business websites built for performance, speed, and SEO — designed to turn visitors into customers.',
    items: [
      { name: 'Business Website', desc: 'A professional website with contact forms, Google Maps, team pages, and SEO setup to help customers find and trust your business.', price: '20,000 – 50,000 ETB' },
      { name: 'Restaurant Website & Online Ordering', desc: 'Interactive menus, online ordering with delivery tracking, table reservations, and payment integration — everything your restaurant needs to go digital.', price: '25,000 – 50,000 ETB' },
      { name: 'Personal Brand Website', desc: 'A sleek personal site with bio, portfolio showcase, testimonials, blog, and booking system — perfect for speakers, consultants, and professionals.', price: '3,000 – 10,000 ETB' },
      { name: 'Link in Bio Website', desc: 'A stylish mini website with all your links, social profiles, and contact info in one beautiful page — ideal for creators and influencers.', price: '1,500 – 3,000 ETB' },
      { name: 'Portfolio Website', desc: 'A visually stunning showcase of your work with project galleries, filtering, animations, and a contact form to land new clients.', price: '3,000 – 5,000 ETB' },
      { name: 'Event / Invitation Website', desc: 'Beautiful event pages with RSVP forms, photo galleries, maps, countdown timers, and schedule — perfect for weddings, conferences, and launches.', price: '5,000 – 10,000 ETB' },
    ],
  },
  {
    id: '02',
    icon: 'ShoppingBag',
    title: 'E-Commerce Solutions',
    desc: 'Full online stores with everything you need to sell, ship, and get paid — built to grow your revenue.',
    items: [
      { name: 'E-Commerce Website', desc: 'Complete online store with product catalogs, shopping cart, Chapa/Stripe payments, order tracking, delivery management, and an admin dashboard to manage everything.', price: '35,000 – 90,000 ETB' },
      { name: 'Multi-Vendor Marketplace', desc: 'A platform where multiple sellers list their products — with vendor dashboards, commission systems, payout management, and a powerful admin panel.', price: '80,000 – 150,000 ETB' },
    ],
  },
  {
    id: '03',
    icon: 'LayoutDashboard',
    title: 'Web Applications',
    desc: 'Custom web tools that automate your operations — from booking to management, all accessible from any device.',
    items: [
      { name: 'Booking & Reservation System', desc: 'Online appointment scheduling with calendar views, automated confirmations, reminders, payment collection, and customer login — built for clinics, salons, and hotels.', price: '25,000 – 60,000 ETB' },
      { name: 'Business Dashboard / CRM', desc: 'A custom control center for your business — track leads, manage customers, view analytics, and automate follow-ups with a clean, intuitive dashboard.', price: '40,000 – 100,000 ETB' },
      { name: 'Real Estate Platform', desc: 'Property listings with advanced search, map browsing, agent profiles, inquiry forms, and mortgage calculators — a complete real estate solution.', price: '45,000 – 90,000 ETB' },
    ],
  },
  {
    id: '04',
    icon: 'Monitor',
    title: 'ERP & Management Systems',
    desc: 'Powerful offline-capable systems that manage your entire organization — from students to patients to inventory.',
    items: [
      { name: 'ERP System (Offline-Capable)', desc: 'A complete business management system with inventory, accounting, HR, purchasing, and reporting — works offline and syncs when connected.', price: '120,000 – 300,000 ETB' },
      { name: 'School Management System', desc: 'Student records, grading, attendance tracking, fee payments, timetables, parent portal, and report cards — everything a school needs in one system.', price: '60,000 – 150,000 ETB' },
      { name: 'Hospital / Clinic Management', desc: 'Patient records, appointment scheduling, billing, pharmacy management, lab results, and doctor dashboards — a full healthcare management solution.', price: '80,000 – 200,000 ETB' },
    ],
  },
  {
    id: '05',
    icon: 'Zap',
    title: 'Digital Transformation',
    desc: 'Take your business online with the right tools — from digital presence to full process automation.',
    items: [
      { name: 'Process Automation', desc: 'Automate approvals, invoices, employee workflows, and repetitive tasks with custom tools that save hours every week.', price: '30,000 – 80,000 ETB' },
      { name: 'Digital Presence Setup', desc: 'Get online with a website, Google Business profile, social media integration, SEO optimization, and directory listings — a complete digital launch.', price: '15,000 – 35,000 ETB' },
      { name: 'System Integration', desc: 'Connect your POS, ERP, CRM, and payment systems with custom APIs — so your tools talk to each other and data flows seamlessly.', price: '25,000 – 70,000 ETB' },
    ],
  },
]