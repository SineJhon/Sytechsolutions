'use client'
import { useInView as useFramerInView } from 'framer-motion'
import { useRef } from 'react'

export function useInView(options = { once: true } as { once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useFramerInView(ref, { once: options.once })
  return { ref, isInView }
}