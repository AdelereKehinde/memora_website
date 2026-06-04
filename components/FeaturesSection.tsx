// components/FeaturesSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Edit3, 
  Share2, 
  Bell, 
  Layers, 
  Image, 
  Users, 
  Zap, 
  Smartphone,
  Shield,
  GitBranch
} from 'lucide-react'

const features = [
  {
    icon: Edit3,
    title: "Rich Text Editor",
    description: "Powerful BlockNote editor with support for various block types, images, and embeds.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "See collaborators' cursors and edits in real-time. Comment and discuss seamlessly.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Layers,
    title: "Nested Documents",
    description: "Organize your notes hierarchically with parent-child relationships for better structure.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with instant alerts when documents are shared or important changes occur.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Image,
    title: "Customizable Documents",
    description: "Add emoji icons and cover images to personalize your documents and make them stand out.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Users,
    title: "Team Sharing",
    description: "Share documents with specific users, assigning editor or viewer roles for controlled access.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with instant updates and smooth real-time synchronization.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Work seamlessly across desktop and mobile devices with a fully responsive interface.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "Enterprise-grade security with Clerk authentication and Google sign-in support.",
    gradient: "from-white/20 to-white/5"
  },
  {
    icon: GitBranch,
    title: "Version History",
    description: "Track changes and revert to previous versions with built-in document history.",
    gradient: "from-white/20 to-white/5"
  }
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  return (
    <section ref={containerRef} id="features" className="relative py-32 px-4">
      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Everything you need to{' '}
            <span className="text-gray-400">collaborate</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Powerful features designed to make your team more productive and your workflow seamless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                
                <div className="mt-6 flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}