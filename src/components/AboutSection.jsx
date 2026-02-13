import { useEffect, useRef } from "react"
import * as THREE from "three"
import "../styles/AboutSection.css"

export default function AboutSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(500, 500)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.z = 5

    // Create glossy purple spheres
    const geometry1 = new THREE.SphereGeometry(1.2, 64, 64)
    const geometry2 = new THREE.SphereGeometry(1, 64, 64)
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x9b7bd6,
      metalness: 0.3,
      roughness: 0.1,
      envMapIntensity: 1
    })

    const sphere1 = new THREE.Mesh(geometry1, material)
    const sphere2 = new THREE.Mesh(geometry2, material)
    
    sphere1.position.set(0.5, 0.3, 0)
    sphere2.position.set(-0.3, -0.5, -0.5)
    
    scene.add(sphere1)
    scene.add(sphere2)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0xc8b3ff, 0.5, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      sphere1.rotation.y += 0.003
      sphere1.rotation.x += 0.002
      sphere2.rotation.y -= 0.002
      sphere2.rotation.x -= 0.003
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
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