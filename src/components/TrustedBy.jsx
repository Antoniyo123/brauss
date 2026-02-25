import { useEffect, useRef } from "react"
import "../styles/TrustedBy.css"

const rows = [
  [
    { name: "ASHTA District 8",  src: "/logos/ashta.png" },
    { name: "Keppel Land",       src: "/logos/keppelland.png" },
    { name: "KOMPAS",            src: "/logos/kompas.png" },
    { name: "Bank Victoria",     src: "/logos/bankvictoria.png" },
    { name: "PT Abutnim",        src: "/logos/ptabutnim.png" },
    { name: "Rheumacyl",         src: "/logos/rheumacyl.png" },
    { name: "realme",            src: "/logos/realme.png" },
  ],
  [
    { name: "OPPO",              src: "/logos/oppo.png" },
    { name: "VIVO",              src: "/logos/vivo.png" },
    { name: "Xiaomi",            src: "/logos/xiaomi.png" },
    { name: "Rumah Siapkerja",   src: "/logos/rumahsiapkerja.png" },
    { name: "OOO",               src: "/logos/ooo.png" },
    { name: "IDSMED",            src: "/logos/idsmed.png" },
    { name: "Galderma",          src: "/logos/galderma.png" },
  ],
  [
    { name: "Y.O.U",             src: "/logos/you.png" },
    { name: "Weird Genius",      src: "/logos/weirdgenius.png" },
    { name: "Muslimverse",       src: "/logos/muslimverse.png" },
    { name: "Muklay",            src: "/logos/muklay.png" },
    { name: "Pokemon GO",        src: "/logos/pokemongo.png" },
    { name: "Unison Medika",     src: "/logos/unisonmedika.png" },
    { name: "D'Jantari",         src: "/logos/djantari.png" },
  ],
  [
    { name: "3Second",           src: "/logos/3second.png" },
    { name: "La Joie",           src: "/logos/lajoie.png" },
    { name: "Le Nueve",          src: "/logos/lenueve.png" },
    { name: "Yoshinoya",         src: "/logos/yoshinoya.png" },
    { name: "Dapur Umami",       src: "/logos/dapurumami.png" },
    { name: "ASHTA District 8",  src: "/logos/ashta.png" },
    { name: "KOMPAS",            src: "/logos/kompas.png" },
  ],
]

function MarqueeRow({ logos, reverse = false }) {
  const doubled = [...logos, ...logos]
  return (
    <div className={`tb-marquee-track ${reverse ? "tb-reverse" : ""}`}>
      <div className="tb-marquee-inner">
        {doubled.map((logo, i) => (
          <div className="tb-logo" key={i}>
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TrustedBy() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const statRef     = useRef(null)
  const sphere1Ref  = useRef(null)
  const sphere2Ref  = useRef(null)
  const sphere3Ref  = useRef(null)
  const sphere4Ref  = useRef(null)
  const bgGradRef   = useRef(null)
  const marqueeRefs = useRef([])   // per-row refs for skew effect

  useEffect(() => {
    const scrollState = { current: 0, target: 0 }
    const mouseState  = { x: 0, y: 0, cx: 0, cy: 0 }
    let rafId

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // progress relative to section top entering viewport
      scrollState.target = Math.max(0, -rect.top)
    }

    const onMouse = (e) => {
      mouseState.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseState.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      // lerp
      scrollState.current += (scrollState.target - scrollState.current) * 0.07
      mouseState.cx += (mouseState.x - mouseState.cx) * 0.05
      mouseState.cy += (mouseState.y - mouseState.cy) * 0.05

      const y  = scrollState.current
      const mx = mouseState.cx
      const my = mouseState.cy

      // ── Heading — mid scroll + mouse ──
      if (headingRef.current) {
        headingRef.current.style.transform =
          `translateY(${y * -0.14}px) translate(${mx * -5}px, ${my * -3}px)`
      }

      // ── Stat — slightly slower ──
      if (statRef.current) {
        statRef.current.style.transform =
          `translateY(${y * -0.08}px)`
      }

      // ── Spheres — each at different depth & mouse sensitivity ──
      if (sphere1Ref.current) {
        sphere1Ref.current.style.transform =
          `translate(${mx * -18}px, ${y * -0.22 + my * -12}px)`
      }
      if (sphere2Ref.current) {
        sphere2Ref.current.style.transform =
          `translate(${mx * -10}px, ${y * -0.14 + my * -8}px)`
      }
      if (sphere3Ref.current) {
        sphere3Ref.current.style.transform =
          `translate(${mx * -24}px, ${y * -0.30 + my * -16}px)`
      }
      if (sphere4Ref.current) {
        sphere4Ref.current.style.transform =
          `translate(${mx * -8}px, ${y * -0.10 + my * -5}px)`
      }

      // ── Background gradient orb — opposite mouse direction (depth) ──
      if (bgGradRef.current) {
        bgGradRef.current.style.transform =
          `translate(${mx * 20}px, ${my * 14}px)`
      }

      // ── Marquee rows — subtle vertical skew on scroll ──
      marqueeRefs.current.forEach((el, i) => {
        if (!el) return
        const dir = i % 2 === 0 ? 1 : -1
        const shift = y * 0.025 * dir
        el.style.transform = `translateY(${shift}px)`
      })
    }

    window.addEventListener("scroll",    onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse,  { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="trusted" ref={sectionRef}>

      {/* ── Parallax background orb ── */}
      <div className="trusted-bg-orb" ref={bgGradRef} aria-hidden="true" />

      {/* ── Floating spheres — each gets its own ref for independent parallax ── */}
      <div className="trusted-spheres" aria-hidden="true">
        <div className="ts ts-1" ref={sphere1Ref} />
        <div className="ts ts-2" ref={sphere2Ref} />
        <div className="ts ts-3" ref={sphere3Ref} />
        <div className="ts ts-4" ref={sphere4Ref} />
      </div>

      <div className="trusted-divider-top" />

      <div className="trusted-layout">

        {/* ── LEFT ── */}
        <div className="trusted-left">
          <div className="trusted-left-inner">
            <span className="trusted-eyebrow">Our Clients</span>
            <h2 className="trusted-heading" ref={headingRef}>
              Trusted<br />by the<br />best.
            </h2>
            <div className="trusted-stat" ref={statRef}>
              <span className="trusted-stat-num">26+</span>
              <span className="trusted-stat-label">brands & partners<br />across industries</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT — marquee rows ── */}
        <div className="trusted-right">
          {rows.map((row, i) => (
            <div
              key={i}
              className="tb-marquee-row-wrap"
              ref={el => marqueeRefs.current[i] = el}
              style={{ willChange: "transform" }}
            >
              <MarqueeRow logos={row} reverse={i % 2 !== 0} />
            </div>
          ))}
        </div>

      </div>

      <div className="trusted-divider-bottom" />

    </section>
  )
}