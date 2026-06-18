'use client'
import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const springPos = useSpring(0, { stiffness: 200, damping: 25 })

  useEffect(() => {
    if (window.innerWidth <= 768) return
    document.documentElement.classList.add('custom-cursor')
    setVisible(true)

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      springPos.set(1)
    }

    const hoverStart = () => setHovering(true)
    const hoverEnd = () => setHovering(false)

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', hoverStart)
      el.addEventListener('mouseleave', hoverEnd)
    })

    window.addEventListener('mousemove', move)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', hoverStart)
        el.removeEventListener('mouseleave', hoverEnd)
      })
    }
  }, [springPos])

  if (!visible) return null

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          background: '#ffffff',
          borderRadius: '50%',
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          width: hovering ? 42 : 28,
          height: hovering ? 42 : 28,
          opacity: hovering ? 0.4 : 1,
          x: pos.x - (hovering ? 21 : 14),
          y: pos.y - (hovering ? 21 : 14),
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
        }}
      />
    </>
  )
}