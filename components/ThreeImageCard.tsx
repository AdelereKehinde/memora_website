// components/ThreeImageCard.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeImageCardProps {
  imageSrc: string
  alt: string
  className?: string
}

export function ThreeImageCard({ imageSrc, alt, className = '' }: ThreeImageCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create image texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(imageSrc)
    
    // Create plane with image
    const geometry = new THREE.PlaneGeometry(1.2, 1.5)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uGrayscale: { value: 0.3 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uHover;
        uniform float uGrayscale;
        
        void main() {
          vec2 uv = vUv;
          
          // Subtle distortion
          float distortion = sin(uv.y * 10.0 + uTime) * 0.01 * uHover;
          uv.x += distortion;
          
          vec4 color = texture2D(uTexture, uv);
          
          // Grayscale effect
          float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          vec3 grayColor = vec3(gray);
          vec3 finalColor = mix(grayColor, color.rgb, 1.0 - uGrayscale * (1.0 - uHover));
          
          // Vignette
          float vignette = 1.0 - length(vUv - 0.5) * 1.5;
          vignette = smoothstep(0.0, 1.0, vignette);
          finalColor *= vignette;
          
          gl_FragColor = vec4(finalColor, color.a);
        }
      `,
      transparent: true
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.z = -0.1
    scene.add(mesh)

    // Add border frame
    const borderGeometry = new THREE.EdgesGeometry(geometry)
    const borderMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.3 
    })
    const borderMesh = new THREE.LineSegments(borderGeometry, borderMaterial)
    mesh.add(borderMesh)

    // Particles around image
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 50
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const angle = (i / particlesCount) * Math.PI * 2
      posArray[i] = Math.cos(angle) * 0.8
      posArray[i + 1] = Math.sin(angle) * 1
      posArray[i + 2] = (Math.random() - 0.5) * 0.2
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.5
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    mesh.add(particlesMesh)

    camera.position.z = 2

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      material.uniforms.uTime.value += 0.01
      material.uniforms.uHover.value += (isHovered ? 1 : 0 - material.uniforms.uHover.value) * 0.1
      
      mesh.rotation.y += (isHovered ? 0.02 : 0.005)
      mesh.rotation.x += (isHovered ? 0.01 : 0.002)
      
      particlesMesh.rotation.z += 0.002
      
      borderMaterial.opacity += (isHovered ? 0.8 : 0.3 - borderMaterial.opacity) * 0.1
      
      renderer.render(scene, camera)
    }
    
    animate()

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [imageSrc, isHovered])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
