'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import playStoreImg from '@/public/playstore.png'
import appStoreImg from '@/public/appstore.png'

interface StoreModalProps {
  isOpen: boolean
  storeName: 'playstore' | 'appstore'
  onClose: () => void
}

export function StoreModal({ isOpen, storeName, onClose }: StoreModalProps) {
  const isPlayStore = storeName === 'playstore'
  const title = isPlayStore ? 'Coming Soon on Play Store' : 'Coming Soon on App Store'
  const description = isPlayStore 
    ? 'The Memora Android app will be available on Google Play Store soon. Join the waitlist to be notified when it launches.'
    : 'The Memora iOS app will be available on the Apple App Store soon. Join the waitlist to be notified when it launches.'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-2xl shadow-black/50"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-8">
              {/* Header with icon */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {isPlayStore ? (
                    <Image src={playStoreImg} alt="Play Store" className="w-12 h-12" />
                  ) : (
                    <Image src={appStoreImg} alt="App Store" className="w-12 h-12" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-base leading-relaxed">
                {description}
              </p>

              {/* Feature highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Real-time collaboration on the go</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Offline access and instant sync</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">Full feature parity with web version</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                    onClose()
                  }}
                  className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
