import { useEffect, useRef } from "react"
import "./Hero.css"

const DOTS = [
  { cls:"d1",  size:13, top: 8, left: 20,  op:0.90, delay:"0s"   },
  { cls:"d2",  size: 5, top: 3, left: 65,  op:0.55, delay:"0.4s" },
  { cls:"d3",  size: 8, top:22, left:105,  op:0.70, delay:"0.8s" },
  { cls:"d4",  size: 4, top:10, left:145,  op:0.45, delay:"1.2s" },
  { cls:"d5",  size:15, top:28, left:175,  op:0.85, delay:"0.2s" },
  { cls:"d6",  size: 4, top: 4, left:220,  op:0.40, delay:"1.6s" },
  { cls:"d7",  size: 7, top:16, left:255,  op:0.60, delay:"0.6s" },
  { cls:"d8",  size:11, top:33, left:295,  op:0.75, delay:"1.0s" },
  { cls:"d9",  size: 4, top:48, left:330,  op:0.45, delay:"1.4s" },
  { cls:"d10", size: 7, top:18, left:365,  op:0.50, delay:"0.3s" },
  { cls:"d11", size: 4, top:40, left:400,  op:0.38, delay:"1.8s" },
  { cls:"d12", size: 5, top: 6, left:428,  op:0.48, delay:"0.9s" },
]

export default function Hero() {
  const rightRef   = useRef(null)
  const diagramRef = useRef(null)
  const glowRef    = useRef(null)
  const rafRef     = useRef(null)
  const state      = useRef({ tx:0, ty:0, cx:0, cy:0, ts:1, cs:1, inside:false })

  useEffect(() => {
    const right   = rightRef.current
    const diagram = diagramRef.current
    const glow    = glowRef.current
    if (!right || !diagram || !glow) return

    function lerp(a, b, t) { return a + (b - a) * t }

    function tick() {
      rafRef.current = requestAnimationFrame(tick)
      const s = state.current
      s.cx = lerp(s.cx, s.tx, 0.06)
      s.cy = lerp(s.cy, s.ty, 0.06)
      s.cs = lerp(s.cs, s.ts, 0.06)
      diagram.style.transform = `rotateX(${-s.cx * 12}deg) rotateY(${s.cy * 12}deg) scale(${s.cs})`
    }
    rafRef.current = requestAnimationFrame(tick)

    const onEnter = () => {
      state.current.ts = 1.12
      state.current.inside = true
      diagram.classList.add("hovered")
      glow.style.opacity = "1"
    }
    const onLeave = () => {
      state.current.tx = 0
      state.current.ty = 0
      state.current.ts = 1
      state.current.inside = false
      diagram.classList.remove("hovered")
      glow.style.opacity = "0"
    }
    const onMove = (e) => {
      glow.style.left = e.clientX + "px"
      glow.style.top  = e.clientY + "px"
      const rect = diagram.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top  + rect.height / 2
      state.current.tx = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
      state.current.ty = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width  / 2)))
    }

    right.addEventListener("mouseenter", onEnter)
    right.addEventListener("mouseleave", onLeave)
    right.addEventListener("mousemove",  onMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      right.removeEventListener("mouseenter", onEnter)
      right.removeEventListener("mouseleave", onLeave)
      right.removeEventListener("mousemove",  onMove)
    }
  }, [])

  return (
    <>
      {/* Custom glow cursor — fixed, follows mouse */}
      <div className="cursor-glow" ref={glowRef} />

      <section className="who-page">

        {/* ── LEFT ── */}
        <div className="who-left">
          <div className="corner-arc" />
          <div className="who-left-inner">
            <h1 className="who-heading">
              <span className="line1">who</span>
              <span className="line2">we are</span>
            </h1>
            <div className="splatter">
              {DOTS.map(({ cls, size, top, left, op, delay }) => (
                <span key={cls} className="dot"
                  style={{ width:size, height:size, top, left, opacity:op, animationDelay:delay }}
                />
              ))}
            </div>
            <div className="brauss-logo">BRAUSS</div>
            <p className="who-desc">
              A creative house within the creative industry,<br />
              developing original ideas, brand experiences<br />
              and intellectual properties with long&nbsp;–&nbsp;term value.
            </p>
          </div>
          <div className="who-left-bottom">
            <div className="divider-line" />
            <p className="tagline">
              From ideas to owned impact.<br />
              We build creative assets<br />
              and experiences that live<br />
              beyond a single project.
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="who-right" ref={rightRef}>
          <div className="diagram-wrapper">
            <div className="diagram" ref={diagramRef}>
              <svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
                <circle cx="170" cy="170" r="155" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
                <line x1="170" y1="170" x2="170" y2="15"  stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
                <line x1="170" y1="170" x2="15"  y2="170" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
                <line x1="170" y1="170" x2="325" y2="170" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
                <line x1="170" y1="170" x2="170" y2="325" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
              </svg>
              <div className="eco-center">
                <span className="eco-center-text">BRAUSS</span>
              </div>
              <div className="eco-node node-top">Creative Ecosystem</div>
              <div className="eco-node node-left">AGENCY</div>
              <div className="eco-node node-right">PROMOTER</div>
              <div className="eco-node node-bottom">EVENT<br />MANAGEMENT</div>
            </div>
          </div>
          <p className="email-footer">hello@braussnetworks.com</p>
        </div>

      </section>
    </>
  )
}