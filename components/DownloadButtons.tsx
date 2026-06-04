"use client"

import { useState } from 'react'
import Image from 'next/image'
import { StoreModal } from './StoreModal'
import playStoreImg from '@/public/playstore.png'
import appStoreImg from '@/public/appstore.png'

export default function DownloadButtons() {
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false)
  const [isAppStoreModalOpen, setIsAppStoreModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => setIsPlayStoreModalOpen(true)}
          className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
        >
          <Image src={playStoreImg} alt="Play Store" className="w-5 h-5" />
          <span>Play Store</span>
        </button>

        <button 
          onClick={() => setIsAppStoreModalOpen(true)}
          className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
        >
          <Image src={appStoreImg} alt="App Store" className="w-5 h-5" />
          <span>App Store</span>
        </button>
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
    </>
  )
}



