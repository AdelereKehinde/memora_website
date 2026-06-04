'use client'

import { useState } from 'react'
import Image from 'next/image'
import { StoreModal } from './StoreModal'
import playStoreImg from '@/public/playstore.png'
import appStoreImg from '@/public/appstore.png'

export function DownloadSection() {
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false)
  const [isAppStoreModalOpen, setIsAppStoreModalOpen] = useState(false)
  return (
    <section className="relative py-24 px-4" id="download">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">Mobile access</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Download Memora for mobile</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          Get instant access to your notes and collaboration tools on the go. The mobile app is coming soon to both iOS and Android.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => setIsPlayStoreModalOpen(true)}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Image src={playStoreImg} alt="Play Store" className="w-6 h-6" />
            <span>Play Store</span>
          </button>
          <button 
            onClick={() => setIsAppStoreModalOpen(true)}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Image src={appStoreImg} alt="App Store" className="w-6 h-6" />
            <span>App Store</span>
          </button>
        </div>
      </div>

      <StoreModal 
        isOpen={isPlayStoreModalOpen} 
        storeName="playstore" 
        onClose={() => setIsPlayStoreModalOpen(false)} 
      />
      <StoreModal 
        isOpen={isAppStoreModalOpen} 
        storeName="appstore" 
        onClose={() => setIsAppStoreModalOpen(false)} 
      />
    </section>
  )
}


