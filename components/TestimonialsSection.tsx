// components/TestimonialsSection.tsx
'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Adelere Kehinde",
    role: "FullStack Developer at Handled",
    content: "Memora has completely transformed how our team collaborates on documentation. The real-time editing is seamless and the nested document structure keeps everything organized.",
    rating: 5
  },
  {
    name: "Jamal Ademola",
    role: "Mobile developer at Earnicle",
    content: "We switched from Notion to Memora and haven't looked back. The performance is incredible and the sharing features are exactly what we needed.",
    rating: 5
  },
  {
    name: "Maquambe Brown",
    role: "CEO of Handled",
    content: "The clean interface and powerful editing capabilities make Memora a joy to use. Our design documentation has never been more organized.",
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Loved by{' '}
            <span className="text-gray-400">teams</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            See why teams choose Memora for their collaborative documentation needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-white text-white" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
              
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}