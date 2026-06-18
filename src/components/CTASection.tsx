'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

export default function CTASection() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <section className="relative section-padding overflow-hidden">
        {/* Background gradient with noise */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-cyan/15 to-emerald/20 noise" />
        <div className="absolute inset-0 bg-deep-base/60 backdrop-blur-[2px]" />

        {/* Decorative elements */}
        <div className="absolute pointer-events-none top-[-40px] right-[10%] w-[300px] h-[300px] rounded-full border border-white/10 animate-spin-slow" />
        <div className="absolute pointer-events-none bottom-[-60px] left-[5%] w-[200px] h-[200px] rounded-full border border-white/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

        <div className="relative z-10 text-center max-w-[640px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-glow-pulse" />
              <span className="text-[13px] font-semibold text-white/80 tracking-wider uppercase">Let's Collaborate</span>
            </div>
            <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-white">
              Ready to Build{' '}
              <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                Something Great?
              </span>
            </h2>
            <p className="text-[17px] text-white/70 mt-4 leading-[1.7] max-w-[500px] mx-auto">
              From your first business website to a full product — let's talk about what you need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex gap-3 justify-center flex-wrap"
          >
            <button
              onClick={() => setFormOpen(true)}
              className="group h-[50px] px-8 rounded-full font-semibold text-[15px] bg-white text-deep-base hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 shadow-lg"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+251936913118"
              className="h-[50px] px-8 rounded-full border-2 border-white/25 text-white/90 text-[15px] font-medium inline-flex items-center gap-2 hover:border-white/50 hover:text-white transition-all duration-300 glass-light"
            >
              <MessageCircle className="w-4 h-4" />
              Call Us
            </a>
          </motion.div>
        </div>
      </section>

      <ContactForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  )
}