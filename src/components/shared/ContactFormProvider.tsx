'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ContactForm } from '@/components/ContactForm'

interface PrefillData {
  serviceCategory: string
  serviceType: string
}

interface ContactFormContextType {
  open: boolean
  setOpen: (open: boolean) => void
  prefill: PrefillData
  openWithPrefill: (category: string, type: string) => void
}

const ContactFormCtx = createContext<ContactFormContextType | null>(null)

export function useContactForm(): ContactFormContextType {
  const ctx = useContext(ContactFormCtx)
  if (!ctx) {
    throw new Error('useContactForm must be used within a ContactFormProvider')
  }
  return ctx
}

export default function ContactFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [prefill, setPrefill] = useState<PrefillData>({ serviceCategory: '', serviceType: '' })

  const openWithPrefill = (category: string, type: string) => {
    setPrefill({ serviceCategory: category, serviceType: type })
    setOpen(true)
  }

  /* Listen for custom event from FloatingContact's "Start a Project" button */
  React.useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-contact-form', handler)
    return () => window.removeEventListener('open-contact-form', handler)
  }, [])

  return (
    <ContactFormCtx.Provider value={{ open, setOpen, prefill, openWithPrefill }}>
      {children}
      <ContactForm open={open} onOpenChange={setOpen} prefill={prefill} />
    </ContactFormCtx.Provider>
  )
}
