import { useEffect, useRef } from "react"
import * as THREE from "three"
import "./Hero.css"
import badgeImg from "../assets/badges.png"

export default function Hero() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const w = mount.clientWidth, h = mount.clientHeight
    const scene = new THREE.Scene()
    scene.background = null
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0, 6)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)
    const rimLight = new THREE.DirectionalLight(0xd4aaff, 0.8)
    rimLight.position.set(-5, -3, -5)
    scene.add(rimLight)
    const fillLight = new THREE.PointLight(0xc8a0ff, 1.0, 20)
    fillLight.position.set(2, -2, 4)
    scene.add(fillLight)
    const material = new THREE.MeshStandardMaterial({ color: 0xc9a8e8, roughness: 0.15, metalness: 0.05 })
    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1.55, 64, 64), material)
    sphere1.position.set(-0.6, 0.55, 0)
    scene.add(sphere1)
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1.3, 64, 64), material.clone())
    sphere2.position.set(0.75, -0.6, -0.5)
    scene.add(sphere2)
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      sphere1.rotation.y += 0.003; sphere1.rotation.x += 0.001
      sphere2.rotation.y -= 0.002; sphere2.rotation.x += 0.002
      renderer.render(scene, camera)
    }
    animate()
    const handleResize = () => {
      const w2 = mount.clientWidth, h2 = mount.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <nav className="navbar">
        
      </nav>

      <section className="hero">
        <div className="three-wrapper" ref={mountRef}></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1>About Us</h1>
            <p className="hero-description">
              We are a creative house building original ideas, brand experiences, and intellectual
properties with long-term value.
              We don’t just execute projects.
We create creative assets that grow, scale, and live beyond a single moment.Brauss is where strategy meets culture, and creativity becomes ownership.
            </p>
            <div className="scallop">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>

  <p className="scallop-text">
    Precision | Creativity | Reliability | Integrity
  </p>
</div>




          </div>
        </div>
      </section>
    </>
  )
}