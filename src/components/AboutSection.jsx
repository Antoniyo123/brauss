import { useEffect, useRef } from "react"
import * as THREE from "three"
import "../styles/AboutSection.css"

export default function AboutSection() {
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
    
    renderer.setSize(550, 550)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.set(0, 0, 6)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    // Create glossy purple spheres with better placement
    const spheres = []
    
    // Large sphere (top-right)
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xa890d3,
        metalness: 0.4,
        roughness: 0.05,
        envMapIntensity: 1
      })
    )
    sphere1.position.set(0.8, 0.6, 0)
    spheres.push({ 
      mesh: sphere1,
      initialPos: { x: 0.8, y: 0.6, z: 0 },
      speed: { x: 0.002, y: 0.003 },
      floatSpeed: 1,
      floatAmount: 0.2
    })
    
    // Medium sphere (bottom-left)
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x9b7bd6,
        metalness: 0.4,
        roughness: 0.05,
        envMapIntensity: 1
      })
    )
    sphere2.position.set(-0.5, -0.8, -0.5)
    spheres.push({ 
      mesh: sphere2,
      initialPos: { x: -0.5, y: -0.8, z: -0.5 },
      speed: { x: -0.003, y: -0.002 },
      floatSpeed: 1.3,
      floatAmount: 0.25
    })
    
    spheres.forEach(({ mesh }) => scene.add(mesh))

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0xffffff, 1.2, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0xc8b3ff, 0.8, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const rimLight = new THREE.PointLight(0xe0d4ff, 0.6, 100)
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
        const mouseFactor = (index + 1) * 0.2
        mesh.position.x = initialPos.x + floatX + (targetX * mouseFactor)
        mesh.position.y = initialPos.y + floatY + (targetY * mouseFactor)
        
        // Subtle scale pulse
        const scale = 1 + Math.sin(time * 1.5 + index * 2) * 0.02
        mesh.scale.set(scale, scale, scale)
      })
      
      // Camera gentle movement
      camera.position.x = targetX * 0.2
      camera.position.y = targetY * 0.2
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
    <section className="about-section">
      <div className="content-wrapper">
        <div className="content-container">
          <div className="text-content">
            <h1>About Us</h1>
            <p className="description">
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

          <div className="canvas-container">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  )
}