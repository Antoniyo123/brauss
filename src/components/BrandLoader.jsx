import { useEffect, useRef } from "react"
import "../styles/BrandLoader.css"

// ── Wave letter configs ───────────────────────────────────────────────────────
const BRAVE_LETTERS  = ["B", "R", "A", "V", "E"]
const BRAUSS_LETTERS = ["B", "R", "A", "U", "S", "S"]
const BASE_DUR = 2.4 // seconds per cycle

function waveDelay(i, total) {
  return ((i / total) * BASE_DUR * 0.6).toFixed(2)
}

export default function BrandLoader({ onComplete }) {
  const loaderRef = useRef()
  const fillRef   = useRef()

  useEffect(() => {
    // Animate progress bar fill
    if (fillRef.current) {
      fillRef.current.style.transition = "width 2.8s cubic-bezier(0.4, 0, 0.2, 1)"
      fillRef.current.style.width = "100%"
    }

    // Fade out after 3 seconds then call onComplete
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        loaderRef.current.style.opacity    = "0"
        loaderRef.current.style.transform  = "scale(1.03)"
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

      {/* ── Layer 4: floating orbs ── */}
      <div className="bl-orb bl-orb-1" />
      <div className="bl-orb bl-orb-2" />
      <div className="bl-orb bl-orb-3" />
      <div className="bl-orb bl-orb-4" />

      {/* ── Layer 5: orbital rings ── */}
      <div className="bl-ring bl-ring-1" />
      <div className="bl-ring bl-ring-2" />
      <div className="bl-ring bl-ring-3" />

      {/* ── Layer 6: main wave text content ── */}
      <div className="bl-wave-wrap">

        {/* BE BRAVE */}
        <div className="bl-be-label" style={{ animationDelay: "0.2s" }}>be</div>
        <div className="bl-wave-line bl-wave-line--brave">
          <div className="bl-word-wrap">
            {BRAVE_LETTERS.map((ch, i) => (
              <span
                key={i}
                className="bl-letter bl-letter--brave"
                style={{
                  "--wave-delay":    `${waveDelay(i, BRAVE_LETTERS.length)}s`,
                  "--wave-duration": `${BASE_DUR}s`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* BE BRAUSS */}
        <div className="bl-be-label" style={{ marginTop: "1.2rem", animationDelay: "0.3s" }}>be</div>
        <div className="bl-wave-line bl-wave-line--brauss">
          <div className="bl-word-wrap">
            {BRAUSS_LETTERS.map((ch, i) => (
              <span
                key={i}
                className="bl-letter bl-letter--brauss"
                style={{
                  "--wave-delay":    `${waveDelay(i, BRAUSS_LETTERS.length)}s`,
                  "--wave-duration": `${BASE_DUR}s`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
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

        {/* Progress bar */}
        <div className="bl-progress">
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