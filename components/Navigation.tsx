// components/Navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleGetStarted = () => {
    window.location.href = 'https://memora-one-omega.vercel.app/'
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/memora.png"
              alt="Memora Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">Memora</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>

            <a
              href="#collaboration"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('collaboration')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Collaboration
            </a>

            <a
              href="#showcase"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('showcase')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Showcase
            </a>

            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('testimonials')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Testimonials
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Desktop Get Started */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="block text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>

            <a
              href="#collaboration"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                document
                  .getElementById('collaboration')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="block text-gray-400 hover:text-white transition-colors"
            >
              Collaboration
            </a>

            <a
              href="#showcase"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                document
                  .getElementById('showcase')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="block text-gray-400 hover:text-white transition-colors"
            >
              Showcase
            </a>

            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                document
                  .getElementById('testimonials')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="block text-gray-400 hover:text-white transition-colors"
            >
              Testimonials
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="block text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>

            {/* Mobile Get Started */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleGetStarted()
                }}
                className="w-full px-4 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
