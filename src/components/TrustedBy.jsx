import { useEffect, useRef } from "react"
import { useLanguage } from "../context/LanguageContext"
import "../styles/TrustedBy.css"

const rows = [
  [
    { name: "ASHTA District 8",  src: "/client/client logo-01.png" },
    { name: "Keppel Land",       src: "/client/client logo-02.png" },
    { name: "KOMPAS",            src: "/client/client logo-03.png" },
    { name: "Bank Victoria",     src: "/client/client logo-04.png" },
    { name: "PT Abutnim",        src: "/client/client logo-05.png" },
    { name: "Rheumacyl",         src: "/client/client logo-06.png" },
    { name: "realme",            src: "/client/client logo-07.png" },
  ],
  [
    { name: "OPPO",              src: "/client/client logo-08.png" },
    { name: "VIVO",              src: "/client/client logo-09.png" },
    { name: "Xiaomi",            src: "/client/client logo-10.png" },
    { name: "Rumah Siapkerja",   src: "/client/client logo-11.png" },
    { name: "OOO",               src: "/client/client logo-12.png" },
    { name: "IDSMED",            src: "/client/client logo-13.png" },
    { name: "Galderma",          src: "/client/client logo-14.png" },
  ],
  [
    { name: "Y.O.U",             src: "/client/client logo-15.png" },
    { name: "Weird Genius",      src: "/client/client logo-16.png" },
    { name: "Muslimverse",       src: "/client/client logo-17.png" },
    { name: "Muklay",            src: "/client/client logo-18.png" },
    { name: "Pokemon GO",        src: "/client/client logo-19.png" },
    { name: "Unison Medika",     src: "/client/client logo-20.png" },
    { name: "D'Jantari",         src: "/client/client logo-21.png" },
  ],
  [
    { name: "3Second",           src: "/client/client logo-22.png" },
    { name: "La Joie",           src: "/client/client logo-23.png" },
    { name: "Le Nueve",          src: "/client/client logo-24.png" },
    { name: "Yoshinoya",         src: "/client/client logo-25.png" },
    { name: "Dapur Umami",       src: "/client/client logo-26.png" },
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
  const { t } = useLanguage()

  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const statRef     = useRef(null)
  const sphere1Ref  = useRef(null)
  const sphere2Ref  = useRef(null)
  const sphere3Ref  = useRef(null)
  const sphere4Ref  = useRef(null)
  const bgGradRef   = useRef(null)
  const marqueeRefs = useRef([])

  useEffect(() => {
    const scrollState = { current: 0, target: 0 }
    const mouseState  = { x: 0, y: 0, cx: 0, cy: 0 }
    let rafId

    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      scrollState.target = Math.max(0, -el.getBoundingClientRect().top)
    }
    const onMouse = (e) => {
      mouseState.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseState.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      scrollState.current += (scrollState.target - scrollState.current) * 0.07
      mouseState.cx += (mouseState.x - mouseState.cx) * 0.05
      mouseState.cy += (mouseState.y - mouseState.cy) * 0.05
      const y  = scrollState.current
      const mx = mouseState.cx, my = mouseState.cy

      if (headingRef.current)
        headingRef.current.style.transform = `translateY(${y * -0.14}px) translate(${mx * -5}px, ${my * -3}px)`
      if (statRef.current)
        statRef.current.style.transform    = `translateY(${y * -0.08}px)`
      if (sphere1Ref.current)
        sphere1Ref.current.style.transform = `translate(${mx * -18}px, ${y * -0.22 + my * -12}px)`
      if (sphere2Ref.current)
        sphere2Ref.current.style.transform = `translate(${mx * -10}px, ${y * -0.14 + my * -8}px)`
      if (sphere3Ref.current)
        sphere3Ref.current.style.transform = `translate(${mx * -24}px, ${y * -0.30 + my * -16}px)`
      if (sphere4Ref.current)
        sphere4Ref.current.style.transform = `translate(${mx * -8}px,  ${y * -0.10 + my * -5}px)`
      if (bgGradRef.current)
        bgGradRef.current.style.transform  = `translate(${mx * 20}px, ${my * 14}px)`
      marqueeRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.transform = `translateY(${y * 0.025 * (i % 2 === 0 ? 1 : -1)}px)`
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

  // heading supports \n → <br/>
  const headingLines = t("trustedHeading").split("\n")
  const statLines    = t("trustedStatLabel").split("\n")

  return (
    <section className="trusted" ref={sectionRef}>
      <div className="trusted-bg-orb" ref={bgGradRef} aria-hidden="true" />

      <div className="trusted-spheres" aria-hidden="true">
        <div className="ts ts-1" ref={sphere1Ref} />
        <div className="ts ts-2" ref={sphere2Ref} />
        <div className="ts ts-3" ref={sphere3Ref} />
        <div className="ts ts-4" ref={sphere4Ref} />
      </div>

      <div className="trusted-divider-top" />

      <div className="trusted-layout">
        <div className="trusted-left">
          <div className="trusted-left-inner">
            <span className="trusted-eyebrow">{t("trustedEyebrow")}</span>
            <h2 className="trusted-heading" ref={headingRef}>
              {headingLines.map((line, i) => (
                <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
              ))}
            </h2>
            <div className="trusted-stat" ref={statRef}>
              <span className="trusted-stat-num">{t("trustedStatNum")}</span>
              <span className="trusted-stat-label">
                {statLines.map((line, i) => (
                  <span key={i}>{line}{i < statLines.length - 1 && <br />}</span>
                ))}
              </span>
            </div>
          </div>
        </div>

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