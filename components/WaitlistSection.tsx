// components/WaitlistSection.tsx
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CheckCircle2, AlertCircle, Mail } from 'lucide-react'

export function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    
    setStatus('loading')
    setMessage('')
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You are now on the waitlist!')
        setEmail('')
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 5000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 5000)
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error. Please try again later.')
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 5000)
    }
  }

  return (
    <section id="waitlist" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="uppercase tracking-[0.35em] text-sm text-gray-400">Early Access</div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Join the{' '}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Memora
            </span>{' '}
            waitlist
          </h2>
          <p className="text-gray-400 max-w-xl leading-relaxed text-lg">
            Sign up to be the first to access Memora and the next wave of collaboration features. 
            We'll let you know as soon as the app and new releases go live.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email updates</p>
                  <p className="font-semibold text-white">Stay informed</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Receive notifications when new features are released.</p>
            </div>
            
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Early access</p>
                  <p className="font-semibold text-white">Be the first</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Get exclusive early access before the public launch.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
            
            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Reserve your spot</h3>
                <p className="text-gray-400 leading-relaxed">
                  Enter your email and we'll send you a confirmation. You'll be notified as soon as Memora is ready.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="w-full rounded-2xl bg-white text-black font-semibold py-3.5 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[min(90vw,400px)] rounded-2xl border border-white/10 bg-black/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 rounded-full p-1.5 ${status === 'success' ? 'bg-white/10 text-white' : 'bg-red-500/10 text-red-400'}`}>
                {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">
                  {status === 'success' ? 'Waitlist joined' : 'Error'}
                </p>
                <p className="text-sm text-gray-400 mt-1">{message}</p>
              </div>
              <button onClick={() => setToastVisible(false)} className="text-gray-500 hover:text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}