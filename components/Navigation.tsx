// components/Navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
            <span className="text-xl font-bold">Memora</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#collaboration" className="text-gray-400 hover:text-white transition-colors">Collaboration</a>
            <a href="#showcase" className="text-gray-400 hover:text-white transition-colors">Showcase</a>
            <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
              Get Started
            </button>
          </div>
          
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-6 space-y-4">
            <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#collaboration" className="block text-gray-400 hover:text-white transition-colors">Collaboration</a>
            <a href="#showcase" className="block text-gray-400 hover:text-white transition-colors">Showcase</a>
            <a href="#testimonials" className="block text-gray-400 hover:text-white transition-colors">Testimonials</a>
            <div className="pt-4 space-y-3">
              <button className="w-full px-4 py-3 text-gray-400 hover:text-white transition-colors border border-white/10 rounded-full">
                Sign In
              </button>
              <button className="w-full px-4 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}