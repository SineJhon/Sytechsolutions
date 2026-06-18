import Image from 'next/image'
import { ExternalLink, Camera, MessageCircle, Send, Heart } from 'lucide-react'

const services = [
  { label: 'Website Development', href: '#services' },
  { label: 'E-Commerce Solutions', href: '#services' },
  { label: 'Web Applications', href: '#services' },
  { label: 'ERP & Management Systems', href: '#services' },
  { label: 'Digital Transformation', href: '#services' },
]

const company = [
  { label: 'About', href: '#' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: ExternalLink, href: '#', label: 'Website' },
  { icon: MessageCircle, href: 'https://wa.me/251936913118', target: '_blank', label: 'WhatsApp' },
  { icon: Send, href: 'https://t.me/SineJhon', target: '_blank', label: 'Telegram' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-deep-base noise" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 via-cyan/20 to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto pt-16 pb-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
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
            <p className="text-[14px] text-text-tertiary mt-4 max-w-[240px] leading-[1.7]">
              We Build the Technology Your Business Runs On
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.target || '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/5 text-text-tertiary hover:text-accent hover:border-accent/30 hover:bg-accent/10 flex items-center justify-center transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[14px] text-text-primary font-semibold mb-5">Services</h4>
            {services.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[13px] text-text-tertiary hover:text-text-primary transition-colors block mb-3 w-fit"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[14px] text-text-primary font-semibold mb-5">Company</h4>
            {company.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="text-[13px] text-text-tertiary hover:text-text-primary transition-colors block mb-3 w-fit"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="relative z-10 w-full h-px bg-gradient-to-r from-transparent via-accent/20 via-cyan/20 to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto py-5 px-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="text-[12px] text-text-tertiary">
          © 2026 SY Tech Solutions. All rights reserved.
        </span>
        <span className="text-[12px] text-text-tertiary flex items-center gap-1">
          Built by SY Tech Solutions <Heart className="w-3 h-3 text-red-400 animate-pulse" />
        </span>
      </div>
    </footer>
  )
}