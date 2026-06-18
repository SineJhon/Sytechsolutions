'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  duration?: number
}

export function Toast({ open, onClose, title, description, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full"
        >
          <div className="bg-surface border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-4 flex items-start gap-3 backdrop-blur-xl">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-full bg-emerald/15 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-semibold text-sm">{title}</p>
              {description && (
                <p className="text-text-secondary text-xs mt-1 leading-relaxed">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-text-tertiary hover:text-text-primary transition-colors mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}