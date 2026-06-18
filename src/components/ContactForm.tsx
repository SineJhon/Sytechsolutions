'use client'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  contact: z.string().min(7, 'Phone or Telegram username is required'),
  email: z.string().email().optional().or(z.literal('')),
  service: z.enum(['website', 'web-app', 'ecommerce', 'uiux', 'saas', 'other']),
  description: z.string().min(20, 'Please describe your project (min 20 characters)'),
})

type FormData = z.infer<typeof schema>

interface PrefillData {
  serviceCategory: string
  serviceType: string
}

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefill?: PrefillData
}

const serviceOptions = [
  { value: 'website', label: 'Website Development' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'uiux', label: 'UI/UX Design' },
  { value: 'saas', label: 'SaaS Development' },
  { value: 'other', label: 'Other' },
]

const serviceCategoryOptions = [
  { value: 'Website Development', label: 'Website Development' },
  { value: 'E-Commerce Solutions', label: 'E-Commerce Solutions' },
  { value: 'Web Applications', label: 'Web Applications' },
  { value: 'ERP & Management Systems', label: 'ERP & Management Systems' },
  { value: 'Digital Transformation', label: 'Digital Transformation' },
]

const serviceTypeOptionsByCategory: Record<string, { value: string; label: string }[]> = {
  'Website Development': [
    { value: 'Business Website', label: 'Business Website' },
    { value: 'Restaurant Website & Online Ordering', label: 'Restaurant Website & Online Ordering' },
    { value: 'Personal Brand Website', label: 'Personal Brand Website' },
    { value: 'Link in Bio Website', label: 'Link in Bio Website' },
    { value: 'Portfolio Website', label: 'Portfolio Website' },
    { value: 'Event / Invitation Website', label: 'Event / Invitation Website' },
  ],
  'E-Commerce Solutions': [
    { value: 'E-Commerce Website', label: 'E-Commerce Website' },
    { value: 'Multi-Vendor Marketplace', label: 'Multi-Vendor Marketplace' },
  ],
  'Web Applications': [
    { value: 'Booking & Reservation System', label: 'Booking & Reservation System' },
    { value: 'Business Dashboard / CRM', label: 'Business Dashboard / CRM' },
    { value: 'Real Estate Platform', label: 'Real Estate Platform' },
  ],
  'ERP & Management Systems': [
    { value: 'ERP System (Offline-Capable)', label: 'ERP System (Offline-Capable)' },
    { value: 'School Management System', label: 'School Management System' },
    { value: 'Hospital / Clinic Management', label: 'Hospital / Clinic Management' },
  ],
  'Digital Transformation': [
    { value: 'Process Automation', label: 'Process Automation' },
    { value: 'Digital Presence Setup', label: 'Digital Presence Setup' },
    { value: 'System Integration', label: 'System Integration' },
  ],
}

export function ContactForm({ open, onOpenChange, prefill }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const prevOpenRef = useRef(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  /* When dialog opens, apply prefill */
  React.useEffect(() => {
    if (open && !prevOpenRef.current) {
      if (prefill?.serviceCategory) {
        setSelectedCategory(prefill.serviceCategory)
        const catMap: Record<string, 'website' | 'web-app' | 'ecommerce' | 'uiux' | 'saas' | 'other'> = {
          'Website Development': 'website',
          'E-Commerce Solutions': 'ecommerce',
          'Web Applications': 'web-app',
          'ERP & Management Systems': 'other',
          'Digital Transformation': 'saas',
        }
        setValue('service', catMap[prefill.serviceCategory] || 'other')
      } else {
        setSelectedCategory('')
      }
      if (prefill?.serviceType) {
        setSelectedType(prefill.serviceType)
      } else {
        setSelectedType('')
      }
      setSubmitted(false)
      setError('')
    }
    prevOpenRef.current = open
  }, [open, prefill, setValue])

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setSelectedType('')
    /* Map category title to the form service enum value */
    const catMap: Record<string, 'website' | 'web-app' | 'ecommerce' | 'uiux' | 'saas' | 'other'> = {
      'Website Development': 'website',
      'E-Commerce Solutions': 'ecommerce',
      'Web Applications': 'web-app',
      'ERP & Management Systems': 'other',
      'Digital Transformation': 'saas',
    }
    const serviceVal = catMap[cat] || 'other'
    setValue('service', serviceVal)
  }

  const onSubmit = async () => {
    try {
      setError('')
      const formData = new FormData(formRef.current!)
      const response = await fetch('https://formspree.io/f/xrevoeyp', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Failed to send. Please contact us on Telegram directly.')
      }
    } catch {
      setError('Failed to send. Please contact us on Telegram directly.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a Project</DialogTitle>
          <DialogDescription>
            Tell us about your project. We'll respond within 24 hours on Telegram or WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-10 gap-4 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald" />
              <h3 className="text-xl text-text-primary font-semibold">Message Sent!</h3>
              <p className="text-text-secondary text-sm">
                We'll reach out on Telegram or WhatsApp within a few hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 pb-2"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 font-medium">Full Name</label>
                <input
                  {...register('name')}
                  placeholder="Abebe Kebede"
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-xl h-[44px] px-4 text-text-primary text-[14px] focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-text-tertiary/40 outline-none"
                />
                {errors.name && <p className="text-[12px] text-red-400 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 font-medium">Phone or Telegram</label>
                <input
                  {...register('contact')}
                  placeholder="+251 91 234 5678 or @yourtelegram"
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-xl h-[44px] px-4 text-text-primary text-[14px] focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-text-tertiary/40 outline-none"
                />
                {errors.contact && <p className="text-[12px] text-red-400 mt-1">{errors.contact.message}</p>}
              </div>

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 font-medium">Email (optional)</label>
                <input
                  {...register('email')}
                  placeholder="you@example.com"
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-xl h-[44px] px-4 text-text-primary text-[14px] focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-text-tertiary/40 outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 font-medium">Service Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-xl h-[44px] px-4 text-text-primary text-[14px] focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all outline-none appearance-none"
                >
                  <option value="" className="bg-surface text-text-tertiary">Select a category...</option>
                  {serviceCategoryOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-surface text-text-primary">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 font-medium">Service Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-xl h-[44px] px-4 text-text-primary text-[14px] focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all outline-none appearance-none"
                  disabled={!selectedCategory}
                >
                  <option value="" className="bg-surface text-text-tertiary">
                    {selectedCategory ? 'Select a service type...' : 'Select a category first'}
                  </option>
                  {selectedCategory && (serviceTypeOptionsByCategory[selectedCategory] || []).map((o) => (
                    <option key={o.value} value={o.value} className="bg-surface text-text-primary">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hidden inputs for Formspree submission */}
              <input type="hidden" {...register('service')} />
              <input type="hidden" name="serviceCategory" value={selectedCategory} />
              <input type="hidden" name="serviceType" value={selectedType} />

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 font-medium">Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Briefly describe your project, goals, and timeline..."
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-xl px-4 py-3 text-text-primary text-[14px] focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-text-tertiary/40 outline-none resize-none"
                />
                {errors.description && <p className="text-[12px] text-red-400 mt-1">{errors.description.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full h-[48px] rounded-full font-semibold text-[15px] text-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden mb-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan to-emerald bg-[length:200%_100%] animate-shimmer" />
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
