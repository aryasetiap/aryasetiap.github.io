'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Button from './Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className={`max-w-6xl mx-auto px-6 py-3 rounded-full flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass shadow-xl' : 'bg-transparent'}`}>
        <Link href="/" className="text-xl font-bold text-gradient tracking-tight">
          Arya SP
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/projects" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            About
          </Link>
          <Button variant="outline" href="/about" className="text-xs px-4 py-1.5">
            Contact
          </Button>
        </div>

        <button className="md:hidden p-2 text-foreground">
          {/* Mobile menu icon would go here */}
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </nav>
    </header>
  )
}
