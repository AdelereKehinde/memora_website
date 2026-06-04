// components/CollaborationSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Users, TextCursor, MessageSquare, Share } from 'lucide-react'

const steps = [
  {
    icon: Users,
    title: "Invite Your Team",
    description: "Share documents with team members by email. Assign editor or viewer roles.",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    icon: TextCursor,
    title: "See Live Cursors",
    description: "Watch as collaborators edit in real-time with colorful cursors and presence indicators.",
    color: "from-green-500/20 to-teal-500/20"
  },
  {
    icon: MessageSquare,
    title: "Discuss & Comment",
    description: "Leave comments and have threaded discussions right within your documents.",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Share,
    title: "Instant Updates",
    description: "Changes sync instantly across all devices. Everyone stays on the same page.",
    color: "from-pink-500/20 to-red-500/20"
  }
]

export function CollaborationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} id="collaboration" className="relative py-32 px-4">
      <motion.div style={{ scale, opacity }} className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Built for{' '}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              real-time collaboration
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Experience the future of document collaboration with Liveblocks-powered real-time features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${step.color} border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Step {index + 1}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to transform your workflow?</h3>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of teams already using Memora to collaborate better.
          </p>
          <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105">
            Start Collaborating Free
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}