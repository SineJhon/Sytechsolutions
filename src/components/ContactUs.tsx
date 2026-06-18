'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Mail, Send, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react'
import { useContactForm } from '@/components/shared/ContactFormProvider'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Arba Minch, Ethiopia',
    href: null,
    accentHex: '#60a5fa',
    accentRgb: '59,130,246',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+251 93 691 3118',
    href: 'tel:+251936913118',
    accentHex: '#34d399',
    accentRgb: '52,211,153',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sytechsolutions.et@gmail.com',
    href: 'mailto:sytechsolutions.et@gmail.com',
    accentHex: '#fbbf24',
    accentRgb: '251,191,36',
  },
]

const socialLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/SineJhon',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/251936913118',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function ContactUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { setOpen: setFormOpen } = useContactForm()

  return (
    <section id="contact" ref={sectionRef} className="relative section-padding px-6 noise overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute pointer-events-none top-[-200px] left-[-200px] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
      <div className="absolute pointer-events-none bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-cyan/5 blur-[120px] rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.1)] border border-accent/20 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
            <span className="text-[13px] font-semibold text-text-secondary tracking-wider uppercase">Contact Us</span>
          </div>
          <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-text-primary max-w-[600px] mx-auto">
            Let's <span className="gradient-text">Make It Happen</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-[500px] mx-auto leading-relaxed">
            From your first business website to a full-scale application — let's talk about what you need. We'll get back to you within 24 hours.
          </p>
        </div>

        {/* Contact info cards with animated pipeline */}
        <div className="relative">
          <AnimatedConnection sectionRef={sectionRef} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-10">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              const Wrapper = item.href ? 'a' : 'div'
              return (
                <ContactCard
                  key={item.label}
                  item={item}
                  Icon={Icon}
                  Wrapper={Wrapper}
                  index={i}
                  sectionRef={sectionRef}
                />
              )
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => setFormOpen(true)}
            className="group relative h-[50px] px-8 rounded-full text-white font-semibold text-[15px] overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer" />
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <a
            href="https://t.me/SineJhon"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[50px] px-8 rounded-full border border-white/15 text-text-secondary text-[15px] font-medium inline-flex items-center gap-2 hover:border-accent/40 hover:text-text-primary transition-all duration-300 glass-light"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on Telegram
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Animated SVG connection between contact cards ── */
function AnimatedConnection({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <svg
      className="hidden md:block absolute top-[32px] left-0 w-full h-[2px] pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <line x1="5%" y1="0" x2="95%" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

      <motion.line
        x1="5%" y1="0" x2="95%" y2="0"
        stroke="url(#contactPipelineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength }}
      />

      {[16.67, 50, 83.33].map((pct, i) => {
        const colors = ['#60a5fa', '#34d399', '#fbbf24']
        return (
          <motion.circle
            key={i}
            cx={`${pct}%`}
            cy="0"
            r="5"
            fill={colors[i]}
            className="drop-shadow-[0_0_10px_var(--tw-shadow-color)]"
            style={{ '--tw-shadow-color': colors[i] } as React.CSSProperties}
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}

      <motion.circle
        r="4"
        fill="white"
        style={{
          offsetDistance: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
        className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
      />

      <defs>
        <linearGradient id="contactPipelineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Individual contact card ── */
function ContactCard({
  item, Icon, Wrapper, index, sectionRef,
}: {
  item: typeof contactInfo[0]
  Icon: React.ComponentType<{ className?: string }>
  Wrapper: string | React.ComponentType<any>
  index: number
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const threshold = 0.1 + index * 0.1
  const cardProgress = useTransform(scrollYProgress, [threshold, threshold + 0.15], [0, 1])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${item.accentHex}15, transparent 70%)` }}
      />

      <Wrapper
        {...(item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`
          relative rounded-2xl p-5 flex items-center gap-3 overflow-hidden
          border border-white/[0.06] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm
          hover:border-white/[0.12] hover:bg-[rgba(255,255,255,0.05)]
          transition-all duration-500 hover:shadow-[0_0_40px_-8px] hover:-translate-y-0.5
          ${item.href ? 'group cursor-pointer' : 'group cursor-default'}
        `}
        style={{ '--tw-shadow-color': `${item.accentHex}22` } as React.CSSProperties}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${item.accentHex}11, transparent 60%)` }}
        />

        {/* Icon with animated ring */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Conic gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: `conic-gradient(from 0deg, ${item.accentHex}, transparent 60%)`,
                opacity: 0.3,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner fill */}
            <div className="absolute inset-[2px] rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, rgba(${item.accentRgb},0.12), rgba(${item.accentRgb},0.03))` }}
            >
              <span style={{ color: item.accentHex, display: 'flex' }}>
                <Icon className="w-5 h-5 relative z-10" />
              </span>
            </div>
          </motion.div>

          {/* Ambient ring pulse */}
          <motion.div
            className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ border: `1px solid ${item.accentHex}22` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity }}
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 relative z-10">
          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: `${item.accentHex}aa` }}>
            {item.label}
          </div>
          <div className="text-[14px] font-medium truncate mt-0.5" style={{ color: 'var(--text-primary)' }}>
            {item.value}
          </div>
        </div>

        {/* Icon arrow if link */}
        {item.href && (
          <span style={{ color: item.accentHex, display: 'flex' }}>
            <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 relative z-10" />
          </span>
        )}
      </Wrapper>
    </motion.div>
  )
}