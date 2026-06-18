'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/constants/testimonials'
import Image from 'next/image'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative section-padding px-6 noise overflow-hidden">
      {/* Section ambient glows */}
      <div className="absolute pointer-events-none top-[-200px] right-[-200px] w-[600px] h-[600px] bg-accent/5 blur-[140px] rounded-full" />
      <div className="absolute pointer-events-none bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan/4 blur-[120px] rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[rgba(6,182,212,0.1)] border border-cyan/20 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan animate-glow-pulse" />
            <span className="text-[13px] font-semibold text-text-secondary tracking-wider uppercase">What Clients Say</span>
          </div>
          <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-text-primary">
            Trusted By <span className="gradient-text">Ethiopian Businesses</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-[520px] mx-auto text-[15px] leading-relaxed">
            Hear from founders and leaders who partnered with us to build their digital presence.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-[700px] mx-auto">
          <AnimatePresence mode="popLayout">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <TestimonialCard testimonial={t} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonial Card ── */
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof testimonials[0]
  index: number
}) {
  const { name, role, quote, image, company, accent, rating } = testimonial

  return (
    <div className="founder-card group relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1e32] via-[#0c1f30] to-[#060e18] rounded-[20px]" />

      {/* Spotlight glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full opacity-15 blur-[60px] group-hover:opacity-25 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 pt-10 flex flex-col h-full">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-white/10'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Bold Catchy Quote */}
        <p className="text-[20px] md:text-[24px] font-bold text-white leading-[1.5] mb-8 tracking-[-0.01em]">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/[0.06]">
          {/* Profile Picture */}
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border-2 shrink-0"
            style={{ borderColor: `${accent}60` }}
            unoptimized
          />
          <div>
            <h3 className="text-[16px] font-bold text-white tracking-tight">
              {name}
            </h3>
            <p className="text-[13px] text-[#8a9bb5]">
              {role} · <span style={{ color: accent }}>{company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}