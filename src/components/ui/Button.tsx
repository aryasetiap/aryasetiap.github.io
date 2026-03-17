'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
}

export default function Button({ children, href, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = 'px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95',
    outline: 'border border-blue-500/30 text-blue-500 hover:bg-blue-500/10 glass',
    ghost: 'text-foreground/80 hover:bg-foreground/5 hover:text-foreground',
  }

  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="focus:outline-none">
      {content}
    </button>
  )
}
