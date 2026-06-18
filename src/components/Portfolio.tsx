'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { portfolio } from '@/constants/portfolio'
import { ExternalLink, ChevronDown } from 'lucide-react'

const categories = [
  { value: 'all', label: 'All Work' },
  { value: 'website', label: 'Websites' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'ecommerce', label: 'E-Commerce' },
]

const INITIAL_COUNT = 3

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = filter === 'all' ? portfolio : portfolio.filter((p) => p.category === filter)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)

  return (
    <section id="portfolio" className="relative section-padding px-6 noise overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute pointer-events-none bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-emerald/5 blur-[120px] rounded-full" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[rgba(16,185,129,0.1)] border border-emerald/20 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald animate-glow-pulse" />
            <span className="text-[13px] font-semibold text-text-secondary tracking-wider uppercase">Our Work</span>
          </div>
          <h2 className="text-[38px] md:text-[44px] font-bold tracking-[-0.03em] text-text-primary">
            Products We've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-text-secondary mt-4">Every project is custom-designed and custom-built. No templates.</p>
        </div>

        <div className="mb-10 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="overflow-x-auto scrollbar-hide -mb-1 pb-1">
            <Tabs defaultValue="all" value={filter} onValueChange={(v) => { setFilter(v); setShowAll(false) }}>
              <TabsList className="w-max">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value}>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glow-card overflow-hidden group"
              >
                <a
                  href={project.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative overflow-hidden">
                    <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-accent/10 via-cyan/5 to-emerald/5 overflow-hidden">
                      {project.customDomain || project.href ? (
                        <iframe
                          src={project.customDomain || project.href || ''}
                          title={project.title}
                          className="w-[150%] h-[150%] border-0 origin-top-left scale-[0.667] pointer-events-none"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-text-tertiary text-sm font-mono">Coming Soon</span>
                        </div>
                      )}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-base via-deep-base/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                      <span className="text-white text-[15px] font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Project <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      <span className="bg-emerald/20 text-emerald text-[11px] rounded-full px-3 py-1 font-medium backdrop-blur-sm">
                        {project.category === 'website' ? 'Website' : project.category === 'web-app' ? 'Web App' : 'E-Commerce'}
                      </span>
                      {project.status === 'building' && (
                        <span className="bg-amber/20 text-amber text-[11px] rounded-full px-3 py-1 font-medium backdrop-blur-sm">
                          Building
                        </span>
                      )}
                    </div>
                  </div>
                </a>
                <div className="p-5">
                  <a href={project.href || '#'} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-[17px] font-semibold text-text-primary group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>
                  </a>
                  <p className="text-[13px] text-text-secondary leading-[1.65] mt-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] bg-[rgba(255,255,255,0.04)] text-text-tertiary rounded-full px-3 py-1 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See more button */}
        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:border-accent/40 transition-all duration-300 text-[14px] font-medium"
            >
              {showAll ? 'Show Less' : `See More (${filtered.length - INITIAL_COUNT} more)`}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}