'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'

const steps = [
  { num: '01', icon: Search, title: 'Discovery', desc: 'We start by understanding your business, your users, and your goals. No assumptions — we ask the right questions first.' },
  { num: '02', icon: PenTool, title: 'Strategy & Planning', desc: 'We map out the perfect solution for your business — wireframes, features, and a clear roadmap. You sign off before we build.' },
  { num: '03', icon: Code2, title: 'Build & Test', desc: 'We develop in sprints and share progress regularly. Every build is tested across devices and browsers before delivery.' },
  { num: '04', icon: Rocket, title: 'Launch & Support', desc: 'We deploy, handle the launch, and stay available for support. You own 100% of the source code and infrastructure.' },
]

const gradients = ['from-blue-400 to-cyan-400', 'from-cyan-400 to-emerald-400', 'from-emerald-400 to-amber-400', 'from-amber-400 to-rose-400']
const accentColors = ['text-blue-400', 'text-cyan-400', 'text-emerald-400', 'text-amber-400']
const borderColors = ['border-blue-500/20', 'border-cyan-500/20', 'border-emerald-500/20', 'border-amber-500/20']
const bgGlows = ['rgba(59,130,246,0.08)', 'rgba(6,182,212,0.08)', 'rgba(52,211,153,0.08)', 'rgba(251,191,36,0.08)']

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="process" ref={sectionRef} className="relative section-padding px-6 noise overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute pointer-events-none bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-emerald/5 blur-[120px] rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[rgba(6,182,212,0.1)] border border-cyan/20 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan animate-glow-pulse" />
            <span className="text-[13px] font-semibold text-text-secondary tracking-wider uppercase">Our Process</span>
          </div>
          <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-text-primary">
            How We Turn Your Idea Into <span className="gradient-text">Reality</span>
          </h2>
        </div>

        <div className="relative">
          {/* ── Animated SVG connection path (desktop) ── */}
          <AnimatedConnection sectionRef={sectionRef} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <StepCard key={step.num} step={step} Icon={Icon} index={i} sectionRef={sectionRef} />
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
      className="hidden md:block absolute top-[44px] left-0 w-full h-[2px] pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      {/* Base faint track */}
      <line x1="5%" y1="0" x2="95%" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

      {/* Animated gradient draw path */}
      <motion.line
        x1="5%" y1="0" x2="95%" y2="0"
        stroke="url(#pipelineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength }}
      />

      {/* Glowing dot that travels along the path */}
      <motion.circle
        r="5"
        fill="#22d3ee"
        style={{
          offsetDistance: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
        className="drop-shadow-[0_0_8px_#22d3ee]"
        opacity={0.9}
      >
        <animateMotion dur="3s" repeatCount="indefinite" path="M5%,0 L95%,0" />
      </motion.circle>

      {/* Node dots at each step position */}
      {[12.5, 37.5, 62.5, 87.5].map((pct, i) => {
        const colors = ['#60a5fa', '#22d3ee', '#34d399', '#fbbf24']
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

      {/* Orb that travels the pipeline */}
      <motion.circle
        r="4"
        fill="white"
        style={{
          offsetDistance: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
        className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
      />

      <defs>
        <linearGradient id="pipelineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="33%" stopColor="#22d3ee" />
          <stop offset="66%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

/* ── Individual step card with scroll-triggered progressive reveal ── */
function StepCard({
  step,
  Icon,
  index,
  sectionRef,
}: {
  step: typeof steps[0]
  Icon: React.ComponentType<{ className?: string }>
  index: number
  sectionRef: React.RefObject<HTMLDivElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const threshold = 0.15 + index * 0.12
  const cardProgress = useTransform(scrollYProgress, [threshold, threshold + 0.2], [0, 1])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Subtle background glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: bgGlows[index] }}
      />

      <div
        className={`relative rounded-2xl p-6 flex flex-col items-center text-center border ${borderColors[index]} bg-[rgba(255,255,255,0.02)] backdrop-blur-sm hover:bg-[rgba(255,255,255,0.05)] transition-all duration-500 hover:shadow-[0_0_40px_-8px] hover:-translate-y-1`}
        style={{ '--tw-shadow-color': bgGlows[index].replace('0.08', '0.15') } as React.CSSProperties}
      >
        {/* Icon circle with progressive border reveal */}
        <div className="relative">
          <motion.div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Animated gradient border ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${['#60a5fa', '#22d3ee', '#34d399', '#fbbf24'][index]}, transparent 60%)`,
                opacity: 0.4,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner fill */}
            <div className="absolute inset-[3px] rounded-full bg-deep-base/80" />

            {/* Number */}
            <span className={`absolute text-[22px] font-black opacity-15 ${accentColors[index]}`}>
              {step.num}
            </span>

            {/* Icon */}
            <Icon className={`w-7 h-7 relative z-10 ${accentColors[index]} group-hover:scale-110 transition-transform duration-300`} />
          </motion.div>

          {/* Ambient ring pulse */}
          <motion.div
            className={`absolute -inset-2 rounded-full border ${borderColors[index]} opacity-0 group-hover:opacity-100`}
            animate={{ scale: [1, 1.15, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5, delay: index * 0.4, repeat: Infinity }}
          />
        </div>

        <h3 className="text-[17px] font-semibold text-text-primary mt-5">{step.title}</h3>
        <p className="text-[14px] text-text-secondary leading-[1.7] mt-2 max-w-[220px]">{step.desc}</p>

        {/* Bottom accent bar */}
        <motion.div
          className={`h-0.5 rounded-full mt-5 w-0 bg-gradient-to-r ${gradients[index]}`}
          style={{ width: useTransform(cardProgress, [0, 1], ['0%', '40%']) } as any}
        />
      </div>
    </motion.div>
  )
}