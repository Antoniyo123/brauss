import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import "../styles/Contact.css"

export default function Contact() {
  const canvasRef = useRef(null)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: ""
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })
    
    renderer.setSize(700, 700)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.set(0, 0, 10)

    // Mouse interaction variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    // Create multiple glossy purple spheres with better placement
    const spheres = []
    
    // Main large sphere (center-right)
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1.8, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xa890d3,
        metalness: 0.4,
        roughness: 0.05,
        envMapIntensity: 1
      })
    )
    sphere1.position.set(2.5, 0.5, 0)
    spheres.push({ 
      mesh: sphere1, 
      speed: { x: 0.002, y: 0.003 },
      initialPos: { x: 2.5, y: 0.5, z: 0 },
      floatSpeed: 0.8,
      floatAmount: 0.3
    })
    
    // Medium sphere (bottom-right)
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.3, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x9b7bd6,
        metalness: 0.4,
        roughness: 0.05,
        envMapIntensity: 1
      })
    )
    sphere2.position.set(1.8, -2.5, -0.5)
    spheres.push({ 
      mesh: sphere2, 
      speed: { x: -0.003, y: -0.002 },
      initialPos: { x: 1.8, y: -2.5, z: -0.5 },
      floatSpeed: 1.2,
      floatAmount: 0.4
    })
    
    // Small sphere (top-right)
    const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xb39dd9,
        metalness: 0.4,
        roughness: 0.05,
        envMapIntensity: 1
      })
    )
    sphere3.position.set(3.5, 2.5, -1)
    spheres.push({ 
      mesh: sphere3, 
      speed: { x: 0.004, y: -0.002 },
      initialPos: { x: 3.5, y: 2.5, z: -1 },
      floatSpeed: 1.5,
      floatAmount: 0.25
    })
    
    // Extra small sphere (bottom-center)
    const sphere4 = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xc8b3e8,
        metalness: 0.4,
        roughness: 0.05,
        envMapIntensity: 1
      })
    )
    sphere4.position.set(0, -3.5, -1.5)
    spheres.push({ 
      mesh: sphere4, 
      speed: { x: -0.002, y: 0.004 },
      initialPos: { x: 0, y: -3.5, z: -1.5 },
      floatSpeed: 2,
      floatAmount: 0.35
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

    const pointLight3 = new THREE.PointLight(0xe0d4ff, 0.6, 100)
    pointLight3.position.set(0, -5, -5)
    scene.add(pointLight3)

    const rimLight = new THREE.PointLight(0xffffff, 0.5, 100)
    rimLight.position.set(-3, 3, -3)
    scene.add(rimLight)

    // Mouse move handler for interactive effect
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
        
        // Floating animation with different phases
        const floatY = Math.sin(time * floatSpeed + index) * floatAmount
        const floatX = Math.cos(time * floatSpeed * 0.5 + index) * (floatAmount * 0.5)
        
        // Mouse interaction - different sensitivity for each sphere
        const mouseFactor = (index + 1) * 0.15
        mesh.position.x = initialPos.x + floatX + (targetX * mouseFactor)
        mesh.position.y = initialPos.y + floatY + (targetY * mouseFactor)
        
        // Subtle scale pulse
        const scale = 1 + Math.sin(time * 2 + index) * 0.03
        mesh.scale.set(scale, scale, scale)
      })
      
      // Camera gentle movement
      camera.position.x = targetX * 0.3
      camera.position.y = targetY * 0.3
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-left">
            <h2>Contact Us</h2>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.05-.92-.09-2.32.02-3.32l.69-2.93s-.18-.35-.18-.87c0-.82.47-1.43 1.06-1.43.5 0 .74.37.74.82 0 .5-.32 1.24-.48 1.93-.14.57.29 1.03.86 1.03 1.03 0 1.82-1.08 1.82-2.64 0-1.38-1-2.35-2.41-2.35-1.64 0-2.6 1.23-2.6 2.5 0 .5.19.97.43 1.24a.3.3 0 0 1 .07.29l-.15.65c-.02.11-.1.13-.21.08-.74-.34-1.2-1.42-1.2-2.28 0-1.86 1.35-3.57 3.89-3.57 2.04 0 3.63 1.46 3.63 3.4 0 2.03-1.28 3.67-3.05 3.67-.6 0-1.16-.31-1.35-.68l-.37 1.4c-.13.5-.49 1.13-.73 1.51.55.17 1.13.26 1.74.26A12 12 0 1 0 12 0z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        <div className="canvas-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>

      <div className="contact-footer">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
      </div>
    </section>
  )
}