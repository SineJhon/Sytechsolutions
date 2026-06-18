'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useScrolled } from '@/hooks/useScrolled'
import { ContactForm } from '@/components/ContactForm'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const scrolled = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1200px] rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="h-[64px] px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-[36px] h-[36px] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/sy-logo.svg"
                alt="SY"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-black tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-emerald animate-shimmer bg-[length:200%_100%]">
                SY TECH
              </span>
              <span className="text-[9px] font-semibold tracking-[0.35em] text-text-tertiary uppercase mt-0.5">
                SOLUTIONS
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-accent after:to-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop right group */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setFormOpen(true)}
              className="h-[38px] px-5 rounded-full text-white text-sm font-semibold items-center justify-center transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_24px_var(--color-accent-glow)] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer" />
              <span className="relative z-10">Start a Project</span>
            </button>
          </div>

          {/* Mobile right group */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-text-primary/80 hover:text-text-primary transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[var(--color-card)]/95 backdrop-blur-2xl border-l border-border p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-[36px] h-[36px] flex-shrink-0">
                    <Image
                      src="/sy-logo.svg"
                      alt="SY"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[15px] font-black tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-emerald">
                      SY TECH
                    </span>
                    <span className="text-[9px] font-semibold tracking-[0.35em] text-text-tertiary uppercase mt-0.5">
                      SOLUTIONS
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors p-1"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-5 flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[18px] text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileOpen(false)
                  setFormOpen(true)
                }}
                className="w-full h-[48px] rounded-full text-white font-semibold text-sm flex items-center justify-center relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer" />
                <span className="relative z-10">Start a Project</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ContactForm open={formOpen} onOpenChange={setFormOpen} />
    </>
  )
}