import { useEffect, useRef } from "react"
import { useLanguage } from "../context/LanguageContext"
import logo from "../assets/logo-white.png"
import "./Hero.css"

const DOTS = [
  { cls:"d1",  size:10, top: 6,  left: 15,  op:0.80, delay:"0s"   },
  { cls:"d2",  size: 4, top: 2,  left: 58,  op:0.50, delay:"0.4s" },
  { cls:"d3",  size: 6, top:18,  left: 98,  op:0.65, delay:"0.8s" },
  { cls:"d4",  size: 3, top: 8,  left:138,  op:0.40, delay:"1.2s" },
  { cls:"d5",  size:11, top:24,  left:168,  op:0.75, delay:"0.2s" },
  { cls:"d6",  size: 3, top: 3,  left:210,  op:0.35, delay:"1.6s" },
  { cls:"d7",  size: 5, top:14,  left:245,  op:0.55, delay:"0.6s" },
  { cls:"d8",  size: 8, top:28,  left:282,  op:0.65, delay:"1.0s" },
  { cls:"d9",  size: 3, top:36,  left:318,  op:0.40, delay:"1.4s" },
  { cls:"d10", size: 5, top:14,  left:350,  op:0.45, delay:"0.3s" },
  { cls:"d11", size: 3, top:30,  left:382,  op:0.32, delay:"1.8s" },
  { cls:"d12", size: 4, top: 4,  left:412,  op:0.42, delay:"0.9s" },
]

