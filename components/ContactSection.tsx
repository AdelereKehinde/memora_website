'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { CheckCircle2, AlertCircle, Mail } from 'lucide-react'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) {
      setStatus('error')
      setResponseMessage('Please fill in all fields.')
      setToastVisible(true)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setResponseMessage('Thank you! We received your message and will get back to you soon.')
        setToastVisible(true)
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setResponseMessage(data.error || 'Something went wrong. Please try again.')
        setToastVisible(true)
      }
    } catch (err) {
      setStatus('error')
      setResponseMessage('Network error. Please try again later.')
      setToastVisible(true)
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to collaborate? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(86,203,242,0.2),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.2),_transparent_30%)]"></div>
          <div className="relative z-10 space-y-5">
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white focus:ring-2 focus:ring-white/20 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[min(90vw,360px)] rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 rounded-full p-2 ${status === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-semibold text-white">{status === 'success' ? 'Message sent' : 'Error'}</p>
                <p className="text-sm text-gray-300">{responseMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
