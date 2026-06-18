'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import { AnimatedText } from '@/components/shared/AnimatedText'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { CountUp } from '@/components/shared/CountUp'
import { ContactForm } from '@/components/ContactForm'
import LogoMarquee from '@/components/LogoMarquee'

export default function Hero() {
  const [formOpen, setFormOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <section className="relative min-h-screen bg-deep-base overflow-hidden flex items-center noise grid-pattern">
        {/* Primary ambient glow - top left */}
        <div
          className="absolute pointer-events-none z-0 animate-drift"
          style={{
            top: -100,
            left: -100,
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Secondary ambient glow - bottom right */}
        <div
          className="absolute pointer-events-none z-0 animate-drift"
          style={{
            bottom: -150,
            right: -100,
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)',
            filter: 'blur(100px)',
            animationDelay: '-3s',
          }}
        />

        {/* Tertiary glow - center */}
        <div
          className="absolute pointer-events-none z-0 animate-glow-pulse"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[8%] w-24 h-24 rounded-full border border-accent/10 opacity-30 pointer-events-none z-0"
        />
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[20%] left-[5%] w-16 h-16 rounded-full border border-cyan/10 opacity-20 pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[40%] left-[12%] w-32 h-32 rounded-full bg-accent/5 blur-3xl pointer-events-none z-0"
        />

        {/* Content */}
        <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.1)] border border-accent/20 rounded-full px-3 sm:px-4 py-1.5 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan shrink-0" />
            <span className="text-[11px] sm:text-[12px] font-medium text-text-secondary tracking-wide">
              Are You Ready To Make Your Business Thrive Online?
            </span>
          </motion.div>

          <AnimatedText
            text="We Build the Technology Your Business Runs On"
            className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-bold tracking-[-0.04em] leading-[1.23] mt-2"
            delay={0.3}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-[15px] sm:text-[17px] text-text-secondary max-w-[560px] leading-[1.7] sm:leading-[1.8] mt-5 sm:mt-6 mx-auto"
          >
            From custom websites to full-scale web applications — SY Tech Solutions delivers
            modern, fast, and scalable digital products for Every Business that wants to thrive in the digital age.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex gap-3 mt-7 sm:mt-8 justify-center flex-wrap"
          >
            <button
              onClick={() => setFormOpen(true)}
              className="group relative h-[46px] sm:h-[50px] px-6 sm:px-8 rounded-full text-white font-semibold text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-[1.04] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a
              href="#portfolio"
              className="h-[46px] sm:h-[50px] px-6 sm:px-8 rounded-full border border-white/15 text-text-secondary text-[14px] sm:text-[15px] font-medium inline-flex items-center justify-center hover:border-accent/40 hover:text-text-primary transition-all duration-300 glass-light"
            >
              View Our Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex gap-8 sm:gap-10 mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/[0.06] justify-center"
          >
            {[
              { to: 2, suffix: '+', label: 'Happy Clients' },
              { to: 2, suffix: '+', label: 'Projects Delivered' },
              { to: 100, suffix: '%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-[22px] sm:text-[26px] font-bold gradient-text">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] sm:text-[13px] text-text-tertiary mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Logo Marquee */}
          <LogoMarquee />
        </div>

        {/* Scroll indicator */}
        {scrollY <= 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[11px] text-text-tertiary tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-gradient-to-b from-accent to-cyan"
              />
            </div>
          </motion.div>
        )}
      </section>

      <ContactForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  )
}