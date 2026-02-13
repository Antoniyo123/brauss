import { useEffect, useState, useRef } from "react"
import * as THREE from "three"
import "../styles/Hero.css"

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(400, 400)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.z = 5

    // Create sphere
    const geometry = new THREE.SphereGeometry(1.5, 64, 64)
    const material = new THREE.MeshStandardMaterial({
      color: 0x9b7bd6,
      metalness: 0.3,
      roughness: 0.1,
      envMapIntensity: 1
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

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
      sphere.rotation.y += 0.005
      sphere.rotation.x += 0.003
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="hero">
      <div className="gradient-bg"></div>

      <div className={`hero-container ${visible ? "show" : ""}`}>
        <div className="hero-text">
          <span className="badge">Creative Digital Studio</span>

          <h1>
            Designing Future
            <span> Digital Brands</span>
          </h1>

          <p>
            We combine strategy, creativity, and technology to build
            impactful digital experiences that feel alive.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Start Project</button>
            <button className="secondary-btn">View Work</button>
          </div>
        </div>

        <div className="three-wrapper">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </section>
  )
}