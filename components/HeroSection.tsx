// components/HeroSection.tsx (updated)
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
            Now in Public Beta
          </span>
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your ideas,{' '}
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            amplified
          </span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A collaborative document editor that brings your team together. 
          Create, organize, and collaborate in real-time with the simplicity of a wiki 
          and the power of modern editing.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
            <span className="flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <a 
            href="#showcase" 
            className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </span>
          </a>
        </motion.div>

        
        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            No credit card required
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Free plan available</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">2,000+ teams onboard</span>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 0.5 },
            y: { delay: 1.5, duration: 2, repeat: Infinity }
          }}
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black to-transparent z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black to-transparent z-10"></div>
    </section>
  )
}