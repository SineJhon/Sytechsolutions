'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Phone, Bot } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface FloatingContactProps {
  telegramUsername: string
  phoneNumber: string
}

export function FloatingContact({ telegramUsername, phoneNumber }: FloatingContactProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openAiChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'))
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={openAiChat}
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-accent to-cyan flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="Live Assistance"
                >
                  <Bot className="w-5 h-5 text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Live Assistance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`https://t.me/SineJhon`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#2CA5E0] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Send className="w-5 h-5 text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Telegram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`tel:${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Phone</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
