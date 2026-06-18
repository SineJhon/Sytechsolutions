'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { services } from '@/constants/services'
import { useContactForm } from '@/components/shared/ContactFormProvider'
import { ArrowRight } from 'lucide-react'

/* ── Unique SVG illustrations per category ── */
const categorySvgs: Record<string, React.ReactNode> = {
  Globe: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <ellipse cx="32" cy="32" rx="12" ry="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="4" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="32" y1="4" x2="32" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  ShoppingBag: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M8 8h8l6 28h28l4-18H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <circle cx="26" cy="48" r="4" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <circle cx="44" cy="48" r="4" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <rect x="28" y="20" width="8" height="6" rx="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  LayoutDashboard: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <rect x="6" y="6" width="52" height="52" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <rect x="10" y="10" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <rect x="36" y="10" width="18" height="20" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="10" y="30" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <rect x="42" y="34" width="12" height="20" rx="3" fill="currentColor" opacity="0.1" />
    </svg>
  ),
  Monitor: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <rect x="8" y="8" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <rect x="14" y="14" width="36" height="24" rx="2" fill="currentColor" opacity="0.12" />
      <line x1="24" y1="48" x2="40" y2="48" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <line x1="32" y1="44" x2="32" y2="48" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    </svg>
  ),
  Zap: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M36 6L14 36h16l-4 22 22-30H32l4-22z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.35" />
      <path d="M36 6L14 36h16l-4 22 22-30H32l4-22z" fill="currentColor" opacity="0.1" />
    </svg>
  ),
}

/* ── Color themes per category (muted & refined) ── */
const colorThemes: Record<string, {
  accent: string; accentHex: string; accentRgb: string;
  bg: string; border: string; glow: string; gradient: string;
  cardBg: string; cardBorder: string; cardHover: string;
}> = {
  Globe: {
    accent: 'text-sky-300', accentHex: '#7dd3fc', accentRgb: '125,211,252',
    bg: 'rgba(125,211,252,0.03)', border: 'border-sky-400/10', glow: 'rgba(125,211,252,0.08)',
    gradient: 'from-sky-400/10 to-cyan-400/5',
    cardBg: 'rgba(125,211,252,0.04)', cardBorder: 'border-sky-400/8', cardHover: 'rgba(125,211,252,0.08)',
  },
  ShoppingBag: {
    accent: 'text-teal-300', accentHex: '#5eead4', accentRgb: '94,234,212',
    bg: 'rgba(94,234,212,0.03)', border: 'border-teal-400/10', glow: 'rgba(94,234,212,0.08)',
    gradient: 'from-teal-400/10 to-emerald-400/5',
    cardBg: 'rgba(94,234,212,0.04)', cardBorder: 'border-teal-400/8', cardHover: 'rgba(94,234,212,0.08)',
  },
  LayoutDashboard: {
    accent: 'text-indigo-300', accentHex: '#a5b4fc', accentRgb: '165,180,252',
    bg: 'rgba(165,180,252,0.03)', border: 'border-indigo-400/10', glow: 'rgba(165,180,252,0.08)',
    gradient: 'from-indigo-400/10 to-violet-400/5',
    cardBg: 'rgba(165,180,252,0.04)', cardBorder: 'border-indigo-400/8', cardHover: 'rgba(165,180,252,0.08)',
  },
  Monitor: {
    accent: 'text-amber-200', accentHex: '#fde68a', accentRgb: '253,230,138',
    bg: 'rgba(253,230,138,0.03)', border: 'border-amber-300/10', glow: 'rgba(253,230,138,0.08)',
    gradient: 'from-amber-300/10 to-orange-300/5',
    cardBg: 'rgba(253,230,138,0.04)', cardBorder: 'border-amber-300/8', cardHover: 'rgba(253,230,138,0.08)',
  },
  Zap: {
    accent: 'text-rose-300', accentHex: '#fda4af', accentRgb: '253,164,175',
    bg: 'rgba(253,164,175,0.03)', border: 'border-rose-300/10', glow: 'rgba(253,164,175,0.08)',
    gradient: 'from-rose-300/10 to-pink-300/5',
    cardBg: 'rgba(253,164,175,0.04)', cardBorder: 'border-rose-300/8', cardHover: 'rgba(253,164,175,0.08)',
  },
}

