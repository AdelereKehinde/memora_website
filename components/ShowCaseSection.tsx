// components/ShowcaseSection.tsx
'use client'

import { motion } from 'framer-motion'
import { ThreeImageCard } from './ThreeImageCard'

export function ShowcaseSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Beautiful by{' '}
            <span className="text-gray-400">default</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            A stunning interface that makes collaboration a joy, not a chore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ThreeImageCard 
              imageSrc="/dashboard.png" 
              alt="Dashboard"
              className="h-[500px]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ThreeImageCard 
              imageSrc="/editor.png" 
              alt="Editor"
              className="h-[500px]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ThreeImageCard 
              imageSrc="/sharing.png" 
              alt="Sharing"
              className="h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}