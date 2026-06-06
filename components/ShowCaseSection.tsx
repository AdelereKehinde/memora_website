// components/ShowcaseSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ThreeVideoShowcase } from './ThreeVideoShowcase'

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="showcase" ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 mb-6 text-sm border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            See it in action
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            Experience the{' '}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              future of collaboration
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Watch how Memora transforms the way teams create, organize, and collaborate 
            on documents. Real-time editing with TipTap, nested structures, and seamless sharing — 
            all in one beautifully designed workspace.
          </p>
        </motion.div>

        <motion.div
          style={{ scale, opacity }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 rounded-3xl blur-3xl"></div>
          
          {/* Video container with subtle border */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
            <ThreeVideoShowcase />
          </div>
        </motion.div>
      </div>
    </section>
  )
}