// components/ThreeScene.tsx
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    
    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10
      
      // White to gray gradient
      const shade = Math.random() * 0.5 + 0.5
      colorArray[i] = shade
      colorArray[i + 1] = shade
      colorArray[i + 2] = shade
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Floating geometric shapes
    const shapes: THREE.Mesh[] = []
    const geometries = [
      new THREE.OctahedronGeometry(0.3),
      new THREE.TorusGeometry(0.2, 0.05, 16, 32),
      new THREE.IcosahedronGeometry(0.25),
      new THREE.TetrahedronGeometry(0.3),
      new THREE.TorusKnotGeometry(0.2, 0.05, 64, 8)
    ]
    
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(Math.random() * 0.3 + 0.7, Math.random() * 0.3 + 0.7, Math.random() * 0.3 + 0.7),
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })
      const mesh = new THREE.Mesh(geometry, material)
      
      mesh.position.x = (Math.random() - 0.5) * 8
      mesh.position.y = (Math.random() - 0.5) * 6
      mesh.position.z = (Math.random() - 0.5) * 4
      
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        floatSpeed: Math.random() * 0.002 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: mesh.position.y
      }
      
      shapes.push(mesh)
      scene.add(mesh)
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 10)
    pointLight1.position.set(2, 3, 4)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 10)
    pointLight2.position.set(-2, -1, -3)
    scene.add(pointLight2)

    camera.position.z = 5
    camera.position.y = 1

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.maxPolarAngle = Math.PI / 1.5

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', onMouseMove)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      
      const time = Date.now() * 0.001
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0001
      particlesMesh.rotation.y += 0.0002
      
      // Animate shapes
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed.x
        shape.rotation.y += shape.userData.rotationSpeed.y
        shape.rotation.z += shape.userData.rotationSpeed.z
        
        shape.position.y = shape.userData.originalY + 
          Math.sin(time * shape.userData.floatSpeed * 100 + shape.userData.floatOffset) * 0.5
        
        shape.position.x += (mouseX * 0.5 - shape.position.x) * 0.001
        shape.position.y += (mouseY * 0.5 - shape.position.y) * 0.001
      })
      
      controls.update()
      renderer.render(scene, camera)
    }
    
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0" />
}