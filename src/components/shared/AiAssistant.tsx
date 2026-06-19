'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUp, Mic, MicOff, Handshake, MessageCircle, Send, Bot, Cpu, ChevronDown, Phone } from 'lucide-react'
import { SUGGESTED_QUESTIONS, AVAILABLE_MODELS, ModelConfig } from '@/constants/ai-knowledge-enhanced'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface HandoffInfo {
  platform: 'telegram' | 'phone'
}

// ─── Typing Indicator ─────
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-4">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-[rgba(255,255,255,0.04)] border border-white/[0.06] rounded-[4px_16px_16px_16px] px-4 py-3 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-slate-400"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Handoff Card ───
function HandoffCard({ platform }: { platform: 'telegram' | 'phone' }) {
  const buildLink = (p: 'telegram' | 'phone') => {
    const text = `Hi SY Tech! I was chatting with your AI assistant and need help with my project. Can you assist?`
    return p === 'telegram'
      ? `https://t.me/SineJhon?text=${encodeURIComponent(text)}`
      : `tel:+251936913118`
  }

  return (
    <div className="mx-4 mb-2 bg-[rgba(255,255,255,0.04)] border border-white/[0.08] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Handshake className="w-5 h-5 text-accent" />
        <span className="text-[14px] font-semibold text-text-primary">Connect with Our Team</span>
      </div>
      <p className="text-[13px] text-text-secondary mb-3">We'll get back to you within 24 hours.</p>
      <div className="flex gap-2">
        <a href={buildLink('telegram')} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] border border-blue-400/30 bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition-colors">
          <Send className="w-3.5 h-3.5" /> Telegram
        </a>
        <a href={buildLink('phone')} className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[13px] border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 transition-colors">
          <Phone className="w-3.5 h-3.5" /> Phone
        </a>
      </div>
    </div>
  )
}

// ─── Message Bubble ───
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 mb-1`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[85%] px-3.5 py-2.5 text-[14px] leading-relaxed ${isUser ? 'bg-gradient-to-r from-accent to-cyan text-white rounded-[16px_4px_16px_16px]' : 'bg-[rgba(255,255,255,0.04)] border border-white/[0.06] text-slate-300 rounded-[4px_16px_16px_16px]'}`}>
        {message.content}
      </div>
    </motion.div>
  )
}

// ─── Suggested Questions ───
function SuggestedQuestions({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div className="px-4 mb-3">
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {SUGGESTED_QUESTIONS.map((q) => (
          <button key={q} onClick={() => onSelect(q)} className="flex-shrink-0 rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] px-4 py-2 text-[13px] text-slate-300 transition-all duration-150 whitespace-nowrap">
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Voice Button ───
function VoiceButton({ onSend }: { onSend: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return
    if (isListening && recognitionRef.current) { recognitionRef.current.stop(); setIsListening(false); return }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false
    recognitionRef.current = recognition
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join('')
      if (transcript.trim()) {
        onSend(transcript.trim())
      }
    }
    recognition.start()
  }, [isListening, onSend])

  useEffect(() => { return () => { if (recognitionRef.current) recognitionRef.current.stop() } }, [])

  return (
    <button onClick={startListening} className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${isListening ? 'bg-red-500/20 text-red-400 ring-2 ring-red-400/50' : 'bg-[rgba(255,255,255,0.06)] text-slate-400 hover:text-slate-200'}`} title="Click to speak" aria-label="Voice input">
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  )
}

// ─── Main Component ───
export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [handoff, setHandoff] = useState<HandoffInfo | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Listen for open-ai-chat event from FloatingContact
  useEffect(() => {
    const handleOpen = () => setIsOpen(prev => !prev)
    window.addEventListener('open-ai-chat', handleOpen)
    return () => window.removeEventListener('open-ai-chat', handleOpen)
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isLoading, handoff])

  const handleBotResponse = useCallback((reply: string) => {
    const cleanReply = reply.replace(/\[NAVIGATE:#[\w-]+\]/g, '').replace(/\[OPEN_FORM\]/g, '').replace(/\[HANDOFF:\w+\]/g, '').trim()
    const navMatch = reply.match(/\[NAVIGATE:(#[\w-]+)\]/)
    if (navMatch) setTimeout(() => { const el = document.querySelector(navMatch[1]); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 400)
    if (reply.includes('[OPEN_FORM]')) setTimeout(() => { window.dispatchEvent(new CustomEvent('open-contact-form')) }, 400)
    if (reply.includes('[HANDOFF:telegram]') || reply.includes('[HANDOFF:phone]')) {
      setHandoff({ platform: reply.includes('[HANDOFF:telegram]') ? 'telegram' : 'phone' })
    }
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: cleanReply, timestamp: new Date() }])
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return
    setShowWelcome(false)
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text.trim(), timestamp: new Date() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInputValue('')
    setIsLoading(true)
    setHandoff(null)
    try {
      const res = await fetch('/api/ai-bot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }) })
      const data = await res.json()
      handleBotResponse(data.reply)
    } catch {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: 'Sorry, something went wrong. Please try again or contact us on Telegram @SineJhon.', timestamp: new Date() }])
    } finally { setIsLoading(false) }
  }, [messages, isLoading, handleBotResponse])

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue) } }

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed z-50 bottom-0 left-0 right-0 h-[85vh] rounded-t-[20px] md:bottom-24 md:left-auto md:right-6 md:h-[520px] md:w-[380px] md:rounded-[20px] bg-[var(--color-card)]/97 backdrop-blur-2xl border border-[var(--color-border-light)] shadow-[0_-10px_40px_rgba(0,0,0,0.4)] md:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--color-border-light)] flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-text-primary leading-tight">Live Assistance</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-tertiary hover:text-text-primary transition-colors p-1" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages — scrollable area */}
            <div
              className="flex-1 overflow-y-auto py-4 space-y-3"
              style={{ scrollbarWidth: 'thin', overscrollBehavior: 'contain' }}
            >
              {showWelcome && (
                <div className="px-4 mb-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-[rgba(255,255,255,0.04)] border border-white/[0.06] rounded-[4px_16px_16px_16px] px-3.5 py-2.5 text-[14px] text-slate-300 leading-relaxed">
                      Hey there! I'm SY Tech Solutions Live Assistance. I can walk you through our services, pricing, portfolio — or help you kick off a new project. What's on your mind?
                    </div>
                  </div>
                </div>
              )}
              {showWelcome && <SuggestedQuestions onSelect={sendMessage} />}
              {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
              {handoff && <HandoffCard platform={handoff.platform} />}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--color-border-light)] flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 bg-[rgba(255,255,255,0.06)] border border-white/[0.08] focus:border-accent/40 rounded-xl px-3.5 py-2.5 text-[14px] text-text-primary placeholder:text-slate-500 outline-none resize-none transition-colors"
                  style={{ minHeight: '40px', maxHeight: '100px' }}
                  onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 100) + 'px' }}
                />
                <VoiceButton onSend={sendMessage} />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-accent to-cyan flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 hover:scale-105 transition-all duration-200 flex-shrink-0"
                  aria-label="Send"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}