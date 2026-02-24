import { useEffect, useRef } from "react"
import logo from "../assets/logo-white.png"
import "./Hero.css"

const DOTS = [
  { cls:"d1",  size:13, top: 8,  left: 20,  op:0.90, delay:"0s",   speed: 0.04 },
  { cls:"d2",  size: 5, top: 3,  left: 65,  op:0.55, delay:"0.4s", speed: 0.07 },
  { cls:"d3",  size: 8, top:22,  left:105,  op:0.70, delay:"0.8s", speed: 0.03 },
  { cls:"d4",  size: 4, top:10,  left:145,  op:0.45, delay:"1.2s", speed: 0.09 },
  { cls:"d5",  size:15, top:28,  left:175,  op:0.85, delay:"0.2s", speed: 0.05 },
  { cls:"d6",  size: 4, top: 4,  left:220,  op:0.40, delay:"1.6s", speed: 0.08 },
  { cls:"d7",  size: 7, top:16,  left:255,  op:0.60, delay:"0.6s", speed: 0.06 },
  { cls:"d8",  size:11, top:33,  left:295,  op:0.75, delay:"1.0s", speed: 0.04 },
  { cls:"d9",  size: 4, top:48,  left:330,  op:0.45, delay:"1.4s", speed: 0.10 },
  { cls:"d10", size: 7, top:18,  left:365,  op:0.50, delay:"0.3s", speed: 0.07 },
  { cls:"d11", size: 4, top:40,  left:400,  op:0.38, delay:"1.8s", speed: 0.05 },
  { cls:"d12", size: 5, top: 6,  left:428,  op:0.48, delay:"0.9s", speed: 0.09 },
]

