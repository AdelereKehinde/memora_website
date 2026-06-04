// components/ThreeVideoShowcase.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function ThreeVideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    )
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    containerRef.current.appendChild(renderer.domElement)

    // Create video element
    const video = document.createElement('video')
    video.src = '/memora.mp4'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.preload = 'auto'
    
    // Create video texture
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.colorSpace = THREE.SRGBColorSpace

    // Create a simple clean plane for the video
    const aspectRatio = 16 / 9
    const planeHeight = 3.5
    const planeWidth = planeHeight * aspectRatio
    
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
    
    // Simple material just to display the video clearly
    const material = new THREE.MeshBasicMaterial({
      map: videoTexture,
      color: 0xffffff,
    })

    const videoPlane = new THREE.Mesh(geometry, material)
    scene.add(videoPlane)

    // Subtle floating particles around the video for elegance
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 150
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const angle = (i / particlesCount) * Math.PI * 2
      const radius = 3 + Math.random() * 1.5
      posArray[i] = Math.cos(angle) * radius
      posArray[i + 1] = (Math.random() - 0.5) * planeHeight * 0.8
      posArray[i + 2] = (Math.random() - 0.5) * 0.5 - 1
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.4,
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create a fallback static image for when video isn't playing
    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Create a dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0a0a0a')
      gradient.addColorStop(1, '#000000')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add text
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Memora Demo', canvas.width / 2, canvas.height / 2 - 30)
      
      ctx.fillStyle = '#a3a3a3'
      ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('Click to watch the demo', canvas.width / 2, canvas.height / 2 + 30)
    }
    
    const fallbackTexture = new THREE.CanvasTexture(canvas)
    fallbackTexture.colorSpace = THREE.SRGBColorSpace
    
    // Function to play video safely
    const playVideo = async () => {
      try {
        // Set the material to use video texture
        material.map = videoTexture
        material.needsUpdate = true
        
        await video.play()
        setIsPlaying(true)
        setShowPlayButton(false)
      } catch (error) {
        console.log('Video play failed:', error)
        // Keep showing fallback
        material.map = fallbackTexture
        material.needsUpdate = true
        setShowPlayButton(true)
      }
    }

    // Initially show fallback
    material.map = fallbackTexture
    material.needsUpdate = true

    camera.position.z = 6

    // Mouse interaction for subtle tilt
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', onMouseMove)

    // Animation
    const clock = new THREE.Clock()
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      const delta = clock.getDelta()
      
      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Very subtle tilt based on mouse
      videoPlane.rotation.y = mouseX * 0.1
      videoPlane.rotation.x = mouseY * 0.05

      // Gentle particle rotation
      particlesMesh.rotation.y += 0.0002
      particlesMesh.rotation.x += 0.0001

      renderer.render(scene, camera)
    }

    animate()

    // Handle click to play
    const handleClick = () => {
      if (!isPlaying) {
        playVideo()
      }
    }

    containerRef.current.addEventListener('click', handleClick)

    // Try to autoplay (will work if user has interacted before)
    if (document.readyState === 'complete') {
      playVideo()
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          playVideo()
        }, 1000)
      })
    }

    // Intersection Observer to play when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying) {
            playVideo()
          }
        })
      },
      { threshold: 0.5 }
    )
    
    observer.observe(containerRef.current)

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      containerRef.current?.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationId)
      video.pause()
      video.src = ''
      video.load()
      containerRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [isPlaying])

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[500px] cursor-pointer"
      />
      
      {/* Play button overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <button 
            className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
            onClick={() => {
              const video = document.querySelector('video')
              if (video) {
                video.play().then(() => {
                  setIsPlaying(true)
                  setShowPlayButton(false)
                }).catch(console.error)
              }
            }}
          >
            <svg 
              className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}