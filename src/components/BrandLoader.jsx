import { useEffect, useRef } from "react"
import logo from "../assets/logobraus.png"
import "../styles/BrandLoader.css"

export default function BrandLoader({ onComplete }) {
  const loaderRef   = useRef()
  const progressRef = useRef()
  const fillRef     = useRef()

  useEffect(() => {
    // Progress bar animasi
    if (fillRef.current) {
      fillRef.current.style.transition = "width 2.8s cubic-bezier(0.4, 0, 0.2, 1)"
      fillRef.current.style.width = "100%"
    }

    const timer = setTimeout(() => {
      // Fade out loader
      if (loaderRef.current) {
        loaderRef.current.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        loaderRef.current.style.opacity = "0"
        loaderRef.current.style.transform = "scale(1.03)"
      }
      setTimeout(onComplete, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="bl" ref={loaderRef}>

      {/* ── Layer 1: deep background gradient ── */}
      <div className="bl-bg" />

      {/* ── Layer 2: grain texture ── */}
      <div className="bl-grain" />

      {/* ── Layer 3: vignette ── */}
      <div className="bl-vignette" />

      {/* ── Layer 4: floating orbs (depth) ── */}
      <div className="bl-orb bl-orb-1" />
      <div className="bl-orb bl-orb-2" />
      <div className="bl-orb bl-orb-3" />
      <div className="bl-orb bl-orb-4" />

      {/* ── Layer 5: orbital rings ── */}
      <div className="bl-ring bl-ring-1" />
      <div className="bl-ring bl-ring-2" />
      <div className="bl-ring bl-ring-3" />

      {/* ── Layer 6: main content ── */}
      <div className="bl-content">

        {/* Logo */}
        <div className="bl-logo-wrap">
          <div className="bl-logo-glow" />
          <img src={logo} alt="BRAUSS" className="bl-logo" />
        </div>

        {/* Divider */}
        <div className="bl-divider">
          <div className="bl-divider-line" />
          <div className="bl-divider-dot" />
          <div className="bl-divider-line" />
        </div>

        {/* Tagline */}
        <div className="bl-tagline">
          <span className="bl-tag-item">Creative House</span>
          <span className="bl-tag-sep">·</span>
          <span className="bl-tag-item">Original Ideas</span>
          <span className="bl-tag-sep">·</span>
          <span className="bl-tag-item">Brand Experiences</span>
        </div>

        {/* Progress */}
        <div className="bl-progress" ref={progressRef}>
          <div className="bl-progress-track">
            <div className="bl-progress-fill" ref={fillRef} />
          </div>
        </div>

      </div>

      {/* ── Layer 7: corner accents ── */}
      <div className="bl-corner bl-corner-tl" />
      <div className="bl-corner bl-corner-tr" />
      <div className="bl-corner bl-corner-bl" />
      <div className="bl-corner bl-corner-br" />

    </div>
  )
}