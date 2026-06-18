'use client'
import { motion } from 'framer-motion'
import { CountUp } from '@/components/shared/CountUp'

const stats = [
  { to: 2, suffix: '+', label: 'Happy Clients' },
  { to: 2, suffix: '+', label: 'Projects Delivered' },
  { to: 100, suffix: '%', label: 'Satisfaction Rate' },
]

export default function StatsBar() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="glass rounded-2xl border-white/[0.04]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`text-center py-8 px-6 ${i < stats.length - 1 ? 'border-r border-white/[0.04]' : ''} ${i === 2 ? 'border-r-0 md:border-r' : ''}`}
              >
                <div className="text-[34px] font-bold gradient-text">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="text-[13px] text-text-tertiary mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}