import { useEffect, useRef } from "react"
import * as THREE from "three"
import "./Hero.css"

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(500, 500)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.set(0, 0, 6)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    // Create two overlapping glossy purple spheres
    const spheres = []
    
    // Large sphere (back)
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xb5a3d6,
        metalness: 0.3,
        roughness: 0.08,
        envMapIntensity: 1
      })
    )
    sphere1.position.set(0.3, 0.4, -0.3)
    spheres.push({ 
      mesh: sphere1,
      initialPos: { x: 0.3, y: 0.4, z: -0.3 },
      speed: { x: 0.002, y: 0.003 },
      floatSpeed: 1,
      floatAmount: 0.15
    })
    
    // Medium sphere (front, slightly lower)
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xa08cc9,
        metalness: 0.3,
        roughness: 0.08,
        envMapIntensity: 1
      })
    )
    sphere2.position.set(-0.2, -0.3, 0.2)
    spheres.push({ 
      mesh: sphere2,
      initialPos: { x: -0.2, y: -0.3, z: 0.2 },
      speed: { x: -0.0025, y: -0.002 },
      floatSpeed: 1.2,
      floatAmount: 0.18
    })
    
    spheres.forEach(({ mesh }) => scene.add(mesh))

    // Lighting for soft glossy effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0xd4c5f0, 0.6, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const rimLight = new THREE.PointLight(0xe8dff5, 0.5, 100)
    rimLight.position.set(0, 0, -5)
    scene.add(rimLight)

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect()
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    let time = 0
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      time += 0.01
      
      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      
      spheres.forEach(({ mesh, speed, initialPos, floatSpeed, floatAmount }, index) => {
        // Rotation
        mesh.rotation.y += speed.x
        mesh.rotation.x += speed.y
        
        // Floating animation
        const floatY = Math.sin(time * floatSpeed + index * 2) * floatAmount
        const floatX = Math.cos(time * floatSpeed * 0.5 + index * 2) * (floatAmount * 0.5)
        
        // Mouse interaction
        const mouseFactor = (index + 1) * 0.15
        mesh.position.x = initialPos.x + floatX + (targetX * mouseFactor)
        mesh.position.y = initialPos.y + floatY + (targetY * mouseFactor)
        
        // Subtle scale pulse
        const scale = 1 + Math.sin(time * 1.5 + index * 2) * 0.015
        mesh.scale.set(scale, scale, scale)
      })
      
      // Camera gentle movement
      camera.position.x = targetX * 0.15
      camera.position.y = targetY * 0.15
      camera.lookAt(0, 0, 0)
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="three-wrapper">
          <canvas ref={canvasRef}></canvas>
        </div>

        <div className="hero-content">
          <h1>About Us</h1>
          <p className="hero-description">
            Brauss Group is an integrated event ecosystem specializing in Event Management, 
            Digital Ageno and Event Promotion. Delivering seamless execution from ideas to impact. 
            Founded on the belief that brands deserve bold strategies paired with reliable delivery 
            Brauss combines creativity, technical excellence, and strategic ampplification to create 
            high-value experiences.
          </p>
          <div className="values-badge">
            Precision<span>|</span>Creativity<span>|</span>Reliability<span>|</span>Integrity
          </div>
        </div>
      </div>
    </section>
  )
}