// components/CTASection.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Start building your{' '}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              knowledge base
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams already using Memora to create, organize, and collaborate 
            on documents in real-time. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} className="group px-10 py-5 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center justify-center">
                <span className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
            
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border-2 border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-500 text-sm">Optimized for speed with instant real-time sync</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-gray-500 text-sm">Bank-grade encryption and secure authentication</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Access Anywhere</h3>
                <p className="text-gray-500 text-sm">Work from any device with full responsive design</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}