export default function Hero() {
  const { t } = useLanguage()

  const rightRef   = useRef(null)
  const diagramRef = useRef(null)
  const glowRef    = useRef(null)
  const headingRef = useRef(null)
  const descRef    = useRef(null)
  const taglineRef = useRef(null)
  const dotsRef    = useRef(null)
  const statsRef   = useRef(null)
  const bgOrbRef   = useRef(null)
  const layer1Ref  = useRef(null)
  const layer2Ref  = useRef(null)
  const ring1Ref   = useRef(null)
  const ring2Ref   = useRef(null)
  const ring3Ref   = useRef(null)
  const ring4Ref   = useRef(null)

  const scrollRafRef = useRef(null)
  const scrollState  = useRef({ current: 0, target: 0 })
  const mouseState   = useRef({ x: 0, y: 0, cx: 0, cy: 0 })

  /* ── Scroll parallax ── */
  useEffect(() => {
    const onScroll = () => { scrollState.current.target = window.scrollY }
    window.addEventListener("scroll", onScroll, { passive: true })

    const tick = () => {
      scrollRafRef.current = requestAnimationFrame(tick)
      const s = scrollState.current
      s.current += (s.target - s.current) * 0.05
      const y = s.current

      if (headingRef.current)  headingRef.current.style.transform  = `translateY(${y * -0.10}px)`
      if (dotsRef.current)     dotsRef.current.style.transform     = `translateY(${y * -0.12}px)`
      if (descRef.current)     descRef.current.style.transform     = `translateY(${y * -0.06}px)`
      if (statsRef.current)    statsRef.current.style.transform    = `translateY(${y * -0.04}px)`
      if (taglineRef.current)  taglineRef.current.style.transform  = `translateY(${y * -0.02}px)`
      if (bgOrbRef.current)    bgOrbRef.current.style.transform    = `translateY(${y * 0.08}px) scale(1.2)`
      if (layer1Ref.current)   layer1Ref.current.style.transform   = `translateY(${y * 0.05}px)`
      if (layer2Ref.current)   layer2Ref.current.style.transform   = `translateY(${y * -0.04}px)`
      if (ring1Ref.current)    ring1Ref.current.style.transform    = `translate(-50%, calc(-50% + ${y * 0.03}px))`
      if (ring2Ref.current)    ring2Ref.current.style.transform    = `translateY(${y * 0.06}px)`
      if (ring3Ref.current)    ring3Ref.current.style.transform    = `translateY(${y * -0.04}px)`
      if (ring4Ref.current)    ring4Ref.current.style.transform    = `translateY(${y * 0.07}px)`
    }
    scrollRafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(scrollRafRef.current)
    }
  }, [])

  /* ── Mouse parallax ── */
  useEffect(() => {
    let rafId
    const onMouse = (e) => {
      mouseState.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseState.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMouse, { passive: true })

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const m = mouseState.current
      const s = scrollState.current
      m.cx += (m.x - m.cx) * 0.035
      m.cy += (m.y - m.cy) * 0.035

      if (headingRef.current)
        headingRef.current.style.transform = `translateY(${s.current * -0.10}px) translate(${m.cx * -4}px, ${m.cy * -2.5}px)`
      if (dotsRef.current)
        dotsRef.current.style.transform    = `translateY(${s.current * -0.12}px) translate(${m.cx * -6}px, ${m.cy * -3}px)`
      if (descRef.current)
        descRef.current.style.transform    = `translateY(${s.current * -0.06}px) translate(${m.cx * -2}px, ${m.cy * -1}px)`
      if (statsRef.current)
        statsRef.current.style.transform   = `translateY(${s.current * -0.04}px) translate(${m.cx * -1}px, ${m.cy * -0.6}px)`
      if (taglineRef.current)
        taglineRef.current.style.transform = `translateY(${s.current * -0.02}px) translate(${m.cx * -0.6}px, ${m.cy * -0.4}px)`
    }
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Spinner + cursor speed ── */
  useEffect(() => {
    const spinner = diagramRef.current?.querySelector(".diagram-spinner")
    const glow    = glowRef.current
    const right   = rightRef.current
    if (!spinner || !glow || !right) return

    let angle = 0, speed = 0.08, targetSpeed = 0.08
    let lastMouseX = null, isHovered = false, rafId

    spinner.style.animation = "none"

    // Ambil semua node sekaligus
    const nodeTop    = spinner.querySelector(".node-top")
    const nodeLeft   = spinner.querySelector(".node-left")
    const nodeRight  = spinner.querySelector(".node-right")
    const nodeBottom = spinner.querySelector(".node-bottom")

    // Base transform untuk posisi masing-masing node
    const nodeBaseTransform = {
      top:    "translateX(-50%)",
      left:   "translateY(-50%)",
      right:  "translateY(-50%)",
      bottom: "translateX(-50%) scale(1.12)",
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      speed += (targetSpeed - speed) * 0.05
      angle += speed
      spinner.style.transform = `rotateZ(${angle}deg)`

      // Counter-rotate setiap node agar teks selalu terbaca tegak
      if (nodeTop)
        nodeTop.style.transform    = `${nodeBaseTransform.top} rotate(${-angle}deg)`
      if (nodeLeft)
        nodeLeft.style.transform   = `${nodeBaseTransform.left} rotate(${-angle}deg)`
      if (nodeRight)
        nodeRight.style.transform  = `${nodeBaseTransform.right} rotate(${-angle}deg)`
      if (nodeBottom)
        nodeBottom.style.transform = `${nodeBaseTransform.bottom} rotate(${-angle}deg)`
    }
    rafId = requestAnimationFrame(tick)

    const onEnter = () => { isHovered = true;  glow.style.opacity = "1"; lastMouseX = null }
    const onLeave = () => { isHovered = false; targetSpeed = 0.08; lastMouseX = null; glow.style.opacity = "0" }
    const onMove  = (e) => {
      glow.style.left = e.clientX + "px"
      glow.style.top  = e.clientY + "px"
      if (!isHovered) return
      if (lastMouseX !== null) targetSpeed = (e.clientX - lastMouseX) * 0.4
      lastMouseX = e.clientX
    }

    right.addEventListener("mouseenter", onEnter)
    right.addEventListener("mouseleave", onLeave)
    right.addEventListener("mousemove",  onMove)

    return () => {
      cancelAnimationFrame(rafId)
      right.removeEventListener("mouseenter", onEnter)
      right.removeEventListener("mouseleave", onLeave)
      right.removeEventListener("mousemove",  onMove)
    }
  }, [])

  const taglineLines = t("heroTagline").split("\n")

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <section className="who-page">

        {/* ══ LEFT ══ */}
        <div className="who-left">
          <div className="who-top-block">

            <div className="splatter" ref={dotsRef}>
              {DOTS.map(({ cls, size, top, left, op, delay }) => (
                <span key={cls} className="dot"
                  style={{ width:size, height:size, top, left, opacity:op, animationDelay:delay }} />
              ))}
            </div>

            <p className="who-desc" ref={descRef}>{t("heroDesc")}</p>

            <div className="who-stats" ref={statsRef}>
              <div className="who-stat-item">
                <span className="who-stat-num">{t("heroStat1Num")}</span>
                <span className="who-stat-label">{t("heroStat1Label")}</span>
              </div>
              <div className="who-stat-item">
                <span className="who-stat-num">{t("heroStat2Num")}</span>
                <span className="who-stat-label">{t("heroStat2Label")}</span>
              </div>
              <div className="who-stat-item">
                <span className="who-stat-num">{t("heroStat3Num")}</span>
                <span className="who-stat-label">{t("heroStat3Label")}</span>
              </div>
            </div>
          </div>

          <div className="who-left-bottom" ref={taglineRef}>
            <div className="divider-line" />
            <p className="tagline-hero">
              {taglineLines.map((line, i) => (
                <span key={i}>{line}{i < taglineLines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div className="who-right" ref={rightRef}>
          <div className="right-bg-orb"  ref={bgOrbRef} />
          <div className="right-layer-1" ref={layer1Ref} />
          <div className="right-layer-2" ref={layer2Ref} />
          <div className="px-ring px-ring-1" ref={ring1Ref} />
          <div className="px-ring px-ring-2" ref={ring2Ref} />
          <div className="px-ring px-ring-3" ref={ring3Ref} />
          <div className="px-ring px-ring-4" ref={ring4Ref} />
          <div className="px-ring px-ring-5" />

          <div className="diagram-wrapper">
            <div className="diagram" ref={diagramRef}>
              <div className="diagram-spinner">
                <svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
                  {/* Lingkaran orbit luar — dashed tipis */}
                  <circle cx="170" cy="170" r="155" fill="none"
                    stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="5 9" />
                  {/* Lingkaran inner */}
                  <circle cx="170" cy="170" r="100" fill="none"
                    stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  {/* Garis ke IP Development — SOLID, tebal */}
                  <line x1="170" y1="225" x2="170" y2="325"
                    stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
                  {/* Garis ke node turunan — dashed */}
                  <line x1="170" y1="115" x2="170" y2="15"
                    stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeDasharray="5 7" />
                  <line x1="115" y1="170" x2="15"  y2="170"
                    stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeDasharray="5 7" />
                  <line x1="225" y1="170" x2="325" y2="170"
                    stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeDasharray="5 7" />
                  {/* Titik ujung — IP Dev sedikit lebih besar */}
                  <circle cx="170" cy="325" r="4.5" fill="rgba(255,255,255,0.85)" />
                  <circle cx="170" cy="15"  r="3"   fill="rgba(255,255,255,0.5)" />
                  <circle cx="15"  cy="170" r="3"   fill="rgba(255,255,255,0.5)" />
                  <circle cx="325" cy="170" r="3"   fill="rgba(255,255,255,0.5)" />
                </svg>

                {/* Susun sesuai screenshot: Event Mgmt atas, Agency kanan, Promoter kiri, IP Dev bawah */}
                <div className="eco-node node-top    node-child">EVENT<br />MANAGEMENT</div>
                <div className="eco-node node-left   node-child">PROMOTER</div>
                <div className="eco-node node-right  node-child">AGENCY</div>
                <div className="eco-node node-bottom node-parent">IP DEVELOPMENT</div>
              </div>
            </div>
            <div className="diagram-static">
              <div className="eco-center">
                <span className="eco-center-text">
                  <img src={logo} alt="BRAUSS Logo" />
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}