export default function Hero() {
  const rightRef      = useRef(null)
  const diagramRef    = useRef(null)
  const glowRef       = useRef(null)
  const headingRef    = useRef(null)
  const descRef       = useRef(null)
  const taglineRef    = useRef(null)
  const dotsRef       = useRef(null)
  const bgOrbRef      = useRef(null)
  const rafRef        = useRef(null)
  const scrollRafRef  = useRef(null)

  // 3-D tilt state
  const tiltState = useRef({ tx:0, ty:0, cx:0, cy:0, ts:1, cs:1 })
  // parallax scroll state
  const scrollState = useRef({ current: 0, target: 0 })
  // mouse parallax state (global mouse position)
  const mouseState  = useRef({ x: 0, y: 0, cx: 0, cy: 0 })

  /* ── Parallax scroll ── */
  useEffect(() => {
    const heading  = headingRef.current
    const desc     = descRef.current
    const tagline  = taglineRef.current
    const dotsEl   = dotsRef.current
    const bgOrb    = bgOrbRef.current

    const onScroll = () => {
      scrollState.current.target = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const tickScroll = () => {
      scrollRafRef.current = requestAnimationFrame(tickScroll)
      const s = scrollState.current
      s.current += (s.target - s.current) * 0.08

      const y = s.current

      // Left panel — elements at different depths (parallax)
      if (heading)  heading.style.transform  = `translateY(${y * -0.18}px)`
      if (desc)     desc.style.transform     = `translateY(${y * -0.10}px)`
      if (tagline)  tagline.style.transform  = `translateY(${y * -0.06}px)`
      if (dotsEl)   dotsEl.style.transform   = `translateY(${y * -0.22}px)`

      // Right panel background orb
      if (bgOrb)    bgOrb.style.transform    = `translateY(${y * 0.14}px) scale(1.2)`
    }
    scrollRafRef.current = requestAnimationFrame(tickScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(scrollRafRef.current)
    }
  }, [])

  /* ── Mouse parallax (global) ── */
  useEffect(() => {
    const heading = headingRef.current
    const desc    = descRef.current
    const dotsEl  = dotsRef.current

    let rafId
    const onMouse = (e) => {
      mouseState.current.x = (e.clientX / window.innerWidth  - 0.5) * 2   // -1 to 1
      mouseState.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMouse, { passive: true })

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const m = mouseState.current
      m.cx += (m.x - m.cx) * 0.05
      m.cy += (m.y - m.cy) * 0.05

      // Subtle mouse-driven shift on left panel elements
      if (heading)  heading.style.transform  += ` translate(${m.cx * -6}px, ${m.cy * -4}px)`
      if (desc)     desc.style.transform     += ` translate(${m.cx * -3}px, ${m.cy * -2}px)`
      if (dotsEl)   dotsEl.style.transform   += ` translate(${m.cx * -10}px, ${m.cy * -6}px)`
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Right panel 3-D tilt + diagram ── */
  useEffect(() => {
    const right   = rightRef.current
    const diagram = diagramRef.current
    const glow    = glowRef.current
    if (!right || !diagram || !glow) return

    function lerp(a, b, t) { return a + (b - a) * t }

    function tick() {
      rafRef.current = requestAnimationFrame(tick)
      const s = tiltState.current
      s.cx = lerp(s.cx, s.tx, 0.06)
      s.cy = lerp(s.cy, s.ty, 0.06)
      s.cs = lerp(s.cs, s.ts, 0.06)
      diagram.style.transform = `rotateX(${-s.cx * 12}deg) rotateY(${s.cy * 12}deg) scale(${s.cs})`
    }
    rafRef.current = requestAnimationFrame(tick)

    const onEnter = () => {
      tiltState.current.ts = 1.12
      diagram.classList.add("hovered")
      glow.style.opacity = "1"
    }
    const onLeave = () => {
      tiltState.current.tx = 0
      tiltState.current.ty = 0
      tiltState.current.ts = 1
      diagram.classList.remove("hovered")
      glow.style.opacity = "0"
    }
    const onMove = (e) => {
      glow.style.left = e.clientX + "px"
      glow.style.top  = e.clientY + "px"
      const rect = diagram.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      tiltState.current.tx = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
      tiltState.current.ty = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width  / 2)))
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
      <div className="cursor-glow" ref={glowRef} />

      <section className="who-page">

        {/* ══ LEFT — cream panel ══ */}
        <div className="who-left">
          <div className="corner-arc" />

          <div className="who-left-inner">

            {/* Heading — parallax layer */}
            <h1 className="who-heading" ref={headingRef}>
              <span className="line1">who</span>
              <span className="line2">we are</span>
            </h1>

            {/* Ink dots — fastest parallax layer */}
            <div className="splatter" ref={dotsRef}>
              {DOTS.map(({ cls, size, top, left, op, delay }) => (
                <span key={cls} className="dot"
                  style={{ width:size, height:size, top, left, opacity:op, animationDelay:delay }}
                />
              ))}
            </div>

            {/* Description — mid parallax */}
            <p className="who-desc" ref={descRef}>
              A creative house within the creative industry,
              developing original ideas, brand experiences
              and intellectual properties with long‑term value.
            </p>

          </div>

          {/* Bottom tagline — slowest parallax */}
          <div className="who-left-bottom" ref={taglineRef}>
            <div className="divider-line" />
            <p className="tagline">
              From ideas to owned impact.<br />
              We build creative assets<br />
              and experiences that live<br />
              beyond a single project.
            </p>
          </div>
        </div>

        {/* ══ RIGHT — purple panel ══ */}
        <div className="who-right" ref={rightRef}>

          {/* Parallax background orb */}
          <div className="right-bg-orb" ref={bgOrbRef} />

          {/* Floating particle rings — pure CSS parallax depth */}
          <div className="px-ring px-ring-1" />
          <div className="px-ring px-ring-2" />
          <div className="px-ring px-ring-3" />

          {/* diagram — centred */}
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
                <span className="eco-center-text"><img src={logo} alt="BRAUSS Logo" /></span>
              </div>
              <div className="eco-node node-top">Creative Ecosystem</div>
              <div className="eco-node node-left">AGENCY</div>
              <div className="eco-node node-right">PROMOTER</div>
              <div className="eco-node node-bottom">EVENT<br />MANAGEMENT</div>
            </div>
          </div>

        </div>

      </section>
    </>
  )
}