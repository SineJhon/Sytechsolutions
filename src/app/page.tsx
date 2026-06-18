'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import ContactFormProvider from '@/components/shared/ContactFormProvider'

const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: false })
const HowWeWork = dynamic(() => import('@/components/HowWeWork'), { ssr: false })
const WhyUs = dynamic(() => import('@/components/WhyUs'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false })
const ContactUs = dynamic(() => import('@/components/ContactUs'), { ssr: false })
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ContactFormProvider>
      <main>
        <Navbar />
        <Hero />
        <Testimonials />
        <Portfolio />
        <WhyUs />
        <HowWeWork />
        <Services />
        <ContactUs />
        <Footer />
      </main>
    </ContactFormProvider>
  )
}
