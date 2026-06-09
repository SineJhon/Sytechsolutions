'use client'
import { useInView as useFramerInView } from 'framer-motion'
import { useRef } from 'react'

export function useInView(options = { once: true, margin: '-10%' }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useFramerInView(ref, { once: options.once, margin: options.margin })
  return { ref, isInView }
}