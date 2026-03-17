'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export default function Card({ children, className = '', animate = true }: CardProps) {
  const Comp = animate ? motion.div : 'div'
  
  return (
    <Comp
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={animate ? { y: -5 } : undefined}
      className={`glass glass-hover p-6 rounded-3xl ${className}`}
    >
      {children}
    </Comp>
  )
}