const catGradients: Record<string, string> = {
  Globe: 'from-sky-300/40 via-cyan-300/30 to-teal-300/20',
  ShoppingBag: 'from-teal-300/40 via-emerald-300/30 to-cyan-300/20',
  LayoutDashboard: 'from-indigo-300/40 via-violet-300/30 to-purple-300/20',
  Monitor: 'from-amber-200/40 via-orange-200/30 to-rose-200/20',
  Zap: 'from-rose-300/40 via-pink-300/30 to-fuchsia-300/20',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { openWithPrefill } = useContactForm()

  return (
    <section id="services" ref={sectionRef} className="relative section-padding px-6 noise grid-pattern overflow-hidden">
      <div className="absolute pointer-events-none top-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.1)] border border-accent/20 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan animate-glow-pulse" />
            <span className="text-[13px] font-semibold text-text-secondary tracking-wider uppercase">What We Do</span>
          </div>
          <h2 className="text-[48px] md:text-[60px] lg:text-[72px] font-bold tracking-[-0.04em] text-text-primary leading-[1.06] max-w-[800px]">
            Premium Tech Services for{' '}
            <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="text-[18px] md:text-[20px] text-text-secondary max-w-[600px] mt-6 leading-[1.8]">
            We go beyond websites. SY Tech builds the full technology stack your business
            needs to operate, scale, and compete.
          </p>
        </motion.div>

        {/* Service categories */}
        <motion.div
          className="space-y-16 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service, idx) => {
            const c = colorThemes[service.icon] || colorThemes.Globe
            const svg = categorySvgs[service.icon] || categorySvgs.Globe
            const catGrad = catGradients[service.icon] || catGradients.Globe

            return (
              <ServiceCategory
                key={service.id}
                service={service}
                c={c}
                catGrad={catGrad}
                svg={svg}
                sectionRef={sectionRef}
                index={idx}
                openWithPrefill={openWithPrefill}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Single service category ── */
function ServiceCategory({
  service, c, catGrad, svg, sectionRef, index, openWithPrefill,
}: {
  service: typeof services[0]
  c: typeof colorThemes.Globe
  catGrad: string
  svg: React.ReactNode
  sectionRef: React.RefObject<HTMLDivElement | null>
  index: number
  openWithPrefill: (cat: string, type: string) => void
}) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const threshold = 0.05 + index * 0.08
  const cardProgress = useTransform(scrollYProgress, [threshold, threshold + 0.12], [0, 1])

  return (
    <motion.div variants={cardVariants} className="relative group/card">
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${c.glow.replace('0.08', '0.04')}, transparent 70%)` }}
      />

      <div
        className={`relative rounded-3xl overflow-hidden border ${c.border} transition-all duration-500 hover:shadow-[0_0_80px_-20px]`}
        style={{ '--tw-shadow-color': c.glow } as React.CSSProperties}
      >
        {/* Gradient header bar with shimmer */}
        <div className={`h-0.5 w-full bg-gradient-to-r ${c.gradient} relative overflow-hidden`}>
          <motion.div
            className="absolute inset-0 w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="p-8 lg:p-10" style={{ background: c.bg }}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* ── Left column: icon + info ── */}
            <div className="flex-shrink-0 lg:w-[220px] flex flex-col items-center lg:items-start gap-5">
              {/* Icon with animated ring */}
              <div className="relative">
                <motion.div
                  className={`w-24 h-24 ${c.accent} relative`}
                  whileHover={{ rotate: 4, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                >
                  {/* Outer decorative ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-2xl border"
                    style={{ borderColor: `${c.accentHex}15` }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Inner conic gradient ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `conic-gradient(from 0deg, ${c.accentHex}, transparent 40%, ${c.accentHex}44, transparent 80%)`,
                      opacity: 0.15,
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Icon background */}
                  <div
                    className="absolute inset-0 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, rgba(${c.accentRgb},0.06), rgba(${c.accentRgb},0.02))`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
                    }}
                  >
                    <div className="p-3 w-full h-full">
                      {svg}
                    </div>
                  </div>
                </motion.div>

                {/* Ambient pulse ring */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl opacity-0 group-hover/card:opacity-100"
                  style={{ border: `1px solid ${c.accentHex}15` }}
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.5, delay: index * 0.3, repeat: Infinity }}
                />
              </div>

              {/* Category badge */}
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold ${c.accent} opacity-40 tracking-[0.2em] uppercase`}>
                  {service.id}
                </span>
                <motion.div
                  className="h-px w-6"
                  style={{ background: `linear-gradient(90deg, ${c.accentHex}44, transparent)` }}
                />
              </div>

              {/* Title + description */}
              <div className="text-center lg:text-left">
                <h3 className="text-[22px] font-bold text-text-primary tracking-tight">{service.title}</h3>
                <p className="text-[13px] text-text-secondary leading-[1.7] mt-2 max-w-[280px]">{service.desc}</p>
              </div>

              {/* Scroll-revealed accent bar */}
              <motion.div
                className="h-0.5 rounded-full w-0"
                style={{
                  background: `linear-gradient(90deg, ${c.accentHex}, transparent)`,
                  width: useTransform(cardProgress, [0, 1], ['0%', '80%']) as any,
                }}
              />
            </div>

            {/* ── Right column: service items ── */}
            <div className="flex-1 w-full">
              <motion.div
                className={`grid gap-4 ${service.items.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {service.items.map((item, i) => (
                  <ServiceItem
                    key={item.name}
                    item={item}
                    index={i}
                    c={c}
                    serviceTitle={service.title}
                    openWithPrefill={openWithPrefill}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Individual service item card ── */
function ServiceItem({
  item, index, c, serviceTitle, openWithPrefill,
}: {
  item: typeof services[0]['items'][0]
  index: number
  c: typeof colorThemes.Globe
  serviceTitle: string
  openWithPrefill: (cat: string, type: string) => void
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative group/item"
    >
      <div
        className={`
          relative rounded-2xl p-5 border ${c.cardBorder}
          transition-all duration-400 cursor-default overflow-hidden
          hover:shadow-lg hover:-translate-y-1
        `}
        style={{ background: c.cardBg }}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${c.cardHover}, transparent 60%)`,
          }}
        />

        {/* Top section: number badge + title */}
        <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
          <div className="flex items-center gap-2 min-w-0">
            {/* Animated number badge */}
            <motion.span
              className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${c.accent} border border-current/15 relative overflow-hidden`}
              style={{ background: `${c.accentHex}0a` }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity }}
            >
              {index + 1}
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{ background: `linear-gradient(90deg, transparent, ${c.accentHex}15, transparent)` }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
              />
            </motion.span>

            <h4
              className="text-[14px] font-semibold transition-colors duration-300 leading-snug"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = c.accentHex }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
            >
              {item.name}
            </h4>
          </div>

          {/* Hover arrow indicator */}
          <motion.div
            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
            style={{ background: `${c.accentHex}15` }}
          >
            <ArrowRight className="w-3 h-3" style={{ color: c.accentHex }} />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-text-secondary leading-[1.75] relative z-10 line-clamp-3 font-medium tracking-[0.01em]">
          {item.desc}
        </p>

        {/* Bottom bar: price + CTA */}
        <div className="mt-4 pt-3 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between gap-2">
            {/* Price with label */}
            <div className="flex flex-col">
              <span className="text-[9px] text-text-tertiary/50 uppercase tracking-wider font-medium">Starting at</span>
              <span className="text-[13px] font-extrabold tracking-tight" style={{ color: c.accentHex }}>
                {item.price}
              </span>
            </div>

            {/* Get Started button */}
            <button
              onClick={(e) => { e.stopPropagation(); openWithPrefill(serviceTitle, item.name) }}
              className={`
                text-[11px] font-semibold px-3.5 py-2 rounded-full border
                border-current/15
                opacity-0 group-hover/item:opacity-100
                hover:bg-current/10
                transition-all duration-300 whitespace-nowrap
              `}
              style={{ color: c.accentHex }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}