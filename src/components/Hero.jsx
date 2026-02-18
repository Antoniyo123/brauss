import { useEffect, useRef } from "react"
import * as THREE from "three"
import "./Hero.css"

// ── Scallop Badge ────────────────────────────────────────────────────────────
function ScallopBadge() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const DPR = window.devicePixelRatio || 1

    const COLOR   = '#2d1b4e'
    const TEXT    = 'Precision | Creativity | Reliability | Integrity'
    const FONT    = 'bold 22px Georgia, serif'
    const PAD_X   = 52
    const CORE_H  = 64
    const R       = 36
    const N       = 9   // number of bubbles

    // measure
    ctx.font = FONT
    const textW = ctx.measureText(TEXT).width
    const W = textW + PAD_X * 2
    const H = CORE_H + R * 2

    canvas.width        = Math.round(W * DPR)
    canvas.height       = Math.round(H * DPR)
    canvas.style.width  = Math.round(W) + 'px'
    canvas.style.height = Math.round(H) + 'px'
    ctx.scale(DPR, DPR)

    ctx.fillStyle = COLOR

    // centre strip
    ctx.fillRect(0, R, W, CORE_H)

    // bubbles top & bottom
    const step = W / N
    for (let i = 0; i < N; i++) {
      const cx = step * i + step / 2
      ctx.beginPath()
      ctx.arc(cx, R, R, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, H - R, R, 0, Math.PI * 2)
      ctx.fill()
    }

    // text
    ctx.font          = FONT
    ctx.fillStyle     = '#f0e6ff'
    ctx.textAlign     = 'center'
    ctx.textBaseline  = 'middle'
    ctx.fillText(TEXT, W / 2, H / 2)
  }, [])

  return (
    <div className="scallop-badge-wrap">
      <canvas ref={canvasRef} />
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

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

    const material = new THREE.MeshStandardMaterial({
      color: 0xc9a8e8,
      roughness: 0.15,
      metalness: 0.05,
    })

    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1.55, 64, 64), material)
    sphere1.position.set(-0.6, 0.55, 0)
    scene.add(sphere1)

    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1.3, 64, 64), material.clone())
    sphere2.position.set(0.75, -0.6, -0.5)
    scene.add(sphere2)

    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      sphere1.rotation.y += 0.003
      sphere1.rotation.x += 0.001
      sphere2.rotation.y -= 0.002
      sphere2.rotation.x += 0.002
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w2 = mount.clientWidth
      const h2 = mount.clientHeight
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
              Brauss Group is an integrated event ecosystem specializing in Event Management,
              Digital Agency and Event Promotion. Delivering seamless execution from ideas to impact.
              Founded on the belief that brands deserve bold strategies paired with reliable delivery
              Brauss combines creativity, technical excellence, and strategic amplification to create
              high-value experiences.
            </p>
            <ScallopBadge />
          </div>
        </div>
      </section>
    </>
  )
}