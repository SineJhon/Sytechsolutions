'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Rocket, TrendingUp, Globe, HeadphonesIcon } from 'lucide-react'

const reasons = [
  { icon: Rocket, title: 'Built Around You', desc: 'No generic templates. Every feature is designed specifically for your business goals and your customers.', stat: '100%' },
  { icon: TrendingUp, title: 'Revenue-Driven Design', desc: 'Every pixel, every feature, every interaction is designed to bring you customers and grow your revenue.', stat: 'ROI' },
  { icon: Globe, title: 'Full Ownership', desc: 'Your website, your domain, your data. No lock-in, no hidden fees, no monthly traps. It\'s all yours from day one.', stat: '0%' },
  { icon: HeadphonesIcon, title: 'Always There for You', desc: 'We don\'t disappear after launch. Ongoing support, updates, and growth strategy whenever you need it.', stat: '24/7' },
]

const gradients = [
  'from-indigo-300/50 to-violet-300/30',
  'from-violet-300/50 to-rose-300/30',
  'from-rose-300/50 to-amber-300/30',
  'from-amber-200/50 to-accent/30',
]

const accentColors = ['text-indigo-300', 'text-violet-300', 'text-rose-300', 'text-amber-200']
const borderColors = ['border-indigo-300/10', 'border-violet-300/10', 'border-rose-300/10', 'border-amber-200/10']
const bgGlows = ['rgba(165,180,252,0.05)', 'rgba(196,181,253,0.05)', 'rgba(253,164,175,0.05)', 'rgba(253,230,138,0.05)']

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="why-us" ref={sectionRef} className="relative section-padding px-6 noise overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute pointer-events-none top-[-200px] left-[-200px] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.1)] border border-accent/20 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
            <span className="text-[13px] font-semibold text-text-secondary tracking-wider uppercase">Why SY Tech</span>
          </div>
          <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-text-primary max-w-[650px]">
            Your Business Deserves More{' '}
            <span className="gradient-text">Than Just a Website.</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-[520px]">
            We craft digital experiences that attract customers, build trust, and turn clicks into real revenue.
          </p>
        </div>

        <div className="relative">
          {/* ── Animated SVG connection path (desktop) ── */}
          <AnimatedConnection sectionRef={sectionRef} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {reasons.map((reason, i) => {
              const Icon = reason.icon
              return (
                <ReasonCard key={reason.title} reason={reason} Icon={Icon} index={i} sectionRef={sectionRef} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Animated SVG pipeline between cards ── */
function AnimatedConnection({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <svg
      className="hidden lg:block absolute top-[32px] left-0 w-full h-[2px] pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      {/* Base faint track */}
      <line x1="5%" y1="0" x2="95%" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

      {/* Animated gradient draw path */}
      <motion.line
        x1="5%" y1="0" x2="95%" y2="0"
        stroke="url(#whyPipelineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength }}
      />

      {/* Node dots at each card position with pulse */}
      {[12.5, 37.5, 62.5, 87.5].map((pct, i) => {
        const colors = ['#a5b4fc', '#c4b5fd', '#fda4af', '#fde68a']
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

      {/* Traveling orb */}
      <motion.circle
        r="4"
        fill="white"
        style={{
          offsetDistance: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
        className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
      />

      <defs>
        <linearGradient id="whyPipelineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="33%" stopColor="#c4b5fd" />
          <stop offset="66%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Individual reason card ── */
function ReasonCard({
  reason,
  Icon,
  index,
  sectionRef,
}: {
  reason: typeof reasons[0]
  Icon: React.ComponentType<{ className?: string }>
  index: number
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const threshold = 0.1 + index * 0.1
  const cardProgress = useTransform(scrollYProgress, [threshold, threshold + 0.2], [0, 1])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Subtle background glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: bgGlows[index] }}
      />

      <div
        className={`relative rounded-2xl p-6 flex flex-col items-center text-center border ${borderColors[index]} bg-[rgba(255,255,255,0.02)] backdrop-blur-sm hover:bg-[rgba(255,255,255,0.05)] transition-all duration-500 hover:shadow-[0_0_40px_-8px] hover:-translate-y-1 overflow-hidden`}
        style={{ '--tw-shadow-color': bgGlows[index].replace('0.05', '0.1') } as React.CSSProperties}
      >
        {/* Stat badge in corner */}
        <div className="absolute top-4 right-4 z-10">
          <motion.span
            className={`text-[22px] font-extrabold select-none ${accentColors[index]} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity }}
          >
            {reason.stat}
          </motion.span>
        </div>

        {/* Icon circle with animated gradient ring */}
        <div className="relative">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Animated gradient border ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `conic-gradient(from 0deg, ${['#a5b4fc', '#c4b5fd', '#fda4af', '#fde68a'][index]}, transparent 60%)`,
                opacity: 0.2,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner fill */}
            <div className="absolute inset-[3px] rounded-2xl bg-deep-base/80" />

            {/* Icon */}
            <Icon className={`w-6 h-6 relative z-10 ${accentColors[index]} group-hover:scale-110 transition-transform duration-300`} />
          </motion.div>

          {/* Ambient ring pulse */}
          <motion.div
            className={`absolute -inset-2 rounded-2xl border ${borderColors[index]} opacity-0 group-hover:opacity-100`}
            animate={{ scale: [1, 1.15, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity }}
          />
        </div>

        <h3 className={`text-[16px] font-semibold mt-4 transition-all duration-300 ${accentColors[index]}`}>
          {reason.title}
        </h3>
        <p className="text-[13px] text-text-secondary leading-[1.7] mt-2">{reason.desc}</p>

        {/* Bottom accent bar */}
        <motion.div
          className={`h-0.5 rounded-full mt-5 w-0 bg-gradient-to-r ${gradients[index]}`}
          style={{ width: useTransform(cardProgress, [0, 1], ['0%', '40%']) } as any}
        />
      </div>
    </motion.div>
  )
}