'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { pricing } from '@/constants/pricing'

export default function Pricing() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <section id="pricing" className="relative section-padding px-6 noise overflow-hidden">
        {/* Section ambient glow */}
        <div className="absolute pointer-events-none top-[-200px] left-[-200px] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.1)] border border-accent/20 rounded-full px-4 py-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
              <span className="text-[12px] font-medium text-text-secondary tracking-wide">Pricing</span>
            </div>
            <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-text-primary">
              Transparent Pricing. <span className="gradient-text">No Surprises.</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-[540px] mx-auto">
              Every project starts with a free consultation. Prices are starting points — final cost depends on scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[980px] mx-auto">
            {pricing.map((tier, i) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={tier.featured ? 'glow-border' : ''}
              >
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 ${
                    tier.featured
                      ? 'glass shadow-[0_8px_32px_rgba(37,99,235,0.15)] group'
                      : 'glass group'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer text-white rounded-full text-[12px] px-5 py-1.5 font-medium whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className="text-[11px] font-mono text-cyan uppercase tracking-widest mb-3">
                    {tier.tier}
                  </div>
                  <div className="text-[28px] text-text-primary font-bold tracking-[-0.025em]">
                    {tier.price}
                  </div>
                  <div className="text-[13px] text-text-tertiary mb-6">{tier.subtitle}</div>
                  <div className="h-px bg-white/[0.06] mb-6" />
                  <div className="flex-1 space-y-3.5">
                    {tier.features.map((f) => (
                      <div key={f} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                        <span className="text-[14px] text-text-secondary">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setFormOpen(true)}
                    className={`w-full mt-8 h-[46px] rounded-full font-semibold text-[14px] transition-all duration-300 relative overflow-hidden ${
                      tier.featured
                        ? 'text-white hover:scale-[1.02]'
                        : 'border border-white/15 text-text-primary hover:border-accent/40'
                    }`}
                  >
                    {tier.featured ? (
                      <>
                        <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer" />
                        <span className="relative z-10">{tier.cta}</span>
                      </>
                    ) : (
                      tier.cta
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  )
}