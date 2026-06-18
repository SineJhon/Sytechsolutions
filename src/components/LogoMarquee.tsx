'use client'

import { motion } from 'framer-motion'

const logos = [
  { src: '/logos/brand-1.svg', alt: 'Explore Arba Minch' },
  { src: '/logos/brand-2.svg', alt: 'Encouragement by Empowerment' },
]

// Double the logos for seamless infinite scroll
const doubledLogos = [...logos, ...logos]

export default function LogoMarquee() {
  return (
    <div className="w-full mt-10 pt-8 border-t border-white/[0.04]">
      {/* Section header */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-[11px] font-medium text-text-tertiary/60 tracking-[0.25em] uppercase mb-6"
      >
        Businesses used our services
      </motion.p>

      {/* Marquee container with fade edges */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[var(--color-deep-base)] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[var(--color-deep-base)] to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <motion.div
          className="flex items-center gap-10 md:gap-14"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 18,
              ease: 'linear',
            },
          }}
        >
          {doubledLogos.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex flex-col items-center justify-center shrink-0 w-[160px] md:w-[200px] opacity-70 hover:opacity-100 transition-opacity duration-500"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain"
                loading="lazy"
              />
              <span className="mt-2 text-[12px] md:text-[14px] font-semibold text-text-secondary tracking-wide">
                {logo.alt}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
